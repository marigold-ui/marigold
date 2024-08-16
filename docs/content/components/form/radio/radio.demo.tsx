import { Radio } from '@marigold/components';

export default () => (
  <Radio.Group label="Select Your In-Flight Meal" defaultValue="vegetarian">
    <Radio value="chicken">🍗 Chicken</Radio>
    <Radio value="vegetarian">🥗 Vegetarian</Radio>
    <Radio value="fish" disabled>
      🐟 Fish (Unavailable)
    </Radio>
    <Radio value="vegan">🌱 Vegan</Radio>
  </Radio.Group>
);
