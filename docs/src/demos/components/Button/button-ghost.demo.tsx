import { Inline, Button } from '@marigold/components';

export const GhostButtons = () => (
  <Inline space="small">
    <Button variant="ghost">Ghost</Button>
    <Button variant="ghost" disabled>
      Ghost
    </Button>
  </Inline>
);
