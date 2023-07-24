import { Inline, Button } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <Button variant="primary" size="small">
      small
    </Button>
    <Button variant="primary" size="small" fullWidth>
      small
    </Button>
    <Button variant="primary" size="small" disabled>
      small
    </Button>
  </Inline>
);
