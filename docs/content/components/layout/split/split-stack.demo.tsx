import { Split, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="h-48">
    <Stack space={1} stretch>
      <Rectangle height="30px" />
      <Rectangle height="30px" />
      <Split />
      <Rectangle height="30px" />
    </Stack>
  </div>
);
