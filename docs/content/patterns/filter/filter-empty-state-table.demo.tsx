import { HeartCrack } from 'lucide-react';
import { Button, Inset, Stack, Table, Text } from '@marigold/components';

const Empty = () => (
  <Inset space={4}>
    <Stack space={6} alignX="center">
      <Stack alignX="center">
        <HeartCrack className="size-16" strokeWidth={1} />
        <Text fontSize="xl" weight="medium">
          No results found.
        </Text>
        <Text>Try adjusting your search or filters.</Text>
      </Stack>
      <Button>Clear all filters</Button>
    </Stack>
  </Inset>
);

export default () => (
  <Table aria-label="Empty table">
    <Table.Header>
      <Table.Column rowHeader>Name</Table.Column>
      <Table.Column>Type</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column>Capacity</Table.Column>
      <Table.Column>Price</Table.Column>
    </Table.Header>
    <Table.Body emptyState={Empty}>{[]}</Table.Body>
  </Table>
);
