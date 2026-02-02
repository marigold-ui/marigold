import { people } from '@/lib/data/people';
import { Stack, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Team members">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Position</Table.Column>
        <Table.Column>Email</Table.Column>
      </Table.Header>
      <Table.Body>
        {people.slice(0, 5).map(person => (
          <Table.Row key={person.id}>
            <Table.Cell>
              <Stack space={2} alignItems="center" direction="row">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="size-8 rounded-full object-cover"
                />
                <Text weight="medium">{person.name}</Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>
              <Text size="sm" color="muted-foreground">
                {person.position}
              </Text>
            </Table.Cell>
            <Table.Cell>{person.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
