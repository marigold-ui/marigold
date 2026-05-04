import { Divider, IconButton, Inline } from '@marigold/components';
import { Bold, Delete, Italic, Underline } from '@marigold/icons';

export default () => (
  <Inline space={2} alignY="center">
    <IconButton aria-label="Bold">
      <Bold />
    </IconButton>
    <IconButton aria-label="Italic">
      <Italic />
    </IconButton>
    <IconButton aria-label="Underline">
      <Underline />
    </IconButton>
    <Divider orientation="vertical" />
    <IconButton aria-label="Delete">
      <Delete />
    </IconButton>
  </Inline>
);
