import {
  Button,
  Checkbox,
  Drawer,
  Inline,
  NumberField,
  OverflowRegion,
  SearchField,
  SegmentedControl,
  Select,
  Stack,
} from '@marigold/components';
import { ListFilter } from '@marigold/icons';
import { DemoResizer } from '@/ui/DemoResizer';

// The panel is canonical: it always renders the complete filter set, so a
// quick filter that the bar hides is still available in here. Kept compact
// for the demo, see /examples/filter for the full grouped panel.
const AllFiltersPanel = () => (
  <Drawer.Trigger>
    <Button>
      <ListFilter /> All filters
    </Button>
    <Drawer closeButton size="xsmall">
      <Drawer.Title>All filters</Drawer.Title>
      <Drawer.Content>
        <Stack space="group">
          <Checkbox.Group label="Category">
            <Checkbox value="concerts" label="Concerts" />
            <Checkbox value="festivals" label="Festivals" />
            <Checkbox value="theater" label="Theater" />
          </Checkbox.Group>
          <Checkbox.Group label="Status">
            <Checkbox value="published" label="Published" />
            <Checkbox value="draft" label="Draft" />
          </Checkbox.Group>
          <NumberField label="Max. price" minValue={0} step={10} />
        </Stack>
      </Drawer.Content>
    </Drawer>
  </Drawer.Trigger>
);

// Drag the handle to narrow the bar. The scope switch and search field stay
// put while the quick filters drop into the panel one by one, so the bar
// keeps to a single row at every width.
export default () => (
  <DemoResizer defaultWidth={720} minWidth={380}>
    <Inline space="related" alignY="center" noWrap>
      {/* The scope switch leads the row and never hides: it re-bases which
          events the whole bar filters, so it is not one of the quick filters
          that can move into the panel. */}
      <SegmentedControl aria-label="Event scope" width="fit" defaultValue="all">
        <SegmentedControl.Option value="all">All</SegmentedControl.Option>
        <SegmentedControl.Option value="active">Active</SegmentedControl.Option>
        <SegmentedControl.Option value="archived">
          Archived
        </SegmentedControl.Option>
      </SegmentedControl>
      <SearchField
        aria-label="Search events"
        placeholder="Search events"
        width={40}
      />
      {/* Quick filters, in priority order. The last one hides first. */}
      <OverflowRegion>
        <Select aria-label="Category" placeholder="Category" width={36}>
          <Select.Option id="concerts">Concerts</Select.Option>
          <Select.Option id="festivals">Festivals</Select.Option>
          <Select.Option id="theater">Theater</Select.Option>
        </Select>
        <Select aria-label="Status" placeholder="Status" width={36}>
          <Select.Option id="published">Published</Select.Option>
          <Select.Option id="draft">Draft</Select.Option>
        </Select>
        <Select aria-label="Price" placeholder="Price" width={36}>
          <Select.Option id="lt50">Under 50 €</Select.Option>
          <Select.Option id="gte50">50 € and more</Select.Option>
        </Select>
      </OverflowRegion>
      <AllFiltersPanel />
    </Inline>
  </DemoResizer>
);
