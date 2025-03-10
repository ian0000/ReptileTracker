import { Stack, Tabs } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="signin" />
        <Tabs.Screen name="(about)" />
      </Tabs>
    </PaperProvider>
  );
}
