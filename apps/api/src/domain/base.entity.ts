import { nanoid } from 'nanoid';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export abstract class BaseEntityWithUid extends BaseEntity {
  @Column({ unique: true })
  @Field()
  uid: string;

  @BeforeInsert()
  setUid(): void {
    this.uid = nanoid();
  }
}
