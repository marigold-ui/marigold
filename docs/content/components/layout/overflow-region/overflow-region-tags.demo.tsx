import { Badge, OverflowRegion } from '@marigold/components';

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

// The container is deliberately narrow so the overflow behavior is visible
// without resizing the browser.
export default () => (
  <div className="max-w-72">
    <OverflowRegion
      indicator={({ hiddenCount }) => <Badge>+{hiddenCount}</Badge>}
    >
      {traits.map(trait => (
        <Badge key={trait}>{trait}</Badge>
      ))}
    </OverflowRegion>
  </div>
);
