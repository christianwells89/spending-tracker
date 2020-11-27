import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { XSolid } from 'shared/components/icons';
import { Panel } from 'shared/components/panel';
import { envelopeSelectedQuery, envelopeSelectedState } from '../state';

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

// Still not entirely happy with this name
export const Actions: React.FC = () => {
  const envelopeSelectedId = useRecoilValue(envelopeSelectedState);

  return (
    <Panel className="flex-1">
      {envelopeSelectedId === null ? <AllEnvelopesActions /> : <SingleEnvelopeActions />}
    </Panel>
  );
};

const SingleEnvelopeActions: React.FC = () => {
  const [, setSelectedEnvelopeId] = useRecoilState(envelopeSelectedState);
  const envelope = useRecoilValue(envelopeSelectedQuery);

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
      <div>Actions will go here</div>
    </div>
  );
};

const AllEnvelopesActions: React.FC = () => {
  return <div>Stats about the month will go here.</div>;
};
