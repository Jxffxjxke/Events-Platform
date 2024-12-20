import { FlatList, StyleSheet, View } from "react-native";
import { EventDetails } from "@/types/EventDetails";
import MyEventsCard from "./MyEventsCard";

interface MyEventsListProps {
  events: EventDetails[];
}

export default function MyEventsList({ events }: MyEventsListProps) {
  return (
    <View>
      <FlatList
        data={events}
        renderItem={({ item }) => <MyEventsCard event={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
