import type { RadioGroupProps } from '@marigold/components';
import { Radio } from '@marigold/components';

export default (props: RadioGroupProps) => (
  <Radio.Group
    label="Select Your In-Flight Meal"
    defaultValue="vegetarian"
    width="fit"
    {...props}
  >
    <Radio value="chicken">Chicken</Radio>
    <Radio value="vegetarian">Vegetarian</Radio>
    <Radio value="fish" disabled>
      Fish (Unavailable)
    </Radio>
    <Radio value="vegan">Vegan</Radio>
  </Radio.Group>
);
