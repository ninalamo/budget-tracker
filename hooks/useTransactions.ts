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
        body: JSON.stringify(transaction),
      });
      const newTransaction = await response.json();
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return { transactions, loading, refetch: fetchTransactions, addTransaction };
}
