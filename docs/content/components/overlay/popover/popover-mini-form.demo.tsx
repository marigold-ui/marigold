import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Description,
  Form,
  Inline,
  Popover,
  Stack,
  Text,
  TextArea,
  Title,
} from '@marigold/components';
import { StickyNote } from '@marigold/icons';

export default () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');

  return (
    <Card>
      <Card.Header>
        <Title>Order #48213</Title>
        <Description>Jane Doe · placed 2 hours ago</Description>
      </Card.Header>
      <Card.Content>
        <Stack space="tight">
          <Inline space="related" alignY="center">
            <Badge variant="success">Paid</Badge>
            <Text>2 × Summer Open Air · 98,00 €</Text>
          </Inline>
          {note ? (
            <Inline space="related" alignY="center">
              <StickyNote size={16} />
              <Text variant="muted">{note}</Text>
            </Inline>
          ) : null}
        </Stack>
      </Card.Content>
      <Card.Footer>
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
                  setNote(
                    String(new FormData(event.currentTarget).get('note'))
                  );
                  setOpen(false);
                }}
              >
                <Stack space="regular" alignX="left">
                  <TextArea
                    label="Note"
                    name="note"
                    rows={3}
                    defaultValue={note}
                  />
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
      </Card.Footer>
    </Card>
  );
};
