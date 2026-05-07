import { venues } from '@/lib/data/venues';
import { Card, Headline, Stack, Text, Tiles } from '@marigold/components';

export default () => (
  <Tiles tilesWidth="200px" space={2}>
    {venues.slice(5).map(venue => (
      <Card key={crypto.randomUUID()}>
        <Card.Preview>
          <img src={venue.image} alt={venue.name} width={200} height={200} />
        </Card.Preview>
        <Card.Body>
          <Stack space={2} alignX="center">
            <Headline level={3}>{venue.name}</Headline>
            <Text>{venue.description}</Text>
          </Stack>
        </Card.Body>
      </Card>
    ))}
  </Tiles>
);
