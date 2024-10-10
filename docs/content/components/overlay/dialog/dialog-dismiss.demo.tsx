import { Button, Dialog, Text } from '@marigold/components';

export default () => (
  <Dialog.Trigger dismissable={false}>
    <Button variant="primary">Open me</Button>
    <Dialog closeButton>
      <Dialog.Title level={3}>Information!</Dialog.Title>
      <Dialog.Content>
        <Text>This is a simple info Dialog.</Text>
      </Dialog.Content>
    </Dialog>
  </Dialog.Trigger>
);
