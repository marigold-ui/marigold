---
'@marigold/docs': patch
---

fix(docs): consolidate type extraction onto a single fumadocs-typescript generator and serve markdown/manifest as static assets at slug-mirror URLs.

The Vercel preview build for the docs failed on `pnpm build` with `TypeError: Cannot read private member #state from an object whose class did not declare it` while prerendering `app/api/manifest.json/route.ts` and `app/api/md/[...slug]/route.ts`. Root cause: Node 22+'s undici `Response` uses private class fields (`#state`); Next.js wraps the response in a `Proxy` during `force-static` prerender; `Reflect.get` cannot forward private-field access through the Proxy, so the route handlers crash during static export.

This change serves both endpoints as plain static assets generated at build time, sidestepping the prerender path entirely. While replacing the route handlers, the markdown pipeline was also refactored to share one ts-morph project + fumadocs-typescript generator with the React `<AutoTypeTable>` UI, eliminating a duplicate ts-morph load and unifying type-table output between the HTML and Markdown paths.

User-visible changes:

- Per-page raw markdown now lives at `<page-url>.md` (e.g. `/components/actions/button.md`) instead of `/api/md/<slug>.md`. The previous `next.config.mjs` rewrite that mapped one to the other is no longer needed and has been removed.
- The page index manifest now lives at `/md/manifest.json` instead of `/api/manifest.json`. Each entry's `url` field now points at the slug-mirror path.
- `<AutoTypeTable package="system" />` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in the markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
- HTML and Markdown prop tables now show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (e.g. `WidthProp`, `Scale | SpacingTokens`) appear consistently. Function types collapse to `function` in markdown the same way they already do in HTML.
- Dead `resolve-design-tokens` markdown plugin removed (its `<ColorTokenTable>` JSX target was retired with the design-tokens content rewrite; the plugin still referenced removed `ui/ColorTable.tsx` and `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT).

Internals:

- New `docs/lib/typescript.ts` exposes a lazy async singleton: one ts-morph `Project` against the monorepo root tsconfig, one `fumadocs-typescript` generator, one shared FS cache at `.next/cache/fumadocs-typescript` (lives under `.next/cache/` so Vercel preserves it across deploys). `resolveComponentPath` is lifted from `<AutoTypeTable>` so the markdown plugin and the UI use the same path resolver — the path that previously failed for `package="system"`.
- `docs/lib/markdown/plugins/resolve-props-table.ts` rewritten to call `generator.generateTypeTable` and map the resulting `DocEntry[]` to the existing remark `table` MDAST node. Variant/size name filter and A-Z sort preserved. Local `simplifyType` / HTML-entity decoder removed; `entry.simplifiedType` plus a whitespace normalize is sufficient.
- `docs/lib/markdown/plugins/resolve-appearance-table.ts` no longer maintains its own ts-morph singleton; it borrows the shared `Project` and only does what the generator can't (extract the literal union for `variant` / `size`).
- `docs/ui/AutoTypeTable.tsx` switches to the shared `getGenerator()` and `resolveComponentPath()`. The `autoTypeTableTransform` was moved from `docs/ui/` to `docs/lib/auto-type-table-transform.ts` since both UI and Markdown layers now import it.
- New build scripts `docs/scripts/build-manifest.mjs` and `docs/scripts/build-md.ts` write directly into `public/` (per-page `.md` files mirror the docs URL; manifest at `public/md/manifest.json`). Old `app/api/manifest.json/route.ts` and `app/api/md/[...slug]/route.ts` deleted.

Performance: cold `pnpm build:md` runs ~28s, warm runs ~16s (vs ~10s before). The regression is the cost of fumadocs's richer per-prop extraction (`getSimpleForm`, JSDoc tag parsing) plus per-call file I/O for the cache. Net win on Vercel: subsequent deploys reuse `.next/cache/fumadocs-typescript`, and HTML and Markdown no longer drift.
