import { useState } from 'react';
import { Button, SectionMessage, Stack, TextArea } from '@marigold/components';

export default () => {
  const [attempt, setAttempt] = useState(0);

  return (
    <Stack space={4} alignX="left">
      <TextArea
        label="Team bio"
        defaultValue="We help local creators run unforgettable events."
      />
      <Button variant="primary" onPress={() => setAttempt(n => n + 1)}>
        Save changes
      </Button>
      {attempt > 0 && (
        <SectionMessage key={attempt} variant="error">
          <SectionMessage.Title>Couldn't save changes</SectionMessage.Title>
          <SectionMessage.Content>
            The server is temporarily unavailable. Your team bio has not been
            updated yet. We've kept your draft here so you can try again in a
            moment.
          </SectionMessage.Content>
        </SectionMessage>
      )}
    </Stack>
  );
};
