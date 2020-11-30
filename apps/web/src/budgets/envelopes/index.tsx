import { DateTime } from 'luxon';
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { MonthInYear } from '@st/types';
import { isMonthValid } from 'shared/utils/date';
import { Actions } from './components/actions';
import { Group } from './components/group';
import { Header } from './components/header';
import { MonthSummary } from './components/summary';
import { BudgetTitle } from './components/title';
import { currentMonthState, groupsInBudgetQuery } from './state';

export const Envelopes: React.FC = () => {
  const groups = useRecoilValue(groupsInBudgetQuery);
  const { month } = useParams<{ month: MonthInYear }>();
  const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthState);

  // Verify that the month is a real month, if not kick back to current real-time month
  const isValid = isMonthValid(month as MonthInYear);
  if (!isValid) {
    const now = DateTime.local();
    return (
      <Redirect
        to={{
          pathname: now.toFormat('yyyy-LL'),
        }}
      />
    );
  }
  // even though it's typed in the useParams hook it comes out as string so just force it
  if (month !== currentMonth) setCurrentMonth(month as MonthInYear);

  // TODO: the empty div below could perhaps be eliminated if there is an offset like bootstrap
  // also, it will need to responively change to grid-cols-2 in small screens, with the yet-to-be-
  // added envelope details pane being moved to being above everything in a sort-of-modal. This is
  // a way of putting the media queries in code: https://usehooks.com/useMedia/
  // If no envelope is selected it should just show more overall month statistics and actions.
  // Probably needs to be some way of triggering that on smaller screens, something like having it
  // be open on some unified state of selected envelope and general month actively selected. Maybe
  // the button could be in MonthSummary, or on clicking anywhere in there?

  // The empty div is now a budget title component. Does it actually make sense here?

  return (
    <div className="grid grid-cols-3 space-x-2">
      <div className="col-span-2">
        <div className="grid grid-cols-2 mb-2">
          <BudgetTitle />
          <MonthSummary />
        </div>
        <div className="flex flex-col space-y-2">
          <Header />
          {groups.map(({ id, name }) => (
            <Group id={id} name={name} key={id} />
          ))}
        </div>
      </div>
      <div className="flex">
        <Actions />
      </div>
    </div>
  );
};
