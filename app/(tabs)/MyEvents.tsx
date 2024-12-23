import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSession, useLoading } from "@/context/SessionContext";
import { fetchUserType } from "@/utils/fetchUserType";
import { UserType } from "@/types/AuthProps";
import MyEventsList from "@/components/MyEventsList";
import fetchUserEvents from "@/utils/fetchUserEvents";
import { EventDetails } from "@/types/EventDetails";

const MyEvents = () => {
  const router = useRouter();
  const session = useSession();
  const loading = useLoading();
  const [message, setMessage] = useState<string>("");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [myEventsList, setMyEventsList] = useState<EventDetails[]>([]);

  useEffect(() => {
    const loadUserTypeAndEvents = async () => {
      if (loading) {
        return;
      }

      if (!session) {
        setMessage("You are not logged in. Please log in to see your events.");
        const timer = setTimeout(() => {
          router.push("/Auth");
        }, 3000);

        return () => clearTimeout(timer);
      }

      try {
        await fetchUserType(session, setUserType);
      } catch (error) {
        console.error("Error fetching user type:", error);
        setMessage("An error occurred while fetching your user type.");
        return;
      }
    };

    loadUserTypeAndEvents();
  }, [session, loading, router]);

  useEffect(() => {
    const fetchEventsIfAdmin = async () => {
      if (userType === "admin" && session) {
        const events = await fetchUserEvents(session.user.id);

        if (!events || events.length === 0) {
          setMessage("You have no current events.");
          setMyEventsList([]);
        } else {
          setMyEventsList(events as EventDetails[]);
        }
      } else if (userType && userType !== "admin") {
        setMessage(
          "This page is for admins only. If you wish to become an admin and start adding your own events, contact jj.whittaker01@gmail.com."
        );
      }
    };

    if (userType) {
      fetchEventsIfAdmin();
    }
  }, [userType, session, myEventsList]);

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
        <Text style={styles.centeredMessage}>{message}</Text>
      ) : (
        <MyEventsList events={myEventsList} />
      )}
    </View>
  );
};

export default MyEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centeredMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
});
