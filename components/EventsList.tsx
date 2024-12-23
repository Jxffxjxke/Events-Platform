import { FlatList, View, ViewStyle, StyleProp } from "react-native";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { getEventsList } from "@/utils/getEventsList";
import { Event } from "@/types/Event";

interface EventsListProps {
  style?: StyleProp<ViewStyle>;
}

const EventsList: React.FC<EventsListProps> = ({ style }) => {
  const [eventsArray, setEventsArray] = useState<Event[]>([]);

  useEffect(() => {
    getEventsList().then((results) => {
      setEventsArray(results);
    });
  }, []);

  return (
    <View style={style}>
      <FlatList
        data={eventsArray}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
    </View>
  );
};

export default EventsList;
