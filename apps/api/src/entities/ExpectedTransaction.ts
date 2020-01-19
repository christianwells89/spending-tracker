import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ExpectedTransactionDTO } from '@st/types';
import { Account } from './Account';
import { TransactionBase } from './TransactionBase';
import { User } from './User';

@Entity()
export class ExpectedTransaction extends TransactionBase {
  @Column()
  rrule: string;

  @ManyToOne(
    () => User,
    user => user.expectedTransactions,
  )
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @ManyToOne(
    () => Account,
    account => account.expectedTransactions,
  )
  @JoinColumn()
  account: Account;

  @Column()
  accountId: number;

  constructor(dto?: ExpectedTransactionDTO) {
    super(dto);
    if (dto) {
      this.rrule = dto.rrule;
      this.userId = dto.userId;
      this.accountId = dto.accountId;
    }
  }
}
