'use client';

import { Panel, Stack, Switch } from '@marigold/components';

export const Notifications = () => (
  <Panel size="form" headingLevel={3}>
    <Panel.Header>
      <Panel.Title>Notifications</Panel.Title>
      <Panel.Description>
        Choose what triggers an email. Each setting applies the moment you
        toggle it.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Switch
          variant="settings"
          label="Email notifications"
          description="Receive emails when an attendee registers, cancels, or messages you."
          defaultSelected
        />
        <Switch
          variant="settings"
          label="Marketing emails"
          description="Get occasional updates about new features and promotions."
        />
        <Switch
          variant="settings"
          label="Weekly report"
          description="A Monday-morning summary of registrations, revenue, and waitlist movement."
          defaultSelected
        />
      </Stack>
    </Panel.Content>
  </Panel>
);
