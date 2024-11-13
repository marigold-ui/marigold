import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Columns space={2} columns={[8, 'fit']} collapseAt="40em" stretch={false}>
    <Rectangle height="100%" width="100%" />
    <Rectangle height="100%">
      <div className="text-text-primary-muted p-2">
        This is the column that takes the available width of the child, as you
        can see now.
      </div>
    </Rectangle>
  </Columns>
);
