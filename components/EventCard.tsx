import { Card, Title } from "react-native-paper";

import type { Event } from "./EventsList";

const EventCard = ({ event }: { event: Event }) => (
  <Card>
    <Card.Cover source={{ uri: event.xlargeimageurl }} />
    <Card.Title title={event.eventname} subtitle={event.date} />
    <Card.Content>
      <Title>{event.venue.name}</Title>
    </Card.Content>
  </Card>
);

export default EventCard;
