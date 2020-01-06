import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Transaction } from 'entities';

export class TransactionController {
  static async getTransaction(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const transactionRepo = getRepository(Transaction);

    try {
      const transaction = await transactionRepo.findOneOrFail(id);
      res.send(transaction);
    } catch {
      res.status(404).send('Transaction not found');
    }
  }
}
