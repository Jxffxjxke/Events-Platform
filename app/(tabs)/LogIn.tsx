import { useSession } from "../../context/SessionContext";
import SignInAuth from "../../components/Auth";
import Account from "../../components/Account";
import { View } from "react-native";
import { DismissKeyboard } from "@/components/DissmissKeyboard";

const LogIn = () => {
  const session = useSession();

  return (
    <DismissKeyboard>
      <View>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <SignInAuth />
        )}
      </View>
    </DismissKeyboard>
  );
};

export default LogIn;
