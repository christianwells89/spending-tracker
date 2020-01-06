import { Router } from 'express';

import { transactionRoutes } from './transaction';

const routes = Router();

routes.get('/healthcheck', () => 'everything good');

routes.use('/transaction', transactionRoutes);

export { routes };
