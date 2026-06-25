import { Button, Toolbar } from '@marigold/components';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
} from '@marigold/icons';

export default () => (
  <Toolbar aria-label="Text formatting">
    <Toolbar.Group aria-label="Style">
      <Button variant="ghost" size="icon" aria-label="Bold">
        <Bold />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Italic">
        <Italic />
      </Button>
    </Toolbar.Group>
    <Toolbar.Separator />
    <Toolbar.Group aria-label="Alignment">
      <Button variant="ghost" size="icon" aria-label="Align left">
        <AlignLeft />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Align center">
        <AlignCenter />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Align right">
        <AlignRight />
      </Button>
    </Toolbar.Group>
  </Toolbar>
);
