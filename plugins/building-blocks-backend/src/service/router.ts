import { errorHandler } from '@backstage/backend-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';

export interface RouterOptions {
  logger: LoggerService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const router = Router();

  router.get('/health', async (_req, res) => {
    res.send('ok');
  });

  router.get('/building-blocks', async (_req, res) => {
    res.json(['block1', 'block2', 'block3']);
  });

  router.use(errorHandler(logger));

  return router;
}
