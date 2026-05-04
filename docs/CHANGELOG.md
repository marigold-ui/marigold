# @marigold/docs

## 18.0.0-beta.0

### Major Changes

- f629319: refactor([DST-1283]): **Breaking Change** — Remove `<Multiselect>` (and the `react-select` dependency) from `@marigold/components`.

  Use `<TagField>` instead.

- 724f0ce: refa([DST-1162]): **Breaking changes**: The `Card` component has been refactored into a compound component pattern.

  **What changed:**
  - The previous prop-based API (`padding`, `space`, etc.) has been removed.
  - Content must now be composed using explicit sub-components: `Card.Header`, `Card.Body`, `Card.Footer`, and `Card.Preview`.
  - A `CardContext` is now required — sub-components will throw an error if used outside of a `<Card>`.

  **Migration:**

  ```tsx
  // Before
  <Card>
    <SomeContent />
  </Card>

  // After
  <Card>
    <Card.Header>Title</Card.Header>
    <Card.Body><SomeContent /></Card.Body>
    <Card.Footer>Actions</Card.Footer>
  </Card>
  ```

### Minor Changes

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

- 91f4312: feat: add MCP server for semantic search over Marigold docs

  Adds an MCP (Model Context Protocol) server at `/mcp` that lets AI coding assistants (Claude Code, VS Code Copilot, etc.) semantically search the Marigold documentation. An ETL pipeline (`pnpm build:embeddings`) chunks the MDX docs and generates vector embeddings via AWS Bedrock Titan v2, served via Streamable HTTP transport with Keycloak-authenticated access.

  [DST-1166](https://reservix.atlassian.net/browse/DST-1166)

### Patch Changes

- a69e719: refactor: adopt `Sidebar.Nav` `current` prop in demos and stories

  Replaces the hand-rolled `active={currentPath === '/...'}` pattern across Sidebar and AppLayout demos (documentation) and the `AppLayout` Storybook story with the new `current` prop on `Sidebar.Nav` (shipped in DST-1322 / #5306). The order-detail demo additionally leverages the new prefix-match semantics, so `/orders/:id` routes automatically highlight the `/orders` nav item without a regex fallback.

  No consumer-facing package behavior changes — only demos and an internal story.

- 7aa5128: Add unified demo app at `/examples` that consolidates all pattern demos (filter, form, inventory) alongside a full app-shell example. A shared shell layout renders the sidebar, breadcrumbs, and section switcher from a single navigation tree; each example page links back to its corresponding pattern guidelines. Removes all standalone pattern pages in favor of colocated demo routes.
- 1dbb3e2: fix(docs): make MCP and embedding env vars optional so `pnpm build:docs` works locally without `AWS_BEDROCK_*`, `OIDC_*`, or `BLOB_READ_WRITE_TOKEN` set. Also corrects the `claude mcp add marigold-docs` snippet to use the positional URL argument instead of `--url`.
- 0bf3239: fix: redesign Do/Don't guideline cards to match fumadocs

  Replaces the legacy Do/Don't design with a tinted card layout that uses fumadocs design tokens (`--color-fd-success`/`--color-fd-error`) and `lucide-react` icons. Adds proper dark mode support, which was previously broken due to hardcoded light-mode colors.

  [DST-1348](https://reservix.atlassian.net/browse/DST-1348)

- 2d8b8a3: docs(DST-1326): restructure the Layouts foundation around `Panel` + primitives

  Reworks the Layouts foundation page to frame the two responsibilities explicitly: `Panel` for page-level content sectioning, and the atomic layout primitives (`Stack`, `Inline`, `Inset`, `Split`, `Center`, `Tiles`, `Columns`) for everything inside. Adds a "Choosing the right layout" decision table, collapses the previous two-tier framing that implicitly treated `Panel` and `AppLayout` as peers, and replaces the wireframe demo with an annotated SVG anatomy diagram that mirrors the `Panel` and `Sidebar` anatomies. Also trims the component-principles Layout section to defer to this page, switches the `concepts-spacing` demo to `Wireframe.Box` for nicer visuals, and fixes `Wireframe.Box` colours after the `secondary-*` token removal by falling back to the Tailwind neutral palette.

- c821902: docs([DST-1032]): Revise installation guideline

  Revised the whole installation Guideline, to make it up to date and fix stuff that wasn't working.
  It now contains a more detailed description and has better examples.
  Users and AI should now be able to create a new project with Marigold, without a problem.

- 8326bf7: docs(DST-1326): add `Panel` component documentation

  MDX page, anatomy diagrams (header + collapsible), and a full set of demos covering appearance, variants, header actions, collapsible sections (incl. controlled + error state), footer, bleed content, danger-zone rows, and a `Panel` vs `Card` comparison.

- 9830f43: docs(DST-1331): flesh out app-shell example pages with realistic content

  Replaces the `PlaceholderPage` stand-in on the Analytics, Billing, General, Security, Teams, and Users routes with proper example screens built entirely from Marigold components. Each page uses `Panel` for page-level sections and reserves `Card` for repeating collection items (payment methods, active sessions, team cards, stat tiles). Removes the now-unused `PlaceholderPage` component.

- 7d96a7a: fix(docs): pre-compute prop-table data at build time, eliminate ts-morph from the runtime, ship per-page markdown and the page manifest as static assets.

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

  The data both endpoints serve (per-page markdown, page-index manifest) is fully static at build time. Rather than re-introduce route handlers and dance around the prerender Proxy with `await connection()` / cache headers / `outputFileTracingIncludes`, they're now plain files in `public/` served directly by Next.js. No route handler runs, no Proxy ever wraps the response — the bug surface is removed entirely. While re-architecting, ts-morph was eliminated from the runtime entirely; type extraction now happens in a single build-script pass.

  **User-visible changes**
  - Per-page raw markdown is served at `<page-url>.md` (e.g. `/components/actions/button.md`) — written to `public/<slug>.md` at build time, served by Next.js as a static asset (`Content-Type: text/markdown; charset=UTF-8`). No rewrite, no route handler.
  - The docs page-index manifest is served at `/manifest.json` — written to `public/manifest.json`, served as a static asset (`Content-Type: application/json; charset=UTF-8`). Each entry's `url` field points at the slug-mirror `<page-url>.md` path.
  - `<AutoTypeTable package="system" />` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in the markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
  - `<AppearanceTable>` rendering in markdown now matches the HTML output exactly — they read from the same `@marigold/theme-rui/appearances` map. Four components shift in `<page-url>.md` output as a result: `Menu` gains `destructive` (it lives on the `MenuItem` slot in cva, was missed by the old ts-morph regex), `LinkButton` gains `destructive-ghost` (its `Props` interface omits it but the theme defines it), `Panel.size` gains `default`, `Link.size` gains `default | small`. AppearanceTable description cells render as plain text instead of `inlineCode` — descriptions aren't code.
  - HTML and Markdown prop tables show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (`Scale | SpacingTokens` etc.) appear consistently. Function types collapse to `function` in markdown the same way they already do in HTML.
  - Dead `resolve-design-tokens` markdown plugin removed: its `<ColorTokenTable>` JSX target was retired with the design-tokens content rewrite, but the plugin still referenced deleted `ui/ColorTable.tsx` / `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT.

  **Architecture**

  ```
  pnpm build (or dev)
    ├─ build:registry      → .registry/demos.{tsx,json}     (unchanged)
    ├─ build:types  NEW    → .registry/props.json           (one ts-morph pass)
    ├─ build:changelog                                       (unchanged)
    ├─ build:manifest      → public/manifest.json           (static asset)
    ├─ build:md            → public/<slug>.md               (static assets)
    └─ next build
  ```

  At request time:
  - `<AutoTypeTable>` (RSC) reads `.registry/props.json` synchronously and renders via fumadocs-ui's `<TypeTable>`. No ts-morph, no async generator, no FS cache lookup per render.
  - `<AppearanceTable>` (RSC) reads `@marigold/theme-rui/appearances` directly (already the existing pattern).
  - `/manifest.json` and `/<slug>.md` are served as static assets from `public/` by Next.js.

  **Internals**
  - `docs/lib/props-data.ts` (NEW) — typed `getPropTable({ path, name, package })` reading from `.registry/props.json`. Single source of truth for both consumers.
  - `docs/scripts/build-types.ts` (NEW) — scans MDX files for `<AutoTypeTable>` references, deduplicates, calls fumadocs-typescript's generator with `autoTypeTableTransform` once per unique tuple, writes `.registry/props.json`. fumadocs FS cache lives at `.registry/.cache/fumadocs-typescript` so subsequent runs are fast when component sources are unchanged: cold ~17s, warm ~0.3s.
  - `docs/scripts/build-md.ts` — writes per-page markdown to `public/<slug>.md`; cleans only `.md` files in slug-root subtrees so existing image / asset directories under `public/` are untouched.
  - `docs/scripts/build-manifest.mjs` — writes the page manifest to `public/manifest.json`.
  - `docs/ui/AutoTypeTable.tsx` — thin wrapper around `fumadocs-typescript/ui`'s `<AutoTypeTable>` with a mock `Generator` that just looks up `.registry/props.json`. The fumadocs `/ui` entry doesn't import ts-morph, so this keeps ts-morph entirely out of the runtime bundle while still using the same `<TypeTable>` shell (collapsibles, hash deep-linking, Shiki).
  - `docs/lib/markdown/plugins/resolve-props-table.ts` — synchronous remark plugin; reads from `.registry/props.json` via `getPropTable`. No more async, no more generator call, no more `pLimit(4)` ts-morph contention in `build-md.ts`.
  - `docs/lib/markdown/plugins/resolve-appearance-table.ts` — drops ts-morph entirely; imports `appearances` from `@marigold/theme-rui/appearances`.
  - `docs/app/manifest.json/route.ts` — deleted (replaced by static asset).
  - `docs/app/api/md/[...slug]/route.ts` — deleted (replaced by static assets).
  - `docs/lib/typescript.ts` — deleted (no longer used at runtime; build-time helpers folded into `scripts/build-types.ts`).
  - `next.config.mjs` — `serverExternalPackages: ['ts-morph', 'typescript']`, the `/<slug>.md → /api/md/<slug>.md` rewrite, and the route-handler `outputFileTracingIncludes` entries are all removed.
  - `ts-morph` moved from runtime dependencies to devDependencies.

  **Performance** (`pnpm build:md` 128 files):

  |                    | before this PR | after |
  | ------------------ | -------------: | ----: |
  | `build:types` cold |              — |  ~17s |
  | `build:types` warm |              — | ~0.3s |
  | `build:md`         |           ~10s |   ~8s |

  `build:types` only reruns ts-morph for source files whose content changed. The registry cache is local-only at `.registry/.cache/fumadocs-typescript/`.

- 774a11a: fix(docs): serve per-page markdown and the page manifest as static assets, eliminate ts-morph from the runtime.

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

- a7a210b: docs(DST-1385): document Switch `variant="settings"` and the auto-save rule

  Adds a Button-style variant table under `## Appearance` summarising `default` and `settings`, rewrites `Settings and preference` with placement guidance and the reasoning for why switches must live on auto-save surfaces (light-switch metaphor + `role="switch"` ARIA contract + save-semantics conflict), and adds a warning Callout reserving `variant="settings"` for auto-save surfaces.

- b5e6e0d: docs(DST-1361): fix column alignment in Table documentation demos. Several demos contradicted the alignment guidelines described in the Table docs (numeric right, text left, center only for icons/status). The action-menu demo centered its row actions with `<Inline alignX="center">` while the column header was left-aligned, and the `table-editable`, `table-links`, and `table-sticky` demos had numeric Rating / Capacity columns rendered left-aligned. The demos now match the documented alignment rules.
- Updated dependencies [5cd5290]
- Updated dependencies [adb8a18]
- Updated dependencies [326f707]
- Updated dependencies [84d3213]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [f629319]
- Updated dependencies [93f9ef1]
- Updated dependencies [8326bf7]
- Updated dependencies [bfea9df]
- Updated dependencies [8326bf7]
- Updated dependencies [d35022b]
- Updated dependencies [1cac70d]
- Updated dependencies [968bc0b]
- Updated dependencies [cddcfd3]
- Updated dependencies [e33a1e7]
- Updated dependencies [20a42b0]
- Updated dependencies [00d93c8]
- Updated dependencies [c2a1c72]
- Updated dependencies [326f707]
- Updated dependencies [724f0ce]
- Updated dependencies [62cca29]
- Updated dependencies [8902b10]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/theme-rui@6.0.0-beta.0
  - @marigold/system@18.0.0-beta.0
  - @marigold/components@18.0.0-beta.0
  - @marigold/icons@1.3.39-beta.0

## 17.4.0

### Patch Changes

- bb8d67a: Add new "Component Principles" foundations page explaining the four pillars of Marigold's component design: accessibility, theming, composition, and layout.
- 5969186: Replace "Governance Process" and "Governance Principles" pages with a new "How to Contribute" page. Simplify the "Get in touch" page to focus on getting help.
- f02cd1b: docs(DST-975): document component variants under Appearance section
  - Add structured variant description tables (`Variant | Description | When to use`) to 14 component documentation pages: Button, SectionMessage, Badge, Card, Text, Accordion, Toast, Tooltip, Link, LinkButton, Divider, Loader, Menu, and Table
  - Retrofit Table's existing bullet list to the consistent table format
  - Improve Card appearance demo with realistic venue data instead of placeholder content

- 39502d3: bugfix[DST-1300]: Readd missing file field anatomy pic
- d01eb55: Add `/api/manifest.json` route that returns a JSON index of all documentation pages for AI agent discovery.
- fc7578c: Write complete ToggleButton documentation with anatomy diagrams, usage demos (standalone toggle, formatting toolbar, filter toggles, disabled state), Do/Don't guidelines, and alternative components section. Merge ToggleButtonGroup docs into the ToggleButton page.
- Updated dependencies [5dfb6da]
- Updated dependencies [f4f7a05]
- Updated dependencies [bbf0832]
- Updated dependencies [3f77810]
- Updated dependencies [85b2eb0]
- Updated dependencies [d341a9d]
- Updated dependencies [d6507d5]
- Updated dependencies [f560d95]
- Updated dependencies [a4b467f]
- Updated dependencies [50566a2]
- Updated dependencies [203baca]
- Updated dependencies [27d13b7]
- Updated dependencies [49fc2e2]
- Updated dependencies [969c8cc]
  - @marigold/theme-rui@5.2.4
  - @marigold/components@17.4.0
  - @marigold/system@17.4.0
  - @marigold/icons@1.3.38

## 17.3.1

### Patch Changes

- 6b00a16: Move markdown parser and plugins from `app/mcp/` to `lib/markdown/`. Serve markdown at `/{page-path}.md` instead of `/mcp/{page-path}.md`. Remove `build:md-docs` script.
- c8653f3: Unify docs UI component locations: move all components from `docs/components/` into `docs/ui/` and replace local Button/Popover with fumadocs imports.
- Updated dependencies [d3374cd]
  - @marigold/components@17.3.1
  - @marigold/theme-rui@5.2.3
  - @marigold/system@17.3.1
  - @marigold/icons@1.3.37

## 17.3.0

### Patch Changes

- 000ec3d: docs[DST-1193]: Refactor `<Calendar>` documentation.
- Updated dependencies [a48059c]
- Updated dependencies [6a29a6c]
- Updated dependencies [f3068d7]
- Updated dependencies [548dcb4]
  - @marigold/components@17.3.0
  - @marigold/theme-rui@5.2.2
  - @marigold/system@17.3.0
  - @marigold/icons@1.3.36

## 17.2.1

### Patch Changes

- Updated dependencies [fd6f323]
  - @marigold/theme-rui@5.2.1
  - @marigold/system@17.2.1
  - @marigold/components@17.2.1
  - @marigold/icons@1.3.35

## 17.2.0

### Minor Changes

- d44ee55: feat([DST-1163]): Add raw markdown MCP endpoint for documentation pages

  Implements `/mcp/[...slug]` route and `pnpm build:md-docs` that converts all MDX documentation pages to clean Markdown format, enabling programmatic access for AI/LLM integration and external tools.
  The custom remark pipeline processes embedded JSX components (component demos, props tables, design tokens) into semantic Markdown with code blocks and tables.

### Patch Changes

- 9db39f0: fix(DST-1243): Replace DateFormat JSX in changelog build script with plain text dates to fix docs crash
- 096fe67: Improve search result ranking by prioritizing pages whose title matches the query over pages that only mention the query in body text.
- d963df2: chore: Update React Aria to newest version
- Updated dependencies [91eb222]
- Updated dependencies [ed928a0]
- Updated dependencies [cf56729]
- Updated dependencies [5d4c915]
- Updated dependencies [b3c7085]
- Updated dependencies [28eba72]
- Updated dependencies [3019d28]
- Updated dependencies [b61ba43]
- Updated dependencies [e6091b6]
- Updated dependencies [efbd292]
- Updated dependencies [7ca2eb1]
- Updated dependencies [f7870ce]
- Updated dependencies [95c22b6]
- Updated dependencies [a3e3e8e]
- Updated dependencies [4a24ad6]
- Updated dependencies [beebd7c]
- Updated dependencies [9de007c]
- Updated dependencies [ed2baef]
- Updated dependencies [b115fda]
- Updated dependencies [61bfc60]
- Updated dependencies [a715f08]
- Updated dependencies [470d81c]
- Updated dependencies [600d09f]
- Updated dependencies [1ec6788]
- Updated dependencies [c3bf8e4]
- Updated dependencies [f63e57f]
- Updated dependencies [d963df2]
  - @marigold/components@17.2.0
  - @marigold/theme-rui@5.2.0
  - @marigold/system@17.2.0
  - @marigold/icons@1.3.34

## 0.0.3

### Patch Changes

- Updated dependencies [fd1b092]
- Updated dependencies [a3042ed]
  - @marigold/components@17.1.0
  - @marigold/system@17.1.0
  - @marigold/theme-rui@5.1.0
  - @marigold/theme-docs@4.1.2
  - @marigold/icons@1.3.33

## 0.0.2

### Patch Changes

- Updated dependencies [fb32888]
  - @marigold/theme-rui@5.0.1
  - @marigold/system@17.0.1
  - @marigold/components@17.0.1
  - @marigold/icons@1.3.32
  - @marigold/theme-docs@4.1.1

## 0.0.1

### Patch Changes

- b8bab20: docs([DST-1201]): Fix AppearanceDemo Select
- Updated dependencies [d8ce791]
- Updated dependencies [34c785a]
- Updated dependencies [96e145a]
- Updated dependencies [196172e]
- Updated dependencies [f756051]
- Updated dependencies [2e3f7d2]
- Updated dependencies [cfa9b99]
- Updated dependencies [00a3c81]
- Updated dependencies [cc61968]
- Updated dependencies [01e6bdb]
- Updated dependencies [2244030]
- Updated dependencies [6c071f0]
- Updated dependencies [44d01a6]
- Updated dependencies [63f1603]
- Updated dependencies [a0564dc]
- Updated dependencies [282b330]
- Updated dependencies [7928a23]
- Updated dependencies [5a90757]
- Updated dependencies [0c00d1d]
- Updated dependencies [0c00d1d]
- Updated dependencies [4645c5d]
- Updated dependencies [59ed05f]
- Updated dependencies [8dd0455]
- Updated dependencies [1469268]
- Updated dependencies [196172e]
- Updated dependencies [31a4e38]
- Updated dependencies [f916a20]
- Updated dependencies [726239d]
- Updated dependencies [1bd9f27]
- Updated dependencies [b8bab20]
- Updated dependencies [b7c64cc]
- Updated dependencies [8a70185]
  - @marigold/components@17.0.0
  - @marigold/theme-rui@5.0.0
  - @marigold/system@17.0.0
  - @marigold/theme-docs@4.1.0
  - @marigold/icons@1.3.31
