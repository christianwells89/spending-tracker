import { selector } from 'recoil';

import { apolloClient } from 'App';
import { GET_USER } from './queries';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  timezone?: string;
}

export const userQuery = selector({
  key: 'UserQuery',
  get: async () => {
    const response = await apolloClient.query<{ user: User }>({ query: GET_USER });
    if (response.errors) throw response.errors;
    return response.data.user;
  },
});
