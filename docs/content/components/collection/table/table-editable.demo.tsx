import { useState } from 'react';
import { Badge, Select, Table, TextField } from '@marigold/components';

export default () => {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Hans Müller',
      email: 'hans.mueller@example.de',
      status: 'active',
    },
    {
      id: '2',
      name: 'Fritz Schneider',
      email: 'fritz.schneider@example.de',
      status: 'inactive',
    },
    {
      id: '3',
      name: 'Klaus Becker',
      email: 'klaus.becker@example.de',
      status: 'suspended',
    },
  ]);

  const handleSubmit = (index: number, e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setData(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: (formData.get('name') as string) || next[index].name,
        email: (formData.get('email') as string) || next[index].email,
        status: (formData.get('status') as string) || next[index].status,
      };
      return next;
    });
  };

  return (
    <Table aria-label="Editable user data">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Status</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((user, i) => (
          <Table.Row key={user.id}>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="Name"
                  name="name"
                  defaultValue={user.name}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              {user.name}
            </Table.EditableCell>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="Email"
                  name="email"
                  defaultValue={user.email}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              {user.email}
            </Table.EditableCell>
            <Table.EditableCell
              renderEditing={() => (
                <Select
                  aria-label="Status"
                  name="status"
                  defaultSelectedKey={user.status}
                  autoFocus
                >
                  <Select.Option id="active">active</Select.Option>
                  <Select.Option id="inactive">inactive</Select.Option>
                  <Select.Option id="suspended">suspended</Select.Option>
                </Select>
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              <Badge>{user.status}</Badge>
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
