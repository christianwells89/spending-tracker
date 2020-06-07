import { nanoid } from 'nanoid';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // TODO: once everything has a DTO
  // abstract toDto?(): any;
}

export abstract class BaseEntityWithUid extends BaseEntity {
  @Column({ unique: true })
  uid: string = nanoid();
}
