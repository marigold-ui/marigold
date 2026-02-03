# Layouts

_Learn about how layouting is handled in Marigold_

Having a comprehensive collection of reusable components for common tasks (like buttons, cards and form fields) is great but it's not enough to build a whole application. An essential part is missing: components to build layout for application pages.

A typically solution is to provide a `<Flex>` or `<Grid>` component for creating arbitrary layouts. However, in order to use those components efficiently developers need to have an intimate knowledge of `flex-box` and `grid`, including all their related properties.

Although this gives app developers incredible freedom, it will also leave the burden on them to research and implement necessary layout patterns, while at the same time make them reusable and responsive.

## Atomic Layouts

Because layout patterns are such an essential part of building great applications, Marigold comes with a set of _layout components_ that will cover almost, if not all, necessary patterns.

```tsx title="concepts-layouts"
import type { ReactNode } from 'react';
import { Columns, Stack, Text, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

const Annotation = ({ children }: { children: ReactNode }) => (
  <Text fontSize="xs" align="center">
    {children}
  </Text>
);

export default () => (
  <Columns columns={[1, 1, 1]} space={6} collapseAt="0em">
    <>
      <Stack space={2}>
        <Rectangle height="2rem" />
        <Rectangle height="2rem" />
        <Rectangle height="2rem" />
      </Stack>
      <Annotation>Stack</Annotation>
    </>
    <>
      <Columns columns={[3, 1, 2]} space={2} collapseAt="0em">
        <Rectangle height="126px" />
        <Rectangle height="126px" />
        <Rectangle height="126px" />
      </Columns>
      <Annotation>Columns</Annotation>
    </>
    <>
      <Tiles space={2} tilesWidth="32px">
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
      </Tiles>
      <Annotation>Tiles</Annotation>
    </>
  </Columns>
);
```

The majority of layouts used on the web are not that unique. They often can be broken down into just a handful of layout patterns, which then can be combined to achieve more complex layout structures.

Each of Marigold's layout components is build to do one layout pattern well. Like all Marigold's component, they are composable so that they can be combined until the desired layout is achieved. This makes it possible to build more complex layouts from just the given set of atomic layout components.

## Isolating Layouts

The move to [component-based development](https://www.componentdriven.org/) has enabled a ton of incredible improvements when it comes to building digital user interfaces. It changed the way how we think about building applications entirely. In combination with the principles from [Atomic Design](https://atomicdesign.bradfrost.com/) we are no longer building applications page by page. Instead we are focusing on constructing applications by using reusable pieces of UI (a.k.a. components). This not only improves the overall user experience and quality, it also boosts the velocity and convenience of development with which digital products get build.

A majority of the CSS layout patterns unfortunately predate this way of developing applications and as a result breaks the [modularity and composition assumptions of components](https://addyosmani.com/first/). CSS properties like `margin`, `flex-direction` or `align-self` that affect, or are affected by, elements outside of a component boundary will cause them to not appear as intended. Because of this, some people go as far as [considering margin as harmful](https://mxstbr.com/thoughts/margin/) and advice against its usage.

> “Components shouldn't contain surrounding whitespace”
>
> — Mark Dalgleish, Rethinking Design Practices

To avoid unexpected behavior and layout shifts, Marigold follows this principle. Managing whitespace, as well as positioning and arranging components is reserved for Marigold's layout components. This approach ensures that components are as composable as possible while keeping white space predictable.

## Layout Components

The components listed below can be nested within each other any number of times to create a wide variety of common layouts. Being familiar with these components is an essential part of working effectively with Marigold.

- [Aside](../components/layout/aside)
- [Aspect](../components/layout/aspect)
- [Breakout](../components/layout/breakout)
- [Center](../components/layout/center)
- [Columns](../components/layout/columns)
- [Container](../components/layout/container)
- [Grid](../components/layout/grid)
- [Inline](../components/layout/inline)
- [Inset](.../components/layout/inset)
- [Scrollable](../components/layout/scrollable)
- [Split](../components/layout/split)
- [Stack](../components/layout/stack)
- [Tiles](../components/layout/tiles)
