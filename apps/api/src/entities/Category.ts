import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './Base';
import { User } from './User';

@Entity()
export class Category extends BaseEntity {
  /**
   * Short description, also used in transactions
   */
  @Column()
  identifier: string;

  @Column({ nullable: true })
  description: string | null;

  // an ordered array to allow multiple levels
  @Column('simple-array')
  group: string[];

  @ManyToOne(
    () => User,
    user => user.categories,
  )
  user: User;

  @Column()
  userId: number;
}
