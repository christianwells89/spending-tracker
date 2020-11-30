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
    <div className="space-y-2">
      <AccountsHeader {...account} />
      <Transactions transactions={transactions} showAccount={false} />
    </div>
  );
};

export const AllAccounts: React.FC = () => {
  // const { uid } = useParams<{ uid: string }>();
  // console.log(uid);
  const transactions = useRecoilValue(transactionsQuery(null));
  const balance = useRecoilValue(allAccountsBalanceQuery);

  return (
    <div className="flex flex-col space-y-2">
      <AccountsHeader name="All Accounts" balance={balance} />
      <Transactions transactions={transactions} showAccount={true} />
    </div>
  );
};
