export interface UploadOptions {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  mediaType: string;
  ownerId: string;
  ownerType: string;
  generateThumbnail?: boolean;
}

export interface UploadResult {
  path: string;
  filename: string;
  thumbnailPath: string | undefined;
}

export interface DeleteOptions {
  path: string;
}

export interface StorageProvider {
  upload(options: UploadOptions): Promise<UploadResult>;
  delete(options: DeleteOptions): Promise<void>;
  getPublicUrl(path: string): string;
}
