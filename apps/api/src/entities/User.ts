import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './Base';
import { Budget } from './Budget';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  // TODO: this should be hashed with bcrypt
  @Column()
  password: string;

  @Column({ nullable: true })
  timezone: string;

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];
}
