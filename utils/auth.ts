import { Alert } from "react-native";
import { SupabaseClient, Session } from "@supabase/supabase-js";

export async function signInWithEmail(
  supabase: SupabaseClient,
  setSession: (session: Session | null) => void,
  router: any,
  email: string,
  password: string
): Promise<void> {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    Alert.alert(error.message);
  } else {
    setSession(data?.session || null);
    router.push("/Home");
  }
}

export async function signUpWithEmail(
  supabase: SupabaseClient,
  setSession: (session: Session | null) => void,
  router: any,
  email: string,
  password: string
): Promise<void> {
  const {
    data: { session },
    error: signUpError,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    Alert.alert("Sign Up Error: " + signUpError.message);
    return;
  }

  if (session) {
    setSession(session);

    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([{ id: session.user.id, name: "Jake Whittaker" }]);

    if (userError) {
      Alert.alert("User Insert Error: " + userError.message);
      return;
    }

    router.push("/Home");
  } else {
    Alert.alert("Please check your inbox for email verification!");
  }
}
