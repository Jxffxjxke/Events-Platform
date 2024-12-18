import { SessionProvider } from "@/context/SessionContext";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function StackLayout() {
  return (
      <SafeAreaProvider>
        <SessionProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SessionProvider>
      </SafeAreaProvider>
  );
}
