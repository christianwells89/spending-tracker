import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './Base';
import { User } from './User';

@Entity()
export class Budget extends BaseEntity {
  @Column()
  amount: number;

  @Column('simple-array')
  categories: string[];

  @Column('simple-array')
  tags: string[];

  /**
   * If a transaction matches a category/tag for this budget but also has a tag from here it should
   * not count towards the budget. Useful for things like travel, one-offs etc.
   */
  @Column('simple-array')
  excludedTags: string[];

  @Column()
  fromDate: Date;

  @Column({ nullable: true })
  toDate: Date;

  /**
   * Represents the time at which the budget period resets
   */
  // this is nullable for now because the app will just assume it's always monthly for now. Change
  // to defaulting to whatever the monthly rrule would be later
  @Column({ nullable: true })
  rrule: string;

  // for a whole account?

  // might need to have a separate table to keep track of these, since a budget that has gone for
  // a long time would take a lot of transactions to figure it out. Or it could be cached. A later
  // problem. Much later.
  @Column({ default: false })
  shouldRollOver: boolean;

  @ManyToOne(
    () => User,
    user => user.budgets,
  )
  user: User;

  @Column()
  userId: number;
}
