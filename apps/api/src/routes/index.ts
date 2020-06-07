import { Router } from 'express';

import { accountRoutes } from './account';
import { budgetRoutes } from './budget';
import { scheduledTransactionRoutes } from './scheduledTransaction';
import { transactionRoutes } from './transaction';

const routes = Router();

routes.get('/healthcheck', () => 'everything good');

routes.use('/account', accountRoutes);
routes.use('/budget', budgetRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/expectedTransaction', scheduledTransactionRoutes);

export { routes };
