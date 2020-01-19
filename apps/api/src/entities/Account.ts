import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AccountDTO, AccountType, ReconciliationDTO } from '@st/types';
import { BaseEntity } from './Base';
import { ExpectedTransaction } from './ExpectedTransaction';
import { Reconciliation } from './Reconciliation';
import { Transaction } from './Transaction';
import { User } from './User';

@Entity()
export class Account extends BaseEntity {
  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  @Column()
  description: string;

  @Column({ nullable: true })
  institution: string | null;

  /**
   * Something to quickly identify an account with eg. last 4 digits of a card
   */
  @Column({ nullable: true })
  identifier: string | null;

  @Column('simple-array')
  tags: string[];

  @ManyToOne(
    () => User,
    user => user.accounts,
    { nullable: true }, // If it's a shared account
  )
  user: User;

  @Column()
  userId: number;

  @OneToMany(
    () => Transaction,
    transaction => transaction.account,
  )
  transactions: Transaction[];

  @OneToMany(
    () => ExpectedTransaction,
    expected => expected.account,
  )
  expectedTransactions: ExpectedTransaction[];

  @OneToMany(
    () => Reconciliation,
    reconciliation => reconciliation.account,
  )
  reconciliations: Reconciliation[];

  constructor(dto?: AccountDTO, reconciliationDto?: ReconciliationDTO) {
    super();
    if (dto && reconciliationDto) {
      this.type = dto.type;
      this.description = dto.description;
      this.institution = dto.institution;
      this.identifier = dto.identifier;
      this.tags = dto.tags;
      this.userId = dto.userId;
      this.reconciliations = [new Reconciliation(reconciliationDto)];
    }
  }
}
