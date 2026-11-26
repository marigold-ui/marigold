import { useState } from 'react';
import {
  Button,
  Drawer,
  Stack,
  TextField,
  useConfirmation,
} from '@marigold/components';

const saved = { name: 'Summer concert', venue: 'Open-air stage' };

export default () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(saved);
  const dirty = values.name !== saved.name || values.venue !== saved.venue;
  const confirm = useConfirmation();

  // The explicit close path: the close button and "Cancel".
  const close = async () => {
    if (dirty) {
      const result = await confirm({
        variant: 'destructive',
        title: 'Discard changes?',
        content: 'Your changes to this event will be lost.',
        confirmationLabel: 'Discard',
      });
      if (result !== 'confirmed') return;
    }
    setValues(saved);
    setOpen(false);
  };

  return (
    <>
      <Button onPress={() => setOpen(true)}>Edit event</Button>
      <Drawer
        open={open}
        onOpenChange={next => (next ? setOpen(true) : close())}
        // Off while dirty: Escape, a swipe or a press outside would lose
        // the changes without asking.
        keyboardDismissable={!dirty}
        closeButton
      >
        <Drawer.Title>Edit event</Drawer.Title>
        <Drawer.Content>
          <Stack space={4}>
            <TextField
              label="Name"
              value={values.name}
              onChange={name => setValues(v => ({ ...v, name }))}
            />
            <TextField
              label="Venue"
              value={values.venue}
              onChange={venue => setValues(v => ({ ...v, venue }))}
            />
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button onPress={close}>Cancel</Button>
          <Button variant="primary" onPress={() => setOpen(false)}>
            Save
          </Button>
        </Drawer.Actions>
      </Drawer>
    </>
  );
};
