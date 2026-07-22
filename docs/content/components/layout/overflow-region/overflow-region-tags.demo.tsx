import { Badge, OverflowRegion } from '@marigold/components';
import { DemoResizer } from '@/ui/DemoResizer';

const traits = [
  'outdoor',
  'lush',
  'cozy',
  'quirky',
  'urban',
  'vibey',
  'formal',
  'hype',
  'cheap',
];

export default () => (
  <DemoResizer defaultWidth={300}>
    <OverflowRegion
      indicator={({ hiddenCount }) => <Badge>+{hiddenCount}</Badge>}
    >
      {traits.map(trait => (
        <Badge key={trait}>{trait}</Badge>
      ))}
    </OverflowRegion>
  </DemoResizer>
);
