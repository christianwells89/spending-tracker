export enum AccountType {
  checking = 'checking',
  savings = 'savings',
  creditCard = 'creditCard',
  cash = 'cash',
  retirement = 'retirement',
  investment = 'investment', // generic investment
  portfolio = 'portfolio',
  property = 'property',
  loan = 'loan',
}

export interface AccountDTO {
  type: AccountType;
  description: string;
  institution?: string;
  identifier?: string;
  tags: string[];
  budgetId: number;
  // only in returning:
  balance?: number;
}
