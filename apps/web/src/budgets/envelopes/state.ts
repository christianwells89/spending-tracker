import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { MonthInYear } from '@st/types';
import { apolloClient } from 'App';
import { currentSelectedBudgetUidState, currentBudgetQuery } from 'budgets/state';
import { GET_GROUPS, GET_ENVELOPES, GET_ENVELOPE_MONTHS } from './queries';

export interface Envelope {
  id: string;
  uid: string;
  name: string;
  order: number;
  notes: string;
  isIntake: boolean;
  hiddenFrom?: MonthInYear;
  month: EnvelopeMonth;
  groupId?: number;
}

export interface EnvelopeMonth {
  id: string;
  uid: string;
  month: MonthInYear;
  allocated: number;
  activity: number;
  available: number;
  envelopeId: number;
}

interface EnvelopeGroup {
  id: string;
  name: string;
  order: number;
}

export const currentMonthState = atom<MonthInYear>({
  key: 'CurrentMonthState',
  default: (null as unknown) as MonthInYear,
});

export const groupsInBudgetQuery = selector({
  key: 'GroupsInBudgetQuery',
  get: async ({ get }) => {
    const budgetUid = get(currentSelectedBudgetUidState);
    const response = await apolloClient.query<{ groups: EnvelopeGroup[] }>({
      query: GET_GROUPS,
      variables: { budgetUid },
    });
    if (response.errors) throw response.errors;
    return response.data.groups;
  },
});

export const envelopesQuery = selector({
  key: 'EnvelopesQuery',
  get: async ({ get }) => {
    const budgetUid = get(currentSelectedBudgetUidState);
    const response = await apolloClient.query<{ envelopes: Envelope[] }>({
      query: GET_ENVELOPES,
      variables: { budgetUid },
    });
    if (response.errors) throw response.errors;
    return response.data.envelopes;
  },
});

export const envelopesInGroupQuery = selectorFamily({
  key: 'EnvelopesInGroupQuery',
  get: (groupId: string) => ({ get }) => {
    const envelopes = get(envelopesQuery);
    return envelopes.filter((e) => e.groupId === parseInt(groupId, 10));
  },
});

export const envelopeSelectedState = atom<string | null>({
  key: 'EnvelopeSelectedState',
  default: null,
});

export const envelopeSelectedQuery = selector({
  key: 'EnvelopeSelectedQuery',
  get: ({ get }) => {
    const envelopeSelectedId = get(envelopeSelectedState);
    if (envelopeSelectedId === null) throw new Error("Can't query for selected envelope");

    const envelopes = get(envelopesQuery);
    const envelope = envelopes.find((e) => e.id === envelopeSelectedId);
    if (!envelope) throw new Error('Selected envelope not found');
    return envelope;
  },
});

export const envelopeMonthsQueryRequestIdFamily = atomFamily({
  key: 'EnvelopeMonthsQueryRequestIdFamily',
  default: 0,
});

export const envelopeMonthsQuery = selector({
  key: 'EnvelopeMonthsQuery',
  get: async ({ get }) => {
    // another instance of GraphQL returning the id as a string that we need to cast
    const budget = get(currentBudgetQuery);
    const budgetId = parseInt(budget.id, 10);
    const month = get(currentMonthState);
    // Add a dependency to the requestId so if a month is changed this can be too and will trigger
    // a refresh. Since a mutation should return the new object and put it in apollo's cache, it
    // should only require a re-render on components and no extra requests.
    get(envelopeMonthsQueryRequestIdFamily(month));
    const response = await apolloClient.query<{ envelopeMonths: EnvelopeMonth[] }>({
      query: GET_ENVELOPE_MONTHS,
      variables: { budgetId, month },
    });
    if (response.errors) throw response.errors;

    return response.data.envelopeMonths;
  },
});

export const monthForEnvelopeQuery = selectorFamily({
  key: 'MonthForEnvelopeQuery',
  get: (envelopeId: number) => ({ get }) => {
    const months = get(envelopeMonthsQuery);
    const month = months.find((m) => m.envelopeId === envelopeId);
    if (!month) throw new Error('Month not found for envelope');
    return month;
  },
});

export const monthToBeAllocatedQuery = selector({
  key: 'MonthToBeAllocatedQuery',
  get: ({ get }) => {
    const envelopes = get(envelopesQuery);

    const intakeEnvelope = envelopes.find((e) => e.isIntake);
    if (!intakeEnvelope) throw new Error('No intake envelope found for budget');

    // again, GraphQL giving ID as string and confusing things
    const month = get(monthForEnvelopeQuery(parseInt(intakeEnvelope.id, 10)));
    return month?.available ?? 0;
  },
});

export const monthTotalsQuery = selector({
  key: 'MonthTotalsQuery',
  get: ({ get }) => {
    const months = get(envelopeMonthsQuery);

    return months.reduce(
      (progress, month) => {
        return {
          available: progress.available + month.available,
          allocated: progress.allocated + month.allocated,
        };
      },
      { available: 0, allocated: 0 },
    );
  },
});

export const groupTotalsQuery = selectorFamily({
  key: 'GroupTotalsQuery',
  get: (groupId: string) => ({ get }) => {
    const groupEnvelopes = get(envelopesInGroupQuery(groupId));
    return groupEnvelopes.reduce(
      (acc, envelope) => {
        const month = get(monthForEnvelopeQuery(parseInt(envelope.id, 10)));
        if (!month) return acc;
        acc.totalAllocated += month.allocated;
        acc.totalActivity += month.activity;
        acc.totalAvailable += month.available;
        return acc;
      },
      { totalAllocated: 0, totalActivity: 0, totalAvailable: 0 },
    );
  },
});

export const intakeEnvelopeQuery = selector({
  key: 'IntakeEnvelopeQuery',
  get: ({ get }) => {
    const envelope = get(envelopesQuery).find((e) => e.isIntake);
    if (!envelope) throw new Error('Could not find intake envelope');
    return envelope;
  },
});

export const envelopesWithMonthsQuery = selector({
  key: 'EnvelopesWithMonthsQuery',
  get: ({ get }) => {
    const envelopes = get(envelopesQuery);

    return envelopes.map((envelope) => {
      return { envelope, month: get(monthForEnvelopeQuery(parseInt(envelope.id, 10))) };
    });
  },
});
