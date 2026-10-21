import { useState } from 'react';
import {
  Button,
  Description,
  Form,
  Inline,
  Popover,
  Stack,
  TextArea,
  Title,
} from '@marigold/components';
import { StickyNote } from '@marigold/icons';

export default () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');

  return (
    <Popover.Trigger open={open} onOpenChange={setOpen}>
      <Button>
        <StickyNote /> {note ? 'Edit note' : 'Add note'}
      </Button>
      <Popover>
        <Title>Order note</Title>
        <Description>Only your team sees this note.</Description>
        <Popover.Content>
          <Form
            onSubmit={event => {
              event.preventDefault();
              setNote(String(new FormData(event.currentTarget).get('note')));
              setOpen(false);
            }}
          >
            <Stack space="regular" alignX="left">
              <TextArea label="Note" name="note" rows={3} defaultValue={note} />
              <Inline space="related">
                <Button type="submit" variant="primary">
                  Save note
                </Button>
                <Button slot="close">Cancel</Button>
              </Inline>
            </Stack>
          </Form>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  );
};
