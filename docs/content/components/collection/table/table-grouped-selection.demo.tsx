import { useState } from 'react';
import type { Selection } from '@marigold/components';
import { Stack, Table, Text } from '@marigold/components';

interface PriceLevel {
  id: string;
  name: string;
  /** The articles sold at this price level. Only price levels have them. */
  articles?: PriceLevel[];
}

const priceLevels: PriceLevel[] = [
  {
    id: 'standard',
    name: 'Standard price',
    articles: [
      { id: 'dinner', name: 'Dinner menu' },
      { id: 'drink', name: 'Welcome drink' },
    ],
  },
  {
    id: 'reduced',
    name: 'Reduced',
    articles: [{ id: 'kids', name: 'Kids menu' }],
  },
  { id: 'staff', name: 'Staff', articles: [] },
];

export default () => {
  const [selected, setSelected] = useState<Selection>(() => new Set());

  // After select-all the table reports `'all'`, which here means every price
  // level. Resolve it from the top-level items, never from every key.
  const selectedLevels =
    selected === 'all' ? priceLevels.map(level => level.id) : [...selected];

  return (
    <Stack space={4}>
      <Table
        aria-label="Price levels and their articles"
        selectionMode="multiple"
        treeColumn="name"
        selectableRows="top-level"
        treeIndent="aligned"
        defaultExpandedKeys={['standard']}
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Table.Header>
          <Table.Column id="name" rowHeader>
            Price level
          </Table.Column>
          <Table.Column id="articles" alignX="right">
            Articles
          </Table.Column>
        </Table.Header>
        <Table.Body items={priceLevels}>
          {function renderRow(row: PriceLevel) {
            return (
              <Table.Row id={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                {/* An article has no count of its own, so its cell stays empty. */}
                <Table.Cell alignX="right">{row.articles?.length}</Table.Cell>
                <Table.ExpandableRows items={row.articles}>
                  {renderRow}
                </Table.ExpandableRows>
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table>
      <Text size="sm" color="secondary">
        Selected price levels: {selectedLevels.join(', ') || 'none'}
      </Text>
    </Stack>
  );
};
