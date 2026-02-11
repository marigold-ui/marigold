import {
  Card,
  CardProps,
  Center,
  Inline,
  Link,
  Split,
} from '@marigold/components';
import { Close, ExternalLink } from '@marigold/icons';

export default (props: CardProps) => (
  <Card {...props} p={3}>
    <Inline alignY="top">
      <Link href={'#'} target="blank">
        <ExternalLink size={26} className="fill-[#990000]" />
      </Link>
      <Split />
      <Close />
    </Inline>
    <Center>
      <Link href={'#'}>Reservix GmbH (1)</Link>
    </Center>
  </Card>
);
