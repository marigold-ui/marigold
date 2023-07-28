import { Select } from '@marigold/components';

export default () => (
  <Select label="Favorite character" placeholder="Select your character">
    <Select.Option>Mario</Select.Option>
    <Select.Option>Luigi</Select.Option>
    <Select.Option>Toad</Select.Option>
    <Select.Option>Yoshi</Select.Option>
    <Select.Option>Bowser</Select.Option>
    <Select.Option>Peach</Select.Option>
  </Select>
);
