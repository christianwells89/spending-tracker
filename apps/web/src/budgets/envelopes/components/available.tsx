import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { MonthInYear } from '@st/types';
import { currentBudgetQuery } from 'budgets/state';
import { Panel } from 'shared/components/panel';
import { PopoverButton } from 'shared/components/popover';
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside';
import { formatMoney, formatMoneyRaw } from 'shared/utils/money';
import { envelopeMonthsQueryRequestIdFamily, envelopesWithMonthsQuery } from '../state';
import { TRANSFER_ALLOCATED } from '../queries';
import { apolloClient } from 'App';

interface AvailableProps {
  available: number;
  envelopeId: string;
  month: MonthInYear;
}

export const Available: React.FC<AvailableProps> = (props) => {
  // TODO: check scheduled transactions/goals and make it yellow/clickable if it's below that this month
  const { currency } = useRecoilValue(currentBudgetQuery);
  const isClickable = props.available !== 0;

  const colourClasses = getColourClasses(props.available);
  const cursor = isClickable ? 'cursor-pointer' : 'cursor-default';
  const className = `px-2 ml-auto -mr-2 text-sm font-semibold rounded-full outline-none\
    focus:outline-none ${cursor} ${colourClasses.join(' ')}`;
  const text = formatMoney(props.available, currency);

  // TODO: if available is negative it should be a transfer to this envelope popover

  return (
    <PopoverButton className={className} text={text} disabled={!isClickable}>
      {(close) => <Transfer closePopover={close} {...props} />}
    </PopoverButton>
  );
};

function getColourClasses(amount: number): string[] {
  if (amount === 0) return colourClasses.gray;

  return amount < 0 ? colourClasses.red : colourClasses.green;
}

const colourClasses = {
  gray: ['bg-gray-100', 'text-gray-800'],
  green: ['bg-green-200', 'hover:bg-green-300', 'active:bg-green-400', 'text-green-800'],
  red: ['bg-red-200', 'hover:bg-red-300', 'active:bg-red-400', 'text-red-800'],
  yellow: ['bg-yellow-200', 'hover:bg-yellow-300', 'active:bg-yellow-400', 'text-yellow-800'],
};

interface TransferProps {
  available: number;
  envelopeId: string;
  month: MonthInYear;
  closePopover(): void;
}

interface TransferForm {
  amount: string;
  toEnvelopeId: string;
}

const Transfer: React.FC<TransferProps> = (props) => {
  const { available, envelopeId, month, closePopover } = props;
  const totalAvailable = formatMoneyRaw(available.toString());
  const setMonthRequestId = useSetRecoilState(envelopeMonthsQueryRequestIdFamily(month));
  const envelopesWithMonths = useRecoilValue(envelopesWithMonthsQuery);
  const { currency } = useRecoilValue(currentBudgetQuery);

  const [ref] = useOnClickOutside<HTMLFormElement>(closePopover);
  const { register, handleSubmit } = useForm<TransferForm>({
    defaultValues: { amount: totalAvailable },
  });

  // TODO: this is almost exactly the same as in Allocated. Parameterise it and make a shared hook
  const mutationCallback = useCallback(
    async (amount: number, toId: number) => {
      // Can't do this inside the selector because the set only takes the same param as the get. Not
      // sure what the point of that is, since that isn't the return type. Maybe there could be a
      // selector just for getting the allocated, that takes envelopeId, month.
      const result = await apolloClient.mutate({
        mutation: TRANSFER_ALLOCATED,
        variables: {
          toId,
          fromId: parseInt(envelopeId, 10),
          amount,
          month,
        },
      });
      // TODO: throw an error toast up and keep the popover open. Maybe an error bounday could be
      // set up to take a special type of Error and its contents put in a toast?
      if (result.errors) throw new Error('Allocation failed');
      // Set a new request id so all months will be re-rendered
      setMonthRequestId((currentId) => currentId + 1);
    },
    [envelopeId, month, setMonthRequestId],
  );

  const onSubmit: SubmitHandler<TransferForm> = async ({ amount, toEnvelopeId }) => {
    const formattedAmount = formatMoneyRaw(amount);

    if (formattedAmount === '0.00' || formattedAmount === 'NaN') {
      closePopover();
      return;
    }

    await mutationCallback(parseFloat(formattedAmount), parseInt(toEnvelopeId, 10));
    closePopover();
  };

  return (
    <Panel className="p-3 w-60">
      <form
        ref={ref}
        className="flex flex-col items-center space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="leading-4 font-medium text-gray-400 uppercase tracking-wider">Transfer</div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="amount"
              className="w-full pl-7 p-2 sm:text-sm rounded-md focus:ring-lightBlue-200 focus:ring-2 focus:border-lightBlue-200 border-trueGray-300 border"
              ref={register}
              autoFocus
              onFocus={(e) => {
                // select() isn't available until the next cycle.
                setTimeout((event) => event.target.select(), 0, e);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="toEnvelopeId" className="text-sm font-medium text-gray-700">
            To
          </label>
          <div>
            <select name="toEnvelopeId" ref={register}>
              <option value=""></option>
              {envelopesWithMonths.map((i) => {
                if (i.envelope.id === envelopeId) return null;
                return (
                  <option key={i.envelope.id} value={i.envelope.id} className="truncate">
                    {i.envelope.name} - {formatMoney(i.month.available, currency)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex w-full justify-end space-x-2">
          <button
            type="button"
            onClick={closePopover}
            className="py-2 px-4 bg-lightBlue-400 text-white font-semibold rounded-lg shadow-md hover:bg-lightBlue-500 focus:outline-none"
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Move"
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 focus:outline-none cursor-pointer"
          />
        </div>
      </form>
    </Panel>
  );
};
