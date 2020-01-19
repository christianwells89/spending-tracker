import { Router } from 'express';

import { ExpectedTransactionController } from 'controllers/ExpectedTransactionController';

const router = Router();

router.get('/:id', ExpectedTransactionController.getById);
router.get('/', ExpectedTransactionController.getByUser);
router.post('/', ExpectedTransactionController.create);
router.patch('/:id', ExpectedTransactionController.update);

export { router as expectedTransactionRoutes };
