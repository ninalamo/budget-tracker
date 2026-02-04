import { View, FlatList } from "react-native";
import { List, Text, useTheme, Divider } from "react-native-paper";
import { Transaction } from "../types";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
    const theme = useTheme();

    // Show only last 10 in the list within dashboard context, usually one would use Slice in dashboard
    const recentTransactions = [...transactions].reverse();

    return (
        <View style={{ backgroundColor: "white", marginHorizontal: 16, borderRadius: 16, padding: 8, elevation: 2 }}>
            <Text variant="titleMedium" style={{ padding: 16, paddingBottom: 8 }}>Recent Activity</Text>
            {recentTransactions.map((item, index) => (
                <View key={item.id}>
                    <List.Item
                        title={item.category.name}
                        description={item.note || item.date.split("T")[0]}
                        left={(props) => (
                            <List.Icon
                                {...props}
                                icon={item.type === "income" ? "arrow-up-circle" : "arrow-down-circle"}
                                color={item.type === "income" ? theme.colors.primary : theme.colors.error}
                            />
                        )}
                        right={() => (
                            <Text
                                variant="bodyLarge"
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "bold",
                                    color: item.type === "income" ? theme.colors.primary : theme.colors.error,
                                }}
                            >
                                {item.type === "income" ? "+" : "-"}${item.amount?.toFixed(2) || "0.00"}
                            </Text>
                        )}
                    />
                    {index < recentTransactions.length - 1 && <Divider />}
                </View>
            ))}
            {recentTransactions.length === 0 && (
                <Text style={{ textAlign: "center", padding: 20, color: "gray" }}>No transactions yet.</Text>
            )}
        </View>
    );
}
