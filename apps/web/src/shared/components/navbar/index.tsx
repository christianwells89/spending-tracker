import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { XSolid } from 'shared/components/icons';
import { AccountsSection } from './accountsSection';
import { BudgetButton } from './budgetButton';
import { NavItem } from './navItem';

export const NavbarOpenState = atom({
  key: 'NavbarOpenState',
  default: false,
});

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(NavbarOpenState);
  const budget = useRecoilValue(currentBudgetQuery);
  const location = useLocation();

  // On change of location, close if it's open
  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen, location]);

  const translation = isOpen ? 'translate-x-0' : '-translate-x-full';
  const barClass = `flex flex-col py-4 px-2 top-0 left-0 w-96 bg-white fixed lg:static h-full\
    lg:h-auto overflow-auto transform ease-in-out transition-all duration-300 z-50 ${translation}\
    lg:translate-x-0 lg:transition-none shadow-md space-y-2`;
  const bgDisplay = isOpen ? 'absolute' : 'hidden';
  const close = () => setIsOpen(false);

  if (!budget) return null;

  // TODO: Budget settings page and nav item

  return (
    <>
      <aside className={barClass}>
        <div className="relative h-8 flex justify-center items-center mb-2">
          <div className="leading-4 font-medium text-gray-400 uppercase tracking-wider">
            Self Budget
          </div>
          <XSolid
            className="lg:hidden h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 p-1 absolute right-0 cursor-pointer"
            onClick={close}
          />
        </div>
        <NavItem to="/reports">Reports</NavItem>
        <hr />
        <BudgetButton />
        <NavItem to={`/budgets/${budget.uid}/envelopes`}>Envelopes</NavItem>
        <AccountsSection />
      </aside>
      <div className={`lg:hidden inset-0 bg-black opacity-50 z-40 ${bgDisplay}`} onClick={close} />
    </>
  );
};
