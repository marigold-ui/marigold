import {
  Button,
  Checkbox,
  Drawer,
  Inline,
  NumberField,
  SearchField,
  Select,
  Slider,
  Stack,
} from '@marigold/components';
import { ListFilter } from '@marigold/icons';

// The panel is canonical: a quick filter is a shortcut to a filter that still
// lives here, so "All filters" opens the complete set. Kept compact for the
// demo; see /examples/filter for the full grouped panel.
const AllFiltersPanel = () => (
  <Drawer.Trigger>
    <Button>
      <ListFilter /> All filters
    </Button>
    <Drawer closeButton>
      <Drawer.Title>All filters</Drawer.Title>
      <Drawer.Content>
        <Stack space="group">
          <Checkbox.Group label="Status">
            <Checkbox value="published" label="Published" />
            <Checkbox value="draft" label="Draft" />
            <Checkbox value="archived" label="Archived" />
          </Checkbox.Group>
          <Checkbox.Group label="Category">
            <Checkbox value="concert" label="Concerts" />
            <Checkbox value="festival" label="Festivals" />
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
  <Inline space="related" alignY="input">
    <SearchField
      aria-label="Search events"
      placeholder="Search events"
      width={56}
    />
    <Select aria-label="Status" placeholder="Status" width={36}>
      <Select.Option id="published">Published</Select.Option>
      <Select.Option id="draft">Draft</Select.Option>
      <Select.Option id="archived">Archived</Select.Option>
    </Select>
    <Select aria-label="Category" placeholder="Category" width={36}>
      <Select.Option id="concert">Concerts</Select.Option>
      <Select.Option id="festival">Festivals</Select.Option>
      <Select.Option id="theater">Theater</Select.Option>
    </Select>
    <AllFiltersPanel />
  </Inline>
);
