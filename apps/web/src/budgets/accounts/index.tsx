import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AccountsHeader } from './header';
import { accountQuery, allAccountsBalanceQuery, transactionsQuery } from './state';
import { Transactions } from './transactions';

export const Account: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();

  const account = useRecoilValue(accountQuery(uid));
  const transactions = useRecoilValue(transactionsQuery(account.id));

  return (
    <>
      <AccountsHeader {...account} />
      <Transactions transactions={transactions} showAccount={false} />
    </>
  );
};

export const AllAccounts: React.FC = () => {
  const transactions = useRecoilValue(transactionsQuery(null));
  const balance = useRecoilValue(allAccountsBalanceQuery);

  return (
    <>
      <AccountsHeader name="All Accounts" balance={balance} />
      <Transactions transactions={transactions} showAccount={true} />
    </>
  );
};
