import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EventsList from "@/components/EventsList";

const Home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <EventsList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
