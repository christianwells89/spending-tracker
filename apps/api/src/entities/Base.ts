/* eslint-disable max-classes-per-file */

import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// can't really think of a better name for this
export abstract class Dated {
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class BaseEntity extends Dated {
  @PrimaryGeneratedColumn()
  id: number;
}
