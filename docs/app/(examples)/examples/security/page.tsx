'use client';

import { Laptop, LogOut, Smartphone, Tablet } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Form,
  Headline,
  IconButton,
  Inline,
  Inset,
  Panel,
  Stack,
  Switch,
  Text,
  TextField,
  Tiles,
} from '@marigold/components';

const sessions = [
  {
    id: 'current',
    device: 'MacBook Pro',
    browser: 'Chrome 129 on macOS',
    location: 'Berlin, Germany',
    lastActive: 'Now',
    icon: Laptop,
    current: true,
  },
  {
    id: 'iphone',
    device: "Jane's iPhone",
    browser: 'Safari on iOS 18',
    location: 'Berlin, Germany',
    lastActive: '2 hours ago',
    icon: Smartphone,
    current: false,
  },
  {
    id: 'ipad',
    device: 'iPad Air',
    browser: 'Safari on iPadOS 18',
    location: 'Hamburg, Germany',
    lastActive: '3 days ago',
    icon: Tablet,
    current: false,
  },
  {
    id: 'desktop',
    device: 'Office Desktop',
    browser: 'Firefox 130 on Windows 11',
    location: 'Berlin, Germany',
    lastActive: '1 week ago',
    icon: Laptop,
    current: false,
  },
];

const SecurityPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Security</Headline>
        <Text>
          Keep your account safe by rotating your password and reviewing active
          sessions.
        </Text>
      </Stack>
      <Stack space="section">
        <Panel size="form">
          <Panel.Header>
            <Panel.Title>Password</Panel.Title>
            <Panel.Description>
              Use at least 12 characters with a mix of letters, numbers, and
              symbols.
            </Panel.Description>
          </Panel.Header>
          <Panel.Content>
            <Form>
              <Stack space="regular">
                <TextField label="Current password" type="password" required />
                <TextField label="New password" type="password" required />
                <TextField
                  label="Confirm new password"
                  type="password"
                  required
                />
                <Inline space="regular">
                  <Button variant="primary" type="submit">
                    Update password
                  </Button>
                  <Button variant="secondary" type="reset">
                    Cancel
                  </Button>
                </Inline>
              </Stack>
            </Form>
          </Panel.Content>
        </Panel>

        <Panel size="form">
          <Panel.Header>
            <Panel.Title>Two-factor authentication</Panel.Title>
            <Panel.Description>
              Add a second step to sign-in so a leaked password isn&apos;t
              enough to get in.
            </Panel.Description>
            <Panel.HeaderActions>
              <Badge variant="success">Enabled</Badge>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <Switch
                label="Authenticator app"
                description="Use a TOTP app like 1Password, Authy, or Google Authenticator."
                defaultSelected
              />
              <Switch
                label="SMS backup"
                description="Send a code to +49 ••• ••• 2041 if your authenticator is unavailable."
              />
              <Inline space="regular">
                <Button variant="secondary">View recovery codes</Button>
                <Button variant="secondary">Reset 2FA device</Button>
              </Inline>
            </Stack>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>Active sessions</Panel.Title>
            <Panel.Description>
              Devices currently signed in to your account. Sign out anything you
              don&apos;t recognize.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="secondary">
                <LogOut /> Sign out all others
              </Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content>
            <Tiles tilesWidth="320px" space={4}>
              {sessions.map(session => {
                const Icon = session.icon;
                return (
                  <Card key={session.id} stretch>
                    <Stack space="regular" stretch>
                      <Inline space={4} alignY="center" noWrap>
                        <div className="bg-muted grid size-10 shrink-0 place-items-center rounded-full">
                          <Icon className="size-5" strokeWidth={1.5} />
                        </div>
                        <Stack space={1}>
                          <Inline space={2} alignY="center">
                            <Text weight="semibold">{session.device}</Text>
                            {session.current ? (
                              <Badge variant="success">This device</Badge>
                            ) : null}
                          </Inline>
                          <Text variant="muted" size="sm">
                            {session.browser}
                          </Text>
                        </Stack>
                      </Inline>
                      <Stack space={1}>
                        <Text size="sm">{session.location}</Text>
                        <Text variant="muted" size="xs">
                          Last active {session.lastActive}
                        </Text>
                      </Stack>
                      {session.current ? null : (
                        <Inline alignX="right">
                          <IconButton aria-label={`Sign out ${session.device}`}>
                            <LogOut />
                          </IconButton>
                        </Inline>
                      )}
                    </Stack>
                  </Card>
                );
              })}
            </Tiles>
          </Panel.Content>
        </Panel>

        <Panel variant="destructive">
          <Panel.Title>Danger zone</Panel.Title>
          <Panel.Content>
            <Stack space={1}>
              <Text weight="semibold">Revoke all API keys</Text>
              <Text variant="muted" size="sm">
                Invalidates every personal access token tied to this account.
                Integrations using these keys will stop working immediately.
              </Text>
            </Stack>
          </Panel.Content>
          <Panel.Footer>
            <Button variant="destructive">Revoke all keys</Button>
          </Panel.Footer>
        </Panel>
      </Stack>
    </Stack>
  </Inset>
);

export default SecurityPage;
