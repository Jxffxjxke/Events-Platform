import { supabase } from "@/lib/supabase";

interface EventDetails {
  title: string;
  description: string;
  date: Date;
  openingTime: Date;
  closingTime: Date;
  creator_id: string;
}

export const insertNewEvent = async ({
  title,
  description,
  date,
  openingTime,
  closingTime,
  creator_id,
}: EventDetails) => {
  console.log({
    title,
    description,
    date,
    openingTime,
    closingTime,
    creator_id,
  });

  try {
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          date: date.toISOString(),
          doorsopen: openingTime.toISOString(),
          doorsclose: closingTime.toISOString(),
          creator_id,
        },
      ])
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error("Failed to add the event. Please try again.");
  }
};
