import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiCategories, ApiCategory, Category } from '../../types';

export const createCategory = createAsyncThunk<void, ApiCategory, { state: RootState }>(
  'categories/create',
  async (category) => {
    await axiosApi.post('finance/categories.json', category);
  }
);

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
  'categories/fetch',
  async () => {
    const { data: categories } = await axiosApi.get<ApiCategories | null>(
      'finance/categories.json'
    );

    if (categories === null) {
      return [];
    }

    return Object.keys(categories).map((id) => ({
      id,
      ...categories[id],
    }));
  }
);

export const deleteCategory = createAsyncThunk<void, string, { state: RootState }>(
  'categories/delete',
  async (categoryId) => {
    await axiosApi.delete(`finance/categories/${categoryId}.json`);
  }
);

export const editCategory = createAsyncThunk<void, Category, { state: RootState }>(
  'categories/edit',
  async (category) => {
    const data = {
      type: category.type,
      name: category.name,
    };

    await axiosApi.put(`finance/categories/${category.id}.json`, data);
  }
);

export const fetchOneCategory = createAsyncThunk<ApiCategory | null, string, { state: RootState }>(
  'categories/fetchOne',
  async (categoryId) => {
    const { data: category } = await axiosApi.get<ApiCategory>(
      `finance/categories/${categoryId}.json`
    );

    if (category === null) {
      return null;
    }

    return category;
  }
);
