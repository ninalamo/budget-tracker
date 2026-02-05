import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { Transaction } from "../types";

const API_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...transaction, id: Date.now().toString() }),
      });
      const newTransaction = await response.json();
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const updatedTransaction = await response.json();
      setTransactions((prev) => prev.map((t) => (t.id === id ? updatedTransaction : t)));
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return { transactions, loading, refetch: fetchTransactions, addTransaction, updateTransaction, deleteTransaction };
}
