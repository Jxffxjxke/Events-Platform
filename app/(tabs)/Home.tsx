import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EventsList from "@/components/EventsList";

const Home = () => {
  return (
    <SafeAreaView>
      <EventsList />
    </SafeAreaView>
  );
};

export default Home;
