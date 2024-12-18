import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useSession } from "../../context/SessionContext";
import { useLayoutEffect } from "react";

export default function App() {
  const session = useSession();

  useLayoutEffect(() => {}, [session]);

  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="MyEvents"
        options={{
          title: "MyEvents",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Auth"
        options={{
          title: session ? "Account" : "Log In",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
