import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import { AuthProps } from "@/types/AuthProps";

export default function SignIn({
  setEmail,
  email,
  setPassword,
  password,
  loading,
  setPage,
  handleSignIn,
}: AuthProps): JSX.Element {
  return (
    <ScrollView>
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
            <Text
              style={styles.underline}
              onPress={() => {
                setPage!("sign-up");
              }}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
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
