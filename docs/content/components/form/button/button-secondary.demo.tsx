import { Inline, Button } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <Button variant="secondary">Secondary</Button>
    <Button variant="secondary" disabled>
      Secondary
    </Button>
  </Inline>
);
