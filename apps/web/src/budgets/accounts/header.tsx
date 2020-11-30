import React from 'react';
import { CogSolid } from 'shared/components/icons';
import { MoneyPill } from 'shared/components/moneyPill';

// import { Account } from '.';
import { Panel } from 'shared/components/panel';

// Create-React-App's typescript doesn't like this for some reason.
// type AccountsHeaderProps = Pick<Account, "institution" | "name" | "balance">
interface AccountsHeaderProps {
  institution?: string;
  name: string;
  balance: number;
}

export const AccountsHeader: React.FC<AccountsHeaderProps> = (props) => {
  const { institution, name, balance } = props;
  const label = (institution ? `${institution} - ` : '') + name;

  return (
    <Panel className="w-full md:w-1/2 mx-auto flex flex-row divide-x-2 divide-gray-200">
      <div className="flex-1 flex flex-col p-4">
        <div className="text-xl self-center">{label}</div>
        <div className="mt-auto flex justify-between">
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
          >
            Add Transaction
          </button>
          <CogSolid className="h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 p-1 cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4 justify-center space-y-2 text-sm">
        <div className="flex">
          <div className="flex-1 flex flex-col items-end">
            <div>Cleared</div>
            <MoneyPill amount={balance} className="-mr-2" />
          </div>
          <div className="mx-4">+</div>
          <div className="flex-1 flex flex-col items-start">
            <div>Uncleared</div>
            <MoneyPill amount={0} className="-ml-2" />
          </div>
        </div>
        <MoneyPill amount={balance} className="text-lg self-center" />
      </div>
    </Panel>
  );
};
