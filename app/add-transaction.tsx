import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, TextInput, Button, SegmentedButtons, HelperText } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionType } from "../types";

export default function AddTransaction() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [categoryName, setCategoryName] = useState(""); // Simplified for MVP
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !categoryName) return;
    
    setLoading(true);
    await addTransaction({
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      note,
      type,
      category: { id: Date.now(), name: categoryName, type }, // Mock category
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Transaction" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SegmentedButtons
          value={type}
          onValueChange={(val) => setType(val as TransactionType)}
          buttons={[
            { value: "expense", label: "Expense" },
            { value: "income", label: "Income" },
          ]}
          style={{ marginBottom: 16 }}
        />

        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          mode="outlined"
          left={<TextInput.Affix text="$" />}
          style={{ marginBottom: 16 }}
        />

        <TextInput
          label="Category"
          value={categoryName}
          onChangeText={setCategoryName}
          mode="outlined"
          style={{ marginBottom: 16 }}
        />

        <TextInput
          label="Note"
          value={note}
          onChangeText={setNote}
          mode="outlined"
          multiline
          style={{ marginBottom: 24 }}
        />

        <Button 
          mode="contained" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={!amount || !categoryName || loading}
        >
          Save Transaction
        </Button>
      </ScrollView>
    </View>
  );
}
