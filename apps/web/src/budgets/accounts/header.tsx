import React from 'react';
import { useRecoilValue } from 'recoil';

// import { Account } from '.';
import { currentBudgetQuery } from 'budgets/state';
import { formatMoney } from 'shared/utils/money';

// Create-React-App's typescript doesn't like this for some reason.
// type AccountsHeaderProps = Pick<Account, "institution" | "name" | "balance">
interface AccountsHeaderProps {
  institution?: string;
  name: string;
  balance: number;
}

export const AccountsHeader: React.FC<AccountsHeaderProps> = (props) => {
  const { institution, name, balance } = props;
  const { currency } = useRecoilValue(currentBudgetQuery);
  const formattedBalance = formatMoney(balance, currency);
  const label = (institution ? `${institution} - ` : '') + name;

  return (
    <div className="flex space-x-5">
      <div>{label}</div>
      <div>{formattedBalance}</div>
    </div>
  );
};
