import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { errorHandler, requestLogger, notFoundHandler } from './common/middleware';
import { swaggerSpec } from './docs/swagger';
import { authRouter } from './modules/auth';
import { vendorRouter } from './modules/vendors';
import { categoryRouter } from './modules/categories';
import { promotionRouter } from './modules/promotions';
import { cartRouter } from './modules/cart';
import { orderRouter } from './modules/order';
import { paymentRouter } from './modules/payment';
import { addressRouter } from './modules/address';
import { riderRouter } from './modules/rider';
import { adminRouter } from './modules/admin';

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

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/promotions', promotionRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/addresses', addressRouter);
app.use('/api/v1/riders', riderRouter);
app.use('/api/v1/admin', adminRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export { app };
