import { Account, Asset, Portfolio, Property, Valuation } from 'domain/account';
import { Budget } from 'domain/budget';
import { Envelope, EnvelopeGoal, EnvelopeGroup, EnvelopeMonth, EnvelopeSub } from 'domain/envelope';
import { ScheduledTransaction, Transaction } from 'domain/transaction';
import { User } from 'domain/user';

export const entities = [
  Account,
  Budget,
  Envelope,
  EnvelopeGoal,
  EnvelopeGroup,
  EnvelopeMonth,
  EnvelopeSub,
  Asset,
  Portfolio,
  Property,
  Valuation,
  ScheduledTransaction,
  Transaction,
  User,
];
