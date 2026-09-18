import { venueTypes, venues } from '@/lib/data/venues';
import {
  Badge,
  Card,
  type CardProps,
  Description,
  Inline,
  NumericFormat,
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
          <NumericFormat
            style="currency"
            currency="USD"
            maximumFractionDigits={0}
            value={[venue.price.from, venue.price.to]}
          />
        </Text>
      </Inline>
    </Card.Footer>
  </Card>
);
