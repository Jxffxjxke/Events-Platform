import { supabase } from "@/lib/supabase";

export async function getEventsList() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    return [];
  }
  return data;
}
