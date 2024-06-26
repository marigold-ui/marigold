import {
  Button,
  Dialog,
  Headline,
  Inline,
  Stack,
  Text,
} from '@marigold/components';
import { Exclamation } from '@marigold/icons';

export default () => (
  <Dialog>
    <Stack space={2}>
      <Inline alignY="center" space={2}>
        <Exclamation color="text-warning" />
        <Headline level={3}>This page has unsaved changes!</Headline>
      </Inline>
      <Text>
        If you leave this page now, your changes will be lost. Would you like to
        save your changes first?.
      </Text>
      <Inline alignX="right">
        <Button variant="text">Leave without saving</Button>
        <Button variant="primary">Save and leave page</Button>
      </Inline>
    </Stack>
  </Dialog>
);
