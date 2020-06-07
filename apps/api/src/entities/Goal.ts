// TODO: this was from the old design. It needs to be updated.

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntityWithUid } from './Base';
import { Envelope } from './Envelope';

@Entity()
export class Goal extends BaseEntityWithUid {
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
