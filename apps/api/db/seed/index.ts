import { getRepository } from 'typeorm';

import { Account } from 'domain/account';
import { Budget } from 'domain/budget';
import { Envelope, EnvelopeGroup } from 'domain/envelope';
import { Transaction } from 'domain/transaction';
import { User } from 'domain/user';

import { accounts } from './account';
import { budgets } from './budget';
import { envelopes, envelopeGroups } from './envelopes';
import { transactions } from './transactions';
import { users } from './users';

/**
 * While developing, runs on every API start to make sure indicative data is present.
 */
export async function seedDatabase(): Promise<void> {
  await getRepository(User).save(users);
  console.log('Populated users');
  await getRepository(Budget).save(budgets);
  console.log('Populated budgets');
  await getRepository(Account).save(accounts);
  console.log('Populated accounts');
  await getRepository(EnvelopeGroup).save(envelopeGroups);
  console.log('Populated envelope groups');
  await getRepository(Envelope).save(envelopes);
  console.log('Populated envelopes');
  await getRepository(Transaction).save(transactions);
  console.log('Populated transactions');
}
