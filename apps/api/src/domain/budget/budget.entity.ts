import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Currency } from '@st/types';
import { Account } from 'domain/account';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Envelope } from 'domain/envelope';
import { User } from 'domain/user';

@Entity()
@ObjectType()
export class Budget extends BaseEntityWithUid {
  @Column()
  @Field()
  name: string;

  @Column({ type: 'enum', enum: Currency })
  @Field()
  currency: Currency;

  @Column({ nullable: true })
  @Field({ nullable: true })
  timezone?: string;

  @ManyToOne(() => User, (user) => user.budgets)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Int)
  userId: number;

  @OneToMany(() => Envelope, (envelope) => envelope.budget, { cascade: true })
  envelopes: Envelope[];

  @OneToMany(() => Account, (account) => account.budget)
  accounts: Account[];
}
