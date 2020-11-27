import { AccountResolver } from './account/account.resolver';
import { BudgetResolver } from './budget/budget.resolver';
import { EnvelopeResolver } from './envelope/envelope.resolver';
import { EnvelopeMonthResolver } from './envelope/month/month.resolver';
import { TransactionResolver } from './transaction';
import { UserResolver } from './user';

export const resolvers: [Function, ...Function[]] = [
  AccountResolver,
  BudgetResolver,
  EnvelopeResolver,
  EnvelopeMonthResolver,
  TransactionResolver,
  UserResolver,
];
