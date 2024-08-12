import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={12}>
    <Stack space={4}>
      <Rectangle height="50px">
        {' '}
        <div className="text-text-primary-muted m-auto">First</div>
      </Rectangle>
      <Rectangle height="50px" />
      <Rectangle height="50px" />
    </Stack>
    <Stack space={4}>
      <Rectangle height="50px">
        {' '}
        <div className="text-text-primary-muted m-auto">Second</div>
      </Rectangle>
      <Rectangle height="50px" />
      <Rectangle height="50px" />
    </Stack>
  </Stack>
);
