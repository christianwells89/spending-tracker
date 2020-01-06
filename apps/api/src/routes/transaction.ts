import { Router } from 'express';

import { TransactionController } from 'controllers/transaction.controller';

const router = Router();

router.get('/:id', TransactionController.getTransaction);

export { router as transactionRoutes };
