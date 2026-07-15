import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),

  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/gasnow?schema=public',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'change-me-refresh',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },

  upload: {
    maxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '5242880', 10),
    allowedTypes: (
      process.env.UPLOAD_ALLOWED_TYPES || 'image/jpeg,image/png,image/webp,application/pdf'
    ).split(','),
  },

  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
