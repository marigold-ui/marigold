---
'@marigold/system': major
'@marigold/cli': minor
---

refactor(DST-1869): remove the deprecated `fontWeight` and `textSize` exports from `@marigold/system`

`@marigold/system` no longer exports the `fontWeight` and `textSize` class maps. They were deprecated in v18, when the style-prop maps moved into `@marigold/components`, and components no longer read them. The `FontWeightProp` and `FontSizeProp` types and the `weight` and `fontSize` props on `<Text>` are unchanged.

### Migration

An app that still imports either map fails to build after the upgrade. Replace each use with one of these:

- The `weight` or `fontSize` prop on `<Text>`, when the class styles text that `<Text>` can render.
- The Tailwind class directly, for example `font-bold` for `fontWeight.bold` and `text-2xl` for `textSize['2xl']`.

```tsx
// before
import { cn, fontWeight, textSize } from '@marigold/system';

<h1 className={cn(fontWeight.bold, textSize['2xl'])}>Title</h1>;

// after, with the props on <Text>
<Text weight="bold" fontSize="2xl">
  Title
</Text>;

// after, with the Tailwind classes
<h1 className={cn('font-bold', 'text-2xl')}>Title</h1>;
```

`marigold migrate v19` keeps your app building. It replaces the import with a copy of the map under the same name in each file that imports it, so the code keeps working unchanged. Replace the copy with the `<Text>` props or the Tailwind classes when you get to it. A re-export such as `export { fontWeight } from '@marigold/system'` or `export * from '@marigold/system'` and namespace access such as `system.fontWeight` get a warning and need a manual change.
