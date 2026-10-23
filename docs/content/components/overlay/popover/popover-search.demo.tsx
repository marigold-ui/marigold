import { useState } from 'react';
import {
  ActionMenu,
  Badge,
  Button,
  ButtonGroup,
  Card,
  DateFormat,
  Description,
  EmptyState,
  Inline,
  ListView,
  NumericFormat,
  Popover,
  Stack,
  Text,
  TextValue,
  Title,
  Tooltip,
  useConfirmation,
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
  const [query, setQuery] = useState('');
  const confirm = useConfirmation();

  const changeRole = (id: string, role: Role) =>
    setMembers(current =>
      current.map(member => (member.id === id ? { ...member, role } : member))
    );

  // Removing someone can only be undone by inviting them again, so ask first.
  const remove = async (member: Member) => {
    const result = await confirm({
      variant: 'destructive',
      title: `Remove ${member.name}?`,
      content: `${member.name} loses access to Jazz Night and its orders. You can invite them again later.`,
      confirmationLabel: 'Remove member',
    });
    if (result === 'confirmed') {
      setMembers(current => current.filter(item => item.id !== member.id));
    }
  };

  const count = (role: Role) =>
    members.filter(member => member.role === role).length;

  return (
    <Card>
      <Card.Header>
        <Title>Jazz Night</Title>
        <Description>
          <DateFormat
            value={new Date(2026, 6, 18)}
            weekday="short"
            day="numeric"
            month="long"
          />{' '}
          · Jazzhaus
        </Description>
      </Card.Header>
      <Card.Content>
        <Stack space="tight">
          <Text>
            <NumericFormat value={members.length} /> people have access to this
            event and its orders.
          </Text>
          <Inline space="related">
            {roles.map(role => (
              <Badge key={role}>
                {/* One inline box: Badge is a flex row and drops a bare space. */}
                <span>
                  <NumericFormat value={count(role)} /> {role.toLowerCase()}
                  {count(role) === 1 ? '' : 's'}
                </span>
              </Badge>
            ))}
          </Inline>
        </Stack>
      </Card.Content>
      <Card.Footer>
        <Popover.Trigger>
          <Button>
            <Users /> Manage team
          </Button>
          <Popover size="large">
            <Title>Team members</Title>
            <Popover.Search
              aria-label="Search team members"
              placeholder="Search team members"
              inputValue={query}
              onInputChange={setQuery}
            />
            <Popover.Content>
              <ListView
                aria-label="Team members"
                items={members}
                emptyState={
                  query ? (
                    <EmptyState
                      title="No team members found"
                      description={`Nobody matches "${query}". Check the spelling or search for an email address.`}
                      action={
                        <Button size="small" onPress={() => setQuery('')}>
                          Show all team members
                        </Button>
                      }
                    />
                  ) : (
                    <EmptyState
                      title="No team members yet"
                      description="People you invite to this event show up here."
                    />
                  )
                }
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
                          variant="destructive-ghost"
                          aria-label={`Remove ${member.name}`}
                          onPress={() => remove(member)}
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
      </Card.Footer>
    </Card>
  );
};
