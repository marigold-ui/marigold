import { people } from '@/lib/data/people';
import { useState } from 'react';
import { Stack, Table, Text, TextField } from '@marigold/components';

export default () => {
  const [data, setData] = useState(people.slice(0, 3));

  const handleSubmit = (index: number, e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setData(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: (formData.get('name') as string) || next[index].name,
        position: (formData.get('position') as string) || next[index].position,
        email: (formData.get('email') as string) || next[index].email,
      };
      return next;
    });
  };

  return (
    <Table aria-label="Editable team data">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Position</Table.Column>
        <Table.Column>Email</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((person, i) => (
          <Table.Row key={person.id}>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="Name"
                  name="name"
                  defaultValue={person.name}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              <Text weight="medium">{person.name}</Text>
            </Table.EditableCell>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="Position"
                  name="position"
                  defaultValue={person.position}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              <Text size="sm" color="muted-foreground">
                {person.position}
              </Text>
            </Table.EditableCell>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="Email"
                  name="email"
                  defaultValue={person.email}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              {person.email}
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
