import { Select } from '@marigold/components';

export const SelectSection = () => (
  <Select label="Choose your Fandom">
    <Select.Section title="Fantasy">
      <Select.Option>Harry Potter</Select.Option>
      <Select.Option>Lord of the Rings</Select.Option>
    </Select.Section>
    <Select.Section title="Sci-Fi">
      <Select.Option>Star Wars</Select.Option>
      <Select.Option>Star Trek</Select.Option>
    </Select.Section>
  </Select>
);
