import { Inline, Link } from '@marigold/components';

export default () => (
  <Inline space={4} alignY="center">
    <Link href="#">bearbeiten</Link>
    <Link href="#" variant="master">
      verschieben
    </Link>
    <Link href="#" variant="admin">
      freigeben
    </Link>
  </Inline>
);
