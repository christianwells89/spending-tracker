import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Accounts } from 'accounts';
import { Budgets } from 'budgets';
import { Header } from 'shared/components/header';
import { Dash } from 'dash';
import { Summary } from 'summary';
import { Transactions } from 'transactions';

export const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Dash />
          </Route>
          <Route path="/accounts">
            <Accounts />
          </Route>
          <Route path="/budgets">
            <Budgets />
          </Route>
          <Route path="/summary">
            <Summary />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
