import { createSlice } from '@reduxjs/toolkit';
import type { ApiCategory, Category } from '../../types';
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchOneCategory,
} from './categoriesThunks';

export interface CategoriesState {
  categories: Category[];
  categoryValues: ApiCategory | null;
  isFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  isEditing: boolean;
  isOneFetching: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  categoryValues: null,
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  isEditing: false,
  isOneFetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: ApiCategories }) => {
        state.categories = ApiCategories;
        state.isFetching = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isDeleting = false;
      });

    builder
      .addCase(editCategory.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editCategory.rejected, (state) => {
        state.isEditing = false;
      });

    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.categoryValues = null;
        state.isOneFetching = true;
      })
      .addCase(fetchOneCategory.fulfilled, (state, { payload: ApiCategory }) => {
        state.categoryValues = ApiCategory;
        state.isOneFetching = false;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.isOneFetching = false;
      });
  },
  selectors: {
    selectIsCreating: (state) => state.isCreating,
    selectIsFetching: (state) => state.isFetching,
    selectCategories: (state) => state.categories,
    selectIsDeleting: (state) => state.isDeleting,
    selectIsEditing: (state) => state.isEditing,
    selectCategoryValues: (state) => state.categoryValues,
    selectIsOneFetching: (state) => state.isOneFetching,
  },
});

export const {
  selectIsCreating,
  selectIsFetching,
  selectCategories,
  selectIsDeleting,
  selectIsEditing,
  selectCategoryValues,
  selectIsOneFetching,
} = categoriesSlice.selectors;
