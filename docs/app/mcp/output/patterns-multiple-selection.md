# Multiple Selection

_Learn about how & when to use multiple selection_

The purpose of this guide is to provide clear instructions and guidelines for selecting the appropriate method of multiple selection within your design system. The guide will outline the different possibilities for multiple selection, explain their differences, and provide examples and recommendations for when to use each type.

## Different possibilities for multiple selection:

- [Checkbox Group](#checkbox-group)
- [Multiselect](#multiselect)
- [Tag Group](#taggroup)
- [SelectList](#selectlist)

So let us explain each different possibility for multiple selection:

## Checkbox Group

Checkbox Group is a type of multiple selection interfaces that presents options as checkboxes. User can Select Multiple options by checking the corresponding checkboxes.

It provides a familiar and straightforward interface for selecting multiple options.

### When to use ?

- Use CheckboxGroup when the number of options is moderate to large, typically more than 10-15 options.
- Use CheckboxGroup when the selected options do not need to be visible within the selection interface.
- CheckboxGroup is useful when the primary focus is on selecting options rather than displaying the selected choices.

### Examples

```tsx title="multiselect-checkbox-group"
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
```

## Multiselect

Multiselect is a type of multiple selection interface that displays options in a list format with the ability to select multiple items.

It allows users to choose multiple options by clicking on the items in the list and provides a comprehensive view of available options and the selected items.

### When to use ?

- It allows users to choose multiple options by clicking on the items in the list.
- Multiselect is suitable when the number of options is large, and the selected options need to be visible within the selection interface.
- It provides a comprehensive view of available options and the selected items.

### Examples

```tsx title="multiselect-basic"
import { Multiselect } from '@marigold/components';

const ticketCategories = [
  { value: 'general', label: 'General Admission' },
  { value: 'vip', label: 'VIP Experience' },
  { value: 'backstage', label: 'Backstage Pass' },
  { value: 'early', label: 'Early Bird Special' },
];

export default () => (
  <div className="h-[200px] w-full">
    <Multiselect
      label="Ticket Categories"
      items={ticketCategories}
      placeholder="Select categories..."
      isOptionDisabled={(item: { value: string }) => item.value === 'backstage'}
    />
  </div>
);
```

## TagGroup

TagGroup is a type of multiple selection interface that allows users to select multiple options and displays the selected options as tags.

It is useful when the number of options is relatively small, and the selected options need to be visible at all times.

### When to use ?

- Use TagGroup when the number of options is limited, typically up to 10-15 options.
- Use TagGroup when the selected options need to be visible to the user at all times.
- TagGroup is well-suited for situations where space is a concern and displaying selected options as tags provides a clear representation.

### Examples

```tsx title="tag-group-multiselect"
import { useState } from 'react';
import { Tag } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState(new Set(['parking']));

  return (
    <>
      <Tag.Group
        label="Amenities"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected as any}
      >
        <Tag id="laundry">Laundry</Tag>
        <Tag id="fitness">Fitness center</Tag>
        <Tag id="parking">Parking</Tag>
        <Tag id="pool">Swimming pool</Tag>
        <Tag id="breakfast">Breakfast</Tag>
      </Tag.Group>
      <p>Current selection (controlled): {[...selected].join(', ')}</p>
    </>
  );
};
```

## SelectList

The `SelectList` shows a list of interactive elements with which you can select several elements at the same time.

It is useful if you want to have a list in which you can select more items. It combines checkboxes with a list view, which lets it differ from the other examples like the Multiselect Recipe.

### When to use ?

- Use SelectList when your list items may contain interactive elements such as buttons, checkboxes, menus, etc. within them.
- Use SelectList when you have a large amout of options to choose from.
- Use SelectList if you need to view the other options aswell as the selected ones.

### Examples

```tsx title="multiple-selection-selectlist"
import { SelectList } from '@marigold/components';

const paymentMethods = [
  { id: 'credit', name: 'Credit Card' },
  { id: 'debit', name: 'Debit Card' },
  { id: 'transfer', name: 'Bank Transfer' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'cash', name: 'Cash' },
];

export default () => (
  <SelectList
    selectionMode="multiple"
    aria-label="Payment Methods"
    items={paymentMethods}
  >
    {(item: { id: string; name: string }) => (
      <SelectList.Item id={item.id}>{item.name}</SelectList.Item>
    )}
  </SelectList>
);
```
