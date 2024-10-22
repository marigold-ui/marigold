import type { DialogProps } from '@marigold/components';
import { Button, Dialog, Text } from '@marigold/components';

export default (props: DialogProps) => (
  <Dialog.Trigger>
    <Button variant="primary">Open me</Button>
    <Dialog closeButton {...props}>
      <Dialog.Title level={3}>Information!</Dialog.Title>
      <Dialog.Content>
        <Text>This is a simple info Dialog.</Text>
      </Dialog.Content>
    </Dialog>
  </Dialog.Trigger>
);
