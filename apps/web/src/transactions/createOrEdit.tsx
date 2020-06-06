// TODO:
//  - Have amount be a big border-less input at the top, so the focus is on it
//  - Have account dropdown and date button/picker next to it on top, no labels
//  - Make the grid selectable, opening this component to view transaction. So it needs to take an
//    existing transaction no matter what
//  - Validation
//  - for better currency validation it would be preferable to only allow a max of 2 decimal
//    places. Something like https://github.com/larkintuckerllc/react-currency-input/blob/master/src/components/CurrencyInput.tsx

import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import { TransactionDTO } from '@st/types';

interface CreateOrEditTransactionProps {
  handleCancel: () => void;
  handleSubmit: (dto: TransactionDTO) => void;
}

export const CreateOrEditTransaction: React.FC<CreateOrEditTransactionProps> = (props) => {
  const { register, handleSubmit, control } = useForm<TransactionDTO>();
  const onSubmit = (data: TransactionDTO): void => {
    console.log(data);
    props.handleSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="panel overflow-hidden sm:max-w-lg sm:w-full">
        <div className="flex flex-col px-8 py-6">
          <div className="font-medium text-gray-500 self-center mb-4">Create Transaction</div>
          <div className="flex">
            <input
              name="accountId"
              type="number"
              ref={register}
              className="input"
              placeholder="Account"
            />
            <Controller as={DatePicker} name="date" control={control} defaultValue={new Date()} />
          </div>
          <div>
            <label htmlFor="amount" className="input-label">
              Amount
            </label>
            <div className="input">
              <span className="mr-1 pointer-events-none">$</span>
              <input name="amount" type="number" ref={register} placeholder="0.00" />
            </div>
          </div>
          <div>
            <label htmlFor="amount" className="input-label">
              Location
            </label>
            <input name="location" ref={register} className="input" />
          </div>
          <div>
            <label htmlFor="amount" className="input-label">
              Description
            </label>
            <input name="description" ref={register} className="input" />
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <input
              type="submit"
              value="Create"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-2 py-1 bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            />
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={props.handleCancel}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-2 py-1 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};
