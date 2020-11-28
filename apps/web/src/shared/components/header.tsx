import React from 'react';
import { useSetRecoilState } from 'recoil';

import { ViewListOutline } from './icons';
import { NavbarOpenState } from './navbar';

export const SometimesHeader: React.FC = () => {
  const setSidebarOpen = useSetRecoilState(NavbarOpenState);

  return (
    <header className="lg:hidden bg-white border-b border-solid border-gray-400">
      <ViewListOutline
        className="h-10 rounded-full hover:bg-gray-100 active:bg-gray-200 p-1 ml-4 my-2 cursor-pointer"
        onClick={() => setSidebarOpen(true)}
      />
    </header>
  );
};
