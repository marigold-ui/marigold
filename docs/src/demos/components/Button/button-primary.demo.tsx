import { Inline, Button } from '@marigold/components';

export const PrimaryButtons = () => (
  <Inline space="small">
    <Button variant="primary">Primary</Button>
    <Button variant="primary" disabled>
      Primary
    </Button>
  </Inline>
);
