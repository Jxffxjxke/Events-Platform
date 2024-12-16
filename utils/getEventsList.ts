import { supabase } from "@/lib/supabase";

export async function getEventsList() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data;
}
