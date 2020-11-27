import { gql } from 'apollo-boost';

export const GET_ENVELOPES_FOR_MONTH = gql`
  query envelopesForMonth($budgetUid: String!, $month: String!) {
    groups(budgetUid: $budgetUid) {
      id
      name
      order
      envelopes {
        id
        uid
        name
        order
        notes
        isIntake
        hiddenFrom
        month(month: $month) {
          id
          uid
          month
          allocated
          activity
          available
        }
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query groups($budgetUid: String!) {
    groups(budgetUid: $budgetUid) {
      id
      name
      order
    }
  }
`;

export const GET_ENVELOPES = gql`
  query envelopes($budgetUid: String!) {
    envelopes(budgetUid: $budgetUid) {
      id
      uid
      name
      order
      notes
      isIntake
      hiddenFrom
      groupId
    }
  }
`;

export const GET_ENVELOPE_MONTHS = gql`
  query envelopeMonths($budgetId: Float!, $month: String!) {
    envelopeMonths(budgetId: $budgetId, month: $month) {
      id
      envelopeId
      month
      allocated
      activity
      available
    }
  }
`;

export const TRANSFER_ALLOCATED = gql`
  mutation transferAllocated($toId: Int!, $fromId: Int!, $amount: Float!, $month: String!) {
    transferAllocated(toId: $toId, fromId: $fromId, amount: $amount, month: $month) {
      id
      envelopeId
      month
      allocated
      activity
      available
    }
  }
`;
