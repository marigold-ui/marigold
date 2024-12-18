import { Card, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Tiles space={1} tilesWidth="200px" equalHeight>
    <Card>
      <Rectangle height="100px" />
    </Card>
    <Card>
      <Rectangle height="100px" />
      <Rectangle height="100px" />
    </Card>
    <Card>
      <Rectangle height="100px" />
    </Card>
  </Tiles>
);
