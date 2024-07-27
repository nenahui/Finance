import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Modal, Popconfirm, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsDeleting } from '../../features/Home/homeSlice';
import { deleteTransaction, fetchTransaction } from '../../features/Home/homeThunks';
import type { FullTransaction } from '../../types';
import { TransactionForm } from '../TransactionForm/TransactionForm';

interface Props {
  transaction: FullTransaction;
}

const { Text } = Typography;

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectIsDeleting);

  const onDelete = async () => {
    await dispatch(deleteTransaction(transaction.id));
    dispatch(fetchTransaction());
  };

  const showModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <Card>
      <Flex justify={'space-between'} align={'center'}>
        <Flex vertical>
          <Text type={'secondary'}>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm')}</Text>
          <Text>{transaction.name}</Text>
        </Flex>

        <Text type={transaction.type === 'expense' ? 'danger' : 'success'}>
          {transaction.type === 'expense' ? '-' : '+'}
          {transaction.amount}
        </Text>

        <Flex vertical>
          <Button type={'link'} icon={<EditOutlined />} onClick={showModal} />
          <Popconfirm
            onConfirm={onDelete}
            title='Delete the transaction'
            description='Are you sure to delete this transaction?'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button type={'link'} danger icon={<DeleteOutlined />} disabled={isDeleting} />
          </Popconfirm>
        </Flex>
      </Flex>

      <Modal footer={[]} open={modalShow} title={'Edit transaction'} onCancel={closeModal}>
        <TransactionForm transaction={transaction} formType={'edit'} />
      </Modal>
    </Card>
  );
};
