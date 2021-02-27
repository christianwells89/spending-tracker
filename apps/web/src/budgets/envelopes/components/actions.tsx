import { DateTime } from 'luxon';
import React from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { Backdrop } from 'shared/components/backdrop';
import { XSolid } from 'shared/components/icons';
import { Panel } from 'shared/components/panel';
import {
  envelopeSelectedQuery,
  envelopeSelectedState,
  monthForEnvelopeQuery,
  relativeMonthQuery,
} from '../state';
import { formatMoney } from 'shared/utils/money';
import { SkeletonLoader } from 'shared/components/skeletonBlock';

export const EnvelopeActionsState = atom({
  key: 'EnvelopeActionsState',
  default: false,
});

// TODO: This should be an optional pane that can be activated from a button in the selected line?

// To make the design responsive this will be in the right 1/3 of the screen on desktop, but in a
// modal (either from the bottom or right) in smaller screens. If it has an X in the top corner to
// de-select the line it would be enough to not _need_ to be able to click in the non-modal area to
// close it, but that would be nice too.
// Seems like this could be possible with just media queries and CSS alone, but it might be a bit
// finicky. The below link is a jquery implementation of this (that doesn't work anymore) that could
// offer some hints
// https://appglobe.com/responsive-sidebar-modal-window/
// Or this tailwind one:
// https://tailwindui.com/components/application-ui/overlays/slide-overs#component-91416d48f50d19d1ad826e5a6c77b1e9

// The activity column is hidden in sm so it should be in here as well.

// Still not entirely happy with this name
export const Actions: React.FC = () => {
  const envelopeSelectedId = useRecoilValue(envelopeSelectedState);
  const [isOpen, setIsOpen] = useRecoilState(EnvelopeActionsState);

  return (
    <>
      <Panel className="flex-1 max-w-md">
        {envelopeSelectedId === null ? <AllEnvelopesActions /> : <SingleEnvelopeActions />}
      </Panel>
      <Backdrop isVisible={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

const SingleEnvelopeActions: React.FC = () => {
  const setSelectedEnvelopeId = useSetRecoilState(envelopeSelectedState);
  const envelope = useRecoilValue(envelopeSelectedQuery);
  // TODO: useRecoilValueLoadable a new query for detailed info about envelope month. Show wireframe
  // while loading.
  const previousMonth = useRecoilValue(relativeMonthQuery(-1));
  const envelopeMonth = useRecoilValueLoadable(monthForEnvelopeQuery(parseInt(envelope.id, 10)));

  return (
    <div className="flex flex-col divide-y-2 divide-gray-200">
      <div className="flex content-between text-xl m-4">
        <div className="flex-auto">{envelope.name}</div>
        <div>
          <XSolid
            className="h-7 rounded-full hover:bg-gray-100 p-1 cursor-pointer"
            onClick={() => setSelectedEnvelopeId(null)}
          />
        </div>
      </div>
      <div className="p-4 flex flex-col space-y-2 text-sm">
        <SkeletonLoader loadable={envelopeMonth} className="h-4 w-full">
          {(contents) => (
            <EnvelopeMonthTotalsLine
              category={`Cash Left Over From ${DateTime.fromISO(previousMonth).toFormat('LLLL')}`}
              amount={contents.available - contents.allocated - contents.activity}
            />
          )}
        </SkeletonLoader>
        <SkeletonLoader loadable={envelopeMonth} className="h-4 w-full">
          {(contents) => (
            <EnvelopeMonthTotalsLine category="Budgeted This Month" amount={contents.allocated} />
          )}
        </SkeletonLoader>
        <SkeletonLoader loadable={envelopeMonth} className="h-4 w-full">
          {(contents) => (
            <EnvelopeMonthTotalsLine category="Activity This Month" amount={contents.activity} />
          )}
        </SkeletonLoader>
        <SkeletonLoader loadable={envelopeMonth} className="h-4 w-full">
          {(contents) => (
            <EnvelopeMonthTotalsLine category="Available" amount={contents.available} />
          )}
        </SkeletonLoader>
      </div>
      <div className="p-4">Next section</div>
    </div>
  );
};

interface EnvelopeMonthTotalsLineProps {
  category: string;
  amount: number;
}

const EnvelopeMonthTotalsLine: React.FC<EnvelopeMonthTotalsLineProps> = ({ category, amount }) => {
  const { currency } = useRecoilValue(currentBudgetQuery);
  const formattedAmount = formatMoney(amount, currency);

  return (
    <div className="flex border-none last:border-solid border-t-2 border-gray-200 last:pt-2">
      <div className="flex-1">{category}</div>
      <div className="font-semibold">{formattedAmount}</div>
    </div>
  );
};

const AllEnvelopesActions: React.FC = () => {
  return <div>Stats about the month will go here.</div>;
};
