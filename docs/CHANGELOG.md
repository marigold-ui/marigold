# @marigold/docs

## 17.5.0

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

- c821902: docs([DST-1032]): Revise installation guideline

  Revised the whole installation Guideline, to make it up to date and fix stuff that wasn't working.
  It now contains a more detailed description and has better examples.
  Users and AI should now be able to create a new project with Marigold, without a problem.

- fd786af: feat(SelectList): standardized API, item layout, and visual distinction from ListBox (DST-1076)

  `<SelectList>` has been refined into a first-class form field for picking one or many items from a visible list of rich two-line rows. This release contains breaking renames and a tightened type surface.

  **Breaking changes**
  - `SelectList.Item` → **`SelectList.Option`**. The option semantic matches `Select.Option` and the HTML `<option>` mental model. Update any `<SelectList.Item>` usage to `<SelectList.Option>`.
  - `SelectList.Action` has been **removed**. Drop your `<ActionMenu>` or `<IconButton>` directly inside `<SelectList.Option>` — the component positions, sizes, and styles the nested control automatically via `ButtonContext`. Limit: one action per option (multi-button groups will arrive with a future `ActionButtonGroup`).
  - Leading-image slot has been **removed**. Compose images inside `<Text slot="label">` (or anywhere in children) as you see fit.
  - `selectionMode="none"` is no longer accepted. `SelectList` is a form field; the default is now `"single"`.
  - `onChange` is strictly typed per `selectionMode`: `(key: Key | null) => void` for single, `(keys: Key[]) => void` for multiple. The shape matches `Select<T, M>`. Passing `setState` directly may require adapting the callback.

  **Other changes**
  - **Selection indicator** — single-select rows render a visible radio circle; multi-select renders a checkbox.
  - **Label & description slots** — use `<Text slot="label">` and `<Text slot="description">` inside `<SelectList.Option>`. The row skeleton is `selection · label + description · action (optional)`.
  - **Dev-mode warning** when `textValue` is missing on an option whose children aren't a plain string.
  - **Own theme entry** — `SelectList` ships a dedicated theme component. The theme exposes first-class `label`, `description`, and `action` entries; slot styling no longer uses descendant selectors. Consumers with custom themes must add or update a `SelectList` entry.

  **Documentation**

  The SelectList docs page is rewritten around the new API. Adds an anatomy diagram, a decision table for choosing between `<SelectList>` and lighter controls (`<Radio.Group>`, `<Checkbox.Group>`, `<Select>`, `<Combobox>`, `<TagField>`), and dedicated sections for multi-selection, per-row actions (decision-help and configuration patterns), horizontal orientation, and empty state. Replaces selected prose with Do/Don't tiles. Tightens the accessibility section to what's specific to SelectList (keyboard model, label requirement, `textValue` for rich rows).

  **Migration**

  ```diff
  - <SelectList selectionMode="none">
  -   <SelectList.Item id="free">
  -     <SelectList.Action>
  -       <IconButton aria-label="Info"><Info /></IconButton>
  -     </SelectList.Action>
  -     Free
  -   </SelectList.Item>
  - </SelectList>
  + <SelectList selectionMode="single">
  +   <SelectList.Option id="free">
  +     Free
  +     <IconButton aria-label="Info"><Info /></IconButton>
  +   </SelectList.Option>
  + </SelectList>
  ```

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
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [1cac70d]
- Updated dependencies [fd786af]
- Updated dependencies [e33a1e7]
- Updated dependencies [c2a1c72]
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
