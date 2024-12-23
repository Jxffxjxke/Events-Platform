import { EventDetails } from "@/types/EventDetails";
import { formatDate } from "@/utils/formatDate";
import handleDelete from "@/utils/handleDelete";
import { Icon } from "@rneui/themed";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

interface MyEventsCardProps {
  event: EventDetails;
}

export function MyEventsCard({ event }: MyEventsCardProps) {
  const formattedDate =
    typeof event.date === "string" ? event.date : event.date.toLocaleString();

  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{formatDate(formattedDate)}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.binIcon}
        onPress={() => {
          if(!event.id){throw new Error('Error finding event')}
         handleDelete(event.id);
        }}
      >
        <Icon name="delete" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: width - 32,
    minWidth: width - 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#888",
  },
  binIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 20,
    height: 20,
    tintColor: "#888",
  },
});

export default MyEventsCard;
