import { Stack, Tabs } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function SigninLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="about"></Stack.Screen>
      </Stack>
    </PaperProvider>
  );
}
