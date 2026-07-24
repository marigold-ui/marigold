import { Button, Dialog, Title } from '@marigold/components';

export default () => (
  <Dialog.Trigger>
    <Button variant="primary">Open</Button>
    <Dialog size="xsmall" closeButton>
      <Title>Session expiring</Title>
      <Dialog.Content>
        Your session will expire in 5 minutes. Save your work to avoid losing
        changes.
      </Dialog.Content>
      <Dialog.Actions>
        <Button slot="close">Dismiss</Button>
        <Button variant="primary" slot="close">
          Stay signed in
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
