'use client';

import { Button, Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';

export default () => (
  <Inline space={5} alignY="center" alignX="center">
    <Button variant="primary">Edit</Button>
    <Button variant="primary">
      <Edit size={16} /> Edit
    </Button>
    <Button variant="icon" aria-label="Edit">
      <Edit />
    </Button>
  </Inline>
);
