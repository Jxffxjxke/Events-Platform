import { Card, Title } from "react-native-paper";
import type { Event } from "./EventsList";
import { Text } from "react-native";
import { formatDate } from "@/utils/formatDate";

const EventCard = ({ event }: { event: Event }) => {
  const date = formatDate(event.date.slice(0, 10));

  return (
    <Card>
      <Card.Cover source={{ uri: event.xlargeimageurl }} />
      <Card.Content>
        <Title>{event.eventname}</Title>
        <Text>{date}</Text>
        <Text>
          {event.doorsopen} - {event.doorsclose}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
