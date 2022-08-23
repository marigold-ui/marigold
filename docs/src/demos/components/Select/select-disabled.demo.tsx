import { Select } from '@marigold/components';

export const DisabledSelect = () => (
  <Select label="Disabled Select:" disabled placeholder="disabled Select">
    <Select.Option>disabled Select.Option</Select.Option>
  </Select>
);
