'use client';

import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Stack,
  Switch,
  Text,
  TextField,
} from '@marigold/components';

export const CoOrganizers = () => (
  <Card variant="master" p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Inline space={2} alignY="center">
          <Headline level={3}>Co-organizers</Headline>
          <Badge variant="master">Master</Badge>
        </Inline>
        <Text>
          Add co-organizers to share event management responsibilities.
        </Text>
      </Stack>
      <Stack space="regular">
        <Switch label="This event has co-organizers" />
        <Inline space="related" noWrap>
          <TextField label="Name" width="1/2" />
          <TextField label="Email" type="email" width="1/2" />
        </Inline>
        <TextField
          label="Role"
          description="Their responsibility for this event."
        />
        <Button variant="secondary">Add another co-organizer</Button>
      </Stack>
    </Stack>
  </Card>
);
