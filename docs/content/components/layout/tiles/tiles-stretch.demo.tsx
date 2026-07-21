import { useState } from 'react';
import { Card, Stack, Switch, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => {
  const [stretch, setStretch] = useState(false);
  return (
    <Stack space={2}>
      <Switch label="Toggle stretch" onChange={() => setStretch(!stretch)} />
      <Tiles space={2} stretch={stretch} tilesWidth="100px">
        <Card>
          <Card.Content>
            <Rectangle height="100px" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Rectangle height="100px" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Rectangle height="100px" />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Rectangle height="100px" />
          </Card.Content>
        </Card>
      </Tiles>
    </Stack>
  );
};
