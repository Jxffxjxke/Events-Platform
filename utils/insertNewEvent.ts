import { supabase } from "@/lib/supabase";

interface EventDetails {
  image: string;
  title: string;
  location: string;
  description: string;
  date: Date;
  openingTime: Date;
  closingTime: Date;
  creator_id: string;
}

export const insertNewEvent = async ({
  image,
  title,
  location,
  description,
  date,
  openingTime,
  closingTime,
  creator_id,
}: EventDetails) => {
  const formattedOpeningTime = openingTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedClosingTime = closingTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          image,
          title,
          location,
          description,
          date: date.toISOString(),
          doorsopen: formattedOpeningTime,
          doorsclose: formattedClosingTime,
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
