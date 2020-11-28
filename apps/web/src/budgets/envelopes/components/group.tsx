import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { Panel } from 'shared/components/panel';
import { formatMoney } from 'shared/utils/money';
import { EnvelopeLine } from './envelopeLine';
import { envelopesInGroupQuery, groupTotalsQuery } from '../state';

interface GroupProps {
  id: string;
  name: string;
}

export const Group: React.FC<GroupProps> = ({ id, name }) => {
  const { currency } = useRecoilValue(currentBudgetQuery);
  const envelopes = useRecoilValue(envelopesInGroupQuery(id));
  const { totalAllocated, totalActivity, totalAvailable } = useRecoilValue(groupTotalsQuery(id));

  // TODO: put a button on the bottom to add a new one
  return (
    <Panel className="flex flex-col w-full text-sm">
      <div className="grid grid-cols-2 px-4 pt-2 pb-2 leading-4 font-medium text-gray-400 uppercase tracking-wider">
        <div>{name}</div>
        <div className="flex text-right">
          <div className="flex-1">{formatMoney(totalAllocated, currency)}</div>
          <div className="flex-1 hidden sm:block">{formatMoney(totalActivity, currency)}</div>
          <div className="flex-1">{formatMoney(totalAvailable, currency)}</div>
        </div>
      </div>
      {envelopes.map((e) => {
        return <EnvelopeLine key={e.id} envelope={e} />;
      })}
    </Panel>
  );
};
