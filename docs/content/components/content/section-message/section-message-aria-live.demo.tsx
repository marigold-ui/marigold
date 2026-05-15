import { useState } from 'react';
import { Button, Inline, SectionMessage, Stack } from '@marigold/components';

export default () => {
  const [saved, setSaved] = useState(false);

  return (
    <Stack space={4}>
      <Inline space={2}>
        <Button variant="primary" onPress={() => setSaved(true)}>
          Save changes
        </Button>
        {saved && <Button onPress={() => setSaved(false)}>Reset</Button>}
      </Inline>
      {saved && (
        <SectionMessage variant="success" announce>
          <SectionMessage.Title>Settings saved</SectionMessage.Title>
          <SectionMessage.Content>
            Your changes have been applied. They will take effect on your next
            sign-in.
          </SectionMessage.Content>
        </SectionMessage>
      )}
    </Stack>
  );
};
