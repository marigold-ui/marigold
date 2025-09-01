import { Button, Dialog, Headline, Inline } from '@marigold/components';
import { Exclamation } from '@marigold/icons';

export default () => (
  <Dialog.Trigger>
    <Button>Exit</Button>
    <Dialog>
      <Dialog.Title>
        <Inline alignY="center" space={2}>
          <Exclamation color="text-warning" />
          <Headline level={3}>This page has unsaved changes</Headline>
        </Inline>
      </Dialog.Title>
      <Dialog.Content>
        If you leave this page now, your changes will be lost. Would you like to
        save your changes first?
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="ghost" slot="close">
          Leave without saving
        </Button>
        <Button variant="primary" slot="close">
          Save and leave page
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
