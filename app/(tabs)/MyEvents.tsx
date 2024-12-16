import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSession, useLoading } from "@/context/SessionContext";

const MyEvents = () => {
  const router = useRouter();
  const session = useSession();
  const loading = useLoading();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
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

    setMessage("");
  }, [session, loading, router]);

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
        <Text>My Events Page</Text>
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
