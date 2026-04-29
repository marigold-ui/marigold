'use client';

import { people } from '@/lib/data/people';
import { MailPlus, UserRoundPlus } from 'lucide-react';
import {
  ActionMenu,
  Badge,
  Button,
  Headline,
  Inline,
  Inset,
  Panel,
  SearchField,
  Select,
  Stack,
  Table,
  Text,
} from '@marigold/components';

const roles = [
  'Master',
  'Admin',
  'Editor',
  'Viewer',
  'Admin',
  'Editor',
  'Viewer',
  'Editor',
];
const statuses: Array<'active' | 'invited' | 'suspended'> = [
  'active',
  'active',
  'active',
  'invited',
  'active',
  'active',
  'suspended',
  'active',
];
const lastActive = [
  'Just now',
  '12 min ago',
  '1 hour ago',
  'Never',
  'Yesterday',
  '2 days ago',
  '3 weeks ago',
  'Yesterday',
];

const statusVariant = {
  active: 'success',
  invited: 'info',
  suspended: 'warning',
} as const;

const pendingInvites = [
  {
    email: 'noah.berger@example.com',
    role: 'Editor',
    invitedBy: "Chip 'Pixel' Patterson",
    sent: '2 days ago',
  },
  {
    email: 'lea.fischer@example.com',
    role: 'Viewer',
    invitedBy: "Sandy 'Specs' Vega",
    sent: '5 days ago',
  },
  {
    email: 'marco.ricci@example.com',
    role: 'Admin',
    invitedBy: "Chip 'Pixel' Patterson",
    sent: '1 week ago',
  },
];

const UsersPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Users</Headline>
        <Text>
          Invite teammates, manage their roles, and track who has access to the
          workspace.
        </Text>
      </Stack>
      <Stack space="section">
        <Panel>
          <Panel.Header>
            <Panel.Title>Members</Panel.Title>
            <Panel.Description>
              Everyone with access to the Acme workspace, their role, and the
              last time they signed in.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="primary">
                <UserRoundPlus /> Invite user
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Inline space="related" noWrap>
              <SearchField
                aria-label="Search members"
                placeholder="Search by name or email"
              />
              <Select aria-label="Filter by role" defaultValue="all" width={40}>
                <Select.Option id="all">All roles</Select.Option>
                <Select.Option id="master">Master</Select.Option>
                <Select.Option id="admin">Admin</Select.Option>
                <Select.Option id="editor">Editor</Select.Option>
                <Select.Option id="viewer">Viewer</Select.Option>
              </Select>
              <Select
                aria-label="Filter by status"
                defaultValue="all"
                width={40}
              >
                <Select.Option id="all">All statuses</Select.Option>
                <Select.Option id="active">Active</Select.Option>
                <Select.Option id="invited">Invited</Select.Option>
                <Select.Option id="suspended">Suspended</Select.Option>
              </Select>
            </Inline>
          </Panel.Content>
          <Panel.Content bleed>
            <Table
              aria-label="Members"
              selectionMode="multiple"
              defaultSelectedKeys={[people[0].id]}
            >
              <Table.Header>
                <Table.Column rowHeader>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Last active</Table.Column>
                <Table.Column alignX="right">&nbsp;</Table.Column>
              </Table.Header>
              <Table.Body>
                {people.map((person, i) => (
                  <Table.Row key={person.id}>
                    <Table.Cell>
                      <Inline space={2} alignY="center" noWrap>
                        <img
                          src={person.avatar}
                          alt=""
                          className="size-8 rounded-full object-cover"
                        />
                        <Stack space={0}>
                          <Text weight="semibold">{person.name}</Text>
                          <Text variant="muted" size="xs">
                            {person.position}
                          </Text>
                        </Stack>
                      </Inline>
                    </Table.Cell>
                    <Table.Cell>{person.email}</Table.Cell>
                    <Table.Cell>
                      {roles[i] === 'Master' ? (
                        <Badge variant="master">Master</Badge>
                      ) : roles[i] === 'Admin' ? (
                        <Badge variant="admin">Admin</Badge>
                      ) : (
                        <Text size="sm">{roles[i]}</Text>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={statusVariant[statuses[i]]}>
                        {statuses[i]}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="sm" variant="muted">
                        {lastActive[i]}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <ActionMenu aria-label={`Actions for ${person.name}`}>
                        <ActionMenu.Item id="edit">Edit role</ActionMenu.Item>
                        <ActionMenu.Item id="resend">
                          Resend invite
                        </ActionMenu.Item>
                        <ActionMenu.Item id="suspend">Suspend</ActionMenu.Item>
                        <ActionMenu.Item id="remove" variant="destructive">
                          Remove from workspace
                        </ActionMenu.Item>
                      </ActionMenu>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>Pending invitations</Panel.Title>
            <Panel.Description>
              People who have been invited but haven&apos;t accepted yet.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="secondary">
                <MailPlus /> Invite more
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content bleed>
            <Table aria-label="Pending invitations" selectionMode="none">
              <Table.Header>
                <Table.Column rowHeader>Email</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Invited by</Table.Column>
                <Table.Column>Sent</Table.Column>
                <Table.Column alignX="right">&nbsp;</Table.Column>
              </Table.Header>
              <Table.Body>
                {pendingInvites.map(invite => (
                  <Table.Row key={invite.email}>
                    <Table.Cell>
                      <Text weight="semibold">{invite.email}</Text>
                    </Table.Cell>
                    <Table.Cell>{invite.role}</Table.Cell>
                    <Table.Cell>{invite.invitedBy}</Table.Cell>
                    <Table.Cell>
                      <Text size="sm" variant="muted">
                        {invite.sent}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Inline space={1} alignX="right" alignY="center">
                        <Button variant="ghost">Resend</Button>
                        <Button variant="destructive-ghost">Revoke</Button>
                      </Inline>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Panel.Content>
        </Panel>
      </Stack>
    </Stack>
  </Inset>
);

export default UsersPage;
