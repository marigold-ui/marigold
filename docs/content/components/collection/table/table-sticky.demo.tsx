import { Scrollable, Table, Text } from '@marigold/components';

export default () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
  }));

  return (
    <Scrollable height="300px">
      <Table aria-label="Long scrollable table">
        <Table.Header sticky>
          <Table.Column>ID</Table.Column>
          <Table.Column>Title</Table.Column>
          <Table.Column>Description</Table.Column>
        </Table.Header>
        <Table.Body>
          {items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>
                <Text weight="medium">{item.title}</Text>
              </Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Scrollable>
  );
};
