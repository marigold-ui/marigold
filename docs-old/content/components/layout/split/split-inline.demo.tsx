import { Inline, Split } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Inline space={2}>
    <Rectangle width="50px" height="30px" />
    <Rectangle width="50px" height="30px" />
    <Rectangle width="50px" height="30px" />
    <Split />
    <Rectangle width="50px" height="30px" />
  </Inline>
);
