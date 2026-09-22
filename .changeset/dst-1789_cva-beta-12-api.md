---
'@marigold/system': patch
---

fix(DST-1789): adapt the `cva` configuration to the 1.0.0-beta.12 API

`cva@1.0.0-beta.12` moved `defineConfig` off the package root onto a `cva/config`
subpath, replaced its `hooks.onComplete` option with a direct `cx` concatenator,
and stopped returning the `compose` helper. `@marigold/system` still built its
`cva` and `cn` exports from the old shape, so the bump broke every build and test
job at once: esbuild and Vite both reported that `cva` provides no export named
`defineConfig`, and TypeScript added an implicit `any` on `className`, which had
taken its type from the option that disappeared.

The new `cx` option owns the class name grammar rather than just post-processing
the result, so handing `twMerge` to it directly would have narrowed what `cn`
accepts to tailwind-merge's `ClassNameValue`. That rejects the object form and
render props, both of which components pass today. `cx` is therefore cva's own
clsx-flavored one with `twMerge` run over its output, which is what
`hooks.onComplete` did before.

Nothing to change in consuming code. `cva` and `cn` keep the same signatures and
the same tailwind-merge behavior. The removed `compose` was never re-exported
from the package barrel.
