import { Inline, Button } from '@marigold/components';

export const TextOnlyButtons = () => (
  <Inline space="small">
    <Button variant="text">Text Only</Button>
    <Button variant="text" disabled>
      Text Only
    </Button>
  </Inline>
);
