'use client';

import { people } from '@/lib/data/people';
import { Plus, Users } from 'lucide-react';
import {
  ActionMenu,
  Badge,
  Button,
  Card,
  Checkbox,
  Form,
  Headline,
  Inline,
  Inset,
  LinkButton,
  Panel,
  Select,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

type MemberPreview = { id: string; avatar: string; name: string };

type Team = {
  id: string;
  name: string;
  description: string;
  members: MemberPreview[];
  totalMembers: number;
  events: number;
  tag?: 'master' | 'admin';
};

const membersByIds = (ids: ReadonlyArray<string>): MemberPreview[] =>
  ids.map(id => {
    const person = people.find(p => p.id === id)!;
    return { id: person.id, avatar: person.avatar, name: person.name };
  });

const teams: Team[] = [
  {
    id: 'design',
    name: 'Design System',
    description: 'Owns tokens, components, and the Marigold docs.',
    members: membersByIds(['chippy', 'token', 'sandy']),
    totalMembers: 6,
    events: 12,
    tag: 'master',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Ships the ticketing platform and internal tooling.',
    members: membersByIds(['pipes', 'gizmo', 'crash']),
    totalMembers: 14,
    events: 48,
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Reporting, dashboards, and experiment analysis.',
    members: membersByIds(['query', 'gizmo']),
    totalMembers: 5,
    events: 9,
    tag: 'admin',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Campaigns, customer comms, and the Marigold blog.',
    members: membersByIds(['flex', 'sandy']),
    totalMembers: 8,
    events: 20,
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: 'Answers tickets and shepherds customer feedback home.',
    members: membersByIds(['crash', 'flex', 'chippy']),
    totalMembers: 11,
    events: 0,
  },
  {
    id: 'ops',
    name: 'Operations',
    description: 'People ops, finance, and everything behind the scenes.',
    members: membersByIds(['sandy', 'token']),
    totalMembers: 4,
    events: 3,
  },
];

const MemberAvatars = ({
  members,
  total,
}: {
  members: MemberPreview[];
  total: number;
}) => {
  const shown = members.slice(0, 3);
  const extra = Math.max(0, total - shown.length);
  return (
    <Inline space={0} alignY="center">
      <div className="flex -space-x-2">
        {shown.map(member => (
          <img
            key={member.id}
            src={member.avatar}
            alt={member.name}
            className="ring-background size-8 rounded-full object-cover ring-2"
          />
        ))}
        {extra > 0 ? (
          <div className="ring-background bg-muted grid size-8 place-items-center rounded-full text-xs font-semibold ring-2">
            +{extra}
          </div>
        ) : null}
      </div>
    </Inline>
  );
};

const TeamsPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Teams</Headline>
        <Text>
          Group people who work together. Teams share ownership of events,
          dashboards, and permissions.
        </Text>
      </Stack>
      <Stack space="section">
        <Panel>
          <Panel.Header>
            <Panel.Title>Your teams</Panel.Title>
            <Panel.Description>
              Every team you belong to in the Acme workspace.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="primary">
                <Plus /> Create team
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Tiles tilesWidth="320px" space={4} equalHeight>
              {teams.map(team => (
                <Card key={team.id} variant={team.tag ?? 'default'} stretch>
                  <Stack space="regular" stretch>
                    <Stack space={2}>
                      <Inline space={2} alignY="center">
                        <Headline level={4}>{team.name}</Headline>
                        {team.tag === 'master' ? (
                          <Badge variant="master">Master</Badge>
                        ) : team.tag === 'admin' ? (
                          <Badge variant="admin">Admin</Badge>
                        ) : null}
                      </Inline>
                      <Text variant="muted" size="sm">
                        {team.description}
                      </Text>
                    </Stack>
                    <Inline space={4} alignY="center">
                      <MemberAvatars
                        members={team.members}
                        total={team.totalMembers}
                      />
                      <Text size="sm" variant="muted">
                        <Users className="inline size-4 align-[-2px]" />{' '}
                        {team.totalMembers} members
                      </Text>
                    </Inline>
                    <Inline space={2} alignY="center" alignX="between">
                      <Text size="xs" variant="muted">
                        {team.events === 0
                          ? 'No events yet'
                          : `${team.events} events`}
                      </Text>
                      <Inline space={1} alignY="center">
                        <LinkButton href="#" variant="ghost">
                          Open
                        </LinkButton>
                        <ActionMenu aria-label={`Actions for ${team.name}`}>
                          <ActionMenu.Item id="rename">Rename</ActionMenu.Item>
                          <ActionMenu.Item id="members">
                            Manage members
                          </ActionMenu.Item>
                          <ActionMenu.Item id="archive">
                            Archive
                          </ActionMenu.Item>
                          <ActionMenu.Item id="delete" variant="destructive">
                            Delete team
                          </ActionMenu.Item>
                        </ActionMenu>
                      </Inline>
                    </Inline>
                  </Stack>
                </Card>
              ))}
            </Tiles>
          </Panel.Content>
        </Panel>

        <Panel size="form">
          <Panel.Header>
            <Panel.Title>Team defaults</Panel.Title>
            <Panel.Description>
              Settings applied to every new team created in this workspace.
            </Panel.Description>
          </Panel.Header>
          <Panel.Content>
            <Form>
              <Stack space="regular">
                <Select
                  label="Default team visibility"
                  defaultValue="workspace"
                  description="Who can see a team before being added to it."
                >
                  <Select.Option id="workspace">
                    Visible to the whole workspace
                  </Select.Option>
                  <Select.Option id="private">
                    Private (visible to members only)
                  </Select.Option>
                </Select>
                <Select
                  label="Default role for new members"
                  defaultValue="editor"
                >
                  <Select.Option id="admin">Admin</Select.Option>
                  <Select.Option id="editor">Editor</Select.Option>
                  <Select.Option id="viewer">Viewer</Select.Option>
                </Select>
                <Checkbox.Group
                  label="Allow team leads to"
                  defaultValue={['invite', 'rename']}
                >
                  <Checkbox
                    value="invite"
                    label="Invite new members directly"
                  />
                  <Checkbox value="rename" label="Rename the team" />
                  <Checkbox
                    value="billing"
                    label="See team-scoped billing activity"
                  />
                  <Checkbox value="delete" label="Archive or delete the team" />
                </Checkbox.Group>
              </Stack>
            </Form>
          </Panel.Content>
        </Panel>
      </Stack>
    </Stack>
  </Inset>
);

export default TeamsPage;
