import { Field, Float, ObjectType } from 'type-graphql';
import { Column, OneToMany } from 'typeorm';

import { Account } from 'domain/account';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Envelope, EnvelopeSub } from 'domain/envelope';

@ObjectType()
export abstract class TransactionBase extends BaseEntityWithUid {
  @Column('decimal', { precision: 20, scale: 2 })
  @Field(() => Float)
  amount: number;

  @Column()
  @Field()
  date: Date;

  @Column()
  @Field()
  payee: string; // TODO: break this out into its own table

  @Column({ nullable: true })
  @Field({ nullable: true })
  detail?: string;

  @Column({ default: false })
  @Field()
  cleared: boolean;

  @Column({ default: false })
  @Field()
  isTransfer: boolean;

  /**
   * Can be null if this is a transfer to another account, or if this is in a tracked account.
   */
  @Column({ nullable: true })
  @Field({ nullable: true })
  envelopeId: number;

  @OneToMany(() => EnvelopeSub, (sub) => sub.transactions, { nullable: true })
  subEnvelope: EnvelopeSub;

  @Column({ nullable: true })
  @Field({ nullable: true })
  subEnvelopeId: number;

  abstract account: Account;

  @Column()
  @Field()
  accountId: number;
}
