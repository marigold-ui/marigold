import { Description, Select, TextValue } from '@marigold/components';

export default () => (
  <Select label="Region" defaultValue="eu" width={64}>
    <Select.Option id="eu">
      <TextValue>Europe</TextValue>
      <Description size="xs">Frankfurt, Dublin, Stockholm</Description>
    </Select.Option>
    <Select.Option id="us">
      <TextValue>North America</TextValue>
      <Description size="xs">Virginia, Oregon</Description>
    </Select.Option>
    <Select.Option id="ap">
      <TextValue>Asia Pacific</TextValue>
      <Description size="xs">Tokyo, Singapore, Sydney</Description>
    </Select.Option>
  </Select>
);
