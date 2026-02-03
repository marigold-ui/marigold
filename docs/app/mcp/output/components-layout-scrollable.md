# Scrollable

_Lets the content scroll._

`<Scrollable>` is a component container for creating scrollable areas in the UI. Scrollbars can be both vertical and horizontal.

## Usage

This component is commonly used in applications to manage large amounts of information or data, providing a convenient way for users to explore content without overwhelming the available screen space. The `children` of the `<Scrollable>` will scroll inside the container.

By default, the `width` is set to 100%, you can change the `width` to get a horizontal scrollbar. Same you can achieve with the `height` property. By default this takes the available height.

The `<Scrollable>` component can be used with every other component where content is overflowing the container, e.g. `<Card>`, `<Table>`, etc.

### Vertical Scrolling

To use the vertical scrollbar you need to set the `height` prop and the content has to overflow the container.

```tsx title="scroll-vertical"
import { Scrollable } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Scrollable height="150px">
    <div className="flex flex-col items-center gap-2 p-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Rectangle key={index} height="100px" width="200px" />
      ))}
    </div>
  </Scrollable>
);
```

### Horizontal Scrolling

To use horizontal scrolling, you need to wrap the content in a [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) using `flex`. By default, the `width` prop is set to 100%.
Here too, the content must extend beyond the container for the scroll bar to be displayed.

```tsx title="scroll-horizontal"
import { Scrollable } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Scrollable>
    <div className="inline-flex gap-2 p-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Rectangle key={index} height="100px" width="200px" />
      ))}
    </div>
  </Scrollable>
);
```

## Props

| Prop             | Type                               | Default  | Description                                                                                                                                                                                                                                                                   |
| :--------------- | :--------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby | `string`                           | -        | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details     | `string`                           | -        | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label       | `string`                           | -        | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby  | `string`                           | -        | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live        | `"off" \| "polite" \| "assertive"` | -        | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children         | `ReactNode`                        | -        | Children of the layout.                                                                                                                                                                                                                                                       |
| height           | `HeightProp`                       | -        | Specifies the height of the scrollable container.                                                                                                                                                                                                                             |
| id               | `string`                           | -        | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role             | `"region" \| (string & {})`        | -        | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| width            | `WidthProp`                        | `"full"` | Sets the width of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/width).                                                                                                                                                                      |

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
