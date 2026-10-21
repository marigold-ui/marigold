import { useState } from 'react';
import {
  ActionMenu,
  Button,
  ButtonGroup,
  Description,
  ListView,
  Popover,
  Text,
  TextValue,
  Title,
  Tooltip,
} from '@marigold/components';
import { UserMinus, Users } from '@marigold/icons';

type Role = 'Admin' | 'Editor' | 'Viewer';

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const initialMembers: Member[] = [
  {
    id: 'jane',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Admin',
  },
  {
    id: 'john',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Editor',
  },
  {
    id: 'priya',
    name: 'Priya Natarajan',
    email: 'priya.n@example.com',
    role: 'Editor',
  },
  {
    id: 'lukas',
    name: 'Lukas Weber',
    email: 'lukas.weber@example.com',
    role: 'Viewer',
  },
  {
    id: 'mara',
    name: 'Mara Jensen',
    email: 'mara.jensen@example.com',
    role: 'Viewer',
  },
];

const roles: Role[] = ['Admin', 'Editor', 'Viewer'];

export default () => {
  const [members, setMembers] = useState(initialMembers);

  const changeRole = (id: string, role: Role) =>
    setMembers(current =>
      current.map(member => (member.id === id ? { ...member, role } : member))
    );

  const remove = (id: string) =>
    setMembers(current => current.filter(member => member.id !== id));

  return (
    <Popover.Trigger>
      <Button>
        <Users /> Manage team
      </Button>
      <Popover width="large">
        <Title>Team members</Title>
        <Popover.Search
          aria-label="Search team members"
          placeholder="Search team members"
        />
        <Popover.Content>
          <ListView
            aria-label="Team members"
            items={members}
            emptyState={<Text>No team members match your search.</Text>}
          >
            {(member: Member) => (
              <ListView.Item id={member.id} textValue={member.name}>
                <TextValue>{member.name}</TextValue>
                <Description>
                  {member.role} · {member.email}
                </Description>
                <ButtonGroup
                  aria-label={`Actions for ${member.name}`}
                  size="icon"
                >
                  <ActionMenu aria-label={`Change role of ${member.name}`}>
                    {roles
                      .filter(role => role !== member.role)
                      .map(role => (
                        <ActionMenu.Item
                          key={role}
                          onAction={() => changeRole(member.id, role)}
                        >
                          {`Make ${role.toLowerCase()}`}
                        </ActionMenu.Item>
                      ))}
                  </ActionMenu>
                  <Tooltip.Trigger>
                    <Button
                      aria-label={`Remove ${member.name}`}
                      onPress={() => remove(member.id)}
                    >
                      <UserMinus />
                    </Button>
                    <Tooltip>Remove</Tooltip>
                  </Tooltip.Trigger>
                </ButtonGroup>
              </ListView.Item>
            )}
          </ListView>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  );
};
