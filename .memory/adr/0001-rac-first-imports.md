---
id: ADR-0001
status: proposed # proposed | accepted | superseded-by ADR-NNNN
date: 2026-08-17
applies_to:
  - 'packages/components/src/**/*.tsx'
  - 'packages/components/src/index.ts'
  - 'docs/content/**/*.demo.tsx'
---

# 0001. Import from `react-aria-components` whenever it re-exports the API

## Context

React Aria ships the same APIs through two front doors. `react-aria-components` (RAC) is the component library we build on. Underneath it sit the `@react-aria/*` and `@react-stately/*` "shell" packages, which expose the hooks and a handful of providers directly. For something like `I18nProvider`, both doors reach the same thing.

They do not behave the same way under version resolution, and that is the whole of this decision. From `packages/components/package.json`:

```jsonc
"@react-aria/i18n": "^3.13.1",        // caret — floats
"@react-aria/overlays": "^3.32.1",    // caret — floats
// …every @react-aria/* and @react-stately/* entry is a caret range
"react-aria-components": "^1.20.0",   // one package, internally pinned upstream
```

RAC pins its own internals exactly. The shell packages keep caret ranges **by design** — they are meant to be composed à la carte, and upstream does not coordinate their resolution for you. So a consumer's lockfile can legitimately resolve two different copies of `react-aria` in one tree.

That is not a hypothetical. Two copies means two module instances, which means **two distinct React contexts with the same name**. A provider from copy A does not satisfy a `useContext` from copy B; the consumer silently falls back to the default. The failure looks like an unrelated bug — an overlay that will not position, a locale that will not apply — and it does not reproduce in our repo, where dedupe hides it.

The repo has been bitten by this class twice: DSTSUP-261 / PR #5514, then DST-1505 / PR #5516, which fixed the runtime re-export in `packages/components/src/index.ts`:

```ts
export { I18nProvider } from 'react-aria-components';
```

DST-1512 then finished the migration across the remaining stories, tests and demos, so the pattern could not be copy-pasted into new code.

## Decision

**When `react-aria-components` re-exports an API, import it from there.** It is the only package whose internal consistency upstream guarantees.

Import from `@react-aria/*` or `@react-stately/*` only when RAC genuinely does not re-export what you need — most hooks, and the low-level utilities.

By package:

| Package               | Import from                                               |
| --------------------- | --------------------------------------------------------- |
| `packages/components` | `react-aria-components` (it is a direct dependency)       |
| `docs`                | `@marigold/components` — the public API, not RAC directly |
| `packages/system`     | `@react-aria/*` — it does not depend on RAC at all        |

**The exception worth stating, because it looks like a violation.** `packages/system`'s formatter tests (`DateFormat.test.tsx`, `NumericFormat.test.tsx`) stay on `@react-aria/i18n` deliberately. The formatters under test read locale from `useDateFormatter` / `useNumberFormatter`, which live in `@react-aria/i18n`, and `packages/system` does not depend on RAC. A test provider must write to the same context its subject reads. Migrating these would split provider and consumer across two packages and only work _because_ of dedupe — which is the exact fragility this record exists to avoid.

The rule is therefore not "always type `react-aria-components`". It is **provider and consumer must resolve to the same module instance**, and RAC-first is how you get that in the packages that depend on RAC.

## Alternatives rejected

**Import from `@react-aria/*` everywhere, for consistency.** Simple to state and easy to lint for. Rejected because it maximises exposure to exactly the resolution we cannot control: every caret range is another chance for a consumer lockfile to split a context. Consistency in the import path is worth nothing if the runtime graph is inconsistent.

**Pin the `@react-aria/*` shells ourselves.** Tried in the narrow case and kept where it is load-bearing — the `~` pins on `@react-types/{button,checkbox,grid,table}`, guarded by `scripts/check-react-aria-dedupe.mjs`. Rejected as the general policy because our lockfile does not govern a consumer's: an app installing `@marigold/components` resolves its own tree. Pinning is a fix for a specific upstream defect, not a substitute for depending on the package upstream keeps coherent.

**Re-export everything through `@marigold/components` and forbid both doors internally.** Attractive, and already what `docs` does. Rejected as a blanket rule because `packages/components` is where the public surface is defined — it cannot import from itself — and `packages/system` deliberately has no RAC dependency to re-export from.

## Consequences

**What this buys.** One `react-aria` instance in a consumer's tree is the normal outcome rather than a lucky one. Context-splitting bugs — the ones that only appear in a consumer's app, never in ours — stop being reachable through our own imports.

**What it costs.**

- **The rule differs per package**, and the reason is not visible at the import site. Someone moving code from `packages/system` to `packages/components` has to change the import, and nothing says so.
- **Nothing enforces it.** No lint rule checks the import source. `check-react-aria-dedupe.mjs` catches the duplicate _tree_, not a wrong import path.
- **The exception looks like a mistake.** The `packages/system` formatter tests will keep attracting well-meaning "fix" PRs. They carry a comment; this record is the longer answer.
- Our own dedupe **hides the failure** during development. A wrong import is invisible here and only surfaces in a consumer's build, which is the worst possible place to discover it.
