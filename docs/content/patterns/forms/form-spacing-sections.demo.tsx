import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={14}>
    <Rectangle height="80px">
      <div className="text-text-primary-muted m-auto">Section</div>
    </Rectangle>
    <Rectangle height="80px">
      <div className="text-text-primary-muted m-auto">Section</div>
    </Rectangle>
    <Rectangle height="80px">
      <div className="text-text-primary-muted m-auto">Section</div>
    </Rectangle>
  </Stack>
);
