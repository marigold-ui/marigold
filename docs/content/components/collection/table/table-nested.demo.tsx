import { Table } from '@marigold/components';

const nestedColumns = [
  {
    name: 'Name',
    key: 'name',
    children: [
      { name: 'First Name', key: 'first', isRowHeader: true },
      { name: 'Last Name', key: 'last', isRowHeader: true },
    ],
  },
  {
    name: 'Information',
    key: 'info',
    children: [
      { name: 'Age', key: 'age' },
      { name: 'Birthday', key: 'birthday' },
    ],
  },
] as const;

const nestedRows = [
  { id: 1, first: 'Sam', last: 'Smith', age: 36, birthday: 'May 3' },
  { id: 2, first: 'Julia', last: 'Jones', age: 24, birthday: 'February 10' },
  { id: 3, first: 'Peter', last: 'Parker', age: 28, birthday: 'September 7' },
  { id: 4, first: 'Bruce', last: 'Wayne', age: 32, birthday: 'December 18' },
] as const;

export default () => (
  <Table aria-label="Example table with dynamic nested columns">
    <Table.Header columns={nestedColumns as any}>
      {column => (
        <Table.Column
          isRowHeader={(column as any).isRowHeader}
          childColumns={(column as any).children}
        >
          {(column as any).name}
        </Table.Column>
      )}
    </Table.Header>
    <Table.Body items={nestedRows}>
      {item => (
        <Table.Row>
          <Table.Cell>{(item as any).first}</Table.Cell>
          <Table.Cell>{(item as any).last}</Table.Cell>
          <Table.Cell>{(item as any).age}</Table.Cell>
          <Table.Cell>{(item as any).birthday}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);
