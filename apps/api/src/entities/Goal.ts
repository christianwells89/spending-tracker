import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { BaseEntity } from './Base';
import { Account } from './Account';
import { User } from './User';
// import { Account, User } from 'entities';

// TODO: timeframe, categories/tags, above/below (maybe the goal is to not spend as much in a tag, but it's not really a budget)

@Entity()
export class Goal extends BaseEntity {
  @Column('decimal', { precision: 20, scale: 2 })
  amount: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fromDate: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ default: false })
  isComplete: boolean;

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
