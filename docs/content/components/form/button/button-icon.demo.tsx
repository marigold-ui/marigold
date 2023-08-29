import { Button, Inline } from '@marigold/components';
import { Ticket } from '@marigold/icons';

export default () => (
  <Inline space={2}>
    <Button variant="primary">
      <Ticket /> Icon Primary
    </Button>
    <Button variant="primary" disabled>
      <Ticket /> Icon Primary
    </Button>
  </Inline>
);
