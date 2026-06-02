import { Button } from '@marigold/components';

const OverlappingLayout = (): React.ReactElement => (
  <div style={{ position: 'relative', width: 400, height: 200 }}>
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
      <Button>First</Button>
    </div>
    <div style={{ position: 'absolute', top: 10, left: 30 }}>
      <Button>Second</Button>
    </div>
  </div>
);

export default OverlappingLayout;
