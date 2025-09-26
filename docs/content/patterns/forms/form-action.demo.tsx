import { Button, Inline, Link } from '@marigold/components';

export default () => (
  <Inline space={5} alignY="center">
    <Button variant="primary">Save</Button>
    <Link variant="secondary" href="#">
      Cancel
    </Link>
  </Inline>
);
