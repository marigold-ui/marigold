'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Description,
  EmptyState,
  NumericFormat,
  Panel,
  Scrollable,
  Table,
  Title,
  VisuallyHidden,
} from '@marigold/components';
import { X } from '@marigold/icons';
import { PickVenuesDialog } from './PickVenuesDialog';
import { reportColumnWidths, statusVariant, venues } from './venues';

const dialogTitle = 'Select venues for the report';

export const ReportVenues = () => {
  // The report starts empty. Picking builds the committed set, which then
  // lives on the report for the session and can be re-opened to edit.
  const [venueIds, setVenueIds] = useState<string[]>([]);
  const chosen = venues.filter(venue => venueIds.includes(venue.id));

  const remove = (id: string) =>
    setVenueIds(ids => ids.filter(venueId => venueId !== id));

  const capacity = chosen.reduce((sum, venue) => sum + venue.capacity, 0);
  const upcoming = chosen.reduce((sum, venue) => sum + venue.events, 0);

  return (
    <Panel>
      <Panel.Header>
        <Title>Venues</Title>
        <Description>
          {chosen.length === 0 ? (
            'No venues in this report yet.'
          ) : (
            <>
              {chosen.length} {chosen.length === 1 ? 'venue' : 'venues'},{' '}
              <NumericFormat value={capacity} /> seats in total
            </>
          )}
        </Description>
        {chosen.length > 0 && (
          <PickVenuesDialog
            trigger="Edit venues"
            variant="secondary"
            title={dialogTitle}
            initial={venueIds}
            onConfirm={setVenueIds}
          />
        )}
      </Panel.Header>
      {chosen.length === 0 ? (
        <Panel.Content>
          <EmptyState
            title="No venues yet"
            description="Add the venues this report covers. You can change them at any time."
            action={
              <PickVenuesDialog
                trigger="Add venues"
                title={dialogTitle}
                initial={venueIds}
                onConfirm={setVenueIds}
              />
            }
          />
        </Panel.Content>
      ) : (
        <Panel.Content bleed>
          <Scrollable>
            <Table aria-label="Report venues">
              <Table.Header>
                <Table.Column
                  rowHeader
                  sticky="start"
                  {...reportColumnWidths.name}
                >
                  Venue
                </Table.Column>
                <Table.Column {...reportColumnWidths.city}>City</Table.Column>
                <Table.Column {...reportColumnWidths.type}>Type</Table.Column>
                <Table.Column alignX="right" {...reportColumnWidths.capacity}>
                  Capacity
                </Table.Column>
                <Table.Column alignX="right" {...reportColumnWidths.upcoming}>
                  Upcoming events
                </Table.Column>
                <Table.Column {...reportColumnWidths.status}>
                  Availability
                </Table.Column>
                <Table.Column alignX="right" {...reportColumnWidths.rate}>
                  Day rate
                </Table.Column>
                <Table.Column sticky="end" {...reportColumnWidths.remove}>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Table.Column>
              </Table.Header>
              <Table.Body items={chosen}>
                {venue => (
                  <Table.Row id={venue.id}>
                    <Table.Cell>{venue.name}</Table.Cell>
                    <Table.Cell>{venue.city}</Table.Cell>
                    <Table.Cell>{venue.type}</Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat value={venue.capacity} />
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
                    <Table.Cell>
                      {/* Removes the venue in place, without reopening the
                          pick. */}
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${venue.name} from report`}
                        onPress={() => remove(venue.id)}
                      >
                        <X aria-hidden="true" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell>Total</Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell alignX="right">
                    <NumericFormat value={capacity} />
                  </Table.Cell>
                  <Table.Cell alignX="right">{upcoming}</Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                </Table.Row>
              </Table.Footer>
            </Table>
          </Scrollable>
        </Panel.Content>
      )}
    </Panel>
  );
};
