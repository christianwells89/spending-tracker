import { Column, Entity, OneToMany } from 'typeorm';

import { Envelope } from '../envelope.entity';
import { BaseEntity } from 'domain/base.entity';

@Entity()
export class EnvelopeGroup extends BaseEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @OneToMany(() => Envelope, (envelope) => envelope.group)
  envelopes: Envelope[];
}
