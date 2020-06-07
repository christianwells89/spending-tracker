import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

import { BaseEntityWithUid } from './Base';
import { Budget } from './Budget';
import { EnvelopeGroup } from './EnvelopeGroup';
import { EnvelopeMonth } from './EnvelopeMonth';
import { Goal } from './Goal';
import { Transaction } from './Transaction';

@Entity()
export class Envelope extends BaseEntityWithUid {
  @Column()
  name: string;

  @Column()
  order: number;

  @OneToMany(() => EnvelopeMonth, (month) => month.envelope)
  months: EnvelopeMonth[];

  @ManyToOne(() => EnvelopeGroup, (group) => group.envelopes, { nullable: true })
  group: EnvelopeGroup;

  /**
   * A user will have only one envelope with this true, and it will be a special, hidden one that
   * is used by us to assign inflow money to.
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column()
  isIntake: boolean = false;

  @Column()
  groupId: number;

  @ManyToOne(() => Budget, (budget) => budget.envelopes)
  budget: Budget;

  @OneToMany(() => Transaction, (transaction) => transaction.envelope)
  transactions: Transaction[];

  @OneToMany(() => Goal, (goal) => goal.envelope)
  goals: Goal[];
}

// TODO: Have sub-envelopes. The use case is for reporting - say I want to give myself $200 a month
// for fun things, but don't want to be specific. I still want to track what things I'm
// spending money on more granually, though. So the subs wouldn't be able to be allocated any
// money directly, but you would still see activity
