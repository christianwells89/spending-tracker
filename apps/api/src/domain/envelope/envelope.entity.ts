import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

import type { EnvelopeInput } from './envelope.input';
import { EnvelopeGroup } from './group/group.entity';
import { EnvelopeMonth } from './month/month.entity';
import { EnvelopeGoal } from './goal/goal.entity';
import { EnvelopeSub } from './sub/sub.entity';
import { BaseEntityWithUid } from 'domain/base.entity';
import { Budget } from 'domain/budget';
import { Transaction } from 'domain/transaction';

@Entity()
@ObjectType()
export class Envelope extends BaseEntityWithUid {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  order: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string;

  /**
   * A user will have only one envelope with this true, and it will be a special, hidden one that
   * is used by us to assign inflow money to.
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column({ default: false })
  @Field()
  isIntake: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  hiddenFrom: Date;

  @OneToMany(() => EnvelopeMonth, (month) => month.envelope)
  months: EnvelopeMonth[];

  @ManyToOne(() => EnvelopeGroup, (group) => group.envelopes, { nullable: true })
  group: EnvelopeGroup;

  @Column({ nullable: true })
  groupId: number;

  @ManyToOne(() => Budget, (budget) => budget.envelopes)
  budget: Budget;

  @Column()
  budgetId: number;

  @OneToMany(() => Transaction, (transaction) => transaction.envelope)
  transactions: Transaction[];

  @OneToMany(() => EnvelopeGoal, (goal) => goal.envelope)
  goals: EnvelopeGoal[];

  @OneToMany(() => EnvelopeSub, (sub) => sub.envelope)
  subs: EnvelopeSub[];

  constructor(input?: Partial<EnvelopeInput>) {
    super();
    if (input) {
      this.name = input.name;
      this.order = input.order;
      this.groupId = input.groupId;
      this.budgetId = input.budgetId;
    }
  }
}
