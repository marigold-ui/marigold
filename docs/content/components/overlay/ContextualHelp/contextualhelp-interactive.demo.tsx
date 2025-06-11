'use client';

import { Button, ContextualHelp } from '@marigold/components';

export default () => (
  <ContextualHelp>
    <ContextualHelp.Title>Need more help?</ContextualHelp.Title>
    <ContextualHelp.Content>
      You can access detailed documentation or contact our support. <br />
      <div className="flex gap-2">
        <Button variant="text">Docs</Button>
        <Button variant="secondary">Support</Button>
      </div>
    </ContextualHelp.Content>
  </ContextualHelp>
);
