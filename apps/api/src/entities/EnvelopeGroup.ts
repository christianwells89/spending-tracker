import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './Base';
import { Envelope } from './Envelope';

@Entity()
export class EnvelopeGroup extends BaseEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @OneToMany(() => Envelope, (envelope) => envelope.group)
  envelopes: Envelope[];
}
