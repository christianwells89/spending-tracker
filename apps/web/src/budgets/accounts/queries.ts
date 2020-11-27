import gql from 'graphql-tag';

const allParams = gql`
  fragment AllAccountParams on Account {
    id
    uid
    institution
    name
    balance
    type
  }
`;

export const GET_ACCOUNTS = gql`
  query accounts($budgetId: String!) {
    accounts(budgetId: $budgetId) {
      ...AllAccountParams
    }
  }
  ${allParams}
`;

export const GET_ACCOUNT = gql`
  query account($uid: String!) {
    account(uid: $uid) {
      ...AllAccountParams
    }
  }
  ${allParams}
`;

export const GET_TRANSACTIONS = gql`
  query transactions($accountI: String, $budgetId: String) {
    transactions(accountI: $accountI, budgetId: $budgetId) {
      id
      amount
      date
      payee
      detail
      state
      isTransfer
      account {
        id
        name
      }
      envelope {
        id
        name
      }
    }
  }
`;
