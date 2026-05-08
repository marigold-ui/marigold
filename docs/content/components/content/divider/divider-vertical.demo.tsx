import { Divider, IconButton, Inline } from '@marigold/components';
import { Delete, FormatBold, FormatItalic, Underlined } from '@marigold/icons';

export default () => (
  <Inline space={2} alignY="center">
    <IconButton aria-label="Bold">
      <FormatBold />
    </IconButton>
    <IconButton aria-label="Italic">
      <FormatItalic />
    </IconButton>
    <IconButton aria-label="Underline">
      <Underlined />
    </IconButton>
    <Divider orientation="vertical" />
    <IconButton aria-label="Delete">
      <Delete />
    </IconButton>
  </Inline>
);
