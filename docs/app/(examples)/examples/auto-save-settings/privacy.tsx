'use client';

import { Panel, Stack, Switch } from '@marigold/components';

export const Privacy = () => (
  <Panel size="form" headingLevel={3}>
    <Panel.Header>
      <Panel.Title>Privacy</Panel.Title>
      <Panel.Description>
        Control what's visible on your public organizer page.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Switch
          variant="settings"
          label="Public organizer profile"
          description="Show your name, bio, and contact details on the public event page."
          defaultSelected
        />
        <Switch
          variant="settings"
          label="Search engine indexing"
          description="Allow search engines to display your public event pages in search results."
          defaultSelected
        />
        <Switch
          variant="settings"
          label="Share aggregated analytics"
          description="Contribute anonymized usage data to help improve event recommendations."
        />
      </Stack>
    </Panel.Content>
  </Panel>
);
