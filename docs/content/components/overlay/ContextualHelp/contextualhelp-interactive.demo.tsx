'use client';

import { Button, ContextualHelp, Headline, Text } from '@marigold/components';

export default () => (
  <ContextualHelp>
    <Headline size="level-3">Need more help?</Headline>
    <Text size="sm">
      You can access detailed documentation or contact our support.
    </Text>
    <div className="flex gap-2">
      <Button variant="destructive">Docs</Button>
      <Button variant="secondary">Support</Button>
    </div>
  </ContextualHelp>
);
