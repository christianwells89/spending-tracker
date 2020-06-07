import { ChildEntity, Column, Entity, ManyToOne, OneToMany, TableInheritance } from 'typeorm';

import { AccountDTO, AccountType } from '@st/types';
import { Investment, PropertyValuation } from './AccountChildren';
import { BaseEntityWithUid } from './Base';
import { Budget } from './Budget';
import { ScheduledTransaction } from './ScheduledTransaction';
import { Reconciliation } from './Reconciliation';
import { Transaction } from './Transaction';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Account extends BaseEntityWithUid {
  @Column()
  uid: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  @Column()
  description: string;

  @Column({ nullable: true })
  institution: string | null;

  /**
   * Something to quickly identify an account with eg. last 4 digits of a card
   */
  @Column({ nullable: true })
  identifier: string | null;

  @Column({ nullable: true })
  notes: string | null;

  @ManyToOne(() => Budget, (budget) => budget.accounts)
  budget: Budget;

  @Column()
  budgetId: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => ScheduledTransaction, (expected) => expected.account)
  scheduledTransactions: ScheduledTransaction[];

  @OneToMany(() => Reconciliation, (reconciliation) => reconciliation.account)
  reconciliations: Reconciliation[];

  constructor(dto?: AccountDTO) {
    super();
    if (dto) {
      this.type = dto.type;
      this.description = dto.description;
      this.institution = dto.institution;
      this.identifier = dto.identifier;
      this.budgetId = dto.budgetId;
    }
  }
}

// TODO: make a view entity that gets the current balance from the transactions/reconciliations

@ChildEntity()
export class Portfolio extends Account {
  @Column()
  type: AccountType.portfolio;

  @OneToMany(() => Investment, (investment) => investment.portfolio)
  investments: Investment[];
}

@ChildEntity()
export class Property extends Account {
  @Column()
  type: AccountType.property;

  @OneToMany(() => PropertyValuation, (valuation) => valuation.property)
  valuations: PropertyValuation[];
}
