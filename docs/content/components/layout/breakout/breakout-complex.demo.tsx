import { Breakout, Container, Inline } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Container>
    <Breakout>
      <Inline space={4} alignY="center" alignX="center">
        <Rectangle width="100px" height="50px" />
        <Rectangle width="100px" height="100px" />
      </Inline>
    </Breakout>
    <Breakout>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Breakout>
  </Container>
);
