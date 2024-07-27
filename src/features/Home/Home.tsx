import { Card, Flex, Spin, Statistic } from 'antd';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import type { Category } from '../../types';
import { selectCategories } from '../Categories/categoriesSlice';
import { fetchCategories } from '../Categories/categoriesThunks';
import { selectIsFetching, selectTransactions } from './homeSlice';
import { fetchTransaction } from './homeThunks';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);
  const isFetching = useAppSelector(selectIsFetching);

  const allTransactions = transactions
    .map((item) => {
      const category = categories.find((cat) => cat.id === item.category) as Category;
      return {
        ...category,
        ...item,
      };
    })
    .reverse();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransaction());
  }, [dispatch]);

  const totalPrice = () => {
    let totalSum = 0;
    allTransactions.forEach((item) => {
      if (item.type === 'income') {
        totalSum += item.amount;
      } else {
        totalSum -= item.amount;
      }

      if (totalSum <= 0) {
        totalSum = 0;
      }
    });

    return totalSum;
  };

  return (
    <Flex gap={'large'} vertical>
      <Flex justify={'space-between'} align={'center'}>
        <Card size={'small'}>
          <Statistic
            title='Total'
            value={totalPrice()}
            valueStyle={{ color: '#52c41a' }}
            suffix='KGS'
          />
        </Card>
      </Flex>

      <Flex gap={'middle'} vertical>
        {isFetching && <Spin className={'a-centered'} />}
        {allTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Flex>
      <Outlet />
    </Flex>
  );
};
