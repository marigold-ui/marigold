import { Radio } from '@marigold/components';

export const SimpleRadio = () => (
  <Radio.Group label="Radio Group">
    <Radio value="1">Option 1</Radio>
    <Radio value="2">Option 2</Radio>
    <Radio value="3" disabled>
      Option 3
    </Radio>
    <Radio value="4">Option 4</Radio>
  </Radio.Group>
);
