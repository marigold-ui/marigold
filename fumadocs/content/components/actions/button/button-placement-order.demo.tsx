import {
  Button,
  Dialog,
  Form,
  Headline,
  Inline,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Form>
    <Stack space={5}>
      <Headline level={3}>Left aligned buttons</Headline>
      <TextField label="Name" />
      <TextField label="Email" type="email" />

      {/* Left-aligned form actions */}
      <Inline space={5} alignY="center" alignX="left">
        <Button variant="primary">Update</Button>
        <Dialog.Trigger>
          <Button>Open dialog</Button>
          <Dialog size="xsmall">
            <Dialog.Title>Right aligned buttons</Dialog.Title>
            <Dialog.Content>
              <Stack space={3}>
                <TextField label="Old password" type="password" autoFocus />
                <TextField label="New password" type="password" />
              </Stack>
            </Dialog.Content>
            <Dialog.Actions>
              <Button variant="ghost" slot="close">
                Cancel
              </Button>
              <Button variant="secondary">Save and exit</Button>
              <Button variant="primary">Update</Button>
            </Dialog.Actions>
          </Dialog>
        </Dialog.Trigger>
        <Button variant="ghost">Cancel</Button>
      </Inline>
    </Stack>
  </Form>
);
