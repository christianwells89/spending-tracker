import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { TransactionDTO } from '@st/types';
import { Transaction } from 'entities';

export class TransactionController {
  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const transactionRepo = getRepository(Transaction);
    try {
      const transaction = await transactionRepo.findOneOrFail(id);
      res.send(transaction);
    } catch {
      res.status(404).send('Transaction not found');
    }
  }

  static async getByUser(req: Request, res: Response): Promise<void> {
    // TODO: have page params eg. size, current index, order (with direction), after (date)
    // TODO: get this from the JWT token
    const userId = 1;

    const transactionRepo = getRepository(Transaction);
    const transactions = transactionRepo.find({
      where: { user: { id: userId } },
    });

    res.send(transactions);
  }

  static async getByAccount(req: Request, res: Response): Promise<void> {
    const { id: accountId } = req.params;

    const transactionRepo = getRepository(Transaction);
    const transactions = transactionRepo.find({
      where: { account: { id: parseInt(accountId, 10) } },
    });

    res.send(transactions);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const dto: TransactionDTO = req.body;
    dto.userId = 1; // TODO get this from the JWT token
    const transaction = new Transaction(dto);

    const transactionRepo = getRepository(Transaction);
    try {
      await transactionRepo.save(transaction);
      res.send({ transactionId: transaction.id });
    } catch (ex) {
      console.error(ex);
      res.status(500).send();
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto: Partial<TransactionDTO> = req.body;

    const transactionRepo = getRepository(Transaction);
    try {
      transactionRepo.update(id, dto);
    } catch (ex) {
      // this doesn't treat finding and saving separately, so might be a 404 instead
      console.error(ex);
      res.status(500).send();
    }

    res.status(204).send();
  }
}
