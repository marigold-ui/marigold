import {
  Button,
  Dialog,
  Headline,
  Inline,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Dialog.Trigger>
    <Button variant="primary">Login</Button>
    <Dialog>
      {({ close }) => (
        <>
          <Headline level="2">Please log into account</Headline>
          <Stack space={2}>
            <TextField label="Username" />
            <TextField label="Password" type="password" />
            <Inline space={5}>
              <Button variant="ghost" onPress={close}>
                Cancel
              </Button>
              <Button variant="primary">Login</Button>
            </Inline>
          </Stack>
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);
