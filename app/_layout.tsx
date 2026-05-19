import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F9FAFB" } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="add-bottle" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="bottle-settings" options={{ presentation: "card" }} />
        <Stack.Screen name="water-quality" options={{ presentation: "card" }} />
        <Stack.Screen name="reminder-settings" options={{ presentation: "card" }} />
        <Stack.Screen name="find-bottle" options={{ presentation: "card" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
