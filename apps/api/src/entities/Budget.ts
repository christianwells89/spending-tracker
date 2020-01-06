import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from 'entities';
import { BaseEntity } from './Base';

@Entity()
export class Budget extends BaseEntity {
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

  // for a whole account?

  @Column()
  shouldRollOver: boolean;

  @ManyToOne(
    () => User,
    user => user.budgets,
  )
  user: User;
}
