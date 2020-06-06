import { Column, Entity, ManyToOne } from 'typeorm';

import { ReconciliationDTO } from '@st/types';
import { Account } from './Account';
import { BaseEntity } from './Base';

@Entity()
export class Reconciliation extends BaseEntity {
  @Column('decimal', { precision: 20, scale: 2 })
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

  // TODO: in controller when creating one, use difference there to make a transaction if needed
  constructor(dto?: ReconciliationDTO) {
    super();
    if (dto) {
      this.amount = dto.amount;
      this.date = dto.date;
    }
  }
}
