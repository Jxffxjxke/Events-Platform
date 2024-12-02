import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EventsList from "@/components/EventsList";

const home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <EventsList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default home;
