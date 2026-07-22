import {
  Button,
  Checkbox,
  Drawer,
  Inline,
  NumberField,
  SearchField,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Text,
} from '@marigold/components';
import { ListFilter } from '@marigold/icons';

// The panel is canonical: the quick filters in the bar are shortcuts to
// filters that still live here, so "All filters" opens the complete set. Kept
// compact for the demo; see /examples/filter for the full grouped panel.
const AllFiltersPanel = () => (
  <Drawer.Trigger>
    <Button>
      <ListFilter /> All filters
    </Button>
    <Drawer closeButton>
      <Drawer.Title>All filters</Drawer.Title>
      <Drawer.Content>
        <Stack space="group">
          <Checkbox.Group label="Category">
            <Checkbox value="concerts" label="Concerts" />
            <Checkbox value="festivals" label="Festivals" />
            <Checkbox value="theater" label="Theater" />
          </Checkbox.Group>
          <NumberField
            label="Min. capacity"
            defaultValue={0}
            minValue={0}
            step={100}
          />
          <Slider
            label="Max. price"
            defaultValue={5000}
            step={100}
            maxValue={5000}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
            }}
          />
        </Stack>
      </Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Close</Button>
        <Button variant="primary" slot="close">
          Apply
        </Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

export default () => (
  <Inline space="related" alignX="between" alignY="input">
    {/* One row: scope switch first, set apart from the field cluster (search, */}
    {/* quick filters, panel trigger) by a larger "group" gap. */}
    <Inline space="group" alignY="input">
      {/* Scope switch, not a filter: it re-bases which events the bar filters */}
      {/* within, so it leads the row. "fit" keeps it to its track width. */}
      {/* [!code highlight] */}
      <SegmentedControl aria-label="Event scope" width="fit" defaultValue="all">
        <SegmentedControl.Option value="all">All</SegmentedControl.Option>
        <SegmentedControl.Option value="active">Active</SegmentedControl.Option>
        <SegmentedControl.Option value="archived">
          Archived
        </SegmentedControl.Option>
      </SegmentedControl>
      {/* The field cluster reads as one family with the tighter "related" gap */}
      <Inline space="related" alignY="input">
        <SearchField
          aria-label="Search events"
          placeholder="Search events"
          width={56}
        />
        <Select aria-label="Category" placeholder="Category" width={36}>
          <Select.Option id="concerts">Concerts</Select.Option>
          <Select.Option id="festivals">Festivals</Select.Option>
          <Select.Option id="theater">Theater</Select.Option>
        </Select>
        <AllFiltersPanel />
      </Inline>
    </Inline>
    {/* Right-aligned status, outside the filter group */}
    <Text fontSize="sm" variant="muted">
      128 results
    </Text>
  </Inline>
);
