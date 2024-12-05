import { SessionProvider } from "@/context/SessionContext";
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
