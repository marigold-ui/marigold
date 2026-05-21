import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Text,
} from '@marigold/components';

export default () => (
  <Card>
    <Card.Header>
      <Inline space="related">
        <Headline level={3}>Pro plan</Headline>
        <Badge variant="success">Current</Badge>
      </Inline>
    </Card.Header>
    <Card.Body>
      <Text variant="muted">
        Unlimited events, custom branding, and priority support. Renews on June
        1, 2026.
      </Text>
    </Card.Body>
    <Card.Footer>
      <Inline space="related">
        <Button variant="ghost" size="small">
          Manage plan
        </Button>
      </Inline>
    </Card.Footer>
  </Card>
);
