import { Button, Drawer, Stack, Text, Title } from '@marigold/components';

export default () => (
  <Drawer.Trigger>
    <Button>Open Drawer</Button>
    <Drawer size="small">
      <Title>Notifications</Title>
      <Drawer.Content>
        <Stack space={4}>
          <Text>You have no new notifications.</Text>
        </Stack>
      </Drawer.Content>
    </Drawer>
  </Drawer.Trigger>
);
