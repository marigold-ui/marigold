import { Badge, Button, Table } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

interface Clearing {
  id: string;
  /** Only a settlement run has a label; a single clearing is named by its id. */
  label?: string;
  invoice?: string;
  event?: string;
  amount: number;
  children?: Clearing[];
}

const clearings: Clearing[] = [
  {
    id: 'run-2026-07-01',
    label: 'Settlement run 1 Jul 2026',
    amount: 12480.5,
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
        amount: 8280.5,
      },
    ],
  },
  {
    id: 'run-2026-06-01',
    label: 'Settlement run 1 Jun 2026',
    amount: 4500,
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
  {
    id: 'CLR-10240',
    invoice: 'INV-4720',
    event: 'City tour',
    amount: 990,
  },
];

export default () => (
  <Table
    aria-label="Clearings"
    treeColumn="clearing"
    defaultExpandedKeys={['run-2026-07-01']}
  >
    <Table.Header>
      <Table.Column id="clearing" rowHeader>
        Clearing no.
      </Table.Column>
      <Table.Column id="invoice">Invoice no.</Table.Column>
      <Table.Column id="event">Event</Table.Column>
      <Table.Column id="amount" alignX="right">
        Amount
      </Table.Column>
      <Table.Column id="actions" width={90} alignX="right">
        Actions
      </Table.Column>
    </Table.Header>
    <Table.Body items={clearings}>
      {function renderRow(row: Clearing) {
        return (
          <Table.Row id={row.id}>
            {/* Group rows are emphasised by the Table itself, no styling needed. */}
            <Table.Cell>{row.label ?? row.id}</Table.Cell>
            <Table.Cell>
              {row.children ? (
                <Badge>{row.children.length} clearings</Badge>
              ) : (
                row.invoice
              )}
            </Table.Cell>
            <Table.Cell>{row.event ?? '—'}</Table.Cell>
            <Table.Cell alignX="right">
              <NumericFormat
                style="currency"
                currency="EUR"
                value={row.amount}
              />
            </Table.Cell>
            <Table.Cell alignX="right">
              <Button variant="ghost" size="small">
                {row.children ? 'Total PDF' : 'PDF'}
              </Button>
            </Table.Cell>
            <Table.ExpandedRows items={row.children}>
              {renderRow}
            </Table.ExpandedRows>
          </Table.Row>
        );
      }}
    </Table.Body>
  </Table>
);
