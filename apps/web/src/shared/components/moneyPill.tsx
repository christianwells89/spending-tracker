import React, { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';

import { currentBudgetQuery } from 'budgets/state';
import { formatMoney } from 'shared/utils/money';

// TODO: move this to a util when it's needed elsewhere
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export enum MoneyPillColour {
  gray = 'gray',
  blue = 'blue',
  green = 'green',
  red = 'red',
  yellow = 'yellow',
}

const colourClasses: Record<MoneyPillColour, string[]> = {
  gray: ['bg-gray-100', 'text-gray-800'],
  blue: ['bg-blue-100', 'text-blue-800'],
  green: ['bg-green-200', 'text-green-800'],
  red: ['bg-red-200', 'text-red-800'],
  yellow: ['bg-yellow-200', 'text-yellow-800'],
};

const clickableColourClasses: Record<MoneyPillColour, string[]> = {
  gray: ['hover:bg-gray-300', 'active:bg-gray-400'],
  blue: ['hover:bg-blue-300', 'active:bg-blue-400'],
  green: ['hover:bg-green-300', 'active:bg-green-400'],
  red: ['hover:bg-red-300', 'active:bg-red-400'],
  yellow: ['hover:bg-yellow-300', 'active:bg-yellow-400'],
};

interface MoneyPillProps {
  amount: number;
  colour?: MoneyPillColour;
  isClickable?: boolean;
  className?: string;
  onClick?(e: MouseEvent): void;
}

export const MoneyPill: React.FC<MoneyPillProps> = (props) => {
  const {
    amount,
    isClickable = false,
    className: inputClassName,
    onClick = noop,
    children,
  } = props;
  const { currency } = useRecoilValue(currentBudgetQuery);
  const colour = props.colour ?? getColour(amount);

  const formattedAmount = formatMoney(amount, currency);
  const cursor = isClickable ? 'cursor-pointer' : 'cursor-default';
  const classes = colourClasses[colour];
  if (isClickable) classes.push(...clickableColourClasses[colour]);

  const className = `px-2 -mr-2 text-sm font-semibold rounded-full outline-none\
    focus:outline-none ${cursor} ${classes.join(' ')} ${inputClassName}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
      {formattedAmount}
    </button>
  );
};

function getColour(amount: number): MoneyPillColour {
  if (amount < 0) return MoneyPillColour.red;
  if (amount === 0) return MoneyPillColour.gray;

  return MoneyPillColour.green;
}
