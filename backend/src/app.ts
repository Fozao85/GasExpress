import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { errorHandler, requestLogger, notFoundHandler } from './common/middleware';
import { swaggerSpec } from './docs/swagger';

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

// Rate limiting
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
      success: false,
      message: 'Too many requests, please try again later',
      errors: [],
    },
  })
);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// API Documentation
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'GasNow API Docs',
  })
);

// Health check
/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check endpoint
 *     description: Returns the current status of the API
 *     operationId: healthCheck
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
app.get('/api/v1/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

// Routes (placeholder — modules will be added in future sprints)
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', usersRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export { app };
