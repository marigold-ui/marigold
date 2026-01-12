import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="h-[200px]">
    <Columns columns={[4, 4, 4]} space={2} stretch>
      <Rectangle height="100%">
        <div className="text-text-primary-muted p-2">
          I have a height set to 100%!
        </div>
      </Rectangle>
      <Rectangle>
        <div className="text-text-primary-muted p-2">I space myself</div>
      </Rectangle>
      <Rectangle height="200px">
        <div className="text-text-primary-muted p-2">
          I have a height set to 200px.
        </div>
      </Rectangle>
    </Columns>
  </div>
);
