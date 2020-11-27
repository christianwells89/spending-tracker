// TODO: have a path for add (or edit with an id) that on load will open the modal

import React, { useState } from 'react';
import Modal from 'react-modal';

import { CreateOrEditTransaction } from './createOrEdit';
import { TransactionsGrid } from './grid';
// import { useAxios } from 'shared/hooks/useAxios';

export const Transactions: React.FC = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [transactions, isLoading] = useAxios('transaction', []);
  const transactions: any[] = [];

  // can't set opacity for the overlay because then the modal can't go higher than it.
  // Need to use an rgb background with opacity to achieve that.
  const style = {
    overlay: { backgroundColor: 'rgb(107, 114, 128, 0.75)' },
    // TODO: put a value for this in tailwind
    content: { top: '4rem' },
  };

  return (
    <div>
      <div className="panel p-2 my-4">
        <button
          className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-xs leading-6 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          onClick={(): void => setModalIsOpen(true)}
        >
          Create New
        </button>
      </div>
      <TransactionsGrid data={transactions} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={(): void => setModalIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className="absolute focus:outline-none"
        overlayClassName="fixed bottom-0 inset-x-0 px-4 pt-6 pb-4 inset-0 flex items-center justify-center"
        style={style}
      >
        <CreateOrEditTransaction
          handleCancel={(): void => setModalIsOpen(false)}
          handleSubmit={(): void => setModalIsOpen(false)}
        />
      </Modal>
    </div>
  );
};
