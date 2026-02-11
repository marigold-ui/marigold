import { venues } from '@/lib/data/venues';
import { Badge, Inline, Stack, Table, Text } from '@marigold/components';

export default () => (
  <Table>
    <Table.Header>
      <Table.Column rowHeader>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column>Traits</Table.Column>
      <Table.Column>Capacity</Table.Column>
      <Table.Column alignX="right">Rating</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 5).map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>
            <Inline space={1} noWrap>
              <Text variant="muted">#{item.id}</Text>
              <Text weight="medium" wrap="noWrap">
                {item.name}
              </Text>
            </Inline>
          </Table.Cell>
          <Table.Cell>
            <Stack>
              <Text wrap="noWrap">{item.street}</Text>
              <Text wrap="noWrap">{item.city}</Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>{item.capacity}</Table.Cell>
          <Table.Cell>
            <Inline space={1}>
              {item.traits.map(trait => (
                <Badge key={trait}>{trait}</Badge>
              ))}
            </Inline>
          </Table.Cell>
          <Table.Cell>{item.rating}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
