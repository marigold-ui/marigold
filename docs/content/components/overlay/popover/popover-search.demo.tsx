import { useState } from 'react';
import {
  Button,
  ListView,
  Popover,
  Stack,
  Text,
  Title,
} from '@marigold/components';
import { UserPlus } from '@marigold/icons';

const people = [
  { id: 'jane', name: 'Jane Doe' },
  { id: 'john', name: 'John Smith' },
  { id: 'priya', name: 'Priya Natarajan' },
  { id: 'lukas', name: 'Lukas Weber' },
];

export default () => {
  const [assignee, setAssignee] = useState<string>();

  return (
    <Stack space={2} alignX="left">
      <Popover>
        <Button>
          <UserPlus /> Assign to
        </Button>
        <Popover.Content>
          <Title>Assign to</Title>
          <Popover.Search aria-label="Search people" placeholder="Search…">
            <ListView
              aria-label="People"
              items={people}
              selectionMode="single"
              onSelectionChange={keys =>
                setAssignee(
                  keys === 'all'
                    ? undefined
                    : people.find(person => keys.has(person.id))?.name
                )
              }
            >
              {(person: (typeof people)[number]) => (
                <ListView.Item id={person.id} textValue={person.name}>
                  {person.name}
                </ListView.Item>
              )}
            </ListView>
          </Popover.Search>
        </Popover.Content>
      </Popover>
      <Text>Assigned to: {assignee ?? 'nobody'}</Text>
    </Stack>
  );
};
