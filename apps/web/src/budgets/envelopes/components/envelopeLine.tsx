import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { formatMoney } from 'shared/utils/money';
import { Allocated } from './allocated';
import { Available } from './available';
import { Envelope, envelopeSelectedState, monthForEnvelopeQuery } from '../state';

interface EnvelopeLineProps {
  envelope: Envelope;
}

// TODO: Editing the name (or anything else about the envelope) should be done in the
// side panel/modal and the budgeted amount should be a clickable button like the available, that
// opens a little popover window with a text input. Could also put some text in there to communicate
// what is happening when you do this (as a tooltop/help button maybe). Available should also have
// some kind if indication that it's a button when there is an actual amount there too, with plain
// text if it's empty.

export const EnvelopeLine: React.FC<EnvelopeLineProps> = ({ envelope }) => {
  const { id, name } = envelope;
  const { currency } = useRecoilValue(currentBudgetQuery);
  const [envelopeSelectedId, setSelected] = useRecoilState(envelopeSelectedState);
  const { activity, allocated, available, month } = useRecoilValue(
    monthForEnvelopeQuery(parseInt(id, 10)),
  );
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
      <div>{name}</div>
      <div className="flex">
        <div className="flex-1 text-right">
          <Allocated allocated={allocated} envelopeId={id} month={month} />
        </div>
        <div className="flex-1 text-right hidden sm:block">
          <div className="cursor-default">{formatMoney(activity, currency)}</div>
        </div>
        <div className="flex-1 text-right">
          <Available available={available} envelopeId={id} month={month} />
        </div>
      </div>
    </div>
  );
};
