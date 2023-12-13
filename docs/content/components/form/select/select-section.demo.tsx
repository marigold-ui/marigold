import { Header, Select } from '@marigold/components';

export default () => (
  <Select label="Choose your Fandom">
    <Select.Section>
      <Header>Fantasy</Header>
      <Select.Option>Harry Potter</Select.Option>
      <Select.Option>Lord of the Rings</Select.Option>
    </Select.Section>
    <Select.Section>
      <Header>Sci-Fi</Header>
      <Select.Option>Star Wars</Select.Option>
      <Select.Option>Star Trek</Select.Option>
    </Select.Section>
  </Select>
);
