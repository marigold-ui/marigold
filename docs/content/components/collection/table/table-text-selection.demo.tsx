import { people } from '@/lib/data/people';
import { useState } from 'react';
import { Stack, Switch, Table, Text } from '@marigold/components';

export default () => {
  const [allowTextSelection, setAllowTextSelection] = useState(false);

  return (
    <Stack space={3}>
      <Switch
        label="Allow text selection"
        selected={allowTextSelection}
        onChange={setAllowTextSelection}
      />

      <Table
        key={String(allowTextSelection)}
        aria-label="Table with text selection"
        selectionMode="multiple"
        allowTextSelection={allowTextSelection}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Position</Table.Column>
        </Table.Header>
        <Table.Body>
          {people.slice(0, 4).map(person => (
            <Table.Row key={person.id}>
              <Table.Cell>
                <Text weight="medium">{person.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="sm" color="muted-foreground">
                  {person.position}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
