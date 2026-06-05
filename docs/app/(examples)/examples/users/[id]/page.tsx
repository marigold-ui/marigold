'use client';

import { people } from '@/lib/data/people';
import { teamName } from '@/lib/data/teams';
import type { ReactNode } from 'react';
import { notFound, useParams } from 'next/navigation';
import {
  ActionMenu,
  Badge,
  Button,
  ButtonGroup,
  Columns,
  DateFormat,
  Description,
  Divider,
  Inline,
  Page,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';

// The member detail is the drill-in from the Users list (the "Detail / record"
// layout): a primary column with the member's content and a narrower secondary
// "Overview" column for status and metadata. Because `Page.Header` has no slot
// for a status badge, the member's state lives in that secondary panel.
const statusVariant = {
  active: 'success',
  invited: 'info',
  suspended: 'error',
} as const;

const activity = [
  {
    id: 'a1',
    date: '2026-06-01',
    text: 'Merged "Refine Page header spacing".',
  },
  { id: 'a2', date: '2026-05-28', text: 'Reviewed 4 pull requests.' },
  {
    id: 'a3',
    date: '2026-05-24',
    text: 'Published the Panel slot guidelines.',
  },
  {
    id: 'a4',
    date: '2026-05-19',
    text: 'Joined the Design Systems team sync.',
  },
];

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <Stack space="tight">
    <Text variant="muted" fontSize="xs">
      {label}
    </Text>
    <Text weight="semibold">{children}</Text>
  </Stack>
);

const UserDetailPage = () => {
  const params = useParams<{ id: string }>();
  const person = people.find(p => p.id === params.id);

  if (!person) notFound();

  return (
    <Page>
      <Page.Header>
        <Title>{person.name}</Title>
        <Description>{person.position}</Description>
        <ButtonGroup aria-label="Member actions">
          <Button variant="primary">Edit profile</Button>
          <ActionMenu size="icon" aria-label="More actions">
            <ActionMenu.Item id="deactivate">Deactivate</ActionMenu.Item>
            <ActionMenu.Item id="remove" variant="destructive">
              Remove member
            </ActionMenu.Item>
          </ActionMenu>
        </ButtonGroup>
      </Page.Header>

      <Columns columns={[2, 1]} space="group" collapseAt="60rem">
        {/* Primary column: the member's content */}
        <Stack space="group">
          <Panel>
            <Panel.Header>
              <Title>Profile</Title>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Inline space="regular" alignY="center" noWrap>
                  <img
                    src={person.avatar}
                    alt=""
                    className="block size-20 shrink-0 rounded-full"
                  />
                  <Stack space="collapsed">
                    <Text fontSize="lg" weight="semibold">
                      {person.name}
                    </Text>
                    <Text variant="muted">{person.position}</Text>
                  </Stack>
                </Inline>
                <Divider />
                <Stack space="regular">
                  <Field label="Email">{person.email}</Field>
                  <Field label="Location">{person.location}</Field>
                  <Field label="Team">{teamName(person.team)}</Field>
                  <Field label="Joined">
                    <DateFormat
                      value={new Date(person.joined)}
                      dateStyle="medium"
                    />
                  </Field>
                </Stack>
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel>
            <Panel.Header>
              <Title>Recent activity</Title>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                {activity.map(entry => (
                  <Inline key={entry.id} space="regular" alignY="center" noWrap>
                    <Text variant="muted" fontSize="sm">
                      <DateFormat
                        value={new Date(entry.date)}
                        dateStyle="medium"
                      />
                    </Text>
                    <Text>{entry.text}</Text>
                  </Inline>
                ))}
              </Stack>
            </Panel.Content>
          </Panel>
        </Stack>

        {/* Secondary column: status and at-a-glance metadata */}
        <Panel>
          <Panel.Header>
            <Title>Overview</Title>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <Inline space="related" alignY="center">
                <Badge variant={statusVariant[person.status]}>
                  {person.status}
                </Badge>
              </Inline>
              <Field label="Role">{person.role}</Field>
              <Field label="Team">{teamName(person.team)}</Field>
              <Field label="Last active">
                <DateFormat
                  value={new Date(person.lastActive)}
                  dateStyle="medium"
                />
              </Field>
            </Stack>
          </Panel.Content>
        </Panel>
      </Columns>
    </Page>
  );
};

export default UserDetailPage;
