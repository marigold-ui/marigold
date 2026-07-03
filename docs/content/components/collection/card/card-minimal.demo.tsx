import {
  Badge,
  Button,
  Card,
  Description,
  Inline,
  Text,
  Title,
} from '@marigold/components';

export default () => (
  <Card>
    <Card.Header>
      <Title>Pro plan</Title>
      <Description>Renews on June 1, 2026.</Description>
    </Card.Header>
    <Card.Content>
      <Inline space="tight" alignY="center">
        <Badge variant="success">Current</Badge>
        <Text variant="muted">
          Unlimited events, custom branding, and priority support.
        </Text>
      </Inline>
    </Card.Content>
    <Card.Footer>
      <Button variant="ghost" size="small">
        Manage plan
      </Button>
    </Card.Footer>
  </Card>
);
