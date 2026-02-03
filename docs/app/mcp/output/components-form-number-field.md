# NumberField

_Component for entering numbers._

The `<NumberField>` component used for capturing numerical input from the user in a form or similar input context. This allows users to input numbers including integers, decimals, and as well as percentages.
The component also offers steppers which provides lower interaction costs.

## Anatomy

It consists of a label, an input field and a help text. Optional you can also show a help text and stepper buttons for increasing/decreasing values.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

`<NumberField>` is an input field that accepts <strong>only</strong> numeric input.

### Use Steppers

The stepper buttons make it easier and faster for people to make small numeric changes. It allows people to increase or decrease a number with a single button press, or by typing the number in the field.

> ℹ️ Hide steppers: If you don't want the step buttons to appear, you can easily remove these
> with the `hideStepper` property.

Also keep in mind using the `width` property is essential to provide a good user experience. So each input field shouldn't be larger than the expected content. For example
when using stepper buttons it is better to have shorter fields, so that the user can easier reach these buttons (lower interaction costs).

```tsx title="number-field-stepper"
import { Headline, NumberField, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={5}>
    <div>
      <Headline level={3}>Confirm Guests</Headline>
      <Text>Who’s going on your trip?</Text>
    </div>
    <NumberField
      defaultValue={3}
      minValue={0}
      maxValue={20}
      width="1/6"
      label="Adults"
    />
    <NumberField
      defaultValue={0}
      minValue={0}
      maxValue={20}
      width="1/6"
      label="Children"
    />
    <NumberField
      defaultValue={0}
      minValue={0}
      maxValue={20}
      width="1/6"
      label="Infants"
    />
  </Stack>
);
```

✓ Use steppers to make small numeric changes, else the interaction cost would be high.

### Use Format Options

With `<NumberField>` you can use `Intl.NumberFormatOptions` which comes in handy to format the numbers in a certain format, e.g. `percent`,`unit`, `decimal` and `currency`.

For a full list of supported options, see corresponding [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat). A full list of suported units can be seen [here](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers).

```tsx title="number-field-format"
import { NumberField, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <NumberField
      label="Amount"
      defaultValue={19.99}
      formatOptions={{
        style: 'currency',
        currency: 'USD',
      }}
    />
    <NumberField
      label="Decimals"
      formatOptions={{
        signDisplay: 'exceptZero',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }}
      step={0.1}
      defaultValue={0}
    />
    <NumberField
      label="Length"
      defaultValue={150}
      minValue={0}
      formatOptions={{
        style: 'unit',
        unit: 'centimeter',
        unitDisplay: 'short',
      }}
    />
    <NumberField
      label="Percentage"
      defaultValue={0.42}
      formatOptions={{
        style: 'percent',
      }}
    />
  </Stack>
);
```

✓ In addition, use units to support the label and make it clear what the user is entering in a particular number field.

### Label

In general label should be short and precise about what is expected from the user. Avoid unnecessary instructional
verbs (doing words) in your labels and hints because it’s already implied by the input field.
Avoid placeholder text in most cases, as there’s no need for it (more about it in the next section).

✓ Use short labels.

✗ Don’t use unnecessary instructional verbs.

### Placeholder

Placeholder text is a short hint displayed inside an input field before
a user enters a value. To save space, placeholder text is often used instead of a label, as shown in the first
example.
This is problematic for the following reasons:

- Placeholder text disappears once a person starts filling in an input field, causing some to forget what the
  field
  was for
- Some might miss or skip fields with placeholder text, as it can look like the field has already been pre-filled.
- Placeholder text colour contrast is almost always inaccessible, as it’s very light by design. This means many
  will
  struggle to read the label.

✓ Use label instead of a placeholder.

✗ Don’t use placeholder text instead of a label.

### Additional Description

Sometimes the label isn't enough for the user. In this case, to gather additional support for the user we can use
the help text. With this we can add helpful hints for the user below the input field. Beside that the help text is
placed in close proximity to the associated input field.

✓ Use help text to show an example what's expected.

✓ Explain why certain information is needed.

### NumberField With An Error

Error messages should let people know that a problem occurred, why it happened, and provide a solution to fix it
and move forward.

✗ Never blame the user. Always be positive and helpful.

✗ Be concise and avoid unnecessary words like “please”, “sorry” and “oops”

✓ Use detailed messages instead of global messages.

The `error` prop toggles the error state of a field. The `errorMessage` prop can then be used to provide feedback to
the user about the error. The message disappears automatically when all requirements are met.

```tsx title="number-field-error"
import { useState } from 'react';
import { NumberField } from '@marigold/components';

export default () => {
  const [charge, setCharge] = useState<number>(9999);
  const errors: string[] = [];

  if (charge > 1000) {
    errors.push('The charge is not allowed to be more than 1.000 €');
  }

  return (
    <NumberField
      label="Charge"
      value={charge}
      formatOptions={{
        style: 'currency',
        currency: 'EUR',
      }}
      minValue={0}
      error={errors.length > 0}
      errorMessage={errors}
      onChange={setCharge}
      hideStepper
    />
  );
};
```

> ℹ️ Note: Press `Enter`, after typing your text, to trigger the validation.

## Props

| Prop                        | Type                                                   | Default    | Description                                                                                                                                                                                                                                                                           |
| :-------------------------- | :----------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aria-describedby            | `string`                                               | -          | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                       |
| aria-details                | `string`                                               | -          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                    |
| aria-label                  | `string`                                               | -          | Defines a string value that labels the current element.                                                                                                                                                                                                                               |
| aria-labelledby             | `string`                                               | -          | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                 |
| autoFocus                   | `boolean`                                              | -          | Whether the element should receive focus on render.                                                                                                                                                                                                                                   |
| decrementAriaLabel          | `string`                                               | -          | A custom aria-label for the decrement button. If not provided, the localized string "Decrement" is used.                                                                                                                                                                              |
| defaultValue                | `number`                                               | -          | The default value (uncontrolled).                                                                                                                                                                                                                                                     |
| description                 | `ReactNode`                                            | -          | A helpful text.                                                                                                                                                                                                                                                                       |
| dir                         | `string`                                               | -          |                                                                                                                                                                                                                                                                                       |
| disabled                    | `boolean`                                              | `"false"`  | If \`true\`, the input is disabled.                                                                                                                                                                                                                                                   |
| error                       | `boolean`                                              | `"false"`  | If \`true\`, the field is considered invalid and if set the errorMessage is shown instead of the \`description\`.                                                                                                                                                                     |
| errorMessage                | `ReactNode \| ((v: ValidationResult) => ReactNode)`    | -          | An error message.                                                                                                                                                                                                                                                                     |
| form                        | `string`                                               | -          | The \`\` element to associate the input with. The value of this attribute must be the id of a \`\` in the same document. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).                                                               |
| formatOptions               | `NumberFormatOptions`                                  | -          | Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user.                                                                                                                                                |
| hidden                      | `boolean`                                              | -          |                                                                                                                                                                                                                                                                                       |
| hideStepper                 | `boolean`                                              | `"false"`  | Property for hiding the step buttons of the field.                                                                                                                                                                                                                                    |
| id                          | `string`                                               | -          | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                |
| incrementAriaLabel          | `string`                                               | -          | A custom aria-label for the increment button. If not provided, the localized string "Increment" is used.                                                                                                                                                                              |
| inert                       | `boolean`                                              | -          |                                                                                                                                                                                                                                                                                       |
| isWheelDisabled             | `boolean`                                              | -          | Enables or disables changing the value with scroll.                                                                                                                                                                                                                                   |
| label                       | `ReactNode`                                            | -          | Specifies the label of the field.                                                                                                                                                                                                                                                     |
| lang                        | `string`                                               | -          |                                                                                                                                                                                                                                                                                       |
| maxValue                    | `number`                                               | -          | The largest value allowed for the input.                                                                                                                                                                                                                                              |
| minValue                    | `number`                                               | -          | The smallest value allowed for the input.                                                                                                                                                                                                                                             |
| name                        | `string`                                               | -          | The name of the input element, used when submitting an HTML form. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).                                                                                                                      |
| onAnimationEnd              | `AnimationEventHandler`                                | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`                                | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`                                | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`                                | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`                                | -          |                                                                                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`                                | -          |                                                                                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onBeforeInput               | `FormEventHandler`                                     | -          | Handler that is called when the input value is about to be modified. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).                                                                                                                    |
| onBlur                      | `((e: FocusEvent) => void)`                            | -          | Handler that is called when the element loses focus.                                                                                                                                                                                                                                  |
| onChange                    | `((value: number) => void)`                            | -          | Handler that is called when the value changes.                                                                                                                                                                                                                                        |
| onClick                     | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onClickCapture              | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onCompositionEnd            | `CompositionEventHandler`                              | -          | Handler that is called when a text composition system completes or cancels the current text composition session. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).                                                                         |
| onCompositionStart          | `CompositionEventHandler`                              | -          | Handler that is called when a text composition system starts a new text composition session. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).                                                                                           |
| onCompositionUpdate         | `CompositionEventHandler`                              | -          | Handler that is called when a new character is received in the current text composition session. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).                                                                                      |
| onContextMenu               | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onCopy                      | `ClipboardEventHandler`                                | -          | Handler that is called when the user copies text. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).                                                                                                                                                  |
| onCut                       | `ClipboardEventHandler`                                | -          | Handler that is called when the user cuts text. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).                                                                                                                                                     |
| onDoubleClick               | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onFocus                     | `((e: FocusEvent) => void)`                            | -          | Handler that is called when the element receives focus.                                                                                                                                                                                                                               |
| onFocusChange               | `((isFocused: boolean) => void)`                       | -          | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onInput                     | `FormEventHandler`                                     | -          | Handler that is called when the input value is modified. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).                                                                                                                                      |
| onKeyDown                   | `((e: KeyboardEvent) => void)`                         | -          | Handler that is called when a key is pressed.                                                                                                                                                                                                                                         |
| onKeyUp                     | `((e: KeyboardEvent) => void)`                         | -          | Handler that is called when a key is released.                                                                                                                                                                                                                                        |
| onLostPointerCapture        | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onPaste                     | `ClipboardEventHandler`                                | -          | Handler that is called when the user pastes text. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).                                                                                                                                                 |
| onPointerCancel             | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`                                  | -          |                                                                                                                                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`                                       | -          |                                                                                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`                                       | -          |                                                                                                                                                                                                                                                                                       |
| onSelect                    | `ReactEventHandler`                                    | -          | Handler that is called when text in the input is selected. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`                               | -          |                                                                                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`                                    | -          |                                                                                                                                                                                                                                                                                       |
| placeholder                 | `string`                                               | `"none"`   | Placeholder text for the input field.                                                                                                                                                                                                                                                 |
| readOnly                    | `boolean`                                              | `"false"`  | If \`true\`, the input is readOnly.                                                                                                                                                                                                                                                   |
| ref                         | `Ref`                                                  | -          | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| required                    | `boolean`                                              | `"false"`  | If \`true\`, the input is required.                                                                                                                                                                                                                                                   |
| slot                        | `string \| null`                                       | -          | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                    |
| step                        | `number`                                               | -          | The amount that the input value changes with each increment or decrement "tick".                                                                                                                                                                                                      |
| translate                   | `"yes" \| "no"`                                        | -          |                                                                                                                                                                                                                                                                                       |
| validate                    | `((value: number) => true \| ValidationError \| null)` | -          | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if \`validationBehavior="native"\`. For realtime validation, use the \`isInvalid\` prop instead.                                         |
| validationBehavior          | `"native" \| "aria"`                                   | `'native'` | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA.                                                                                                                        |
| value                       | `number`                                               | -          | The current value (controlled).                                                                                                                                                                                                                                                       |
| width                       | `WidthProp`                                            | `"full"`   | Sets the width of the field. You can see allowed tokens here: https\://tailwindcss.com/docs/width                                                                                                                                                                                     |

## Related

- [Form developement guide](../../patterns/form-implementation) - This page should introduce you on how to build forms with Marigold.

- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) - Enables language-sensitive number formatting.

- [NumericFormat](../formatters/numericformat) - Helper component for formatting numeric based on the current language and locale-specific conventions.
