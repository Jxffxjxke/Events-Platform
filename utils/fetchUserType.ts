import { supabase } from "@/lib/supabase";
import { SetUserType } from "@/types/AuthProps";
import { Session } from "@supabase/supabase-js";

export const fetchUserType = async (
  session: Session,
  setUserType: SetUserType
) => {
  if (!session?.user?.id) {
    return;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("user_type")
      .eq("id", session.user.id)
      .single();

    if (error) throw error;

    setUserType(data?.user_type || "User type not found");
  } catch (error) {
    console.error("Error fetching user type:", error);
    setUserType(null);
  }
};
