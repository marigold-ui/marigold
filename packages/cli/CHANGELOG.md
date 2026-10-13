# @marigold/cli

## 3.0.0

### Major Changes

- e1f2e28: feat(DST-1819): default the CLI to JSON output when stdout is not a terminal

  When `--format` is omitted, `docs`, `list`, `search`, `examples`, `doctor` and `validate` now print `json` whenever their output is piped or captured, as it is for an AI agent, a script, CI or a redirect to a file. In an interactive terminal nothing changes: `docs`, `list`, `search` and `examples` still print `markdown`, and `doctor` and `validate` still print `text`. An explicit `--format` always wins.

  **Breaking:** a script that reads the default output of one of these commands through a pipe now receives JSON. Pass `--format markdown`, `--format plain` or `--format text` to keep the previous output. The programmatic `run*()` exports are unchanged and keep their `markdown`/`text` fallback.

### Minor Changes

- a7c4d00: feat: align the CLI with the Command Line Interface Guidelines (clig.dev)

  - **First-run telemetry notice.** Because telemetry is opt-out, the CLI now prints a one-time disclosure (to `stderr`, so JSON/stdout stays clean) explaining that anonymous usage data is collected and how to opt out (`marigold telemetry disable` or `DO_NOT_TRACK=1`). Mirrors the .NET SDK model. The "shown" flag is persisted only after the notice actually prints on an interactive terminal, so agent/pipe runs never consume it before a human sees it. The invocation that shows the notice is itself **not** tracked: no data leaves the machine before the user has seen the disclosure and had a chance to opt out. Tracking begins on the next run.
  - **"Did you mean?" suggestions.** Unknown commands now suggest the nearest valid command via edit distance (e.g. `marigold serach` → _Did you mean "search"?_), matching the error-recovery pattern used by `git`/`cargo`/`npm`.

- a7c4d00: feat: make CLI telemetry identifier-free, and document it in full

  Telemetry stays on by default, but it no longer carries anything that can single out a machine, user, or session. This is what makes the opt-out default defensible under GDPR and ePrivacy: with no identifier there is no personal data to have a lawful basis for, and the CLI no longer stores an identifier on the user's device, which would otherwise require consent under ePrivacy Art. 5(3) / § 25 TDDDG.

  - **Removed the `anonymousId`.** The persistent per-machine UUID is gone from the event payload, from `UserConfig`, and from the server schema. A stale value written by an older CLI is stripped on the next config read and erased from disk. The trade is deliberate: we can now count invocations, not people, and unique-user numbers come from public npm download counts instead.
  - **Corrected the first-run notice.** It previously claimed that no arguments and no personal data were collected, while the event did carry `args` and a persistent UUID. The notice now states exactly what is sent and links to the telemetry section of the CLI docs.
  - **Clamped `args`.** Enum flags are recorded as their validated value or as `invalid`, so a mistyped `--format=jsonn` is no longer echoed back verbatim. `--limit` is recorded only as a positive integer. A name passed as a positional or `--category` is never forwarded as typed: once it resolves against the docs manifest, the manifest's slug is recorded, and anything else is recorded as `unknown`. Free-text search terms remain recorded as `used`.
  - **Hour-granular timestamps, not expiry.** `receivedAt` is truncated to the hour, and so is the ID each event is stored under, in a stream of its own, so events cannot be stitched back into per-session sequences by timing once the identifier is gone. That is also what lets events be kept for long-run usage trends rather than expiring: with no identifier in a record, an old event says no more about you than a new one. The reasoning is in the [telemetry endpoint README](https://github.com/marigold-ui/marigold/blob/main/docs/app/api/telemetry/README.md).
  - **Strict event schema.** The endpoint rejects unknown top-level keys rather than stripping them, so a stale `anonymousId` gets a visible 400 instead of a silent drop. Keys inside `args` are bounded in length and count. The guarantee that no identifier is sent lives in the CLI, which builds `args` only from validated values.
  - **Endpoint-wide rate limit only.** The former per-`anonymousId` quota is gone, since there is no longer a client identifier to key one on, which leaves the endpoint-wide ceiling as the CLI's only bound. That ceiling is a cost backstop, not a security control. Bounding a single misbehaving caller belongs behind WAF rate limiting, which needs no identifier in the body.
  - **Full disclosure in the docs.** The `marigold telemetry` section of the [CLI page](https://www.marigold-ui.io/getting-started/cli#marigold-telemetry) now documents every field sent, what is never sent, why the default is opt-out, and every way to turn it off. It lives there rather than on a standalone privacy page, which nobody would navigate to. `marigold --help` links the anchor, so non-interactive users have a discoverable disclosure too.

### Patch Changes

- Updated dependencies [ab9b05e]
- Updated dependencies [b67903a]
- Updated dependencies [d6b5d77]
- Updated dependencies [d1b1f15]
- Updated dependencies [947b7a9]
- Updated dependencies [2319875]
- Updated dependencies [ec15520]
- Updated dependencies [e9df73e]
- Updated dependencies [44533cd]
- Updated dependencies [8bf58b2]
- Updated dependencies [25b45b3]
- Updated dependencies [e9324b2]
- Updated dependencies [f4e2236]
- Updated dependencies [c860eb4]
- Updated dependencies [ce5eaec]
  - @marigold/components@18.3.0
  - @marigold/theme-rui@6.2.1

## 2.0.1

### Patch Changes

- 39072e8: Prose style is now enforced rather than remembered. Vale runs over the docs site, the
  changesets and the published READMEs, wired into the pre-commit hook and a CI check, with
  the rules in `.vale/styles/Marigold/` and the writing guidance in `CLAUDE.md`.

  Three rules block CI: no em dashes, no semicolons in prose, and no en dash asides. Table
  cells are exempt, because there an em dash is a legitimate "not applicable" marker, and
  ranges keep the en dash so quoted component output stays accurate. All existing violations
  are rewritten in this change, so the check starts green.

  The en dash rule matches only the aside form (a letter, a spaced en dash, then a lowercase
  letter). German uses a spaced en dash where English uses an em dash, which makes it an easy
  slip, but a range reads as digits or a capital around the dash and stays legal.

- 0c56a11: feat(DST-1391): add `Stepper`, a progress indicator for multi-step tasks.

  `<Stepper>` shows where a user stands in a checkout, an onboarding flow, or a multi-page form, replacing the one-off "Step 1 of 4" widgets that several product flows had each built for themselves. It renders a `<nav>` landmark around an ordered list, announces each step's label, position, and state, and never relies on colour alone to convey which step is which.

  State is entirely consumer-owned. `completedKeys` is a set rather than a high-water mark, so non-contiguous completion coming from a server is expressible, and the component never infers that a step is finished: only your code knows whether validation passed. `selectableKeys` replaces the built-in "completed, errored, or current" rule when a backend decides what is reachable, and `disabledKeys` always wins over both. Errored steps stay clickable by default, so a user who is told a step failed has a way back to it, unless `selectableKeys` leaves them out.

  Steps with an `href` render as real links and route through `RouterProvider`. Steps without one render as buttons. Steps that are not reachable render as plain text rather than as disabled controls, since an unreachable step is not a disabled widget. `hideLabels` drops labels visually for flows with too many steps to label, keeping them for screen readers and adding a visible "Step 3 of 5" counter so sighted users still know how far along they are.

- Updated dependencies [d7cf7e4]
- Updated dependencies [741774f]
- Updated dependencies [455eca2]
- Updated dependencies [455eca2]
- Updated dependencies [455eca2]
- Updated dependencies [455eca2]
- Updated dependencies [86f5901]
- Updated dependencies [9a77767]
- Updated dependencies [d816f21]
- Updated dependencies [4b9631c]
- Updated dependencies [ee811e1]
- Updated dependencies [d5f277a]
- Updated dependencies [ea092c1]
- Updated dependencies [8ba1cc4]
- Updated dependencies [7ef7733]
- Updated dependencies [95821ea]
- Updated dependencies [30ecf9d]
- Updated dependencies [0c56a11]
- Updated dependencies [2780c9f]
- Updated dependencies [2fc0951]
  - @marigold/components@18.2.0
  - @marigold/theme-rui@6.2.0

## 2.0.0

### Patch Changes

- Updated dependencies [1dfe461]
- Updated dependencies [c7b5c1d]
- Updated dependencies [17f9158]
- Updated dependencies [148ef97]
- Updated dependencies [1dfe461]
- Updated dependencies [1dfe461]
- Updated dependencies [1fd3f85]
- Updated dependencies [ce2720e]
- Updated dependencies [eeb0a29]
- Updated dependencies [f2dff15]
- Updated dependencies [4a18a38]
- Updated dependencies [e41e633]
  - @marigold/components@18.1.0
  - @marigold/theme-rui@6.1.0

## 1.0.0

### Minor Changes

- 291451f: feat(DST-1475): `marigold validate` to check a component file against the design system's rules — static (AST) and rendered (DOM/a11y) passes, reporting errors and warnings an agent or human can act on.
- b7122c0: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

- b7122c0: feat(DST-1265): add `marigold doctor` — a read-only command that diagnoses a project's Marigold setup (package presence, `@marigold/components`/`@marigold/system` version match, latest-version freshness, that `MarigoldProvider` wraps the app and is actually imported, that its `theme` prop resolves to a real binding, Tailwind config, and React peer deps) and prints actionable fixes grouped by severity. The provider and theme checks verify the referenced identifiers are genuinely bound (imported or declared), so a `<MarigoldProvider theme={theme}>` whose import lines are missing is reported as broken instead of healthy. The freshness check makes a short, best-effort fetch of the docs manifest to learn the latest published versions (cached for 24h; skipped silently when offline or slow, and bypassed entirely with `--offline`). Supports `--format text|json` and `--offline`, and exits `1` only on deterministic errors (e.g. a `<MarigoldProvider>` that is rendered but never imported), so it is safe to gate CI on and easy for AI agents to consume.
- b7122c0: feat(DST-1543): add `marigold migrate <version>` codemods for breaking Marigold releases. The v18 migration restructures theme files to the new slot shapes (never overriding consumer classes), swaps exact-baseline layout classes with a token diff report, scaffolds missing theme components, applies safe application-code renames (icon imports per the official mapping, `Tabs.TabPanel`/`SelectList.Item`, `Inset` spacing props, `TextField` min/max), and reports everything that needs a human decision with pinned source links. The report also covers design-token breakage that no typecheck can see: renamed/removed tokens still referenced, new tokens components require but the consumer CSS does not define, and repurposed tokens that kept their name but changed meaning (with a remap recipe at the definition site). Interactive runs pre-analyze the target and offer the fired changes as a multiselect (Enter applies everything; `--only <names>` selects non-interactively). Run `npx marigold migrate v18 --dry-run` first.

### Patch Changes

- b7122c0: fix: run the CLI when invoked via a symlinked bin. The entry-point guard compared `import.meta.url` (always the realpath) against `path.resolve(process.argv[1])`, so symlinked global bins (`npm install -g`, manual links) exited silently with code 0. `argv[1]` is now resolved through `realpathSync`.
- b7122c0: fix(DST-1656): stop `marigold migrate` from warning on value-conditional props whose value is a literal wrapped in braces. The value check only read a bare `StringLiteral`, so `width={20}`, `width={48}` and `width={'1/2'}` all fell into the "cannot be ruled out statically" branch — a v18 run over a real app produced 16 `Select`/`ComboBox`/`Autocomplete` `width="fit"` warnings without a single site actually using `fit`. Literals inside a JSX expression container now resolve like bare ones; genuinely dynamic values such as `width={someVar}` still warn.
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [85e9a45]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [0e2c676]
- Updated dependencies [a9fdcff]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [2b9df4c]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [68122ff]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [e0f9c05]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [7a122c7]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [bb23186]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [0e2c676]
- Updated dependencies [b7122c0]
- Updated dependencies [f331a41]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [04e22ab]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [6cfcea4]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
  - @marigold/components@18.0.0
  - @marigold/theme-rui@6.0.0

## 0.5.0-rc.1

### Minor Changes

- b7122c0: feat(DST-1543): add `marigold migrate <version>` codemods for breaking Marigold releases. The v18 migration restructures theme files to the new slot shapes (never overriding consumer classes), swaps exact-baseline layout classes with a token diff report, scaffolds missing theme components, applies safe application-code renames (icon imports per the official mapping, `Tabs.TabPanel`/`SelectList.Item`, `Inset` spacing props, `TextField` min/max), and reports everything that needs a human decision with pinned source links. The report also covers design-token breakage that no typecheck can see: renamed/removed tokens still referenced, new tokens components require but the consumer CSS does not define, and repurposed tokens that kept their name but changed meaning (with a remap recipe at the definition site). Interactive runs pre-analyze the target and offer the fired changes as a multiselect (Enter applies everything; `--only <names>` selects non-interactively). Run `npx marigold migrate v18 --dry-run` first.

### Patch Changes

- b7122c0: fix: run the CLI when invoked via a symlinked bin. The entry-point guard compared `import.meta.url` (always the realpath) against `path.resolve(process.argv[1])`, so symlinked global bins (`npm install -g`, manual links) exited silently with code 0. `argv[1]` is now resolved through `realpathSync`.
- b7122c0: fix(DST-1656): stop `marigold migrate` from warning on value-conditional props whose value is a literal wrapped in braces. The value check only read a bare `StringLiteral`, so `width={20}`, `width={48}` and `width={'1/2'}` all fell into the "cannot be ruled out statically" branch — a v18 run over a real app produced 16 `Select`/`ComboBox`/`Autocomplete` `width="fit"` warnings without a single site actually using `fit`. Literals inside a JSX expression container now resolve like bare ones; genuinely dynamic values such as `width={someVar}` still warn.

## 0.5.0-beta.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

- 946dc9f: feat(DST-1265): add `marigold doctor` — a read-only command that diagnoses a project's Marigold setup (package presence, `@marigold/components`/`@marigold/system` version match, latest-version freshness, that `MarigoldProvider` wraps the app and is actually imported, that its `theme` prop resolves to a real binding, Tailwind config, and React peer deps) and prints actionable fixes grouped by severity. The provider and theme checks verify the referenced identifiers are genuinely bound (imported or declared), so a `<MarigoldProvider theme={theme}>` whose import lines are missing is reported as broken instead of healthy. The freshness check makes a short, best-effort fetch of the docs manifest to learn the latest published versions (cached for 24h; skipped silently when offline or slow, and bypassed entirely with `--offline`). Supports `--format text|json` and `--offline`, and exits `1` only on deterministic errors (e.g. a `<MarigoldProvider>` that is rendered but never imported), so it is safe to gate CI on and easy for AI agents to consume.

## 0.4.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

## 0.3.0

### Minor Changes

- 7877bc6: feat(DST-1421): `marigold examples` commands to expose application patterns

  Adds `marigold examples list` and `marigold examples get <slug>` so AI agents (and humans) can discover and retrieve Marigold's application-level reference patterns from the terminal, mirroring the library-first architecture of the `docs`/`list` commands.
  - **CLI:** new `listExamples()` / `getExample(slug)` library functions and a `examples` command wrapping them, with `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache layer). Tab completion and telemetry are extended to cover the new command and example slugs.
  - **Docs:** a new `build-examples.mjs` registry step emits `public/mcp/examples.json` and `public/mcp/examples/<slug>.json` from colocated `*.marigold-pattern.yaml` sidecars. Examples are discovered by sidecar presence (App-Shell placeholder pages are excluded automatically), and a malformed sidecar fails the build. Sidecars ship for the `filter`, `form` and `inventory` examples.
  - A global framework-transformation note (`marigold docs getting-started/examples-for-agents`) documents porting examples from the Next.js App Router to other frameworks (Vite, etc.) once, rather than per example.

- d84dfeb: feat(DST-1445): surface non-component docs pages in the CLI

  `marigold docs <name-or-slug>` now resolves any docs page, not just components — Foundations, Patterns, and Getting-Started pages are reachable by slug (`docs foundations/accessibility`) or name (`docs installation`). Full slugs route by prefix (`components/…` to a component, otherwise a page); bare names try components first and fall back to pages.

  `marigold list` now also lists those pages, grouped under `Foundations`, `Patterns`, and `Getting Started` headings, and accepts `--category foundations|patterns|getting-started` (the top-level segment, so `--category patterns` returns every pattern page). The `--format json` payload gains an additive top-level `pages` array (`{ title, slug, category, description }`); the existing `categories` shape is unchanged. Shell completion now suggests page slugs for `docs` and page categories for `--category`.

  The package README was updated to document the new page support: the `docs` command reference now covers slugs and page categories, and the `list` reference reflects that pages are listed and searchable alongside components.

  Note: the internal `getComponentDocs` / `ComponentDocs` exports were renamed to `getPageDocs` / `PageDocs`.

## 0.2.1

### Patch Changes

- 401929c: Fix `@marigold/cli` publishing without its `dist/` output. The release build filter excluded the CLI package, so the published tarball shipped without compiled files and the `marigold` bin pointed to a missing entry. The CLI is now built before publish.

## 0.2.0

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
