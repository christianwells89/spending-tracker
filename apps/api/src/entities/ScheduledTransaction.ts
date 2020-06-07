import { Column, Entity, ManyToOne } from 'typeorm';

import { ExpectedTransactionDTO } from '@st/types';
import { Account } from './Account';
import { TransactionBase } from './TransactionBase';

@Entity()
export class ScheduledTransaction extends TransactionBase {
  @Column()
  rrule: string;

  @ManyToOne(() => Account, (account) => account.scheduledTransactions)
  account: Account;

  @Column()
  accountId: number;

  constructor(dto?: ExpectedTransactionDTO) {
    super(dto);
    if (dto) {
      this.rrule = dto.rrule;
      this.accountId = dto.accountId;
    }
  }
}
