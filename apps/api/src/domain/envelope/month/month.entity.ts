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
  @Field()
  month: Date;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column('decimal', { precision: 20, scale: 2, default: 0 })
  @Field(() => Float)
  allocated: number;

  activity?: number;
  available?: number;

  @ManyToOne(() => Envelope, (envelope) => envelope.months)
  envelope: Envelope;

  @Column()
  @Field(() => Int)
  envelopeId: number;
}

// TODO: make a view entity that includes activity and balance. This will get expensive fast if
// many people are using the app at once or if they have a lot of envelopes so this should be
// cached where possible at scale.
