import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DismissKeyboard } from "@/components/DissmissKeyboard";

type EventDetails = {
  title: string;
  description: string;
  date: Date;
  openingTime: Date;
  closingTime: Date;
};

export default function AddEvent() {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    title: "",
    description: "",
    date: new Date(),
    openingTime: new Date(),
    closingTime: new Date(),
  });
  console.log(eventDetails);

  const [datePicker, setDatePicker] = useState<boolean>(false);
  const [openingTimePicker, setOpeningTimePicker] = useState<boolean>(false);
  const [closingTimePicker, setClosingTimePicker] = useState<boolean>(false);

  const handleAddEvent = () => {
    const { title, description, date, openingTime, closingTime } = eventDetails;

    if (!title || !description) {
      Alert.alert(
        "Validation Error",
        "Please fill out all fields before adding the event."
      );
      return;
    }

    console.log({
      title,
      description,
      date: date.toDateString(),
      openingTime: openingTime.toLocaleTimeString(),
      closingTime: closingTime.toLocaleTimeString(),
    });

    Alert.alert("Event Added", "Your event has been successfully added!");
  };

  const handleChange = (field: keyof EventDetails, value: any) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      handleChange("date", selectedDate);
    }
    setDatePicker(false);
  };

  const handleTimeChange = (
    field: "openingTime" | "closingTime",
    selectedTime: Date | undefined
  ) => {
    if (selectedTime) {
      console.log(selectedTime);

      const updatedTime = new Date(eventDetails[field]);
      updatedTime.setHours(selectedTime.getHours());
      updatedTime.setMinutes(selectedTime.getMinutes());
      updatedTime.setSeconds(selectedTime.getSeconds());
      handleChange(field, updatedTime);
    }
  };

  return (
    <SafeAreaProvider>
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event title"
            value={eventDetails.title}
            onChangeText={(text) => handleChange("title", text)}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event description"
            value={eventDetails.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setDatePicker(true)}
          >
            <Text style={styles.pickerButtonText}>
              {eventDetails.date.toDateString()}
            </Text>
          </TouchableOpacity>
          {datePicker && (
            <DateTimePicker
              value={eventDetails.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => handleDateChange(selectedDate)}
            />
          )}

          <View style={styles.timePickerContainer}>
            <View style={styles.timePicker}>
              <Text style={styles.label}>Opening Time</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setOpeningTimePicker(true)}
              >
                <Text style={styles.pickerButtonText}>
                  {eventDetails.openingTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              {openingTimePicker && (
                <DateTimePicker
                  value={eventDetails.openingTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    handleTimeChange("openingTime", selectedTime);
                    setOpeningTimePicker(false);
                  }}
                />
              )}
            </View>

            <View style={styles.timePicker}>
              <Text style={styles.label}>Closing Time</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setClosingTimePicker(true)}
              >
                <Text style={styles.pickerButtonText}>
                  {eventDetails.closingTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              {closingTimePicker && (
                <DateTimePicker
                  value={eventDetails.closingTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    handleTimeChange("closingTime", selectedTime);
                    setClosingTimePicker(false);
                  }}
                />
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
            <Text style={styles.addButtonText}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  pickerButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#333",
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  timePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
  addButton: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
