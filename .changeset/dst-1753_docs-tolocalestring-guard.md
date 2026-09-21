---
'@marigold/docs': patch
---

fix(DST-1753): stop docs pages formatting numbers with the runtime locale

Four docs pages called `toLocaleString()` with no locale, which reads the JS runtime default:
en-US under Node, the viewer's own locale in the browser. Server and client disagreed and React
logged a hydration mismatch. They now use `NumericFormat`, which honours the locale its demo
wrapper pins. This finishes what DST-1689 started.

`AppearanceDemo` and the `/examples` wrapper pinned no locale and now pin `en-US`, matching
`ComponentDemo`. That visibly changes published `/examples` pages for non-en-US readers, who
saw `1.000` where the rest of the site showed `1,000`.

A `no-restricted-syntax` rule scoped to `docs/**` rejects `toLocaleString`,
`toLocaleDateString` and `toLocaleTimeString` whenever they are called without a locale,
whether that is no argument at all or an explicit `undefined`.
