import { Breakout, Container } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Container align="center" space={2}>
    <Rectangle height="60px" width="300px" />
    <Breakout alignX="right">
      <Rectangle height="60px" />
    </Breakout>
    <Rectangle height="60px" width="300px" />
    <Rectangle height="60px" width="300px" />
  </Container>
);
