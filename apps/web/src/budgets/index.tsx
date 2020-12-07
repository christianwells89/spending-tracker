import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Account, AllAccounts } from './accounts';
import { Envelopes } from './envelopes';
import {
  budgetsQuery,
  currentBudgetQuery,
  currentSelectedBudgetUidState,
  EMPTY_BUDGET_ID,
  EMPTY_BUDGET_UID,
} from './state';
import { currentMonthState } from './envelopes/state';

export const Budgets: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <React.Suspense fallback={<div>Loading budgets...</div>}>
          <BudgetRedirect />
        </React.Suspense>
      </Route>
      <Route path={`${path}/:uid`}>
        <React.Suspense fallback={<div>Loading budget...</div>}>
          <RequireBudget>
            <Budget />
          </RequireBudget>
        </React.Suspense>
      </Route>
    </Switch>
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

const RequireBudget: React.FC = ({ children }) => {
  const [currentUid, setCurrentUid] = useRecoilState(currentSelectedBudgetUidState);
  const { uid } = useParams<{ uid: string }>();
  const budget = useRecoilValue(currentBudgetQuery);

  useEffect(() => {
    setCurrentUid(uid);
  }, [uid, setCurrentUid]);

  if (currentUid === EMPTY_BUDGET_UID || budget.id === EMPTY_BUDGET_ID) {
    // If above is the first time it's been set it won't be available until the next render, so some
    // queries will try with a null budget and fail.
    return null; // TODO: full screen loading component
  }

  return <>{children}</>;
};

const Budget: React.FC = () => {
  const { path } = useRouteMatch();
  const selectedMonth = useRecoilValue(currentMonthState);

  return (
    <div className="container mx-auto p-2">
      <Switch>
        <Route path={`${path}/envelopes/:month`}>
          <Envelopes />
        </Route>
        <Route exact path={`${path}/accounts`}>
          <AllAccounts />
        </Route>
        <Route path={`${path}/accounts/:uid?`}>
          <Account />
        </Route>
        <Redirect to={`${path}/envelopes/${selectedMonth}`} />
      </Switch>
    </div>
  );
};
