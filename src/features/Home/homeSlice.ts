import { createSlice } from '@reduxjs/toolkit';
import type { Transactions } from '../../types';
import { fetchTransaction } from './homeThunks';

export interface homeState {
  transactions: Transactions[];
  isFetching: boolean;
}

const initialState: homeState = {
  transactions: [],
  isFetching: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, { payload: ApiTransactions }) => {
        state.transactions = ApiTransactions;
        state.isFetching = false;
      })
      .addCase(fetchTransaction.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectIsFetching: (state) => state.isFetching,
    selectTransactions: (state) => state.transactions,
  },
});

export const { selectIsFetching, selectTransactions } = homeSlice.selectors;
