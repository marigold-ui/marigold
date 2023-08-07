import { Select } from '@marigold/components';

export default () => (
  <Select label="Choose Color (uncontrolled)" defaultSelectedKey="Yellow">
    <Select.Option key="Red">Red</Select.Option>
    <Select.Option key="Orange">Orange</Select.Option>
    <Select.Option key="Yellow">Yellow</Select.Option>
    <Select.Option key="Green">Green</Select.Option>
    <Select.Option key="Blue">Blue</Select.Option>
    <Select.Option key="Purple">Purple</Select.Option>
  </Select>
);
