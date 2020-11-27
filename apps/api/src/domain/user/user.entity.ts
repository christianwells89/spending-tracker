import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'domain/base.entity';
import { Budget } from 'domain/budget';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  // TODO: this should be hashed with bcrypt
  @Column()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  timezone?: string;

  @OneToMany(() => Budget, (budget) => budget.user, { eager: true })
  @Field(() => [Budget])
  budgets: Budget[];
}
