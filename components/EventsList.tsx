import React from "react";
import { FlatList } from "react-native";
import EventCard from "./EventCard";

export type Event = {
  eventname: string;
  date: string;
  description: string;
  xlargeimageurl: string;
  venue: { name: string };
};

const EventsList = () => {

    // replace with events list from API
  const eventsArray: Event[] = [
    {
      eventname: "eventname",
      date: "date",
      description: "description",
      xlargeimageurl: "xlargeimageurl",
      venue: { name: "venuename" },
    },
  ];

  return (
    <>
      <FlatList
        data={eventsArray}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </>
  );
};

export default EventsList;
