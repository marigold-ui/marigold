import {
  Button,
  Inline,
  Popover,
  TextField,
  Title,
} from '@marigold/components';
import { Tag } from '@marigold/icons';

export default () => (
  <Popover.Trigger>
    <Button>
      <Tag /> Add label
    </Button>
    <Popover modal="trap-focus" width="small">
      <Title>New label</Title>
      <Popover.Content>
        <TextField label="Name" />
        <Inline space={2} alignX="right">
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="primary">
            Add
          </Button>
        </Inline>
      </Popover.Content>
    </Popover>
  </Popover.Trigger>
);
