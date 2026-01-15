'use client';

import {
  Button,
  ContextualHelp,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <ContextualHelp>
    <ContextualHelp.Title>Need more help?</ContextualHelp.Title>
    <ContextualHelp.Content>
      <Stack space={2}>
        <Text>
          You can access detailed documentation or contact our support.
        </Text>
        <Inline space={2}>
          <Button variant="ghost">Docs</Button>
          <Button>Support</Button>
        </Inline>
      </Stack>
    </ContextualHelp.Content>
  </ContextualHelp>
);
