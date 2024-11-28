import { URLparams } from "@/components/EventsList";
import Constants from "expo-constants";

export const getEventsList = async (URLparams: URLparams) => {
  const { latitude, longitude } = URLparams;
  const apiKey = Constants.expoConfig?.extra?.SKIDDLE_API_KEY;

  let paramString: string = "";

  if (latitude && longitude) {
    paramString = `&${latitude}&longitude${longitude}&radius=20`;
  }

  try {
    const response = await fetch(
      `https://www.skiddle.com/api/v1/events/search/?api_key=${apiKey}${paramString}&limit=100`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const eventsArray = await response.json();
    

    return eventsArray;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
