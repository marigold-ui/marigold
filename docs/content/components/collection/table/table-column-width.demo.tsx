import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Table with fixed column width" selectionMode="single">
    <Table.Header>
      <Table.Column width="1/2" isRowHeader>
        Name
      </Table.Column>
      <Table.Column width={64}>Firstname</Table.Column>
      <Table.Column width="full">House</Table.Column>
      <Table.Column width="auto">Year of birth</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row id={1}>
        <Table.Cell>Potter</Table.Cell>
        <Table.Cell>Harry</Table.Cell>
        <Table.Cell>Gryffindor</Table.Cell>
        <Table.Cell>1980</Table.Cell>
      </Table.Row>
      <Table.Row id={2}>
        <Table.Cell>Malfoy</Table.Cell>
        <Table.Cell>Draco</Table.Cell>
        <Table.Cell>Slytherin</Table.Cell>
        <Table.Cell>1980</Table.Cell>
      </Table.Row>
      <Table.Row id={3}>
        <Table.Cell>Diggory</Table.Cell>
        <Table.Cell>Cedric</Table.Cell>
        <Table.Cell>Hufflepuff</Table.Cell>
        <Table.Cell>1977</Table.Cell>
      </Table.Row>
      <Table.Row id={4}>
        <Table.Cell>Lovegood</Table.Cell>
        <Table.Cell>Luna</Table.Cell>
        <Table.Cell>Ravenclaw</Table.Cell>
        <Table.Cell>1981</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
