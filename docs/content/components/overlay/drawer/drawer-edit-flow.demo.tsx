import { Button, Drawer, Stack, Switch, TextField } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Settings</Button>
      <Drawer>
        <Drawer.Title>Settings</Drawer.Title>
        <Drawer.Content>
          <Stack space={3}>
            <TextField label="Display Name" placeholder="Enter your name" />
            <TextField label="Email" placeholder="user@example.com" />
            <Switch label="Enable Notifications" />
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="primary">
            Save Changes
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
