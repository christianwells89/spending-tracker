import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntityWithUid } from './Base';
import { Envelope } from './Envelope';

@Entity()
export class EnvelopeMonth extends BaseEntityWithUid {
  @Column()
  description: string;

  @Column()
  month: Date;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column('decimal', { precision: 20, scale: 2 })
  allocated: number = 0;

  @ManyToOne(() => Envelope, (envelope) => envelope.months)
  envelope: Envelope;
}

// TODO: make a view entity that includes activity and balance. This will get expensive fast if
// many people are using the app at once or if they have a lot of envelopes so this should be
// cached where possible at scale.
