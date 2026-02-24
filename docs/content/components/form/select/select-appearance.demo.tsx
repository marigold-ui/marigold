import type { SelectProps } from '@marigold/components';
import { Select } from '@marigold/components';

export default (props: SelectProps<object>) => (
  <Select
    {...props}
    label="Genre"
    placeholder="Select genre"
    description="Select the genre you want."
    width="fit"
  >
    <Select.Option id="pop">Pop</Select.Option>
    <Select.Option id="hiphop">Hip Hop</Select.Option>
    <Select.Option id="rock">Rock</Select.Option>
    <Select.Option id="schlager">Schlager</Select.Option>
    <Select.Option id="jazz">Jazz</Select.Option>
    <Select.Option id="dance">Dance</Select.Option>
  </Select>
);
