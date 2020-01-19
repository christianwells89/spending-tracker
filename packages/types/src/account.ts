export enum AccountType {
  checking = 'checking',
  savings = 'savings',
  creditCard = 'creditCard',
  cash = 'cash',
  retirement = 'retirement',
  investment = 'investment',
  property = 'property',
  loan = 'loan',
}

export interface AccountDTO {
  type: AccountType;
  description: string;
  institution?: string;
  identifier?: string;
  tags: string[];
  userId: number;
  // only in returning:
  balance?: number;
}
