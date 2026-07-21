'use client';

import { people } from '@/lib/data/people';
import type { Person } from '@/lib/data/people';
import { teams } from '@/lib/data/teams';
import { Plus } from 'lucide-react';
import {
  Button,
  Card,
  Description,
  Inline,
  Page,
  Stack,
  Text,
  Tiles,
  Title,
} from '@marigold/components';

const membersOf = (memberIds: readonly string[]): Person[] =>
  memberIds
    .map(id => people.find(person => person.id === id))
    .filter((person): person is Person => person !== undefined);

const TeamsPage = () => (
  <Page>
    <Page.Header>
      <Title>Teams</Title>
      <Description>Group members into teams and assign their work.</Description>
      <Button variant="primary">
        <Plus />
        Create team
      </Button>
    </Page.Header>

    <Tiles stretch equalHeight tilesWidth="20rem" space="regular">
      {teams.map(team => {
        const members = membersOf(team.memberIds);
        return (
          <Card key={team.id} stretch>
            <Card.Content>
              <Stack space="tight">
                <Text fontSize="xl" weight="semibold">
                  {team.name}
                </Text>
                <Text variant="muted" fontSize="sm">
                  {team.description}
                </Text>
              </Stack>
            </Card.Content>
            <Card.Footer>
              <Inline space="related" alignY="center" noWrap>
                <Inline space="collapsed" alignY="center" noWrap>
                  {members.map(member => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      className="block size-8 rounded-full ring-2 ring-white"
                    />
                  ))}
                </Inline>
                <Text variant="muted" fontSize="sm">
                  {members.length === 1
                    ? '1 member'
                    : `${members.length} members`}
                </Text>
              </Inline>
            </Card.Footer>
          </Card>
        );
      })}
    </Tiles>
  </Page>
);

export default TeamsPage;
