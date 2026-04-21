'use client';

import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Headline,
  Inline,
  Inset,
  NumberField,
  Select,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

const GeneralInformation = () => (
  <Card p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>General information</Headline>
        <Text>Basic details applied to all new events.</Text>
      </Stack>
      <Form>
        <Stack space="regular">
          <TextField
            label="Default Event Name Prefix"
            defaultValue="Riverside"
            description="Prepended to every new event title."
          />
          <Select label="Default Event Type" defaultValue="conference">
            <Select.Option id="conference">Conference</Select.Option>
            <Select.Option id="workshop">Workshop</Select.Option>
            <Select.Option id="meetup">Meetup</Select.Option>
            <Select.Option id="festival">Festival</Select.Option>
            <Select.Option id="concert">Concert</Select.Option>
          </Select>
          <Select label="Default Language" defaultValue="de">
            <Select.Option id="de">German</Select.Option>
            <Select.Option id="en">English</Select.Option>
            <Select.Option id="fr">French</Select.Option>
          </Select>
          <Select label="Default Timezone" defaultValue="europe-berlin">
            <Select.Option id="europe-berlin">Europe/Berlin</Select.Option>
            <Select.Option id="europe-zurich">Europe/Zurich</Select.Option>
            <Select.Option id="europe-vienna">Europe/Vienna</Select.Option>
            <Select.Option id="europe-london">Europe/London</Select.Option>
          </Select>
        </Stack>
      </Form>
      <Divider />
      <Inline space="regular">
        <Button variant="primary">Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  </Card>
);

const RegistrationAndCapacity = () => (
  <Card p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>Registration & capacity</Headline>
        <Text>Default registration behavior for new events.</Text>
      </Stack>
      <Form>
        <Stack space="regular">
          <NumberField
            label="Default Maximum Attendees"
            defaultValue={500}
            minValue={1}
          />
          <Select label="Default Currency" defaultValue="eur">
            <Select.Option id="eur">EUR</Select.Option>
            <Select.Option id="usd">USD</Select.Option>
            <Select.Option id="chf">CHF</Select.Option>
            <Select.Option id="gbp">GBP</Select.Option>
          </Select>
          <Checkbox label="Enable waitlist by default" />
          <Checkbox label="Require registration approval" />
          <Checkbox
            label="Send confirmation emails automatically"
            defaultChecked
          />
        </Stack>
      </Form>
      <Accordion>
        <Accordion.Item id="advanced-registration">
          <Accordion.Header>Advanced registration</Accordion.Header>
          <Accordion.Content>
            <Stack space="regular">
              <TextField
                label="Custom Confirmation Message"
                description="Shown on the confirmation page after registration."
              />
              <NumberField
                label="Registration Close (hours before start)"
                defaultValue={2}
                minValue={0}
                description="Stop accepting registrations this many hours before the event."
              />
              <TextField
                label="Terms & Conditions URL"
                description="Link shown during checkout."
              />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Divider />
      <Inline space="regular">
        <Button variant="primary">Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  </Card>
);

const Notifications = () => (
  <Card p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>Notifications</Headline>
        <Text>Configure when and how you receive notifications.</Text>
      </Stack>
      <Form>
        <Stack space="regular">
          <Select label="Email Digest Frequency" defaultValue="daily">
            <Select.Option id="immediately">Immediately</Select.Option>
            <Select.Option id="daily">Daily</Select.Option>
            <Select.Option id="weekly">Weekly</Select.Option>
          </Select>
          <Checkbox.Group
            label="Notify me about"
            defaultValue={['registrations', 'payments']}
          >
            <Checkbox value="registrations" label="New registrations" />
            <Checkbox value="cancellations" label="Cancellations" />
            <Checkbox value="waitlist" label="Waitlist changes" />
            <Checkbox value="payments" label="Payment received" />
          </Checkbox.Group>
        </Stack>
      </Form>
      <Divider />
      <Inline space="regular">
        <Button variant="primary">Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  </Card>
);

const DangerZone = () => (
  <Card p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>Danger zone</Headline>
        <Text>Permanent actions that affect your event settings.</Text>
      </Stack>
      <Stack space="regular">
        <Inline alignY="center" alignX="between" space="group">
          <Stack space="0.5">
            <Text weight="medium">Reset all defaults</Text>
            <Text size="xs" color="secondary">
              Restores every setting on this page to its factory value. Existing
              events are not affected.
            </Text>
          </Stack>
          <Button variant="destructive">Reset</Button>
        </Inline>
        <Inline alignY="center" alignX="between" space="group">
          <Stack space="0.5">
            <Text weight="medium">Delete all draft events</Text>
            <Text size="xs" color="secondary">
              Permanently removes every unpublished event. Published events and
              past bookings are not affected.
            </Text>
          </Stack>
          <Button variant="destructive">Delete</Button>
        </Inline>
      </Stack>
    </Stack>
  </Card>
);

const SettingsFormPage = () => (
  <Inset space={4}>
    <Stack space="section">
      <Stack space="tight">
        <Headline level={2}>Event Settings</Headline>
        <Text>Configure defaults and preferences for your events.</Text>
      </Stack>
      <div className="max-w-xl">
        <Stack space="section">
          <GeneralInformation />
          <RegistrationAndCapacity />
          <Notifications />
        </Stack>
      </div>
      <DangerZone />
    </Stack>
  </Inset>
);

export default SettingsFormPage;
