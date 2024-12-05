import { useSession } from "../../context/SessionContext";
import Auth from "../../components/Auth";
import Account from "../../components/Account";
import { View } from "react-native";

const LogIn = () => {
  const session = useSession();
  

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
};

export default LogIn;
