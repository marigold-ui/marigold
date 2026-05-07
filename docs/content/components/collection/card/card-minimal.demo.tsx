import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Text,
} from '@marigold/components';

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <div className="mx-auto max-w-sm">
      <Card>
        <Card.Header>
          <Inline space={2}>
            <Headline level={3}>Pro plan</Headline>
            <Badge variant="success">Current</Badge>
          </Inline>
        </Card.Header>
        <Card.Body>
          <Text variant="muted">
            Unlimited events, custom branding, and priority support. Renews on
            June 1, 2026.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Inline space={2}>
            <Button variant="primary" size="small">
              Manage plan
            </Button>
            <Button variant="ghost" size="small">
              View invoice
            </Button>
          </Inline>
        </Card.Footer>
      </Card>
    </div>
  </div>
);
