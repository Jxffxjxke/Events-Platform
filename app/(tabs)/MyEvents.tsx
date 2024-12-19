import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSession, useLoading } from "@/context/SessionContext";
import { fetchUserType } from "@/utils/fetchUserType";
import { UserType } from "@/types/AuthProps";
import MyEventsList from "@/components/MyEventsList";
import fetchUserEvents from "@/utils/fetchUserEvents";

const MyEvents = () => {
  const router = useRouter();
  const session = useSession();
  const loading = useLoading();
  const [message, setMessage] = useState<string>("");
  const [userType, setUserType] = useState<UserType>(null);
  const [myEventsList, setMyEventsList] = useState([]);

  useEffect(() => {
    const loadUserTypeAndEvents = async () => {
      if (loading) {
        return;
      }

      if (!session) {
        setMessage("You are not logged in, to see your events please log in.");
        const timer = setTimeout(() => {
          router.push("/Auth");
        }, 3000);

        return () => clearTimeout(timer);
      }
      await fetchUserType(session, setUserType);

      if (userType === "admin") {
        const events = await fetchUserEvents(session.user.id, userType);
        setMyEventsList(events);
      }

      setMessage("");
    };

    loadUserTypeAndEvents();
  }, [session, loading, router, userType]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : (
        <MyEventsList events={myEventsList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
});

export default MyEvents;
