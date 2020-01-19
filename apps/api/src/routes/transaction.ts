import { Router } from 'express';

import { TransactionController } from 'controllers/TransactionController';

const router = Router();

router.get('/:id', TransactionController.getById);
router.get('/', TransactionController.getByUser);
router.post('/', TransactionController.create);
router.patch('/:id', TransactionController.update);

export { router as transactionRoutes };
