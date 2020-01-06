// Group is an ordered string array to allow multiple levels
import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from 'entities';
import { BaseEntity } from './Base';

/**
 * Custom categories a user can save to facilitate quicker transaction entering. Never directly used for transactions
 */
@Entity()
export class Category extends BaseEntity {
  /**
   * Short description, also used in transactions
   */
  @Column()
  identifier: string;

  @Column({ nullable: true })
  description: string | null;

  @Column('simple-array')
  group: string[];

  @ManyToOne(
    () => User,
    user => user.categories,
  )
  user: User;
}
