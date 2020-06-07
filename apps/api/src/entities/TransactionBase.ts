/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Column, OneToMany } from 'typeorm';

import { TransactionDTO } from '@st/types';
import { Account } from './Account';
import { BaseEntityWithUid } from './Base';
import { Envelope } from './Envelope';

export abstract class TransactionBase extends BaseEntityWithUid {
  @Column('decimal', { precision: 20, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @Column()
  payee: string;

  @Column()
  detail: string;

  @Column()
  cleared: boolean = false;

  @Column()
  isTransfer: boolean = false;

  /**
   * Can be null if this is a transfer to another account, or if this is in a tracked account.
   */
  @OneToMany(() => Envelope, (envelope) => envelope.transactions, { nullable: true })
  envelope: Envelope;

  @Column()
  envelopeId: number;

  abstract account: Account;

  constructor(dto?: TransactionDTO) {
    super();
    if (dto) {
      this.amount = dto.amount;
      this.date = dto.date;
      this.payee = dto.payee;
      this.envelopeId = dto.envelopeId;
    }
  }
}
