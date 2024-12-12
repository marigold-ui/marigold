import { Inset } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="bg-bg-surface-sunken">
    <Inset space={8}>
      <Rectangle height="80px" />
    </Inset>
  </div>
);
