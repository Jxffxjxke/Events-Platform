import { FlatList } from "react-native";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { getEventsList } from "@/utils/getEventsList";

export type Event = {
  eventname: string;
  date: string;
  description: string;
  xlargeimageurl: string;
  venue: { name: string };
  openingtimes: { doorsclose: string; doorsopen: string; lastentry: string };
};

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
        keyExtractor={(item, index) => `${item.eventname}-${index}`}
      />
    </>
  );
};

export default EventsList;
