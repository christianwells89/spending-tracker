import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { MonthInYear } from '@st/types';
import { isMonthValid } from 'shared/utils/date';
import { Actions } from './components/actions';
import { Groups } from './components/group';
import { Header } from './components/header';
import { MonthSummary } from './components/summary';
import { currentMonthState } from './state';
import { AddGroupButton } from './components/addGroup';

export const Envelopes: React.FC = () => {
  const { month } = useParams<{ month: MonthInYear }>();
  const setCurrentMonth = useSetRecoilState(currentMonthState);

  useEffect(() => {
    // even though it's typed in the useParams hook it comes out as string so just force it
    setCurrentMonth(month as MonthInYear);
  }, [month, setCurrentMonth]);

  // Verify that the month is a real month, if not kick back to current real-time month
  const isValid = isMonthValid(month as MonthInYear);
  if (!isValid) {
    return (
      <Redirect
        to={{
          pathname: DateTime.local().toFormat('yyyy-LL'),
        }}
      />
    );
  }

  // TODO: still need a way of triggering the Actions on smaller screens, and to put it into a Modal

  return (
    <div className="grid grid-cols-3 space-x-2 h-full">
      <div className="col-span-3 sm:col-span-2">
        <div className="md:grid md:grid-cols-2 mb-2">
          <div className="col-start-2">
            <MonthSummary />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Header />
          <Groups />
          <AddGroupButton />
        </div>
      </div>
      <div className="hidden sm:flex">
        <Actions />
      </div>
    </div>
  );
};
