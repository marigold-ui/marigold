'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Inline,
  Panel,
  Stack,
  Switch,
  TextField,
} from '@marigold/components';

export const CoOrganizers = () => {
  const [enabled, setEnabled] = useState(false);
  const [entries, setEntries] = useState([{ id: 1 }]);

  const addEntry = () => {
    setEntries(prev => [...prev, { id: Date.now() }]);
  };

  const removeEntry = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <Panel variant="master" headingLevel={3} size="form">
      <Panel.Header>
        <Panel.Title>
          <Inline space={2} alignY="center">
            Co-organizers
            <Badge variant="master">Master</Badge>
          </Inline>
        </Panel.Title>
        <Panel.Description>
          Invite team members to help manage this event. Co-organizers can edit
          event details, view registrations, and send attendee communications.
        </Panel.Description>
        {enabled && (
          <Panel.HeaderActions>
            <Button variant="secondary" size="small" onPress={addEntry}>
              Add co-organizer
            </Button>
          </Panel.HeaderActions>
        )}
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <Switch
            label="This event has co-organizers"
            description="Enable to add one or more co-organizers. They receive the same event notifications as the primary organizer."
            selected={enabled}
            onChange={setEnabled}
          />
          {enabled && (
            <Stack space="group">
              {entries.map(entry => (
                <Stack key={entry.id} space="regular">
                  <Inline space="related" noWrap>
                    <TextField
                      label="Name"
                      description="Full name as it should appear on the event page."
                      width="1/2"
                      errorMessage="Please enter the co-organizer's name."
                    />
                    <TextField
                      label="Email"
                      type="email"
                      description="Used to send an invitation and event notifications."
                      width="1/2"
                      errorMessage="A valid email address is required."
                    />
                  </Inline>
                  <TextField
                    label="Role"
                    description="Their responsibility for this event, e.g. 'Stage Manager' or 'Ticket Support'."
                  />
                  {entries.length > 1 && (
                    <Inline alignX="right">
                      <Button
                        variant="destructive-ghost"
                        onPress={() => removeEntry(entry.id)}
                      >
                        Remove
                      </Button>
                    </Inline>
                  )}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
