import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from '../features/Categories/categoriesSlice';
import { newTransactionSlice } from '../features/NewTransaction/newTransactionSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    transaction: newTransactionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
