import { DateTime } from 'luxon';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { ChevronDownOutline } from 'shared/components/icons';
import { CurrencyIconUrl } from 'shared/utils/money';

export const BudgetButton: React.FC = () => {
  // TODO: implement dropdown to choose different budgets
  const budget = useRecoilValue(currentBudgetQuery);
  const timezoneName = DateTime.fromObject({ zone: budget.timezone }).toFormat('ZZZZ');
  const currencyIconUrl = CurrencyIconUrl[budget.currency];

  return (
    <button className="p-2 block rounded-lg bg-gray-100 border border-trueGray-300 relative outline-none focus:outline-none">
      <img
        src={currencyIconUrl}
        className="absolute inset-y-0 left-0 pl-2 my-auto"
        width="20px"
        alt={budget.currency}
      />
      <div className="flex flex-col pl-7 pr-6 items-start">
        <div className="font-semibold text-sm">{budget.name}</div>
        <div className="text-xs">{timezoneName}</div>
      </div>
      <ChevronDownOutline className="h-4 absolute inset-y-0 right-0 pr-2 my-auto" />
    </button>
  );
};
