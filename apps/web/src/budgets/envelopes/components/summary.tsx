import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { ChevronLeftOutline, ChevronRightOutline } from 'shared/components/icons';
import { Panel } from 'shared/components/panel';
import { formatMoney } from 'shared/utils/money';
import { currentMonthState, monthToBeAllocatedQuery, monthTotalsQuery } from '../state';

// TODO: The link elements may need to change to instead defer to a callback so that the parent
// component can know when a transition occurs and pass that down to these components so that they
// can show wireframe elements like those in https://tailwindcomponents.com/component/wireframe.
// useTransition is experimental and not in stable releases of react though, so it might be some
// time before it can be put in here. It's the epitome of a nice-to-have feature anyway.

// The other option is actually returning the pending state from a query and switching off the
// wireframe with the real data if it's there. I like not complicating the selectors though.

export const MonthSummary: React.FC = () => {
  const month = useRecoilValue(currentMonthState);
  const monthDate = DateTime.fromISO(month);

  const { currency } = useRecoilValue(currentBudgetQuery);
  const toBeAllocated = useRecoilValue(monthToBeAllocatedQuery);
  const textColour = toBeAllocated < 0 ? 'text-red-400' : 'text-green-400';
  const { available: totalAvailable, allocated: totalAllocated } = useRecoilValue(monthTotalsQuery);

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
          <div>{formatMoney(totalAvailable, currency)}</div>
          <div>{formatMoney(totalAllocated * -1, currency)}</div>
        </div>
        <div className="flex flex-col justify-start">
          <div>Total Funds</div>
          <div>Total Allocated</div>
        </div>
      </div>
      <div className="py-4">
        <div>To Be Allocated</div>
        <div className={`text-xl text-center ${textColour}`}>
          {formatMoney(toBeAllocated, currency)}
        </div>
      </div>
    </Panel>
  );
};
