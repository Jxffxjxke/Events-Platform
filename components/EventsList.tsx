import { FlatList } from "react-native";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { getEventsList } from "@/utils/getEventsList";
import { Event } from "@/types/Event";

const EventsList = () => {
  const [eventsArray, setEventsArray] = useState<Event[]>([]);

  useEffect(() => {
    getEventsList().then(( results ) => {
      setEventsArray(results);
    });
  }, []);

  return (
    <>
      <FlatList
        data={eventsArray}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
    </>
  );
};

export default EventsList;
