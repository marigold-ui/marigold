import { Button, Inline } from '@marigold/components';
import { Ticket } from '@marigold/icons';

export default () => (
  <Inline space={12}>
    <Button variant="primary">
      <Ticket /> Buy your Ticket
    </Button>
    <Button variant="icon">
      <Ticket />
    </Button>
  </Inline>
);
