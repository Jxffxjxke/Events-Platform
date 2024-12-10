import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import { signUpWithEmail } from "@/utils/auth";

export default function CreateAccount(setEmail, email, setPassword, password) {
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
          title="Sign Up"
          disabled={loading}
          onPress={signUpWithEmail}
          buttonStyle={styles.fitButton}
          titleStyle={styles.buttonText}
          containerStyle={styles.fitButtonContainer}
        />
      </View>
      <View style={(styles.mt20, styles.horizontallySpaced)}>
        <Text>
          Already have an account?{"  "}
          <Link href="/CreateAccount" style={styles.underline}>
            Sign In
          </Link>
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
