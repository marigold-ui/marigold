'use client';

import {
  Button,
  Checkbox,
  Form,
  Headline,
  Inline,
  Inset,
  Panel,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

const GeneralPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>General</Headline>
        <Text>Workspace details, regional defaults, and notifications.</Text>
      </Stack>
      <Form>
        <Stack space="section">
          <Panel size="form">
            <Panel.Header>
              <Panel.Title>Workspace</Panel.Title>
              <Panel.Description>
                How your workspace appears across Marigold.
              </Panel.Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <TextField label="Workspace name" defaultValue="Acme Inc." />
                <TextField
                  label="Workspace URL"
                  description="Used in shareable links and invites."
                  defaultValue="acme"
                />
                <TextArea
                  label="Description"
                  description="Shown on the workspace profile and in search results."
                  defaultValue="The Acme team ships events, tickets, and good vibes since 1942."
                  rows={3}
                />
                <TextField label="Support email" type="email" />
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel size="form">
            <Panel.Header>
              <Panel.Title>Regional settings</Panel.Title>
              <Panel.Description>
                Defaults for dates, numbers, and language across the app.
              </Panel.Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Select
                  label="Language"
                  defaultValue="en-US"
                  description="Used for UI copy and emails."
                >
                  <Select.Option id="en-US">English (US)</Select.Option>
                  <Select.Option id="en-GB">English (UK)</Select.Option>
                  <Select.Option id="de-DE">Deutsch</Select.Option>
                  <Select.Option id="fr-FR">Français</Select.Option>
                  <Select.Option id="es-ES">Español</Select.Option>
                </Select>
                <Select label="Timezone" defaultValue="Europe/Berlin">
                  <Select.Option id="Europe/Berlin">
                    Europe/Berlin (UTC+1)
                  </Select.Option>
                  <Select.Option id="Europe/London">
                    Europe/London (UTC)
                  </Select.Option>
                  <Select.Option id="America/New_York">
                    America/New_York (UTC−5)
                  </Select.Option>
                  <Select.Option id="America/Los_Angeles">
                    America/Los_Angeles (UTC−8)
                  </Select.Option>
                  <Select.Option id="Asia/Tokyo">
                    Asia/Tokyo (UTC+9)
                  </Select.Option>
                </Select>
                <Inline space="related" noWrap>
                  <Select label="Date format" defaultValue="iso" width="1/2">
                    <Select.Option id="iso">2026-04-22</Select.Option>
                    <Select.Option id="eu">22.04.2026</Select.Option>
                    <Select.Option id="us">04/22/2026</Select.Option>
                  </Select>
                  <Select label="Time format" defaultValue="24h" width="1/2">
                    <Select.Option id="24h">24-hour</Select.Option>
                    <Select.Option id="12h">12-hour</Select.Option>
                  </Select>
                </Inline>
                <Select label="Currency" defaultValue="EUR">
                  <Select.Option id="EUR">Euro (€)</Select.Option>
                  <Select.Option id="USD">US Dollar ($)</Select.Option>
                  <Select.Option id="GBP">British Pound (£)</Select.Option>
                  <Select.Option id="CHF">Swiss Franc (CHF)</Select.Option>
                </Select>
                <Select label="Week starts on" defaultValue="monday">
                  <Select.Option id="monday">Monday</Select.Option>
                  <Select.Option id="sunday">Sunday</Select.Option>
                </Select>
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel size="form">
            <Panel.Header>
              <Panel.Title>Notifications</Panel.Title>
              <Panel.Description>
                Choose when Marigold emails everyone on the workspace.
              </Panel.Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Select label="Email digest frequency" defaultValue="weekly">
                  <Select.Option id="daily">Daily</Select.Option>
                  <Select.Option id="weekly">Weekly</Select.Option>
                  <Select.Option id="monthly">Monthly</Select.Option>
                  <Select.Option id="never">Never</Select.Option>
                </Select>
                <Checkbox.Group
                  label="Send workspace-wide emails for"
                  defaultValue={['security', 'billing']}
                >
                  <Checkbox
                    value="security"
                    label="Security alerts"
                    description="Sign-ins from new devices, password changes, 2FA events."
                  />
                  <Checkbox
                    value="billing"
                    label="Billing updates"
                    description="Invoices, failed payments, plan changes."
                  />
                  <Checkbox
                    value="product"
                    label="Product announcements"
                    description="New features and release notes."
                  />
                  <Checkbox
                    value="newsletter"
                    label="Monthly newsletter"
                    description="Customer stories and tips from the Marigold team."
                  />
                </Checkbox.Group>
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel size="form" variant="destructive">
            <Panel.Title>Danger zone</Panel.Title>
            <Panel.Content>
              <Stack space={1}>
                <Text weight="semibold">Delete this workspace</Text>
                <Text variant="muted" size="sm">
                  Permanently removes the workspace, all its members, events,
                  and data. This cannot be undone.
                </Text>
              </Stack>
            </Panel.Content>
            <Panel.Footer>
              <Button variant="destructive">Delete workspace</Button>
            </Panel.Footer>
          </Panel>

          <Inline space="regular">
            <Button variant="primary" type="submit">
              Save changes
            </Button>
            <Button variant="secondary" type="reset">
              Cancel
            </Button>
          </Inline>
        </Stack>
      </Form>
    </Stack>
  </Inset>
);

export default GeneralPage;
