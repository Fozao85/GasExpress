import { Request, Response, NextFunction } from 'express';
import * as monitoringService from './monitoring.service';

export async function getHealth(req: Request, res: Response, next: NextFunction) {
  try {
    const health = await monitoringService.getPlatformHealth();
    res.json({ success: true, data: health });
  } catch (error) {
    next(error);
  }
}

export async function getQueueStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await monitoringService.getQueueStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}

export async function getFailedJobs(req: Request, res: Response, next: NextFunction) {
  try {
    const jobs = await monitoringService.getFailedJobs();
    res.json({ success: true, data: { jobs } });
  } catch (error) {
    next(error);
  }
}

export async function retryFailedJobs(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await monitoringService.retryFailedJobs();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function purgeCompletedJobs(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await monitoringService.purgeCompletedJobs();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getWebSocketStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await monitoringService.getWebSocketStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}

export async function getPaymentStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await monitoringService.getPaymentStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}

export async function getMapsStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await monitoringService.getMapsStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}

export async function getMediaStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await monitoringService.getMediaMonitoringStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}

export async function getWorkerStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const status = await monitoringService.getWorkerStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    next(error);
  }
}
