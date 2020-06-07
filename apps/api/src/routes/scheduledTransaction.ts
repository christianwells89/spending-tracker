import { Router } from 'express';

import { ScheduledTransactionController } from 'controllers/ScheduledTransactionController';

const router = Router();

router.get('/:id', ScheduledTransactionController.getById);
// router.get('/', ScheduledTransactionController.getByUser);
router.post('/', ScheduledTransactionController.create);
router.patch('/:id', ScheduledTransactionController.update);

export { router as scheduledTransactionRoutes };
