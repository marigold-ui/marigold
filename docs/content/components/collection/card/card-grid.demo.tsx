import { venueTypes, venues } from '@/lib/data/venues';
import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

const featured = [venues[0], venues[3], venues[5]];

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Tiles space={4} tilesWidth="240px" stretch>
      {featured.map(venue => (
        <Card key={venue.id}>
          <Card.Preview>
            <img
              src={venue.image}
              alt={venue.name}
              className="h-40 w-full object-cover"
            />
          </Card.Preview>
          <Card.Header>
            <Stack space={1}>
              <Headline level={3}>{venue.name}</Headline>
              <Inline space={2}>
                <Badge variant="info">{venueTypes[venue.type]}</Badge>
              </Inline>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Text variant="muted">
              {venue.city}, {venue.country} &middot; up to{' '}
              {venue.capacity.toLocaleString()} guests
            </Text>
          </Card.Body>
          <Card.Footer>
            <Inline space={2} alignY="center">
              <Text size="sm" weight="bold">
                ${venue.price.from.toLocaleString()}
              </Text>
              <Button variant="ghost" size="small">
                View details
              </Button>
            </Inline>
          </Card.Footer>
        </Card>
      ))}
    </Tiles>
  </div>
);
