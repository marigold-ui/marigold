import { Divider, Inline, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={8}>
    <Inline space={3} alignX="left">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Left</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="center">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Center</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="right">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Right</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="between">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Between</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="around">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Around</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="evenly">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Evenly</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
  </Stack>
);
