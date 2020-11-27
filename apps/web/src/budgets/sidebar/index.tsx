import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { allAccountsQuery } from '../accounts/state';
import { AccountsSummary } from './accountsPane';

// TODO: this should be in shared and used for reports as well, with things specific to a budget
// abstracted out
export const Sidebar: React.FC = () => {
  const { url } = useRouteMatch();
  const accounts = useRecoilValue(allAccountsQuery);

  // TODO: put dropdown to choose budget

  return (
    <div className="w-full md:w-64 md:flex-shrink-0 bg-white md:bg-white md:pt-5 px-2 text-center">
      <div className="mx-auto lg:px-1">
        <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
          <li className="flex-1">
            <NavLink to={`${url}/envelopes`}>Envelopes</NavLink>
          </li>
          {/* TODO: make the summary pane visible on click when in mobile view */}
          <li className="flex-1">
            <NavLink to={`${url}/accounts`}>Accounts</NavLink>
            <div className="hidden md:block">
              <AccountsSummary accounts={accounts} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
