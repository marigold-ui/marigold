import { venueTypes, venues } from '@/lib/data/venues';
import {
  Badge,
  Card,
  Description,
  Inline,
  Stack,
  Text,
  Tiles,
  Title,
} from '@marigold/components';

const featured = venues.slice(0, 3);

export default () => (
  <Tiles space="regular" tilesWidth="240px" stretch>
    {featured.map(venue => (
      <Card key={venue.id}>
        <Card.Media>
          <img
            src={venue.image}
            alt={venue.name}
            className="h-40 w-full object-cover"
          />
        </Card.Media>
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
            </Inline>
            <Text variant="muted">
              Up to {venue.capacity.toLocaleString()} guests
            </Text>
          </Stack>
        </Card.Content>
        <Card.Footer>
          <Inline space="related" alignY="center">
            <Text size="sm" weight="bold">
              ${venue.price.from.toLocaleString()}
            </Text>
          </Inline>
        </Card.Footer>
      </Card>
    ))}
  </Tiles>
);
