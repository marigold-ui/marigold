## Use Cases

### API

1. Component consists of only one element/part -> needs one `className` (e.g. `<Button>`)
2. Component consists if mulitple elements/parts -> needs mulitple `className` (e.g. `<Table>`)

a. Components may have `variant`s and `size`s
b. Components may have style props (e.g. `space`,`padding`, ...)

- All Components allow to set a `className`

### Internal API

- styles are passed down via React context

---

## Case 1a

```tsx
const Component = ({ className, variant, size }) => {
  const classNames = useClassNames('Component', {
    variant,
    size,
    className,
  });

  return <div className={classNames}>...</div>;
};
```

## Case 1b

```tsx
const Component = ({ className, variant, size, space }) => {
  //
  const classNames = useClassNames('Component', {
    variant,
    size,
    className,
    space,
  });

  return <div className={classNames}>...</div>;
};

<Component className="w-[500px]" space="3" />;
```

## Case 2a

```tsx
const Component = ({ className, variant, size }) => {
  const classNames = useClassNames('Component', {
    variant,
    size,
    className,
    slots: ['container', 'button'],
  });

  return (
    <div className={classNames.container}>
      <button className={classNames.button}>Click me!</button>
    </div>
  );
};
```

## Case 2b

```tsx
const Component = ({ className, variant, size, containerColor }) => {
  // TODO: color???
  const classNames = useClassNames('Component', { variant, size, classNames });

  return (
    <div className={classNames.container}>
      <button className={classNames.button}>Click me!</button>
    </div>
  );
};
```

```jsx
type ClassNames = string | { [slot: string]: string };
```

---

## Style Props

- Style props = mappings between React and Tailwind classes

```js
export const fontWeight = {
 thin: 'font-thin',
 extralight: 'font-extralight',
 light: 'font-light',
 normal: 'font-normal',
 medium: 'font-medium',
 semibold: 'font-semibold',
 bold: 'font-bold',
 extrabold: 'font-extrabold',
 black: 'font-black',
}

export type FontWeightProp = { fontWeight: keyof typeof fontWeight };
```

Idea 1:

```js
import { space } from '@marigold/style-props';

const component = tv({
  base: [],
  variants: {
    variant: {},
    size: {},

    // Styles Props
    space,
  },
});

// @marigold/style-props
export const space = {
  1: 'gap-1',
  2: 'gap-2',
};
```

Idea 2:

```tsx
// @marigold/style-props
export const space = {
  1: 'gap-1',
  2: 'gap-2',
};

// Component File
import { space, spaceProps } from '@marigold/style-props';

interface Props extends SpaceProps {}

const LayoutComponent = (props: Props) => {
  return <div className={space[props.space]}>...</div>;
};

<LayoutComponent space={1} />;
```

---

## Using CSS Vars

```tsx
// This doesn't work just a palceholder
const createVar = o =>
  Object.entries(o).map(
    ([name, val]) => ({ [`--${name}`]: val } as React.CSSProperties)
  );

const Component = ({ variant, size, labelWidth }) => {
  const classNames = useClassNames({
    variant,
    size,
    className: 'w-[var(--labelWidth)]',
  });

  return (
    <div className={classNames} style={createVar({ labelWidth })}>
      ...
    </div>
  );
};
```
