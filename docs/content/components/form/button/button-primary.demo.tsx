import { Button, Inline } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <Button variant="primary">Primary</Button>
    <Button variant="primary" disabled>
      Primary
    </Button>
  </Inline>
);
