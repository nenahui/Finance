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

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface Transaction extends ApiTransaction {
  id: string;
}

export interface FullTransaction extends ApiTransaction {
  id: string;
  name: string;
  type: 'income' | 'expense';
}
