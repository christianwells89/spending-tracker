import { DateTime } from 'luxon';
import React from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

import { MonthInYear } from '@st/types';
import { Envelopes } from './envelopes';
import {
  budgetsQuery,
  currentBudgetQuery,
  currentSelectedBudgetUidState,
  EMPTY_BUDGET_UID,
} from './state';

export const Budgets: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <React.Suspense fallback={<div>Loading budgets...</div>}>
            <BudgetRedirect />
          </React.Suspense>
        </Route>
        <Route path={`${path}/:uid`}>
          <React.Suspense fallback={<div>Loading budget...</div>}>
            <Budget />
          </React.Suspense>
        </Route>
      </Switch>
    </div>
  );
};

const BudgetRedirect: React.FC = () => {
  const currentSelectedUid = useRecoilValue(currentSelectedBudgetUidState);

  if (currentSelectedUid === EMPTY_BUDGET_UID) return <FirstBudgetOrAdd />;

  return <Redirect to={`/budgets/${currentSelectedUid}`} />;
};

const FirstBudgetOrAdd: React.FC = () => {
  const budgets = useRecoilValue(budgetsQuery);

  if (budgets.length > 0) return <Redirect to={`/budgets/${budgets[0].uid}`} />;

  return <NoBudgets />;
};

const NoBudgets: React.FC = () => {
  // TODO: make an add budget component
  return <div>Please add a budget.</div>;
};

const Budget: React.FC = () => {
  const [currentUid, setCurrentUid] = useRecoilState(currentSelectedBudgetUidState);
  const { uid } = useParams<{ uid: string }>();
  if (currentUid !== uid) setCurrentUid(uid);

  const { path } = useRouteMatch();
  // The below line will cause a warning to be thrown because of Recoil. May get fixed later on,
  // but doesn't seem obvious what the cause is reading through the git issue
  const { timezone } = useRecoilValue(currentBudgetQuery);

  const monthInYear = DateTime.local().setZone(timezone).toFormat('yyyy-LL') as MonthInYear;

  // TODO: make an app-wide sidebar before accounts are going to be navigable again. They still need
  // to be recoil-ified as well.

  return (
    <div className="container mx-auto">
      <Switch>
        <Route path={`${path}/envelopes/:month`}>
          <Envelopes />
        </Route>
        {/* <Route exact path={`${path}/accounts`}>
              <AllAccounts />
            </Route>
            <Route path={`${path}/accounts/:uid?`}>
              <Account />
            </Route> */}
        <Redirect to={`${path}/envelopes/${monthInYear}`} />
      </Switch>
    </div>
  );
};
