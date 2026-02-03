# Center

_Component to center its children horizontally._

The `<Center>` is a layout component that centers its children <strong>horizontally</strong> within a container.

## Usage

You can use it to center a single child or a list of children. The `maxWidth` prop sets the maximum width of the container
and the `space` prop adds spacing between the children elements.

The `<Center>` component can also be used with components like [`<Text>`](/components/content/text), [`<Stack>`](/components/layout/stack/) or [`<Inline>`](/components/layout/inline/) component.

```tsx title="center"
import { Center } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Center maxWidth="xxlarge" space={1}>
    <Rectangle height="50px" width="300px" />
    <Rectangle height="50px" width="300px" />
    <Rectangle height="50px" width="300px" />
  </Center>
);
```

## Props

| Prop             | Type                               | Default | Description                                                                                                                                                                                                                                                                   |
| :--------------- | :--------------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby | `string`                           | -       | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details     | `string`                           | -       | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label       | `string`                           | -       | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby  | `string`                           | -       | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live        | `"off" \| "polite" \| "assertive"` | -       | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children         | `ReactNode`                        | -       |                                                                                                                                                                                                                                                                               |
| id               | `string`                           | -       | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| maxWidth         | `string`                           | `100%`  | The maximum width of the container.                                                                                                                                                                                                                                           |
| role             | `"region" \| (string & {})`        | -       | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space            | `GapSpaceProp`                     | `0`     | Set the spacing between child elements.                                                                                                                                                                                                                                       |

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
