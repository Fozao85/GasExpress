import { writeFile, unlink, mkdir, access } from 'fs/promises';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import type { StorageProvider, UploadOptions, UploadResult } from './storage-provider.interface';
import { logger } from '../../common/middleware';

const UPLOAD_BASE = join(process.cwd(), 'uploads');

export class LocalStorageProvider implements StorageProvider {
  async upload(options: UploadOptions): Promise<UploadResult> {
    const { buffer, originalName, mimeType, mediaType, ownerId, ownerType, generateThumbnail } =
      options;

    const ext = extname(originalName) || '.bin';
    const filename = `${randomUUID()}${ext}`;
    const subDir = join(ownerType, ownerId, mediaType);

    const dir = join(UPLOAD_BASE, subDir);
    await mkdir(dir, { recursive: true });

    const filePath = join(dir, filename);

    let processedBuffer = buffer;
    let thumbnailPath: string | undefined;

    if (mimeType.startsWith('image/')) {
      processedBuffer = await sharp(buffer)
        .rotate()
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();

      if (generateThumbnail) {
        const thumbFilename = `thumb_${filename}`;
        const thumbPath = join(dir, thumbFilename);
        await sharp(buffer)
          .rotate()
          .resize(300, 300, { fit: 'cover' })
          .jpeg({ quality: 70 })
          .toFile(thumbPath);
        thumbnailPath = join(subDir, thumbFilename);
      }
    }

    await writeFile(filePath, processedBuffer);

    logger.info({ filename, ownerType, ownerId, size: processedBuffer.length }, 'File uploaded');

    return { path: join(subDir, filename), filename, thumbnailPath };
  }

  async delete(options: { path: string }): Promise<void> {
    const fullPath = join(UPLOAD_BASE, options.path);
    try {
      await access(fullPath);
      await unlink(fullPath);
      logger.info({ path: options.path }, 'File deleted');
    } catch {
      logger.warn({ path: options.path }, 'File not found for deletion');
    }
  }

  getPublicUrl(path: string): string {
    return `/api/v1/media/file/${path.replace(/\\/g, '/')}`;
  }
}

export const storageProvider = new LocalStorageProvider();
