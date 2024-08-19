import { CheckboxGroup, CheckboxGroupProps } from '@marigold/components';
import { Checkbox } from '@marigold/components';

export default (props: CheckboxGroupProps) => (
  <CheckboxGroup {...props}>
    <Checkbox value="ham">Ham</Checkbox>
    <Checkbox value="cucumber">Cucumber</Checkbox>
    <Checkbox value="onions">Onions</Checkbox>
  </CheckboxGroup>
);
