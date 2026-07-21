import { Badge, Card, Inline, Stack, Switch, Text } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Card stretch>
      <Card.Content>
        <Inline alignY="center" space={4}>
          <Stack space="tight" stretch>
            <Inline space={2} alignY="center">
              <Text weight="bold">Weekly digest</Text>
              <Badge variant="success">Active</Badge>
            </Inline>
            <Text variant="muted" size="sm">
              A summary of activity from the past week, delivered every Monday.
            </Text>
          </Stack>
          <Switch label="Active" defaultSelected />
        </Inline>
      </Card.Content>
    </Card>
    <Card stretch>
      <Card.Content>
        <Inline alignY="center" space={4}>
          <Stack space="tight" stretch>
            <Text weight="bold">Slack integration</Text>
            <Text variant="muted" size="sm">
              Post updates to your team's Slack channel automatically.
            </Text>
          </Stack>
          <Switch label="Active" />
        </Inline>
      </Card.Content>
    </Card>
  </Stack>
);
