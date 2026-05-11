'use client';

import {
  Button,
  Headline,
  Inline,
  Inset,
  Panel,
  Stack,
  Text,
} from '@marigold/components';
import { Add } from '@marigold/icons';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesTable } from './venues-table';

const FilterPage = () => (
  <Inset p={4}>
    <Stack space={8}>
      <Inline alignX="between" alignY="top">
        <Stack space={2}>
          <Headline level={2}>Venues</Headline>
          <Text>Browse and filter available venues for your events.</Text>
        </Stack>
        {/* Will be wired up in DST-1288 */}
        <Button disabled>
          <Add /> Add Venue
        </Button>
      </Inline>
      <Panel aria-label="Venues">
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
);

export default FilterPage;
