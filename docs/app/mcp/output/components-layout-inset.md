# Inset

_Adds space around its children._

The `<Inset>` component is a layout component that acts as a container which adds spacing around its children.

## Usage

The component should be used whenever you need to add some whitespace around elements. For example, around a [`<Form>`](/form/form) or inside a [`<Card>`](/content/card/).

### Equal spacing

In order to add equal spacing to all sides use the `space` property like shown below. You can see that the rectangle has a distance of `2rem` to the parent div.

```tsx title="inset-equal"
import { Inset } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="bg-bg-surface-sunken">
    <Inset space={8}>
      <Rectangle height="80px" />
    </Inset>
  </div>
);
```

### Horizontal and vertical spacing

A common use case is to give children of a content component some space, you can do this for example with wrapping an `<Inset>` around the card content like shown below.

To set only horizontal or vertical spacing, or to define different values for each, use the `spaceX` property for horizontal spacing and the `spaceY` property for vertical spacing.

```tsx title="inset-hv"
import { venueTypes, venues } from '@/lib/data/venues';
import { Card, Headline, Inline, Inset, Text } from '@marigold/components';

export default () => {
  return (
    <Card>
      <Inset spaceX={4} spaceY={8}>
        <Headline level={3}>{venues[0].name}</Headline>
        <Inline>
          <Text fontStyle="italic">
            {venues[0].city} | {venueTypes[venues[0].type]}
          </Text>
        </Inline>
        <Text>{venues[0].description}</Text>
      </Inset>
    </Card>
  );
};
```

## Props

| Prop                    | Type                               | Default | Description                                                                                                                                                                                                                                                                   |
| :---------------------- | :--------------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby        | `string`                           | -       | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details            | `string`                           | -       | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label              | `string`                           | -       | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby         | `string`                           | -       | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live               | `"off" \| "polite" \| "assertive"` | -       | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| **children (required)** | `ReactNode`                        | -       | The children of the component                                                                                                                                                                                                                                                 |
| id                      | `string`                           | -       | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role                    | `"region" \| (string & {})`        | -       | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space                   | `PaddingSpaceProp`                 | -       | The space between the children. You can see allowed tokens \[here]\(../../foundations/design-tokens?theme=core#spacing).                                                                                                                                                      |
| spaceX                  | `PaddingSpacePropX`                | -       | Horizontal alignment for the children. You can see allowed tokens \[here]\(../../foundations/design-tokens?theme=core#spacing).                                                                                                                                               |
| spaceY                  | `PaddingSpacePropY`                | -       | Vertical alignment for the children. You can see allowed tokens \[here]\(../../foundations/design-tokens?theme=core#spacing).                                                                                                                                                 |

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
