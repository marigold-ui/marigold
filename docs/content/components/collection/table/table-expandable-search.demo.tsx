import { useEffect, useState } from 'react';
import { SearchField, Stack, Table, Text } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

interface Clearing {
  id: string;
  label?: string;
  invoice?: string;
  amount?: number;
  children?: Clearing[];
}

const clearings: Clearing[] = [
  {
    id: 'run-2026-07-01',
    label: 'Settlement run 1 Jul 2026',
    children: [
      { id: 'CLR-10231', invoice: 'INV-4711', amount: 4200 },
      { id: 'CLR-10232', invoice: 'INV-4712', amount: 8300 },
    ],
  },
  {
    id: 'run-2026-06-01',
    label: 'Settlement run 1 Jun 2026',
    children: [
      { id: 'CLR-10188', invoice: 'INV-4655', amount: 3300 },
      { id: 'CLR-10189', invoice: 'INV-4656', amount: 1200 },
    ],
  },
  { id: 'CLR-10240', invoice: 'INV-4720', amount: 990.5 },
];

/** A run is worth what its clearings add up to. */
const total = (row: Clearing): number =>
  row.children
    ? row.children.reduce((sum, child) => sum + total(child), 0)
    : (row.amount ?? 0);

/**
 * Finds a clearing by number and returns it together with the rows that have to
 * be expanded for it to exist in the DOM.
 */
const findMatch = (query: string) => {
  const needle = query.trim().toUpperCase();
  if (!needle) return null;

  for (const run of clearings) {
    if (run.id.toUpperCase().includes(needle)) {
      return { key: run.id, ancestors: [] as string[] };
    }

    const child = run.children?.find(entry =>
      entry.id.toUpperCase().includes(needle)
    );

    if (child) return { key: child.id, ancestors: [run.id] };
  }

  return null;
};

export default () => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [match, setMatch] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const search = (query: string) => {
    const result = findMatch(query);

    if (!result) {
      setMatch(null);
      setNotFound(query.trim().length > 0);
      return;
    }

    // Expand the ancestors first. A collapsed child row is not rendered, so
    // there would be nothing to scroll to yet.
    setExpandedKeys(open => new Set([...open, ...result.ancestors]));
    setMatch(result.key);
    setNotFound(false);
  };

  // Runs after the expansion has rendered the matching row.
  useEffect(() => {
    if (!match) return;

    const row = document.querySelector<HTMLElement>(`[data-key="${match}"]`);

    row?.scrollIntoView({ block: 'nearest' });
    // Focusing is what actually points the user at the hit.
    row?.focus();
  }, [match, expandedKeys]);

  return (
    <Stack space={4}>
      <SearchField
        label="Find a clearing number"
        placeholder="e.g. CLR-10232"
        width={80}
        onSubmit={search}
        onClear={() => {
          setMatch(null);
          setNotFound(false);
        }}
      />

      {notFound && (
        <Text color="secondary" size="sm">
          No clearing found.
        </Text>
      )}

      <Table
        aria-label="Clearings"
        treeColumn="clearing"
        expandedKeys={expandedKeys}
        onExpandedChange={keys => setExpandedKeys(keys as Set<string>)}
      >
        <Table.Header>
          <Table.Column id="clearing" minWidth={260} rowHeader>
            Clearing no.
          </Table.Column>
          <Table.Column id="invoice">Invoice no.</Table.Column>
          <Table.Column id="amount" alignX="right">
            Amount
          </Table.Column>
        </Table.Header>
        <Table.Body items={clearings}>
          {function renderRow(row: Clearing) {
            const { children } = row;

            return (
              <Table.Row id={row.id}>
                <Table.Cell>{row.label ?? row.id}</Table.Cell>
                <Table.Cell>{row.invoice}</Table.Cell>
                <Table.Cell alignX="right">
                  <NumericFormat
                    style="currency"
                    currency="EUR"
                    value={total(row)}
                  />
                </Table.Cell>
                <Table.ExpandableRows items={children}>
                  {renderRow}
                </Table.ExpandableRows>
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table>
    </Stack>
  );
};
