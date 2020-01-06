import { Column, Entity, OneToMany } from 'typeorm';

import {
  Account,
  Budget,
  Category,
  ExpectedTransaction,
  Transaction,
} from 'entities';
import { BaseEntity } from './Base';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column('simple-array')
  hiddenDefaultCategories: string[];

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
}
