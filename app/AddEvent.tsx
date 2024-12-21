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
import { useRouter } from "expo-router";
import { useSession } from "@/context/SessionContext";
import { insertNewEvent } from "@/utils/insertNewEvent";
import validateURL from "@/utils/validateURL";
import { EventDetails } from "@/types/EventDetails";
import { faker } from "@faker-js/faker";

export default function addEvent() {
  const session = useSession();
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    image: "",
    title: "",
    location: "",
    description: "",
    date: new Date(),
    openingTime: new Date(),
    closingTime: new Date(),
  });

  const router = useRouter();

  const [datePicker, setDatePicker] = useState<boolean>(false);
  const [openingTimePicker, setOpeningTimePicker] = useState<boolean>(false);
  const [closingTimePicker, setClosingTimePicker] = useState<boolean>(false);

  const handleAddEvent = async () => {
    if (!session) {
      Alert.alert("Error", "Session not loaded. Please try again later.");
      return;
    }

    const {
      image,
      title,
      location,
      description,
      date,
      openingTime,
      closingTime,
    } = eventDetails;

    if (!title || !description || !validateURL(image)) {
      Alert.alert(
        "Validation Error",
        "Please fill out all fields correctly, and ensure the URLs are valid"
      );
      return;
    }

    const creator_id = session?.user?.id;

    if (!creator_id) {
      Alert.alert("Error", "User ID not found. Please log in again.");
      return;
    }

    try {
      await insertNewEvent({
        image,
        title,
        location,
        description,
        date,
        openingTime,
        closingTime,
        creator_id,
      });

      Alert.alert("Success", "Your event has been successfully added!", [
        {
          text: "OK",
          onPress: () => router.push("/Home"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an issue adding your event. Please try again."
      );
    }
  };

  const handleChange = (field: keyof EventDetails, value: string | Date) => {
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
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event image URL"
            value={eventDetails.image}
            onChangeText={(text) => {
              handleChange("image", text);
            }}
            multiline
            numberOfLines={4}
            keyboardType="url"
          />
          <TouchableOpacity onPress={() => {
            handleChange('image', faker.image.url())
          }}>
            <Text>Add stock photo</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event location"
            value={eventDetails.location}
            onChangeText={(text) => {
              handleChange("location", text);
            }}
            multiline
            numberOfLines={4}
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

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/Home")}
          >
            <Text style={styles.backButtonText}>Back</Text>
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
  backButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 50,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
