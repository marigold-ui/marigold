import { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  SectionMessage,
  Stack,
} from '@marigold/components';

const drafts = [
  'Q4 launch announcement',
  'Updated pricing page copy',
  'Welcome new team members',
  'Public roadmap update',
];

export default () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [attempt, setAttempt] = useState(0);

  return (
    <Form
      unstyled
      onSubmit={event => {
        event.preventDefault();
        setCount(selected.length);
        setAttempt(a => a + 1);
        setSelected([]);
      }}
    >
      <Stack space={4} alignX="left">
        <Checkbox.Group
          label="Drafts"
          value={selected}
          onChange={setSelected}
          validate={value =>
            value.length === 0 ? 'Select at least one draft to archive.' : null
          }
        >
          {drafts.map(d => (
            <Checkbox key={d} value={d} label={d} />
          ))}
        </Checkbox.Group>
        <Button type="submit" variant="primary">
          Archive selected
        </Button>
        {attempt > 0 && (
          <SectionMessage key={attempt} variant="success" announce>
            <SectionMessage.Title>
              {count === 1 ? 'Draft archived' : 'Drafts archived'}
            </SectionMessage.Title>
            <SectionMessage.Content>
              Moved {count} {count === 1 ? 'draft' : 'drafts'} to the archive.
              They can be restored from the trash for the next 30 days.
            </SectionMessage.Content>
          </SectionMessage>
        )}
      </Stack>
    </Form>
  );
};
