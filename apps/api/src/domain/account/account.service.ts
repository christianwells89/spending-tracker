import { Service } from 'typedi';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { InjectRepository } from 'helpers';
import { Transaction } from 'domain/transaction';

@Service()
export class AccountService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getBalance(account: Account): Promise<number> {
    // I feel like this is better served calculating this in the DB. This method could also be
    // cached, and invalidated by changing anything in the transactions for this account
    const { balance } = await this.transactionRepository
      .createQueryBuilder('trans')
      .select('SUM(trans.amount)', 'balance')
      .where('trans.accountId = :accountId', { accountId: account.id })
      .getRawOne();

    return parseFloat(balance);
  }
}
