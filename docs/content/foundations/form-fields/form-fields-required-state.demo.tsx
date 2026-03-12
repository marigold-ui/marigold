import { Select } from '@marigold/components';

export default () => (
  <Select label="Genre" placeholder="Select genre" width="fit" required>
    <Select.Option id="pop">Pop</Select.Option>
    <Select.Option id="hiphop">Hip Hop</Select.Option>
    <Select.Option id="rock">Rock</Select.Option>
    <Select.Option id="schlager">Schlager</Select.Option>
    <Select.Option id="jazz">Jazz</Select.Option>
    <Select.Option id="dance">Dance</Select.Option>
  </Select>
);
