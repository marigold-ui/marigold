# Tiles

_Organize the content in tiles of equal width._

The `<Tiles>` is a layout component which is based on [CSS grid](https://www.w3schools.com/css/css_grid.asp) system.

## Usage

`<Tiles>` serves as a versatile container, ideal for constructing panels, cards, lists, and other content components that organize and group information. They automatically wraps children to a new line if the space given is not enough to show the `<Tiles>` in one row.

It's possible to display the items with some spacing through `space` prop or set a minimum width for all items inside `<Tiles>` with `tilesWidth` prop.

```tsx title="tiles-complex"
import { venues } from '@/lib/data/venues';
import { Card, Headline, Stack, Text, Tiles } from '@marigold/components';

export default () => (
  <Tiles tilesWidth="200px" space={2}>
    {venues.slice(5).map(venue => (
      <Card key={crypto.randomUUID()} p={4}>
        <Stack space={2} alignX="center">
          <img src={venue.image} alt={venue.name} width={200} height={200} />
          <Headline level={3}>{venue.name}</Headline>
          <Text>{venue.description}</Text>
        </Stack>
      </Card>
    ))}
  </Tiles>
);
```

### Equal heights

If you need to have the items in the `<Tiles>` take the same height, you can use the `equalHeight` property, which is a boolean value that can be used to size the items of the `<Tiles>`. In this case, all items adopt the size of the largest card, making it essential when you want all items to match the largest child’s dimensions.

```tsx title="tiles-autoRows"
import { Card, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Tiles space={1} tilesWidth="200px" equalHeight>
    <Card>
      <Rectangle height="100px" />
    </Card>
    <Card>
      <Rectangle height="100px" />
      <Rectangle height="100px" />
    </Card>
    <Card>
      <Rectangle height="100px" />
    </Card>
  </Tiles>
);
```

### Stretch width

Using the `stretch` property will make the tiles fully responsive. Meaning, they will distribute available width between them while not getting smaller then the given `tilesWidth`.

```tsx title="tiles-stretch"
import { useState } from 'react';
import { Card, Stack, Switch, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => {
  const [stretch, setStretch] = useState(false);
  return (
    <Stack space={2}>
      <Switch label="Toggle stretch" onChange={() => setStretch(!stretch)} />
      <Tiles space={2} stretch={stretch} tilesWidth="100px">
        <Card p={2}>
          <Rectangle height="100px" />
        </Card>
        <Card p={2}>
          <Rectangle height="100px" />
        </Card>
        <Card p={2}>
          <Rectangle height="100px" />
        </Card>
        <Card p={2}>
          <Rectangle height="100px" />
        </Card>
      </Tiles>
    </Stack>
  );
};
```

## Props

| Prop                    | Type                               | Default   | Description                                                                                                                                                                                                                                                                   |
| :---------------------- | :--------------------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby        | `string`                           | -         | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details            | `string`                           | -         | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label              | `string`                           | -         | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby         | `string`                           | -         | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live               | `"off" \| "polite" \| "assertive"` | -         | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| **children (required)** | `ReactNode`                        | -         | The children of the component.                                                                                                                                                                                                                                                |
| equalHeight             | `boolean`                          | `"false"` | If true, all items will have the height of the biggest item.                                                                                                                                                                                                                  |
| id                      | `string`                           | -         | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role                    | `"region" \| (string & {})`        | -         | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space                   | `GapSpaceProp`                     | `0`       | Set the spacing between child elements.                                                                                                                                                                                                                                       |
| stretch                 | `boolean`                          | `"false"` | Tiles will stretch to available width and will distribute their width equally. Note that this can make them wider than the specified tiles width, but not smaller than the given "tilesWidth". Basically, this is full responsive mode.                                       |
| tilesWidth              | `string`                           | `250px`   | Set minimum width for all items inside.                                                                                                                                                                                                                                       |

## Alternative components

<ul>
  <li>
    [Columns](/layout/columns/): It should be noted that `<Tiles>` is used for children with the same width. If you want to set different widths for the children use [`<Columns>`](/layout/columns/) instead.
  </li>

  <li>
    [Grid](/layout/grid/): If you need more custom controll over the layout, you should use [`<Grid>`](/layout/grid/) component instead.
  </li>
</ul>

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
