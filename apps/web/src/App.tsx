import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import React from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Budgets } from 'budgets';
import { Reports } from 'reports';
import { RequireAuth } from 'shared/auth/requireAuth';
import { SometimesHeader } from 'shared/components/header';
import { Navbar } from 'shared/components/navbar';

export const cache = new InMemoryCache();
export const apolloClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // TODO: get this from env. Or better yet assume same origin
  cache,
  request: (operation): void => {
    // TODO: get from localstorage. This is not actually doing anything on the api yet either
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5MjQ1NjY1M30.rq05LjaWmAFpEduo9rFB0kpjdD_B9LWCVTEIJ1bz6BQ';
    operation.setContext({ authorization: token ? `Bearer ${token}` : '' });
  },
});

// TODO: the navbar using the current budget query has broken things when loading from a minimal URL
// May need to add a guard component that loads budgets and sets the current one, so that all
// children can be sure one will exist (or can handle the default budget in the case of none).

export const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Router>
            <RequireAuth>
              <SometimesHeader />
              <div className="flex-1 flex">
                <Navbar />
                <Switch>
                  <Route path="/budgets">
                    <Budgets />
                  </Route>
                  <Route path="/reports">
                    <Reports />
                  </Route>
                  <Redirect to="/budgets" />
                </Switch>
              </div>
            </RequireAuth>
          </Router>
        </RecoilRoot>
      </ApolloProvider>
    </React.Suspense>
  );
};
