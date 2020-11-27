import { ObjectType, Field, Int } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { TransactionState } from '@st/types';
import { ScheduledTransaction } from './scheduled/scheduled.entity';
import { TransactionBase } from './transaction.base';
import { Account } from 'domain/account';
import { Envelope } from 'domain/envelope';

@Entity()
@ObjectType()
export class Transaction extends TransactionBase {
  @Column({ type: 'enum', enum: TransactionState, default: TransactionState.pending })
  @Field()
  state: TransactionState;

  @ManyToOne(() => Account, (account) => account.transactions)
  @Field(() => Account)
  account: Account;

  @ManyToOne(() => Envelope, (envelope) => envelope.transactions, { nullable: true })
  @Field(() => Envelope, { nullable: true })
  envelope: Envelope;

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
