// TODO: this was from the old design. It needs to be updated.

import { Column, Entity, ManyToOne } from 'typeorm';

import { Envelope } from '../envelope.entity';
import { BaseEntityWithUid } from 'domain/base.entity';

@Entity()
export class EnvelopeGoal extends BaseEntityWithUid {
  @Column('decimal', { precision: 20, scale: 2 })
  amount: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fromDate: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => Envelope, (envelope) => envelope.goals)
  envelope: Envelope;
}
