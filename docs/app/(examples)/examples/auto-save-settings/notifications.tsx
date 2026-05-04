'use client';

import { Panel, Stack, Switch } from '@marigold/components';
import { useAutoSaveSwitch } from './useAutoSaveSwitch';

export const Notifications = () => {
  const email = useAutoSaveSwitch(true, 'Email notifications');
  const marketing = useAutoSaveSwitch(false, 'Marketing emails');
  const weekly = useAutoSaveSwitch(true, 'Weekly report');

  return (
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
            selected={email.selected}
            onChange={email.onChange}
          />
          <Switch
            variant="settings"
            label="Marketing emails"
            description="Get occasional updates about new features and promotions."
            selected={marketing.selected}
            onChange={marketing.onChange}
          />
          <Switch
            variant="settings"
            label="Weekly report"
            description="A Monday-morning summary of registrations, revenue, and waitlist movement."
            selected={weekly.selected}
            onChange={weekly.onChange}
          />
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
