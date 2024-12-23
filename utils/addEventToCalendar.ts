import * as Calendar from "expo-calendar";
import { Alert } from "react-native";

export default async function addEventToCalendar() {
  const hasPermission = await Calendar.requestCalendarPermissionsAsync();
  if (!hasPermission) {
    Alert.alert(
      "Permission required",
      "We need access to your calendar to add events"
    );
    return;
  }

  const eventDetails = {
    title: "My Event",
    startDate: new Date(2024, 11, 22, 14, 0),
    endDate: new Date(2024, 11, 22, 15, 0),
    timeZone: "GMT",
    location: "Somewhere",
    notes: "Event details go here.",
  };

  try {
    const calendarId = await Calendar.getDefaultCalendarAsync();
    await Calendar.createEventAsync(calendarId.id, eventDetails);
  } catch (error) {
    throw new Error("Error creating event");
  }
}
