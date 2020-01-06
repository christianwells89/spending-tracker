import { Column, Entity, ManyToOne } from 'typeorm';

import { Account } from 'entities';
import { BaseEntity } from './Base';

@Entity()
export class Reconciliation extends BaseEntity {
  @Column('decimal')
  amount: number;

  // This assumes the mysql server is in UTC! May be better to explicitly set this
  // This may be redundant since BaseEntity has createdDate
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(
    () => Account,
    account => account.reconciliations,
  )
  account: Account;
}
