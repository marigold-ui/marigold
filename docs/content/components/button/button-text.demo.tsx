import { Inline, Button } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <Button variant="text">Text Only</Button>
    <Button variant="text" disabled>
      Text Only
    </Button>
  </Inline>
);
