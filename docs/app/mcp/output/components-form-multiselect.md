# Multiselect

_A text-field that allows the user to select multiples values from a provided items array._

`<Multiselect>` is a type of multiple selection interface that displays options in a list format with the ability to select multiple items.

It allows users to choose multiple options by clicking on the items in the list and provides a comprehensive view of available options and the selected items.

> ℹ️ Deprecated Multiselect Recipe: The previous multiselect recipe pattern has been replaced by this official
> MultiSelect component. Existing implementations using the recipe pattern
> should migrate to this component for better accessibility and keyboard
> navigation.

## Anatomy

The `<MultiSelect>` component combines a text input with a ListBox, enabling users to select multiple options that are displayed as removable tags within the input field.

<ul>
  <li>
    <b>Label:</b> Descriptive text guiding the user on what information is
    required in the input field.
  </li>

  <li>
    <b>Input field:</b> A text box where users can enter or edit data.
  </li>

  <li>
    <b>Dropdown arrow:</b> An icon indicating that more options are available;
    clicking it reveals a list of selectable items.
  </li>

  <li>
    <b>Overlay:</b> Hold a list of all possible options which can be selected.
  </li>

  <li>
    <b>Tag:</b> Hold selected item.
  </li>
</ul>

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

> ⚠️ Keyboard Navigation Issues: The Multiselect component exhibits notable accessibility challenges with
> keyboard navigation. When interacting with disabled options, the focus
> indicator becomes obscured, preventing the expected behavior of skipping
> disabled items. This lack of clear visual feedback during navigation can
> temporarily confuse users. Note: This accessibility limitation stems from
> the react-select library's implementation

The `<MultiSelect>` component works best when users need to select multiple items from a large list of options (10+) and see their choices displayed as compact tags directly in the input. It’s helpful when you want to combine filtering (typing to narrow options) with visible selection feedback, saving space compared to checkboxes while allowing users to dynamically add or remove tags during the selection process.

✗ Avoid using MultiSelect when users need to pick a single option, the list is small, space isn’t an issue or search isn't necessary.

### Controlled

The `onSelectionChange` and `onChange` props can be used to control the `Multiselect`.

```tsx title="multiselect-controlled"
import { useState } from 'react';
import { Multiselect } from '@marigold/components';

const ticketPriorities = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'critical', label: 'Critical Issue' },
];

export default () => {
  const [current, setCurrent] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<Array<object>>([]);

  return (
    <div className="flex h-[300px] flex-col">
      <Multiselect
        label="Ticket Priorities"
        placeholder="Set priorities..."
        items={ticketPriorities}
        isOptionDisabled={(item: { value: string }) =>
          item.value === 'critical'
        }
        onChange={value => setCurrent(value)}
        onSelectionChange={(selectedValues: object[]) =>
          setSelectedValues(selectedValues)
        }
      />
      <hr />
      <pre>
        Current Input: {current}
        <br />
        Selected Priorities:{' '}
        {selectedValues.map(({ value }: { value: string }) => value).join(', ')}
      </pre>
    </div>
  );
};
```

## Props

| Prop                 | Type                                                        | Default   | Description                                                                                                                                           |
| :------------------- | :---------------------------------------------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-errormessage    | `string`                                                    | -         | HTML ID of an element containing an error message related to the input\*                                                                              |
| aria-invalid         | `boolean \| "false" \| "true" \| "grammar" \| "spelling"`   | -         | Indicate if the value entered in the field is invalid \*                                                                                              |
| aria-label           | `string`                                                    | -         | Aria label (for assistive tech)                                                                                                                       |
| aria-labelledby      | `string`                                                    | -         | HTML ID of an element that should be used as the label (for assistive tech)                                                                           |
| aria-live            | `"off" \| "assertive" \| "polite"`                          | -         | Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive |
| ariaLiveMessages     | `AriaLiveMessages>`                                         | -         | Customise the messages used by the aria-live component                                                                                                |
| autoFocus            | `boolean`                                                   | -         | Focus the control when it is mounted                                                                                                                  |
| defaultSelectedItems | `unknown`                                                   | -         | Items that should be selected by default (uncontrolled).                                                                                              |
| defaultValue         | `string`                                                    | -         | Input text that should be set by default.                                                                                                             |
| description          | `ReactNode`                                                 | -         | A helpful text.                                                                                                                                       |
| disabled             | `boolean`                                                   | `"false"` | If the select should be disabled.                                                                                                                     |
| emptyState           | `((obj: { inputValue: string; }) => ReactNode)`             | -         | Provides content to display when there are no items in the list.                                                                                      |
| error                | `boolean`                                                   | `"false"` | If the select should throw an error.                                                                                                                  |
| errorMessage         | `string \| ((validation: ValidationResult) => string)`      | -         | Set a error message for the select.                                                                                                                   |
| isOptionDisabled     | `((option: unknown, selectValue: Options) => boolean)`      | -         | Override the built-in logic to detect whether an option is disabled                                                                                   |
| items                | `OptionsOrGroups>`                                          | -         | The items of the select.                                                                                                                              |
| label                | `ReactNode`                                                 | -         | Specifies the label of the field.                                                                                                                     |
| noOptionsMessage     | `((obj: { inputValue: string; }) => ReactNode)`             | -         | Text to display when there are no options                                                                                                             |
| onBlur               | `FocusEventHandler`                                         | -         | Handle blur events on the control                                                                                                                     |
| onChange             | `((newValue: string, actionMeta: InputActionMeta) => void)` | -         | Handler that is called when the input changes.                                                                                                        |
| onFocus              | `FocusEventHandler`                                         | -         | Handle focus events on the control                                                                                                                    |
| onSelectionChange    | `((newValue: unknown, actionMeta: ActionMeta) => void)`     | -         | Handler that is called when the selection changes.                                                                                                    |
| placeholder          | `string`                                                    | -         | The placdeholder of the select when it is empty.                                                                                                      |
| readOnly             | `boolean`                                                   | `"false"` | If the select should be read only.                                                                                                                    |
| required             | `boolean`                                                   | `"false"` | If the select should be required.                                                                                                                     |
| selectedItems        | `unknown`                                                   | -         | Selected items (controlled):                                                                                                                          |
| width                | `WidthProp`                                                 | -         | Sets the width of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/width).                                              |

## Alternative components

Choosing the right alternative to `<Multiselect>` is important for providing an optimal user experience, especially when different types of selections are required. Depending on the nature of the choices and the desired interaction, the following components can serve as an alternative to Multiselect:

- [SelectList](/components/collection/selectlist): When you need more than just a text label to represent options, a `<SelectList>` can be used instead.
- [TagGroup](/components/collection/tag): When you want to visually highlight selected options as individual tags or want a horizontal list of options, use the `<Tag>` component.
- [Checkbox](/components/form/checkbox): When your list items may contain interactive elements such as buttons, checkboxes, menus .

## Related

- [Form developement guide](../../patterns/form-implementation) - Learn how to build forms.

- [Multiple Selection](/patterns/multiple-selection) - represents different ways and guideline for muliple selection.

- [Form Fields](../../foundations/form-fields) - Learn how to build forms.
