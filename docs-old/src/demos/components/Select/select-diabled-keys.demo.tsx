import { Select } from '@marigold/components';

export const DisabledKeysSelect = () => (
  <Select label="Favorite Color" disabledKeys={['Orange', 'Yellow']}>
    <Select.Option key="Red">Red</Select.Option>
    <Select.Option key="Orange">Orange</Select.Option>
    <Select.Option key="Yellow">Yellow</Select.Option>
    <Select.Option key="Green">Green</Select.Option>
    <Select.Option key="Blue">Blue</Select.Option>
    <Select.Option key="Purple">Purple</Select.Option>
  </Select>
);
