import { createSlice } from '@reduxjs/toolkit';
import { createTransaction } from './newTransactionThunks';

export interface NewTransactionState {
  isCreating: boolean;
}

const initialState: NewTransactionState = {
  isCreating: false,
};

export const newTransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectIsCreating: (state) => state.isCreating,
  },
});

export const { selectIsCreating } = newTransactionSlice.selectors;
