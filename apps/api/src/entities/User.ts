import { Column, Entity, OneToMany } from 'typeorm';

import { Account } from './Account';
import { BaseEntity } from './Base';
import { Budget } from './Budget';
import { Category } from './Category';
import { ExpectedTransaction } from './ExpectedTransaction';
import { Goal } from './Goal';
import { Transaction } from './Transaction';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  // TODO: this should be hashed with bcrypt
  @Column()
  password: string;

  @Column()
  timezone: string;

  @OneToMany(
    () => Account,
    account => account.user,
  )
  accounts: Account[];

  // TODO: shared accounts

  @OneToMany(
    () => Transaction,
    transaction => transaction.user,
  )
  transactions: Transaction[];

  @OneToMany(
    () => ExpectedTransaction,
    expected => expected.user,
  )
  expectedTransactions: ExpectedTransaction[];

  @OneToMany(
    () => Category,
    category => category.user,
  )
  categories: Category[];

  @OneToMany(
    () => Budget,
    budget => budget.user,
  )
  budgets: Budget[];

  @OneToMany(
    () => Goal,
    goal => goal.user,
  )
  goals: Goal[];
}
