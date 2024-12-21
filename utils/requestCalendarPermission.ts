import * as Calendar from "expo-calendar";

const requestCalendarPermission = async () => {
  const { status } = await Calendar.requestPermissionsAsync();
  return status === "granted";
};
