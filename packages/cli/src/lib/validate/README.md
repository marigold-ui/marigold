# `marigold validate` — how the validation engine works

This directory is the complete implementation of `marigold validate`. The command takes a `.tsx` file (typically LLM-generated Marigold code) and checks it on three levels:

1. **Technical (static)** — TypeScript compilation, Marigold props, composition, accessibility conventions. Runs purely on the AST, no browser involved.
2. **Spatial (dynamic)** — overlap, overflow, responsive behavior, design-token compliance. Needs an actual render in a headless browser.
3. **Accessibility / a11y (dynamic)** — axe-core, contrast, keyboard navigation, focus visibility, hover/focus content. Also needs an actual render.

Goal of this file: anyone who needs to change, extend, or debug something here should be able to understand, without prior context, **how everything fits together** and **exactly where to make a change**.

---

## 1. The entry point

The CLI command (`packages/cli/src/commands/validate.ts` → `bin/marigold.ts`) ultimately calls a single function:

```ts
import { validate } from './lib/validate/index.js';

const report = await validate(filePath, {
  checks: ['technical', 'spatial', 'a11y'], // any subset of the three
  viewport: { width: 1280, height: 720 },
});
```

This is the programmatic library API (`ValidateOptions.checks: ValidationCheck[]`), which accepts any subset. The CLI's own `--checks` flag is stricter — `commands/validate.ts::parseChecks` only accepts a single value or the literal `'all'`, not a comma-separated subset.

`validate()` (in [`index.ts`](./index.ts)) does three things, in this order:

1. **Technical checks** always run first and synchronously, with no browser at all (`checkers/index.ts::runTechnicalChecks`).
2. If `spatial` or `a11y` were requested **and** the technical checks didn't produce a fatal error (a TypeScript error, or a runtime error in the validator itself), a Playwright/Vite render environment is set up **once** (`spatial/renderer.ts::createRenderer`) and the file is rendered.
3. The spatial and a11y checks then run on the rendered DOM (`spatial/index.ts::runSpatialChecks`), all against the same render — the file is never re-rendered per check.

At the end, every `ValidationIssue` found is collected into a `ValidationReport` (`buildReport` in `index.ts`) and turned into readable text (or JSON) via `format.ts`.

### Important: the `--checks` flag is coarser than the internal controls

`--checks technical|spatial|a11y|all` (one flag, four possible values) only exposes two booleans internally (`enableSpatial`, `enableA11y`), but internally `spatial/index.ts` has more switches (`enableResponsive`, `enableKeyboardA11y`, `enableTextSpacing`, `enableRevealed`, `enableContentHoverFocus`), which **default from the two coarse flags**:

| Fine-grained switch       | Default (`??`)  | So it runs on CLI flag |
| ------------------------- | --------------- | ---------------------- |
| `enableResponsive`        | `enableSpatial` | `spatial`, `all`       |
| `enableTextSpacing`       | `enableA11y`    | `a11y`, `all`          |
| `enableRevealed`          | `enableA11y`    | `a11y`, `all`          |
| `enableContentHoverFocus` | `enableA11y`    | `a11y`, `all`          |
| `enableKeyboardA11y`      | `enableA11y`    | `a11y`, `all`          |

I.e. `--checks spatial` also checks responsive behavior, and `--checks a11y` also checks keyboard navigation, text spacing, and hover/focus content — not just axe. This is intentional (all of these need the same render, it would be wasteful to trigger them separately), but when debugging "why does check X run even though I only passed `--checks spatial`", this table is the answer.

---

## 2. Technical checks (`checkers/`)

These checks run **synchronously, without a browser**, directly on the file's TypeScript AST (`ts-morph` / the TypeScript compiler API). Orchestrated in [`checkers/index.ts`](./checkers/index.ts) → `runTechnicalChecks(filePath, themePath?)`.

### Failure isolation

Each checker runs individually through `safeCheck()` (the TypeScript compiler pass is the one exception — it has its own inline `try/catch` in `checkers/index.ts`, building the same failure shape by hand). If a checker throws (e.g. because it hit an AST shape its author didn't anticipate), it becomes **a single warning for just that checker** — the other checkers still run. This is intentional: a broken checker must never take down the entire technical pass.

### The individual checkers

| File                       | Checks                                                                                                                                                                                                                                                                                                          | Source of truth                                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compiler.ts`              | Runs the file through a real, isolated TypeScript compiler pass (strict mode). Catches syntax errors, type errors, wrong imports — everything `tsc` itself would catch.                                                                                                                                         | TypeScript itself                                                                                                                                                                                                                                                                                                                               |
| `props.ts`                 | Compares every JSX attribute of a Marigold component against the real prop types from `helpers/components.ts`. Detects unknown props, invalid enum values, HTML events instead of React Aria events (`onClick` instead of `onPress`), DOM event objects passed into value-based handlers.                       | `@marigold/components` type declarations                                                                                                                                                                                                                                                                                                        |
| `composition.ts`           | Checks compound components (`<Dialog><Dialog.Title>…`) for: completely empty usage (error), duplicate sub-components (warning). Ignores dynamic children (`{children}`) and collections (Tabs, Select — which repeat their items by design).                                                                    | `helpers/components.ts` (which sub-components exist, is it a collection?) for the general rule, plus several curated exception sets in the file itself for cases the type system can't express (e.g. `STATIC_COLLECTION_COMPOUNDS`, `SELF_POPULATING_COMPOUNDS`, `WRAPPER_SUBCOMPONENTS`, `OPTIONAL_SUBCOMPONENT_COMPOUNDS`, `REPEATABLE_SUBS`) |
| `accessible-name.ts`       | Overlays (Dialog, Drawer, Menu, …) need a title or an `aria-label` — otherwise axe can't check this at runtime at all, because the overlay is closed by default and never opens during the render.                                                                                                              | curated list + `helpers/components.ts` resolver                                                                                                                                                                                                                                                                                                 |
| `required-ancestor.ts`     | Some building blocks may only appear inside a specific container (e.g. `<Radio>` only inside `<Radio.Group>`).                                                                                                                                                                                                  | schema-derived + a small curated exception list (see the `REQUIRED_CONTAINER` comment in the file)                                                                                                                                                                                                                                              |
| `section-header.ts`        | `<X.Section>` (Select, ComboBox, Autocomplete, TagField) requires a `header` prop per the docs — TypeScript itself doesn't enforce this strictly enough for technical reasons.                                                                                                                                  | curated (documented requirement), but gated through `getSubComponentProps` so it only fires for a sub-component that actually declares a `header` prop                                                                                                                                                                                          |
| `collection-id.ts`         | Statically written collection items need an `id`, so `onAction`/`onSelectionChange` can identify them.                                                                                                                                                                                                          | curated (deliberately NOT schema-derived — nearly every component accepts a DOM `id`, so "does the sub-component declare an `id` prop" can't tell a real keyed item like `Menu.Item` apart from `Table.Cell`; see the file's own comment)                                                                                                       |
| `design-system-usage.ts`   | Detects "hallucinated" components — names that look like a Marigold component but don't actually exist (a common LLM issue). Suggests the real, similarly-named component where possible.                                                                                                                       | `helpers/components.ts` registry                                                                                                                                                                                                                                                                                                                |
| `layout-usage.ts`          | A flow layout (`Stack`, `Inline`, `Columns`, `Grid`) with only one child does nothing useful — exceptions are wrappers like `Inset`/`Center`, whose entire purpose is wrapping a single child.                                                                                                                  | curated                                                                                                                                                                                                                                                                                                                                         |
| `table-usage.ts`           | Form fields don't belong directly inside a `<Table>` — a sign that the table is being misused for form layout. Also flags a `<SearchField>` nested inside a `<Table>` specifically (filter controls belong above the table, not inside a cell).                                                                 | curated                                                                                                                                                                                                                                                                                                                                         |
| `component-conventions.ts` | A collection of smaller style conventions, e.g. only one `variant="primary"` button per form, placeholder text that looks like a "loading" label. Uses the same origin resolver as `props.ts`, so a same-named local `<Form>`/`<Button>` isn't mistakenly treated as a Marigold component.                      | curated                                                                                                                                                                                                                                                                                                                                         |
| `theme-variants.ts`        | Checks prop values that are technically valid per TypeScript (an open string type) but don't correspond to a real theme variant (e.g. `size="huge"` when the theme only has `sm`/`md`/`lg`). Only runs if the theme package can actually be found on disk — otherwise the check is skipped entirely (no error). | `*.styles.ts` files in the installed `@marigold/theme-rui`                                                                                                                                                                                                                                                                                      |

### How to add a new technical checker

1. New file `checkers/my-check.ts` exporting a function `export const validateMyCheck = (filePath: string): ValidationIssue[] => …`.
2. Parse the source with `parseSource(filePath)` from `helpers/source.ts` (keeps AST construction consistent, with sensible error messages).
3. Add a new `IssueSource` value in `types.ts` (e.g. `'my-check'`).
4. Import it in `checkers/index.ts`, wire it into `runTechnicalChecks` via `safeCheck('my-check', 'My Check', () => validateMyCheck(filePath))`, and add a `passed` entry where it makes sense.
5. Add a `checkers/my-check.test.ts` file next to it — pattern: use `tmpFile()` from `test-support/tmp.ts` to build small inline fixtures, or add a fixture under `examples/` if multiple tests share it.

**An important convention that runs through every checker:** a tag only counts as a "Marigold component" if it was actually imported from `@marigold/components` — never by name alone. That's what `buildMarigoldTagResolver(source)` in `helpers/components.ts` is for. A locally declared `<Button>`, or a `<Button>` from `./ui/Button`, must NEVER be validated against the Marigold prop schema (this has repeatedly been a real source of false positives — see the git history of `props.ts`/`composition.ts`/`component-conventions.ts`).

---

## 3. Spatial & dynamic checks (`spatial/`)

These checks need an **actual, rendered DOM** — the file under validation is genuinely rendered with React, in a headless Chromium, via a local Vite dev server. Orchestrated in [`spatial/index.ts`](./spatial/index.ts) → `runSpatialChecks()`.

### 3.1 The render pipeline

```
validate/index.ts
  └─ spatial/renderer.ts :: createRenderer()      // launches ONE Chromium browser
       └─ renderer.render(filePath, viewport)      // per file:
            1. stageHarnessFiles()                    copy harness files + Component.tsx
                                                        into a tmp directory
                                                        (harness/ lives in packages/cli/src/harness)
            2. linkProjectModules()                   symlink the target project's
                                                        node_modules in
            3. startViteServer()                       start a Vite dev server on an
                                                        OS-assigned port
            4. browser.newContext() + page.goto()      open the page, wait for
                                                        [data-validation-root="ready"]
            5. cleanup-stack.ts                        tear everything back down (context,
                                                        server, tmp directory), LIFO
```

The actual rendered component comes from [`packages/cli/src/harness/`](../../harness/):

- `entry.tsx` — looks for a `default` or `App` export in the target file and renders it. Waits two `requestAnimationFrame` ticks (layout needs to genuinely settle) before setting the `data-validation-root="ready"` attribute that Playwright waits on.
- `setup.tsx` — wraps the component in `<MarigoldProvider theme={theme}>` plus an error boundary that logs render errors onto `window.__marigoldValidateRenderErrors` instead of crashing the page.

### 3.2 Security sandbox

The rendered file is **untrusted code** (typically LLM-generated). The renderer (`renderer.ts`) protects against that on two levels:

- **Network:** `page.route('**/*')` blocks every HTTP(S) request except to the local Vite server; `context.routeWebSocket('**/*', ws => ws.close())` additionally closes every WebSocket attempt (plain `page.route` doesn't cover WebSockets).
- **Filesystem:** Vite's `server.fs.deny` blocks a denylist of high-value targets (`.env`, `.ssh/**`, `.aws/**`, private keys, …) via Vite's `/@fs` read path. **This is a denylist, not an allowlist** — the comment directly above `fs.deny` in `renderer.ts` explains exactly what this does NOT cover and why (Vite still needs to serve its own client and the pnpm `node_modules` symlinks).

Anyone changing the sandbox should read that comment in `renderer.ts` first — the tradeoffs there were made deliberately, not overlooked.

### 3.3 Resource cleanup (`cleanup-stack.ts`)

Every resource `renderer.ts` creates during a render (browser context, Vite server, tmp directory) is registered on a `CleanupStack` **the instant it's created** (LIFO — last created, first torn down). This is deliberate, not "clean everything up at the end" — a timeout mid-setup could otherwise orphan a resource that only finished being created AFTER the timeout fired. See `cleanup-stack.test.ts` for the exact guarantees (ordering, "tear down all even if one throws", re-run safety).

### 3.4 The individual dynamic checks

| File                                         | Checks                                                                                                                                                                                                                                                                                                                                                                       | Runs on                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `bounding-box.ts` + `overlap.ts`             | Collects the bounding box of every Marigold component and detects genuine visual overlaps (not just edges touching).                                                                                                                                                                                                                                                         | `spatial`                                      |
| `overflow.ts`                                | Detects text/content overflow and line wrapping that isn't actually intended (e.g. text clipped inside a too-small box).                                                                                                                                                                                                                                                     | `spatial`                                      |
| `computed-styles.ts` + `token-compliance.ts` | Reads the actual computed CSS values of every component and compares them against the real design tokens from the theme — e.g. a hex color instead of a color token.                                                                                                                                                                                                         | `spatial`                                      |
| `responsive.ts`                              | Renders at multiple viewport widths and checks: content disappearing without reason, touch-target sizing at 320px (WCAG 2.5.8), horizontal-scroll/reflow overflow at the WCAG 1.4.10 320px condition, and computes "width utilization" (is the available space on desktop actually used, or does the layout stay stuck in a mobile shape?).                                  | `spatial` (and the `enableResponsive` default) |
| `aom-extractor.ts`                           | Builds the accessibility object model (roles, names, states) from the page and additionally runs a real `axe-core` audit.                                                                                                                                                                                                                                                    | `a11y`                                         |
| `non-text-contrast.ts` + `contrast.ts`       | WCAG 1.4.11 — contrast of borders/fills of UI components (not text!) against their surroundings. `contrast.ts` is the pure, Node-testable color math behind it (no browser code).                                                                                                                                                                                            | `a11y`                                         |
| `focus-visible.ts`                           | Pure focused-vs-unfocused style fingerprint comparison (WCAG 2.4.7) — used by `keyboard.ts` during the tab traversal, not called separately.                                                                                                                                                                                                                                 | (part of `keyboard.ts`)                        |
| `keyboard.ts`                                | Tab order, unreachable elements, keyboard traps (WCAG 2.1.2), arrow-key navigation in composite widgets, visible focus indicator, and whether the focused element is hidden behind sticky/fixed content (WCAG 2.4.11).                                                                                                                                                       | `a11y` (`enableKeyboardA11y` default)          |
| `text-spacing.ts`                            | WCAG 1.4.12 — text must not be clipped when line height/letter/word spacing are increased.                                                                                                                                                                                                                                                                                   | `a11y` (`enableTextSpacing` default)           |
| `content-on-hover-focus.ts`                  | WCAG 1.4.13 — content revealed by hover/focus (tooltip, popover) must be dismissable (Escape), hoverable (the pointer can move onto it without it vanishing), and persistent (doesn't disappear on its own). No public tool automates this — it genuinely simulates the interaction.                                                                                         | `a11y` (`enableContentHoverFocus` default)     |
| `interaction-driver.ts`                      | Generic mechanism: finds every interactive trigger (menu, dialog, listbox, disclosure — generic via the ARIA trigger contract, not by component name), opens them one at a time, runs an `onOpen` callback (typically axe + contrast) against the revealed content, closes it again. This way, content that isn't in the DOM at all on the initial render also gets checked. | `a11y` (`enableRevealed` default)              |
| `browser-helpers.ts`                         | No check of its own — provides DOM helper functions (`cssPath`, `isHidden`, `focusFingerprint`, …) that get injected into the page once via `buildInstallScript()`, so every `page.evaluate` call can reuse them under `window.__mv` instead of redefining them in every check.                                                                                              | (infrastructure, not a check)                  |

### Failure isolation (same as the technical checks)

`spatial/index.ts` wraps **every single one** of these checks in its own `try/catch`. If `extractBoundingBoxes()` fails, for example, it becomes a single warning with `source: 'overlap-detector'` — the other blocks (token compliance, overflow, text spacing, a11y, responsive, keyboard) still run. This was recently retrofitted onto the `enableSpatial` block so it's exactly as robust as the `enableA11y` block right below it — always carry this pattern forward when adding a new check here.

### How to add a new dynamic check

1. New file `spatial/my-check.ts` with two parts:
   - `extractMyCheckData(page: Page): Promise<MyCheckDatum[]>` — runs `page.evaluate(...)` and returns plain data (never a `ValidationIssue` directly from the browser — that would mean `ValidationIssue` types would need to be available in the browser context, which they aren't).
   - `myCheckToValidationIssues(data): ValidationIssue[]` — a pure, Node-side function that turns the raw data into findings. **This is the function that gets unit-tested in `*.test.ts`** (no browser needed) — see `non-text-contrast.test.ts` as a template.
2. Import it in `spatial/index.ts` and wire it into the appropriate block (`enableSpatial`/`enableA11y`/its own switch) with its own `try/catch`, matching the existing blocks.
3. Add a new `IssueSource` value in `types.ts`.
4. If the check needs real browser behavior that can't be meaningfully mocked: add a `*.integration.test.ts` next to it that self-skips when no Chromium is available (pattern: `beforeAll` attempts a real render, sets a `renderWorks` flag, every test checks `if (!renderWorks) return ctx.skip()`).

---

## 4. Shared helper modules (`helpers/`)

| File                     | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source.ts`              | Consistent reading + parsing of a source file into a `ts.SourceFile`. Every checker should go through this rather than calling `ts.createSourceFile` itself.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ast.ts`                 | Small, pure AST helpers needed by multiple checkers: `staticStringValue` (a JSX attribute's string- or template-literal value, if statically determinable), `hasAttrPresent`, `isPascalCase`, `hasSpreadAttribute`, `hasOpaqueDynamicChild`, `containsEventTargetAccess` (detects `param.target.value` access, bound to the specific handler parameter).                                                                                                                                                                                                                  |
| `jsx.ts`                 | Collects a file's import statements (without alias resolution — for that, see `components.ts::buildMarigoldTagResolver`).                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `components.ts`          | **The central registry.** Loads the real `.d.mts` type declarations of `@marigold/components` via `ts-morph`, cached once per process. From this it derives: which components exist, what props they have (including known string-literal values), which sub-components a compound has, whether a component is a "collection" (does it or one of its sub-components have an `items` prop?). Also contains `buildMarigoldTagResolver()` — see section 2, the central rule that a tag only counts as a Marigold component by its actual import origin, never by name alone. |
| `resolve-theme.ts`       | Locates the directory of the installed `@marigold/theme-rui` package (via `require.resolve` + verifying that the `package.json` found actually belongs to `@marigold/theme-rui` — not just the nearest `package.json` on the path).                                                                                                                                                                                                                                                                                                                                       |
| `design-tokens.ts`       | Loads the actual CSS custom properties (design tokens) from the installed theme, so `token-compliance.ts` can compare against real values instead of guessed constants.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `component-locations.ts` | Dynamic findings (from `spatial/`) inherently have no source line — they come from the rendered DOM. This file maps them back to a line in the original file afterwards. Marigold emits no name-bearing DOM attributes, so a component-name match often resolves nothing — the content fingerprint is actually the primary, reliable join key, not just a tie-breaker; the name match only helps in the rare case it does resolve, or to disambiguate when a fingerprint match is itself ambiguous. Used by `index.ts::enrichDynamicLocations`.                           |

---

## 5. Types & output

### `types.ts`

The central vocabulary of the whole system:

- **`ValidationIssue`** — a single finding: `type` (technical/spatial/style/a11y), `severity` (error/warning), `source` (which checker — must be added here as an `IssueSource` when a new checker is added), `component`, `message`, `suggestion`, optional `location` and `details`.
- **`ValidationReport`** — the overall result: `errors`/`warnings` (partitioned by `severity`), `passed` (a list of passed checks as plain text), `text` (fully formatted), `metadata` (render time, components found, which checks ran, coverage, width utilization).
- **`ValidationCoverage`** — makes transparent how much of the code could actually be checked statically: how many enum prop values were statically determinable vs. dynamic (not checkable), how many spread attributes (`{...props}`) bypassed prop validation entirely.

**Severity rule** (also documented as a comment right on `IssueSeverity`): `error` means "blocks correctness" (type errors, missing required props, missing required sub-components, critical a11y violations, component overlaps). `warning` means "likely improvable" (wrong prop values, missing optional sub-components, native instead of Marigold component, invalid theme variant, placeholder-only labels, layout wrapping/overflow). This line is drawn deliberately: these checks are also used by automated correction loops (LLM agents), and an `error` that turns out to be a false positive can send such a loop in the wrong direction. So for every new `error`-severity finding, the rule is: **it must be deterministic and false-positive-free** — when in doubt, use `warning`.

Note the one place this comment is currently stale: `spatial/overlap.ts` hardcodes every overlap finding to `severity: 'warning'`, with its own comment explaining the choice (overlap is a threshold-based layout heuristic, so the severity policy deliberately keeps it a warning regardless of the `IssueSeverity` doc comment's example above). If you touch either file, reconcile this — don't just copy the stale example.

### `format.ts`

`formatForLLM(report)` turns the structured report into the readable `text` block (sorted: first by `type`, then `error` before `warning`, then alphabetically by component). `formatValue()` must **never throw**, no matter what kind of `details` value comes in (not even for a bigint or a circular object) — this is part of the whole system's "throw-proof" contract (see section 6).

---

## 6. Core design principles

These principles run through the entire codebase and should be kept in mind for any change:

1. **False-positive safety over completeness.** A check that would rather report nothing when uncertain is better than one that guesses when uncertain. This shows up everywhere: unresolvable colors become `null` (= "indeterminate", never a wrong contrast value), dynamic prop values are skipped rather than guessed, a single unreadable theme file degrades to a partial finding instead of aborting the whole check.
2. **No check may take another one down with it.** Both `checkers/index.ts` (`safeCheck`) and `spatial/index.ts` (per-block `try/catch`) isolate every individual check. An error in one checker becomes a single warning for just that checker, not a total failure.
3. **A "throw-proof" contract for `validate()`.** The outer call (`validate()` in `index.ts`) is designed to practically never throw — even a render failure, a timeout, or a missing optional toolchain package becomes a structured `runtime` finding, not an exception. This matters because `validate()` is the programmatic entry point for automated correction loops that depend on a result object, not a crash.
4. **Origin over name.** A JSX tag only counts as a Marigold component if it can be shown to have been imported from `@marigold/components` (`buildMarigoldTagResolver`). Never check by name equality alone — this has repeatedly been a real source of false positives (a local component or a third-party import sharing the same name).
5. **Derive everything possible, hardcode nothing where it can be avoided.** Props, sub-components, collection status — all of that comes from the real `@marigold/components` type declarations (`helpers/components.ts`), not from hand-maintained lists. Where an exception genuinely can't be derived from the type system (e.g. which compounds render their items in a self-populating way), there's a curated, commented constant — and right next to it, a comment explaining WHY it can't be derived.
6. **Register resources for cleanup the instant they're created**, not only at the end (`cleanup-stack.ts`). Otherwise a timeout mid-setup can orphan a resource.

---

## 7. Tests

- **Unit tests** (`*.test.ts`) — right next to the file being tested, no browser needed. For checkers: use `tmpFile()` from `test-support/tmp.ts` for small inline fixtures, or a file under `examples/` for fixtures shared across multiple tests.
- **Integration tests** (`*.integration.test.ts`) — need a real Chromium. Self-skip (`ctx.skip()`) when no browser is available (e.g. a CI runner without Playwright pre-installed) — the pattern is right at the top of each of these files.
- **`examples/`** — shared fixture files: both "valid" code (should report nothing) and deliberately broken code (should trigger a specific finding), for checks that test the same fixture from multiple angles.

All tests run via `pnpm --filter @marigold/cli test` (see `packages/cli/vitest.config.ts`). Important: that config sets `NO_COLOR=1`, so CLI text output in tests is always uncolored and therefore deterministic to assert on, regardless of whether a `CI` environment variable is set (e.g. on GitHub Actions).

---

## 8. "Where do I find …?" — quick reference

| I want to …                                                              | … look here                                                                   |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| add a new static error/warning type                                      | `checkers/` (new file) + `checkers/index.ts` + `types.ts::IssueSource`        |
| add a new dynamic (render-time) error/warning type                       | `spatial/` (new file) + `spatial/index.ts` + `types.ts::IssueSource`          |
| find out which props/sub-components a Marigold component has             | `helpers/components.ts`                                                       |
| understand why a locally/third-party-imported tag isn't checked          | `helpers/components.ts::buildMarigoldTagResolver`                             |
| adjust the render sandbox/security boundaries                            | `spatial/renderer.ts` (read the comments at `fs.deny`/`routeWebSocket` first) |
| understand how/when resources get cleaned up                             | `spatial/cleanup-stack.ts`                                                    |
| change the output formatting (text/JSON)                                 | `format.ts`                                                                   |
| understand how a dynamic finding gets mapped to its source line          | `helpers/component-locations.ts`, `index.ts::enrichDynamicLocations`          |
| trace the CLI flags (`--checks`, `--format`)                             | `commands/validate.ts`, `bin/marigold.ts`                                     |
| understand how the component actually gets rendered                      | `harness/entry.tsx`, `harness/setup.tsx`                                      |
| look up design token values used for comparison                          | `helpers/design-tokens.ts`                                                    |
| look up theme variant data                                               | `checkers/theme-variants.ts`, `helpers/resolve-theme.ts`                      |
| understand why a finding is `error` instead of `warning` (or vice versa) | Section 5 above, the comment on `IssueSeverity` in `types.ts`                 |
