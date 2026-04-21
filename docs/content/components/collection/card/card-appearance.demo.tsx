import { venueTypes, venues } from '@/lib/data/venues';
import {
  Badge,
  Card,
  type CardProps,
  Headline,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

const venue = venues[5];

export default (props: CardProps) => (
  <Card {...props}>
    <Card.Header>
      <Stack space={1}>
        <Headline level={3}>{venue.name}</Headline>
        <Inline space={2}>
          <Badge variant="info">{venueTypes[venue.type]}</Badge>
          <Badge variant="success">Capacity: {venue.capacity}</Badge>
        </Inline>
      </Stack>
    </Card.Header>
    <Card.Body>
      <Text variant="muted">{venue.description}</Text>
    </Card.Body>
    <Card.Footer>
      <Inline space={4}>
        <Text size="sm" weight="bold">
          {venue.city}, {venue.country}
        </Text>
        <Text size="sm" variant="muted">
          ${venue.price.from.toLocaleString()} &ndash; $
          {venue.price.to.toLocaleString()}
        </Text>
      </Inline>
    </Card.Footer>
  </Card>
);
