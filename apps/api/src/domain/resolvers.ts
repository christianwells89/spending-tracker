import { AccountResolver } from 'domain/account/account.resolver';
import { BudgetResolver } from 'domain/budget/budget.resolver';
import { EnvelopeResolver } from 'domain/envelope/envelope.resolver';
import { TransactionResolver } from 'domain/transaction';

export const resolvers: [Function, ...Function[]] = [
  AccountResolver,
  BudgetResolver,
  EnvelopeResolver,
  TransactionResolver,
];
