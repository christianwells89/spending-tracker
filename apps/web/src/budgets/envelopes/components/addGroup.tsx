import React from 'react';

import { PlusCircleOutline } from 'shared/components/icons';

// TODO: Add a modal in here with the form for a new group

export const AddGroupButton: React.FC = () => {
  return (
    <div>
      <button className="flex space-x-2 bg-gray-50 active:bg-gray-200 px-4 py-2 rounded-md shadow-md text-sm leading-4 font-medium text-gray-400 uppercase tracking-wider outline-none focus:outline-none">
        <PlusCircleOutline className="h-5 -mb-1 -mt-0.5" />
        <div>Add Group</div>
      </button>
    </div>
  );
};
