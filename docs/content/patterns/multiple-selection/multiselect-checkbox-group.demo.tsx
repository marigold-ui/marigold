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
        <Checkbox value="ham">🐖 Ham</Checkbox>
        <Checkbox value="beef" disabled>
          🐄 Beef (out of stock)
        </Checkbox>
        <Checkbox value="tuna">🐟 Tuna</Checkbox>
        <Checkbox value="tomatos">🍅 Tomatos</Checkbox>
        <Checkbox value="onions">🧅 Onions</Checkbox>
        <Checkbox value="pineapple">🍍 Pineapple</Checkbox>
      </CheckboxGroup>
      <hr />
      <pre>Selected values: {selected.join(', ')}</pre>
    </>
  );
};
