'use client';

import { useState } from 'react';
import {
  Button,
  DateFormat,
  Description,
  Form,
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
import { daysAgo } from '../../_shared/demo-data';

// A function, so the dates are worked out on every render, not once per server.
const getSessions = () => [
  {
    id: 'sess-1',
    device: 'MacBook Pro',
    browser: 'Chrome',
    location: 'Berlin, Germany',
    lastActive: daysAgo(0),
    current: true,
  },
  {
    id: 'sess-2',
    device: 'iPhone 15',
    browser: 'Safari',
    location: 'Berlin, Germany',
    lastActive: daysAgo(1),
    current: false,
  },
  {
    id: 'sess-3',
    device: 'Windows PC',
    browser: 'Edge',
    location: 'Munich, Germany',
    lastActive: daysAgo(13),
    current: false,
  },
];

const SecurityPage = () => {
  const { addToast } = useToast();
  const [newPassword, setNewPassword] = useState('');

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
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <TextField
                label="Current password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                width={56}
              />
              <TextField
                label="New password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                description="At least 12 characters."
                required
                minLength={12}
                value={newPassword}
                onChange={setNewPassword}
                width={56}
              />
              <TextField
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                validate={value =>
                  value && value !== newPassword
                    ? 'The passwords do not match.'
                    : null
                }
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
              {getSessions().map(session => (
                <Table.Row key={session.id}>
                  <Table.Cell textValue={session.device}>
                    <Stack>
                      <Text weight="semibold">{session.device}</Text>
                      <Text variant="muted" fontSize="xs">
                        {session.current
                          ? `${session.browser} · This device`
                          : session.browser}
                      </Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>{session.location}</Table.Cell>
                  <Table.Cell>
                    <DateFormat value={session.lastActive} dateStyle="medium" />
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
