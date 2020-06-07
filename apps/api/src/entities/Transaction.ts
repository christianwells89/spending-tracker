import { Column, Entity, ManyToOne } from 'typeorm';

import { TransactionDTO } from '@st/types';
import { Account } from './Account';
import { ScheduledTransaction } from './ScheduledTransaction';
import { TransactionBase } from './TransactionBase';

@Entity()
export class Transaction extends TransactionBase {
  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Column()
  accountId: number;

  @ManyToOne(() => ScheduledTransaction, { nullable: true })
  scheduledTransaction: ScheduledTransaction;

  constructor(dto?: TransactionDTO) {
    super(dto);
    if (dto) {
      this.accountId = dto.accountId;
    }
  }

  // toDto(): TransactionDTO {
  //   return {

  //   }
  // }
}
