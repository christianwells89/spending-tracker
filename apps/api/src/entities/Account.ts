import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import {
  ExpectedTransaction,
  Reconciliation,
  Transaction,
  User,
} from 'entities';
import { BaseEntity } from './Base';

export enum AccountType {
  checking = 'checking',
  savings = 'savings',
  creditCard = 'creditCard',
  cash = 'cash',
}

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
}
