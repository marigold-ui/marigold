# Divider

_Component to seperate content._

A `<Divider>` is a visual separator between two groups of content,
e.g. groups of menu items or sections of a page.

## Anatomy

The `<Divider>` component contains a single element that can be used to create a horizontal or vertical line to separate content.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type              | Description                                 |
| :-------- | :---------------- | :------------------------------------------ |
| `variant` | `default \| bold` | `The available variants of this component.` |
| `size`    | `-`               | `The available sizes of this component.`    |

## Usage

You should use `<Divider>` to visually separate related content, such as sections in a settings page, items in a list, or actions in a toolbar. They help improve clarity and organization without adding semantic meaning. However, dividers should be used sparingly—only when spacing alone doesn’t provide enough separation. Avoid them if they create visual clutter or when semantic elements like headings or sections are more appropriate.

```tsx title="divider-text"
import { Divider, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Stack space={2}>
      <Text weight="bold">Account Information</Text>
      <Text>Update your name, email address, and password.</Text>
    </Stack>
    <Divider />
    <Stack space={2}>
      <Text weight="bold">Notification Settings</Text>
      <Text> Choose how you want to receive updates and alerts.</Text>
    </Stack>
  </Stack>
);
```

### Accessibility

The `<Divider>` uses the ARIA role separator to indicate that it visually separates and distinguishes sections of content or groups of menu items.

## Props

| Prop                        | Type                     | Default        | Description                                                                                                                                                                                                        |
| :-------------------------- | :----------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                 | -              | Identifies the element (or elements) that describes the object.                                                                                                                                                    |
| aria-details                | `string`                 | -              | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                 |
| aria-label                  | `string`                 | -              | Defines a string value that labels the current element.                                                                                                                                                            |
| aria-labelledby             | `string`                 | -              | Identifies the element (or elements) that labels the current element.                                                                                                                                              |
| dir                         | `string`                 | -              |                                                                                                                                                                                                                    |
| elementType                 | `string`                 | -              | The HTML element type that will be used to render the separator.                                                                                                                                                   |
| hidden                      | `boolean`                | -              |                                                                                                                                                                                                                    |
| id                          | `string`                 | -              | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                             |
| inert                       | `boolean`                | -              |                                                                                                                                                                                                                    |
| lang                        | `string`                 | -              |                                                                                                                                                                                                                    |
| onAnimationEnd              | `AnimationEventHandler`  | -              |                                                                                                                                                                                                                    |
| onAnimationEndCapture       | `AnimationEventHandler`  | -              |                                                                                                                                                                                                                    |
| onAnimationIteration        | `AnimationEventHandler`  | -              |                                                                                                                                                                                                                    |
| onAnimationIterationCapture | `AnimationEventHandler`  | -              |                                                                                                                                                                                                                    |
| onAnimationStart            | `AnimationEventHandler`  | -              |                                                                                                                                                                                                                    |
| onAnimationStartCapture     | `AnimationEventHandler`  | -              |                                                                                                                                                                                                                    |
| onAuxClick                  | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onAuxClickCapture           | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onClick                     | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onClickCapture              | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onContextMenu               | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onContextMenuCapture        | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onDoubleClick               | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onDoubleClickCapture        | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onGotPointerCapture         | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onLostPointerCapture        | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onMouseDown                 | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseDownCapture          | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseEnter                | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseLeave                | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseMove                 | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseMoveCapture          | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseOut                  | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseOutCapture           | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseOver                 | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseOverCapture          | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseUp                   | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onMouseUpCapture            | `MouseEventHandler`      | -              |                                                                                                                                                                                                                    |
| onPointerCancel             | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerCancelCapture      | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerDown               | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerDownCapture        | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerEnter              | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerLeave              | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerMove               | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerMoveCapture        | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerOut                | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerOutCapture         | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerOver               | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerOverCapture        | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerUp                 | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onPointerUpCapture          | `PointerEventHandler`    | -              |                                                                                                                                                                                                                    |
| onScroll                    | `UIEventHandler`         | -              |                                                                                                                                                                                                                    |
| onScrollCapture             | `UIEventHandler`         | -              |                                                                                                                                                                                                                    |
| onTouchCancel               | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchCancelCapture        | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchEnd                  | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchEndCapture           | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchMove                 | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchMoveCapture          | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchStart                | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTouchStartCapture         | `TouchEventHandler`      | -              |                                                                                                                                                                                                                    |
| onTransitionCancel          | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionCancelCapture   | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionEnd             | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionEndCapture      | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionRun             | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionRunCapture      | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionStart           | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onTransitionStartCapture    | `TransitionEventHandler` | -              |                                                                                                                                                                                                                    |
| onWheel                     | `WheelEventHandler`      | -              |                                                                                                                                                                                                                    |
| onWheelCapture              | `WheelEventHandler`      | -              |                                                                                                                                                                                                                    |
| orientation                 | `AlignmentProp`          | `'horizontal'` | The orientation of the separator.                                                                                                                                                                                  |
| slot                        | `string \| null`         | -              | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent. |
| translate                   | `"yes" \| "no"`          | -              |                                                                                                                                                                                                                    |

## Alternative components

- **Stack**: If you need to create space between elements, consider using the `<Stack>` component instead of a divider. It provides spacing without the visual line.
