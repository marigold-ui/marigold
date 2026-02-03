# Select

_Dropdown for selecting an option among different options._

The `<Select>` is a form component that allows you to select one or more elements from a list of predefined options. It should be used with other form components in a [`<Form>`](../form/form/).

## Anatomy

A select contains a pressable button element with a down arrow. The lists of options opens per default below the button, if there is no space for it, it will open above. An option represent a possible choice the user can select.

Optional you have the choice to add a section to the options which helps divide the content of options in categories. You can have the possibility to add a supporting text as short description and/ or error message to the select itself. The description will be relplaced with the error message when an error throws.
Also you can have a description for the options in the list.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

The select should be used within a form. It supports an optional description which can be used to provide more context about the field.

As with all form components, the label should always describe what the user expects to achieve. If additional informations is required you can use the description to give a short information for displaying these, or you can provide a placeholder which should represent what is to select.

### Number of options

If there are very few options (e.g., 1-4), consider using a [radio group](../form/radio) instead. These can be easier for users to scan and select.

A select is typically suitable for a moderate number of options (e.g., 5-15). This keeps the list manageable and quick to navigate.

When there are too many options (e.g., more than 15-20), usability can suffer. Users might find it cumbersome to scroll through a long list. In such cases, consider alternative approaches like a [autocomplete](../form/autocomplete) or [combobox](../form/combobox).

✓ Use a around 5-15 options for the select.

✗ Don't use a select if there are less than 4 or more than 15 options to choose from.

### With sections

When related options are present, organizing them into sections enhances clarity and usability. Grouping options provides additional context and helps users navigate choices more easily. This approach reduces complexity and allows for additional guidance when needed, ensuring a more intuitive experience.

This can be achieved by wrapping the options in the `<Select.Section>` component. A header is required for each section, which is set using the `header` prop.

```tsx title="select-section"
import { Select } from '@marigold/components';

export default () => (
  <Select label="Genres" width="fit">
    {options.map(item => (
      <Select.Section key={item.category} header={item.category}>
        {item.genres.map(genre => (
          <Select.Option key={genre}>{genre}</Select.Option>
        ))}
      </Select.Section>
    ))}
  </Select>
);

const options = [
  {
    category: 'Pop and Dance',
    genres: ['Pop', 'Electropop', 'Dance-pop', 'Teen pop', 'Disco'],
  },
  {
    category: 'Rock and Alternative',
    genres: [
      'Hard rock',
      'Punk rock',
      'Alternative rock',
      'Indie rock',
      'Grunge',
    ],
  },
  {
    category: 'Hip-Hop and R&B',
    genres: ['Hip-Hop', 'Rap', 'Trap', 'R&B'],
  },
];
```

### Item description

If you need to have primary and secondary content shown within an option, you can use our [text component](../content/text) with the slot property and set it for the label and description to add a short description for secondary content, which provides more context for the certain selectable option.

```tsx title="select-description"
import { Select, Text } from '@marigold/components';

export default () => (
  <Select label="Permissions" width="fit">
    <Select.Option id="read" textValue="Read">
      <Text slot="label">Read</Text>
      <Text slot="description" fontSize="xs">
        Read only
      </Text>
    </Select.Option>
    <Select.Option id="write" textValue="Write">
      <Text slot="label">Write</Text>
      <Text slot="description" fontSize="xs">
        Read and write only
      </Text>
    </Select.Option>
    <Select.Option id="admin" textValue="Admin">
      <Text slot="label">Admin</Text>
      <Text slot="description" fontSize="xs">
        Full access
      </Text>
    </Select.Option>
  </Select>
);
```

### Disabled keys

Sometimes depending on other settings it can be that a select needs to have disabled options to show up. For this case you can set keys disabled through the `disabledKeys` property.

Keep in mind that you always should write information why a certain option is disabled near the disabled option.

```tsx title="select-disabled-keys"
import { Select } from '@marigold/components';

export default () => (
  <Select
    label="Shipping direction"
    disabledKeys={['germany', 'elsalvador', 'poland']}
    description="Please select the shipping direction, not every country can be available."
    width="fit"
  >
    <Select.Option id="czechrepublic">Czech Republic</Select.Option>
    <Select.Option id="egypt">Egypt</Select.Option>
    <Select.Option id="elsalvador">El Salvador</Select.Option>
    <Select.Option id="germany">Germany</Select.Option>
    <Select.Option id="hungary">Hungary</Select.Option>
    <Select.Option id="india">India</Select.Option>
    <Select.Option id="nigeria">Nigeria</Select.Option>
    <Select.Option id="poland">Poland</Select.Option>
    <Select.Option id="portugal">Portugal</Select.Option>
    <Select.Option id="ukraine">Ukraine</Select.Option>
  </Select>
);
```

### Multiselection

Sometimes you need to offer a way for users to select multiple options from a list, but you don't have much room in your layout. In these situations, enabling multiselection (`selectionMode="multiple"`) on the `<Select>` is an effective approach. A common use case for this is when filtering a list of products. For instance, a user could select both a specific brand and a particular feature, and the dropdown would neatly contain both selections.

However, be mindful of the user experience when offering multiple selections. As more options are chosen, the display text will likely be truncated, hiding the full list of what's been selected. Note that for use cases requiring all selected options to be clearly visible, a dedicated [Multiselect](/components/form/multiselect) component might be a better choice.

```tsx title="select-multiple"
import { amenitiesOptions } from '@/lib/data/venues';
import { Select } from '@marigold/components';

export default () => (
  <Select label="Amenities" width={72} selectionMode="multiple">
    {amenitiesOptions.map(option => (
      <Select.Option key={option} id={option}>
        {option}
      </Select.Option>
    ))}
  </Select>
);
```

### Additional visuals

Icons or images can be added to options to provide immediate visual context and help users differentiate between items at a glance. Use these visual elements when they add meaningful value, such as representing different categories, user profiles, or status indicators.

Visual elements are processed faster than text, reducing cognitive load and helping users make selections more quickly. However, ensure that options remain understandable even without the visuals for accessibility purposes.

```tsx title="select-visuals"
import { people } from '@/lib/data/people';
import { Inline, Select, Text } from '@marigold/components';

export default () => (
  <Select label="Assign to User" placeholder="Select a user" width={80}>
    {people.map(person => (
      <Select.Option key={person.id} id={person.id}>
        <Inline space={2} alignY="center">
          <img
            src={person.avatar}
            alt={person.name}
            className="size-6 rounded-full object-cover"
          />
          <Text slot="label">{person.name}</Text>
        </Inline>
        <Text slot="description">{person.position}</Text>
      </Select.Option>
    ))}
  </Select>
);
```

## Props

### Select

| Prop                        | Type                                                           | Default                        | Description                                                                                                                                                                                                                                                                                   |
| :-------------------------- | :------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowsEmptyCollection       | `boolean`                                                      | -                              | Whether the select should be allowed to be open when the collection is empty.                                                                                                                                                                                                                 |
| aria-describedby            | `string`                                                       | -                              | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                               |
| aria-details                | `string`                                                       | -                              | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                            |
| aria-label                  | `string`                                                       | -                              | Defines a string value that labels the current element.                                                                                                                                                                                                                                       |
| aria-labelledby             | `string`                                                       | -                              | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                         |
| autoComplete                | `string`                                                       | -                              | Describes the type of autocomplete functionality the input should provide if any. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).                                                                                                      |
| autoFocus                   | `boolean`                                                      | -                              | Whether the element should receive focus on render.                                                                                                                                                                                                                                           |
| children                    | `ReactNode \| ((item: T) => ReactNode)`                        | -                              | Children of the select.                                                                                                                                                                                                                                                                       |
| defaultOpen                 | `boolean`                                                      | -                              | Sets the default open state of the menu.                                                                                                                                                                                                                                                      |
| defaultSelectedKey          | `Key`                                                          | -                              | The initial selected key in the collection (uncontrolled). @deprecated                                                                                                                                                                                                                        |
| defaultValue                | `Key \| Key[] \| null`                                         | -                              | The default value (uncontrolled).                                                                                                                                                                                                                                                             |
| description                 | `string`                                                       | -                              | Set a description for the select.                                                                                                                                                                                                                                                             |
| dir                         | `string`                                                       | -                              |                                                                                                                                                                                                                                                                                               |
| disabled                    | `boolean`                                                      | `"false"`                      | If the select should be disabled.                                                                                                                                                                                                                                                             |
| disabledKeys                | `Iterable`                                                     | -                              | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.                                                                                                                                                                                       |
| error                       | `boolean`                                                      | `"false"`                      | If the select should throw an error.                                                                                                                                                                                                                                                          |
| errorMessage                | `string \| ((validation: ValidationResult) => string)`         | -                              | Set a error message for the select.                                                                                                                                                                                                                                                           |
| excludeFromTabOrder         | `boolean`                                                      | -                              | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| form                        | `string`                                                       | -                              | The \`\` element to associate the input with. The value of this attribute must be the id of a \`\` in the same document. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).                                                                       |
| hidden                      | `boolean`                                                      | -                              |                                                                                                                                                                                                                                                                                               |
| id                          | `string`                                                       | -                              | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                        |
| inert                       | `boolean`                                                      | -                              |                                                                                                                                                                                                                                                                                               |
| items                       | `Iterable`                                                     | -                              | Items of the select.                                                                                                                                                                                                                                                                          |
| label                       | `ReactNode`                                                    | -                              | Set a label for the select.                                                                                                                                                                                                                                                                   |
| lang                        | `string`                                                       | -                              |                                                                                                                                                                                                                                                                                               |
| name                        | `string`                                                       | -                              | The name of the input, used when submitting an HTML form.                                                                                                                                                                                                                                     |
| onAnimationEnd              | `AnimationEventHandler`                                        | -                              |                                                                                                                                                                                                                                                                                               |
| onAnimationEndCapture       | `AnimationEventHandler`                                        | -                              |                                                                                                                                                                                                                                                                                               |
| onAnimationIteration        | `AnimationEventHandler`                                        | -                              |                                                                                                                                                                                                                                                                                               |
| onAnimationIterationCapture | `AnimationEventHandler`                                        | -                              |                                                                                                                                                                                                                                                                                               |
| onAnimationStart            | `AnimationEventHandler`                                        | -                              |                                                                                                                                                                                                                                                                                               |
| onAnimationStartCapture     | `AnimationEventHandler`                                        | -                              |                                                                                                                                                                                                                                                                                               |
| onAuxClick                  | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onAuxClickCapture           | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onBlur                      | `((e: FocusEvent) => void)`                                    | -                              | Handler that is called when the element loses focus.                                                                                                                                                                                                                                          |
| onChange                    | `((value: ValueType) => void)`                                 | -                              | Handler that is called when the value changes.                                                                                                                                                                                                                                                |
| onClick                     | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onClickCapture              | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onContextMenu               | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onContextMenuCapture        | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onDoubleClick               | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onDoubleClickCapture        | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onFocus                     | `((e: FocusEvent) => void)`                                    | -                              | Handler that is called when the element receives focus.                                                                                                                                                                                                                                       |
| onFocusChange               | `((isFocused: boolean) => void)`                               | -                              | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                               |
| onGotPointerCapture         | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onKeyDown                   | `((e: KeyboardEvent) => void)`                                 | -                              | Handler that is called when a key is pressed.                                                                                                                                                                                                                                                 |
| onKeyUp                     | `((e: KeyboardEvent) => void)`                                 | -                              | Handler that is called when a key is released.                                                                                                                                                                                                                                                |
| onLostPointerCapture        | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onLostPointerCaptureCapture | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseDown                 | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseDownCapture          | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseEnter                | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseLeave                | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseMove                 | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseMoveCapture          | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseOut                  | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseOutCapture           | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseOver                 | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseOverCapture          | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseUp                   | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onMouseUpCapture            | `MouseEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onOpenChange                | `((isOpen: boolean) => void)`                                  | -                              | Method that is called when the open state of the menu changes.                                                                                                                                                                                                                                |
| onPointerCancel             | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerCancelCapture      | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerDown               | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerDownCapture        | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerEnter              | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerLeave              | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerMove               | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerMoveCapture        | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerOut                | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerOutCapture         | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerOver               | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerOverCapture        | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerUp                 | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onPointerUpCapture          | `PointerEventHandler`                                          | -                              |                                                                                                                                                                                                                                                                                               |
| onScroll                    | `UIEventHandler`                                               | -                              |                                                                                                                                                                                                                                                                                               |
| onScrollCapture             | `UIEventHandler`                                               | -                              |                                                                                                                                                                                                                                                                                               |
| onSelectionChange           | `((key: Key \| null) => void)`                                 | -                              | Handler that is called when the selection changes. @deprecated                                                                                                                                                                                                                                |
| onTouchCancel               | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchCancelCapture        | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchEnd                  | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchEndCapture           | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchMove                 | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchMoveCapture          | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchStart                | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTouchStartCapture         | `TouchEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionCancel          | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionCancelCapture   | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionEnd             | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionEndCapture      | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionRun             | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionRunCapture      | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionStart           | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onTransitionStartCapture    | `TransitionEventHandler`                                       | -                              |                                                                                                                                                                                                                                                                                               |
| onWheel                     | `WheelEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| onWheelCapture              | `WheelEventHandler`                                            | -                              |                                                                                                                                                                                                                                                                                               |
| open                        | `boolean`                                                      | `"false"`                      | If the select list should be open.                                                                                                                                                                                                                                                            |
| placeholder                 | `string`                                                       | `'Select an item' (localized)` | Temporary text that occupies the select when it is empty.                                                                                                                                                                                                                                     |
| ref                         | `Ref`                                                          | -                              | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs}         |
| required                    | `boolean`                                                      | `"false"`                      | If the select should be required.                                                                                                                                                                                                                                                             |
| selectedKey                 | `Key \| null`                                                  | -                              | The currently selected key in the collection (controlled). @deprecated                                                                                                                                                                                                                        |
| selectionMode               | `SelectionMode`                                                | `'single'`                     | Whether single or multiple selection is enabled.                                                                                                                                                                                                                                              |
| slot                        | `string \| null`                                               | -                              | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                            |
| translate                   | `"yes" \| "no"`                                                | -                              |                                                                                                                                                                                                                                                                                               |
| validate                    | `((value: ValidationType) => true \| ValidationError \| null)` | -                              | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if \`validationBehavior="native"\`. For realtime validation, use the \`isInvalid\` prop instead.                                                 |
| validationBehavior          | `"native" \| "aria"`                                           | `'native'`                     | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA.                                                                                                                                |
| value                       | `Key \| Key[] \| null`                                         | -                              | The current value (controlled).                                                                                                                                                                                                                                                               |
| width                       | `WidthProp`                                                    | -                              | Sets the width of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/width).                                                                                                                                                                                      |

### Select.Option

| Prop                        | Type                              | Default | Description                                                                                                                                                                                                           |
| :-------------------------- | :-------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-label                  | `string`                          | -       | An accessibility label for this item.                                                                                                                                                                                 |
| children                    | `ReactNode`                       | -       | The children of the component                                                                                                                                                                                         |
| dir                         | `string`                          | -       |                                                                                                                                                                                                                       |
| download                    | `string \| boolean`               | -       | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).                                   |
| hidden                      | `boolean`                         | -       |                                                                                                                                                                                                                       |
| href                        | `string`                          | -       | A URL to link to. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).                                                                                                                     |
| hrefLang                    | `string`                          | -       | Hints at the human language of the linked URL. See\[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).                                                                                     |
| id                          | `Key`                             | -       | The unique id of the item.                                                                                                                                                                                            |
| inert                       | `boolean`                         | -       |                                                                                                                                                                                                                       |
| isDisabled                  | `boolean`                         | -       | Whether the item is disabled.                                                                                                                                                                                         |
| lang                        | `string`                          | -       |                                                                                                                                                                                                                       |
| onAction                    | `(() => void)`                    | -       | Handler that is called when a user performs an action on the item. The exact user event depends on the collection's \`selectionBehavior\` prop and the interaction modality.                                          |
| onAnimationEnd              | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onBlur                      | `((e: FocusEvent) => void)`       | -       | Handler that is called when the element loses focus.                                                                                                                                                                  |
| onClick                     | `((e: MouseEvent) => void)`       | -       | \*\*Not recommended – use \`onPress\` instead.\*\* \`onClick\` is an alias for \`onPress\` provided for compatibility with other libraries. \`onPress\` provides additional event details for non-mouse interactions. |
| onClickCapture              | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onFocus                     | `((e: FocusEvent) => void)`       | -       | Handler that is called when the element receives focus.                                                                                                                                                               |
| onFocusChange               | `((isFocused: boolean) => void)`  | -       | Handler that is called when the element's focus status changes.                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onHoverChange               | `((isHovering: boolean) => void)` | -       | Handler that is called when the hover state changes.                                                                                                                                                                  |
| onHoverEnd                  | `((e: HoverEvent) => void)`       | -       | Handler that is called when a hover interaction ends.                                                                                                                                                                 |
| onHoverStart                | `((e: HoverEvent) => void)`       | -       | Handler that is called when a hover interaction starts.                                                                                                                                                               |
| onLostPointerCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onPointerCancel             | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPress                     | `((e: PressEvent) => void)`       | -       | Handler that is called when the press is released over the target.                                                                                                                                                    |
| onPressChange               | `((isPressed: boolean) => void)`  | -       | Handler that is called when the press state changes.                                                                                                                                                                  |
| onPressEnd                  | `((e: PressEvent) => void)`       | -       | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target.                                                                                                   |
| onPressStart                | `((e: PressEvent) => void)`       | -       | Handler that is called when a press interaction starts.                                                                                                                                                               |
| onPressUp                   | `((e: PressEvent) => void)`       | -       | Handler that is called when a press is released over the target, regardless of whether it started on the target or not.                                                                                               |
| onScroll                    | `UIEventHandler`                  | -       |                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`                  | -       |                                                                                                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`               | -       |                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`               | -       |                                                                                                                                                                                                                       |
| ping                        | `string`                          | -       | A space-separated list of URLs to ping when the link is followed. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).                                                                     |
| referrerPolicy              | `HTMLAttributeReferrerPolicy`     | -       | How much of the referrer to send when following the link. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).                                                                   |
| rel                         | `string`                          | -       | The relationship between the linked resource and the current page. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).                                                                    |
| routerOptions               | `undefined`                       | -       | Options for the configured client side router.                                                                                                                                                                        |
| target                      | `HTMLAttributeAnchorTarget`       | -       | The target window for the link. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).                                                                                                     |
| textValue                   | `string`                          | -       | A string representation of the item's contents, used for features like typeahead.                                                                                                                                     |
| translate                   | `"yes" \| "no"`                   | -       |                                                                                                                                                                                                                       |
| value                       | `object`                          | -       | The object value that this item represents. When using dynamic collections, this is set automatically.                                                                                                                |

### Select.Section

| Prop                        | Type                     | Default | Description                                                                                               |
| :-------------------------- | :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| aria-label                  | `string`                 | -       | An accessibility label for the section.                                                                   |
| **children (required)**     | `ReactNode`              | -       | Children of the section.                                                                                  |
| dependencies                | `readonly any[]`         | -       | Values that should invalidate the item cache when using dynamic collections.                              |
| dir                         | `string`                 | -       |                                                                                                           |
| **header (required)**       | `ReactNode`              | -       | Section header to display.                                                                                |
| hidden                      | `boolean`                | -       |                                                                                                           |
| id                          | `Key`                    | -       | The unique id of the section.                                                                             |
| inert                       | `boolean`                | -       |                                                                                                           |
| items                       | `Iterable`               | -       | Item objects in the section.                                                                              |
| lang                        | `string`                 | -       |                                                                                                           |
| onAnimationEnd              | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationEndCapture       | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationIteration        | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationIterationCapture | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationStart            | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationStartCapture     | `AnimationEventHandler`  | -       |                                                                                                           |
| onAuxClick                  | `MouseEventHandler`      | -       |                                                                                                           |
| onAuxClickCapture           | `MouseEventHandler`      | -       |                                                                                                           |
| onClick                     | `MouseEventHandler`      | -       |                                                                                                           |
| onClickCapture              | `MouseEventHandler`      | -       |                                                                                                           |
| onContextMenu               | `MouseEventHandler`      | -       |                                                                                                           |
| onContextMenuCapture        | `MouseEventHandler`      | -       |                                                                                                           |
| onDoubleClick               | `MouseEventHandler`      | -       |                                                                                                           |
| onDoubleClickCapture        | `MouseEventHandler`      | -       |                                                                                                           |
| onGotPointerCapture         | `PointerEventHandler`    | -       |                                                                                                           |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -       |                                                                                                           |
| onLostPointerCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -       |                                                                                                           |
| onMouseDown                 | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseDownCapture          | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseEnter                | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseLeave                | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseMove                 | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseMoveCapture          | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOut                  | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOutCapture           | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOver                 | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOverCapture          | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseUp                   | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseUpCapture            | `MouseEventHandler`      | -       |                                                                                                           |
| onPointerCancel             | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerCancelCapture      | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerDown               | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerDownCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerEnter              | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerLeave              | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerMove               | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerMoveCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOut                | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOutCapture         | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOver               | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOverCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerUp                 | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerUpCapture          | `PointerEventHandler`    | -       |                                                                                                           |
| onScroll                    | `UIEventHandler`         | -       |                                                                                                           |
| onScrollCapture             | `UIEventHandler`         | -       |                                                                                                           |
| onTouchCancel               | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchCancelCapture        | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchEnd                  | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchEndCapture           | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchMove                 | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchMoveCapture          | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchStart                | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchStartCapture         | `TouchEventHandler`      | -       |                                                                                                           |
| onTransitionCancel          | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionCancelCapture   | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionEnd             | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionEndCapture      | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionRun             | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionRunCapture      | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionStart           | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionStartCapture    | `TransitionEventHandler` | -       |                                                                                                           |
| onWheel                     | `WheelEventHandler`      | -       |                                                                                                           |
| onWheelCapture              | `WheelEventHandler`      | -       |                                                                                                           |
| translate                   | `"yes" \| "no"`          | -       |                                                                                                           |
| value                       | `object`                 | -       | The object value that this section represents. When using dynamic collections, this is set automatically. |

## Alternative components

<ul>
  <li>
    [Autocomplete](/components/form/autocomplete): A searchfield that displays a
    dynamic list of suggestions. Useful when there are more than 15 options and
    you need to search for a specific value.
  </li>

  <li>
    [Combobox](/components/form/combobox): A text field that allows the user to
    select values from a provided items array. Useful when there are mote than
    15 options.
  </li>

  <li>
    [Radio](/components/form/radio): Component which allows to select only one
    option from a list. Use it if you have less than 5 options.
  </li>
</ul>

## Related

- [Building forms](../../patterns/form-implementation) - Learn how to build forms.
