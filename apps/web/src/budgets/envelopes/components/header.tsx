import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="bg-gray-50 px-4 py-2 rounded-md shadow-md text-sm leading-4 font-medium text-gray-400 uppercase tracking-wider grid grid-cols-2">
      <div>Group</div>
      <div className="grid grid-cols-3 text-right">
        <div>Allocated</div>
        <div>Activity</div>
        <div>Available</div>
      </div>
    </div>
  );
};
