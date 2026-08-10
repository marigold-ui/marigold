import { memo } from 'react';
import { Button } from '@marigold/components';

// React's exotic components are objects carrying `$$typeof`, not functions, so
// a `typeof === 'function'` check in the harness rejects this valid default
// export as "no component found". memo stands in for forwardRef/lazy here —
// all three take the same object-shaped path through harness/entry.tsx.
const MemoDefaultExport = () => (
  <Button variant="primary" onPress={() => console.log('clicked')}>
    Submit
  </Button>
);

export default memo(MemoDefaultExport);
