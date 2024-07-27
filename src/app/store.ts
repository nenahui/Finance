import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from '../features/Categories/categoriesSlice';
import { homeSlice } from '../features/Home/homeSlice';
import { newTransactionSlice } from '../features/NewTransaction/newTransactionSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    transaction: newTransactionSlice.reducer,
    home: homeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
