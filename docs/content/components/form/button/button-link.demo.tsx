import { Button, Inline, Link } from '@marigold/components';

export default () => (
  <Inline space={2} alignY="center" alignX="center">
    <Button variant="primary">Save</Button>
    <Link variant="secondary" href="#">
      Cancel
    </Link>
  </Inline>
);
