import { Divider, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <>
    <div className="h-52 bg-slate-200 p-2">
      <Stack space={4} stretch alignY="top">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Top</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <Divider />
    <div className="h-52 bg-slate-200 p-2">
      <Stack space={4} stretch alignY="center">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Center</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <Divider />
    <div className="h-52 bg-slate-200 p-2">
      <Stack space={4} stretch alignY="bottom">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Bottom</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
  </>
);
