# cva

_Helper to write styles for an element._

To write our styles for a component we use [cva](https://cva.style/docs). This library comes with a great utility function which we use to write styles for our components.
If you want to style your own component you can use this function which we updated with some additional style checks, for example it resolves conflicts in class names with `tailwind-merge`. With this the class names will be merged together.

## Import

```tsx
import { cva } from '@marigold/system';
```

## Examples

### Style an element

This example shows how to use the function inside a `div` element. You can add some variants and sizes if you want.

```tsx title="cva"
import { cva } from '@marigold/system';

export default () => {
  const styledDiv = cva('p-4 text-4xl', {
    variants: {
      variant: {
        myOwnVariant: 'bg-lime-200',
      },
    },
  });
  return (
    <div className={styledDiv({ variant: 'myOwnVariant' })}>
      this is some text
    </div>
  );
};
```
