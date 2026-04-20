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
  <div className="bg-bg-surface rounded-xl p-6">
    <Card>
      <Card.Preview>
        <div className="bg-bg-surface-raised h-40 w-full" />
      </Card.Preview>
      <Card.Header>
        <Stack space={1}>
          <Headline level={3}>Annual Conference 2025</Headline>
          <Inline space={2}>
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
        <Inline space={2}>
          <Button variant="primary" size="small">
            Get tickets
          </Button>
          <Button variant="ghost" size="small">
            Learn more
          </Button>
        </Inline>
      </Card.Footer>
    </Card>
  </div>
);
