import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from 'logo.svg';

// TODO: responsive toggle doesn't work. Copied from https://web-crunch.com/lets-build-tailwind-css-responsive-navbar/
// TODO: have a user on the far right, with a dropdown for settings, categories, tags etc.
export const Header: React.FC = () => {
  return (
    <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 border-gray-400 border-solid border-b">
      <div className="flex-1 flex justify-between items-center">
        <NavLink to="/">
          <img src={logo} className="h-8" alt="logo" />
        </NavLink>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
        <nav>
          <ul className="lg:flex items-center justify-between text-xs text-gray-700 pt-4 lg:pt-0">
            <NavItem to="/accounts" text="Accounts" />
            <NavItem to="/transactions" text="Transactions" />
            <NavItem to="/budgets" text="Budgets" />
            <NavItem to="/summary" text="Summary" />
          </ul>
        </nav>
      </div>
    </header>
  );
};

interface NavItemProps {
  to: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = props => {
  const { to, text } = props;

  return (
    <li>
      <NavLink
        to={to}
        className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:bg-gray-100"
        activeClassName="border-teal-300"
      >
        {text}
      </NavLink>
    </li>
  );
};
