import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Envelope } from '../envelope.entity';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Transaction, ScheduledTransaction } from 'domain/transaction';

/**
 * A sub-envelope is used when you want to drill down into an envelope in reporting without having
 * to split it up into separate envelopes, or figure out how much to allocate to each one.
 */
@Entity()
@ObjectType()
export class EnvelopeSub extends BaseEntityWithUid {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  order: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string;

  @OneToMany(() => Envelope, (envelope) => envelope.subs)
  envelope: Envelope;

  @ManyToOne(() => Transaction)
  transactions: Transaction[];

  @ManyToOne(() => ScheduledTransaction)
  scheduledTransactions: ScheduledTransaction[];

  activity?: number;
}
