import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack alignX="left">
    <Rectangle className="text-sm" width="auto">
      Label
    </Rectangle>
    <Rectangle className="text-sm">Input</Rectangle>
  </Stack>
);
