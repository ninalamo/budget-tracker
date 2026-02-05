import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { CurrencyProvider } from "../context/CurrencyContext";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#3b5998",
    secondary: "#4c669f",
  },
};

export default function RootLayout() {
  return (
    <CurrencyProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: "Dashboard" }} />
          <Stack.Screen name="add-transaction" options={{ title: "Add Transaction" }} />
          <Stack.Screen name="edit-transaction" options={{ title: "Edit Transaction" }} />
          <Stack.Screen name="transaction-details" options={{ title: "Transaction Details" }} />
          <Stack.Screen name="calendar" options={{ title: "Calendar" }} />
          <Stack.Screen name="budgets" options={{ title: "Budgets" }} />
          <Stack.Screen name="reports" options={{ title: "Reports" }} />
          <Stack.Screen name="agenda" options={{ title: "Agenda" }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
        </Stack>
      </PaperProvider>
    </CurrencyProvider>
  );
}
