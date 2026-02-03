# Split

_Component that creates spacing between two flex elements._

The `<Split>` is an addition to the [`<Inline>`](/components/inline/) and [`<Stack>`](/component/stack/) components. Basically it creates an empty div between two elements with the [CSS Flexbox grow class](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow). With that it allows you to split the contents of two elements inside a flex context.

## Usage

Use the `<Split>` together with a `<Stack>` or `<Inline>`. It can also serve as an alternative to nested stacks or inlines, because it can also provide enough space between the items.

Of course you can also apply the split in any other flexbox context. But we recommend to use it with our given components.

### With inline

You can see below how to use the `<Split>` within the `<Inline>`.
To use the split with the inline correctly you have to set the inline as parent and add the split between the two elements you want to seperate.
With that you can provide as much space as given between the two children.

This can be helpful if you need to group related content together but also have other content in the same line.

```tsx title="split-inline"
import { Inline, Split } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Inline space={2}>
    <Rectangle width="50px" height="30px" />
    <Rectangle width="50px" height="30px" />
    <Rectangle width="50px" height="30px" />
    <Split />
    <Rectangle width="50px" height="30px" />
  </Inline>
);
```

### With stack

What applies to the inline is also possible with the stack component. You have to set the `<Split>` as child inside of the `<Stack>` between two other children to provide maximal space.

```tsx title="split-stack"
import { Split, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <div className="h-48">
    <Stack space={1} stretch>
      <Rectangle height="30px" />
      <Rectangle height="30px" />
      <Split />
      <Rectangle height="30px" />
    </Stack>
  </div>
);
```

## Props

Props for "Split" not found.

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.

- [Stack](../layout/stack) - Align elements vertically.

- [Inline](../layout/inline) - Align elements in a horizontally in a row.
