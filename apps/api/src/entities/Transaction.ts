import { Column, Entity, ManyToOne } from 'typeorm';

import { TransactionDTO } from '@st/types';
import { Account } from './Account';
import { ExpectedTransaction } from './ExpectedTransaction';
import { TransactionBase } from './TransactionBase';
import { User } from './User';

@Entity()
export class Transaction extends TransactionBase {
  @ManyToOne(
    () => User,
    user => user.transactions,
  )
  user: User;

  @Column()
  userId: number;

  @ManyToOne(
    () => Account,
    account => account.transactions,
  )
  account: Account;

  @Column()
  accountId: number;

  @ManyToOne(() => ExpectedTransaction, { nullable: true })
  expectedTransaction: ExpectedTransaction;

  constructor(dto?: TransactionDTO) {
    super(dto);
    if (dto) {
      this.userId = dto.userId;
      this.accountId = dto.accountId;
    }
  }

  // toDto(): TransactionDTO {
  //   return {

  //   }
  // }
}
