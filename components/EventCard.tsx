import { Card, Title } from "react-native-paper";
import { Event } from "@/types/Event";
import { Text } from "react-native";
import { formatDate } from "@/utils/formatDate";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card>
      <Card.Cover source={{ uri: event.image }} />
      <Card.Content>
        <Title>{event.title}</Title>
        <Text>{formatDate(event.date)}</Text>
        <Text>
          {event.doorsopen} - {event.doorsclose}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
