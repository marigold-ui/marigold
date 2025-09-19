import { Link, Text } from '@marigold/components';

export default () => (
  <Text>
    You can jump to{' '}
    <Link href="http://www.reservix.de" target="_blank" disabled>
      reservix.de
    </Link>
  </Text>
);
