'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Stack,
  Switch,
  Text,
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
    <Card variant="master" p={4}>
      <Stack space="regular">
        <Stack space="tight">
          <Inline space={2} alignY="center">
            <Headline level={3}>Co-organizers</Headline>
            <Badge variant="master">Master</Badge>
          </Inline>
          <Text>
            Add co-organizers to share event management responsibilities.
          </Text>
        </Stack>
        <Switch
          label="This event has co-organizers"
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
                    width="1/2"
                    errorMessage="Please enter the co-organizer's name."
                  />
                  <TextField
                    label="Email"
                    type="email"
                    width="1/2"
                    errorMessage="A valid email address is required."
                  />
                </Inline>
                <TextField
                  label="Role"
                  description="Their responsibility for this event."
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
            <Button variant="secondary" onPress={addEntry}>
              Add another co-organizer
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};
