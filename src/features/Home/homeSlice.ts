import { createSlice } from '@reduxjs/toolkit';
import type { Transaction } from '../../types';
import { deleteTransaction, fetchTransaction } from './homeThunks';

export interface homeState {
  transactions: Transaction[];
  isFetching: boolean;
  isDeleting: boolean;
}

const initialState: homeState = {
  transactions: [],
  isFetching: false,
  isDeleting: false,
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

    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectIsFetching: (state) => state.isFetching,
    selectTransactions: (state) => state.transactions,
    selectIsDeleting: (state) => state.isDeleting,
  },
});

export const { selectIsFetching, selectTransactions, selectIsDeleting } = homeSlice.selectors;
