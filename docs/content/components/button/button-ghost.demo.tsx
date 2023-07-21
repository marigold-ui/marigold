import { Inline, Button } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <Button variant="ghost">Ghost</Button>
    <Button variant="ghost" disabled>
      Ghost
    </Button>
  </Inline>
);
