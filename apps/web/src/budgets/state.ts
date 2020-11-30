import { atom, selector } from 'recoil';

import { Currency } from '@st/types';
import { apolloClient } from 'App';
import { GET_BUDGET, GET_BUDGETS } from './queries';

// TODO: these selectors need some way of being able to be force updated when a mutation happens.
// Taking advantage of the apollo cache seems optimal, rather than having to manually set a new
// value of the selector
// https://github.com/facebookexperimental/Recoil/issues/85
// https://recoiljs.org/docs/guides/asynchronous-data-queries#query-refresh

// probably should be kept somewhere else. in types I guess
interface Budget {
  id: string;
  uid: string;
  name: string;
  timezone: string;
  currency: Currency;
}

const LAST_BUDGET_ACCESSED_KEY = 'lastBudgetAccessed';
export const EMPTY_BUDGET_ID = 'NO_ID';
export const EMPTY_BUDGET_UID = 'NO_UID';
// TODO: The dropdown/selector in the sidebar is probably going to be the first thing to load all
// budgets, and it should have some mechanism to then set the currently selected budget (which is
// stored in the currentBudgetState atom) based on last budget used. Or maybe it can just get that
// from localStorage and we don't need to make a trip to the server to get all budgets unless the
// selector is actually clicked on.
const noBudget: Budget = {
  id: EMPTY_BUDGET_ID,
  uid: EMPTY_BUDGET_UID,
  name: 'No Budget Selected',
  timezone: '',
  currency: (null as unknown) as Currency,
};

export const budgetsQuery = selector({
  key: 'BudgetsQuery',
  get: async () => {
    const response = await apolloClient.query<{ budgets: Budget[] }>({ query: GET_BUDGETS });
    if (response.errors) throw response.errors;
    return response.data.budgets;
  },
});

export const currentSelectedBudgetUidState = atom<string>({
  key: 'CurrentSelectedBudgetId',
  // TODO: have an effect to store in localStorage when this is set
  // https://recoiljs.org/docs/guides/atom-effects/#local-storage-persistence
  default: localStorage.getItem(LAST_BUDGET_ACCESSED_KEY) ?? EMPTY_BUDGET_UID,
});

export const currentBudgetQuery = selector({
  key: 'CurrentBudgetQuery',
  get: async ({ get }) => {
    const selectedUid = get(currentSelectedBudgetUidState);
    if (selectedUid === EMPTY_BUDGET_UID) return noBudget;
    const response = await apolloClient.query<{ budget: Budget }>({
      query: GET_BUDGET,
      variables: { uid: selectedUid },
    });
    if (response.errors) throw response.errors;
    return response.data.budget;
  },
});
