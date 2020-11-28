import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  exact?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ to, exact = false, children }) => {
  const className = `px-4 py-2 block text-sm font-semibold text-gray-900 rounded-lg border\
    border-trueGray-300 hover:bg-lightBlue-100 active:bg-lightBlue-200 focus:outline-none`;

  return (
    <NavLink to={to} className={className} activeClassName="bg-lightBlue-100" exact={exact}>
      {children}
    </NavLink>
  );
};
