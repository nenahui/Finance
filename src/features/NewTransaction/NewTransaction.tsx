import { Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionForm } from '../../components/TransactionForm/TransactionForm';

export const NewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(true);

  const closeModal = () => {
    setModalShow(false);
    navigate('/');
  };

  return (
    <>
      <Modal
        open={modalShow}
        onCancel={closeModal}
        style={{ maxWidth: 350 }}
        footer={null}
        title={'Add Expense/Income'}
      >
        <TransactionForm />
      </Modal>
    </>
  );
};
