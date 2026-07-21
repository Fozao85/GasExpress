import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { api } from '../../services/api';

interface UploadedFile {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  filename: string;
}

interface ImageUploaderProps {
  ownerType: 'vendor' | 'customer' | 'rider' | 'delivery';
  mediaType: string;
  ownerId: string;
  onUploadComplete: (file: UploadedFile) => void;
  onRemove: (id: string) => void;
  currentUrl?: string | null;
  accept?: string;
  maxSize?: number;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

export function ImageUploader({
  ownerType,
  mediaType,
  ownerId,
  onUploadComplete,
  onRemove,
  currentUrl,
  accept = 'image/jpeg,image/png,image/webp',
  maxSize = DEFAULT_MAX_SIZE,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Unsupported file type. Please upload JPEG, PNG, or WebP.';
    }
    if (file.size > maxSize) {
      return 'File is too large. Maximum size is 5MB.';
    }
    return null;
  };

  const upload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    setError(null);
    setProgress(0);

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    fileRef.current = file;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mediaType', mediaType);
    formData.append('ownerType', ownerType);

    try {
      const { data } = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setProgress(100);
      onUploadComplete(data.data);
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Upload failed';
      setError(message);
      setPreview(currentUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    fileRef.current = null;
    if (currentUrl) onRemove(ownerId);
  };

  const handleRetry = () => {
    if (fileRef.current) upload(fileRef.current);
  };

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-primary-400 bg-primary-50'
            : error
              ? 'border-error-300 bg-error-50'
              : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload image"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-3">
            <div className="text-3xl">⏳</div>
            <p className="text-sm text-gray-600">Uploading... {progress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg object-contain"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl">📁</div>
            <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-400">JPEG, PNG, or WebP (max 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center justify-between p-2 bg-error-50 rounded-lg">
          <p className="text-sm text-error-600">{error}</p>
          <div className="flex gap-2">
            <button
              onClick={handleRetry}
              className="text-xs font-medium text-error-700 hover:underline"
            >
              Retry
            </button>
            <button
              onClick={() => setError(null)}
              className="text-xs text-gray-500 hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {preview && !isUploading && (
        <button
          onClick={handleRemove}
          className="text-sm text-error-600 hover:text-error-700 font-medium hover:underline"
        >
          Remove image
        </button>
      )}
    </div>
  );
}
