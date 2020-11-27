import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { CellProps, Column, useFlexLayout, useTable } from 'react-table';
import { useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { formatMoney } from 'shared/utils/money';
import { Transaction } from '../state';

const DateCell: React.FC<CellProps<Transaction>> = (props) => {
  const date = DateTime.fromISO(props.cell.value).toFormat('d MMM yyyy');
  return <div>{date}</div>;
};

const AmountCell: React.FC<CellProps<Transaction>> = (props) => {
  const { currency } = useRecoilValue(currentBudgetQuery);
  const highlight = props.row.original.amount < 0 ? 'red' : 'green';
  const className = `px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-${highlight}-100 text-${highlight}-800`;
  const formattedAmount = formatMoney(props.cell.value, currency);

  return <div className={className}>{formattedAmount}</div>;
};

const columnDefinitions: Column[] = [
  { Header: 'Date', accessor: 'date', Cell: DateCell, width: 2.3 },
  { Header: 'Payee', accessor: 'payee', width: 5 },
  { Header: 'Envelope', accessor: 'envelope.name', width: 5 },
  { Header: 'Detail', accessor: 'detail', width: 4 },
  // TODO: make a component for this, using icons
  { Header: 'Amount', accessor: 'amount', Cell: AmountCell, width: 3 },
  { Header: 'State', accessor: 'state', width: 1 },
];
const accountColumn: Column = { Header: 'Account', accessor: 'account.name', width: 3 };

interface TransactionsGridProps {
  data: Transaction[];
  showAccount: boolean;
}

export const TransactionsGrid: React.FC<TransactionsGridProps> = ({ data, showAccount }) => {
  const columns = useMemo(() => {
    if (showAccount)
      return [...columnDefinitions.slice(0, 2), accountColumn, ...columnDefinitions.slice(2)];
    return columnDefinitions;
  }, [showAccount]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
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
    <div className="-mx-6 shadow-md overflow-hidden rounded-lg border-b border-gray-200">
      <table className="w-full bg-white border-collapse text-left" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-1 py-1 border-b border-gray-200 bg-gray-100 text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex, array) => {
            prepareRow(row);
            return (
              <tr
                // The "last:" tailwind class isn't working here so it has to be ugly
                className={`font-light text-sm leading-5 ${
                  rowIndex === array.length - 1 ? 'border-none' : 'border-b border-gray-200'
                }`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td className="px-1 py-1" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
