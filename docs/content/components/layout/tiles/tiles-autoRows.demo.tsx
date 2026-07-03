import { Card, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Tiles space={1} tilesWidth="200px" equalHeight>
    <Card>
      <Card.Content>
        <Rectangle height="100px" />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Rectangle height="100px" />
        <Rectangle height="100px" />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Rectangle height="100px" />
      </Card.Content>
    </Card>
  </Tiles>
);
