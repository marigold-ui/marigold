import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Columns space={2} columns={[2, 8, 2]} collapseAt="40em">
    <Rectangle height="300px">
      <div className="text-text-primary-muted p-2">Left Sidebar</div>
    </Rectangle>
    <Rectangle height="300px">
      <div className="text-text-primary-muted p-2">Main Content</div>
    </Rectangle>
    <Rectangle height="300px">
      <div className="text-text-primary-muted p-2">Right Sidebar</div>
    </Rectangle>
  </Columns>
);
