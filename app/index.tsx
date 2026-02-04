import { View, ActivityIndicator, ScrollView } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { SummaryCard } from "../components/SummaryCard";
import { ChartCard } from "../components/ChartCard";
import { TransactionList } from "../components/TransactionList";

export default function Dashboard() {
  const router = useRouter();
  const { transactions, loading, refetch } = useTransactions();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (loading && transactions.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <SummaryCard transactions={transactions} />
        <ChartCard transactions={transactions} />
        <TransactionList transactions={transactions} />
      </ScrollView>
      <FAB
        icon="plus"
        label="Add"
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        onPress={() => router.push("/add-transaction")}
      />
    </View>
  );
}
