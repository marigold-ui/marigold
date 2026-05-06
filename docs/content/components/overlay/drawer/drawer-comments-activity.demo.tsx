import {
  Button,
  Drawer,
  Inline,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Open Activity</Button>
      <Drawer size="medium">
        <Drawer.Title>Activity</Drawer.Title>
        <Drawer.Content>
          <Stack space={6}>
            <Stack space={1}>
              <Inline space={2} alignY="center">
                <Text weight="bold">Jane Doe</Text>
                <Text>changed status to Open</Text>
              </Inline>
              <Text>2 hours ago</Text>
            </Stack>

            <Stack space={1}>
              <Inline space={2} alignY="center">
                <Text weight="bold">Sam Müller</Text>
                <Text>commented</Text>
              </Inline>
              <Text>
                Customer reset their password but is still locked out. Asked
                them to clear cookies and try again.
              </Text>
              <Text>4 hours ago</Text>
            </Stack>

            <Stack space={1}>
              <Inline space={2} alignY="center">
                <Text weight="bold">Jane Doe</Text>
                <Text>assigned to Sam Müller</Text>
              </Inline>
              <Text>Yesterday</Text>
            </Stack>

            <TextField label="Add a comment" placeholder="Write a reply…" />
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
  );
}
