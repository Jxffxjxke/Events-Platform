import { useSession } from "../../context/SessionContext";
import Auth from "../../components/Auth";
import Account from "../../components/Account";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { DismissKeyboard } from "@/components/DissmissKeyboard";

const LogIn = () => {
  const session = useSession();

  return (
    <DismissKeyboard>
      <View>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth />
        )}
      </View>
    </DismissKeyboard>
  );
};

export default LogIn;
