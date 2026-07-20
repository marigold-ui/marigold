'use client';

import { useState } from 'react';
import {
  Button,
  EmptyState,
  Inline,
  Panel,
  Table,
  Text,
} from '@marigold/components';
import { PickVenuesDialog } from './PickVenuesDialog';
import { venues } from './venues';

export const ReportVenues = () => {
  // The report starts empty; picking builds the committed set, which then lives
  // on the report for the session and can be re-opened to edit.
  const [venueIds, setVenueIds] = useState<string[]>([]);
  const chosen = venues.filter(venue => venueIds.includes(venue.id));

  return (
    <Panel aria-label="Report venues">
      <Panel.Content>
        <Inline space="related" alignY="center" alignX="between">
          <Text fontSize="lg" weight="bold">
            Venues ({chosen.length})
          </Text>
          <PickVenuesDialog
            trigger={chosen.length ? 'Edit venues' : 'Add venues'}
            title="Select venues for the report"
            confirmLabel="Save"
            initial={venueIds}
            onConfirm={setVenueIds}
          />
        </Inline>
      </Panel.Content>
      {chosen.length === 0 ? (
        <Panel.Content>
          <EmptyState
            title="No venues yet"
            description="Add venues to build this report. Your selection stays here and can be edited anytime."
          />
        </Panel.Content>
      ) : (
        <Panel.Content bleed>
          <Table aria-label="Report venues">
            <Table.Header>
              <Table.Column rowHeader>Venue</Table.Column>
              <Table.Column>City</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Capacity</Table.Column>
            </Table.Header>
            <Table.Body items={chosen}>
              {venue => (
                <Table.Row id={venue.id}>
                  <Table.Cell>{venue.name}</Table.Cell>
                  <Table.Cell>{venue.city}</Table.Cell>
                  <Table.Cell>{venue.type}</Table.Cell>
                  <Table.Cell>{venue.capacity}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Panel.Content>
      )}
    </Panel>
  );
};
