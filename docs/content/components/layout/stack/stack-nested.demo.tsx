import { Inline, Split, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={10}>
    <div className="border-border bg-bg-body rounded-xs border-2 border-dashed p-2">
      <Inline space={8}>
        <Stack space={2} stretch>
          <Rectangle height="30px" width="100%" />
          <Rectangle height="30px" width="100%" />
          <Rectangle height="30px" width="100%" />
        </Stack>
        <Stack space={2}>
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
        </Stack>
        <Split />
        <Stack space={2}>
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
        </Stack>
      </Inline>
    </div>
    <Rectangle height="50px" />
    <Rectangle height="50px" />
  </Stack>
);
