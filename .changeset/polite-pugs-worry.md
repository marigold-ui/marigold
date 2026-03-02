---
"@marigold/system": minor
"@marigold/theme-docs": minor
"@marigold/theme-rui": minor
---

Migrate from `class-variance-authority` to `cva` and simplify `extendTheme` via function composition.

- Replace `class-variance-authority` dependency with `cva` (v1 beta), which has built-in Tailwind merge support via `defineConfig`
- Refactor the custom `cva` wrapper to use `cva`'s `defineConfig` with a `twMerge` hook, storing variant configs in a WeakMap (for docs introspection) instead of a `.variants` property
- Simplify `extendTheme` to compose style functions directly (`cn(existingFn(props), newFn(props))`) instead of extracting and merging variant configs — this preserves `defaultVariants` and `compoundVariants` that were previously lost during merging
- Update all theme style files in `theme-docs` and `theme-rui` to the new `cva` API (object config with `base`/`variants`/`compoundVariants` keys)
