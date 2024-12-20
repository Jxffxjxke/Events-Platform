import { supabase } from "@/lib/supabase";

export default async function fetchUserEvents(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("creator_id", user_id);

    if (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
