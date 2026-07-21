import { prisma } from '../../database';
import { NotFoundError, ValidationError, ForbiddenError } from '../../common/exceptions/app-error';
import { storageProvider } from './local-storage.provider';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from './media.validation';
import { logger } from '../../common/middleware';

interface UploadInput {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  size: number;
  mediaType: string;
  ownerType: string;
  ownerId: string;
  userId: string;
}

interface DeleteInput {
  id: string;
  userId: string;
  role: string;
}

export async function uploadMedia(input: UploadInput) {
  const { buffer, originalName, mimeType, size, mediaType, ownerType, ownerId, userId } = input;

  if (!ALLOWED_MIME_TYPES.includes(mimeType as any)) {
    throw new ValidationError([
      { field: 'mimeType', message: `Unsupported MIME type: ${mimeType}` },
    ]);
  }

  const ext = originalName.split('.').pop()?.toLowerCase() || '';
  const blockedExts = ['exe', 'bat', 'cmd', 'com', 'msi', 'scr', 'sh', 'bin', 'dll', 'vbs', 'ps1'];
  if (blockedExts.includes(ext)) {
    throw new ValidationError([
      { field: 'filename', message: `File extension .${ext} is not allowed` },
    ]);
  }

  if (size > MAX_FILE_SIZE) {
    throw new ValidationError([{ field: 'size', message: 'File exceeds maximum size of 5MB' }]);
  }

  if (originalName.includes('..') || originalName.includes('/') || originalName.includes('\\')) {
    throw new ValidationError([{ field: 'filename', message: 'Invalid filename' }]);
  }

  // Ownership validation
  await validateOwnership(ownerType, ownerId, userId);

  // Replace existing media of same type
  const existing = await prisma.media.findFirst({
    where: { ownerId, ownerType, mediaType },
  });

  if (existing) {
    await storageProvider.delete({ path: existing.path });
    if (existing.thumbnailPath) {
      await storageProvider.delete({ path: existing.thumbnailPath });
    }
    await prisma.media.delete({ where: { id: existing.id } });
    logger.info({ id: existing.id }, 'Replaced existing media');
  }

  const generateThumbnail = mediaType === 'avatar' || mediaType === 'logo';

  const result = await storageProvider.upload({
    buffer,
    originalName,
    mimeType,
    mediaType,
    ownerId,
    ownerType,
    generateThumbnail,
  });

  const record = await prisma.media.create({
    data: {
      ownerId,
      ownerType,
      mediaType,
      filename: result.filename,
      originalName,
      mimeType,
      size,
      path: result.path,
      ...(result.thumbnailPath ? { thumbnailPath: result.thumbnailPath } : {}),
    },
  });

  return formatMedia(record);
}

export async function deleteMedia(input: DeleteInput) {
  const { id, userId, role } = input;

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new NotFoundError('Media');

  if (role !== 'ADMIN') {
    await validateOwnership(media.ownerType, media.ownerId, userId);
  }

  await storageProvider.delete({ path: media.path });
  if (media.thumbnailPath) {
    await storageProvider.delete({ path: media.thumbnailPath });
  }

  await prisma.media.delete({ where: { id } });

  logger.info({ id, ownerType: media.ownerType }, 'Media deleted');
  return { id, deleted: true };
}

export async function getMediaByOwner(ownerId: string, ownerType: string) {
  const records = await prisma.media.findMany({
    where: { ownerId, ownerType },
    orderBy: { createdAt: 'desc' },
  });
  return records.map(formatMedia);
}

export async function getAllMedia(_adminUserId: string) {
  const records = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return records.map(formatMedia);
}

export async function getMediaStats() {
  const [totalUploads, storageUsed, uploadsToday, failedUploads] = await Promise.all([
    prisma.media.count(),
    prisma.media.aggregate({ _sum: { size: true } }),
    prisma.media.count({
      where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    }),
    Promise.resolve(0),
  ]);

  return {
    totalUploads,
    storageUsed: Number(storageUsed._sum.size) || 0,
    uploadsToday,
    failedUploads,
  };
}

async function validateOwnership(ownerType: string, ownerId: string, userId: string) {
  if (ownerType === 'vendor') {
    const profile = await prisma.vendorProfile.findUnique({ where: { id: ownerId } });
    if (!profile || profile.userId !== userId) throw new ForbiddenError('Not your vendor profile');
  } else if (ownerType === 'customer') {
    const profile = await prisma.customerProfile.findUnique({ where: { id: ownerId } });
    if (!profile || profile.userId !== userId)
      throw new ForbiddenError('Not your customer profile');
  } else if (ownerType === 'rider') {
    const profile = await prisma.riderProfile.findUnique({ where: { id: ownerId } });
    if (!profile || profile.userId !== userId) throw new ForbiddenError('Not your rider profile');
  } else if (ownerType === 'delivery') {
    const delivery = await prisma.delivery.findUnique({ where: { id: ownerId } });
    if (!delivery) throw new NotFoundError('Delivery');
  } else {
    throw new ValidationError([{ field: 'ownerType', message: 'Invalid owner type' }]);
  }
}

function formatMedia(record: any) {
  return {
    id: record.id,
    ownerId: record.ownerId,
    ownerType: record.ownerType,
    mediaType: record.mediaType,
    filename: record.filename,
    originalName: record.originalName,
    mimeType: record.mimeType,
    size: record.size,
    url: storageProvider.getPublicUrl(record.path),
    thumbnailUrl: record.thumbnailPath ? storageProvider.getPublicUrl(record.thumbnailPath) : null,
    createdAt: record.createdAt.toISOString(),
  };
}
