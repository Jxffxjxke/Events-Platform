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
    throw new Error(error.message);
  }

  setSession(data?.session || null);
  router.push("/Home");
}

export async function signUpWithEmail(
  supabase: SupabaseClient,
  setSession: (session: Session | null) => void,
  router: any,
  email: string,
  password: string,
  username: string
): Promise<void> {
  const {
    data: { session },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name: username } },
  });

  if (signUpError) {
    throw new Error("Sign Up Error: " + signUpError.message);
  }

  if (session) {
    setSession(session);

    const { error: userError } = await supabase
      .from("users")
      .insert([{ id: session.user.id, name: username }]);

    if (userError) {
      throw new Error("User Insert Error: " + userError.message);
    }

    router.push("/Home");
  } else {
    throw new Error("Please check your inbox for email verification!");
  }
}
