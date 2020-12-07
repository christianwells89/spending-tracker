import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { ChevronLeftOutline, ChevronRightOutline } from 'shared/components/icons';
import { MoneyPill } from 'shared/components/moneyPill';
import { Panel } from 'shared/components/panel';
import { SkeletonLoader } from 'shared/components/skeletonBlock';
import { formatMoney } from 'shared/utils/money';
import { currentMonthState, monthToBeAllocatedQuery, monthTotalsQuery } from '../state';

export const MonthSummary: React.FC = () => {
  const month = useRecoilValue(currentMonthState);
  const monthDate = DateTime.fromISO(month);

  const { currency } = useRecoilValue(currentBudgetQuery);
  const toBeAllocated = useRecoilValueLoadable(monthToBeAllocatedQuery);
  const monthTotals = useRecoilValueLoadable(monthTotalsQuery);

  return (
    <Panel className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full text-xl px-2">
        <Link
          to={(location) => ({
            ...location,
            pathname: monthDate.minus({ month: 1 }).toFormat('yyyy-LL'),
          })}
        >
          <ChevronLeftOutline className="h-8 rounded-full hover:bg-gray-100 p-1" />
        </Link>
        <div className="my-4">{monthDate.toFormat('LLLL yyyy')}</div>
        <Link
          to={(location) => ({
            ...location,
            pathname: monthDate.plus({ month: 1 }).toFormat('yyyy-LL'),
          })}
        >
          <ChevronRightOutline className="h-8 rounded-full hover:bg-gray-100 p-1" />
        </Link>
      </div>
      <div className="flex flex-row py-2 w-full justify-center space-x-2 bg-gray-50 border-t-2 border-b-2 border-gray-200">
        <div className="flex flex-col items-end">
          <SkeletonLoader loadable={monthTotals} className="h-5 w-20 mb-1">
            {(totals) => <div>{formatMoney(totals.available, currency)}</div>}
          </SkeletonLoader>
          <SkeletonLoader loadable={monthTotals} className="h-5 w-20">
            {(totals) => <div>{formatMoney(totals.allocated, currency)}</div>}
          </SkeletonLoader>
        </div>
        <div className="flex flex-col justify-start">
          <div>Total Funds</div>
          <div>Total Allocated</div>
        </div>
      </div>
      <div className="py-4 flex flex-col items-center">
        <div>To Be Allocated</div>
        <SkeletonLoader loadable={toBeAllocated} className="h-7 w-24">
          {(amount) => <MoneyPill amount={amount} isClickable={false} className="text-xl" />}
        </SkeletonLoader>
      </div>
    </Panel>
  );
};
