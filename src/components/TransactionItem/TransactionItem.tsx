import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { FullTransaction } from '../../types';

interface Props {
  transaction: FullTransaction;
}

const { Text } = Typography;

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
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
          <Button type={'link'} icon={<EditOutlined />} />
          <Button type={'link'} danger icon={<DeleteOutlined />} />
        </Flex>
      </Flex>
    </Card>
  );
};
