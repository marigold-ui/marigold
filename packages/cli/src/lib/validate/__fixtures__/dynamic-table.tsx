import { Table } from '@marigold/components';

const rows = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

const DynamicTable = () => (
  <Table aria-label="Users" selectionMode="none">
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      {rows.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.name}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default DynamicTable;
