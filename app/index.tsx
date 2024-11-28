import EventsList from "@/components/EventsList";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <EventsList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
