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

// The badge counts *applied* filters, following the common convention for
// filter buttons. It is not tied to the overflow state: hiding a quick
// filter changes nothing about what is applied, and the panel is always
// complete, so demoted filters need no extra signal.
export default () => {
  const [applied, setApplied] = useState({
    category: false,
    status: false,
    price: false,
  });
  const appliedCount = Object.values(applied).filter(Boolean).length;
  const apply = (filter: keyof typeof applied) => () =>
    setApplied(current => ({ ...current, [filter]: true }));

  return (
    <DemoResizer defaultWidth={620} minWidth={420}>
      <Inline noWrap space="related" alignY="center">
        <SearchField aria-label="Search events" width={44} />
        <OverflowRegion>
          <Select
            aria-label="Category"
            placeholder="Category"
            width={36}
            onChange={apply('category')}
          >
            <Select.Option id="concerts">Concerts</Select.Option>
            <Select.Option id="festivals">Festivals</Select.Option>
            <Select.Option id="theater">Theater</Select.Option>
          </Select>
          <Select
            aria-label="Status"
            placeholder="Status"
            width={36}
            onChange={apply('status')}
          >
            <Select.Option id="published">Published</Select.Option>
            <Select.Option id="draft">Draft</Select.Option>
          </Select>
          <Select
            aria-label="Price"
            placeholder="Price"
            width={36}
            onChange={apply('price')}
          >
            <Select.Option id="lt50">Under 50 €</Select.Option>
            <Select.Option id="gte50">50 € and more</Select.Option>
          </Select>
        </OverflowRegion>
        <Drawer.Trigger>
          <Button>
            All filters
            {appliedCount > 0 && (
              <Badge variant="primary">{appliedCount}</Badge>
            )}
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
