'use client';

import {
  Badge,
  Button,
  DateFormat,
  Description,
  Form,
  Inline,
  Page,
  Panel,
  Stack,
  Switch,
  Table,
  Text,
  TextField,
  Title,
  useToast,
} from '@marigold/components';

const sessions = [
  {
    id: 'sess-1',
    device: 'MacBook Pro · Chrome',
    location: 'Berlin, Germany',
    lastActive: '2026-06-02',
    current: true,
  },
  {
    id: 'sess-2',
    device: 'iPhone 15 · Safari',
    location: 'Berlin, Germany',
    lastActive: '2026-06-01',
    current: false,
  },
  {
    id: 'sess-3',
    device: 'Windows · Edge',
    location: 'Munich, Germany',
    lastActive: '2026-05-20',
    current: false,
  },
];

const SecurityPage = () => {
  const { addToast } = useToast();

  return (
    <Page>
      <Page.Header>
        <Title>Security</Title>
        <Description>
          Password, two-factor authentication, and active sessions.
        </Description>
      </Page.Header>

      <Form
        unstyled
        onSubmit={e => {
          e.preventDefault();
          addToast({
            title: 'Password updated',
            description: 'Use your new password the next time you sign in.',
            variant: 'success',
          });
        }}
      >
        <Panel size="form">
          <Panel.Header>
            <Title>Password</Title>
            <Description>Use at least 12 characters.</Description>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <TextField label="Current password" type="password" width={56} />
              <TextField label="New password" type="password" width={56} />
              <TextField
                label="Confirm new password"
                type="password"
                width={56}
              />
            </Stack>
          </Panel.Content>
          <Panel.Footer>
            <Button variant="primary" type="submit">
              Update password
            </Button>
          </Panel.Footer>
        </Panel>
      </Form>

      <Panel size="form">
        <Panel.Header>
          <Title>Two-factor authentication</Title>
          <Description>Add a second step when signing in.</Description>
        </Panel.Header>
        <Panel.Content>
          <Switch
            variant="settings"
            label="Authenticator app"
            description="Require a time-based code from an authenticator app at sign-in."
            defaultSelected
          />
        </Panel.Content>
      </Panel>

      <Panel>
        <Panel.Header>
          <Title>Active sessions</Title>
          <Description>
            Devices currently signed in to your account.
          </Description>
        </Panel.Header>
        <Panel.Content bleed>
          <Table aria-label="Active sessions">
            <Table.Header>
              <Table.Column rowHeader>Device</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Last active</Table.Column>
              <Table.Column alignX="right">&nbsp;</Table.Column>
            </Table.Header>
            <Table.Body>
              {sessions.map(session => (
                <Table.Row key={session.id}>
                  <Table.Cell>
                    <Inline space="related" alignY="center" noWrap>
                      <Text weight="semibold">{session.device}</Text>
                      {session.current && (
                        <Badge variant="success">This device</Badge>
                      )}
                    </Inline>
                  </Table.Cell>
                  <Table.Cell>{session.location}</Table.Cell>
                  <Table.Cell>
                    <DateFormat
                      value={new Date(session.lastActive)}
                      dateStyle="medium"
                    />
                  </Table.Cell>
                  <Table.Cell alignX="right">
                    <Button
                      variant="destructive-ghost"
                      disabled={session.current}
                    >
                      Revoke
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
      </Panel>
    </Page>
  );
};

export default SecurityPage;
