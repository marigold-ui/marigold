# Button

_Buttons allow users to trigger actions._

The `<Button>` component is a crucial components of any user interface, allowing users to initiate actions such as submitting forms, adding items to a cart, or opening dialogs. The label on a button indicates the action that will be taken when the user presses it.

Different types of buttons, such as primary and secondary, help guide users by visually prioritizing actions. Primary buttons are typically used for the most important actions, while secondary buttons provide less critical options.

## Anatomy

A button consists of a pressable area, often containing a textual label or icon, which users can press or activate using the Space or Enter keys.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                                                        | Description                                 |
| :-------- | :-------------------------------------------------------------------------- | :------------------------------------------ |
| `variant` | `primary \| secondary \| ghost \| destructive \| destructive-ghost \| link` | `The available variants of this component.` |
| `size`    | `default \| small \| large \| icon`                                         | `The available sizes of this component.`    |

## Usage

Buttons have a wide range of applications. Their most common usage is to submit forms, but they are also used for other actions like opening a `<Menu>` or `<Dialog>`.

It is essential that the label and context around the button clearly set expectations for what will happen when the user interacts with it. In user interfaces, buttons guide interactions, providing clear call-to-action elements that help users navigate and complete tasks.

✓ Write button text that is clear, starts with a verb, and helps users confidently take action.

✓ Keep button labels short and to the point.

### Visual hierarchy

This primary button should represent the most crucial action within that section. Having multiple primary buttons in one section can create confusion and visual clutter, as they compete for the user's attention and detract from the clarity of the intended action.

✓ Use one primary button per page or section to highlight the most important action

✗ Don't include multiple primary buttons in the same section to prevent confusion and visual clutter.

### Placement and order

Depending on where buttons are used, it is advisable to place them appropriately and in the correct order.

- on full size pages buttons should be aligned from left to right means using the variants from primary → secondary → ghost

- on dialogs, drawers, toasts or even wizards buttons should be aligned from right to left, also using the variants from primary → secondary → ghost

> ℹ️ Navigation: When using actions to navigate away from the page you should use the `<LinkButton>` or the `<Link>` component.
> `<Link>` has no `ghost` variant - use `secondary` instead.

```tsx title="button-placement-order"
import {
  Button,
  Dialog,
  Form,
  Headline,
  Inline,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Form>
    <Stack space={5}>
      <Headline level={3}>Left aligned buttons</Headline>
      <TextField label="Name" />
      <TextField label="Email" type="email" />

      {/* Left-aligned form actions */}
      <Inline space={5} alignY="center" alignX="left">
        <Button variant="primary">Update</Button>
        <Dialog.Trigger>
          <Button>Open dialog</Button>
          <Dialog size="xsmall">
            <Dialog.Title>Right aligned buttons</Dialog.Title>
            <Dialog.Content>
              <Stack space={3}>
                <TextField label="Old password" type="password" autoFocus />
                <TextField label="New password" type="password" />
              </Stack>
            </Dialog.Content>
            <Dialog.Actions>
              <Button variant="ghost" slot="close">
                Cancel
              </Button>
              <Button variant="secondary">Save and exit</Button>
              <Button variant="primary">Update</Button>
            </Dialog.Actions>
          </Dialog>
        </Dialog.Trigger>
        <Button variant="ghost">Cancel</Button>
      </Inline>
    </Stack>
  </Form>
);
```

### Icons and labels

Icons can reinforce text labels, but they can also cause confusion if they don't clearly match the related text. Buttons should always have a label unless they use an icon that is universally understood and accessible.

Accompany labels with icons only when they have a strong association with the text, never use icon purely for decoration.

Icon-only buttons should only be used when the icon is universally recognized and its function is clear without additional text, like a pencil for editing. These buttons are particularly useful in compact spaces or mobile interfaces where screen real estate is limited.

```tsx title="button-icon"
import { Button, Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';

export default () => (
  <Inline space={5} alignY="center" alignX="center">
    <Button variant="primary">Edit</Button>
    <Button variant="primary">
      <Edit size={16} /> Edit
    </Button>
    <Button variant="icon" aria-label="Edit">
      <Edit />
    </Button>
  </Inline>
);
```

> ℹ️ Keep it accessible: For icon-only buttons, ensure you set an `aria-label` or `aria-labelledby`
> attribute to provide context and maintain accessibility.

✓ Use icons in buttons to provide additional clarity when the icon is highly relevant to the action.

✗ Icons should not be used for decoration.

### Destructive buttons

Destructive buttons are reserved for actions that carry significant and often irreversible consequences, such as permanently deleting data, formatting storage, or performing actions that are difficult to undo. They must be visually distinct to immediately signal to the user the potential impact of their decision.

In Marigold, we offer two dedicated visual variants for implementing destructive actions:

| Variant           | Prominence | Use Case                                                                                                                                                                                                    |
| :---------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| destructive       | High       | Use for the primary destructive action within a context, such as the "Delete Permanently" button in a final confirmation dialog. Use sparingly to avoid overwhelming users with too many high-risk options. |
| destructive-ghost | Low        | Use for secondary destructive actions, particularly when the main action in the current view is non-destructive (e.g., a small "Delete" button on an item in a list view).                                  |

```tsx title="button-destructive"
import { Button, Inline } from '@marigold/components';

export default () => (
  <Inline space={5} alignY="center" alignX="center">
    <Button variant="destructive">Delete</Button>
    <Button variant="destructive-ghost">Delete</Button>
  </Inline>
);
```

### Avoid disabled buttons

A disabled button can't be actioned. Keep buttons active and use validation and error messages to guide users on what needs to be done to proceed.

Disabled buttons are problematic as they offer no feedback on why an action is unavailable, are often hard to see due to low contrast, and are inaccessible to keyboard users who cannot focus on them.

✓ Use validation and error messages to guide users on the necessary steps.

✗ Don't disable form submission buttons, as this doesn't clearly guide users on how to proceed.

In general, it's best to avoid using disabled buttons. However, if they are necessary, take steps to make them more inclusive. Ensure users don't get stuck by providing additional information. Place a message near the disabled button that explains why it is unavailable and what actions are needed to enable it.

```tsx title="button-disabled"
import { Button, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={1} alignX="left">
    <Button disabled>Add discount code</Button>
    <Text color="text-base-disabled" fontSize="xs">
      Only Fanclub members can add a discount code. If you're a Fanclub member,
      please log in first.
    </Text>
  </Stack>
);
```

> ⚠️ Never put tooltips on disabled buttonsTooltips aren't accessible on all devices or by some assistive technologies,
> and they should never be used on non-interactive elements. For more
> information see the tooltip page.

### Loading state

The `<Button>` component includes a `loading` property that can be used to display loading behavior. This visually indicates the progress of system operations, such as downloading, uploading, or processing tasks. The loading spinner always shows an indeterminate progress to signify that the duration of the operation is unknown.

This functionality is especially useful when performing actions like submitting a form or saving changes in your application that require time to complete a request. While the button is in the loading state, it becomes disabled, preventing further interaction until the operation is completed.

The button's label should clearly describe the action being performed, providing context for the current state of the process, like also mentioned in [Icons and labels](#icons-and-labels).

When the loading state is activated, the label becomes hidden. To ensure accessibility, we provide the loading state with an `aria-label` and `aria-busy`.

The `loading` property must be added manually to a Button, and is intended for processes that typically last more than 1 second.

```tsx title="button-loading"
import { useState } from 'react';
import { Button, Inline } from '@marigold/components';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = async () => {
    setLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 7000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Inline space={4}>
      <Button
        variant="primary"
        onPress={() => handleLoading()}
        loading={loading}
      >
        Save
      </Button>
    </Inline>
  );
};
```

### Full-width

Full-width buttons are especially useful for emphasizing primary actions like submitting a form or completing a purchase, as they attract attention and create a strong visual hierarchy. They also enhance usability on mobile devices or in narrow layouts by providing a larger, easier-to-tap target.

```tsx title="button-full-width"
import { Button } from '@marigold/components';

export default () => (
  <Button variant="primary" fullWidth>
    Proceed to checkout
  </Button>
);
```

### Button or link

If the user interacts with the element and it results in navigation to another page without submitting a form, use an anchor element (`<Link>` or `<LinkButton>`). For all other interactions that perform actions on the same page, use a button (`<Button>`).

Understanding this distinction is crucial: anchors handle navigation, while buttons handle page-specific actions. Misusing them can cause accessibility and usability issues, as anchors support tab-opening and navigation, while buttons do not.

To visually imitate a button element that navigates (e.g., a "Cancel" action that redirects users to the previous page), use the [`<ButtonLink>`](/components/actions/button-link) component with the corresponding `variant`, usually the default `secondary`. This way, the action is clear and prominent while keeping its navigation function.

```tsx title="button-link"
import { Button, Inline, LinkButton } from '@marigold/components';

export default () => (
  <Inline space={2} alignY="center" alignX="center">
    <Button variant="primary">Save</Button>
    <LinkButton href="#">Cancel</LinkButton>
  </Inline>
);
```

✓ Use buttons to trigger an event or an action.

✗ Don't use buttons for navigation purposes.

### Press Event

The `<Button>` component supports user interactions via mouse, keyboard, and touch, handled through the `onPress ` prop. This prop is similar to the standard `onClick` event but is normalized for all interaction methods. Additionally, `onPressStart`, `onPressEnd`, and `onPressChange` events are fired during user interaction.

Each handler receives a `PressEvent`, providing details about the target and the type of event that triggered the interaction, like the pointer (mouse, keyboard or touch) that was used.

```tsx title="button-press"
import { useState } from 'react';
import { Button, Stack, Text } from '@marigold/components';

export default () => {
  const [pointerType, setPointerType] = useState('');
  const [count, setCount] = useState(0);

  return (
    <Stack space={3} alignX="left">
      <Button
        variant="primary"
        onPress={() => setCount(count + 1)}
        onPressStart={e => setPointerType(e.pointerType)}
        onPressEnd={() => setPointerType('')}
      >
        Press me
      </Button>
      <Text>
        Number of times pressed: {count} (
        {pointerType
          ? `Button is pressed via ${pointerType}.`
          : 'Button not pressed.'}
        )
      </Text>
    </Stack>
  );
};
```

## Props

| Prop                        | Type                                                                                  | Default    | Description                                                                                                                                                                                                                                                                                   |
| :-------------------------- | :------------------------------------------------------------------------------------ | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-controls               | `string`                                                                              | -          | Identifies the element (or elements) whose contents or presence are controlled by the current element.                                                                                                                                                                                        |
| aria-current                | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"`  | -          | Indicates whether this element represents the current item within a container or set of related elements.                                                                                                                                                                                     |
| aria-describedby            | `string`                                                                              | -          | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                               |
| aria-details                | `string`                                                                              | -          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                            |
| aria-disabled               | `boolean \| "true" \| "false"`                                                        | -          | Indicates whether the element is disabled to users of assistive technology.                                                                                                                                                                                                                   |
| aria-expanded               | `boolean \| "true" \| "false"`                                                        | -          | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.                                                                                                                                                                                   |
| aria-haspopup               | `boolean \| "true" \| "false" \| "menu" \| "listbox" \| "tree" \| "grid" \| "dialog"` | -          | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.                                                                                                                                                                |
| aria-label                  | `string`                                                                              | -          | Defines a string value that labels the current element.                                                                                                                                                                                                                                       |
| aria-labelledby             | `string`                                                                              | -          | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                         |
| aria-pressed                | `boolean \| "true" \| "false" \| "mixed"`                                             | -          | Indicates the current "pressed" state of toggle buttons.                                                                                                                                                                                                                                      |
| autoFocus                   | `boolean`                                                                             | -          | Whether the element should receive focus on render.                                                                                                                                                                                                                                           |
| children                    | `ReactNode`                                                                           | -          | Children of the component                                                                                                                                                                                                                                                                     |
| dir                         | `string`                                                                              | -          |                                                                                                                                                                                                                                                                                               |
| disabled                    | `boolean`                                                                             | `"false"`  | Disables the button.                                                                                                                                                                                                                                                                          |
| excludeFromTabOrder         | `boolean`                                                                             | -          | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| form                        | `string`                                                                              | -          | The \`\` element to associate the button with. The value of this attribute must be the id of a \`\` in the same document. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#form).                                                                     |
| formAction                  | `string`                                                                              | -          | The URL that processes the information submitted by the button. Overrides the action attribute of the button's form owner.                                                                                                                                                                    |
| formEncType                 | `string`                                                                              | -          | Indicates how to encode the form data that is submitted.                                                                                                                                                                                                                                      |
| formMethod                  | `string`                                                                              | -          | Indicates the HTTP method used to submit the form.                                                                                                                                                                                                                                            |
| formNoValidate              | `boolean`                                                                             | -          | Indicates that the form is not to be validated when it is submitted.                                                                                                                                                                                                                          |
| formTarget                  | `string`                                                                              | -          | Overrides the target attribute of the button's form owner.                                                                                                                                                                                                                                    |
| fullWidth                   | `boolean`                                                                             | `"false"`  | If true, the element stretches to fill the available width.                                                                                                                                                                                                                                   |
| hidden                      | `boolean`                                                                             | -          |                                                                                                                                                                                                                                                                                               |
| id                          | `string`                                                                              | -          | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                        |
| inert                       | `boolean`                                                                             | -          |                                                                                                                                                                                                                                                                                               |
| lang                        | `string`                                                                              | -          |                                                                                                                                                                                                                                                                                               |
| loading                     | `boolean`                                                                             | -          | Whether the button is in a loading state. This disables press and hover events while retaining focusability, and announces the loading state to screen readers.                                                                                                                               |
| name                        | `string`                                                                              | -          | Submitted as a pair with the button's value as part of the form data.                                                                                                                                                                                                                         |
| onAnimationEnd              | `AnimationEventHandler`                                                               | -          |                                                                                                                                                                                                                                                                                               |
| onAnimationEndCapture       | `AnimationEventHandler`                                                               | -          |                                                                                                                                                                                                                                                                                               |
| onAnimationIteration        | `AnimationEventHandler`                                                               | -          |                                                                                                                                                                                                                                                                                               |
| onAnimationIterationCapture | `AnimationEventHandler`                                                               | -          |                                                                                                                                                                                                                                                                                               |
| onAnimationStart            | `AnimationEventHandler`                                                               | -          |                                                                                                                                                                                                                                                                                               |
| onAnimationStartCapture     | `AnimationEventHandler`                                                               | -          |                                                                                                                                                                                                                                                                                               |
| onAuxClick                  | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onAuxClickCapture           | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onBlur                      | `((e: FocusEvent) => void)`                                                           | -          | Handler that is called when the element loses focus.                                                                                                                                                                                                                                          |
| onClick                     | `((e: MouseEvent) => void)`                                                           | -          | \*\*Not recommended – use \`onPress\` instead.\*\* \`onClick\` is an alias for \`onPress\` provided for compatibility with other libraries. \`onPress\` provides additional event details for non-mouse interactions.                                                                         |
| onClickCapture              | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onContextMenu               | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onContextMenuCapture        | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onDoubleClick               | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onDoubleClickCapture        | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onFocus                     | `((e: FocusEvent) => void)`                                                           | -          | Handler that is called when the element receives focus.                                                                                                                                                                                                                                       |
| onFocusChange               | `((isFocused: boolean) => void)`                                                      | -          | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                               |
| onGotPointerCapture         | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onHoverChange               | `((isHovering: boolean) => void)`                                                     | -          | Handler that is called when the hover state changes.                                                                                                                                                                                                                                          |
| onHoverEnd                  | `((e: HoverEvent) => void)`                                                           | -          | Handler that is called when a hover interaction ends.                                                                                                                                                                                                                                         |
| onHoverStart                | `((e: HoverEvent) => void)`                                                           | -          | Handler that is called when a hover interaction starts.                                                                                                                                                                                                                                       |
| onKeyDown                   | `((e: KeyboardEvent) => void)`                                                        | -          | Handler that is called when a key is pressed.                                                                                                                                                                                                                                                 |
| onKeyUp                     | `((e: KeyboardEvent) => void)`                                                        | -          | Handler that is called when a key is released.                                                                                                                                                                                                                                                |
| onLostPointerCapture        | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onLostPointerCaptureCapture | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onMouseDown                 | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseDownCapture          | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseEnter                | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseLeave                | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseMove                 | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseMoveCapture          | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseOut                  | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseOutCapture           | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseOver                 | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseOverCapture          | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseUp                   | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onMouseUpCapture            | `MouseEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onPointerCancel             | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerCancelCapture      | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerDown               | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerDownCapture        | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerEnter              | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerLeave              | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerMove               | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerMoveCapture        | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerOut                | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerOutCapture         | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerOver               | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerOverCapture        | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerUp                 | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPointerUpCapture          | `PointerEventHandler`                                                                 | -          |                                                                                                                                                                                                                                                                                               |
| onPress                     | `((e: PressEvent) => void)`                                                           | -          | Handler that is called when the press is released over the target.                                                                                                                                                                                                                            |
| onPressChange               | `((isPressed: boolean) => void)`                                                      | -          | Handler that is called when the press state changes.                                                                                                                                                                                                                                          |
| onPressEnd                  | `((e: PressEvent) => void)`                                                           | -          | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target.                                                                                                                                                                           |
| onPressStart                | `((e: PressEvent) => void)`                                                           | -          | Handler that is called when a press interaction starts.                                                                                                                                                                                                                                       |
| onPressUp                   | `((e: PressEvent) => void)`                                                           | -          | Handler that is called when a press is released over the target, regardless of whether it started on the target or not.                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`                                                                      | -          |                                                                                                                                                                                                                                                                                               |
| onScrollCapture             | `UIEventHandler`                                                                      | -          |                                                                                                                                                                                                                                                                                               |
| onTouchCancel               | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchCancelCapture        | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchEnd                  | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchEndCapture           | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchMove                 | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchMoveCapture          | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchStart                | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTouchStartCapture         | `TouchEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionCancel          | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionCancelCapture   | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionEnd             | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionEndCapture      | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionRun             | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionRunCapture      | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionStart           | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onTransitionStartCapture    | `TransitionEventHandler`                                                              | -          |                                                                                                                                                                                                                                                                                               |
| onWheel                     | `WheelEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| onWheelCapture              | `WheelEventHandler`                                                                   | -          |                                                                                                                                                                                                                                                                                               |
| preventFocusOnPress         | `boolean`                                                                             | -          | Whether to prevent focus from moving to the button when pressing it. Caution, this can make the button inaccessible and should only be used when alternative keyboard interaction is provided, such as ComboBox's MenuTrigger or a NumberField's increment/decrement control.                 |
| ref                         | `Ref`                                                                                 | -          | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs}         |
| slot                        | `string \| null`                                                                      | -          | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                            |
| translate                   | `"yes" \| "no"`                                                                       | -          |                                                                                                                                                                                                                                                                                               |
| type                        | `"button" \| "submit" \| "reset"`                                                     | `'button'` | The behavior of the button when used in an HTML form.                                                                                                                                                                                                                                         |
| value                       | `string`                                                                              | -          | The value associated with the button's name when it's submitted with the form data.                                                                                                                                                                                                           |

## Alternative components

- [Link](/components/actions/link): A component to navigate to another page.
- [LinkButton](/components/actions/link-button): A component to navigate to another page but looks like a button.
