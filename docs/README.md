# @marigold/docs

The Next.js documentation site for Marigold (https://www.marigold-ui.io).

## Getting started

```bash
pnpm dev      # build assets, then `next dev` on :3000
pnpm build    # build assets, then `next build`
pnpm start    # serve a built app (`next start`)
```

`dev` and `build` both run `pnpm build:assets` first, which generates everything the Next.js app and the static-asset endpoints need.

## Build pipeline

```
build:assets
├─ build:registry   ─┐
├─ build:changelog   │  in parallel
├─ build:manifest    │
└─ build:types      ─┘
        │
        ▼
    build:md
```

Four asset steps run in parallel. `build:md` runs last because it consumes outputs from `build:registry` and `build:types`.

| Script            | Runs                          | Output                           | Consumed by                                                                |
| ----------------- | ----------------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `build:registry`  | `scripts/build-registry.mjs`  | `.registry/demos.{tsx,json}`     | `<ComponentDemo>` (HTML), `resolve-component-demo` plugin (markdown)       |
| `build:changelog` | `scripts/build-changelog.mjs` | `content/.../release.mdx` files  | the docs site directly                                                     |
| `build:manifest`  | `scripts/build-manifest.mjs`  | `public/manifest.json`           | served as static asset at `/manifest.json` (page index for AI / discovery) |
| `build:types`     | `scripts/build-types.ts`      | `.registry/props.json`           | `<AutoTypeTable>` (HTML), `resolve-props-table` plugin (markdown)          |
| `build:md`        | `scripts/build-md.ts`         | `public/<slug>.md` per docs page | served as static assets (mirrors each page URL with a `.md` suffix)        |

Each script is **standalone**: you can run any of them individually after `pnpm install` (which already runs `build:registry` via `postinstall`). Only `build:md` has prerequisites — it reads `.registry/demos.json` and `.registry/props.json`, so run `build:registry` and `build:types` first if `.registry/` is empty.

The `.registry/` directory is the build-time scratch space (gitignored). Anything that ends up at a public URL goes to `public/` instead.

## Other scripts

| Script             | Purpose                                                               |
| ------------------ | --------------------------------------------------------------------- |
| `lint`             | ESLint                                                                |
| `types:check`      | `fumadocs-mdx && next typegen && tsc --noEmit`                        |
| `build:embeddings` | Generates the MCP-server embeddings index (run separately from build) |
| `postinstall`      | Hook: regenerates fumadocs MDX types and `.registry/demos.{tsx,json}` |

## Static endpoints

These are written to `public/` at build time and served directly by Next.js — no route handlers, no rewrites:

- `/manifest.json` — page index (one entry per docs page; URL, title, description, badge)
- `/<page-url>.md` — raw markdown for any docs page (e.g. `/components/actions/button.md`)

The markdown rendering (resolving `<ComponentDemo>`, `<AutoTypeTable>`, `<AppearanceTable>` to MDAST tables / code blocks) lives in `lib/markdown/`.
