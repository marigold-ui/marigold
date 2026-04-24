'use client';

import { Button, Inset, Panel, Stack } from '@marigold/components';
import { Add } from '@marigold/icons';
import { AppliedFilter } from './applied-filter';
import { QueryProvider } from './query-provider';
import { Toolbar } from './toolbar';
import { VenuesTable } from './venues-table';

const DataManagementPage = () => (
  <QueryProvider>
    <Inset space={4}>
      <Stack space={8}>
        <Panel aria-label="Venues">
          <Panel.Header>
            <Panel.Title>Venues</Panel.Title>
            <Panel.Description>
              Browse, filter, and manage all venues available for your events.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button
                variant="primary"
                onPress={() => {
                  /* TODO: open Add Venue dialog (DST-1288) */
                }}
              >
                <Add /> Add Venue
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <Toolbar />
              <AppliedFilter />
            </Stack>
          </Panel.Content>
          <Panel.Content bleed>
            <VenuesTable />
          </Panel.Content>
        </Panel>
      </Stack>
    </Inset>
  </QueryProvider>
);

export default DataManagementPage;
