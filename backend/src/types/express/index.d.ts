import { AccessTokenPayload } from '../../services/jwt.service';

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
