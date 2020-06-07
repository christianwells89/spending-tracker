import { Router } from 'express';

import { BudgetController } from 'controllers/BudgetController';

const router = Router();

router.get('/:id', BudgetController.getByUid);
router.get('/', BudgetController.getByUser);
router.post('/', BudgetController.create);
router.patch('/:id', BudgetController.update);

export { router as budgetRoutes };
