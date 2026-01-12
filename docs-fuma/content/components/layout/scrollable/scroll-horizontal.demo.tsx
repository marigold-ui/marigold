import { Scrollable } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Scrollable>
    <div className="inline-flex gap-2 p-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Rectangle key={index} height="100px" width="200px" />
      ))}
    </div>
  </Scrollable>
);
