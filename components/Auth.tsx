import { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Icon, Input } from "@rneui/themed";
import { useSetSession } from "../context/SessionContext";
import { useRouter } from "expo-router";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const setSession = useSetSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      setSession(data?.session);
      router.push("/Home");
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      if (session) {
        setSession(session);
        router.push("/Home");
      } else {
        Alert.alert("Please check your inbox for email verification!");
      }
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.horizontallySpaced}>
        <Button
          title="Log In"
          disabled={loading}
          onPress={signInWithEmail}
          buttonStyle={styles.fitButton}
          titleStyle={styles.buttonText}
          containerStyle={styles.fitButtonContainer}
        />
        <Icon type="font-awesome" name="exchange" size={15} color={"blue"} />
        <Button
          title="Sign Up"
          disabled={loading}
          onPress={signUpWithEmail}
          buttonStyle={styles.fitButton}
          titleStyle={styles.buttonText}
          containerStyle={styles.fitButtonContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  horizontallySpaced: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  fitButton: {
    paddingVertical: 4,
    borderRadius: 5,
    minWidth: 0,
  },
  buttonText: {
    fontSize: 16,
  },
  fitButtonContainer: {
    alignSelf: "center",
  },
});
