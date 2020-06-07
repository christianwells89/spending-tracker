import { Router } from 'express';

import { AccountController } from 'controllers/AccountController';
import { ScheduledTransactionController } from 'controllers/ScheduledTransactionController';
import { TransactionController } from 'controllers/TransactionController';

const router = Router();

router.get('/:id', AccountController.getById);
router.get('/', AccountController.getByBudget);
router.get('/:id/balance', AccountController.getBalance);
router.get('/:id/expectedTransactions', ScheduledTransactionController.getByAccount);
router.get('/:id/transactions', TransactionController.getByAccount);
router.post('/', AccountController.create);
router.patch('/:id', AccountController.update);

export { router as accountRoutes };
