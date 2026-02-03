# Aside

_Component to seperate content from the main content._

The `<Aside>` component is a responsive layout element designed for displaying side content next to main content. It ensures the side content has a fixed width while the main content dynamically adjusts to fill the remaining space.

## Usage

Use the `<Aside>` for building layouts were you need to have one dynamic main content with a fixed side content. On smaller screens, e.g. on mobile devices, the content is automatically shifted one below the other when 50% of the width is reached. You can also adjust this by setting the `wrap` property to a percentage value.

> ℹ️ ImportantThe `<Aside>` must have exactly two children, where none is a `<Fragment>`.

The example shows a simple `<Aside>` component. If you have a look on the code tab you get to know how to set the `side`, `sideWidth` and `space` prop.

Through `space` you can define the gap between the contents.
With `sideWidth` you define the width for the side content and with `side` you define the side on which the side content will appear.

```tsx title="aside"
import { Aside } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Aside space={5} side="right" sideWidth="100px">
    <Rectangle height="120px" />
    <Rectangle height="120px" />
  </Aside>
);
```

## Props

| Prop                    | Type                               | Default  | Description                                                                                                                                                                                                                                                                   |
| :---------------------- | :--------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby        | `string`                           | -        | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details            | `string`                           | -        | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label              | `string`                           | -        | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby         | `string`                           | -        | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live               | `"off" \| "polite" \| "assertive"` | -        | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| **children (required)** | `[ReactElement>, ReactElement>]`   | -        | The children of the component.                                                                                                                                                                                                                                                |
| id                      | `string`                           | -        | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role                    | `"region" \| (string & {})`        | -        | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| side                    | `"left" \| "right"`                | `"left"` | The side of the aside content.                                                                                                                                                                                                                                                |
| sideWidth               | `string`                           | -        | The width of the side content.                                                                                                                                                                                                                                                |
| space                   | `GapSpaceProp`                     | `0`      | Set the spacing between child elements.                                                                                                                                                                                                                                       |
| wrap                    | `NonZeroPercentage`                | `50%`    | At what percentage of the content's width should the other content wrap beneath it                                                                                                                                                                                            |

## Alternative components

<ul>
  <li>
    [Grid](/components/layout/grid): When things get more complex the `<Grid>` component is the right choice.
    It allows you to create complex layouts with multiple columns and rows.
  </li>

  <li>
    [Columns](/components/layout/columns): You can position your content in one row with the `<Columns>` component. The component is used to create structured and flexible layouts that organize content efficiently.
  </li>
</ul>

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
