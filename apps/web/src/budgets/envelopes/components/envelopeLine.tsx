import React from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { formatMoney } from 'shared/utils/money';
import { Allocated } from './allocated';
import { Available } from './available';
import { Envelope, envelopeSelectedState, monthForEnvelopeQuery } from '../state';
import { CheckSolid } from 'shared/components/icons';
import { SkeletonLoader } from 'shared/components/skeletonBlock';

interface EnvelopeLineProps {
  envelope: Envelope;
}

// TODO: Editing the name (or anything else about the envelope) should be done in the
// side panel/modal and the budgeted amount should be a clickable button like the available, that
// opens a little popover window with a text input. Could also put some text in there to communicate
// what is happening when you do this (as a tooltop/help button maybe). Available should also have
// some kind if indication that it's a button when there is an actual amount there too, with plain
// text if it's empty.

// Multi-selection

export const EnvelopeLine: React.FC<EnvelopeLineProps> = ({ envelope }) => {
  const { id, name } = envelope;
  const { currency } = useRecoilValue(currentBudgetQuery);
  const [envelopeSelectedId, setSelected] = useRecoilState(envelopeSelectedState);
  // The effect doesn't work yet because something else is causing Suspense on the whole page
  const envelopeMonth = useRecoilValueLoadable(monthForEnvelopeQuery(parseInt(id, 10)));
  const isSelected = envelopeSelectedId === id;
  // Need to re-think this. It is a little too effective at clearing the state
  // const [ref] = useOnClickOutside<HTMLDivElement>(() => setSelected(null));

  return (
    <div
      className={`grid grid-cols-2 px-4 py-2 rounded-md ${
        isSelected ? 'bg-lightBlue-100' : 'hover:bg-gray-50'
      }`}
      onClick={() => setSelected(id)}
      // ref={ref}
    >
      <div className="flex space-x-2">
        <SelectedIcon isSelected={isSelected} />
        <div>{name}</div>
      </div>
      <div className="flex text-right">
        <div className="flex-1">
          <SkeletonLoader loadable={envelopeMonth} className="h-4 w-16 ml-auto">
            {(contents) => (
              <Allocated allocated={contents.allocated} envelopeId={id} month={contents.month} />
            )}
          </SkeletonLoader>
        </div>
        <div className="flex-1 hidden sm:block">
          <SkeletonLoader loadable={envelopeMonth} className="h-4 w-16 ml-auto">
            {(contents) => (
              <div className="cursor-default">{formatMoney(contents.activity, currency)}</div>
            )}
          </SkeletonLoader>
        </div>
        <div className="flex-1">
          <SkeletonLoader loadable={envelopeMonth} className="h-4 w-16 ml-auto">
            {(contents) => (
              <Available available={contents.available} envelopeId={id} month={contents.month} />
            )}
          </SkeletonLoader>
        </div>
      </div>
    </div>
  );
};

interface SelectedIconProps {
  isSelected: boolean;
}

const SelectedIcon: React.FC<SelectedIconProps> = ({ isSelected }) => {
  const setSelected = useSetRecoilState(envelopeSelectedState);
  // Clicking the line will select it for now, so the icon doesn't need to actually select too. This
  // will change with mult-selection.
  const onClick = (e: React.MouseEvent) => {
    if (isSelected) {
      // Don't let the line see this event and re-select itself again
      e.stopPropagation();
      setSelected(null);
    }
  };
  const colour = isSelected ? 'text-blue-300' : 'text-gray-300';

  return (
    <CheckSolid
      className={`h-5 cursor-pointer ${colour} hover:text-blue-300 active:text-blue-400`}
      onClick={onClick}
    />
  );
};
