import { Column } from 'typeorm';

import { TransactionDTO, TransactionType } from '@st/types';
import { Account } from './Account';
import { User } from './User';
import { BaseEntity } from './Base';

export abstract class TransactionBase extends BaseEntity {
  @Column('decimal', { precision: 20, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column()
  date: Date;

  // kind of a confusing name. Merchant?
  @Column({ nullable: true })
  location: string | null;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  abstract user: User;
  abstract account: Account;

  /**
   * Amount is always positive, the type depends on whether the real amount is negative or positive
   */
  get realAmount(): number {
    return this.amount * (this.type === TransactionType.expense ? -1 : 1);
  }

  constructor(dto?: TransactionDTO) {
    super();
    if (dto) {
      this.amount = dto.amount;
      this.type = dto.type;
      this.date = dto.date;
      this.location = dto.location;
      this.description = dto.description;
      this.category = dto.category;
      this.tags = dto.tags;
    }
  }
}
