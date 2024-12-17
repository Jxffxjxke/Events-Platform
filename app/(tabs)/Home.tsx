import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/SessionContext";
import EventsList from "@/components/EventsList";

const Home = () => {
  const session = useSession();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      if (!session?.user?.id) {
        console.log("No session found, user not logged in.");
        return;
      }

      try {
        // Query the users table for the user_type based on the session user ID
        const { data, error } = await supabase
          .from("users")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;

        setUserType(data?.user_type || "User type not found");
      } catch (error) {
        console.error("Error fetching user type:", error);
        setUserType(null);
      }
    };

    fetchUserType();
  }, [session]);

  const handleAddEvent = () => {
    console.log("Add event button pressed");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EventsList />
      {userType === "admin" && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;
