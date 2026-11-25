import { Skeleton, Table } from '@marigold/components';

const columns = [
  { name: 'Event', width: '3/4', variant: 'default' },
  { name: 'Venue', width: 'full', variant: 'default' },
  { name: 'Date', width: '1/2', variant: 'default' },
  { name: 'Status', width: 16, variant: 'rounded' },
] as const;

const rows = Array.from({ length: 5 }, (_, i) => `skeleton-${i}`);

export default () => (
  <Table
    aria-label="Events"
    loading
    selectionMode="multiple"
    // Placeholder rows can't be selected, but the checkbox column stays.
    disabledKeys={rows}
    // "Select all" ignores disabled rows, so keep the selection empty while loading.
    selectedKeys={[]}
  >
    <Table.Header>
      {columns.map(({ name }, i) => (
        <Table.Column key={name} rowHeader={i === 0}>
          {name}
        </Table.Column>
      ))}
    </Table.Header>
    <Table.Body>
      {rows.map(id => (
        <Table.Row key={id} id={id}>
          {columns.map((column, i) => (
            // The row header needs a text value, and there is none yet.
            <Table.Cell key={column.name} textValue={i === 0 ? '' : undefined}>
              <Skeleton width={column.width} variant={column.variant} />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
