import { Button, Table } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

interface Clearing {
  id: string;
  /** Only a settlement run has a label; a single clearing is named by its id. */
  label?: string;
  /** A run has no invoice of its own, only its clearings do. */
  invoice?: string;
  event?: string;
  amount?: number;
  children?: Clearing[];
}

const clearings: Clearing[] = [
  {
    id: 'run-2026-07-01',
    label: 'Settlement run 1 Jul 2026',
    children: [
      {
        id: 'CLR-10231',
        invoice: 'INV-4711',
        event: 'Night market',
        amount: 4200,
      },
      {
        id: 'CLR-10232',
        invoice: 'INV-4712',
        event: 'Summer party',
        amount: 8300,
      },
    ],
  },
  {
    id: 'run-2026-06-01',
    label: 'Settlement run 1 Jun 2026',
    children: [
      {
        id: 'CLR-10188',
        invoice: 'INV-4655',
        event: 'Spring run',
        amount: 3300,
      },
      {
        id: 'CLR-10189',
        invoice: 'INV-4656',
        event: 'Reading night',
        amount: 1200,
      },
    ],
  },
  // Not settled yet, so it sits at the top level next to the runs.
  { id: 'CLR-10240', invoice: 'INV-4720', event: 'City tour', amount: 990.5 },
];

/**
 * A run is worth what its clearings add up to. Deriving the total keeps the
 * group row from ever disagreeing with the rows underneath it.
 */
const total = (row: Clearing): number =>
  row.children
    ? row.children.reduce((sum, child) => sum + total(child), 0)
    : (row.amount ?? 0);

export default () => (
  <Table
    aria-label="Clearings"
    treeColumn="clearing"
    defaultExpandedKeys={['run-2026-07-01']}
  >
    <Table.Header>
      {/* Wide enough for a run label to stay on one line. */}
      <Table.Column id="clearing" minWidth={260} rowHeader>
        Clearing no.
      </Table.Column>
      <Table.Column id="invoice">Invoice no.</Table.Column>
      <Table.Column id="event">Event</Table.Column>
      <Table.Column id="amount" alignX="right">
        Amount
      </Table.Column>
      <Table.Column id="actions" width={120} alignX="right">
        Actions
      </Table.Column>
    </Table.Header>
    <Table.Body items={clearings}>
      {function renderRow(row: Clearing) {
        const { children } = row;

        return (
          <Table.Row id={row.id}>
            {/* Group rows are emphasised by the Table itself, no styling needed. */}
            <Table.Cell>{row.label ?? row.id}</Table.Cell>
            {/* A run has no invoice, and it spans several events, so both cells
                stay empty rather than borrowing a value from a child. */}
            <Table.Cell>{row.invoice}</Table.Cell>
            <Table.Cell>{row.event}</Table.Cell>
            <Table.Cell alignX="right">
              <NumericFormat
                style="currency"
                currency="EUR"
                value={total(row)}
              />
            </Table.Cell>
            <Table.Cell alignX="right">
              <Button variant="ghost" size="small">
                {children ? 'Total PDF' : 'PDF'}
              </Button>
            </Table.Cell>
            <Table.ExpandableRows items={children}>
              {renderRow}
            </Table.ExpandableRows>
          </Table.Row>
        );
      }}
    </Table.Body>
  </Table>
);
