'use client';

import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={4}>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="top">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Top</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="center">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Center</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="bottom">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Bottom</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="between">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Between</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="around">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Around</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="evenly">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Evenly</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
  </Stack>
);
