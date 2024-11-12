import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Columns space={2} columns={[8, 'fit']} collapseAt="40em" stretch={false}>
    <Rectangle height="100px" width="100%" />
    <Rectangle height="100px" width="150px">
      <div className="text-text-primary-muted p-2">Fitting column</div>
    </Rectangle>
  </Columns>
);
