import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';
// import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { ChevronLeftOutline, ChevronRightOutline } from 'shared/components/icons';
import { MoneyPill } from 'shared/components/moneyPill';
import { Panel } from 'shared/components/panel';
import { SkeletonLoader } from 'shared/components/skeletonBlock';
import { formatMoney } from 'shared/utils/money';
import {
  currentMonthState,
  monthToBeAllocatedQuery,
  monthTotalsQuery,
  // previousMonthQuery,
} from '../state';
// import { MonthInYear } from '@st/types';

export const MonthSummary: React.FC = () => {
  const month = useRecoilValue(currentMonthState);
  // const previousMonth = useRecoilValue(previousMonthQuery);
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
        {/* <MonthName currentMonth={month} previousMonth={previousMonth} /> */}
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

// TODO: Figure out how to animate the transition of the month name. Direction should be dependent
// on whether the next month is ahead or behind the previous one.
// See https://reactcommunity.org/react-transition-group/switch-transition

// interface MonthNameProps {
//   currentMonth: MonthInYear;
//   previousMonth: MonthInYear;
// }

// const MonthName: React.FC<MonthNameProps> = (props) => {
//   const currentMonth = DateTime.fromISO(props.currentMonth);
//   // const previousMonth = DateTime.fromISO(props.previousMonth);
//   const name = currentMonth.toFormat('LLLL yyyy');

//   return (
//     <SwitchTransition>
//       <CSSTransition
//         addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
//         classNames={{
//           enter: 'transform -translate-x-full',
//           enterActive: 'transform translate-x-0 transition-transform',
//           exit: 'transform translate-x-0',
//           exitActive: 'transform translate-x-full transition-transform',
//         }}
//       >
//         <div className="my-4">{name}</div>
//       </CSSTransition>
//     </SwitchTransition>
//   );
// };
