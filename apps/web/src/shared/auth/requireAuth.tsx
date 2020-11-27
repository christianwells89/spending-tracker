import React from 'react';
import { useRecoilValue } from 'recoil';
import { userQuery } from './state';

export const RequireAuth: React.FC = ({ children }) => {
  const user = useRecoilValue(userQuery);

  if (!user) {
    // TODO: redirect to login when that exists
    return <div>Could not load user</div>;
  }

  return <>{children}</>;
};
