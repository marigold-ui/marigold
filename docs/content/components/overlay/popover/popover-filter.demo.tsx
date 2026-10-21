import {
  Button,
  Checkbox,
  Inline,
  Popover,
  Select,
  TextField,
  Title,
} from '@marigold/components';
import { ListFilter } from '@marigold/icons';

export default () => (
  <Popover>
    <Button>
      <ListFilter /> Filters
    </Button>
    <Popover.Content placement="bottom start">
      <Title>Filters</Title>
      <Select label="Status" defaultValue="on-sale">
        <Select.Option id="on-sale">On sale</Select.Option>
        <Select.Option id="sold-out">Sold out</Select.Option>
        <Select.Option id="cancelled">Cancelled</Select.Option>
      </Select>
      <TextField label="Venue" />
      <Checkbox label="Only my events" />
      <Inline space={2} alignX="right">
        <Button>Reset</Button>
        <Button slot="close" variant="primary">
          Apply
        </Button>
      </Inline>
    </Popover.Content>
  </Popover>
);
