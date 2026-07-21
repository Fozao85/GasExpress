import { Request, Response, NextFunction } from 'express';
import * as mediaService from './media.service';
import { uploadMediaSchema, mediaIdSchema } from './media.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function validateBody(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data;
}

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    const { body: formData } = validateBody(uploadMediaSchema, { body: req.body });

    if (!req.file) {
      throw new ValidationError([{ field: 'file', message: 'File is required' }]);
    }

    const result = await mediaService.uploadMedia({
      buffer: req.file.buffer,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      mediaType: formData.mediaType,
      ownerType: formData.ownerType,
      ownerId: req.user!.sub,
      userId: req.user!.sub,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function uploadForOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(mediaIdSchema, { params: req.params });
    const { body: formData } = validateBody(uploadMediaSchema, { body: req.body });

    if (!req.file) {
      throw new ValidationError([{ field: 'file', message: 'File is required' }]);
    }

    const result = await mediaService.uploadMedia({
      buffer: req.file.buffer,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      mediaType: formData.mediaType,
      ownerType: formData.ownerType,
      ownerId: params.id,
      userId: req.user!.sub,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(mediaIdSchema, { params: req.params });

    const result = await mediaService.deleteMedia({
      id: params.id,
      userId: req.user!.sub,
      role: req.user!.role,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function listByOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(mediaIdSchema, { params: req.params });
    const ownerType = req.query.ownerType as string;

    if (!ownerType) {
      throw new ValidationError([
        { field: 'ownerType', message: 'ownerType query param is required' },
      ]);
    }

    const records = await mediaService.getMediaByOwner(params.id, ownerType);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
}

export async function listAll(req: Request, res: Response, next: NextFunction) {
  try {
    const records = await mediaService.getAllMedia(req.user!.sub);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
}
