# Autocomplete

_A searchfield that displays a dynamic list of suggestions._

The `<Autocomplete>` component is an input field that offers suggestions for the user's input as they type. These proposals are based on a predefined set of options.

It also helps to reduce the effort and time required to input data and to avoid errors that can occur due to typos or misspellings. The suggestions are displayed in a combobox list, and the user can select one of the options or continue typing their own input.

## Anatomy

Autocomplete is made up of a form input field, label, and overlay of menu options. The label and description aren't required and may be visually hidden. The clear button is shown after typing starts.

<ul>
  <li>
    <b>Label:</b> Descriptive text guiding the user on what information is
    required in the input field.
  </li>

  <li>
    <b>Input field:</b> A text box where users can enter or edit data.
  </li>

  <li>
    <b>Help text:</b> Supplementary information displayed below the input field
    to assist users in filling out the form correctly. Can also be an
    errormessage.
  </li>

  <li>
    <b>Clear button:</b> A button that allows users to quickly remove all text
    from the input field.
  </li>

  <li>
    <b>Dropdown arrow:</b> An icon indicating that more options are available;
    clicking it reveals a list of selectable items.
  </li>

  <li>
    <b>Overlay:</b> Hold a list of all possible options which can be selected.
  </li>
</ul>

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

Use an autocomplete search field (also known as a predictive search) to help users find what they’re looking for faster.
An autocomplete search field displays suggestions as someone types into the field, just like the Google search bar.
It is also suitable for fields where people know what they’re looking for, e.g. country of birth, a particular event, or a particular city.

```tsx title="autocomplete-basic"
import { Autocomplete } from '@marigold/components';

export default () => {
  return (
    <Autocomplete
      label="Search support tickets:"
      description="Type to search your recent support tickets"
    >
      <Autocomplete.Option id="ticket-1001">
        [#1001] Login issues
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1002">
        [#1002] Payment failed
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1003">
        [#1003] Account verification
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1004">
        [#1004] Feature request
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1005">
        [#1005] Password reset
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1006">
        [#1006] API integration
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1007">
        [#1007] Billing inquiry
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1008">
        [#1008] Mobile app crash
      </Autocomplete.Option>
    </Autocomplete>
  );
};
```

✓ Use an \<Autocomplete> instead of a long list.

### Text label

The label of the `<Autocomplete>` provides a clear and concise description of its purpose, making it easier for users to
interact with the interface and understand it.
Always display a label unless the `<Autocomplete>` is next to another component which already has a label.

✓ Use a clear and concise text label to clarify the meaning.

✗ Avoid using the Autocomplete without a label unless the Autocomplete is part of a complex scenario and its context is already set.

### Item content

Consider the width of the Autocomplete and keep the names of the options short and compact so that they fit. Long
item
names that occupy multiple lines are hard to perceive and should be avoided.

✓ Keep the description of the options as short as possible to improve readability.

✗ Avoid using lengthy option descriptions because the text can get truncated and users will find it difficult to read.

### Async Loading

- Large datasets that would be inefficient to load all at once
- API-backed search where results come from a server
- Dynamic filtering where options change based on input

The `useAsyncListData` hook provides built-in support for async loading, handling request states, cancellation, and filtering automatically. When implementing async loading.

```tsx title="autocomplete-async"
import { Key, useState } from 'react';
import {
  Autocomplete,
  SectionMessage,
  Stack,
  Table,
  useAsyncList,
} from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Gender', key: 'gender' },
    { name: 'Skin Color', key: 'skin_color' },
    { name: 'height', key: 'height' },
    { name: 'Weight', key: 'mass' },
  ];

  const [result, setResult] = useState<{ [key: string]: string }[] | null>(
    null
  );
  const list = useAsyncList<{ [key: string]: string }>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        {
          signal,
        }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });
  const handleSubmit = (key: Key | null, value: string | null) => {
    if (key) {
      const result = list.items.find(c => c.name === key);
      setResult(result ? [result] : null);
    }
    if (value) {
      setResult(list.items);
    }
  };

  return (
    <Stack space={5}>
      <Autocomplete
        label="Star Wars Character"
        menuTrigger="focus"
        items={list.items}
        value={list.filterText}
        onChange={list.setFilterText}
        onSubmit={handleSubmit}
      >
        {(item: any) => (
          <Autocomplete.Option id={item.name}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
      {result === null ? null : result.length > 0 ? (
        <Table aria-label="Character results" selectionMode="none" stretch>
          <Table.Header columns={columns}>
            {column => <Table.Column>{(column as any).name}</Table.Column>}
          </Table.Header>
          <Table.Body items={result}>
            {item => (
              <Table.Row key={(item as any).name}>
                {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      ) : (
        <SectionMessage>
          <SectionMessage.Title>Empty Result</SectionMessage.Title>
          <SectionMessage.Content>
            No Character matched your query, sorry! 😭
          </SectionMessage.Content>
        </SectionMessage>
      )}
    </Stack>
  );
};
```

### With sections

When related options are present, organizing them into sections enhances clarity and usability. Grouping options provides additional context and helps users navigate choices more easily. This approach reduces complexity and allows for additional guidance when needed, ensuring a more intuitive experience.

This can be achieved by wrapping the options in the `<Autocomplete.Section>` component. A header is required for each section, which is set using the `header` prop.

```tsx title="autocomplete-section"
import { Autocomplete } from '@marigold/components';

export default () => (
  <Autocomplete label="Genres" width="fit">
    {options.map(item => (
      <Autocomplete.Section key={item.category} header={item.category}>
        {item.genres.map(genre => (
          <Autocomplete.Option key={genre}>{genre}</Autocomplete.Option>
        ))}
      </Autocomplete.Section>
    ))}
  </Autocomplete>
);

const options = [
  {
    category: 'Pop and Dance',
    genres: [
      'Pop',
      'Synth-pop',
      'Electropop',
      'Dance-pop',
      'Teen pop',
      'Disco',
    ],
  },
  {
    category: 'Rock and Alternative',
    genres: [
      'Rock',
      'Hard rock',
      'Punk rock',
      'Alternative rock',
      'Indie rock',
      'Grunge',
      'Psychedelic rock',
    ],
  },
  {
    category: 'Hip-Hop and R&B',
    genres: ['Hip-Hop', 'Rap', 'Trap', 'R&B', 'Neo-soul'],
  },
  {
    category: 'Electronic and Experimental',
    genres: ['EDM', 'House', 'Techno', 'Dubstep', 'Ambient', 'Industrial'],
  },
  {
    category: 'Jazz and Blues',
    genres: [
      'Jazz',
      'Smooth jazz',
      'Bebop',
      'Blues',
      'Delta blues',
      'Chicago blues',
    ],
  },
  {
    category: 'Classical and Orchestral',
    genres: ['Classical', 'Baroque', 'Opera', 'Symphony', 'Chamber music'],
  },
  {
    category: 'Folk and Country',
    genres: ['Folk', 'Country', 'Bluegrass', 'Americana'],
  },
  {
    category: 'Latin and World',
    genres: ['Reggaeton', 'Salsa', 'Bossa Nova', 'Flamenco', 'Afrobeats'],
  },
  {
    category: 'Metal and Hard Music',
    genres: ['Heavy metal', 'Thrash metal', 'Death metal', 'Doom metal'],
  },
  {
    category: 'Reggae and Caribbean',
    genres: ['Reggae', 'Ska', 'Dancehall', 'Soca'],
  },
];
```

## Props

### Autocomplete

| Prop                        | Type                                                            | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------- | :-------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowsCustomValue           | `boolean`                                                       | -          | Whether the ComboBox allows a non-item matching input value to be set.                                                                                                                                                                                                                                                                                                                                               |
| allowsEmptyCollection       | `boolean`                                                       | -          | Whether the combo box allows the menu to be open when the collection is empty.                                                                                                                                                                                                                                                                                                                                       |
| aria-describedby            | `string`                                                        | -          | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                                                                                                                                                      |
| aria-details                | `string`                                                        | -          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                                                                                                                                                   |
| aria-label                  | `string`                                                        | -          | Defines a string value that labels the current element.                                                                                                                                                                                                                                                                                                                                                              |
| aria-labelledby             | `string`                                                        | -          | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                                                                                                                                                |
| autoFocus                   | `boolean`                                                       | -          | Whether the element should receive focus on render.                                                                                                                                                                                                                                                                                                                                                                  |
| children                    | `ChildrenOrFunction`                                            | -          | The children of the component. A function may be provided to alter the children based on component state.                                                                                                                                                                                                                                                                                                            |
| defaultFilter               | `((textValue: string, inputValue: string) => boolean)`          | -          | The filter function used to determine if a option should be included in the combo box list.                                                                                                                                                                                                                                                                                                                          |
| defaultInputValue           | `string`                                                        | -          | The default value of the ComboBox input (uncontrolled).                                                                                                                                                                                                                                                                                                                                                              |
| defaultItems                | `Iterable`                                                      | -          | The list of ComboBox items (uncontrolled).                                                                                                                                                                                                                                                                                                                                                                           |
| defaultSelectedKey          | `Key`                                                           | -          | The initial selected key in the collection (uncontrolled).                                                                                                                                                                                                                                                                                                                                                           |
| defaultValue                | `string`                                                        | -          | The value of the input (uncontrolled).                                                                                                                                                                                                                                                                                                                                                                               |
| description                 | `ReactNode`                                                     | -          | A helpful text.                                                                                                                                                                                                                                                                                                                                                                                                      |
| dir                         | `string`                                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| disabled                    | `boolean`                                                       | `"false"`  | If \`true\`, the input is disabled.                                                                                                                                                                                                                                                                                                                                                                                  |
| disabledKeys                | `Iterable`                                                      | -          | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.                                                                                                                                                                                                                                                                                                              |
| emptyState                  | `ReactNode`                                                     | -          | Provides content to display when there are no items in the list.                                                                                                                                                                                                                                                                                                                                                     |
| error                       | `boolean`                                                       | `"false"`  | If \`true\`, the field is considered invalid and if set the \`errorMessage\` is shown instead of the \`description\`.                                                                                                                                                                                                                                                                                                |
| errorMessage                | `ReactNode \| ((v: ValidationResult) => ReactNode)`             | -          | An error message.                                                                                                                                                                                                                                                                                                                                                                                                    |
| form                        | `string`                                                        | -          | The \`\` element to associate the input with. The value of this attribute must be the id of a \`\` in the same document. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).                                                                                                                                                                                              |
| formValue                   | `"text" \| "key"`                                               | `'key'`    | Whether the text or key of the selected item is submitted as part of an HTML form. When \`allowsCustomValue\` is \`true\`, this option does not apply and the text is always submitted.                                                                                                                                                                                                                              |
| hidden                      | `boolean`                                                       | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| id                          | `string`                                                        | -          | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                                                                                                                                               |
| inert                       | `boolean`                                                       | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| items                       | `Iterable`                                                      | -          | The list of ComboBox items (controlled).                                                                                                                                                                                                                                                                                                                                                                             |
| label                       | `ReactNode`                                                     | -          | Specifies the label of the field.                                                                                                                                                                                                                                                                                                                                                                                    |
| lang                        | `string`                                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| loading                     | `boolean`                                                       | `"false"`  | If \`true\`, a loading spinner will show up.                                                                                                                                                                                                                                                                                                                                                                         |
| menuTrigger                 | `MenuTriggerAction`                                             | `'input'`  | The interaction required to display the ComboBox menu.                                                                                                                                                                                                                                                                                                                                                               |
| name                        | `string`                                                        | -          | The name of the input element, used when submitting an HTML form. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).                                                                                                                                                                                                                                                     |
| onAnimationEnd              | `AnimationEventHandler`                                         | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAnimationEndCapture       | `AnimationEventHandler`                                         | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAnimationIteration        | `AnimationEventHandler`                                         | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAnimationIterationCapture | `AnimationEventHandler`                                         | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAnimationStart            | `AnimationEventHandler`                                         | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAnimationStartCapture     | `AnimationEventHandler`                                         | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAuxClick                  | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onAuxClickCapture           | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onBlur                      | `((e: FocusEvent) => void)`                                     | -          | Handler that is called when the element loses focus.                                                                                                                                                                                                                                                                                                                                                                 |
| onChange                    | `((value: string) => void)`                                     | -          | Called when the input value changes.                                                                                                                                                                                                                                                                                                                                                                                 |
| onClear                     | `(() => void)`                                                  | -          | Called when the clear button is pressed.                                                                                                                                                                                                                                                                                                                                                                             |
| onClick                     | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onClickCapture              | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onContextMenu               | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onContextMenuCapture        | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onDoubleClick               | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onDoubleClickCapture        | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onFocus                     | `((e: FocusEvent) => void)`                                     | -          | Handler that is called when the element receives focus.                                                                                                                                                                                                                                                                                                                                                              |
| onFocusChange               | `((isFocused: boolean) => void)`                                | -          | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                                                                                                                                                      |
| onGotPointerCapture         | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onKeyDown                   | `((e: KeyboardEvent) => void)`                                  | -          | Handler that is called when a key is pressed.                                                                                                                                                                                                                                                                                                                                                                        |
| onKeyUp                     | `((e: KeyboardEvent) => void)`                                  | -          | Handler that is called when a key is released.                                                                                                                                                                                                                                                                                                                                                                       |
| onLostPointerCapture        | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onLostPointerCaptureCapture | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseDown                 | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseDownCapture          | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseEnter                | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseLeave                | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseMove                 | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseMoveCapture          | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseOut                  | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseOutCapture           | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseOver                 | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseOverCapture          | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseUp                   | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onMouseUpCapture            | `MouseEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onOpenChange                | `((isOpen: boolean, menuTrigger?: MenuTriggerAction) => void)`  | -          | Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu.                                                                                                                                                                                                                                                                        |
| onPointerCancel             | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerCancelCapture      | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerDown               | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerDownCapture        | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerEnter              | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerLeave              | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerMove               | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerMoveCapture        | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerOut                | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerOutCapture         | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerOver               | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerOverCapture        | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerUp                 | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onPointerUpCapture          | `PointerEventHandler`                                           | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onScroll                    | `UIEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onScrollCapture             | `UIEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onSelectionChange           | `((key: Key \| null) => void)`                                  | -          | Handler that is called when the selection changes.                                                                                                                                                                                                                                                                                                                                                                   |
| onSubmit                    | `((value: string \| number \| null, key: Key \| null) => void)` | -          | Handler that is called when the SearchAutocomplete is submitted. A \`key\` will be passed if the submission is a selected item (e.g. a user clicks or presses enter on an option). If the input is a custom \`value\`, \`key\` will be \`null\`. A \`value\` will be passed if the submission is a custom value (e.g. a user types then presses enter). If the input is a selected item, \`value\` will be \`null\`. |
| onTouchCancel               | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchCancelCapture        | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchEnd                  | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchEndCapture           | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchMove                 | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchMoveCapture          | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchStart                | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTouchStartCapture         | `TouchEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionCancel          | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionCancelCapture   | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionEnd             | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionEndCapture      | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionRun             | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionRunCapture      | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionStart           | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onTransitionStartCapture    | `TransitionEventHandler`                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onWheel                     | `WheelEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onWheelCapture              | `WheelEventHandler`                                             | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| placeholder                 | `string`                                                        | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| readOnly                    | `boolean`                                                       | `"false"`  | If \`true\`, the input is readOnly.                                                                                                                                                                                                                                                                                                                                                                                  |
| ref                         | `Ref`                                                           | -          | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs}                                                                                                                                |
| required                    | `boolean`                                                       | `"false"`  | If \`true\`, the input is required.                                                                                                                                                                                                                                                                                                                                                                                  |
| selectedKey                 | `Key \| null`                                                   | -          | The currently selected key in the collection (controlled).                                                                                                                                                                                                                                                                                                                                                           |
| shouldFocusWrap             | `boolean`                                                       | -          | Whether keyboard navigation is circular.                                                                                                                                                                                                                                                                                                                                                                             |
| translate                   | `"yes" \| "no"`                                                 | -          |                                                                                                                                                                                                                                                                                                                                                                                                                      |
| validationBehavior          | `"native" \| "aria"`                                            | `'native'` | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA.                                                                                                                                                                                                                                                       |
| value                       | `string`                                                        | -          | The value of the input (controlled).                                                                                                                                                                                                                                                                                                                                                                                 |
| width                       | `WidthProp`                                                     | -          | Sets the width of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/width).                                                                                                                                                                                                                                                                                                             |

### Autocomplete.Option

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

### Autocomplete.Section

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
    [Combobox](/components/form/combobox): A text field that allows the user to
    select values from a provided items array. Useful when there are mote than
    15 options.
  </li>

  <li>
    [Radio](/components/form/radio): Component which allows to select only one
    option from a list. Use it if you have less than 5 options.
  </li>

  <li>
    [Select](/components/form/select): A component with which you can choose
    exactly one option from a list with predefined options.
  </li>
</ul>

## Related

- [Form developement guide](../../patterns/form-implementation) - Learn how to build forms.

- [useAsyncListData](/components/hooks-and-utils/useAsyncListData) - Represents usage of useAsyncListData .
