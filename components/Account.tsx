import { supabase } from "../lib/supabase";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";

export default function Account({
  session,
  setPage,
}: {
  session: Session;
  setPage: any;
}) {
  console.log(JSON.stringify(session.user.user_metadata.name, null, 2));


  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Username"
          value={session?.user?.user_metadata.name}
          disabled
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Log Out"
          onPress={() => {
            supabase.auth.signOut();
            setPage("sign-in");
          }}
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
    marginVertical: "auto",
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
  fitButton: {
    paddingVertical: 4,
    borderRadius: 5,
    width: "auto",
    minWidth: 0,
  },
  buttonText: {
    fontSize: 16,
  },
  fitButtonContainer: {
    alignSelf: "center",
  },
});
