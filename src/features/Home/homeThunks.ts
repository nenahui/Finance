import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiTransaction, ApiTransactions, Transaction } from '../../types';

export const fetchTransaction = createAsyncThunk<Transaction[], void, { state: RootState }>(
  'home/fetch',
  async () => {
    const { data: transaction } = await axiosApi.get<ApiTransactions | null>(
      'finance/transactions.json'
    );

    if (transaction === null) {
      return [];
    }

    return Object.keys(transaction).map((id) => ({
      id,
      ...transaction[id],
    }));
  }
);

export const deleteTransaction = createAsyncThunk<void, string, { state: RootState }>(
  'home/delete',
  async (transactionId) => {
    await axiosApi.delete(`finance/transactions/${transactionId}.json`);
  }
);

export const fetchTransactionValues = createAsyncThunk<
  Transaction | null,
  string,
  { state: RootState }
>('home/fetchOne', async (transactionId) => {
  const { data: transaction } = await axiosApi.get<ApiTransaction | null>(
    `finance/transactions/${transactionId}.json`
  );

  if (transaction === null) {
    return null;
  }

  console.log({
    id: transactionId,
    ...transaction,
  });

  return {
    id: transactionId,
    ...transaction,
  };
});

export const editTransaction = createAsyncThunk<void, Transaction, { state: RootState }>(
  'home/edit',
  async (transaction) => {
    await axiosApi.put(`finance/transactions/${transaction.id}.json`, {
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      category: transaction.category,
    });
  }
);
