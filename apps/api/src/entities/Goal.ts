import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { Account, User } from 'entities';
import { BaseEntity } from './Base';

// TODO: timeframe, categories/tags, above/below (maybe the goal is to not spend as much in a tag, but it's not really a budget)

@Entity()
export class Goal extends BaseEntity {
  @Column('decimal')
  amount: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fromDate: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @ManyToOne(
    () => User,
    user => user.transactions,
  )
  user: User;

  // maybe I have it look at categories/tags instead of just an account in future
  @ManyToMany(() => Account)
  @JoinTable()
  accounts: Account[];
}
