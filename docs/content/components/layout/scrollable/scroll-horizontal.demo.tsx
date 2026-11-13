import { Scrollable } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

const rectangles = Array.from(
  { length: 10 },
  (_, index) => `rectangle-${index}`
);

export default () => (
  <Scrollable>
    <div className="inline-flex gap-2 p-2">
      {rectangles.map(id => (
        <Rectangle key={id} height="100px" width="200px" />
      ))}
    </div>
  </Scrollable>
);
