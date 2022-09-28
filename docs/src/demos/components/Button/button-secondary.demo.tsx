import { Inline, Button } from '@marigold/components';

export const SecondaryButtons = () => (
  <Inline space="small">
    <Button variant="secondary">Secondary</Button>
    <Button variant="secondary" disabled>
      Secondary
    </Button>
  </Inline>
);
