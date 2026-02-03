# DatePicker

_Component used to pick date value._

The `<DatePicker>` component is a user interface element that allows users to select a date from a calendar.

The typical practice is to provide a date picker and when you click on calendar button it pops up a calendar below the date field, allowing the user to populate the field with an appropriate date.

## Anatomy

The Label defines the purpose of the Date Field, where users can enter a date directly. Tapping the Calendar Button opens a calendar view with a Header for selecting the month and year, and Next/Previous Buttons for easy month navigation.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

`<DatePicker>` is used when you need users to select a date accurately, like for booking events, scheduling appointments, or setting deadlines. It’s ideal when date formats might vary, as it standardizes input and reduces mistakes because its visual clarity, format consistency and accuracy. DatePickers are also helpful when users might need guidance on valid date ranges, like selecting only future dates for reservations. Avoid using it for casual date entries where a simple text field would suffice.

### Basic Usage (uncontrolled)

This example shows a regular `<DatePicker>` without any special props.

```tsx title="date-picker-basic"
import { DatePicker } from '@marigold/components';

export default () => <DatePicker label="Date" />;
```

### Min/Max Values

The `minValue` and `maxValue` props are used to perform built-in validation. This prevents the user from selecting dates outside the valid range in the calendar .

```tsx title="date-picker-min-max"
import { CalendarDate } from '@internationalized/date';
import { DatePicker } from '@marigold/components';

export default () => (
  <DatePicker
    label="Event Date"
    description="Choose a date for your ticket purchase. Dates must be between June 5, 2025, and June 20, 2025."
    minValue={new CalendarDate(2025, 6, 5)}
    maxValue={new CalendarDate(2025, 6, 20)}
  />
);
```

### Controlled

The `value` and `onChange` props can be used to control the `DatePicker`.

```tsx title="date-picker-controlled"
import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { useState } from 'react';
import { DatePicker, Stack } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<DateValue>(parseDate('2023-10-29'));

  return (
    <Stack space={3}>
      <DatePicker
        label="Ticket Date"
        value={value}
        onChange={newValue => setValue(newValue!)}
      />
      <pre>
        <strong>Current Selected Date: </strong>
        {`Day: ${value.day} Month: ${value.month} Year: ${value.year}`}
      </pre>
    </Stack>
  );
};
```

### Using a Date Object

When using a datepicker, relying on the standard JavaScript `Date` object for its value can result in timezone inconsistencies and incorrect date display. That's why the datepicker uses a specific `DateValue` type from [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/) instead. This library handles correct international date manipulation across calendars, time zones, and other localization concerns.

> ℹ️ @internationalized/date: `@internationalized/date` is a peer dependency. If it's not already in your
> project, you'll need to install it.

The simplest way to parse a Date for the datepicker is by using `parseAbsoluteToLocal`. This function converts an absolute date and time into the current user's local time zone.
If you're already using a date library like [date-fns](https://date-fns.org/), you can also utilizing `parseDate`. Ensure that you only pass the date part to `parseDate`, excluding the time and timezone information.

```tsx title="date-picker-with-date"
import type { DateValue } from '@internationalized/date';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { useState } from 'react';
import { DatePicker } from '@marigold/components';

export default () => {
  const date = new Date().toISOString();
  const [value, setValue] = useState<DateValue>(parseAbsoluteToLocal(date)!);

  return (
    <DatePicker
      label="Date"
      value={value}
      onChange={newValue => setValue(newValue!)}
    />
  );
};
```

### Paste Support

The `<DatePicker>` supports pasting date values from the clipboard. Users can copy dates in common formats and paste them directly into the date picker field. The component automatically parses and validates the pasted content.

**Supported date formats:**

- ISO format: `2023-12-25`
- European format: `25.12.2023` or `25/12/2023`
- US format: `12/25/2023` or `12-25-2023`

Invalid dates or unrecognized formats are ignored, ensuring data integrity.

```tsx title="datepicker-paste"
import { DatePicker, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Stack space={4}>
      <Text size="small" variant="info">
        Try pasting a date in yyyy-mm-dd format (e.g., &quot;2025-09-24&quot;)
      </Text>
      <DatePicker
        label="Scheduled Date"
        description="You can paste dates directly into this field"
      />
    </Stack>
  );
}
```

## Props

| Prop                        | Type                                                          | Default     | Description                                                                                                                                                                                                                                                                           |
| :-------------------------- | :------------------------------------------------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aria-describedby            | `string`                                                      | -           | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                       |
| aria-details                | `string`                                                      | -           | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                    |
| aria-label                  | `string`                                                      | -           | Defines a string value that labels the current element.                                                                                                                                                                                                                               |
| aria-labelledby             | `string`                                                      | -           | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                 |
| autoComplete                | `string`                                                      | -           | Describes the type of autocomplete functionality the input should provide if any. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).                                                                                              |
| autoFocus                   | `boolean`                                                     | -           | Whether the element should receive focus on render.                                                                                                                                                                                                                                   |
| children                    | `ChildrenOrFunction`                                          | -           | The children of the component. A function may be provided to alter the children based on component state.                                                                                                                                                                             |
| dateUnavailable             | `((date: DateValue) => boolean)`                              | -           | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                                                                                                                                                              |
| defaultOpen                 | `boolean`                                                     | -           | Whether the overlay is open by default (uncontrolled).                                                                                                                                                                                                                                |
| defaultValue                | `DateValue \| null`                                           | -           | The default value (uncontrolled).                                                                                                                                                                                                                                                     |
| description                 | `ReactNode`                                                   | -           | A helpful text.                                                                                                                                                                                                                                                                       |
| dir                         | `string`                                                      | -           |                                                                                                                                                                                                                                                                                       |
| disabled                    | `boolean`                                                     | `"false"`   | If \`true\`, the date picker is disabled.                                                                                                                                                                                                                                             |
| error                       | `boolean`                                                     | `"false"`   | If \`true\`, the field is considered invalid and if set the errorMessage is shown instead of the \`description\`.                                                                                                                                                                     |
| errorMessage                | `ReactNode \| ((v: ValidationResult) => ReactNode)`           | -           | An error message.                                                                                                                                                                                                                                                                     |
| firstDayOfWeek              | `"sun" \| "mon" \| "tue" \| "wed" \| "thu" \| "fri" \| "sat"` | -           | The day that starts the week.                                                                                                                                                                                                                                                         |
| form                        | `string`                                                      | -           | The \`\` element to associate the input with. The value of this attribute must be the id of a \`\` in the same document. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).                                                               |
| granularity                 | `Granularity`                                                 | `"day"`     | Determines the smallest unit that is displayed in the date picker. By default, this is \`"day"\` for dates, and \`"minute"\` for times.                                                                                                                                               |
| hidden                      | `boolean`                                                     | -           |                                                                                                                                                                                                                                                                                       |
| hideTimeZone                | `boolean`                                                     | `"false"`   | Whether to hide the time zone abbreviation.                                                                                                                                                                                                                                           |
| hourCycle                   | `12 \| 24`                                                    | -           | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.                                                                                                                                                                             |
| id                          | `string`                                                      | -           | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                |
| inert                       | `boolean`                                                     | -           |                                                                                                                                                                                                                                                                                       |
| label                       | `ReactNode`                                                   | -           | Specifies the label of the field.                                                                                                                                                                                                                                                     |
| lang                        | `string`                                                      | -           |                                                                                                                                                                                                                                                                                       |
| maxValue                    | `DateValue \| null`                                           | -           | The maximum allowed date that a user may select.                                                                                                                                                                                                                                      |
| minValue                    | `DateValue \| null`                                           | -           | The minimum allowed date that a user may select.                                                                                                                                                                                                                                      |
| name                        | `string`                                                      | -           | The name of the input element, used when submitting an HTML form. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).                                                                                                                      |
| onAnimationEnd              | `AnimationEventHandler`                                       | -           |                                                                                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`                                       | -           |                                                                                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`                                       | -           |                                                                                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`                                       | -           |                                                                                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`                                       | -           |                                                                                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`                                       | -           |                                                                                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onBlur                      | `((e: FocusEvent) => void)`                                   | -           | Handler that is called when the element loses focus.                                                                                                                                                                                                                                  |
| onChange                    | `((value: DateValue \| null) => void)`                        | -           | Handler that is called when the value changes.                                                                                                                                                                                                                                        |
| onClick                     | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onClickCapture              | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onFocus                     | `((e: FocusEvent) => void)`                                   | -           | Handler that is called when the element receives focus.                                                                                                                                                                                                                               |
| onFocusChange               | `((isFocused: boolean) => void)`                              | -           | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onKeyDown                   | `((e: KeyboardEvent) => void)`                                | -           | Handler that is called when a key is pressed.                                                                                                                                                                                                                                         |
| onKeyUp                     | `((e: KeyboardEvent) => void)`                                | -           | Handler that is called when a key is released.                                                                                                                                                                                                                                        |
| onLostPointerCapture        | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onOpenChange                | `((isOpen: boolean) => void)`                                 | -           | Handler that is called when the overlay's open state changes.                                                                                                                                                                                                                         |
| onPointerCancel             | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`                                         | -           |                                                                                                                                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`                                              | -           |                                                                                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`                                              | -           |                                                                                                                                                                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`                                      | -           |                                                                                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`                                           | -           |                                                                                                                                                                                                                                                                                       |
| open                        | `boolean`                                                     | `"false"`   | Whether the calendar is open by default (controlled).                                                                                                                                                                                                                                 |
| pageBehavior                | `PageBehavior`                                                | `"visible"` | Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration.                                                                                                                                   |
| placeholderValue            | `DateValue \| null`                                           | -           | A placeholder date that influences the format of the placeholder shown when no value is selected. Defaults to today's date at midnight.                                                                                                                                               |
| readOnly                    | `boolean`                                                     | `"false"`   | If \`true\`, the date picker is readOnly.                                                                                                                                                                                                                                             |
| ref                         | `Ref`                                                         | -           | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| required                    | `boolean`                                                     | `"false"`   | If \`true\`, the date picker is required.                                                                                                                                                                                                                                             |
| shouldCloseOnSelect         | `boolean \| (() => boolean)`                                  | `"true"`    | Determines whether the date picker popover should close automatically when a date is selected.                                                                                                                                                                                        |
| shouldForceLeadingZeros     | `boolean`                                                     | -           | Whether to always show leading zeros in the month, day, and hour fields. By default, this is determined by the user's locale.                                                                                                                                                         |
| slot                        | `string \| null`                                              | -           | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                    |
| translate                   | `"yes" \| "no"`                                               | -           |                                                                                                                                                                                                                                                                                       |
| validate                    | `((value: DateValue) => true \| ValidationError \| null)`     | -           | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if \`validationBehavior="native"\`. For realtime validation, use the \`isInvalid\` prop instead.                                         |
| validationBehavior          | `"native" \| "aria"`                                          | `'native'`  | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA.                                                                                                                        |
| value                       | `DateValue \| null`                                           | -           | The current value (controlled).                                                                                                                                                                                                                                                       |
| width                       | `WidthProp`                                                   | -           | Sets the width of the field. You can see allowed tokens here: https\://tailwindcss.com/docs/width                                                                                                                                                                                     |

## Alternative components

<ul>
  <li>
    [DateField](/components/form/datefield): Allows users to input a date
    directly.
  </li>
</ul>

## Related

- [Form developement guide](../../patterns/form-implementation) - Learn how to build forms.

- [Form Fields](../../foundations/form-fields) - Learn how to build forms.
