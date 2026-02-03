# Tag

_Used to manage related options._

Tags help users explore, filter, or manage related options in a compact and accessible format. They are arranged in a container where they can be interacted with as a group. Tag groups are commonly used in search interfaces, content management systems, or anywhere users need to explore, refine, or manage categories and topics.

## Anatomy

A tag group consists of a group label, a field label, individual tags with tag labels, and optional remove buttons for each tag.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

Tags are best used to help users explore, filter, or manage related options in a clear and compact format. They work well in interfaces where users need to select from a list of categories, refine content through filters, or manage applied labels such as interests, skills, or topics.

Because tags are small, lightweight, and easily scannable, they support quick decision-making and reduce visual noise. Use them when grouping semantically similar items, especially in forms, search experiences, or when summarizing user-defined inputs like selected filters or preferences.

### Selection modes

Tag groups support single or multiple selection to match different interaction needs. Use single selection when users need to make a clear and exclusive choice, such as selecting a format or category. Use multiple selection when users are refining results, customizing preferences, or filtering a list based on several criteria.

```tsx title="tag-selection"
import { Stack, Tag } from '@marigold/components';

export default () => (
  <Stack space={6}>
    <Tag.Group
      label="Ticket type"
      selectionMode="single"
      defaultSelectedKeys={['student']}
    >
      <Tag id="standard">Standard</Tag>
      <Tag id="vip">VIP</Tag>
      <Tag id="student">Student</Tag>
      <Tag id="senior">Senior</Tag>
    </Tag.Group>
    <Tag.Group
      label="Interests"
      selectionMode="multiple"
      defaultSelectedKeys={['theater', 'comedy']}
    >
      <Tag id="music">Music</Tag>
      <Tag id="theater">Theater</Tag>
      <Tag id="comedy">Comedy</Tag>
      <Tag id="workshops">Workshops</Tag>
      <Tag id="food-drink">Food & Drink</Tag>
    </Tag.Group>
  </Stack>
);
```

### Content and labeling

Tag labels should be concise, typically under 20 characters, to keep them easily scannable and prevent visual clutter. Keep the total number of tags manageable, generally no more than 8 to 10 at once, to avoid overwhelming users.

Use sentence case and avoid unnecessary words or filler to maintain a consistent and clear labeling style. Each tag should be descriptive and specific to avoid ambiguity and help users quickly understand the meaning or purpose of the tag in context.

✓ Use labels that are short, specific, and consistently formatted.

✗ Avoid inconsistent casing, vague or lengthy labels, and hard-to-scan text.

### Interactive vs static

Tags should not be used to display the status of an object or to highlight newly added content, as these are static indicators that do not require user interaction. Use the [badge component](/components/content/badge) instead.

Tags are interactive elements intended for selection, filtering, or removal, whereas badges are static indicators meant to convey status or highlight new or updated items. Use badges when the information should be visible but not acted upon, and tags when the user needs to interact with or manage the content.

### Removable tags

Removable tags are ideal when users need to manage selected filters, categories, or input tokens. Use them when the tag represents user-generated or user-controlled content that may need to be revised or undone.

```tsx title="tag-removable"
import { useState } from 'react';
import { Tag, Text } from '@marigold/components';

const emptyState = () => (
  <Text fontSize="sm" color="muted-foreground" fontStyle="italic">
    No filters selected.
  </Text>
);

export default () => {
  const [filters, setFilters] = useState([
    { id: 1, label: 'Category: Live music' },
    { id: 2, label: 'Location: Berlin' },
    { id: 3, label: 'Date: This weekend' },
    { id: 4, label: 'Setting: Outdoor' },
  ]);

  const removeFilter = (keys: Set<number>) => {
    setFilters(prev => prev.filter(filter => !keys.has(filter.id)));
  };

  return (
    <Tag.Group
      label="Applied filters"
      onRemove={removeFilter}
      emptyState={emptyState}
    >
      {filters.map(({ id, label }) => (
        <Tag key={id} id={id}>
          {label}
        </Tag>
      ))}
    </Tag.Group>
  );
};
```

In addition to removing individual tags, you can also provide an option to remove all tags at once. This is especially useful when users want to quickly clear all selected filters or categories with a single action, improving efficiency and user experience.

```tsx title="tag-remove-all"
import { useState } from 'react';
import { Tag, Text } from '@marigold/components';

const emptyState = () => (
  <Text fontSize="sm" color="muted-foreground" fontStyle="italic">
    No filters selected.
  </Text>
);

export default () => {
  const [filters, setFilters] = useState([
    { id: 1, label: 'Category: Live music' },
    { id: 2, label: 'Location: Berlin' },
    { id: 3, label: 'Date: This weekend' },
    { id: 4, label: 'Setting: Outdoor' },
  ]);

  const removeFilter = (keys: Set<number>) => {
    setFilters(prev => prev.filter(filter => !keys.has(filter.id)));
  };

  return (
    <Tag.Group
      label="Applied filters"
      onRemove={removeFilter}
      removeAll
      emptyState={emptyState}
    >
      {filters.map(({ id, label }) => (
        <Tag key={id} id={id}>
          {label}
        </Tag>
      ))}
    </Tag.Group>
  );
};
```

## Props

### Tag

| Prop                        | Type                              | Default | Description                                                                                                                                                                                                           |
| :-------------------------- | :-------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                    | `ReactNode`                       | -       | The children of the component. A function may be provided to alter the children based on component state.                                                                                                             |
| dir                         | `string`                          | -       |                                                                                                                                                                                                                       |
| disabled                    | `boolean`                         | -       |                                                                                                                                                                                                                       |
| download                    | `string \| boolean`               | -       | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).                                   |
| hidden                      | `boolean`                         | -       |                                                                                                                                                                                                                       |
| href                        | `string`                          | -       | A URL to link to. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).                                                                                                                     |
| hrefLang                    | `string`                          | -       | Hints at the human language of the linked URL. See\[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).                                                                                     |
| id                          | `Key`                             | -       | A unique id for the tag.                                                                                                                                                                                              |
| inert                       | `boolean`                         | -       |                                                                                                                                                                                                                       |
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
| textValue                   | `string`                          | -       | A string representation of the tags's contents, used for accessibility. Required if children is not a plain text string.                                                                                              |
| translate                   | `"yes" \| "no"`                   | -       |                                                                                                                                                                                                                       |

### Tag.Group

| Prop                        | Type                                         | Default            | Description                                                                                                                                                                                                                                                                                                       |
| :-------------------------- | :------------------------------------------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                                     | -                  | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                                                   |
| aria-details                | `string`                                     | -                  | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                                                |
| aria-label                  | `string`                                     | -                  | Defines a string value that labels the current element.                                                                                                                                                                                                                                                           |
| aria-labelledby             | `string`                                     | -                  | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                                             |
| children                    | `ReactNode \| ((item: object) => ReactNode)` | -                  | The contents of the collection.                                                                                                                                                                                                                                                                                   |
| defaultSelectedKeys         | `Iterable \| "all"`                          | -                  | The initial selected keys in the collection (uncontrolled).                                                                                                                                                                                                                                                       |
| description                 | `ReactNode`                                  | -                  | A helpful text.                                                                                                                                                                                                                                                                                                   |
| dir                         | `string`                                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| disabledKeys                | `Iterable`                                   | -                  | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.                                                                                                                                                                                                           |
| disallowEmptySelection      | `boolean`                                    | -                  | Whether the collection allows empty selection.                                                                                                                                                                                                                                                                    |
| emptyState                  | `((props: TagListRenderProps) => ReactNode)` | -                  | Provides content to display when there are no items in the tag list.                                                                                                                                                                                                                                              |
| escapeKeyBehavior           | `"clearSelection" \| "none"`                 | `'clearSelection'` | Whether pressing the escape key should clear selection in the TagGroup or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| hidden                      | `boolean`                                    | -                  |                                                                                                                                                                                                                                                                                                                   |
| id                          | `string`                                     | -                  | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                                            |
| inert                       | `boolean`                                    | -                  |                                                                                                                                                                                                                                                                                                                   |
| items                       | `Iterable`                                   | -                  | Item objects in the collection.                                                                                                                                                                                                                                                                                   |
| label                       | `ReactNode`                                  | -                  | Specifies the label of the field.                                                                                                                                                                                                                                                                                 |
| lang                        | `string`                                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| name                        | `string`                                     | -                  | The name of the field, used when submitting form data.                                                                                                                                                                                                                                                            |
| onAnimationEnd              | `AnimationEventHandler`                      | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAnimationEndCapture       | `AnimationEventHandler`                      | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAnimationIteration        | `AnimationEventHandler`                      | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAnimationIterationCapture | `AnimationEventHandler`                      | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAnimationStart            | `AnimationEventHandler`                      | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAnimationStartCapture     | `AnimationEventHandler`                      | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAuxClick                  | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onAuxClickCapture           | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onClick                     | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onClickCapture              | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onContextMenu               | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onContextMenuCapture        | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onDoubleClick               | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onDoubleClickCapture        | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onGotPointerCapture         | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onGotPointerCaptureCapture  | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onLostPointerCapture        | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onLostPointerCaptureCapture | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseDown                 | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseDownCapture          | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseEnter                | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseLeave                | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseMove                 | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseMoveCapture          | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseOut                  | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseOutCapture           | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseOver                 | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseOverCapture          | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseUp                   | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onMouseUpCapture            | `MouseEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerCancel             | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerCancelCapture      | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerDown               | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerDownCapture        | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerEnter              | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerLeave              | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerMove               | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerMoveCapture        | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerOut                | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerOutCapture         | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerOver               | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerOverCapture        | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerUp                 | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onPointerUpCapture          | `PointerEventHandler`                        | -                  |                                                                                                                                                                                                                                                                                                                   |
| onRemove                    | `((keys: Set) => void)`                      | -                  | Handler that is called when a user deletes a tag.                                                                                                                                                                                                                                                                 |
| onScroll                    | `UIEventHandler`                             | -                  |                                                                                                                                                                                                                                                                                                                   |
| onScrollCapture             | `UIEventHandler`                             | -                  |                                                                                                                                                                                                                                                                                                                   |
| onSelectionChange           | `((keys: Selection) => void)`                | -                  | Handler that is called when the selection changes.                                                                                                                                                                                                                                                                |
| onTouchCancel               | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchCancelCapture        | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchEnd                  | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchEndCapture           | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchMove                 | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchMoveCapture          | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchStart                | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTouchStartCapture         | `TouchEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionCancel          | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionCancelCapture   | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionEnd             | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionEndCapture      | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionRun             | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionRunCapture      | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionStart           | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onTransitionStartCapture    | `TransitionEventHandler`                     | -                  |                                                                                                                                                                                                                                                                                                                   |
| onWheel                     | `WheelEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| onWheelCapture              | `WheelEventHandler`                          | -                  |                                                                                                                                                                                                                                                                                                                   |
| removeAll                   | `boolean`                                    | `"false"`          | Renders a "remove all" option, when a the \`onRemove\` prop is also set.                                                                                                                                                                                                                                          |
| selectedKeys                | `Iterable \| "all"`                          | -                  | The currently selected keys in the collection (controlled).                                                                                                                                                                                                                                                       |
| selectionBehavior           | `SelectionBehavior`                          | -                  | How multiple selection should behave in the collection.                                                                                                                                                                                                                                                           |
| selectionMode               | `SelectionMode`                              | -                  | The type of selection that is allowed in the collection.                                                                                                                                                                                                                                                          |
| shouldSelectOnPressUp       | `boolean`                                    | -                  | Whether selection should occur on press up instead of press down.                                                                                                                                                                                                                                                 |
| slot                        | `string \| null`                             | -                  | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                                                |
| translate                   | `"yes" \| "no"`                              | -                  |                                                                                                                                                                                                                                                                                                                   |
| width                       | `WidthProp`                                  | `"full"`           | Sets the width of the field. You can see allowed tokens here: https\://tailwindcss.com/docs/width                                                                                                                                                                                                                 |

## Alternative components

<ul>
  <li>
    [Badge](/components/content/badge): Small indicator often used to show a
    status, count, or notification on another UI element. It is not interactive
    like a Tag and used for highlighting statuses.
  </li>

  <li>
    [Checkbox](/components/form/checkbox): Used when users need to select one or
    more options from a list in a form-like setting. Better suited than tags for
    structured input fields where persistent visibility of all choices is
    important.
  </li>

  <li>
    [Radio](/components/form/radio): Ideal for mutually exclusive choices,
    especially in forms or settings. Prefer over tags when the focus is on
    making a single clear decision with labeled options.
  </li>

  <li>
    [Select](/components/form/select): Suitable for selecting one or more
    options from a longer or dynamic list. Use instead of tags when space is
    limited or when the list of options is too long to display at once.
  </li>
</ul>

## Related

- [Multiple Selection](/patterns/multiple-selection) - represents different ways and guideline for muliple selection.
