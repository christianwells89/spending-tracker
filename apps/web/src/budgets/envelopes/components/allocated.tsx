import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { MonthInYear } from '@st/types';
import { apolloClient } from 'App';
import { currentBudgetQuery } from 'budgets/state';
import { Panel } from 'shared/components/panel';
import { PopoverButton } from 'shared/components/popover';
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside';
import { difference, formatMoney, formatMoneyRaw } from 'shared/utils/money';
import { TRANSFER_ALLOCATED } from '../queries';
import { envelopeMonthsQueryRequestIdFamily, intakeEnvelopeQuery } from '../state';

interface AllocatedProps {
  allocated: number;
  envelopeId: string;
  month: MonthInYear;
}

export const Allocated: React.FC<AllocatedProps> = (props) => {
  const { currency } = useRecoilValue(currentBudgetQuery);

  const text = formatMoney(props.allocated, currency);
  const className = `px-2  ml-auto -mr-2 bg-blue-200 hover:bg-blue-300 active:bg-blue-400\
    text-blue-800 font-semibold rounded-full outline-none focus:outline-none`;

  return (
    <>
      <PopoverButton className={className} text={text}>
        {(close) => <Allocate closePopover={close} {...props} />}
      </PopoverButton>
    </>
  );
};

interface AllocateProps {
  allocated: number;
  envelopeId: string;
  month: MonthInYear;
  closePopover(): void;
}

interface AllocatedForm {
  amount: string;
}

// TODO: Put a "question mark" icon with a tooltip explaining that this will come from "to be
// allocated". Not important until other people are maybe using this.

const Allocate: React.FC<AllocateProps> = (props) => {
  const { allocated, envelopeId, month, closePopover } = props;
  const currentlyAllocated = formatMoneyRaw(allocated.toString());
  const intakeEnvelope = useRecoilValue(intakeEnvelopeQuery);
  const setMonthRequestId = useSetRecoilState(envelopeMonthsQueryRequestIdFamily(month));

  const [ref] = useOnClickOutside<HTMLFormElement>(closePopover);
  const { register, handleSubmit } = useForm<AllocatedForm>({
    defaultValues: { amount: currentlyAllocated },
  });

  const mutationCallback = useCallback(
    async (amount: number) => {
      // Can't do this inside the selector because the set only takes the same param as the get. Not
      // sure what the point of that is, since that isn't the return type. Maybe there could be a
      // selector just for getting the allocated, that takes envelopeId, month.
      const result = await apolloClient.mutate({
        mutation: TRANSFER_ALLOCATED,
        variables: {
          toId: parseInt(envelopeId, 10),
          fromId: parseInt(intakeEnvelope.id, 10),
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
    [envelopeId, intakeEnvelope.id, month, setMonthRequestId],
  );

  const onSubmit: SubmitHandler<AllocatedForm> = async ({ amount }) => {
    const newlyAllocated = formatMoneyRaw(amount);

    if (currentlyAllocated === newlyAllocated || newlyAllocated === 'NaN') {
      closePopover();
      return;
    }

    const change = difference(parseFloat(currentlyAllocated), parseFloat(newlyAllocated));

    await mutationCallback(change);
    closePopover();
  };

  return (
    <Panel className="p-3 w-60">
      <form
        ref={ref}
        className="flex flex-col items-center space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="leading-4 font-medium text-gray-400 uppercase tracking-wider">Allocate</div>
        <div>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="allocated"
              className="block w-full pl-7 p-2 sm:text-sm rounded-md focus:ring-lightBlue-200 focus:ring-2 focus:border-lightBlue-200 border-trueGray-300 border"
              ref={register}
              autoFocus
              onFocus={(e) => {
                // select() isn't available until the next cycle.
                setTimeout((event) => event.target.select(), 0, e);
              }}
            />
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
