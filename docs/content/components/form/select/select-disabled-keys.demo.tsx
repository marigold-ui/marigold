import { Select } from '@marigold/components';

export default () => (
  <Select label="Favorite Color" disabledKeys={['Orange', 'Yellow']}>
    <Select.Option id="Red">Red</Select.Option>
    <Select.Option id="Orange">Orange</Select.Option>
    <Select.Option id="Yellow">Yellow</Select.Option>
    <Select.Option id="Green">Green</Select.Option>
    <Select.Option id="Blue">Blue</Select.Option>
    <Select.Option id="Purple">Purple</Select.Option>
  </Select>
);
