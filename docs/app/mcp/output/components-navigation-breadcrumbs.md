# Breadcrumbs

_A component for displaying hierarchical navigation with separators._

The `<Breadcrumbs>` component helps users to understand their current location within a website or app. It shows a sequence of clickable items, each representing a step or level in the hierarchy, making it easier to navigate back to previous pages or sections.

## Anatomy

The `<Breadcrumbs>` component consists of breadcrumb items and separators, such as chevrons, arranged in a horizontal trail to represent a navigation path.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                        | Description                                 |
| :-------- | :-------------------------- | :------------------------------------------ |
| `variant` | `default`                   | `The available variants of this component.` |
| `size`    | `small \| default \| large` | `The available sizes of this component.`    |

## Usage

`<Breadcrumbs>` are typically used to display a navigational hierarchy, showing the path from the homepage to the current page. Each `Breadcrumbs.Item` represents a step in this path and must include an `href` to define its destination. All items are rendered as links, allowing users to quickly navigate back to previous levels, reducing the number of clicks needed and improving the overall user experience.

```tsx title="breadcrumbs-appearance"
import { Breadcrumbs, BreadcrumbsProps } from '@marigold/components';

export default (props: BreadcrumbsProps) => (
  <Breadcrumbs {...props}>
    <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
  </Breadcrumbs>
);
```

### Collapsing Breadcrumbs

When the breadcrumb list exceeds the maximum number of visible items, it can collapse to show an ellipsis ("..."). This feature is helpful when dealing with deep navigation structures that may overwhelm the user.

```tsx title="breadcrumbs-collapsing"
import { Breadcrumbs } from '@marigold/components';

export default () => (
  <Breadcrumbs maxVisibleItems={4}>
    <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Pop</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Freiburg im Breisgau</Breadcrumbs.Item>
  </Breadcrumbs>
);
```

### As Navigation

Here’s a revised version with a more supportive tone:

Using breadcrumbs as navigation

When breadcrumbs represent the primary or secondary navigation for a page, place them in a `<nav>` element with an appropriate `aria-label` (e.g. `aria-label="Breadcrumbs"`). This creates a navigation landmark that helps assistive technologies identify key sections of the page. To support a clearer page structure, keep the number of landmarks minimal and avoid using them for breadcrumbs in contexts like table rows or popovers.

```tsx title="breadcrumbs-navigation"
import { Breadcrumbs } from '@marigold/components';

export default () => (
  <nav aria-label="Breadcrumbs">
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Music</Breadcrumbs.Item>
    </Breadcrumbs>
  </nav>
);
```

## Props

### Breadcrumbs

| Prop                        | Type                       | Default   | Description                                                                                                                                                                                                                                                                           |
| :-------------------------- | :------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aria-describedby            | `string`                   | -         | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                       |
| aria-details                | `string`                   | -         | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                    |
| aria-label                  | `string`                   | -         | Defines a string value that labels the current element.                                                                                                                                                                                                                               |
| aria-labelledby             | `string`                   | -         | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                 |
| **children (required)**     | `ReactNode \| ReactNode[]` | -         | The breadcrumb items to be displayed.                                                                                                                                                                                                                                                 |
| dependencies                | `readonly any[]`           | -         | Values that should invalidate the item cache when using dynamic collections.                                                                                                                                                                                                          |
| dir                         | `string`                   | -         |                                                                                                                                                                                                                                                                                       |
| disabled                    | `boolean`                  | `"false"` | Disables the breadcrumbs.                                                                                                                                                                                                                                                             |
| hidden                      | `boolean`                  | -         |                                                                                                                                                                                                                                                                                       |
| id                          | `string`                   | -         | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                |
| inert                       | `boolean`                  | -         |                                                                                                                                                                                                                                                                                       |
| items                       | `Iterable`                 | -         | Item objects in the collection.                                                                                                                                                                                                                                                       |
| lang                        | `string`                   | -         |                                                                                                                                                                                                                                                                                       |
| maxVisibleItems             | `number`                   | -         | Maximum number of visible items before the breadcrumbs collapse.                                                                                                                                                                                                                      |
| onAction                    | `((key: Key) => void)`     | -         | Handler that is called when a breadcrumb is clicked.                                                                                                                                                                                                                                  |
| onAnimationEnd              | `AnimationEventHandler`    | -         |                                                                                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`    | -         |                                                                                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`    | -         |                                                                                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`    | -         |                                                                                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`    | -         |                                                                                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`    | -         |                                                                                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onClick                     | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onClickCapture              | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onLostPointerCapture        | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onPointerCancel             | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`      | -         |                                                                                                                                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`           | -         |                                                                                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`           | -         |                                                                                                                                                                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`   | -         |                                                                                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`        | -         |                                                                                                                                                                                                                                                                                       |
| ref                         | `Ref`                      | -         | Allows getting a ref to the component instance. Once the component unmounts, React will set \`ref.current\` to \`null\` (or call the ref with \`null\` if you passed a callback ref). @see \{@link https\://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| slot                        | `string \| null`           | -         | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                    |
| translate                   | `"yes" \| "no"`            | -         |                                                                                                                                                                                                                                                                                       |

### Breadcrumbs.Item

| Prop                        | Type                     | Default | Description                                                                                          |
| :-------------------------- | :----------------------- | :------ | :--------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                 | -       | Identifies the element (or elements) that describes the object.                                      |
| aria-details                | `string`                 | -       | Identifies the element (or elements) that provide a detailed, extended description for the object.   |
| aria-label                  | `string`                 | -       | Defines a string value that labels the current element.                                              |
| aria-labelledby             | `string`                 | -       | Identifies the element (or elements) that labels the current element.                                |
| **children (required)**     | `ReactNode`              | -       | The content inside the breadcrumb.                                                                   |
| dir                         | `string`                 | -       |                                                                                                      |
| hidden                      | `boolean`                | -       |                                                                                                      |
| **href (required)**         | `string`                 | -       | Link for the breadcrumb item.                                                                        |
| id                          | `Key`                    | -       | A unique id for the breadcrumb, which will be passed to \`onAction\` when the breadcrumb is pressed. |
| inert                       | `boolean`                | -       |                                                                                                      |
| lang                        | `string`                 | -       |                                                                                                      |
| onAnimationEnd              | `AnimationEventHandler`  | -       |                                                                                                      |
| onAnimationEndCapture       | `AnimationEventHandler`  | -       |                                                                                                      |
| onAnimationIteration        | `AnimationEventHandler`  | -       |                                                                                                      |
| onAnimationIterationCapture | `AnimationEventHandler`  | -       |                                                                                                      |
| onAnimationStart            | `AnimationEventHandler`  | -       |                                                                                                      |
| onAnimationStartCapture     | `AnimationEventHandler`  | -       |                                                                                                      |
| onAuxClick                  | `MouseEventHandler`      | -       |                                                                                                      |
| onAuxClickCapture           | `MouseEventHandler`      | -       |                                                                                                      |
| onClick                     | `MouseEventHandler`      | -       |                                                                                                      |
| onClickCapture              | `MouseEventHandler`      | -       |                                                                                                      |
| onContextMenu               | `MouseEventHandler`      | -       |                                                                                                      |
| onContextMenuCapture        | `MouseEventHandler`      | -       |                                                                                                      |
| onDoubleClick               | `MouseEventHandler`      | -       |                                                                                                      |
| onDoubleClickCapture        | `MouseEventHandler`      | -       |                                                                                                      |
| onGotPointerCapture         | `PointerEventHandler`    | -       |                                                                                                      |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -       |                                                                                                      |
| onLostPointerCapture        | `PointerEventHandler`    | -       |                                                                                                      |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -       |                                                                                                      |
| onMouseDown                 | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseDownCapture          | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseEnter                | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseLeave                | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseMove                 | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseMoveCapture          | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseOut                  | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseOutCapture           | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseOver                 | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseOverCapture          | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseUp                   | `MouseEventHandler`      | -       |                                                                                                      |
| onMouseUpCapture            | `MouseEventHandler`      | -       |                                                                                                      |
| onPointerCancel             | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerCancelCapture      | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerDown               | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerDownCapture        | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerEnter              | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerLeave              | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerMove               | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerMoveCapture        | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerOut                | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerOutCapture         | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerOver               | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerOverCapture        | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerUp                 | `PointerEventHandler`    | -       |                                                                                                      |
| onPointerUpCapture          | `PointerEventHandler`    | -       |                                                                                                      |
| onScroll                    | `UIEventHandler`         | -       |                                                                                                      |
| onScrollCapture             | `UIEventHandler`         | -       |                                                                                                      |
| onTouchCancel               | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchCancelCapture        | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchEnd                  | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchEndCapture           | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchMove                 | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchMoveCapture          | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchStart                | `TouchEventHandler`      | -       |                                                                                                      |
| onTouchStartCapture         | `TouchEventHandler`      | -       |                                                                                                      |
| onTransitionCancel          | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionCancelCapture   | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionEnd             | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionEndCapture      | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionRun             | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionRunCapture      | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionStart           | `TransitionEventHandler` | -       |                                                                                                      |
| onTransitionStartCapture    | `TransitionEventHandler` | -       |                                                                                                      |
| onWheel                     | `WheelEventHandler`      | -       |                                                                                                      |
| onWheelCapture              | `WheelEventHandler`      | -       |                                                                                                      |
| translate                   | `"yes" \| "no"`          | -       |                                                                                                      |
