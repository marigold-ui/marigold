# Tabs

_Component for building tabs._

The `<Tabs>` component allows you to organize related content into multiple sections. They allow the user to navigate between groups of information that appear within the same context.

## Anatomy

`<Tabs>` consist of a tab list with one or more visually separated tabs. Each tab has associated content, and only the selected tab's content is shown. Each tab can be clicked, tapped, or navigated to via arrow keys.

<ul>
  <li><b>Tab list:</b> Holds multiple tabs. Use the `<Tabs.List>` component within `<Tabs>` to group tabs that a user
  can switch between.</li>
  <li><b>Tab:</b> Use `<Tabs.Item>` inside `<Tabs.List>` to add a title for an individual item. A tab has a clear
  signifier that marks which tabs is displaying content.</li>
  <li><b>Tab panel:</b> Shows the content to the selected Tab.</li>
</ul>

> ℹ️ Info: `<Tabs>` is a so called compound component. If you don't know what that means or you want to explore more
> about it you find a tutorial for this topic in our reference
> app.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

`<Tabs>` are used to organize groups of related content that are at the same level of hierarchy, allowing users to
navigate views without leaving the page.

> ⚠️ Important note: The example show how to connect the `<Tab.List>` item with the `<Tab.Panel>`. It is necessary that both
> components using the same `id`.

```tsx title="tabs-basic"
import { Headline, Tabs, TabsProps } from '@marigold/components';

export default (props: TabsProps) => (
  <>
    <Headline level="2">Events</Headline>
    <Tabs aria-label="tabs" {...props}>
      <Tabs.List aria-label="Events">
        <Tabs.Item id="upcoming">Upcoming</Tabs.Item>
        <Tabs.Item id="past">Past</Tabs.Item>
        <Tabs.Item id="cancelled">Cancelled</Tabs.Item>
      </Tabs.List>
      <Tabs.TabPanel id="upcoming">Upcoming events.</Tabs.TabPanel>
      <Tabs.TabPanel id="past">Past events.</Tabs.TabPanel>
      <Tabs.TabPanel id="cancelled">Cancelled events</Tabs.TabPanel>
    </Tabs>
  </>
);
```

✓ Use only one row of tabs Position the tab list above the tab panel Write short tab labels

✗ Don't use tabs with only one item.

### Arrangement of tabs

Arrange tab content so the most used content is first in the list and selected by default. This maximizes visibility
of frequently accessed content and lowers its interaction cost.

### Tab labels

Users should be able to predict what they’ll find when selecting a tab. Since unselected tabs conceal their content,
labels with strong information scent are crucial for users to engage with them.

✓ Use short and descriptive tab labels.

### Don’t mix and match tab types

Mixing in-page and navigation tabs within one tab control will disorient users. In-page tabs should have similar
content and <b>keep</b> users where they are. Navigation tabs should have dissimilar content and navigate
users <b>away</b> from the
current page.

## Props

### Tabs

| Prop                        | Type                      | Default       | Description                                                                                                            |
| :-------------------------- | :------------------------ | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                  | -             | Identifies the element (or elements) that describes the object.                                                        |
| aria-details                | `string`                  | -             | Identifies the element (or elements) that provide a detailed, extended description for the object.                     |
| aria-label                  | `string`                  | -             | Defines a string value that labels the current element.                                                                |
| aria-labelledby             | `string`                  | -             | Identifies the element (or elements) that labels the current element.                                                  |
| children                    | `ChildrenOrFunction`      | -             | The children of the component. A function may be provided to alter the children based on component state.              |
| defaultSelectedKey          | `Key`                     | -             | The initial selected key in the collection (uncontrolled).                                                             |
| dir                         | `string`                  | -             |                                                                                                                        |
| disabled                    | `boolean`                 | `"false"`     | Set All TabPanel disabled                                                                                              |
| disabledKeys                | `Iterable`                | -             | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.                |
| hidden                      | `boolean`                 | -             |                                                                                                                        |
| id                          | `string`                  | -             | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| inert                       | `boolean`                 | -             |                                                                                                                        |
| keyboardActivation          | `"automatic" \| "manual"` | `'automatic'` | Whether tabs are activated automatically on focus or manually.                                                         |
| lang                        | `string`                  | -             |                                                                                                                        |
| onAnimationEnd              | `AnimationEventHandler`   | -             |                                                                                                                        |
| onAnimationEndCapture       | `AnimationEventHandler`   | -             |                                                                                                                        |
| onAnimationIteration        | `AnimationEventHandler`   | -             |                                                                                                                        |
| onAnimationIterationCapture | `AnimationEventHandler`   | -             |                                                                                                                        |
| onAnimationStart            | `AnimationEventHandler`   | -             |                                                                                                                        |
| onAnimationStartCapture     | `AnimationEventHandler`   | -             |                                                                                                                        |
| onAuxClick                  | `MouseEventHandler`       | -             |                                                                                                                        |
| onAuxClickCapture           | `MouseEventHandler`       | -             |                                                                                                                        |
| onClick                     | `MouseEventHandler`       | -             |                                                                                                                        |
| onClickCapture              | `MouseEventHandler`       | -             |                                                                                                                        |
| onContextMenu               | `MouseEventHandler`       | -             |                                                                                                                        |
| onContextMenuCapture        | `MouseEventHandler`       | -             |                                                                                                                        |
| onDoubleClick               | `MouseEventHandler`       | -             |                                                                                                                        |
| onDoubleClickCapture        | `MouseEventHandler`       | -             |                                                                                                                        |
| onGotPointerCapture         | `PointerEventHandler`     | -             |                                                                                                                        |
| onGotPointerCaptureCapture  | `PointerEventHandler`     | -             |                                                                                                                        |
| onLostPointerCapture        | `PointerEventHandler`     | -             |                                                                                                                        |
| onLostPointerCaptureCapture | `PointerEventHandler`     | -             |                                                                                                                        |
| onMouseDown                 | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseDownCapture          | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseEnter                | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseLeave                | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseMove                 | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseMoveCapture          | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseOut                  | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseOutCapture           | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseOver                 | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseOverCapture          | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseUp                   | `MouseEventHandler`       | -             |                                                                                                                        |
| onMouseUpCapture            | `MouseEventHandler`       | -             |                                                                                                                        |
| onPointerCancel             | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerCancelCapture      | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerDown               | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerDownCapture        | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerEnter              | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerLeave              | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerMove               | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerMoveCapture        | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerOut                | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerOutCapture         | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerOver               | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerOverCapture        | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerUp                 | `PointerEventHandler`     | -             |                                                                                                                        |
| onPointerUpCapture          | `PointerEventHandler`     | -             |                                                                                                                        |
| onScroll                    | `UIEventHandler`          | -             |                                                                                                                        |
| onScrollCapture             | `UIEventHandler`          | -             |                                                                                                                        |
| onSelectionChange           | `((key: Key) => void)`    | -             | Handler that is called when the selection changes.                                                                     |
| onTouchCancel               | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchCancelCapture        | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchEnd                  | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchEndCapture           | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchMove                 | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchMoveCapture          | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchStart                | `TouchEventHandler`       | -             |                                                                                                                        |
| onTouchStartCapture         | `TouchEventHandler`       | -             |                                                                                                                        |
| onTransitionCancel          | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionCancelCapture   | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionEnd             | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionEndCapture      | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionRun             | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionRunCapture      | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionStart           | `TransitionEventHandler`  | -             |                                                                                                                        |
| onTransitionStartCapture    | `TransitionEventHandler`  | -             |                                                                                                                        |
| onWheel                     | `WheelEventHandler`       | -             |                                                                                                                        |
| onWheelCapture              | `WheelEventHandler`       | -             |                                                                                                                        |
| selectedKey                 | `Key \| null`             | -             | The currently selected key in the collection (controlled).                                                             |
| translate                   | `"yes" \| "no"`           | -             |                                                                                                                        |

### Tabs.List

| Prop                        | Type                                         | Default | Description                                                                                        |
| :-------------------------- | :------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                                     | -       | Identifies the element (or elements) that describes the object.                                    |
| aria-details                | `string`                                     | -       | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| aria-label                  | `string`                                     | -       | Defines a string value that labels the current element.                                            |
| aria-labelledby             | `string`                                     | -       | Identifies the element (or elements) that labels the current element.                              |
| children                    | `ReactNode \| ((item: object) => ReactNode)` | -       | The contents of the collection.                                                                    |
| dependencies                | `readonly any[]`                             | -       | Values that should invalidate the item cache when using dynamic collections.                       |
| dir                         | `string`                                     | -       |                                                                                                    |
| hidden                      | `boolean`                                    | -       |                                                                                                    |
| inert                       | `boolean`                                    | -       |                                                                                                    |
| items                       | `Iterable`                                   | -       | Item objects in the collection.                                                                    |
| lang                        | `string`                                     | -       |                                                                                                    |
| onAnimationEnd              | `AnimationEventHandler`                      | -       |                                                                                                    |
| onAnimationEndCapture       | `AnimationEventHandler`                      | -       |                                                                                                    |
| onAnimationIteration        | `AnimationEventHandler`                      | -       |                                                                                                    |
| onAnimationIterationCapture | `AnimationEventHandler`                      | -       |                                                                                                    |
| onAnimationStart            | `AnimationEventHandler`                      | -       |                                                                                                    |
| onAnimationStartCapture     | `AnimationEventHandler`                      | -       |                                                                                                    |
| onAuxClick                  | `MouseEventHandler`                          | -       |                                                                                                    |
| onAuxClickCapture           | `MouseEventHandler`                          | -       |                                                                                                    |
| onClick                     | `MouseEventHandler`                          | -       |                                                                                                    |
| onClickCapture              | `MouseEventHandler`                          | -       |                                                                                                    |
| onContextMenu               | `MouseEventHandler`                          | -       |                                                                                                    |
| onContextMenuCapture        | `MouseEventHandler`                          | -       |                                                                                                    |
| onDoubleClick               | `MouseEventHandler`                          | -       |                                                                                                    |
| onDoubleClickCapture        | `MouseEventHandler`                          | -       |                                                                                                    |
| onGotPointerCapture         | `PointerEventHandler`                        | -       |                                                                                                    |
| onGotPointerCaptureCapture  | `PointerEventHandler`                        | -       |                                                                                                    |
| onLostPointerCapture        | `PointerEventHandler`                        | -       |                                                                                                    |
| onLostPointerCaptureCapture | `PointerEventHandler`                        | -       |                                                                                                    |
| onMouseDown                 | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseDownCapture          | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseEnter                | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseLeave                | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseMove                 | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseMoveCapture          | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseOut                  | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseOutCapture           | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseOver                 | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseOverCapture          | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseUp                   | `MouseEventHandler`                          | -       |                                                                                                    |
| onMouseUpCapture            | `MouseEventHandler`                          | -       |                                                                                                    |
| onPointerCancel             | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerCancelCapture      | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerDown               | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerDownCapture        | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerEnter              | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerLeave              | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerMove               | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerMoveCapture        | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerOut                | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerOutCapture         | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerOver               | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerOverCapture        | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerUp                 | `PointerEventHandler`                        | -       |                                                                                                    |
| onPointerUpCapture          | `PointerEventHandler`                        | -       |                                                                                                    |
| onScroll                    | `UIEventHandler`                             | -       |                                                                                                    |
| onScrollCapture             | `UIEventHandler`                             | -       |                                                                                                    |
| onTouchCancel               | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchCancelCapture        | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchEnd                  | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchEndCapture           | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchMove                 | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchMoveCapture          | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchStart                | `TouchEventHandler`                          | -       |                                                                                                    |
| onTouchStartCapture         | `TouchEventHandler`                          | -       |                                                                                                    |
| onTransitionCancel          | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionCancelCapture   | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionEnd             | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionEndCapture      | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionRun             | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionRunCapture      | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionStart           | `TransitionEventHandler`                     | -       |                                                                                                    |
| onTransitionStartCapture    | `TransitionEventHandler`                     | -       |                                                                                                    |
| onWheel                     | `WheelEventHandler`                          | -       |                                                                                                    |
| onWheelCapture              | `WheelEventHandler`                          | -       |                                                                                                    |
| translate                   | `"yes" \| "no"`                              | -       |                                                                                                    |

### Tabs.Item

| Prop                        | Type                              | Default | Description                                                                                                                                                                                                           |
| :-------------------------- | :-------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                          | -       | Identifies the element (or elements) that describes the object.                                                                                                                                                       |
| aria-details                | `string`                          | -       | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                    |
| aria-label                  | `string`                          | -       | Defines a string value that labels the current element.                                                                                                                                                               |
| aria-labelledby             | `string`                          | -       | Identifies the element (or elements) that labels the current element.                                                                                                                                                 |
| children                    | `ChildrenOrFunction`              | -       | The children of the component. A function may be provided to alter the children based on component state.                                                                                                             |
| dir                         | `string`                          | -       |                                                                                                                                                                                                                       |
| download                    | `string \| boolean`               | -       | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).                                   |
| hidden                      | `boolean`                         | -       |                                                                                                                                                                                                                       |
| href                        | `string`                          | -       | A URL to link to. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).                                                                                                                     |
| hrefLang                    | `string`                          | -       | Hints at the human language of the linked URL. See\[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).                                                                                     |
| id                          | `Key`                             | -       | The unique id of the tab.                                                                                                                                                                                             |
| inert                       | `boolean`                         | -       |                                                                                                                                                                                                                       |
| isDisabled                  | `boolean`                         | -       | Whether the tab is disabled.                                                                                                                                                                                          |
| lang                        | `string`                          | -       |                                                                                                                                                                                                                       |
| onAnimationEnd              | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onClick                     | `((e: MouseEvent) => void)`       | -       | \*\*Not recommended – use \`onPress\` instead.\*\* \`onClick\` is an alias for \`onPress\` provided for compatibility with other libraries. \`onPress\` provides additional event details for non-mouse interactions. |
| onClickCapture              | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
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
| translate                   | `"yes" \| "no"`                   | -       |                                                                                                                                                                                                                       |

### Tabs.TabPanel

| Prop                        | Type                     | Default   | Description                                                                                                                                                                                                             |
| :-------------------------- | :----------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                 | -         | Identifies the element (or elements) that describes the object.                                                                                                                                                         |
| aria-details                | `string`                 | -         | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                      |
| aria-label                  | `string`                 | -         | Defines a string value that labels the current element.                                                                                                                                                                 |
| aria-labelledby             | `string`                 | -         | Identifies the element (or elements) that labels the current element.                                                                                                                                                   |
| children                    | `ChildrenOrFunction`     | -         | The children of the component. A function may be provided to alter the children based on component state.                                                                                                               |
| dir                         | `string`                 | -         |                                                                                                                                                                                                                         |
| hidden                      | `boolean`                | -         |                                                                                                                                                                                                                         |
| id                          | `Key`                    | -         | The unique id of the tab.                                                                                                                                                                                               |
| inert                       | `boolean`                | -         |                                                                                                                                                                                                                         |
| lang                        | `string`                 | -         |                                                                                                                                                                                                                         |
| onAnimationEnd              | `AnimationEventHandler`  | -         |                                                                                                                                                                                                                         |
| onAnimationEndCapture       | `AnimationEventHandler`  | -         |                                                                                                                                                                                                                         |
| onAnimationIteration        | `AnimationEventHandler`  | -         |                                                                                                                                                                                                                         |
| onAnimationIterationCapture | `AnimationEventHandler`  | -         |                                                                                                                                                                                                                         |
| onAnimationStart            | `AnimationEventHandler`  | -         |                                                                                                                                                                                                                         |
| onAnimationStartCapture     | `AnimationEventHandler`  | -         |                                                                                                                                                                                                                         |
| onAuxClick                  | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onAuxClickCapture           | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onClick                     | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onClickCapture              | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onContextMenu               | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onContextMenuCapture        | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onDoubleClick               | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onDoubleClickCapture        | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onGotPointerCapture         | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onLostPointerCapture        | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onMouseDown                 | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseDownCapture          | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseEnter                | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseLeave                | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseMove                 | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseMoveCapture          | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseOut                  | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseOutCapture           | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseOver                 | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseOverCapture          | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseUp                   | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onMouseUpCapture            | `MouseEventHandler`      | -         |                                                                                                                                                                                                                         |
| onPointerCancel             | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerCancelCapture      | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerDown               | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerDownCapture        | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerEnter              | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerLeave              | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerMove               | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerMoveCapture        | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerOut                | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerOutCapture         | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerOver               | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerOverCapture        | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerUp                 | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onPointerUpCapture          | `PointerEventHandler`    | -         |                                                                                                                                                                                                                         |
| onScroll                    | `UIEventHandler`         | -         |                                                                                                                                                                                                                         |
| onScrollCapture             | `UIEventHandler`         | -         |                                                                                                                                                                                                                         |
| onTouchCancel               | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchCancelCapture        | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchEnd                  | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchEndCapture           | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchMove                 | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchMoveCapture          | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchStart                | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTouchStartCapture         | `TouchEventHandler`      | -         |                                                                                                                                                                                                                         |
| onTransitionCancel          | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionCancelCapture   | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionEnd             | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionEndCapture      | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionRun             | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionRunCapture      | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionStart           | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onTransitionStartCapture    | `TransitionEventHandler` | -         |                                                                                                                                                                                                                         |
| onWheel                     | `WheelEventHandler`      | -         |                                                                                                                                                                                                                         |
| onWheelCapture              | `WheelEventHandler`      | -         |                                                                                                                                                                                                                         |
| shouldForceMount            | `boolean`                | `"false"` | Whether to mount the tab panel in the DOM even when it is not currently selected. Inactive tab panels are inert and cannot be interacted with. They must be styled appropriately so this is clear to the user visually. |
| translate                   | `"yes" \| "no"`          | -         |                                                                                                                                                                                                                         |

## Alternative components

<ul>
  <li>
    [Accordion](/components/collection/accordion): Accordions are another
    effective method for collapsing content. Accordions can utilize longer
    labels and work well to organize short pieces of content such as FAQs.
  </li>
</ul>
