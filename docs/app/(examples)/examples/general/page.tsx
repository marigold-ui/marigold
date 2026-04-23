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
        <Text>
          Organization details, regional defaults, and workspace-wide
          notifications.
        </Text>
      </Stack>
      <Form>
        <Stack space="section">
          <Panel size="form">
            <Panel.Header>
              <Panel.Title>Organization</Panel.Title>
              <Panel.Description>
                Public details shown on your event pages, tickets, and invoices.
              </Panel.Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <TextField
                  label="Organization name"
                  defaultValue="Riverside Events GmbH"
                  description="Appears on tickets, invoices, and your public organizer profile."
                />
                <TextField
                  label="Organizer page URL"
                  defaultValue="riverside-events"
                  description="Your public event listing lives at events.example.com/riverside-events."
                />
                <TextArea
                  label="About"
                  defaultValue="Riverside Events produces conferences, workshops, and festivals across the DACH region since 2011. We believe great events start with seamless organization."
                  description="Shown on your public organizer page. Attendees see this when browsing your upcoming events."
                  rows={3}
                />
                <Inline space="related">
                  <TextField
                    label="Contact email"
                    type="email"
                    defaultValue="info@riverside-events.de"
                    description="Printed on tickets and shown on event pages so attendees know where to reach you."
                    width="1/2"
                  />
                  <TextField
                    label="Contact phone"
                    type="tel"
                    defaultValue="+49 761 555 0800"
                    description="Optional. Displayed alongside your email on event pages and order confirmations."
                    width="1/2"
                  />
                </Inline>
                <TextField
                  label="Website"
                  type="url"
                  defaultValue="https://riverside-events.de"
                  description="Linked from your organizer profile and event footers."
                />
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel size="form">
            <Panel.Header>
              <Panel.Title>Regional defaults</Panel.Title>
              <Panel.Description>
                Control how dates, times, and currencies display across your
                events and reports. Individual events can override these.
              </Panel.Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Select
                  label="Language"
                  defaultValue="de-DE"
                  description="Default language for new event pages, confirmation emails, and ticket PDFs."
                >
                  <Select.Option id="de-DE">Deutsch</Select.Option>
                  <Select.Option id="en-US">English (US)</Select.Option>
                  <Select.Option id="en-GB">English (UK)</Select.Option>
                  <Select.Option id="fr-FR">Français</Select.Option>
                  <Select.Option id="es-ES">Español</Select.Option>
                </Select>
                <Select
                  label="Timezone"
                  defaultValue="Europe/Berlin"
                  description="Applied to new events and used for timestamps in reports and audit logs."
                >
                  <Select.Option id="Europe/Berlin">
                    Europe/Berlin (CET)
                  </Select.Option>
                  <Select.Option id="Europe/Zurich">
                    Europe/Zurich (CET)
                  </Select.Option>
                  <Select.Option id="Europe/Vienna">
                    Europe/Vienna (CET)
                  </Select.Option>
                  <Select.Option id="Europe/London">
                    Europe/London (GMT)
                  </Select.Option>
                  <Select.Option id="America/New_York">
                    America/New_York (EST)
                  </Select.Option>
                </Select>
                <Inline space="related">
                  <Select
                    label="Date format"
                    defaultValue="eu"
                    description="Used on event listings, tickets, and confirmation emails."
                    width="1/2"
                  >
                    <Select.Option id="eu">22.04.2026</Select.Option>
                    <Select.Option id="iso">2026-04-22</Select.Option>
                    <Select.Option id="us">04/22/2026</Select.Option>
                  </Select>
                  <Select
                    label="Time format"
                    defaultValue="24h"
                    description="Applies to event schedules, check-in logs, and reports."
                    width="1/2"
                  >
                    <Select.Option id="24h">24-hour (14:30)</Select.Option>
                    <Select.Option id="12h">12-hour (2:30 PM)</Select.Option>
                  </Select>
                </Inline>
                <Inline space="related">
                  <Select
                    label="Currency"
                    defaultValue="EUR"
                    description="Default for ticket prices and financial reports."
                    width="1/2"
                  >
                    <Select.Option id="EUR">Euro (EUR)</Select.Option>
                    <Select.Option id="CHF">Swiss Franc (CHF)</Select.Option>
                    <Select.Option id="GBP">British Pound (GBP)</Select.Option>
                    <Select.Option id="USD">US Dollar (USD)</Select.Option>
                  </Select>
                  <Select
                    label="Week starts on"
                    defaultValue="monday"
                    description="Affects calendar views in the event planner and date pickers."
                    width="1/2"
                  >
                    <Select.Option id="monday">Monday</Select.Option>
                    <Select.Option id="sunday">Sunday</Select.Option>
                  </Select>
                </Inline>
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel size="form">
            <Panel.Header>
              <Panel.Title>Email notifications</Panel.Title>
              <Panel.Description>
                Workspace-wide emails sent to all admins. Individual team
                members can adjust their own preferences in their profile.
              </Panel.Description>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Select
                  label="Digest frequency"
                  defaultValue="weekly"
                  description="Bundles activity updates into a single email instead of sending them one by one."
                  width={64}
                >
                  <Select.Option id="daily" textValue="Daily">
                    <Text slot="label">Daily</Text>
                    <Text slot="description" fontSize="xs">
                      Sent every morning with the previous day's activity
                    </Text>
                  </Select.Option>
                  <Select.Option id="weekly" textValue="Weekly">
                    <Text slot="label">Weekly</Text>
                    <Text slot="description" fontSize="xs">
                      Sent every Monday with the past week's summary
                    </Text>
                  </Select.Option>
                  <Select.Option id="monthly" textValue="Monthly">
                    <Text slot="label">Monthly</Text>
                    <Text slot="description" fontSize="xs">
                      Sent on the 1st with last month's highlights
                    </Text>
                  </Select.Option>
                  <Select.Option id="never" textValue="Never">
                    <Text slot="label">Never</Text>
                    <Text slot="description" fontSize="xs">
                      No digest emails; check the dashboard instead
                    </Text>
                  </Select.Option>
                </Select>
                <Checkbox.Group
                  label="Send workspace emails for"
                  defaultValue={['security', 'billing']}
                >
                  <Checkbox
                    value="security"
                    label="Security alerts"
                    description="Sign-ins from new devices, password resets, and permission changes."
                  />
                  <Checkbox
                    value="billing"
                    label="Billing and payouts"
                    description="Invoices, failed charges, payout confirmations, and plan renewals."
                  />
                  <Checkbox
                    value="product"
                    label="Product updates"
                    description="New features, platform improvements, and scheduled maintenance windows."
                  />
                  <Checkbox
                    value="insights"
                    label="Monthly event insights"
                    description="Summary of ticket sales, attendance trends, and top-performing events."
                  />
                </Checkbox.Group>
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel size="form" variant="destructive">
            <Panel.Header>
              <Panel.Title>Danger zone</Panel.Title>
            </Panel.Header>
            <Panel.Content>
              <Stack space={1}>
                <Text weight="semibold">Delete this workspace</Text>
                <Text variant="muted" size="sm">
                  Permanently removes the workspace including all team members,
                  events, ticket data, and financial records. Active ticket
                  holders will lose access to their bookings. This cannot be
                  undone.
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
