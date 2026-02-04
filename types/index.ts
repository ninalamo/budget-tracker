export type TransactionType = "income" | "expense";

export interface Category {
  id: number;
  name: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  date: string; // ISO string
  note?: string;
  receiptUrl?: string;
  type: TransactionType;
}

export interface Budget {
  id: string;
  categoryId: number;
  amount: number;
  month: string; // YYYY-MM
}
