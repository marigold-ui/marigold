import { useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Inline,
  NumberField,
  OverflowRegion,
  SearchField,
  Select,
  Stack,
} from '@marigold/components';
import { DemoResizer } from '@/ui/DemoResizer';

// When the recovery surface lives outside the region — here, a drawer that
// always holds the complete filter set — use `onOverflowChange` to reflect
// the hidden count on the pinned trigger.
export default () => {
  const [hiddenCount, setHiddenCount] = useState(0);

  return (
    <DemoResizer defaultWidth={620} minWidth={420}>
      <Inline noWrap space="related" alignY="center">
        <SearchField aria-label="Search events" width={44} />
        <OverflowRegion
          onOverflowChange={({ hiddenCount }) => setHiddenCount(hiddenCount)}
        >
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
        <Drawer.Trigger>
          <Button>
            All filters
            {hiddenCount > 0 && <Badge variant="primary">{hiddenCount}</Badge>}
          </Button>
          <Drawer closeButton size="xsmall">
            <Drawer.Title>All filters</Drawer.Title>
            <Drawer.Content>
              {/* The panel always renders the complete filter set. Nothing
                  moves when quick filters demote, so every filter has a
                  stable place in here. */}
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
      </Inline>
    </DemoResizer>
  );
};
