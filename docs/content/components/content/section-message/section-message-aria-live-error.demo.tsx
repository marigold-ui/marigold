import { useState } from 'react';
import { Button, SectionMessage, Stack } from '@marigold/components';

export default () => {
  const [attempt, setAttempt] = useState(0);

  return (
    <Stack space={4}>
      <Button variant="primary" onPress={() => setAttempt(n => n + 1)}>
        Retry payment
      </Button>
      {attempt > 0 && (
        // The `key` forces a re-mount so the same error is re-announced on
        // every click. Without it, screen readers only hear the announcement
        // the first time.
        <SectionMessage key={attempt} variant="error">
          <SectionMessage.Title>Payment declined</SectionMessage.Title>
          <SectionMessage.Content>
            We could not process your card. Check the details and try again.
          </SectionMessage.Content>
        </SectionMessage>
      )}
    </Stack>
  );
};
