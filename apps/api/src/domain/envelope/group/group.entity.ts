import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

import { Envelope } from '../envelope.entity';
import { BaseEntity } from 'domain/base.entity';
import { Budget } from 'domain/budget';

@Entity()
@ObjectType()
export class EnvelopeGroup extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  order: number;

  @Field(() => Envelope)
  @OneToMany(() => Envelope, (envelope) => envelope.group, { eager: true })
  envelopes: Envelope[];

  @ManyToOne(() => Budget)
  budget: Budget;

  @Column()
  budgetId: number;
}
