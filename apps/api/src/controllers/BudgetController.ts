import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { BudgetDTO } from '@st/types';
import { Budget } from 'entities';

export class BudgetController {
  static async getByUid(req: Request, res: Response): Promise<void> {
    const { uid } = req.params;

    const budgetRepo = getRepository(Budget);
    try {
      const budget = await budgetRepo.findOneOrFail({ uid });
      res.send(budget);
    } catch {
      res.status(404).send('Transaction not found');
    }
  }

  static async getByUser(req: Request, res: Response): Promise<void> {
    // TODO get this from the JWT token
    const userId = 1;

    const budgetRepo = getRepository(Budget);
    const budgets = budgetRepo.find({
      where: { userId },
    });

    res.send(budgets);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const dto: BudgetDTO = req.body;
    dto.userId = 1; // TODO get this from the JWT token

    const budgetRepo = getRepository(Budget);
    try {
      const budget = await budgetRepo.save(dto);
      res.status(201).send(budget.id);
    } catch {
      res.status(500).send();
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto: Partial<BudgetDTO> = req.body;

    const budgetRepo = getRepository(Budget);
    try {
      budgetRepo.update(id, dto);
    } catch (ex) {
      // this doesn't treat finding and saving separately, so might be a 404 instead
      console.error(ex);
      res.status(500).send();
    }

    res.status(204).send();
  }
}
