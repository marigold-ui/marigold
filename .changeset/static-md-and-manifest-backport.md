---
'@marigold/docs': patch
---

fix(docs): serve per-page markdown and the page manifest as static assets, eliminate ts-morph from the runtime.

Backport of the static-files architecture from `beta-release` (PR #5372). On `main`, `app/api/md/[...slug]/route.ts` still uses `force-static` with `generateStaticParams` returning `NextResponse.json(...)`, which is the same pattern that crashes on Vercel under Node ≥22 + Next.js 16:

```
TypeError: Cannot read private member #state from an object whose class did not declare it
    at Reflect.get (<anonymous>)
```

Three things compose into the bug: Node 22+ undici's `Response` uses private class fields (`#state`); Next.js 16's prerender wraps the returned `Response` in a `Proxy`; the Proxy uses `Reflect.get` to forward access, which can't reach private fields declared on a class the receiver isn't an instance of (per the JavaScript spec). See [undici#4290](https://github.com/nodejs/undici/issues/4290), [node#58814](https://github.com/nodejs/node/issues/58814).

Production has been masked by 10-day-old CDN caches; the next non-trivial redeploy of `main` would have hit the same crash that surfaced on `beta-release`.

**Fix.** Both endpoints serve fully static data — write it to `public/` at build time and let Next.js serve it directly. No route handler runs, no Proxy ever wraps a `Response`, so the bug surface is removed. While re-architecting, ts-morph was eliminated from the runtime: type extraction now happens once at `pnpm build:types`, writing `.registry/props.json` for both the `<AutoTypeTable>` server component and the markdown-build remark plugin to read.

**User-visible changes**

- `/manifest.json` and `/<page-url>.md` (e.g. `/components/actions/button.md`) are now plain static assets in `public/`. No rewrite, no route handler. Same URLs as before.
- `<AutoTypeTable package="system">` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
- `<AppearanceTable>` markdown output now matches the HTML output exactly — both read the same `@marigold/theme-rui/appearances` map. Four components shift in their `.md` output: `Menu` gains `destructive`, `LinkButton` gains `destructive-ghost`, `Panel.size` gains `default`, `Link.size` gains `default | small`. AppearanceTable description cells render as plain text instead of `inlineCode`.
- HTML and markdown prop tables show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (`Scale | SpacingTokens` etc.) appear consistently.
- Dead `resolve-design-tokens` markdown plugin removed: it referenced deleted `ui/ColorTable.tsx` / `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT.

**Architecture**

```
pnpm build (or dev) → pnpm build:assets && next ...

build:assets (parallel):
├─ build:registry   →  .registry/demos.{tsx,json}
├─ build:changelog  →  content/.../release.mdx
├─ build:manifest   →  public/manifest.json
└─ build:types  NEW →  .registry/props.json   (one ts-morph pass)
        │
        ▼
    build:md        →  public/<slug>.md
```

ts-morph runs once at build time and is now a `devDependency` only. `<AutoTypeTable>` reads the pre-computed JSON synchronously and renders via fumadocs-ui's `<TypeTable>` shell. See `docs/README.md` for the full script catalog.
