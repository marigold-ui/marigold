import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <CheckboxGroup
        label="Choose your toppings:"
        onChange={setSelected}
        description="Just click on the options"
      >
        <Checkbox value="ham" label="🐖 Ham" />
        <Checkbox value="beef" disabled label="🐄 Beef (out of stock)" />
        <Checkbox value="tuna" label="🐟 Tuna" />
        <Checkbox value="tomatos" label="🍅 Tomatos" />
        <Checkbox value="onions" label="🧅 Onions" />
        <Checkbox value="pineapple" label="🍍 Pineapple" />
      </CheckboxGroup>
      <hr />
      <pre>Selected values: {selected.join(', ')}</pre>
    </>
  );
};
