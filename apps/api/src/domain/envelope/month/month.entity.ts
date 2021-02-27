import { Field, Float, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Envelope } from '../envelope.entity';
import { BaseEntityWithUid } from 'domain/base.entity';

@Entity()
@ObjectType()
export class EnvelopeMonth extends BaseEntityWithUid {
  @Column({ nullable: true })
  description: string; // not really sure what I meant to do with this. I'll leave it for now

  /**
   * A full date of midnight on the first day of the month.
   */
  @Column()
  @Field(() => String) // returns a MonthInYear string to the outside
  month: Date;

  @Column('decimal', { precision: 20, scale: 2, default: 0 })
  @Field(() => Float)
  allocated: number;

  @Field(() => Float)
  activity?: number;

  @Field(() => Float)
  available?: number;

  @ManyToOne(() => Envelope, (envelope) => envelope.months)
  envelope: Envelope;

  @Column()
  @Field(() => Int)
  envelopeId: number;
}

// TODO: make a view entity that includes activity and available? There are field resolvers for
// these right now.
