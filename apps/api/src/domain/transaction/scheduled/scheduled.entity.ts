import { Column, Entity, ManyToOne } from 'typeorm';

import { TransactionBase } from '../transaction.base';
import { Account } from 'domain/account';

@Entity()
export class ScheduledTransaction extends TransactionBase {
  @Column()
  rrule: string;

  @ManyToOne(() => Account, (account) => account.scheduledTransactions)
  account: Account;
}
