import { venueTypes, venues } from '@/lib/data/venues';
import {
  Badge,
  Card,
  type CardProps,
  Description,
  Inline,
  Stack,
  Text,
  Title,
} from '@marigold/components';

const venue = venues[5];

export default (props: CardProps) => (
  <Card {...props}>
    <Card.Header>
      <Title>{venue.name}</Title>
      <Description>
        {venue.city}, {venue.country}
      </Description>
    </Card.Header>
    <Card.Content>
      <Stack space="tight">
        <Inline space="related">
          <Badge variant="info">{venueTypes[venue.type]}</Badge>
          <Badge variant="success">Capacity: {venue.capacity}</Badge>
        </Inline>
        <Text variant="muted">{venue.description}</Text>
      </Stack>
    </Card.Content>
    <Card.Footer>
      <Inline space="regular">
        <Text size="sm" variant="muted">
          ${venue.price.from.toLocaleString()} &ndash; $
          {venue.price.to.toLocaleString()}
        </Text>
      </Inline>
    </Card.Footer>
  </Card>
);
