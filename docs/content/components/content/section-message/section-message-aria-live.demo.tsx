import { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  SectionMessage,
  Stack,
} from '@marigold/components';

const drafts = [
  { id: 'q4-launch', label: 'Q4 launch announcement' },
  { id: 'pricing', label: 'Updated pricing page copy' },
  { id: 'team-intro', label: 'Welcome new team members' },
  { id: 'roadmap', label: 'Public roadmap update' },
];

export default () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [archived, setArchived] = useState<{
    count: number;
    attempt: number;
  } | null>(null);

  return (
    <Form
      unstyled
      onSubmit={event => {
        event.preventDefault();
        setArchived(prev => ({
          count: selected.length,
          attempt: (prev?.attempt ?? 0) + 1,
        }));
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
            <Checkbox key={d.id} value={d.id} label={d.label} />
          ))}
        </Checkbox.Group>
        <Button type="submit" variant="primary">
          Archive selected
        </Button>
        {archived && (
          <SectionMessage key={archived.attempt} variant="success" announce>
            <SectionMessage.Title>
              {archived.count === 1 ? 'Draft archived' : 'Drafts archived'}
            </SectionMessage.Title>
            <SectionMessage.Content>
              Moved {archived.count} {archived.count === 1 ? 'draft' : 'drafts'}{' '}
              to the archive. They can be restored from the trash for the next
              30 days.
            </SectionMessage.Content>
          </SectionMessage>
        )}
      </Stack>
    </Form>
  );
};
