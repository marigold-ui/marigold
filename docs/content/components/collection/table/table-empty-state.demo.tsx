import { Center, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Search results">
    <Table.Header>
      <Table.Column isRowHeader>Name</Table.Column>
      <Table.Column>Type</Table.Column>
      <Table.Column>Date Modified</Table.Column>
    </Table.Header>
    <Table.Body renderEmptyState={() => <Center>'No results found.'</Center>}>
      {[]}
    </Table.Body>
  </Table>
);
