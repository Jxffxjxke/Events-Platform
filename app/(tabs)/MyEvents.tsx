import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const MyEvents = ({ session }: { session: any }) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!session) {
      setMessage("You are not logged in, to see your events please log in.");
      const timer = setTimeout(() => {
        router.push("/LogIn");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [session, router]);

  return (
    <View style={styles.container}>
      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : (
        <Text>Loading...</Text>
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
