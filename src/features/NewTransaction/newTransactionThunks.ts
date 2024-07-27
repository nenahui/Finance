import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiTransaction } from '../../types';

export const createTransaction = createAsyncThunk<void, ApiTransaction, { state: RootState }>(
  'transaction/create',
  async (transaction) => {
    await axiosApi.post('finance/transactions.json', transaction);
  }
);
