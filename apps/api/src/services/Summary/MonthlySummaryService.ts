import { DateTime } from 'luxon';
import { Between, Repository } from 'typeorm';

import { Account, Budget, ExpectedTransaction, Transaction, User, Category } from 'entities';
import { TransactionType } from 'entities/TransactionBase';

export interface CategorySummary {
  name: string;
  planned: number;
  actual: number;
}

export interface AccountSummary {
  name: string;
  spent: number; // change?
  balance: number;
  lastActivity: Date;
}

export interface MonthlySummary {
  expenses: CategorySummary[];
  income: CategorySummary[];
  accounts: AccountSummary[];
}

// Currently working on the assumption that all expected transactions are monthly, as are budgets
export class MonthlySummaryService {
  constructor(
    private transactionRepo: Repository<Transaction>,
    private userRepo: Repository<User>,
  ) {}

  async get(userId: number, year: number, month: number): Promise<MonthlySummary> {
    /*
    - get user, with accounts, budgets, categories, goals
    - get category summaries
    - get expense and income totals
    */
    const user = await this.userRepo.findOne(userId, {
      relations: ['accounts', 'budgets', 'categories', 'expectedTransactions', 'goals'],
    });
    // maybe it should take a timezone from the input rather than saving it?
    const startTime = DateTime.fromObject({ year, month, zone: user.timezone });
    const endTime = startTime.plus({ month: 1 });
    const transactions = await this.transactionRepo.find({
      date: Between(startTime.toJSDate(), endTime.toJSDate()),
    });

    const expenses = this.getCategoryExpenses(
      user.categories,
      transactions,
      user.expectedTransactions,
      user.budgets,
    );
    const income = this.getCategoryIncome(user.categories, transactions, user.expectedTransactions);
    // this will be tricky to figure out for past months
    const accounts = this.getAccounts(user.accounts, transactions);

    return { expenses, income, accounts };
  }

  getAccounts(accounts: Account[], transactions: Transaction[]): AccountSummary[] {
    return accounts.map(a => {
      const filteredTransactions = transactions.filter(
        t => t.accountId === a.id && t.type === TransactionType.expense,
      );

      return {
        name: a.identifier,
        spent: filteredTransactions.reduce(this.sumAmount, 0),
        balance: 0, // TODO: how to figure this out?
        lastActivity: filteredTransactions.reduce(this.latestTransaction, null),
      };
    });
  }

  getCategoryExpenses(
    categories: Category[],
    transactions: Transaction[],
    expectedTransactions: ExpectedTransaction[],
    budgets: Budget[],
  ): CategorySummary[] {
    return categories.map(c => {
      return {
        name: c.identifier,
        planned:
          expectedTransactions
            .filter(t => t.category === c.identifier && t.type === TransactionType.expense)
            .reduce(this.sumAmount, 0) +
          budgets.filter(b => b.categories.includes(c.identifier)).reduce(this.sumAmount, 0),
        actual: transactions.filter(t => t.category === c.identifier).reduce(this.sumAmount, 0),
      };
    });
  }

  getCategoryIncome(
    categories: Category[],
    transactions: Transaction[],
    expectedTransactions: ExpectedTransaction[],
  ): CategorySummary[] {
    return categories.map(c => {
      const filteredTransactions = transactions.filter(
        t => t.category === c.identifier && t.type === TransactionType.income,
      );
      const filteredExpected = expectedTransactions.filter(t => t.category === c.identifier);

      return {
        name: c.identifier,
        planned: filteredExpected.reduce(this.sumAmount, 0),
        actual: filteredTransactions.reduce(this.sumAmount, 0),
        lastActivity: filteredTransactions.reduce(this.latestTransaction, null),
      };
    });
  }

  private sumAmount<T extends { amount: number }>(sum: number, item: T): number {
    return sum + item.amount;
  }

  private latestTransaction(latest: Date, current: Transaction | ExpectedTransaction): Date {
    return current.date > latest ? current.date : latest;
  }
}
