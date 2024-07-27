export interface ApiCategory {
  type: 'income' | 'expense';
  name: string;
}

export interface Category extends ApiCategory {
  id: string;
}

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}
