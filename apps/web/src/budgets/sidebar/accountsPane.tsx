import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AccountType } from '@st/types';
import { Account } from '../accounts/state';
import { currentBudgetQuery } from 'budgets/state';
import { formatMoney } from 'shared/utils/money';

enum AccountTypeGroup {
  spending = 'spending',
  saving = 'saving',
  tracking = 'tracking',
}

const AccountTypeRecord: Record<AccountType, AccountTypeGroup> = {
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

interface AccountsSummaryProps {
  accounts: Account[];
}

export const AccountsSummary: React.FC<AccountsSummaryProps> = ({ accounts }) => {
  // Could do this on one loop with a complicated reduce, or use lodash.partition, but this is just
  // easier to read and performance isn't so important here
  const spendingAccounts = accounts.filter(
    (a) => AccountTypeRecord[a.type] === AccountTypeGroup.spending,
  );
  const savingAccounts = accounts.filter(
    (a) => AccountTypeRecord[a.type] === AccountTypeGroup.saving,
  );
  const trackingAccounts = accounts.filter(
    (a) => AccountTypeRecord[a.type] === AccountTypeGroup.tracking,
  );

  // TODO: make these collapsable
  return (
    <div className="flex flex-col space-y-3">
      <AccountTypeGroupSection accounts={spendingAccounts} label="Spending" />
      <AccountTypeGroupSection accounts={savingAccounts} label="Saving" />
      <AccountTypeGroupSection accounts={trackingAccounts} label="Tracking" />
    </div>
  );
};

interface AccountTypeGroupSectionProps extends AccountsSummaryProps {
  label: string;
}

export const AccountTypeGroupSection: React.FC<AccountTypeGroupSectionProps> = (props) => {
  const { accounts, label } = props;
  const { url } = useRouteMatch();
  const { currency } = useRecoilValue(currentBudgetQuery);
  const totalBalance = accounts.reduce(
    (runningTotal, account) => runningTotal + account.balance,
    0,
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row text-sm w-full">
        <span>˅</span>
        <span className="flex-shrink ml-1 uppercase tracking-wide truncate">{label}</span>
        <span className="ml-auto">{formatMoney(totalBalance, currency)}</span>
      </div>
      {accounts.map((account, index) => {
        return (
          <NavLink key={index} to={`${url}/accounts/${account.uid}`} className="flex text-sm pl-3">
            {account.institution ? <span>{account.institution}</span> : null}
            <span className="flex-shrink ml-1 truncate">{account.name}</span>
            <span className="ml-auto">{formatMoney(account.balance, currency)}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
