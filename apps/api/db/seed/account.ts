import { AccountType } from '@st/types';

export const accounts = [
  {
    id: 1,
    uid: 'l6j2a59lL2X2tMhcGHw83',
    type: AccountType.checking,
    name: 'Checking',
    institution: 'BoA',
    identifier: '9969',
    budgetId: 1,
  },
  {
    id: 2,
    uid: 'ch_kSv0X0TbU7GLPXZMUp',
    type: AccountType.creditCard,
    name: 'Visa',
    institution: 'BoA',
    identifier: '1555',
    budgetId: 1,
  },
  {
    id: 3,
    uid: 'aJMXgDqBbl1DNxXmeGkjf',
    type: AccountType.savings,
    name: 'Emergency',
    institution: 'BoA',
    budgetId: 1,
  },
  {
    id: 4,
    uid: 'ewe6s4PwF2XGTOkfn2UHE',
    type: AccountType.retirement,
    name: '401K',
    institution: null,
    budgetId: 1,
  },
];
