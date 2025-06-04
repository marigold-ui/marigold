'use client';

import { Button, ContextualHelp } from '@marigold/components';

export default () => (
  <ContextualHelp>
    <h3 className="mb-1 text-base font-bold">Need more help?</h3>
    <p className="mb-2 text-sm">
      You can access detailed documentation or contact our support.
    </p>
    <div className="flex gap-2">
      <Button variant="destructive">Docs</Button>
      <Button variant="secondary">Support</Button>
    </div>
  </ContextualHelp>
);
