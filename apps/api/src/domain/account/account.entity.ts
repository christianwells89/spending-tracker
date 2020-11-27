import { Field, Int, ObjectType } from 'type-graphql';
import { ChildEntity, Column, Entity, ManyToOne, OneToMany, TableInheritance } from 'typeorm';

import { AccountType } from '@st/types';
import { Asset } from './asset/asset.entity';
import { Valuation } from './valuation/valuation.entity';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Budget } from 'domain/budget';
import { ScheduledTransaction, Transaction } from 'domain/transaction';

@Entity()
@ObjectType()
@TableInheritance({ column: { type: 'varchar', name: 'entityType' } })
export class Account extends BaseEntityWithUid {
  @Column({ type: 'enum', enum: AccountType })
  @Field()
  type: AccountType; // "type" seems to cause issues with typeORM, maybe it's a prop name of theirs

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  institution: string | null;

  /**
   * Something to quickly identify an account with eg. last 4 digits of a card
   */
  @Column({ nullable: true })
  @Field({ nullable: true })
  identifier: string | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string | null;

  /**
   * Whether transactions should affect envelopes. This will be false for an "asset" type of account.
   */
  @Column({ default: true })
  @Field()
  trackSpending: boolean;

  @ManyToOne(() => Budget, (budget) => budget.accounts)
  budget: Budget;

  @Column()
  @Field(() => Int)
  budgetId: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => ScheduledTransaction, (expected) => expected.account)
  scheduledTransactions: ScheduledTransaction[];
}

// TODO: make a view entity that gets the current balance from the transactions
// or just use a field resolver and get it using the querybuilder?

@ChildEntity({ name: 'account_portfolio' })
export class Portfolio extends Account {
  @Column()
  type: AccountType.portfolio;

  @Column()
  trackSpending: false;

  @OneToMany(() => Asset, (investment) => investment.portfolio)
  securities: Asset[];
}

@ChildEntity({ name: 'account_property' })
export class Property extends Account {
  @Column()
  type: AccountType.property;

  @Column()
  trackSpending: false;

  @OneToMany(() => Valuation, (valuation) => valuation.property)
  valuations: Valuation[];
}
