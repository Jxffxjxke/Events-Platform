import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

interface Event {
  title: string;
  description: string;
  date: string;
  doorsopen: string;
  doorsclose: string;
  image: string;
}

const EventCard = ({ event }: { event: Event }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={[styles.title, styles.mv]}>{event.title}</Text>

        <Text style={styles.mv}>{formatDate(event.date)}</Text>

        <Text style={styles.mv}>
          {event.doorsopen} - {event.doorsclose}
        </Text>

        <TouchableOpacity style={styles.infoButton} onPress={openModal}>
          <Text style={styles.infoText}>i</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Event Description</Text>
            <Text>{event.description}</Text>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoButton: {
    position: "absolute",
    top: "50%",
    right: 10,
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: "white",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  mv: { marginVertical: 5 },
});

export default EventCard;
