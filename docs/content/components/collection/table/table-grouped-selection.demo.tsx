import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Badge,
  Button,
  Dialog,
  Form,
  NumberField,
  NumericFormat,
  Stack,
  Table,
  TextField,
} from '@marigold/components';
import { Pause, Play, Plus } from '@marigold/icons';

type Id = string | number;

interface Article {
  id: string;
  name: string;
  price: number;
}

interface PriceLevel {
  id: string;
  name: string;
  status: 'on-sale' | 'paused';
  articles: Article[];
}

/** A row of the table: a price level, or one of the articles sold at it. */
type Row = PriceLevel | Article;

const isPriceLevel = (row: Row): row is PriceLevel => 'articles' in row;

// A price level costs what its articles cost together, so it updates as
// articles are added.
const priceOf = (row: Row) =>
  isPriceLevel(row)
    ? row.articles.reduce((sum, article) => sum + article.price, 0)
    : row.price;

const initialPriceLevels: PriceLevel[] = [
  {
    id: 'standard',
    name: 'Standard price',
    status: 'on-sale',
    articles: [
      { id: 'dinner', name: 'Dinner menu', price: 55 },
      { id: 'drink', name: 'Welcome drink', price: 9 },
    ],
  },
  {
    id: 'reduced',
    name: 'Reduced',
    status: 'on-sale',
    articles: [{ id: 'kids', name: 'Kids menu', price: 25 }],
  },
  { id: 'staff', name: 'Staff', status: 'paused', articles: [] },
];

export default () => {
  const [priceLevels, setPriceLevels] = useState(initialPriceLevels);
  const [selected, setSelected] = useState<Selection>(() => new Set());
  const [expanded, setExpanded] = useState<Set<Id>>(
    () => new Set(['standard'])
  );
  // The price level the "Add article" dialog is open for.
  const [addingTo, setAddingTo] = useState<PriceLevel | null>(null);

  // After select-all the table reports `'all'`, which here means every price
  // level. Resolve it from the top-level items, never from every key.
  const selectedIds = new Set<Id>(
    selected === 'all' ? priceLevels.map(level => level.id) : selected
  );

  // A bulk action: it acts on the selected price levels, never on articles.
  const setStatus = (status: PriceLevel['status']) => {
    setPriceLevels(levels =>
      levels.map(level =>
        selectedIds.has(level.id) ? { ...level, status } : level
      )
    );
    setSelected(new Set());
  };

  // A row action: it acts on the one price level it was pressed in.
  const addArticle = (levelId: string, name: string, price: number) => {
    setPriceLevels(levels =>
      levels.map(level =>
        level.id === levelId
          ? {
              ...level,
              articles: [
                ...level.articles,
                { id: `${levelId}-${Date.now()}`, name, price },
              ],
            }
          : level
      )
    );
    // Open the price level, so the new article shows.
    setExpanded(keys => new Set([...keys, levelId]));
    setAddingTo(null);
  };

  return (
    <>
      <Table
        aria-label="Price levels and their articles"
        selectionMode="multiple"
        treeColumn="name"
        selectableRows="top-level"
        expandedKeys={expanded}
        onExpandedChange={setExpanded}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => (
          <ActionBar>
            <Button onPress={() => setStatus('paused')}>
              <Pause />
              Pause sales
            </Button>
            <Button onPress={() => setStatus('on-sale')}>
              <Play />
              Resume sales
            </Button>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column id="name" rowHeader>
            Price level
          </Table.Column>
          <Table.Column id="price" alignX="right">
            Price
          </Table.Column>
          <Table.Column id="status">Status</Table.Column>
          <Table.Column id="actions">Actions</Table.Column>
        </Table.Header>
        <Table.Body items={priceLevels}>
          {function renderRow(row: Row) {
            const level = isPriceLevel(row) ? row : null;
            return (
              <Table.Row id={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell alignX="right">
                  <NumericFormat
                    value={priceOf(row)}
                    style="currency"
                    currency="EUR"
                  />
                </Table.Cell>
                {/* Status and actions belong to the price level, so an
                    article leaves both cells empty. */}
                <Table.Cell>
                  {level && (
                    <Badge
                      variant={
                        level.status === 'on-sale' ? 'success' : 'default'
                      }
                    >
                      {level.status === 'on-sale' ? 'On sale' : 'Paused'}
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {level && (
                    <Button
                      variant="ghost"
                      size="small"
                      aria-label={`Add article to ${level.name}`}
                      onPress={() => setAddingTo(level)}
                    >
                      <Plus />
                      Add article
                    </Button>
                  )}
                </Table.Cell>
                <Table.ExpandableRows items={level?.articles}>
                  {renderRow}
                </Table.ExpandableRows>
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table>

      <Dialog
        open={addingTo !== null}
        onOpenChange={open => !open && setAddingTo(null)}
        size="xsmall"
        closeButton
      >
        <Form
          onSubmit={e => {
            e.preventDefault();
            if (!addingTo) return;
            const data = new FormData(e.currentTarget);
            addArticle(
              addingTo.id,
              String(data.get('name')),
              Number(data.get('price'))
            );
          }}
        >
          <Dialog.Title>Add article to {addingTo?.name}</Dialog.Title>
          <Dialog.Content>
            <Stack space="regular">
              <TextField label="Name" name="name" required autoFocus />
              <NumberField
                label="Price"
                name="price"
                required
                defaultValue={0}
                minValue={0}
                formatOptions={{ style: 'currency', currency: 'EUR' }}
              />
            </Stack>
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="secondary" slot="close">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Dialog.Actions>
        </Form>
      </Dialog>
    </>
  );
};
