import {
  Dialog,
  Button,
  Headline,
  Stack,
  TextField,
  Inline,
} from '@marigold/components';

export const DialogFormDemo = () => (
  <Dialog.Trigger>
    <Button variant="primary">Login</Button>
    <Dialog>
      {({ close }) => (
        <>
          <Headline level="2">Please log into account</Headline>
          <Stack space="small">
            <TextField label="Username" />
            <TextField label="Password" type="password" />
            <Inline space="medium">
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
