import { Select, Stack } from '@marigold/components';

export default () => (
  <Stack space={8}>
    <Select
      variant="floating"
      label="Favorite character"
      placeholder="Select your character"
    >
      <Select.Option>Mario</Select.Option>
      <Select.Option>Luigi</Select.Option>
      <Select.Option>Toad</Select.Option>
      <Select.Option>Yoshi</Select.Option>
      <Select.Option>Bowser</Select.Option>
      <Select.Option>Peach</Select.Option>
    </Select>

    <Select
      variant="floating"
      size="small"
      label="Favorite character"
      placeholder="Select your character"
    >
      <Select.Option>Mario</Select.Option>
      <Select.Option>Luigi</Select.Option>
      <Select.Option>Toad</Select.Option>
      <Select.Option>Yoshi</Select.Option>
      <Select.Option>Bowser</Select.Option>
      <Select.Option>Peach</Select.Option>
    </Select>
  </Stack>
);
