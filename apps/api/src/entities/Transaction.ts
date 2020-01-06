/* eslint-disable max-classes-per-file */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Account, User } from 'entities';
import { Dated } from './Base';

export enum TransactionType {
  expense = 'expense',
  income = 'income',
}

abstract class TransactionBase extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('decimal')
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column()
  date: Date;

  // kind of a confusing name. Merchant?
  @Column({ nullable: true })
  location: string | null;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];
}

export enum ExpectedTransactionFrequency {
  daily = 'daily',
  weekly = 'monthly',
  annually = 'annually',
  oneOff = 'oneOff',
}

// TODO make a map of possible options for these eg.
// specificDay - first, {number}, last
// weekOfMonth - first, second, third, last
export enum ExpectedTransactionPrecision {
  specificDay = 'specificDay',
  weekOfMonth = 'weekOfMonth',
}

@Entity()
export class ExpectedTransaction extends TransactionBase {
  @Column({
    type: 'enum',
    enum: ExpectedTransactionFrequency,
  })
  frequency: ExpectedTransactionFrequency;

  @Column({
    type: 'enum',
    enum: ExpectedTransactionPrecision,
  })
  precision: ExpectedTransactionPrecision;

  @Column()
  value: string;

  @ManyToOne(
    () => User,
    user => user.expectedTransactions,
  )
  user: User;

  @ManyToOne(
    () => Account,
    account => account.expectedTransactions,
  )
  account: Account;
}

@Entity()
export class Transaction extends TransactionBase {
  @ManyToOne(
    () => User,
    user => user.transactions,
  )
  user: User;

  @ManyToOne(
    () => Account,
    account => account.transactions,
  )
  account: Account;

  @ManyToOne(() => ExpectedTransaction, { nullable: true })
  expectedTransaction: ExpectedTransaction;
}
