import { Select } from '@marigold/components';

export default () => (
  <Select
    label="Shipping direction"
    disabledKeys={['germany', 'elsalvador', 'poland']}
    description="Please select the shipping direction, not every country can be available."
    width="fit"
  >
    <Select.Option id="czechrepublic">Czech Republic</Select.Option>
    <Select.Option id="egypt">Egypt</Select.Option>
    <Select.Option id="elsalvador">El Salvador</Select.Option>
    <Select.Option id="germany">Germany</Select.Option>
    <Select.Option id="hungary">Hungary</Select.Option>
    <Select.Option id="india">India</Select.Option>
    <Select.Option id="nigeria">Nigeria</Select.Option>
    <Select.Option id="poland">Poland</Select.Option>
    <Select.Option id="portugal">Portugal</Select.Option>
    <Select.Option id="ukraine">Ukraine</Select.Option>
  </Select>
);
