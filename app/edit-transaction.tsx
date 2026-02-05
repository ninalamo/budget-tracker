import { useState, useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Appbar, TextInput, Button, SegmentedButtons, Text, Chip, IconButton } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionType, PaymentMethod, Transaction } from "../types";

const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: string }[] = [
  { value: "cash", label: "Cash", icon: "cash" },
  { value: "card", label: "Card", icon: "credit-card" },
  { value: "bank_transfer", label: "Bank", icon: "bank" },
  { value: "e_wallet", label: "E-Wallet", icon: "cellphone" },
];

export default function EditTransaction() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { transactions, updateTransaction } = useTransactions();
  
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [categoryName, setCategoryName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [establishment, setEstablishment] = useState("");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tx = transactions.find((t) => t.id === id);
    if (tx) {
      setAmount(tx.amount?.toString() || "");
      setNote(tx.note || "");
      setType(tx.type);
      setCategoryName(tx.category?.name || "");
      setPaymentMethod(tx.paymentMethod || "cash");
      setEstablishment(tx.establishment || "");
      setReceiptImage(tx.receiptUrl || null);
    }
  }, [id, transactions]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!amount || !categoryName || !id) return;
    
    setLoading(true);
    await updateTransaction(id, {
      amount: parseFloat(amount),
      note,
      type,
      category: { id: Date.now(), name: categoryName, type },
      paymentMethod,
      establishment: establishment || undefined,
      receiptUrl: receiptImage || undefined,
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Edit Transaction" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SegmentedButtons
          value={type}
          onValueChange={(val) => setType(val as TransactionType)}
          buttons={[
            { value: "expense", label: "Expense", icon: "arrow-down" },
            { value: "income", label: "Income", icon: "arrow-up" },
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
          label="Establishment / Location"
          value={establishment}
          onChangeText={setEstablishment}
          mode="outlined"
          style={{ marginBottom: 16 }}
        />

        <Text variant="labelLarge" style={{ marginBottom: 8 }}>Payment Method</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {PAYMENT_METHODS.map((method) => (
            <Chip
              key={method.value}
              icon={method.icon}
              selected={paymentMethod === method.value}
              onPress={() => setPaymentMethod(method.value)}
              mode="outlined"
            >
              {method.label}
            </Chip>
          ))}
        </View>

        <TextInput
          label="Note (Optional)"
          value={note}
          onChangeText={setNote}
          mode="outlined"
          multiline
          style={{ marginBottom: 16 }}
        />

        <Text variant="labelLarge" style={{ marginBottom: 8 }}>Receipt Image</Text>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
          <Button icon="camera" mode="outlined" onPress={takePhoto}>Take Photo</Button>
          <Button icon="image" mode="outlined" onPress={pickImage}>Gallery</Button>
        </View>

        {receiptImage && (
          <View style={{ position: "relative", marginBottom: 16 }}>
            <Image source={{ uri: receiptImage }} style={{ width: "100%", height: 200, borderRadius: 8 }} resizeMode="cover" />
            <IconButton icon="close-circle" size={24} iconColor="red" style={{ position: "absolute", top: 0, right: 0 }} onPress={() => setReceiptImage(null)} />
          </View>
        )}

        <Button mode="contained" onPress={handleSave} loading={loading} disabled={!amount || !categoryName || loading} style={{ marginTop: 8 }}>
          Save Changes
        </Button>
      </ScrollView>
    </View>
  );
}
