import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { CellProps, Column, useTable } from 'react-table';

const DateCell: React.FC<CellProps<any>> = (props) => {
  const date = DateTime.fromISO(props.cell.value).toFormat('d MMM yyyy');
  return <div>{date}</div>;
};

const AmountCell: React.FC<CellProps<any>> = (props) => {
  // TODO: when accounts have currencies, use the symbol for that
  const highlight = props.row.original.amount < 0 ? 'red' : 'green';
  const className = `px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${highlight}-100 text-${highlight}-800`;

  return <div className={className}>{`$${props.cell.value}`}</div>;
};

const columnDefinitions: Column[] = [
  { Header: 'Date', accessor: 'date', Cell: DateCell },
  { Header: 'Amount', accessor: 'amount', Cell: AmountCell },
  { Header: 'Account', accessor: 'accountId' },
  { Header: 'Location', accessor: 'location', width: 250 },
  { Header: 'Description', accessor: 'description', width: 150 },
  { Header: 'Category', accessor: 'category' },
  { Header: 'Tags', accessor: 'tags' },
];

interface TransactionsGridProps {
  data: any[];
}

export const TransactionsGrid: React.FC<TransactionsGridProps> = (props) => {
  const { data } = props;
  const columns = useMemo(() => columnDefinitions, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="min-w-full shadow-md overflow-hidden sm:rounded-lg border-b border-gray-200">
      <table className="w-full bg-white border-collapse text-left" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="px-6 py-2 font-light text-sm leading-5 border-b border-gray-200"
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
    </div>
  );
};
