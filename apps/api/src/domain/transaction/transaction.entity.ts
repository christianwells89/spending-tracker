import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import { ScheduledTransaction } from './scheduled/scheduled.entity';
import { TransactionBase } from './transaction.base';
import { Account } from 'domain/account';

@Entity()
@ObjectType()
export class Transaction extends TransactionBase {
  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne(() => ScheduledTransaction, { nullable: true })
  scheduledTransaction: ScheduledTransaction;
}

// This is a special kind of object which is not an entity but doesn't have anywhere else to live
// right at this moment.
@ObjectType()
export class Payee {
  @Field()
  name: string;

  @Field(() => Int)
  lastEnvelopeId: number;
}
