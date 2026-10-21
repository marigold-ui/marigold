import {
  Button,
  Inline,
  Popover,
  TextField,
  Title,
} from '@marigold/components';
import { Tag } from '@marigold/icons';

export default () => (
  <Popover>
    <Button>
      <Tag /> Add label
    </Button>
    <Popover.Content modal="trap-focus" width="small">
      <Title>New label</Title>
      <TextField label="Name" />
      <Inline space={2} alignX="right">
        <Button slot="close">Cancel</Button>
        <Button slot="close" variant="primary">
          Add
        </Button>
      </Inline>
    </Popover.Content>
  </Popover>
);
