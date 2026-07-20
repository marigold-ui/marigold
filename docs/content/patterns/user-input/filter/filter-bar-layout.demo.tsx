import {
  Button,
  Inline,
  SearchField,
  SegmentedControl,
  Select,
  Text,
} from '@marigold/components';
import { ListFilter } from '@marigold/icons';

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
        <Button>
          <ListFilter /> All filters
        </Button>
      </Inline>
    </Inline>
    {/* Right-aligned status, outside the filter group */}
    <Text fontSize="sm" variant="muted">
      128 results
    </Text>
  </Inline>
);
