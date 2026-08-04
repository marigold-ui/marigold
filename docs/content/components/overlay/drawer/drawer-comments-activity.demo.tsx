import {
  Badge,
  Button,
  Card,
  Drawer,
  Headline,
  Inline,
  Stack,
  Text,
  TextField,
} from '@marigold/components';
import type { DrawerProps } from '@marigold/components';

export default function (props: DrawerProps) {
  return (
    <Card>
      <Card.Content>
        <Stack space="regular">
          <Stack space="regular">
            <Inline space="related" alignY="center">
              <Headline level={3}>Ticket #4521 – Login issue</Headline>
              <Badge variant="warning">High priority</Badge>
            </Inline>
            <Text>
              User reports being unable to log in after the latest update.
              Error: <em>"Invalid session token."</em>
            </Text>
            <Text>
              Assigned to <strong>Jane Doe</strong> · Updated 2 hours ago
            </Text>
          </Stack>

          <Inline>
            <Drawer.Trigger>
              <Button variant="secondary">View activity (3)</Button>
              <Drawer {...props} size="medium">
                <Drawer.Title>Activity · Ticket #4521</Drawer.Title>
                <Drawer.Content>
                  <Stack space="group">
                    <Stack space="tight">
                      <Inline space="related" alignY="center">
                        <Text weight="bold">Jane Doe</Text>
                        <Text>changed status to Open</Text>
                      </Inline>
                      <Text>2 hours ago</Text>
                    </Stack>

                    <Stack space="tight">
                      <Inline space="related" alignY="center">
                        <Text weight="bold">Sam Müller</Text>
                        <Text>commented</Text>
                      </Inline>
                      <Text>
                        Customer reset their password but is still locked out.
                        Asked them to clear cookies and try again.
                      </Text>
                      <Text>4 hours ago</Text>
                    </Stack>

                    <Stack space="tight">
                      <Inline space="related" alignY="center">
                        <Text weight="bold">Jane Doe</Text>
                        <Text>assigned to Sam Müller</Text>
                      </Inline>
                      <Text>Yesterday</Text>
                    </Stack>

                    <TextField
                      label="Add a comment"
                      placeholder="Write a reply…"
                    />
                  </Stack>
                </Drawer.Content>
                <Drawer.Actions>
                  <Button slot="close">Close</Button>
                  <Button slot="close" variant="primary">
                    Post comment
                  </Button>
                </Drawer.Actions>
              </Drawer>
            </Drawer.Trigger>
          </Inline>
        </Stack>
      </Card.Content>
    </Card>
  );
}
