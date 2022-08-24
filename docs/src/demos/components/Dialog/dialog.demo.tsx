import { Button, Dialog, Headline, Text } from '@marigold/components';

export const DialogDemo = () => (
  <Dialog.Trigger>
    <Button variant="primary">Open me</Button>
    <Dialog closeButton>
      <Headline level="3">Information!</Headline>
      <Text>This is a simple info Dialog.</Text>
    </Dialog>
  </Dialog.Trigger>
);
