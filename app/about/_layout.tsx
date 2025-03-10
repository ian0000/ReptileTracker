import { Stack, Tabs } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function SigninLayout() {
  return (
    <PaperProvider>
      <Tabs>
        <Tabs.Screen name="about" />
      </Tabs>
    </PaperProvider>
  );
}
