export enum TransactionType {
  expense = 'expense',
  income = 'income',
}

export interface TransactionDTO {
  amount: number;
  type: TransactionType;
  date: Date;
  location?: string;
  description: string;
  category: string;
  tags: string[];
  userId: number;
  accountId: number;
}
