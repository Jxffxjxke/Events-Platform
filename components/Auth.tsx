import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { useSetSession } from "../context/SessionContext";
import { useRouter } from "expo-router";
import { signInWithEmail, signUpWithEmail } from "../utils/auth";
import { Text } from "react-native-paper";

export default function SignIn(): JSX.Element {
  const setSession = useSetSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);
    await signInWithEmail(supabase, setSession, router, email, password);
    setLoading(false);
  };

  const handleSignUp = async (): Promise<void> => {
    setLoading(true);
    await signUpWithEmail(supabase, setSession, router, email, password);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.horizontallySpaced}>
        <Button title="Log In" disabled={loading} onPress={handleSignIn} />
      </View>
      <View style={styles.centeredText}>
        <Text>
          Don't have an account?{"  "}
          <Text style={styles.underline}>Sign Up</Text>
        </Text>
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
  centeredText: {
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  underline: {
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
