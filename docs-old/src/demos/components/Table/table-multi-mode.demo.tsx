import { Table } from '@marigold/components';

export const MultiModeTable = () => (
  <Table aria-label="Table with multiple selection" selectionMode="multiple">
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Firstname</Table.Column>
      <Table.Column>House</Table.Column>
      <Table.Column>Year of birth</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Potter</Table.Cell>
        <Table.Cell>Harry</Table.Cell>
        <Table.Cell>Gryffindor</Table.Cell>
        <Table.Cell>1980</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Malfoy</Table.Cell>
        <Table.Cell>Draco</Table.Cell>
        <Table.Cell>Slytherin</Table.Cell>
        <Table.Cell>1980</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Diggory</Table.Cell>
        <Table.Cell>Cedric</Table.Cell>
        <Table.Cell>Hufflepuff</Table.Cell>
        <Table.Cell>1977</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Lovegood</Table.Cell>
        <Table.Cell>Luna</Table.Cell>
        <Table.Cell>Ravenclaw</Table.Cell>
        <Table.Cell>1981</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
