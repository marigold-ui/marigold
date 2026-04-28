---
'@marigold/docs': patch
---

fix(docs): pre-compute prop-table data at build time, eliminate ts-morph from the runtime, restore Next.js route handlers using `connection()`.

The Vercel preview build for the docs failed on `pnpm build` with:

```
TypeError: Cannot read private member #state from an object whose class did not declare it
    at Reflect.get (<anonymous>)
Export encountered an error on /api/manifest.json/route, exiting the build.
```

Same crash subsequently surfaced on `/api/md/[...slug]/route` once the manifest was patched.

**Root cause** (three things composing into one bug):

1. Node 22+ undici's `Response` uses **private class fields** (`#state`) — see [undici#4290](https://github.com/nodejs/undici/issues/4290), [node#58814](https://github.com/nodejs/node/issues/58814).
2. Next.js 16's `force-static` route-handler prerender wraps the returned `Response` in a JavaScript `Proxy`.
3. The Proxy's handlers use `Reflect.get` to forward property access. JavaScript's private-field semantics intentionally prevent `Reflect.get` from forwarding through a Proxy when the receiver isn't an instance of the class declaring the field.

So when Next.js's static exporter touches the proxied `Response` during prerender, undici's getters call `Reflect.get(target, '#state')`, which throws. The route handlers themselves run fine — the crash is on the way out, in the framework's prerender wrapper. The bug is environment-specific (Node 22+ × `force-static` × Vercel build) and does not reproduce locally on older Node versions.

**Fix and surrounding cleanup**

The route handlers are restored using `await connection()` from `next/server`, which is the idiomatic Next.js 16 escape hatch from the prerender pass — it survives a future `cacheComponents: true` upgrade and works alongside Vercel's CDN cache. The data they serve (per-page markdown, page-index manifest) is pre-computed at build time and read by the handlers at request time. While re-architecting, ts-morph was eliminated from the runtime entirely; type extraction now happens in a single build-script pass.

**User-visible changes**

- Per-page raw markdown is served at `<page-url>.md` (e.g. `/components/actions/button.md`). The internal route handler lives at `app/api/md/[...slug]/route.ts`; a Next.js rewrite maps the public slug-mirror URL to it.
- The docs page-index manifest is served at `/manifest.json` (route handler at `app/manifest.json/route.ts`, no rewrite). Each entry's `url` field now points at the slug-mirror `<page-url>.md` path.
- `<AutoTypeTable package="system" />` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in the markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
- `<AppearanceTable>` rendering in markdown now matches the HTML output exactly — they read from the same `@marigold/theme-rui/appearances` map. Four components shift in `<page-url>.md` output as a result: `Menu` gains `destructive` (it lives on the `MenuItem` slot in cva, was missed by the old ts-morph regex), `LinkButton` gains `destructive-ghost` (its `Props` interface omits it but the theme defines it), `Panel.size` gains `default`, `Link.size` gains `default | small`. AppearanceTable description cells render as plain text instead of `inlineCode` — descriptions aren't code.
- HTML and Markdown prop tables show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (`Scale | SpacingTokens` etc.) appear consistently. Function types collapse to `function` in markdown the same way they already do in HTML.
- Dead `resolve-design-tokens` markdown plugin removed: its `<ColorTokenTable>` JSX target was retired with the design-tokens content rewrite, but the plugin still referenced deleted `ui/ColorTable.tsx` / `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT.

**Architecture**

```
pnpm build (or dev)
  ├─ build:registry      → .registry/demos.{tsx,json}            (unchanged)
  ├─ build:types  NEW    → .registry/props.json                  (one ts-morph pass)
  ├─ build:changelog                                              (unchanged)
  ├─ build:manifest      → .registry/manifest.json               (was public/md/manifest.json)
  ├─ build:md            → .registry/md/<slug>.md                (was public/<slug>.md)
  └─ next build
```

At request time:
- `<AutoTypeTable>` (RSC) reads `.registry/props.json` synchronously and renders via fumadocs-ui's `<TypeTable>`. No ts-morph, no async generator, no FS cache lookup per render.
- `<AppearanceTable>` (RSC) reads `@marigold/theme-rui/appearances` directly (already the existing pattern).
- `app/manifest.json/route.ts` reads `.registry/manifest.json`.
- `app/api/md/[...slug]/route.ts` reads `.registry/md/<slug>.md`.

Both routes call `await connection()` and set `Cache-Control: public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400` so Vercel's CDN serves cached responses. `outputFileTracingIncludes` ensures `.registry/manifest.json` and `.registry/md/**/*.md` ship with the function bundles.

**Internals**

- `docs/lib/props-data.ts` (NEW) — typed `getPropTable({ path, name, package })` reading from `.registry/props.json`. Single source of truth for both consumers.
- `docs/scripts/build-types.ts` (NEW) — scans MDX files for `<AutoTypeTable>` references, deduplicates, calls fumadocs-typescript's generator with `autoTypeTableTransform` once per unique tuple, writes `.registry/props.json`. fumadocs FS cache lives at `.registry/.cache/fumadocs-typescript` so subsequent runs are fast when component sources are unchanged: cold ~17s, warm ~0.3s.
- `docs/ui/AutoTypeTable.tsx` — thin wrapper around `fumadocs-typescript/ui`'s `<AutoTypeTable>` with a mock `Generator` that just looks up `.registry/props.json`. The fumadocs `/ui` entry doesn't import ts-morph, so this keeps ts-morph entirely out of the runtime bundle while still using the same `<TypeTable>` shell (collapsibles, hash deep-linking, Shiki).
- `docs/lib/markdown/plugins/resolve-props-table.ts` — synchronous remark plugin; reads from `.registry/props.json` via `getPropTable`. No more async, no more generator call, no more `pLimit(4)` ts-morph contention in `build-md.ts`.
- `docs/lib/markdown/plugins/resolve-appearance-table.ts` — drops ts-morph entirely; imports `appearances` from `@marigold/theme-rui/appearances`.
- `docs/lib/typescript.ts` — deleted (no longer used at runtime; build-time helpers folded into `scripts/build-types.ts`).
- `next.config.mjs` — `serverExternalPackages: ['ts-morph', 'typescript']` removed (no runtime ts-morph). Rewrite for `/<slug>.md → /api/md/<slug>.md` restored. `outputFileTracingIncludes` added for `/manifest.json` and `/api/md/**`.
- `ts-morph` moved from runtime dependencies to devDependencies.

**Performance** (`pnpm build:md` 128 files):

|                    | before this PR | after |
|--------------------|---------------:|------:|
| `build:types` cold |             —  | ~17s  |
| `build:types` warm |             —  | ~0.3s |
| `build:md`         |          ~10s  | ~8s   |

`build:types` only reruns ts-morph for source files whose content changed. Vercel preserves `.next/cache/`; the registry cache is local-only at `.registry/.cache/fumadocs-typescript/`.
