# Columns

_Position content in one row._

The `<Columns>` component is used to create structured and flexible layouts that organize content efficiently. It is a responsive component with sized columns in one row based on a [flex system](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).

## Usage

With the `<Columns>` component you specify the numbers of columns to get a layout with evenly distributed column cells. The `columns` property defines the width of the children. This is written as array, whose length and the count of children must be the same.

The `<Columns>` component is ideal for arranging content in a line. This can be for example if you have a table-like structure.

In this example the columns are filled with **interactive** elements. This is a good use case for a column component. Unlike as in `<Table>` you can use the interactive elements without loosing the accessibility features of the components.

```tsx title="table-layout-columns"
import {
  Columns,
  Headline,
  NumberField,
  Stack,
  TextField,
} from '@marigold/components';

const data = [
  {
    name: 'Standard',
    price: 2.5,
    fee: 3.0,
  },
  {
    name: 'Advanced',
    price: 2.75,
    fee: 3.0,
  },
  {
    name: 'Express',
    price: 5.5,
    fee: 6.0,
  },
];

export default () => {
  return (
    <div className="w-1/2 p-4">
      <Columns columns={[1, 1, 1]} space={2}>
        <Headline level="5">Name</Headline>
        <Headline level="5">Price</Headline>
        <Headline level="5">Fee</Headline>
      </Columns>
      <Columns columns={[1, 1, 1]} space={2}>
        <Stack>
          {data.map(({ name }) => (
            <TextField key={crypto.randomUUID()} defaultValue={name} />
          ))}
        </Stack>
        <Stack>
          {data.map(({ price }) => (
            <NumberField
              key={crypto.randomUUID()}
              defaultValue={price}
              hideStepper
              width={20}
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          ))}
        </Stack>
        <Stack>
          {data.map(({ fee }) => (
            <NumberField
              key={crypto.randomUUID()}
              defaultValue={fee}
              hideStepper
              width={20}
              formatOptions={{
                style: 'currency',
                currency: 'EUR',
              }}
            />
          ))}
        </Stack>
      </Columns>
    </div>
  );
};
```

### Page layout

With `<Columns>` you also have the possibility to create a whole, responsive page layout. This can be helpful if you anyway need to have certain parts of the application.

```tsx title="layout-columns"
import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Columns space={2} columns={[2, 8, 2]} collapseAt="40em">
    <Rectangle height="300px">
      <div className="text-text-primary-muted p-2">Left Sidebar</div>
    </Rectangle>
    <Rectangle height="300px">
      <div className="text-text-primary-muted p-2">Main Content</div>
    </Rectangle>
    <Rectangle height="300px">
      <div className="text-text-primary-muted p-2">Right Sidebar</div>
    </Rectangle>
  </Columns>
);
```

### Fixed widths

Sometimes you need to set an element at the start or at the end of a column. You can use the `fit` value for the `columns` property to align it to the chosen position. The column width will be always fitting the content. While the other values take the width content based according to the space still available.

```tsx title="fit-width-columns"
import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Columns space={2} columns={[8, 'fit']} collapseAt="40em" stretch={false}>
    <Rectangle height="100%" width="100%" />
    <Rectangle height="100%">
      <div className="text-text-primary-muted p-2">
        This is the column that takes the available width of the child, as you
        can see now.
      </div>
    </Rectangle>
  </Columns>
);
```

You can also add space between the columns and set a `collapseAt` prop to collapse the columns at a certain width. This is convenient for a good responsivness.

### Stretch to height of parent

By using the `stretch` prop you can make the container to take full height.

> ℹ️ Note: Setting the the `stretch` prop is usually not necessary since the columns
> will expand with their children anyway.

```tsx title="stretch-columns"
import { Columns } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="h-[200px]">
    <Columns columns={[4, 4, 4]} space={2} stretch>
      <Rectangle height="100%">
        <div className="text-text-primary-muted p-2">
          I have a height set to 100%!
        </div>
      </Rectangle>
      <Rectangle>
        <div className="text-text-primary-muted p-2">I space myself</div>
      </Rectangle>
      <Rectangle height="200px">
        <div className="text-text-primary-muted p-2">
          I have a height set to 200px.
        </div>
      </Rectangle>
    </Columns>
  </div>
);
```

Here is another interactive example on how to use the `stretch` prop.

> ℹ️ Note: You must define a parent for the columns that sets a `height`. Otherwise
> setting the height in a column to `100%` will not have any effect.

```tsx title="stretch-columns-switch"
import { useState } from 'react';
import { Columns, Stack, Switch } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => {
  const [stretch, setStretch] = useState(false);

  return (
    <Stack space={2}>
      <Switch label="Toggle stretch" onChange={() => setStretch(!stretch)} />
      <div className="h-80">
        <Columns columns={[1, 1, 1]} space={2} stretch={stretch}>
          <Rectangle height="150px" width="100%" />
          <Rectangle height="150px" width="100%" />
          <Rectangle height="100%" width="100%">
            <div className="text-text-primary-muted p-2">
              I will grow, if you set <code>stretch</code> prop on the{' '}
              <code>Columns</code>!
            </div>
          </Rectangle>
        </Columns>
      </div>
    </Stack>
  );
};
```

## Props

| Prop                   | Type                               | Default   | Description                                                                                                                                                                                                                                                                   |
| :--------------------- | :--------------------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby       | `string`                           | -         | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details           | `string`                           | -         | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label             | `string`                           | -         | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby        | `string`                           | -         | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live              | `"off" \| "polite" \| "assertive"` | -         | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children               | `ReactNode`                        | -         | The children of the component.                                                                                                                                                                                                                                                |
| collapseAt             | `string`                           | `0em`     | Collapse children into a vertical layout at given width. Note that \`collapseAt\` is based on the total element width, and not the window width. With a default value of "0" columns will not collapse by default.                                                            |
| **columns (required)** | `(number \| "fit")[]`              | -         | An array of numbers to set the size of the children. The columns array length and the count of children must be the same. Write "fit" for the column you want to have it fitting the contents width and height.                                                               |
| id                     | `string`                           | -         | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role                   | `"region" \| (string & {})`        | -         | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space                  | `GapSpaceProp`                     | `0`       | Set the spacing between child elements.                                                                                                                                                                                                                                       |
| stretch                | `boolean`                          | `"false"` | Stretch to height of parent container.                                                                                                                                                                                                                                        |

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.

- [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) - Learn how CSS flexbox layouts work.
