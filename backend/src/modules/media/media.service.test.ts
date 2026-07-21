import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';
import * as mediaService from './media.service';
import * as storageProvider from './local-storage.provider';
import { ForbiddenError, NotFoundError, ValidationError } from '../../common/exceptions/app-error';

vi.mock('../../database', () => ({
  prisma: {
    media: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
    vendorProfile: { findUnique: vi.fn() },
    customerProfile: { findUnique: vi.fn() },
    riderProfile: { findUnique: vi.fn() },
    delivery: { findUnique: vi.fn() },
  },
}));

vi.mock('./local-storage.provider', () => ({
  storageProvider: {
    upload: vi.fn(),
    delete: vi.fn(),
    getPublicUrl: vi.fn().mockImplementation((path: string) => `/api/v1/media/file/${path}`),
  },
}));

const mockBuffer = Buffer.from('fake-image-data');
const baseInput = {
  buffer: mockBuffer,
  originalName: 'test.jpg',
  mimeType: 'image/jpeg',
  size: 1024,
  mediaType: 'logo',
  ownerType: 'vendor',
  ownerId: 'vendor-profile-id',
  userId: 'user-id',
};

describe('MediaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('uploadMedia', () => {
    it('uploads a file successfully', async () => {
      vi.mocked(prisma.media.findFirst).mockResolvedValue(null);
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({
        id: 'vendor-profile-id',
        userId: 'user-id',
      } as any);
      vi.mocked(storageProvider.storageProvider.upload).mockResolvedValue({
        path: 'vendor/user-id/logo/uuid.jpg',
        filename: 'uuid.jpg',
        thumbnailPath: undefined,
      });
      vi.mocked(prisma.media.create).mockResolvedValue({
        id: 'media-id',
        ownerId: 'vendor-profile-id',
        ownerType: 'vendor',
        mediaType: 'logo',
        filename: 'uuid.jpg',
        originalName: 'test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        path: 'vendor/user-id/logo/uuid.jpg',
        thumbnailPath: null,
        createdAt: new Date(),
      } as any);

      const result = await mediaService.uploadMedia(baseInput);

      expect(result.mediaType).toBe('logo');
      expect(result.url).toContain('/api/v1/media/file/');
      expect(prisma.media.create).toHaveBeenCalled();
    });

    it('rejects unsupported MIME types', async () => {
      await expect(
        mediaService.uploadMedia({ ...baseInput, mimeType: 'application/x-executable' })
      ).rejects.toThrow(ValidationError);
    });

    it('rejects blocked file extensions', async () => {
      await expect(
        mediaService.uploadMedia({ ...baseInput, originalName: 'script.exe' })
      ).rejects.toThrow(ValidationError);
    });

    it('rejects oversized files', async () => {
      await expect(
        mediaService.uploadMedia({ ...baseInput, size: 10 * 1024 * 1024 })
      ).rejects.toThrow(ValidationError);
    });

    it('rejects filenames with directory traversal', async () => {
      await expect(
        mediaService.uploadMedia({ ...baseInput, originalName: '../../etc/passwd' })
      ).rejects.toThrow(ValidationError);
    });

    it('replaces existing media of same type', async () => {
      vi.mocked(prisma.media.findFirst).mockResolvedValue({
        id: 'existing-id',
        ownerId: 'vendor-profile-id',
        ownerType: 'vendor',
        mediaType: 'logo',
        path: 'old/path.jpg',
        thumbnailPath: null,
      } as any);
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({
        id: 'vendor-profile-id',
        userId: 'user-id',
      } as any);
      vi.mocked(storageProvider.storageProvider.upload).mockResolvedValue({
        path: 'new/path.jpg',
        filename: 'new-uuid.jpg',
        thumbnailPath: undefined,
      });
      vi.mocked(prisma.media.create).mockResolvedValue({
        id: 'new-media-id',
        ownerId: 'vendor-profile-id',
        ownerType: 'vendor',
        mediaType: 'logo',
        filename: 'new-uuid.jpg',
        originalName: 'test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        path: 'new/path.jpg',
        thumbnailPath: null,
        createdAt: new Date(),
      } as any);

      await mediaService.uploadMedia(baseInput);

      expect(storageProvider.storageProvider.delete).toHaveBeenCalledWith({ path: 'old/path.jpg' });
      expect(prisma.media.delete).toHaveBeenCalledWith({ where: { id: 'existing-id' } });
    });

    it('validates ownership', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({
        id: 'vendor-profile-id',
        userId: 'other-user',
      } as any);

      await expect(mediaService.uploadMedia(baseInput)).rejects.toThrow(ForbiddenError);
    });
  });

  describe('deleteMedia', () => {
    it('deletes media by id', async () => {
      vi.mocked(prisma.media.findUnique).mockResolvedValue({
        id: 'media-id',
        ownerId: 'vendor-profile-id',
        ownerType: 'vendor',
        mediaType: 'logo',
        path: 'some/path.jpg',
        thumbnailPath: null,
      } as any);
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({
        id: 'vendor-profile-id',
        userId: 'user-id',
      } as any);

      const result = await mediaService.deleteMedia({
        id: 'media-id',
        userId: 'user-id',
        role: 'VENDOR',
      });

      expect(result.deleted).toBe(true);
      expect(storageProvider.storageProvider.delete).toHaveBeenCalled();
      expect(prisma.media.delete).toHaveBeenCalled();
    });

    it('allows admin to delete any media', async () => {
      vi.mocked(prisma.media.findUnique).mockResolvedValue({
        id: 'media-id',
        ownerId: 'other-profile',
        ownerType: 'vendor',
        path: 'some/path.jpg',
        thumbnailPath: null,
      } as any);

      const result = await mediaService.deleteMedia({
        id: 'media-id',
        userId: 'admin-id',
        role: 'ADMIN',
      });

      expect(result.deleted).toBe(true);
    });

    it('throws NotFoundError for non-existent media', async () => {
      vi.mocked(prisma.media.findUnique).mockResolvedValue(null);

      await expect(
        mediaService.deleteMedia({ id: 'bad-id', userId: 'user-id', role: 'VENDOR' })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('getMediaStats', () => {
    it('returns media statistics', async () => {
      vi.mocked(prisma.media.count).mockResolvedValueOnce(10);
      vi.mocked(prisma.media.aggregate).mockResolvedValue({ _sum: { size: 5000000 } } as any);
      vi.mocked(prisma.media.count).mockResolvedValueOnce(2);

      const stats = await mediaService.getMediaStats();

      expect(stats.totalUploads).toBe(10);
      expect(stats.storageUsed).toBe(5000000);
      expect(stats.uploadsToday).toBe(2);
    });
  });
});
