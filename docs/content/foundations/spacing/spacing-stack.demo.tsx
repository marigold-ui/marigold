import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack alignX="left" space="peer">
    <Rectangle className="text-sm" width="auto">
      Label
    </Rectangle>
    <Rectangle className="text-sm" width="50%">
      Input
    </Rectangle>
  </Stack>
);
