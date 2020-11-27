import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { CurrencyLabel } from 'shared/utils/money';

// TODO: This probably shouldn't exist. It's being put in the envelopes screen which doesn't make
// a lot of sense (why wouldn't it be in accounts as well?). This information should probably just
// be put in the sidebar

export const BudgetTitle: React.FC = () => {
  const { name, timezone, currency } = useRecoilValue(currentBudgetQuery);
  const currencyLabel = CurrencyLabel.get(currency);

  return (
    <div className="flex flex-col items-center m-auto">
      <div className="text-3xl">{name}</div>
      <div className="space-x-2">
        <span>{currencyLabel}</span>
        <span>{timezone}</span>
      </div>
    </div>
  );
};
