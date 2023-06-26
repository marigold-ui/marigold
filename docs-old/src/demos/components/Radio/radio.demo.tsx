import { Radio } from '@marigold/components';

export const SimpleRadio = () => (
  <Radio.Group label="Choose dessert" defaultValue="apple">
    <Radio value="cupcake">🧁 Cupcake</Radio>
    <Radio value="ice cream">🍨 Ice Cream</Radio>
    <Radio value="cookie" disabled>
      🍪 Cookie (sold out)
    </Radio>
    <Radio value="apple">🍎 Apple</Radio>
  </Radio.Group>
);
