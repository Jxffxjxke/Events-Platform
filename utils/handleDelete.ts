import { supabase } from "@/lib/supabase";

export default async function handleDelete(eventID: string): Promise<void> {
  try {
    const { data, error } = await supabase
      .from("events")
      .delete()
      .eq("id", eventID);
    if (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    throw new Error("Unexpected error");
  }
}
