import { Radio } from '@marigold/components';

// Regression fixture for the arrow-key-navigation orientation false positive:
// a horizontally-oriented radiogroup only responds to ArrowRight/ArrowLeft,
// not ArrowDown. The keyboard checker used to hardcode ArrowDown for
// radiogroups regardless of `aria-orientation`.
const HorizontalRadioGroup = () => (
  <Radio.Group label="Pick one" orientation="horizontal" defaultValue="a">
    <Radio value="a">A</Radio>
    <Radio value="b">B</Radio>
    <Radio value="c">C</Radio>
  </Radio.Group>
);

export default HorizontalRadioGroup;
