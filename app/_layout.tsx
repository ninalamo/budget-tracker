import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";

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
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Dashboard" }} />
        <Stack.Screen name="add-transaction" options={{ title: "Add Transaction" }} />
        <Stack.Screen name="calendar" options={{ title: "Calendar" }} />
        <Stack.Screen name="budgets" options={{ title: "Budgets" }} />
      </Stack>
    </PaperProvider>
  );
}
