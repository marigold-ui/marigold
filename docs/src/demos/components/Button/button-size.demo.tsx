import { Inline, Button } from '@marigold/components';

export const ButtonSizeDemo = () => (
  <Inline space="small">
    <Button variant="primary" size="small">
      small
    </Button>
    <Button variant="text" size="small">
      small
    </Button>
    <Button variant="primary" size="small" disabled>
      small
    </Button>
  </Inline>
);
