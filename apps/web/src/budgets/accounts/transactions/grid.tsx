import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { CellProps, Column, useFlexLayout, useTable } from 'react-table';

import { TransactionState } from '@st/types';
import { CheckSolid, LockSolid } from 'shared/components/icons';
import { MoneyPill } from 'shared/components/moneyPill';
import { assertUnreachable } from 'shared/utils/check';
import { Transaction } from '../state';

interface TransactionsGridProps {
  data: Transaction[];
  showAccount: boolean;
}

export const TransactionsGrid: React.FC<TransactionsGridProps> = ({ data, showAccount }) => {
  const columns = useMemo(() => {
    if (showAccount) return [accountColumn, ...columnDefinitions];
    return columnDefinitions;
  }, [showAccount]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    // TODO: will need to remove this and handle flex myself when doing the resposive version of
    // this because it's using styles so I can't use classes to put responsive breakpoints on CSS.
    useFlexLayout,
  );

  // TODO: use useRowSelect to capture when a row is clicked on, and if so change the rendering to
  // include a form (except for the cleared cell - that should be clickable without needing to also
  // click a save button). Probably will need to make a higher order component for all the cells
  // that takes row selected state and conditionally renders either the default cell or the editable
  // one. Also need to make other rows not selectable if one is in this state.
  // May need to pass a callback function into the table to do the conditional rendering, possibly
  // to save it from re-rendering the whole thing.
  // https://github.com/tannerlinsley/react-table/tree/master/examples/sub-components
  // https://github.com/tannerlinsley/react-table/tree/master/examples/row-selection

  return (
    <table className="w-full border-collapse" {...getTableProps()}>
      <thead className="rounded-md shadow-md">
        {headerGroups.map((headerGroup) => (
          <tr className="bg-gray-50 px-4 py-1 rounded-md" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="flex pl-2 first:pl-0 text-sm leading-4 font-medium text-gray-400 uppercase tracking-wider"
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="h-2 block" />
      <tbody className="rounded-lg shadow-md divide-y divide-gray-200" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              className="bg-white hover:bg-lightBlue-100 active:bg-lightBlue-200 px-4 py-1 font-light text-sm leading-5 first:rounded-t-md last:rounded-b-md cursor-pointer"
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    className={`flex pl-2 first:pl-0 ${getColumnClass(cell.column.id)}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const DefaultCell: React.FC<CellProps<Transaction>> = (props) => {
  return <div>{props.cell.value}</div>;
};

const DateCell: React.FC<CellProps<Transaction>> = (props) => {
  const date = DateTime.fromISO(props.cell.value).toFormat('d MMM yyyy');
  return <div>{date}</div>;
};

const AmountCell: React.FC<CellProps<Transaction>> = (props) => {
  return <MoneyPill amount={props.cell.value} isClickable={false} className="ml-auto" />;
};

const StateCell: React.FC<CellProps<Transaction>> = (props) => {
  const state: TransactionState = props.cell.value;

  const onClick = () => {
    // TODO: when I implement the transaction mutation this should use it
    console.log('state should change');
  };

  switch (state) {
    case TransactionState.pending:
      return <CheckSolid className="h-4 m-auto text-gray-500 cursor-pointer" onClick={onClick} />;
    case TransactionState.cleared:
      return <CheckSolid className="h-4 m-auto text-green-500 cursor-pointer" onClick={onClick} />;
    case TransactionState.reconciled:
      return <LockSolid className="h-4 m-auto text-green-500" />;
    default:
      return assertUnreachable(`Unexpected transaction state: ${state}`, state);
  }
};

enum ColumnId {
  date = 'date',
  payee = 'payee',
  envelope = 'envelope',
  detail = 'detail',
  amount = 'amount',
  state = 'state',
  account = 'account',
}

function getColumnClass(id: string): string {
  switch (id) {
    case ColumnId.amount:
      return 'justify-items-end';
    case ColumnId.state:
      return 'justify-items-center items-center';
    case ColumnId.date:
    case ColumnId.payee:
    case ColumnId.envelope:
    case ColumnId.detail:
    case ColumnId.account:
    default:
      return 'justify-items-start';
  }
}

const columnDefinitions: Column[] = [
  { Header: 'Date', id: ColumnId.date, accessor: 'date', Cell: DateCell, width: 2.3 },
  { Header: 'Payee', id: ColumnId.payee, accessor: 'payee', Cell: DefaultCell, width: 5 },
  // TODO: add a property "nameWithGroup" that displays like "Food: Groceries"
  { Header: 'Envelope', id: ColumnId.envelope, accessor: 'envelope.name', width: 5 },
  { Header: 'Detail', id: ColumnId.detail, accessor: 'detail', width: 4 },
  {
    Header: () => <div className="m-auto">Amount</div>,
    id: ColumnId.amount,
    accessor: 'amount',
    Cell: AmountCell,
    width: 3,
  },
  {
    Header: () => <div className="m-auto">State</div>,
    id: ColumnId.state,
    accessor: 'state',
    Cell: StateCell,
    width: 1,
  },
];
const accountColumn: Column = {
  Header: 'Account',
  id: ColumnId.account,
  accessor: 'account.name',
  width: 3,
};
