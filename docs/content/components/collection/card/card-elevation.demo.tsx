import {
  Badge,
  Button,
  Card,
  Description,
  Inline,
  Stack,
  Text,
  Title,
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
      <Title>Annual Conference 2025</Title>
      <Description>Our flagship annual event.</Description>
    </Card.Header>
    <Card.Content>
      <Stack space="tight">
        <Inline space="related">
          <Badge variant="info">Music</Badge>
          <Badge variant="success">Tickets available</Badge>
        </Inline>
        <Text variant="muted">
          Join us for a day of inspiring talks, workshops, and networking.
        </Text>
      </Stack>
    </Card.Content>
    <Card.Footer>
      <Button variant="ghost" size="small">
        Get tickets
      </Button>
    </Card.Footer>
  </Card>
);
