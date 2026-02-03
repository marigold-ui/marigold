# Stack

_Display children vertically with giving space between._

The `<Stack>` component is a responsive layout component based on [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). The stack is basically a flexbox column that acts as a container that aligns its children vertically in new lines. The component should be used wherever you need to arrange elements stacked on top of each other.

Use the stack component in combination with other layout components to easily [create customized layouts](../../foundations/layouts).

## Usage

The use of `<Stack>` is recommended if you have two or more elements that must be the same distance apart. For the space you have to use our supported [space values](../../foundations/design-tokens#spacing).

In this example you can see, the space prop ensures that each child is separated by the same space which maintains visual consistency.

```tsx title="stack-spacing"
import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={8}>
    <Rectangle height="50px" />
    <Rectangle height="50px" />
    <Rectangle height="50px" />
  </Stack>
);
```

### Stack as list

The `<Stack>` component can also be used to render a list of items. This is useful for screen readers and accessibility. To use the stack as a list, you need to set the `asList` property to `true`. This will render each child as a list item.

### Different alignment

Of course you can align the elements inside of the stack vertically and horizontally. This is useful if you need to place certain items at a certain position. For vertical alignment you need to set the `alignY` property and the `stretch` property to true. The `stretch` property stretches the stack to fill the space of the parent element.

You can control the vertical alignment of the children using the `alignY` property. Set it to `top`, `center`, or `bottom` to align items accordingly. For distributing space between children, use options like `between`, `around`, or `evenly`.

```tsx title="stack-vertical"
import { Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={4}>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="top">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Top</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="center">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Center</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="bottom">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Bottom</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="between">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Between</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="around">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Around</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
    <div className="border-secondary-300 h-52 border-2 border-dashed p-2">
      <Stack space={4} stretch alignY="evenly">
        <Rectangle height="30px">
          <div className="text-text-primary-muted m-auto">Evenly</div>
        </Rectangle>
        <Rectangle height="30px" />
        <Rectangle height="30px" />
      </Stack>
    </div>
  </Stack>
);
```

For horizontal alignment of the children, the children need to have a defined width given so it can align inside the stack container.

To align the children horizontal you have to use the `alignX` property. Options are `right`, `center` and `left`. By default, `stretch` is used, which makes children expand to fill the full width of the stack container.

```tsx title="stack-horizontal"
import { Divider, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={4}>
    <Stack space={4} alignX="left">
      <Rectangle height="30px" width="50px">
        <div className="text-text-primary-muted m-auto">Left</div>
      </Rectangle>
      <Rectangle height="30px" width="50px" />
      <Rectangle height="30px" width="50px" />
    </Stack>
    <Divider />
    <Stack space={4} alignX="center">
      <Rectangle height="30px" width="50px">
        <div className="text-text-primary-muted m-auto">Center</div>
      </Rectangle>
      <Rectangle height="30px" width="50px" />
      <Rectangle height="30px" width="50px" />
    </Stack>
    <Divider />
    <Stack space={4} alignX="right">
      <Rectangle height="30px" width="50px">
        <div className="text-text-primary-muted m-auto">Right</div>
      </Rectangle>
      <Rectangle height="30px" width="50px" />
      <Rectangle height="30px" width="50px" />
    </Stack>
  </Stack>
);
```

### Nested stacks

Sometimes you may need complexer layouts to arrange your elements, with the stack component you can also nest stacks within stacks. So you can build complex structures and constructs but without breaking the layout.

The following example shows how stacks can be nested within each other. You see how a stack will behave with a [inline](../layout/inline) and [split](../layout/split) component.

```tsx title="stack-nested"
import { Inline, Split, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={10}>
    <div className="border-border bg-bg-body rounded-xs border-2 border-dashed p-2">
      <Inline space={8}>
        <Stack space={2} stretch>
          <Rectangle height="30px" width="100%" />
          <Rectangle height="30px" width="100%" />
          <Rectangle height="30px" width="100%" />
        </Stack>
        <Stack space={2}>
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
        </Stack>
        <Split />
        <Stack space={2}>
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
          <Rectangle height="30px" width="70px" />
        </Stack>
      </Inline>
    </div>
    <Rectangle height="50px" />
    <Rectangle height="50px" />
  </Stack>
);
```

## Props

| Prop             | Type                                                                 | Default     | Description                                                                                                                                                                                                                                                                   |
| :--------------- | :------------------------------------------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alignX           | `"stretch" \| "left" \| "center" \| "right"`                         | `"stretch"` | Horizontal alignment for the children.                                                                                                                                                                                                                                        |
| alignY           | `"center" \| "top" \| "bottom" \| "between" \| "around" \| "evenly"` | -           | Vertical alignment for the children.                                                                                                                                                                                                                                          |
| aria-describedby | `string`                                                             | -           | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details     | `string`                                                             | -           | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label       | `string`                                                             | -           | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby  | `string`                                                             | -           | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live        | `"off" \| "polite" \| "assertive"`                                   | -           | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| asList           | `boolean`                                                            | `"false"`   | Prop to make the stack rendered as a list element. Useful for screen readers and accessibility.                                                                                                                                                                               |
| children         | `ReactNode`                                                          | -           | Children of the component.                                                                                                                                                                                                                                                    |
| id               | `string`                                                             | -           | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role             | `"region" \| (string & {})`                                          | -           | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space            | `GapSpaceProp`                                                       | `0`         | Set the spacing between child elements.                                                                                                                                                                                                                                       |
| stretch          | `boolean`                                                            | `"false"`   | Stretch to fill space (vertical AND horizontal, useful if you want to change y alignment).                                                                                                                                                                                    |

## Alternative components

<ul>
  <li>
    [Inline](../layout/inline): If you need to have the elements displayed in a
    row you should use our inline component.
  </li>
</ul>

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.

- [Split](../layout/split) - Adds space between two elments in a flex layout.
