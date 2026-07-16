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
    {/* One row: search, quick filters, then the panel trigger */}
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
      {/* Fields default to full width, "fit" keeps the control in the row */}
      {/* [!code highlight] */}
      <SegmentedControl aria-label="Status" width="fit" defaultValue="all">
        <SegmentedControl.Option value="all">All</SegmentedControl.Option>
        <SegmentedControl.Option value="active">Active</SegmentedControl.Option>
        <SegmentedControl.Option value="archived">
          Archived
        </SegmentedControl.Option>
      </SegmentedControl>
      <Button>
        <ListFilter /> All filters
      </Button>
    </Inline>
    {/* Right-aligned status, outside the filter group */}
    <Text fontSize="sm" variant="muted">
      128 results
    </Text>
  </Inline>
);
