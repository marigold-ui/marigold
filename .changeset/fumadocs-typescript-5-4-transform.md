---
'@marigold/docs': patch
---

chore(deps): port the prop-table transform to fumadocs-typescript 5.4.0

`fumadocs-typescript` 5.4.0 swaps its extraction API from `ts-morph` to the native TypeScript 7 compiler API, so the `transform` callback now receives `typescript/unstable/sync` objects instead of ts-morph ones. `docs/lib/auto-type-table-transform.ts` is ported to match:

- `propertyType.getText()` becomes `checker.typeToString(type, undefined, NoTruncation | UseFullyQualifiedType)`, which prints the same `import("/path").Alias` provenance the alias regex reads.
- The `Wrapper['key']` declaration walk now resolves the node handles on `Symbol.declarations` against the project and follows aliases through `checker.getAliasedSymbol`.

`ts-morph` is no longer a `@marigold/docs` dependency.

All 148 prop tables still build, and 9027 of 9053 entries keep a byte-identical `simplifiedType`. The 26 that move are union members reordered by the TypeScript 7 checker, which sorts them alphabetically rather than keeping declaration order, so `SpacingTokens | Scale` now reads `Scale | SpacingTokens`. The same reordering accounts for 446 changes to the expanded `type` shown on row expand. Six `children` props inherited from react-aria-components lose their description, and `{@link SelectValueDetails}` in the `renderValue` description of `Select` now resolves to `SelectValueDetails`. Both come from the upstream doc-comment extraction rather than from this transform.

Without the port the transform throws on every property. `build:types` catches that per table, so the build would have written an empty `props.json` and dropped every prop table from the site without ever failing.
