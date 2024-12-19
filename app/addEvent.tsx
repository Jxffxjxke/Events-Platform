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

export default function AddEvent() {
  const [datePicker, setDatePicker] = useState<boolean>(false);
  const [openingTimePicker, setOpeningTimePicker] = useState<boolean>(false);
  const [closingTimePicker, setClosingTimePicker] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [openingTime, setOpeningTime] = useState<Date>(new Date());
  const [closingTime, setClosingTime] = useState<Date>(new Date());

  const handleAddEvent = () => {
    console.log({
      title,
      description,
      date: date.toDateString(),
      openingTime: openingTime.toLocaleTimeString(),
      closingTime: closingTime.toLocaleTimeString(),
    });
    if (!title || !description) {
      Alert.alert(
        "Validation Error",
        "Please fill out all fields before adding the event."
      );
      return;
    }

    Alert.alert("Event Added", "Your event has been successfully added!");
  };

  return (
    <SafeAreaProvider>
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setDatePicker(true)}
          >
            <Text style={styles.pickerButtonText}>{date.toDateString()}</Text>
          </TouchableOpacity>
          {datePicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display="default"
              onChange={(event, selectedDate) => {
                setDate(selectedDate || date);
                setDatePicker(false);
              }}
            />
          )}

          <Text style={styles.label}>Opening Time</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setOpeningTimePicker(true)}
          >
            <Text style={styles.pickerButtonText}>
              {openingTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {openingTimePicker && (
            <DateTimePicker
              value={openingTime}
              mode={"time"}
              display="default"
              onChange={(event, selectedTime) => {
                setOpeningTime(selectedTime || openingTime);
                setOpeningTimePicker(false);
              }}
            />
          )}

          <Text style={styles.label}>Closing Time</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setClosingTimePicker(true)}
          >
            <Text style={styles.pickerButtonText}>
              {closingTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {closingTimePicker && (
            <DateTimePicker
              value={closingTime}
              mode={"time"}
              display="default"
              onChange={(event, selectedTime) => {
                setClosingTime(selectedTime || closingTime);
                setClosingTimePicker(false);
              }}
            />
          )}

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
  form: {
    width: "100%",
    maxWidth: 400,
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
