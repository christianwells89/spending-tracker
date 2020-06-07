// this is literally the exact same as the transaction controller - there should be a way to share
// the code with generics or something - using inversify to inject the repo?
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { ExpectedTransactionDTO } from '@st/types';
import { ScheduledTransaction } from 'entities';

export class ScheduledTransactionController {
  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const expectedTransactionRepo = getRepository(ScheduledTransaction);
    try {
      const transaction = await expectedTransactionRepo.findOneOrFail(id);
      res.send(transaction);
    } catch {
      res.status(404).send('Transaction not found');
    }
  }

  // static async getByUser(req: Request, res: Response): Promise<void> {
  //   // TODO: have page params eg. size, current index
  //   // TODO: get this from the JWT token
  //   const userId = 1;

  //   const expectedTransactionRepo = getRepository(ScheduledTransaction);
  //   const transactions = expectedTransactionRepo.find({
  //     where: { user: { id: userId } },
  //   });

  //   res.send(transactions);
  // }

  static async getByAccount(req: Request, res: Response): Promise<void> {
    const { id: accountId } = req.params;

    const expectedTransactionRepo = getRepository(ScheduledTransaction);
    const transactions = expectedTransactionRepo.find({
      where: { account: { id: parseInt(accountId, 10) } },
    });

    res.send(transactions);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const dto: ExpectedTransactionDTO = req.body;
    dto.userId = 1; // TODO get this from the JWT token
    const transaction = new ScheduledTransaction(dto);

    const expectedTransactionRepo = getRepository(ScheduledTransaction);
    try {
      await expectedTransactionRepo.save(transaction);
      res.send({ transactionId: transaction.id });
    } catch (ex) {
      console.error(ex);
      res.status(500).send();
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto: Partial<ExpectedTransactionDTO> = req.body;

    const expectedTransactionRepo = getRepository(ScheduledTransaction);
    try {
      expectedTransactionRepo.update(id, dto);
    } catch (ex) {
      // this doesn't treat finding and saving separately, so might be a 404 instead
      console.error(ex);
      res.status(500).send();
    }

    res.status(204).send();
  }
}
