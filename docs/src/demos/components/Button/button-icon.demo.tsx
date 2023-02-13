import { Inline, Button } from '@marigold/components';
import { Ticket } from '@marigold/icons';

export const ButtonIconDemo = () => (
  <Inline space="small">
    <Button variant="primary">
      <Ticket /> Icon Primary
    </Button>
    <Button variant="primary" disabled>
      <Ticket /> Icon Primary
    </Button>
  </Inline>
);
