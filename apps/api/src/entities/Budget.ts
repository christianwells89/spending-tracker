import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Currency } from '@st/types';
import { Account } from './Account';
import { BaseEntityWithUid } from './Base';
import { Envelope } from './Envelope';
import { User } from './User';

@Entity()
export class Budget extends BaseEntityWithUid {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: Currency })
  categories: string[];

  @Column({ nullable: true })
  timezone: string;

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Envelope, (envelope) => envelope.budget)
  envelopes: Envelope[];

  @OneToMany(() => Account, (account) => account.budget)
  accounts: Account[];
}
