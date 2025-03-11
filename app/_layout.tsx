import { Stack, Tabs } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"></Stack.Screen>
        <Stack.Screen name="signin"></Stack.Screen>
      </Stack>
    </PaperProvider>
  );
}
