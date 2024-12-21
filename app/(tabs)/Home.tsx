import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "@/context/SessionContext";
import EventsList from "@/components/EventsList";
import { fetchUserType } from "@/utils/fetchUserType";
import { UserType } from "@/types/AuthProps";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/types/NavigationTypes";

type NavigationProp = NativeStackNavigationProp<AppStackParamList, "(tabs)">;

const Home = () => {
  const session = useSession();
  const [userType, setUserType] = useState<UserType>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (session) {
      fetchUserType(session, setUserType);
    }
  }, [session]);

  const handleAddEvent = () => {
    navigation.navigate("AddEvent");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EventsList style={styles.m20 } />
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
  m20: {
    margin: 20
  }
});

export default Home;
