'use client';

import { useState } from 'react';
import {
  Badge,
  EmptyState,
  Inline,
  NumericFormat,
  Panel,
  Scrollable,
  Table,
  Text,
} from '@marigold/components';
import { PickVenuesDialog } from './PickVenuesDialog';
import { statusVariant, venueColumnWidths, venues } from './venues';

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
          <Scrollable>
            <Table aria-label="Report venues">
              <Table.Header>
                <Table.Column rowHeader {...venueColumnWidths.name}>
                  Venue
                </Table.Column>
                <Table.Column {...venueColumnWidths.city}>City</Table.Column>
                <Table.Column {...venueColumnWidths.country}>
                  Country
                </Table.Column>
                <Table.Column {...venueColumnWidths.type}>Type</Table.Column>
                <Table.Column alignX="right" {...venueColumnWidths.capacity}>
                  Capacity
                </Table.Column>
                <Table.Column alignX="right" {...venueColumnWidths.rating}>
                  Rating
                </Table.Column>
                <Table.Column alignX="right" {...venueColumnWidths.upcoming}>
                  Upcoming
                </Table.Column>
                <Table.Column {...venueColumnWidths.status}>
                  Availability
                </Table.Column>
                <Table.Column alignX="right" {...venueColumnWidths.rate}>
                  Day rate
                </Table.Column>
              </Table.Header>
              <Table.Body items={chosen}>
                {venue => (
                  <Table.Row id={venue.id}>
                    <Table.Cell>{venue.name}</Table.Cell>
                    <Table.Cell>{venue.city}</Table.Cell>
                    <Table.Cell>{venue.country}</Table.Cell>
                    <Table.Cell>{venue.type}</Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat value={venue.capacity} />
                    </Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat
                        value={venue.rating}
                        minimumFractionDigits={1}
                      />
                    </Table.Cell>
                    <Table.Cell alignX="right">{venue.events}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={statusVariant[venue.status]}>
                        {venue.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat
                        style="currency"
                        currency="EUR"
                        value={venue.rate}
                        maximumFractionDigits={0}
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Scrollable>
        </Panel.Content>
      )}
    </Panel>
  );
};
