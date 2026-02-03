# Tooltip

_Component for displaying short information._

The `<Tooltip>` component offers users short, contextual hints when they hover or focus on specific UI elements. It displays a hint alongside the referenced element, working together to unobtrusively clarify elements in the interface. It’s ideal for brief, passive help that doesn’t require interaction or persistent visibility.

## Anatomy

- **Trigger:** Indicator that can be activated on hover or focus.
- **Caret tip:** Closely associates the tooltip to term to be defined.
- **Tooltip:** Holds the informative text or message.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type               | Description                                 |
| :-------- | :----------------- | :------------------------------------------ |
| `variant` | `default \| white` | `The available variants of this component.` |
| `size`    | `-`                | `The available sizes of this component.`    |

## Usage

Tooltips are best used to provide concise, supportive information for UI elements that may need clarification. They should be brief, non-essential, and avoid disrupting the flow of interaction. Use them to explain unfamiliar icons, edge cases, or provide hints that help users without cluttering the interface.

Icons without visible labels can be unclear, especially for less familiar actions. A tooltip offers quick, contextual clarification by revealing the icon’s purpose on hover or focus. For example, a tooltip might clarify that an icon represents "Download as PDF" when the label is not visible.

```tsx title="tooltip-usage"
'use client';

import { Button, Tooltip } from '@marigold/components';
import { DesignTicket } from '@marigold/icons';

export default () => (
  <Tooltip.Trigger>
    <Button variant="icon" size="large">
      <DesignTicket aria-hidden="true" />
    </Button>
    <Tooltip>Design Ticket</Tooltip>
  </Tooltip.Trigger>
);
```

Avoid using tooltips for critical information, long explanations, or interactive content. If users need persistent guidance, longer descriptions, or help while interacting with a task, consider components like [contextual help](/components/overlay/contextual-help), the [help text](/foundations/form-fields#help-text) of a form fields, or a [message displayed inline](/components/content/section-message). These patterns are better suited for complex or essential information that should not disappear when the user moves their cursor.

✓ Use tooltips to explain icons without a label or to describe uncommon behavior.

✗ Don't use tooltips if the information is essential to complete a task.

### Show on focus

Tooltips can also appear when an element receives keyboard focus, not just on hover. This ensures that users who navigate via keyboard or assistive technologies receive the same helpful information as mouse users.

Use focus-triggered tooltips to improve accessibility, especially for icon-only buttons, form controls, or compact layouts where context is not visually obvious. It’s particularly helpful when the tooltip content clarifies the purpose of an element that lacks a label or descriptive text.

To enable this behavior, set the `trigger` prop on `<Tooltip.Trigger>` to `"focus"`.

```tsx title="tooltip-focus"
'use client';

import { Button, Tooltip } from '@marigold/components';

export default () => (
  <Tooltip.Trigger trigger="focus">
    <Button>Check Availability</Button>
    <Tooltip>View available seats before booking.</Tooltip>
  </Tooltip.Trigger>
);
```

### Accessibility

You do not need to set aria-describedby manually because the `<Tooltip>` component sets it for you. However, if the button contains only an image or icon such as an SVG, make sure to provide an `aria-label` on the button for screen readers, and consider setting `aria-hidden="true"` on the image to avoid redundant announcements.

## Props

### Tooltip

| Prop                        | Type                          | Default  | Description                                                                                                                                                                        |
| :-------------------------- | :---------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                      | -        | Identifies the element (or elements) that describes the object.                                                                                                                    |
| aria-details                | `string`                      | -        | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                 |
| aria-label                  | `string`                      | -        | Defines a string value that labels the current element.                                                                                                                            |
| aria-labelledby             | `string`                      | -        | Identifies the element (or elements) that labels the current element.                                                                                                              |
| arrowBoundaryOffset         | `number`                      | `0`      | The minimum distance the arrow's edge should be from the edge of the overlay element.                                                                                              |
| children                    | `ReactNode`                   | -        | The children of the component.                                                                                                                                                     |
| containerPadding            | `number`                      | `12`     | The placement padding that should be applied between the element and its surrounding container.                                                                                    |
| crossOffset                 | `number`                      | `0`      | The additional offset applied along the cross axis between the element and its anchor element.                                                                                     |
| defaultOpen                 | `boolean`                     | -        | Whether the overlay is open by default (uncontrolled).                                                                                                                             |
| dir                         | `string`                      | -        |                                                                                                                                                                                    |
| hidden                      | `boolean`                     | -        |                                                                                                                                                                                    |
| inert                       | `boolean`                     | -        |                                                                                                                                                                                    |
| isEntering                  | `boolean`                     | -        | Whether the tooltip is currently performing an entry animation.                                                                                                                    |
| isExiting                   | `boolean`                     | -        | Whether the tooltip is currently performing an exit animation.                                                                                                                     |
| lang                        | `string`                      | -        |                                                                                                                                                                                    |
| offset                      | `number`                      | `0`      | The additional offset applied along the main axis between the element and its anchor element.                                                                                      |
| onAnimationEnd              | `AnimationEventHandler`       | -        |                                                                                                                                                                                    |
| onAnimationEndCapture       | `AnimationEventHandler`       | -        |                                                                                                                                                                                    |
| onAnimationIteration        | `AnimationEventHandler`       | -        |                                                                                                                                                                                    |
| onAnimationIterationCapture | `AnimationEventHandler`       | -        |                                                                                                                                                                                    |
| onAnimationStart            | `AnimationEventHandler`       | -        |                                                                                                                                                                                    |
| onAnimationStartCapture     | `AnimationEventHandler`       | -        |                                                                                                                                                                                    |
| onAuxClick                  | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onAuxClickCapture           | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onClick                     | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onClickCapture              | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onContextMenu               | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onContextMenuCapture        | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onDoubleClick               | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onDoubleClickCapture        | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onGotPointerCapture         | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onGotPointerCaptureCapture  | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onLostPointerCapture        | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onLostPointerCaptureCapture | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onMouseDown                 | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseDownCapture          | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseEnter                | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseLeave                | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseMove                 | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseMoveCapture          | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseOut                  | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseOutCapture           | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseOver                 | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseOverCapture          | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseUp                   | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onMouseUpCapture            | `MouseEventHandler`           | -        |                                                                                                                                                                                    |
| onOpenChange                | `((isOpen: boolean) => void)` | -        | Handler that is called when the overlay's open state changes.                                                                                                                      |
| onPointerCancel             | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerCancelCapture      | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerDown               | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerDownCapture        | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerEnter              | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerLeave              | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerMove               | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerMoveCapture        | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerOut                | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerOutCapture         | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerOver               | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerOverCapture        | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerUp                 | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onPointerUpCapture          | `PointerEventHandler`         | -        |                                                                                                                                                                                    |
| onScroll                    | `UIEventHandler`              | -        |                                                                                                                                                                                    |
| onScrollCapture             | `UIEventHandler`              | -        |                                                                                                                                                                                    |
| onTouchCancel               | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchCancelCapture        | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchEnd                  | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchEndCapture           | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchMove                 | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchMoveCapture          | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchStart                | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTouchStartCapture         | `TouchEventHandler`           | -        |                                                                                                                                                                                    |
| onTransitionCancel          | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionCancelCapture   | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionEnd             | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionEndCapture      | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionRun             | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionRunCapture      | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionStart           | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onTransitionStartCapture    | `TransitionEventHandler`      | -        |                                                                                                                                                                                    |
| onWheel                     | `WheelEventHandler`           | -        |                                                                                                                                                                                    |
| onWheelCapture              | `WheelEventHandler`           | -        |                                                                                                                                                                                    |
| open                        | `boolean`                     | -        | Whether the element is rendered.                                                                                                                                                   |
| placement                   | `Placement`                   | `'top'`  | The placement of the tooltip with respect to the trigger.                                                                                                                          |
| shouldFlip                  | `boolean`                     | `"true"` | Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely.                                 |
| translate                   | `"yes" \| "no"`               | -        |                                                                                                                                                                                    |
| triggerRef                  | `RefObject`                   | -        | The ref for the element which the tooltip positions itself with respect to. When used within a TooltipTrigger this is set automatically. It is only required when used standalone. |

### Tooltip.Trigger

| Prop                    | Type                          | Default   | Description                                                                                                                               |
| :---------------------- | :---------------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **children (required)** | `ReactNode`                   | -         | The children of the component.                                                                                                            |
| closeDelay              | `number`                      | `500`     | The delay time for the tooltip to close. \[See guidelines]\(https\://spectrum.adobe.com/page/tooltip/#Warmup-and-cooldown).               |
| defaultOpen             | `boolean`                     | -         | Whether the overlay is open by default (uncontrolled).                                                                                    |
| delay                   | `number`                      | `1000`    | The delay time for the tooltip to show up. \[See guidelines]\(https\://spectrum.adobe.com/page/tooltip/#Immediate-or-delayed-appearance). |
| disabled                | `boolean`                     | -         | Whether the tooltip should be disabled, independent from the trigger.                                                                     |
| onOpenChange            | `((isOpen: boolean) => void)` | -         | Handler that is called when the overlay's open state changes.                                                                             |
| open                    | `boolean`                     | -         | Control the visibility of the tooltip.                                                                                                    |
| shouldCloseOnPress      | `boolean`                     | `"true"`  | Whether the tooltip should close when the trigger is pressed.                                                                             |
| trigger                 | `"hover" \| "focus"`          | `'hover'` | By default, opens for both focus and hover. Can be made to open only for focus.                                                           |

## Alternative components

- [ContextualHelp](<(/components/overlay/contextual-help)>): Use when users need more detailed, persistent guidance near a specific element or task.
- [SectionMessage](/components/content/section-message): Use to highlight important information inline that should remain visible as users read or interact with the page.
