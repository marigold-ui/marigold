import { Inset } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="bg-muted">
    <Inset p="square-regular">
      <Rectangle height="80px" />
    </Inset>
  </div>
);
