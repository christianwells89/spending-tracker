import React, { Suspense } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { PlusCircleOutline } from 'shared/components/icons';
import { Panel } from 'shared/components/panel';
import { formatMoney } from 'shared/utils/money';
import { EnvelopeLine } from './envelopeLine';
import { envelopesInGroupQuery, groupsInBudgetQuery, groupTotalsQuery } from '../state';
import { SkeletonBlock, SkeletonLoader } from 'shared/components/skeletonBlock';

export const Groups: React.FC = () => {
  const groups = useRecoilValue(groupsInBudgetQuery);

  return (
    <Suspense fallback={<GroupsSkeleton />}>
      {groups.map(({ id, name }) => (
        <Group id={id} name={name} key={id} />
      ))}
    </Suspense>
  );
};

interface GroupProps {
  id: string;
  name: string;
}

const Group: React.FC<GroupProps> = ({ id, name }) => {
  const { currency } = useRecoilValue(currentBudgetQuery);
  const envelopes = useRecoilValue(envelopesInGroupQuery(id));
  const totals = useRecoilValueLoadable(groupTotalsQuery(id));

  return (
    <Panel className="flex flex-col w-full text-sm">
      <div className="grid grid-cols-2 px-4 pt-2 pb-2 leading-4 font-medium text-gray-400 uppercase tracking-wider">
        <div className="flex space-x-2">
          <div>{name}</div>
          <PlusCircleOutline className="h-7 -mb-2 -mt-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 p-1 cursor-pointer" />
        </div>
        <div className="flex text-right">
          <div className="flex-1">
            <SkeletonLoader loadable={totals} className="h-4 w-16 ml-auto">
              {(contents) => <div>{formatMoney(contents.allocated, currency)}</div>}
            </SkeletonLoader>
          </div>
          <div className="flex-1 hidden sm:block">
            <SkeletonLoader loadable={totals} className="h-4 w-16 ml-auto">
              {(contents) => <div>{formatMoney(contents.activity, currency)}</div>}
            </SkeletonLoader>
          </div>
          <div className="flex-1">
            <SkeletonLoader loadable={totals} className="h-4 w-16 ml-auto">
              {(contents) => <div>{formatMoney(contents.available, currency)}</div>}
            </SkeletonLoader>
          </div>
        </div>
      </div>
      {envelopes.map((e) => {
        return <EnvelopeLine key={e.id} envelope={e} />;
      })}
    </Panel>
  );
};

// A skeleton component that repeats styles from Group, EnvelopeLine. If they change this should too
const GroupsSkeleton: React.FC = () => {
  const groups = [3, 5, 4, 6, 3];
  const widths = ['w-1/6', 'w-2/6', 'w-3/6', 'w-4/6', 'w-5/6', 'w-full'];
  const randomWidth = () => {
    const random = Math.floor(Math.random() * widths.length);
    return widths[random];
  };

  return (
    <>
      {groups.map((envelopeAmount, index) => (
        <Panel className="flex flex-col w-full" key={index}>
          <div className="grid grid-cols-2 px-4 pt-2 pb-2">
            <SkeletonBlock className="h-4 w-24" />
            <div className="flex">
              <div className="flex-1">
                <SkeletonBlock className="h-4 w-16 ml-auto" />
              </div>
              <div className="flex-1 hidden sm:block">
                <SkeletonBlock className="h-4 w-16 ml-auto" />
              </div>
              <div className="flex-1">
                <SkeletonBlock className="h-4 w-16 ml-auto" />
              </div>
            </div>
          </div>
          {Array.from(Array(envelopeAmount).keys()).map((i) => (
            <div key={i} className="grid grid-cols-2 px-4 py-2 rounded-md">
              <SkeletonBlock className={`h-4 ${randomWidth()}`} />
              <div className="flex">
                <div className="flex-1">
                  <SkeletonBlock className="h-4 w-16 ml-auto" />
                </div>
                <div className="flex-1 hidden sm:block">
                  <SkeletonBlock className="h-4 w-16 ml-auto" />
                </div>
                <div className="flex-1">
                  <SkeletonBlock className="h-4 w-16 ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </Panel>
      ))}
    </>
  );
};
