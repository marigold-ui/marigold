# Slider

_Allows to make selections from a range of values._

The `<Slider>` is a form component that allows users to quickly select a value within a range. They should be used when the upper and lower bounds of the range are known and static.
Sliders provide a visual indication of adjustable content, where the user can increase or decrease the value by moving the handle along a horizontal track.

## Anatomy

Sliders consist of a track element showing the range of available values, one or more thumbs showing the current values, an output displaying the current values textually, and an optional label.

The thumbs can be dragged to allow a user to change their value. In addition, the track can be clicked to move the nearest thumb to that position.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

A slider is useful when selecting a value or range within a continuous or evenly spaced numeric scale feels more natural through direct manipulation than by entering values manually. It is well suited for inputs where the approximate position on a scale matters more than exact precision, such as setting volume, adjusting brightness, or filtering results within a price or date range. By making the scale visible and interactive, a slider allows users to quickly explore and adjust values while maintaining a clear sense of their relative position.

### Ranges

Use the range feature of a slider when users need to select both a minimum and maximum value within the same scale, such as defining a price range, date span, or acceptable measurement limits. This approach works best when the range boundaries are equally important and the relationship between them is immediately clear in a single, continuous control.

When multiple thumbs are rendered, each thumb should have an `aria-label`, which is provided via the `thumbLabels` prop.

```tsx title="slider-range"
import { Slider } from '@marigold/components';

export default () => (
  <Slider
    defaultValue={[10, 30]}
    thumbLabels={['min', 'max']}
    step={5}
    label="Price range"
    formatOptions={{ style: 'currency', currency: 'EUR' }}
  />
);
```

### Scale and Granularity

Choose a scale that aligns with the way users think about the values they are adjusting. Always define a clear starting point and ending point (\`), and select step intervals that feel natural within that range.

If the user needs to work with very large value spans or make fine-tuned adjustments, a slider is not the best choice. In those cases, prefer using a different input method such as a [number field](/components/form/numberfield).

```tsx title="slider-granularity"
import { Slider } from '@marigold/components';

export default () => (
  <Slider label="Rating" step={1} minValue={1} maxValue={5} defaultValue={2} />
);
```

✓ Use a slider for selecting a value with clear, evenly spaced steps.

✗ Use a slider for entering precise values like 8,947.13.

### Value formatting

Always format the slider value using an appropriate number format to improve clarity and ensure the displayed information is meaningful. This helps users immediately understand the context of what they are selecting, supports decision-making, and reduces potential confusion.

You can define the format using the `formatOptions` prop. It supports all options available through [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat), and will automatically localize the number format based on the user's system settings.

```tsx title="slider-format"
import { Slider } from '@marigold/components';

export default () => (
  <Slider
    label="Currency"
    formatOptions={{ style: 'currency', currency: 'EUR' }}
    defaultValue={60}
  />
);
```

### Min and Max Values

Set meaningful and realistic minimum and maximum values that reflect the task the user is trying to complete. These boundaries help users stay within a useful range and avoid invalid input.

By default, the slider values reflect percentages between 0 and 100. A different scale can be used by using the `minValue` and `maxValue` props.

```tsx title="slider-min-max"
import { Slider } from '@marigold/components';

export default () => (
  <Slider
    label="Budget"
    formatOptions={{ style: 'currency', currency: 'EUR' }}
    defaultValue={680}
    minValue={100}
    maxValue={5000}
    step={100}
  />
);
```

### Usage in Forms

The `name` attribute determines how the slider’s value is submitted with the form. For a single-thumb slider, name accepts a string and will submit a single numeric value. For a two-thumb slider, name accepts a string tuple, allowing both the minimum and maximum values to be submitted as separate fields. This ensures that the form captures the full range selection without additional processing.

```tsx title="slider-form"
import type { FormEvent } from 'react';
import { Button, Form, Slider, Stack } from '@marigold/components';

export default () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    alert(
      `Age is selected from ${formData.get('start')} to ${formData.get('end')}.`
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack space={8} alignX="left">
        <Slider
          label="Age Range"
          defaultValue={[20, 50]}
          maxValue={100}
          step={10}
          name={['start', 'end']}
          width="1/2"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
```

## Props

| Prop                        | Type                                    | Default               | Description                                                                                                                                                                                                                                                                           |
| :-------------------------- | :-------------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aria-describedby            | `string`                                | -                     | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                       |
| aria-details                | `string`                                | -                     | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                    |
| aria-label                  | `string`                                | -                     | Defines a string value that labels the current element.                                                                                                                                                                                                                               |
| aria-labelledby             | `string`                                | -                     | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                 |
| className                   | `ClassNameOrFunction`                   | `'react-aria-Slider'` | The CSS \[className]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.                                                                                                 |
| defaultValue                | `number \| number[]`                    | -                     | The default value (uncontrolled).                                                                                                                                                                                                                                                     |
| description                 | `ReactNode`                             | -                     | A helpful text.                                                                                                                                                                                                                                                                       |
| dir                         | `string`                                | -                     |                                                                                                                                                                                                                                                                                       |
| disabled                    | `boolean`                               | `"false"`             | If \`true\`, the input is disabled.                                                                                                                                                                                                                                                   |
| formatOptions               | `NumberFormatOptions`                   | -                     | The display format of the value label.                                                                                                                                                                                                                                                |
| hidden                      | `boolean`                               | -                     |                                                                                                                                                                                                                                                                                       |
| id                          | `string`                                | -                     | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                |
| inert                       | `boolean`                               | -                     |                                                                                                                                                                                                                                                                                       |
| label                       | `ReactNode`                             | -                     | Set the label of the slider.                                                                                                                                                                                                                                                          |
| lang                        | `string`                                | -                     |                                                                                                                                                                                                                                                                                       |
| maxValue                    | `number`                                | `100`                 | The slider's maximum value.                                                                                                                                                                                                                                                           |
| minValue                    | `number`                                | `0`                   | The slider's minimum value.                                                                                                                                                                                                                                                           |
| name                        | `string \| [string, string]`            | -                     | The \`name\` attribute for the slider input(s), used for form submission. - For single-thumb sliders, provide a string. - For range sliders (two thumbs), provide a tuple of two strings, one for each thumb.                                                                         |
| onAnimationEnd              | `AnimationEventHandler`                 | -                     |                                                                                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`                 | -                     |                                                                                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`                 | -                     |                                                                                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`                 | -                     |                                                                                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`                 | -                     |                                                                                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`                 | -                     |                                                                                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onChange                    | `((value: number \| number[]) => void)` | -                     | Handler that is called when the value changes.                                                                                                                                                                                                                                        |
| onChangeEnd                 | `((value: number \| number[]) => void)` | -                     | Fired when the slider stops moving, due to being let go.                                                                                                                                                                                                                              |
| onClick                     | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onClickCapture              | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onLostPointerCapture        | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerCancel             | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`                   | -                     |                                                                                                                                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`                        | -                     |                                                                                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`                        | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`                | -                     |                                                                                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`                     | -                     |                                                                                                                                                                                                                                                                                       |
| ref                         | `Ref`                                   | -                     | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| slot                        | `string \| null`                        | -                     | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                    |
| step                        | `number`                                | `1`                   | The slider's step value.                                                                                                                                                                                                                                                              |
| thumbLabels                 | `string \| [string, string]`            | -                     | Aria labels for the thumbs in the slider.                                                                                                                                                                                                                                             |
| translate                   | `"yes" \| "no"`                         | -                     |                                                                                                                                                                                                                                                                                       |
| value                       | `number \| number[]`                    | -                     | The current value (controlled).                                                                                                                                                                                                                                                       |
| width                       | `WidthProp`                             | `"full"`              | Sets the width of the field. You can see allowed tokens here: https\://tailwindcss.com/docs/width                                                                                                                                                                                     |

## Alternative components

There are alternative UI elements that can be used in place of sliders, depending on the specific use case and design goals. Some alternatives include:

<ul>
  <li>
    [NumberField](/components/form/number-field): Instead of using a slider,
    users can directly input the desired value into a numeric input field. This
    approach provides precise control and is particularly useful when users need
    to input specific or exact values.
  </li>

  <li>
    [Combobox](/components/form/combobox): Can be used to present a predefined
    set of options from which users can choose. This can be a suitable
    alternative when there is a limited range of choices or discrete values to
    select from.
  </li>
</ul>

## Related

- [Form developement guide](../../patterns/form-implementation) - This page should introduce you on how to build forms with Marigold.

- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) - Enables language-sensitive number formatting.
