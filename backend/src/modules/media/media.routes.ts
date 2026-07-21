import { Router } from 'express';
import multer from 'multer';
import { authenticate, authorize } from '../../common/guards';
import * as mediaController from './media.controller';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
});

export const mediaRouter = Router();

mediaRouter.use(authenticate);

// Upload for current user
mediaRouter.post('/upload', upload.single('file'), mediaController.upload);

// Upload for a specific owner (admin)
mediaRouter.post(
  '/upload/:id',
  authorize('ADMIN'),
  upload.single('file'),
  mediaController.uploadForOwner
);

// Delete media
mediaRouter.delete('/:id', mediaController.remove);

// List media for an owner
mediaRouter.get('/owner/:id', mediaController.listByOwner);

// Admin: list all media
mediaRouter.get('/all', authorize('ADMIN'), mediaController.listAll);
