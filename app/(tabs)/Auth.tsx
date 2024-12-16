import { useSession } from "../../context/SessionContext";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useSetSession } from "../../context/SessionContext";
import { useRouter } from "expo-router";
import { signInWithEmail, signUpWithEmail } from "../../utils/auth";

import SignIn from "@/components/SignIn";
import Account from "@/components/Account";
import CreateAccount from "@/components/CreateAccount";
import { Page } from "@/types/AuthProps";

const Auth: React.FC = () => {
  const session = useSession();
  const setSession = useSetSession();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<Page>(session ? "account" : "sign-in");
  const router = useRouter();

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);
    try {
      await signInWithEmail(supabase, setSession, router, email, password);
      setPage("account");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (): Promise<void> => {
    setLoading(true);
    try {
      await signUpWithEmail(supabase, setSession, router, email, password);
      setPage("account");
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(page, session);
  

  if (page === "sign-in") {
    return (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          setPage={setPage}
          handleSignIn={handleSignIn}
        />
    );
  } else if (page === "sign-up") {
    return (
      <CreateAccount
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        setPage={setPage}
        handleSignUp={handleSignUp}
      />
    );
  } else if (page === "account" && session) {
    return <Account session={session} setPage={setPage} />;
  } 
};

export default Auth;
