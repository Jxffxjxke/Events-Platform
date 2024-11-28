import { Card, Title } from "react-native-paper";

import type { Event } from "./EventsList";
import { Text } from "react-native";

const EventCard = ({ event }: { event: Event }) => {
  console.log(event);

  return (
    <Card>
      <Card.Cover source={{ uri: event.xlargeimageurl }} />
      <Card.Content>
        <Title>{event.eventname}</Title>
        <Text>{event.date}</Text>
        <Text>
          {event.openingtimes.doorsopen} - {event.openingtimes.doorsclose}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
