import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <Card>
    <Card.Media>
      <img
        src="https://images.pexels.com/photos/8761744/pexels-photo-8761744.jpeg"
        alt="Annual Conference 2025"
        className="h-60 w-full"
      />
    </Card.Media>
    <Card.Header>
      <Stack space="tight">
        <Headline level={3}>Annual Conference 2025</Headline>
        <Inline space="related">
          <Badge variant="info">Music</Badge>
          <Badge variant="success">Tickets available</Badge>
        </Inline>
      </Stack>
    </Card.Header>
    <Card.Body>
      <Text variant="muted">
        Join us for a day of inspiring talks, workshops, and networking at our
        flagship annual event.
      </Text>
    </Card.Body>
    <Card.Footer>
      <Inline space="related">
        <Button variant="ghost" size="small">
          Get tickets
        </Button>
      </Inline>
    </Card.Footer>
  </Card>
);
