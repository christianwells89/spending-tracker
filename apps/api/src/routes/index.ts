import { Router } from 'express';

import { accountRoutes } from './account';
import { budgetRoutes } from './budget';
import { expectedTransactionRoutes } from './expectedTransaction';
import { transactionRoutes } from './transaction';

const routes = Router();

routes.get('/healthcheck', () => 'everything good');

routes.use('/account', accountRoutes);
routes.use('/budget', budgetRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/expectedTransaction', expectedTransactionRoutes);

export { routes };
