# @marigold/docs

## 17.9.2

### Patch Changes

- Updated dependencies [85e9a45]
  - @marigold/components@17.9.2
  - @marigold/theme-rui@5.5.2
  - @marigold/system@17.9.2
  - @marigold/icons@1.3.46

## 17.9.1

### Patch Changes

- Updated dependencies [cd9dd4d]
- Updated dependencies [76fca24]
  - @marigold/theme-rui@5.5.1
  - @marigold/components@17.9.1
  - @marigold/system@17.9.1
  - @marigold/icons@1.3.45

## 17.9.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

### Patch Changes

- a912c89: Improve spacing between sidebar navigation sections for better visual separation.
- c5bfbb1: docs(DST-1405): document the Marigold CLI on the docs site

  Adds a new **CLI** page under Getting Started (`/getting-started/cli`). The single page covers installation (npm / pnpm / npx), usage with AI agents, every command (`docs`, `list`, `examples`, `init`, `completion`, `telemetry`) with flags and examples, and configuration (environment variables and per-OS cache / config locations). Content mirrors `packages/cli/README.md`.

  Cross-links were added from the Installation page (`marigold init` as a faster setup path) and the Usage with AI page (the AI-agents section of the new CLI page).

- Updated dependencies [ed2d9ae]
- Updated dependencies [e686474]
- Updated dependencies [2fc7b96]
- Updated dependencies [ed2d9ae]
- Updated dependencies [508ec2c]
- Updated dependencies [24354a9]
- Updated dependencies [4d44517]
  - @marigold/components@17.9.0
  - @marigold/theme-rui@5.5.0
  - @marigold/system@17.9.0
  - @marigold/icons@1.3.44

## 17.8.0

### Patch Changes

- 4a4ab6b: docs(DST-1417): add Responsive Design foundations page

  Documents Marigold's mobile-first breakpoint scale, the `useResponsiveValue` / `useSmallScreen` hooks, and the 320px minimum supported width (a support floor, not a breakpoint). Also adds an "Extra Small Screen (320px)" viewport to Storybook for testing layouts at the floor.

- 7877bc6: feat(DST-1421): `marigold examples` commands to expose application patterns

  Adds `marigold examples list` and `marigold examples get <slug>` so AI agents (and humans) can discover and retrieve Marigold's application-level reference patterns from the terminal, mirroring the library-first architecture of the `docs`/`list` commands.
  - **CLI:** new `listExamples()` / `getExample(slug)` library functions and a `examples` command wrapping them, with `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache layer). Tab completion and telemetry are extended to cover the new command and example slugs.
  - **Docs:** a new `build-examples.mjs` registry step emits `public/mcp/examples.json` and `public/mcp/examples/<slug>.json` from colocated `*.marigold-pattern.yaml` sidecars. Examples are discovered by sidecar presence (App-Shell placeholder pages are excluded automatically), and a malformed sidecar fails the build. Sidecars ship for the `filter`, `form` and `inventory` examples.
  - A global framework-transformation note (`marigold docs getting-started/examples-for-agents`) documents porting examples from the Next.js App Router to other frameworks (Vite, etc.) once, rather than per example.

- Updated dependencies [bdda185]
- Updated dependencies [a609642]
- Updated dependencies [60b6e03]
  - @marigold/components@17.8.0
  - @marigold/theme-rui@5.4.1
  - @marigold/system@17.8.0
  - @marigold/icons@1.3.43

## 17.7.0

### Patch Changes

- a42a30b: docs(DST-1377): expand "Usage with AI" page with prompting tips, helpers, and limitations

  The "Usage with AI" page now covers three ways to feed Marigold docs to an AI agent (the marigold-docs MCP server, the public `manifest.json` / per-page `.md` endpoints, and the `@marigold/cli`), alongside a new Prompting tips section (the renamed-prop gotcha, naming Marigold, nudging the MCP, referencing component names), a Reservix AI helpers section surfacing rx-ai-suite (`frontend-dev`, `design-system`, `create-marigold-app`), and a Limitations section setting honest expectations plus a Slack feedback footer.

- Updated dependencies [a6a1cb3]
- Updated dependencies [f4608c6]
- Updated dependencies [4242aa1]
- Updated dependencies [da46e58]
- Updated dependencies [e0d5c7b]
  - @marigold/components@17.7.0
  - @marigold/theme-rui@5.4.0
  - @marigold/system@17.7.0
  - @marigold/icons@1.3.42

## 17.6.0

### Minor Changes

- 6b40542: feat(DST-1264): add `@marigold/cli` — terminal access to Marigold docs, component discovery, and project setup.
  - New package `@marigold/cli` with commands:
    - `marigold docs <Component>` — fetch component documentation (supports `--section`, `--format`, `--fresh`, `--offline`)
    - `marigold list` — list available components (supports `--category`, `--search`)
    - `marigold init` — interactive wizard that installs Marigold packages, edits CSS, wraps the app in `Providers`, and patches the Vite config for Next.js and Vite projects
    - `marigold telemetry <status|enable|disable>` — manage anonymous telemetry
    - `marigold completion <bash|zsh|fish>` — print a shell completion script for tab-completing commands, options, and component names
  - Security: sanitize remote content at the fetch boundary to strip the full ECMA-48 escape set (OSC, DCS, APC/PM/SOS, cursor) so a compromised docs origin can't write to the clipboard via OSC 52 or hijack the terminal; the OSC/DCS matchers are linear-time to avoid ReDoS on adversarial input.
  - Docs site: extended `/api/manifest.json` with categorized components and package version; added `/api/telemetry` ingest route (Upstash Redis).
  - CLAUDE.md: documented CLI usage for AI agents.

  The CLI is designed so AI coding agents can fetch accurate Marigold API data from the terminal instead of guessing from training data. Library exports (`getComponentDocs`, `loadManifest`, …) are available for the MCP server to reuse in a later change.

### Patch Changes

- 7ae875a: docs(DST-1430): reframe ToggleButton as an action button, not a form field or filter

  Rewrites the ToggleButton docs to position it as an action button that retains an active state, used in toolbars, editors, and canvases. The page now states explicitly that `<ToggleButton>` is not a form field or a filter, and that `<ToggleButton.Group>` is a toolbar of independent on/off actions rather than a selection control. The filter demo and the "Selection modes" section are removed; their guidance moves into a strengthened Do/Don't list and an updated Alternative components list that points readers to Checkbox.Group, Switch, Tabs, and Button. A new view-options demo broadens the group example beyond the formatting toolbar.

- 8637d9f: docs(DST-982): add a recommended third-party libraries page

  Adds a new "Recommended Libraries" page under Getting Started that collects the third-party libraries we recommend pairing with Marigold in one place. Until now these recommendations were scattered across individual component and pattern docs, so people only found them by chance. The page groups them by purpose (styling & build, data fetching, forms & validation, routing & URL state, dates, testing, and fonts), gives a brief note on when to use each, and links both the library's official docs and our own references. Registered in the Getting Started navigation after Installation.

- a289d42: chore(deps): update react-aria

  Bumps the react-aria packages and `tailwindcss-react-aria-components` (theme-rui).

  Note: following the react-aria update, `Switch` now toggles with the Space key
  to match native checkbox behavior. It no longer toggles on Enter.

- Updated dependencies [6f24f07]
- Updated dependencies [9436cbc]
- Updated dependencies [737c0a9]
- Updated dependencies [c619ffd]
- Updated dependencies [1c5c5fd]
- Updated dependencies [a289d42]
  - @marigold/components@17.6.0
  - @marigold/theme-rui@5.3.2
  - @marigold/system@17.6.0
  - @marigold/icons@1.3.41

## 17.5.1

### Patch Changes

- Updated dependencies [6517e25]
- Updated dependencies [3b29d91]
- Updated dependencies [c65d2a7]
  - @marigold/theme-rui@5.3.1
  - @marigold/components@17.5.1
  - @marigold/system@17.5.1
  - @marigold/icons@1.3.40

## 17.5.0

### Minor Changes

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

- 91f4312: feat: add MCP server for semantic search over Marigold docs

  Adds an MCP (Model Context Protocol) server at `/mcp` that lets AI coding assistants (Claude Code, VS Code Copilot, etc.) semantically search the Marigold documentation. An ETL pipeline (`pnpm build:embeddings`) chunks the MDX docs and generates vector embeddings via AWS Bedrock Titan v2, served via Streamable HTTP transport with Keycloak-authenticated access.

  [DST-1166](https://reservix.atlassian.net/browse/DST-1166)

### Patch Changes

- 727163c: feat([DST-1134]): add `<RangeCalendar>` component (alpha)

  Adds a new `<RangeCalendar>` for selecting a contiguous or non-contiguous date range, built on react-aria's `<RangeCalendar>` with Marigold conventions (`disabled`, `readOnly`, `error`, `dateUnavailable`, `allowsNonContiguousRanges`). Supports up to three side-by-side months via `visibleDuration`, stacking vertically below the `sm` breakpoint; the same responsive stacking now applies to multi-month `<Calendar>` for parity. `description` and `errorMessage` route through `<FieldBase>` so the help/error UI matches the rest of the form-component family (TriangleAlert icon + HelpText container). Ships as an alpha component with a stub docs page under the form section.

  [DST-1134](https://reservix.atlassian.net/browse/DST-1134)

- a69e719: refactor: adopt `Sidebar.Nav` `current` prop in demos and stories

  Replaces the hand-rolled `active={currentPath === '/...'}` pattern across Sidebar and AppLayout demos (documentation) and the `AppLayout` Storybook story with the new `current` prop on `Sidebar.Nav` (shipped in DST-1322 / #5306). The order-detail demo additionally leverages the new prefix-match semantics, so `/orders/:id` routes automatically highlight the `/orders` nav item without a regex fallback.

  No consumer-facing package behavior changes — only demos and an internal story.

- 7aa5128: Add unified demo app at `/examples` that consolidates all pattern demos (filter, form, inventory) alongside a full app-shell example. A shared shell layout renders the sidebar, breadcrumbs, and section switcher from a single navigation tree; each example page links back to its corresponding pattern guidelines. Removes all standalone pattern pages in favor of colocated demo routes.
- 1dbb3e2: fix(docs): make MCP and embedding env vars optional so `pnpm build:docs` works locally without `AWS_BEDROCK_*`, `OIDC_*`, or `BLOB_READ_WRITE_TOKEN` set. Also corrects the `claude mcp add marigold-docs` snippet to use the positional URL argument instead of `--url`.
- 0bf3239: fix: redesign Do/Don't guideline cards to match fumadocs

  Replaces the legacy Do/Don't design with a tinted card layout that uses fumadocs design tokens (`--color-fd-success`/`--color-fd-error`) and `lucide-react` icons. Adds proper dark mode support, which was previously broken due to hardcoded light-mode colors.

  [DST-1348](https://reservix.atlassian.net/browse/DST-1348)

- 8c8e2da: docs(DST-1382): expand Drawer documentation with use cases and decision framework

  Rewrites the Drawer docs to lead with a defining principle (supplementary, in-context, light task; non-modal on desktop), adds a decision framework (Drawer vs Dialog, routing to a page instead), and documents six canonical use cases: detail-row inspection, quick edit/create from a list, filter panel, comments and activity, contextual utility, and multi-field bulk edit. New demos illustrate the table-row inspection, comments/activity, and Table+ActionBar bulk-edit patterns. Filter pattern moved to a `## Related` section.

- c821902: docs([DST-1032]): Revise installation guideline

  Revised the whole installation Guideline, to make it up to date and fix stuff that wasn't working.
  It now contains a more detailed description and has better examples.
  Users and AI should now be able to create a new project with Marigold, without a problem.

- 4b02dfe: feat([DST-1388]): split prop tables into main, aria and handler groups

  The interactive Props table (`<AutoTypeTable>`) on each component page now shows the meaningful API props by default and tucks `aria-*` / `role` attributes and React DOM event handlers into separate collapsible sections (e.g. Button drops from 112 visible props to 39 main + 10 aria + 63 handlers). The static markdown pipeline that feeds the LLM/MCP `search_docs` index is intentionally untouched, so machine-readable docs continue to expose the full prop list.

  [DST-1388](https://reservix.atlassian.net/browse/DST-1388)

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

- b5e6e0d: docs(DST-1361): fix column alignment in Table documentation demos. Several demos contradicted the alignment guidelines described in the Table docs (numeric right, text left, center only for icons/status). The action-menu demo centered its row actions with `<Inline alignX="center">` while the column header was left-aligned, and the `table-editable`, `table-links`, and `table-sticky` demos had numeric Rating / Capacity columns rendered left-aligned. The demos now match the documented alignment rules.
- Updated dependencies [5cd5290]
- Updated dependencies [727163c]
- Updated dependencies [3c6a943]
- Updated dependencies [f8fbef9]
- Updated dependencies [4742e8e]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [1cac70d]
- Updated dependencies [5744bbf]
- Updated dependencies [e33a1e7]
- Updated dependencies [c2a1c72]
- Updated dependencies [2ff7bda]
- Updated dependencies [8902b10]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/theme-rui@5.3.0
  - @marigold/components@17.5.0
  - @marigold/system@17.5.0
  - @marigold/icons@1.3.39

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
