# ComboBox

_A text-field that allows the user to select values from a provided items array._

The `<ComboBox>` component combines a text input with a listbox, allowing users to filter a list of options to items matching a query or adding a new value.

Its purpose is to make interaction with software more intuitive by presenting options in a concise, readable manner instead of requiring users to remember cryptic commands or navigate through complex hierarchies

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

### Controlled Usage with custom Filter

If you want to listen or act while the user is typing into the `ComboBox` field, you can switch to controlled mode by adding an `onChange` handler and setting the `value` manually.

This is especially helpful if you need to customize the filtering. For example, you may only want to show suggestions when the user has typed at least two characters. Furthermore, you can improve the matching, as shown in the example below. In the demo, the user would not receive a suggestion if they typed "ssp" without the custom filter.

```tsx title="combobox-controlled"
import { useState } from 'react';
import { ComboBox, Stack, Text } from '@marigold/components';

export default () => {
  const [currentValue, setCurrentValue] = useState<string | undefined>();
  return (
    <Stack>
      <ComboBox
        value={currentValue}
        onChange={setCurrentValue}
        defaultSelectedKey={3}
        label="Animals"
      >
        <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
        <ComboBox.Option id="cat">Cat</ComboBox.Option>
        <ComboBox.Option id="dog">Dog</ComboBox.Option>
        <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
        <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
      </ComboBox>
      <Text weight="black">currentValue: "{currentValue}"</Text>
    </Stack>
  );
};
```

### With sections

When related options are present, organizing them into sections enhances clarity and usability. Grouping options provides additional context and helps users navigate choices more easily. This approach reduces complexity and allows for additional guidance when needed, ensuring a more intuitive experience.

This can be achieved by wrapping the options in the `<ComboBox.Section>` component. A header is required for each section, which is set using the `header` prop. It's important to note that headers are not part of the accessibility tree. As a result, they will not be considered when filtering the option list.

> ℹ️ When `textValue` is required: Use the `textValue` prop when children contain non-text elements (e.g.,
> icons, badges, or other decorative components) - this ensures search
> functions revieve plain text equivalents, as non-text elements can create
> mismatches between visual and semantic content.

```tsx title="combobox-section"
import { ComboBox, Text } from '@marigold/components';

export default () => (
  <ComboBox label="Genres" width="fit">
    {options.map(item => (
      <ComboBox.Section key={item.category} header={item.category}>
        {item.genres.map(genre => (
          <ComboBox.Option
            key={genre.name}
            id={genre.id}
            textValue={genre.name}
          >
            <Text slot="label">{genre.name}</Text>
            <Text slot="description">{genre.description}</Text>
          </ComboBox.Option>
        ))}
      </ComboBox.Section>
    ))}
  </ComboBox>
);

const options = [
  {
    category: 'Pop and Dance',
    genres: [
      {
        id: 'pop',
        name: 'Pop',
        description: 'Catchy, upbeat music with mass appeal',
      },
      {
        id: 'synth-pop',
        name: 'Synth-pop',
        description: 'Synthesizer-driven pop music from the 80s',
      },
      {
        id: 'electropop',
        name: 'Electropop',
        description: 'Electronic pop with heavy digital production',
      },
      {
        id: 'dance-pop',
        name: 'Dance-pop',
        description: 'Upbeat pop music designed for dancing',
      },
      {
        id: 'teen-pop',
        name: 'Teen pop',
        description: 'Youth-oriented pop music with catchy hooks',
      },
      {
        id: 'disco',
        name: 'Disco',
        description: 'Dance-oriented 70s music with orchestral arrangements',
      },
    ],
  },
  {
    category: 'Rock and Alternative',
    genres: [
      {
        id: 'rock',
        name: 'Rock',
        description: 'Guitar-driven music with strong rhythms',
      },
      {
        id: 'hard-rock',
        name: 'Hard rock',
        description: 'Heavier, more aggressive rock style',
      },
      {
        id: 'punk-rock',
        name: 'Punk rock',
        description: 'Raw, fast-paced music with anti-establishment themes',
      },
      {
        id: 'alternative-rock',
        name: 'Alternative rock',
        description: 'Non-mainstream rock emerging from indie scenes',
      },
      {
        id: 'indie-rock',
        name: 'Indie rock',
        description: 'Independent-label rock with DIY ethos',
      },
      {
        id: 'grunge',
        name: 'Grunge',
        description: 'Raw, distorted sound from the Seattle scene',
      },
      {
        id: 'psychedelic-rock',
        name: 'Psychedelic rock',
        description: 'Mind-altering rock with experimental sounds',
      },
    ],
  },
  {
    category: 'Hip-Hop and R&B',
    genres: [
      {
        id: 'hip-hop',
        name: 'Hip-Hop',
        description: 'Urban music with rhythmic beats and rhyming speech',
      },
      {
        id: 'rap',
        name: 'Rap',
        description: 'Rhythmic vocal style over beat-driven backing',
      },
      {
        id: 'trap',
        name: 'Trap',
        description: 'Southern hip-hop with heavy bass and hi-hats',
      },
      {
        id: 'r&b',
        name: 'R&B',
        description: 'Rhythm and blues combining soul and pop elements',
      },
      {
        id: 'neo-soul',
        name: 'Neo-soul',
        description: 'Modern soul music with hip-hop influences',
      },
    ],
  },
  {
    category: 'Electronic and Experimental',
    genres: [
      {
        id: 'edm',
        name: 'EDM',
        description: 'Electronic Dance Music for festival crowds',
      },
      {
        id: 'house',
        name: 'House',
        description: 'Repetitive 4/4 beats with synth basslines',
      },
      {
        id: 'techno',
        name: 'Techno',
        description: 'Minimal electronic music with mechanical rhythms',
      },
      {
        id: 'dubstep',
        name: 'Dubstep',
        description: 'Bass-heavy electronic music with wobble effects',
      },
      {
        id: 'ambient',
        name: 'Ambient',
        description: 'Atmospheric, texture-based electronic soundscapes',
      },
      {
        id: 'industrial',
        name: 'Industrial',
        description: 'Harsh electronic sounds mixed with punk elements',
      },
    ],
  },
  {
    category: 'Jazz and Blues',
    genres: [
      {
        id: 'jazz',
        name: 'Jazz',
        description: 'Improvisational music with swing and blue notes',
      },
      {
        id: 'smooth-jazz',
        name: 'Smooth Jazz',
        description: 'Polished, radio-friendly jazz style',
      },
      {
        id: 'bebop',
        name: 'Bebop',
        description: 'Complex, fast-tempo jazz improvisation',
      },
      {
        id: 'blues',
        name: 'Blues',
        description: 'Soulful music based on blues scales and patterns',
      },
      {
        id: 'delta-blues',
        name: 'Delta Blues',
        description: 'Acoustic blues from the Mississippi Delta',
      },
      {
        id: 'chicago-blues',
        name: 'Chicago Blues',
        description: 'Electric blues with amplified instruments',
      },
    ],
  },
  {
    category: 'Classical and Orchestral',
    genres: [
      {
        id: 'classical',
        name: 'Classical',
        description: 'Traditional Western art music',
      },
      {
        id: 'baroque',
        name: 'Baroque',
        description: 'Ornate style from 1600-1750 with harpsichords',
      },
      {
        id: 'opera',
        name: 'Opera',
        description: 'Dramatic stage works combining music and theater',
      },
      {
        id: 'symphony',
        name: 'Symphony',
        description: 'Large-scale orchestral compositions',
      },
      {
        id: 'chamber-music',
        name: 'Chamber Music',
        description: 'Classical music for small ensembles',
      },
    ],
  },
  {
    category: 'Folk and Country',
    genres: [
      {
        id: 'folk',
        name: 'Folk',
        description: 'Traditional music with acoustic instrumentation',
      },
      {
        id: 'country',
        name: 'Country',
        description: 'Storytelling music with roots in rural America',
      },
      {
        id: 'bluegrass',
        name: 'Bluegrass',
        description: 'Fast-paced acoustic music with banjo and fiddle',
      },
      {
        id: 'americana',
        name: 'Americana',
        description: 'Blend of country, folk, and roots music',
      },
    ],
  },
  {
    category: 'Latin and World',
    genres: [
      {
        id: 'reggaeton',
        name: 'Reggaeton',
        description: 'Puerto Rican blend of reggae and Latin rhythms',
      },
      {
        id: 'salsa',
        name: 'Salsa',
        description: 'Energetic Cuban-derived dance music',
      },
      {
        id: 'bossa-nova',
        name: 'Bossa Nova',
        description: 'Brazilian jazz-samba fusion with smooth rhythms',
      },
      {
        id: 'flamenco',
        name: 'Flamenco',
        description: 'Passionate Spanish music with guitar and dance',
      },
      {
        id: 'afrobeats',
        name: 'Afrobeats',
        description: 'West African pop music with complex rhythms',
      },
    ],
  },
  {
    category: 'Metal and Hard Music',
    genres: [
      {
        id: 'heavy-metal',
        name: 'Heavy Metal',
        description: 'Loud, aggressive music with distorted guitars',
      },
      {
        id: 'thrash-metal',
        name: 'Thrash Metal',
        description: 'Fast, technical metal with punk influences',
      },
      {
        id: 'death-metal',
        name: 'Death Metal',
        description: 'Extreme metal with growled vocals and blast beats',
      },
      {
        id: 'doom-metal',
        name: 'Doom Metal',
        description: 'Slow, heavy metal with dark atmospheres',
      },
    ],
  },
  {
    category: 'Reggae and Caribbean',
    genres: [
      {
        id: 'reggae',
        name: 'Reggae',
        description: 'Jamaican music with offbeat rhythms',
      },
      {
        id: 'ska',
        name: 'Ska',
        description: 'Jamaican precursor to reggae with walking bassline',
      },
      {
        id: 'dancehall',
        name: 'Dancehall',
        description: 'Digital reggae style with rapid lyrical delivery',
      },
      {
        id: 'soca',
        name: 'Soca',
        description: 'Upbeat Caribbean dance music from Trinidad',
      },
    ],
  },
];
```

### Working with asynchronous Data

The ComboBox component supports working with asynchronous data. In the example below, the [`useAsyncList`](/hooks/useAsyncList) hook is used to handle the loading and filtering of data from the server.

```tsx title="combobox-async"
import { ComboBox, useAsyncList } from '@marigold/components';

export default () => {
  const list = useAsyncList<{ name: string }>({
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
  return (
    <ComboBox
      label="Star Wars Character Lookup"
      value={list.filterText}
      onChange={list.setFilterText}
      items={list.items}
    >
      {(item: { name: string }) => (
        <ComboBox.Option id={item.name}>{item.name}</ComboBox.Option>
      )}
    </ComboBox>
  );
};
```

### Displaying Suggestions

Opening the suggestion popover can be triggered through various interactions. This behavior can be adjusted by the `menuTrigger` prop:

- `input` (default): Open when the user edits the input text.
- `focus`: Open when the user focuses the `<ComboBox>` input.
- `manual`: Open when the user presses the trigger button or uses the arrow keys.

The below examples will display the suggestions when the input field is focused.

```tsx title="combobox-menu-trigger"
import { ComboBox } from '@marigold/components';

export default () => (
  <ComboBox label="Animals" menuTrigger="focus">
    <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
    <ComboBox.Option id="cat">Cat</ComboBox.Option>
    <ComboBox.Option id="dog">Dog</ComboBox.Option>
    <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
    <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
    <ComboBox.Option id="snake">Snake</ComboBox.Option>
    <ComboBox.Option id="vegan">Vegan</ComboBox.Option>
    <ComboBox.Option id="mar">Margrita</ComboBox.Option>
  </ComboBox>
);
```

### Item Actions

The `<ComboBox.Option>` component supports an `onAction` prop that triggers a callback when the user performs an action on an item. This is useful for triggering side effects such as navigating to a detail view or opening an edit modal.

> ℹ️ `onAction` vs `onSelectionChange`: The `onAction` prop on individual options differs from the `onSelectionChange` prop on the `<ComboBox>` itself. Use `onSelectionChange` when you need to track and manage the selected value. Use `onAction` when you need to perform a side effect when an item is activated, regardless of selection state. Note that `onAction` should not replace the primary selection behavior - it is intended for supplementary actions.

```tsx title="combobox-action"
import { useState } from 'react';
import { ComboBox, Stack, Text } from '@marigold/components';

export default () => {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <Stack space={4}>
      <ComboBox
        label="Projects"
        menuTrigger="focus"
        onSelectionChange={key => setSelectedKey(key as string)}
      >
        <ComboBox.Section key="actions" header="Actions">
          <ComboBox.Option
            id="new"
            onAction={() => setLastAction('Create new file...')}
          >
            New file
          </ComboBox.Option>
          <ComboBox.Option
            id="open"
            onAction={() =>
              setLastAction(`Opening details for file ${selectedKey}...`)
            }
          >
            Open
          </ComboBox.Option>
        </ComboBox.Section>
        <ComboBox.Section key="files" header="Files">
          <ComboBox.Option id="file-1">
            Top Secret - RUI Initative
          </ComboBox.Option>
          <ComboBox.Option id="file-2">Tech Radar</ComboBox.Option>
          <ComboBox.Option id="file-3">Who is Claude?</ComboBox.Option>
        </ComboBox.Section>
      </ComboBox>
      <Text weight="black">Selected:</Text> {selectedKey ?? 'None'}
      <Text weight="black">Last action:</Text> {lastAction ?? 'None'}
    </Stack>
  );
};
```

## Props

### ComboBox

| Prop                        | Type                                                                    | Default    | Description                                                                                                                                                                                                                                                                           |
| :-------------------------- | :---------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowsCustomValue           | `boolean`                                                               | -          | Whether the ComboBox allows a non-item matching input value to be set.                                                                                                                                                                                                                |
| allowsEmptyCollection       | `boolean`                                                               | -          | Whether the combo box allows the menu to be open when the collection is empty.                                                                                                                                                                                                        |
| aria-describedby            | `string`                                                                | -          | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                       |
| aria-details                | `string`                                                                | -          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                    |
| aria-label                  | `string`                                                                | -          | Defines a string value that labels the current element.                                                                                                                                                                                                                               |
| aria-labelledby             | `string`                                                                | -          | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                 |
| autoFocus                   | `boolean`                                                               | -          | Whether the element should receive focus on render.                                                                                                                                                                                                                                   |
| children                    | `ReactNode \| ((item: any) => ReactNode)`                               | -          | ReactNode or function to render the list of items.                                                                                                                                                                                                                                    |
| defaultFilter               | `((textValue: string, inputValue: string) => boolean)`                  | -          | The filter function used to determine if a option should be included in the combo box list.                                                                                                                                                                                           |
| defaultItems                | `Iterable`                                                              | -          | The list of ComboBox items (uncontrolled).                                                                                                                                                                                                                                            |
| defaultSelectedKey          | `Key`                                                                   | -          | The initial selected key in the collection (uncontrolled).                                                                                                                                                                                                                            |
| defaultValue                | `string`                                                                | -          | The value of the input (uncontrolled).                                                                                                                                                                                                                                                |
| description                 | `ReactNode`                                                             | -          | A helpful text.                                                                                                                                                                                                                                                                       |
| dir                         | `string`                                                                | -          |                                                                                                                                                                                                                                                                                       |
| disabled                    | `boolean`                                                               | `"false"`  | If \`true\`, the input is disabled.                                                                                                                                                                                                                                                   |
| disabledKeys                | `Iterable`                                                              | -          | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.                                                                                                                                                                               |
| emptyState                  | `ReactNode`                                                             | -          | Provides content to display when there are no items in the list.                                                                                                                                                                                                                      |
| error                       | `boolean`                                                               | `"false"`  | If \`true\`, the field is considered invalid and if set the \`errorMessage\` is shown instead of the \`description\`.                                                                                                                                                                 |
| errorMessage                | `ReactNode \| ((v: ValidationResult) => ReactNode)`                     | -          | An error message.                                                                                                                                                                                                                                                                     |
| form                        | `string`                                                                | -          | The \`\` element to associate the input with. The value of this attribute must be the id of a \`\` in the same document. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).                                                               |
| formValue                   | `"text" \| "key"`                                                       | `'key'`    | Whether the text or key of the selected item is submitted as part of an HTML form. When \`allowsCustomValue\` is \`true\`, this option does not apply and the text is always submitted.                                                                                               |
| hidden                      | `boolean`                                                               | -          |                                                                                                                                                                                                                                                                                       |
| id                          | `string`                                                                | -          | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                |
| inert                       | `boolean`                                                               | -          |                                                                                                                                                                                                                                                                                       |
| items                       | `Iterable`                                                              | -          | The list of ComboBox items (controlled).                                                                                                                                                                                                                                              |
| label                       | `ReactNode`                                                             | -          | Specifies the label of the field.                                                                                                                                                                                                                                                     |
| lang                        | `string`                                                                | -          |                                                                                                                                                                                                                                                                                       |
| loading                     | `boolean`                                                               | `"false"`  | If \`true\`, a loading spinner will show up.                                                                                                                                                                                                                                          |
| menuTrigger                 | `MenuTriggerAction`                                                     | `'input'`  | The interaction required to display the ComboBox menu.                                                                                                                                                                                                                                |
| name                        | `string`                                                                | -          | The name of the input element, used when submitting an HTML form. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).                                                                                                                      |
| onAnimationEnd              | `AnimationEventHandler`                                                 | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`                                                 | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`                                                 | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`                                                 | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`                                                 | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`                                                 | -          |                                                                                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onBlur                      | `((e: FocusEvent) => void)`                                             | -          | Handler that is called when the element loses focus.                                                                                                                                                                                                                                  |
| onChange                    | `((value: string) => void)`                                             | -          | Called when the input value changes.                                                                                                                                                                                                                                                  |
| onClick                     | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onClickCapture              | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onFocus                     | `((e: FocusEvent) => void)`                                             | -          | Handler that is called when the element receives focus.                                                                                                                                                                                                                               |
| onFocusChange               | `((isFocused: boolean) => void)`                                        | -          | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onKeyDown                   | `((e: KeyboardEvent) => void)`                                          | -          | Handler that is called when a key is pressed.                                                                                                                                                                                                                                         |
| onKeyUp                     | `((e: KeyboardEvent) => void)`                                          | -          | Handler that is called when a key is released.                                                                                                                                                                                                                                        |
| onLostPointerCapture        | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onOpenChange                | `((isOpen: boolean, menuTrigger?: MenuTriggerAction) => void)`          | -          | Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu.                                                                                                                                         |
| onPointerCancel             | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`                                                   | -          |                                                                                                                                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`                                                        | -          |                                                                                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`                                                        | -          |                                                                                                                                                                                                                                                                                       |
| onSelectionChange           | `((key: Key \| null) => void)`                                          | -          | Handler that is called when the selection changes.                                                                                                                                                                                                                                    |
| onTouchCancel               | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`                                                | -          |                                                                                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`                                                     | -          |                                                                                                                                                                                                                                                                                       |
| placeholder                 | `string`                                                                | -          | Set the placeholder for the select.                                                                                                                                                                                                                                                   |
| readOnly                    | `boolean`                                                               | `"false"`  | If \`true\`, the input is readOnly.                                                                                                                                                                                                                                                   |
| ref                         | `Ref`                                                                   | -          | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| required                    | `boolean`                                                               | `"false"`  | If \`true\`, the input is required.                                                                                                                                                                                                                                                   |
| selectedKey                 | `Key \| null`                                                           | -          | The currently selected key in the collection (controlled).                                                                                                                                                                                                                            |
| shouldFocusWrap             | `boolean`                                                               | -          | Whether keyboard navigation is circular.                                                                                                                                                                                                                                              |
| slot                        | `string \| null`                                                        | -          | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                    |
| translate                   | `"yes" \| "no"`                                                         | -          |                                                                                                                                                                                                                                                                                       |
| validate                    | `((value: ComboBoxValidationValue) => true \| ValidationError \| null)` | -          | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if \`validationBehavior="native"\`. For realtime validation, use the \`isInvalid\` prop instead.                                         |
| validationBehavior          | `"native" \| "aria"`                                                    | `'native'` | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA.                                                                                                                        |
| value                       | `string`                                                                | -          | The value of the input (controlled).                                                                                                                                                                                                                                                  |
| width                       | `WidthProp`                                                             | -          | Sets the width of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/width).                                                                                                                                                                              |

### ComboBox.Option

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

### ComboBox.Section

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
