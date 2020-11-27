import React from 'react';

import { Transaction } from '../state';
import { TransactionsGrid } from './grid';

interface TransactionsProps {
  transactions: Transaction[];
  showAccount: boolean;
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions, showAccount }) => {
  return <TransactionsGrid data={transactions} showAccount={showAccount} />;
};
