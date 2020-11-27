import { gql } from 'apollo-boost';

const allParams = gql`
  fragment AllBudgetParams on Budget {
    id
    uid
    name
    timezone
    currency
  }
`;

export const GET_BUDGET = gql`
  query budget($uid: String!) {
    budget(uid: $uid) {
      ...AllBudgetParams
    }
  }
  ${allParams}
`;

export const GET_BUDGETS = gql`
  query budgets {
    budgets {
      ...AllBudgetParams
    }
  }
  ${allParams}
`;
