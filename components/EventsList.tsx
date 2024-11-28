import { FlatList } from "react-native";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { getEventsList } from "@/utils/getEventsList";

export type URLparams = { latitude: string; longitude: string };

export type Event = {
  eventname: string;
  date: string;
  description: string;
  xlargeimageurl: string;
  venue: { name: string };
};

const EventsList = () => {
  const [eventsArray, setEventsArray] = useState<Event[]>([]);

  useEffect(() => {
    const URLparams = { latitude: "53.4839", longitude: "-2.2446" };
    getEventsList(URLparams).then(({results}) => {
      setEventsArray(results);
      console.log(eventsArray);
      
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
