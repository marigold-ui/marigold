import { venueTypes, venues } from '@/lib/data/venues';
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
          <Table.Column isRowHeader>Venue</Table.Column>
          <Table.Column>Type</Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.slice(0, 4).map(venue => (
            <Table.Row key={venue.id}>
              <Table.Cell>
                <Text weight="medium">{venue.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="sm" color="muted-foreground">
                  {venueTypes[venue.type]}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
