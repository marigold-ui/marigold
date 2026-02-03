# Inline

_Display children horizontally in a row._

The `<Inline>` component is a responsive layout component based on [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). It aligns its content horizontally in a row and automatically wraps to a new line when there isn't enough space on the screen.

Use the inline component in combination with other layout components to easily [create customized layouts](../../foundations/layouts).

## Usage

If you have more than two elements you can use the `<Inline>` component to arrange elements horizontally according to the space required.
For adding the space between the elements you need to use the `space` property and set it to a supported [space value](../../foundations/design-tokens#spacing).

```tsx title="inline-elements"
import { Inline } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Inline space={8}>
    <Rectangle height="100px" width="100px" />
    <Rectangle height="100px" width="100px" />
    <Rectangle height="100px" width="100px" />
    <Rectangle height="100px" width="100px" />
  </Inline>
);
```

Together with a [`<Split>`](../layout/split) you can use the `<Inline>` to create as much space as given between two elements while staying in the inline layout.

### Different alignment

The child elements can be positioned differently on their x and y axis.
Items of various height can be vertically aligned using the `alignY` prop. In the following example you can see it.

```tsx title="inline-vertically"
import { Center, Inline, Stack } from '@marigold/components';
import { Divider } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Center>
    <Stack space={8}>
      <Inline space={3} alignY="top">
        <Rectangle height="40px" width="40px" />
        <Rectangle height="60px" width="60px">
          <div className="text-text-primary-muted m-auto">Top</div>
        </Rectangle>
        <Rectangle height="40px" width="40px" />
      </Inline>
      <Divider />
      <Inline space={3} alignY="center">
        <Rectangle height="40px" width="40px" />
        <Rectangle height="60px" width="60px">
          <div className="text-text-primary-muted m-auto">Center</div>
        </Rectangle>
        <Rectangle height="40px" width="40px" />
      </Inline>
      <Divider />
      <Inline space={3} alignY="bottom">
        <Rectangle height="40px" width="40px" />
        <Rectangle height="60px" width="60px">
          <div className="text-text-primary-muted m-auto">Bottom</div>
        </Rectangle>
        <Rectangle height="40px" width="40px" />
      </Inline>
    </Stack>
  </Center>
);
```

For horizontally alignment you can use the `alignX` prop.

```tsx title="inline-horizontally"
import { Divider, Inline, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={8}>
    <Inline space={3} alignX="left">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Left</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="center">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Center</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="right">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Right</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="between">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Between</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="around">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Around</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="evenly">
      <Rectangle height="60px" width="80px" />
      <Rectangle height="60px" width="80px">
        <div className="text-text-primary-muted m-auto">Evenly</div>
      </Rectangle>
      <Rectangle height="60px" width="80px" />
    </Inline>
  </Stack>
);
```

### Form input alignment

When aligning form inputs with buttons , use `alignY={input}` to mantain vertically alignment with the input field rectangle. This automatically adjusts when descriptions or error messages appear.

```tsx title="inline-input-button"
import { useState } from 'react';
import { Button, Inline, Stack, Switch, TextField } from '@marigold/components';

export default function () {
  const [description, setDescription] = useState('');

  const toggleDescription = () => {
    if (description) {
      setDescription('');
    } else {
      setDescription('button is vertically algined with input');
    }
  };

  return (
    <Stack space={6}>
      <Switch label="toggle description" onChange={toggleDescription} />
      <Inline alignY="input" space={6}>
        <div className="flex-1">
          <TextField label="My label is great." description={description} />
        </div>
        <Button onClick={toggleDescription}>Submit</Button>
      </Inline>
    </Stack>
  );
}
```

### Prevent line breaks

By default, inline elements will wrap to the next line when there isn't enough horizontal space. In some use cases, such as when using `<Inline>` inside a table cell, this automatic wrapping can be problematic because tables force content to break or wrap to fit within their columns. To prevent unwanted line breaks and keep all items on a single line, use the `noWrap` prop.

```tsx title="inline-nowrap"
import { venues } from '@/lib/data/venues';
import { Badge, Inline, Stack, Table, Text } from '@marigold/components';

export default () => (
  <Table>
    <Table.Header>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column>Traits</Table.Column>
      <Table.Column>Capacity</Table.Column>
      <Table.Column align="right">Rating</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 5).map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>
            <Inline space={1} noWrap>
              <Text variant="muted">#{item.id}</Text>
              <Text weight="medium" wrap="noWrap">
                {item.name}
              </Text>
            </Inline>
          </Table.Cell>
          <Table.Cell>
            <Stack>
              <Text wrap="noWrap">{item.street}</Text>
              <Text wrap="noWrap">{item.city}</Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>{item.capacity}</Table.Cell>
          <Table.Cell>
            <Inline space={1}>
              {item.traits.map(trait => (
                <Badge key={trait}>{trait}</Badge>
              ))}
            </Inline>
          </Table.Cell>
          <Table.Cell>{item.rating}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

## Props

| Prop             | Type                                                                 | Default | Description                                                                                                                                                                                                                                                                   |
| :--------------- | :------------------------------------------------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alignX           | `"left" \| "center" \| "right" \| "between" \| "around" \| "evenly"` | -       | Horizontal alignment of the items inside the element.                                                                                                                                                                                                                         |
| alignY           | `"center" \| "input" \| "top" \| "bottom"`                           | -       | Vertical alignment of the items inside the element.                                                                                                                                                                                                                           |
| aria-describedby | `string`                                                             | -       | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details     | `string`                                                             | -       | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label       | `string`                                                             | -       | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby  | `string`                                                             | -       | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live        | `"off" \| "polite" \| "assertive"`                                   | -       | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children         | `ReactNode`                                                          | -       | The children of the component.                                                                                                                                                                                                                                                |
| id               | `string`                                                             | -       | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| noWrap           | `boolean`                                                            | -       | Prevent the items from wrapping to the next line.                                                                                                                                                                                                                             |
| role             | `"region" \| (string & {})`                                          | -       | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space            | `GapSpaceProp`                                                       | `0`     | Set the spacing between child elements.                                                                                                                                                                                                                                       |

## Alternative components

<ul>
  <li>
    [Columns](../layout/columns): Because of the flex layout the `<Inline>` will wrap its content when there is no more space given to display it in smaller screen sizes, if you still want to have the items in one row, please use our columns component with the fixed column to get this layout.
  </li>

  <li>
    [Stack](../layout/stack): If you need to display content vertically you should use our stack component.
  </li>
</ul>

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.

- [Split](../layout/split) - Adds space between two elments in a flex layout.
