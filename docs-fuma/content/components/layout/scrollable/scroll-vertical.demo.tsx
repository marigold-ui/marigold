'use client';

import { Scrollable } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Scrollable height="150px">
    <div className="flex flex-col items-center gap-2 p-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Rectangle key={index} height="100px" width="200px" />
      ))}
    </div>
  </Scrollable>
);
