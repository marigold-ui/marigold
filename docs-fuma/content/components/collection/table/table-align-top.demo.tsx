'use client';

import { Stack, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Top aligned table" alignY="top" stretch>
      <Table.Header>
        <Table.Column>Event</Table.Column>
        <Table.Column>Description</Table.Column>
        <Table.Column>Location</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Text>Conference</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-001
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Annual Tech Conference</Text>
              <Text>
                Join industry leaders for a day of talks and networking.
              </Text>
              <Text color="muted-foreground" fontSize="xs">
                Registration required
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Berlin</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: City Expo Center
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Workshop</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-002
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={2}>
              <Text weight="bold">React Advanced</Text>
              <Text>
                Hands-on coding session for intermediate React developers.
              </Text>
              <Text color="muted-foreground" fontSize="xs">
                Limited seats available
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Munich</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: TechHub
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Meetup</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-003
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Frontend Community</Text>
              <Text>Monthly meetup for frontend enthusiasts.</Text>
              <Text color="muted-foreground" fontSize="xs">
                Free entry
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Hamburg</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: Innovation Loft
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text> Webinar </Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-004
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Design Systems 101</Text>
              <Text>Online session covering the basics of design systems.</Text>
              <Text color="muted-foreground" fontSize="xs">
                Live Q&A included
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Online</Text>
            <Text color="muted-foreground" fontSize="xs">
              Platform: Zoom
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Hackathon</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-005
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Open Source Sprint</Text>
              <Text>Collaborate and build open source projects in teams.</Text>
              <Text color="muted-foreground" fontSize="xs">
                Prizes for top teams
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Cologne</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: Startup Garage
            </Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
