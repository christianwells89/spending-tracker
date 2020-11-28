import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Currency } from '@st/types';
import { Account, accountsInTypesQuery } from 'budgets/accounts/state';
import { currentBudgetQuery } from 'budgets/state';
import { ChevronDownOutline, ChevronRightOutline } from 'shared/components/icons';
import { MoneyPill } from 'shared/components/moneyPill';
import { formatMoney } from 'shared/utils/money';
import { NavItem } from './navItem';

export const AccountsSection: React.FC = () => {
  const { spending, saving, tracking } = useRecoilValue(accountsInTypesQuery);
  const { uid, currency } = useRecoilValue(currentBudgetQuery);

  // TODO: create an add account route, button

  return (
    <div className="flex flex-col space-y-3 p-2 rounded-lg border border-trueGray-300">
      <NavItem to={`/budgets/${uid}/accounts`} exact={true}>
        All Accounts
      </NavItem>
      <AccountTypeGroupSection
        accounts={spending}
        budgetUid={uid}
        currency={currency}
        label="Spending"
      />
      <AccountTypeGroupSection
        accounts={saving}
        budgetUid={uid}
        currency={currency}
        label="Saving"
      />
      <AccountTypeGroupSection
        accounts={tracking}
        budgetUid={uid}
        currency={currency}
        label="Tracking"
      />
    </div>
  );
};

interface AccountTypeGroupSectionProps {
  accounts: Account[];
  label: string;
  budgetUid: string;
  currency: Currency;
}

const AccountTypeGroupSection: React.FC<AccountTypeGroupSectionProps> = (props) => {
  const { accounts, label, budgetUid, currency } = props;
  const [isOpen, setIsOpen] = useState(true);

  // Probably not necessary, but just in case.
  const totalBalance = useMemo(() => {
    return accounts.reduce((runningTotal, account) => runningTotal + account.balance, 0);
  }, [accounts]);
  const chevronClass = 'h-3 my-auto';

  return (
    <div className="flex flex-col space-y-2">
      <div
        className="flex flex-row text-sm block text-gray-400 font-medium cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDownOutline className={chevronClass} />
        ) : (
          <ChevronRightOutline className={chevronClass} />
        )}
        <div className="flex-shrink ml-1 uppercase tracking-wide truncate">{label}</div>
        <div className="ml-auto mr-4">{formatMoney(totalBalance, currency)}</div>
      </div>
      {isOpen &&
        accounts.map((account, index) => {
          return (
            <NavItem key={index} to={`/budgets/${budgetUid}/accounts/${account.uid}`}>
              <div className="flex relative">
                <div className="flex-1">
                  {account.institution ? <span className="mr-1">{account.institution}</span> : null}
                  <span className="truncate">{account.name}</span>
                </div>
                <MoneyPill amount={account.balance} isClickable={false} />
              </div>
            </NavItem>
          );
        })}
    </div>
  );
};

// interface AccountBalanceProps {
//   amount: number;
//   currency: Currency;
// }

// const AccountBalance: React.FC<AccountBalanceProps> = ({ amount, currency }) => {
//   const formattedAmount = formatMoney(amount, currency);
//   const className =
//     amount < 0 ? 'box-content rounded-full bg-red-200 text-red-800 p-0.5 -my-1 -mr-1' : '';

//   return <div className={className}>{formattedAmount}</div>;
// };
