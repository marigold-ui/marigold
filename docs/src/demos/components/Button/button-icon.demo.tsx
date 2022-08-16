import { Inline, Button } from '@marigold/components';
import { Ticket } from '@marigold/icons';

export const ButtonIconDemo = () => (
  <Inline space="small">
    <Button variant="primary" space="xxsmall">
      <Ticket /> Icon Primary
    </Button>
    <Button variant="primary" space="xxsmall" disabled>
      <Ticket /> Icon Primary
    </Button>
  </Inline>
);
