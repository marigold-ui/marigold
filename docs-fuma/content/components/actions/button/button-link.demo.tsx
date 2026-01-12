import { Button, Inline, LinkButton } from '@marigold/components';

export default () => (
  <Inline space={2} alignY="center" alignX="center">
    <Button variant="primary">Save</Button>
    <LinkButton href="#">Cancel</LinkButton>
  </Inline>
);
