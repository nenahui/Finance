import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiTransactions, Transactions } from '../../types';

export const fetchTransaction = createAsyncThunk<Transactions[], void, { state: RootState }>(
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
