import { selector, selectorFamily } from 'recoil';

import { AccountType, TransactionState } from '@st/types';
import { apolloClient } from 'App';
import { currentBudgetQuery, EMPTY_BUDGET_ID } from 'budgets/state';
import { GET_ACCOUNTS, GET_TRANSACTIONS } from './queries';

export interface Account {
  id: string;
  uid: string;
  institution?: string;
  name: string;
  balance: number;
  type: AccountType;
}

export interface Transaction {
  id: string;
  uid: string;
  amount: number;
  date: Date;
  payee: string;
  detail: string;
  state: TransactionState;
  isTransfer: boolean;
  account: { id: string; name: string };
  envelope: { id: string; name: string };
}

export enum AccountTypeGroup {
  spending = 'spending',
  saving = 'saving',
  tracking = 'tracking',
}

export const AccountTypeRecord: Record<AccountType, AccountTypeGroup> = {
  checking: AccountTypeGroup.spending,
  savings: AccountTypeGroup.saving,
  creditCard: AccountTypeGroup.spending,
  cash: AccountTypeGroup.spending,
  retirement: AccountTypeGroup.tracking,
  investment: AccountTypeGroup.tracking,
  portfolio: AccountTypeGroup.tracking,
  property: AccountTypeGroup.tracking,
  loan: AccountTypeGroup.tracking,
};

export const allAccountsQuery = selector({
  key: 'AllAccountsQuery',
  get: async ({ get }) => {
    const { id: budgetId } = get(currentBudgetQuery);
    if (budgetId === EMPTY_BUDGET_ID) {
      // Selected budget hasn't been set yet
      return [];
    }
    const response = await apolloClient.query<{ accounts: Account[] }>({
      query: GET_ACCOUNTS,
      variables: { budgetId },
    });
    if (response.errors) throw response.errors;
    return response.data.accounts;
  },
});

export const allAccountsBalanceQuery = selector({
  key: 'AllAccountsBalanceQuery',
  get: ({ get }) => {
    const accounts = get(allAccountsQuery);
    return accounts.reduce((runningTotal, account) => runningTotal + account.balance, 0);
  },
});

// Rather than send a separate request to the server to get an individual account, just compose the
// allAccountsQuery. That way if any change it can be reflected in the sidebar/wherever without
// needing an extra mechanism to trigger another query of all accounts when one changes. But revisit
// this when mutations are happening to see what the re-render situation is like
export const accountQuery = selectorFamily({
  key: 'AccountQuery',
  get: (accountUid: string) => ({ get }) => {
    // Accessing the account route is done with uid so it's the only identifier available
    const accounts = get(allAccountsQuery);
    const account = accounts.find((a) => a.uid === accountUid);
    if (!account) throw new Error('Account not found');
    return account;
  },
});

export const transactionsQuery = selectorFamily({
  key: 'TransactionsQuery',
  get: (accountId: string | null) => async ({ get }) => {
    let variables = {};
    if (!accountId) {
      const { id: budgetId } = get(currentBudgetQuery);
      variables = { budgetId };
    } else {
      variables = { accountId };
    }

    const response = await apolloClient.query<{ transactions: Transaction[] }>({
      query: GET_TRANSACTIONS,
      variables,
    });
    if (response.errors) throw response.errors;
    return response.data.transactions;
  },
});

export const accountsInTypesQuery = selector({
  key: 'AccountsInTypesQuery',
  get: ({ get }) => {
    const accounts = get(allAccountsQuery);

    // Could do this on one loop with a complicated reduce, or use lodash.partition, but this is
    // just easier to read and performance isn't so important here because this is memo-ised.
    const spending = accounts.filter(
      (a) => AccountTypeRecord[a.type] === AccountTypeGroup.spending,
    );
    const saving = accounts.filter((a) => AccountTypeRecord[a.type] === AccountTypeGroup.saving);
    const tracking = accounts.filter(
      (a) => AccountTypeRecord[a.type] === AccountTypeGroup.tracking,
    );

    return { spending, saving, tracking };
  },
});
