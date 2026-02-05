export type TransactionType = "income" | "expense";
export type PaymentMethod = "cash" | "card" | "bank_transfer" | "e_wallet";

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
  paymentMethod?: PaymentMethod;
  establishment?: string; // Where the transaction took place
}

export interface Budget {
  id: string;
  categoryId: number;
  amount: number;
  month: string; // YYYY-MM
}

export interface Agenda {
  id: string;
  title: string;
  date: string; // ISO string
  amount?: number;
  isRecurring?: boolean;
  completed?: boolean;
}
