import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { AccountDTO, ReconciliationDTO } from '@st/types';
import { Account, Reconciliation } from 'entities';

export class AccountController {
  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const accountRepo = getRepository(Account);

    try {
      const account = await accountRepo.findOneOrFail(id);
      res.send(account);
    } catch {
      res.status(404).send('Account not found');
    }
  }

  static async getByUser(req: Request, res: Response): Promise<void> {
    // TODO: option to get balance for all as well
    // TODO get this from the JWT token
    const userId = 1;
    const accountRepo = getRepository(Account);

    const accounts = accountRepo.find({
      where: { user: { id: userId } },
    });

    res.send(accounts);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const {
      account: accoutDto,
      reconciliation: reconciliationDto,
    }: { account: AccountDTO; reconciliation: ReconciliationDTO } = req.body;
    accoutDto.userId = 1; // TODO get this from the JWT token
    const account = new Account(accoutDto, reconciliationDto);
    const accountRepo = getRepository(Account);

    try {
      await accountRepo.save(account);
      res.status(201).send(account.id);
    } catch {
      res.status(500).send();
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto: Partial<AccountDTO> = req.body;

    const accountRepo = getRepository(Account);
    try {
      accountRepo.update(id, dto);
    } catch (ex) {
      // this doesn't treat finding and saving separately, so might be a 404 instead
      console.error(ex);
      res.status(500).send();
    }

    res.status(204).send();
  }

  static async getBalance(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const accountRepo = getRepository(Account);
    let account: Account;
    // this should probably be deferred to an accounts service or something
    // it's also super inefficient. Ideally it should only take the transactions after the last
    // reconcilation
    try {
      account = await accountRepo.findOneOrFail(id, {
        relations: ['reconciliations', 'transactions'],
      });
    } catch (ex) {
      res.status(404).send('Account not found');
      return;
    }

    const lastReconciliation = account.reconciliations.reduce(
      (latest: Reconciliation, current: Reconciliation) =>
        current.date > latest.date ? current : latest,
    );
    const balance = account.transactions
      .filter(t => t.date > lastReconciliation.date)
      .reduce((sum, t) => sum + t.realAmount, 0);

    res.send(balance);
  }
}
