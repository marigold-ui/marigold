# @marigold/cli

Marigold Design System CLI — component docs, discovery, and project setup, straight from the terminal.

## Install

```sh
# Global
npm install -g @marigold/cli

# Local (dev dep)
pnpm add -D @marigold/cli

# One-off (no install)
npx @marigold/cli docs Button
```

Requires Node 22 or newer.

## Local development

To run the CLI from a clone of this repo against a preview (or local) docs
deployment:

```sh
# 1. Build the CLI
pnpm --filter @marigold/cli build

# 2. Link it globally so `marigold ...` resolves to the local build.
#
#    pnpm ≥ 10 (this repo pins pnpm 11): `pnpm link --global` no longer
#    exists; symlink the built entry point into your global bin instead:
ln -sf "$(pwd)/packages/cli/dist/bin/marigold.mjs" "$(pnpm bin -g)/marigold"

#    pnpm ≤ 9: the classic global link still works (note: inside this repo,
#    corepack picks the pinned pnpm 11 from `packageManager`, so this only
#    applies when your pnpm really is ≤ 9):
cd packages/cli && pnpm link --global

# 3. Point at a docs origin (preview or local). Create
#    packages/cli/.env.local with:
#      MARIGOLD_DOCS_URL="https://marigold-docs-git-<branch>-marigold.vercel.app"
#    or for a local docs dev server:
#      MARIGOLD_DOCS_URL="http://localhost:3000"

# Now invoke as usual:
marigold docs Button
marigold list --category form

# To remove the link:
rm "$(pnpm bin -g)/marigold"       # pnpm ≥ 10 (symlink)
pnpm uninstall -g @marigold/cli    # pnpm ≤ 9 (global link)
```

Without the global link, you can also run the built entry point directly:

```sh
node packages/cli/dist/bin/marigold.mjs docs Button
```

## Commands

### `marigold docs <name|slug>`

Fetch and print the documentation for a component or a docs page.

```sh
marigold docs Button
marigold docs button --section props
marigold docs TextField --section props --format json
marigold docs select --format plain
marigold docs foundations/spacing
marigold docs getting-started/installation
```

Flags:

- `--section <name>` — `props`, `usage`, `examples`, or `all` (default: `all`)
- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

Pass a component name (case-insensitive, so `Button`, `button`, `BUTTON` all resolve to the same component) or the slug of a non-component docs page (e.g. `foundations/spacing`, `getting-started/installation`). The `props` section is component-only; requesting it for a page emits a note instead.

The default `markdown` output is a best-effort terminal render (headings, code
fences, inline code, bold). For non-trivial docs prefer `--format json` (the
recommended path for AI agents, returns a structured payload) or `--format
plain` (ANSI-stripped, ideal for piping into other tools).

### `marigold search <query>`

Find components by **what their docs say** — title, description, section
headings, and section prose — not just by name. Returns ranked results, each
with the most relevant snippet and a deep link. This is the discovery entry
point: it collapses the `list` → guess → `docs` → retry loop into a single call,
which is especially valuable for AI agents that don't yet know the component
name.

```sh
marigold search "field validation"
marigold search "date picker" --limit 10
marigold search "field validation" --format json
marigold search modal --format plain
```

Flags:

- `--limit <n>` — max results (default: `5`)
- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

Ranking weights title ×3, description ×2, each matching heading ×2, and each
matching section snippet ×1, with a coverage scale for partial multi-term
matches and a bonus for exact phrase hits. `--format json` returns the
`[{ name, slug, score, hits }]` contract (`hits` is the top matching section).
A query with no matches exits `0` (printing a friendly message, or `[]` for
`--format json`).

The index is sourced from component docs only (not foundations, patterns, or
getting-started pages). It ships with the docs build, so a CLI pointed at a docs
deployment that predates this command reports that the search index is not
available rather than failing cryptically.

### `marigold list`

List all available components and docs pages.

```sh
marigold list
marigold list --category form
marigold list --category foundations
marigold list --search date
marigold list --format json
marigold list --fresh
```

Flags:

- `--category <name>` — filter by category, including component categories (e.g. `actions`, `form`, `layout`) and page categories (e.g. `foundations`, `patterns`, `getting-started`)
- `--search <term>` — substring filter on component and page names
- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

### `marigold examples`

Browse application-level reference patterns — multi-file compositions that show
how Marigold components combine into real features (filterable tables, multi-section
forms, component inventories).

```sh
marigold examples list                  # all available patterns
marigold examples get filter            # one pattern's source + metadata
marigold examples get filter --format json
```

Subcommands:

- `list` — print every available example (slug, title, brief, mapped patterns)
- `get <slug>` — fetch a single example: its source files, the canonical pattern
  docs it maps to, the mock-data shapes it depends on, which files are
  load-bearing vs. framework scaffolding, and its peer dependencies

Flags (for `get`/`list`):

- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

Examples are authored **Next.js App Router-first**. Before adapting one to a
different framework (e.g. Vite), read the framework-transformation note:

```sh
marigold docs getting-started/examples-for-agents
```

It covers stripping `'use client'`, swapping router/URL-state libraries, the
default-vs-named export split, `@/` alias adjustment, and replacing the
docs-internal mock data. The unit is the **pattern**, not the file: the CLI
ships the primitives and the agent adapts the code to the consumer's app.

### `marigold init`

Interactive wizard to set up Marigold in an existing project.

```sh
marigold init
marigold init --yes             # skip prompts; accept Tailwind + package install
marigold init --skip-install    # apply config edits without running the install
```

Detects Next.js or Vite, then:

1. Installs `@marigold/components`, `@marigold/system`, `@marigold/theme-rui` — and Tailwind v4 + the framework adapter (`@tailwindcss/postcss` for Next.js, `@tailwindcss/vite` for Vite) if Tailwind isn't already present. The Tailwind install is gated behind a confirmation prompt unless `--yes` is passed.
2. Patches your global CSS (`app/globals.css`, `src/app/globals.css`, `src/index.css`, or `styles/globals.css`) with the required `@import` and `@source` lines — preserving existing rules.
3. Patches `vite.config.ts` (Vite) or writes `postcss.config.mjs` (Next.js) if missing.
4. Wraps the root: creates `app/providers.tsx` and wraps `{children}` in `app/layout.tsx` (Next.js), or wraps `<App />` in `src/main.tsx` (Vite).

Edits are idempotent — re-running leaves files untouched. If a file shape can't be recognized, the CLI prints a manual fallback for that step instead of guessing.

### `marigold doctor`

Diagnose why Marigold isn't working in a project and print a checklist with actionable fixes. All checks read the filesystem only; the freshness check additionally makes a short, best-effort fetch of the docs manifest (skipped with `--offline`).

```sh
marigold doctor                 # run from your project root
marigold doctor --format json   # structured report for AI agents / CI
marigold doctor --offline       # skip the network; freshness uses the cache only
```

Flags:

- `--format <name>` — `text` (default) or `json`
- `--offline` — skip the network; the freshness check uses the cache only

Checks, run against the current working directory:

1. **Packages installed** — `@marigold/components`, `@marigold/system`, and a theme (`@marigold/theme-rui`) are declared.
2. **Package versions aligned** — installed `@marigold/components` and `@marigold/system` match (they are released together).
3. **Up to date** — installed versions are the latest published (best-effort; uses the cached manifest, skipped when offline).
4. **MarigoldProvider wraps the app** — the root layout wraps the app in `<MarigoldProvider>` (following the Next.js `Providers` convention).
5. **Theme passed to MarigoldProvider** — a `theme` prop is passed to the provider.
6. **Tailwind configured for Marigold** — the CSS entry imports `tailwindcss` and `@marigold/theme-rui/theme.css`, declares `@source` for `node_modules/@marigold`, and the framework build plugin is wired up.
7. **React version compatible** — installed React satisfies `@marigold/components`'s peer requirement.

Only deterministic, definitely-broken findings (a missing core package, or a components/system version mismatch) are **errors**; everything heuristic is a **warning**. The command exits `1` only when there is an error, so it is safe to gate CI on. `--format json` emits `{ errors, warnings, passed, text }` — agents derive health from `errors.length === 0`.

### `marigold completion <shell>`

Print a tab-completion script for `bash`, `zsh`, or `fish`. Source it once per
shell, or write it to your shell's completion directory for persistence.

```sh
# bash — current shell
source <(marigold completion bash)

# bash — persistent (with bash-completion installed)
marigold completion bash > ~/.local/share/bash-completion/completions/marigold

# zsh — persistent (ensure $fpath includes the dir, then run compinit)
marigold completion zsh > "${fpath[1]}/_marigold"

# fish
marigold completion fish > ~/.config/fish/completions/marigold.fish
```

Tab-completes subcommands, flag names, enum values (e.g. `--format markdown|json|plain`), categories (`marigold list --category <TAB>`), and component names (`marigold docs <TAB>`). Component and category suggestions are sourced from the local manifest cache — run `marigold list` once to warm it. PowerShell is not yet supported. For instant component completion, install the CLI globally rather than relying on `npx`/`pnpm dlx`.

### `marigold telemetry`

Opt in or out of anonymous usage telemetry.

```sh
marigold telemetry status
marigold telemetry disable
marigold telemetry enable
```

Telemetry is on by default and sent fire-and-forget via a detached background process — it never blocks the foreground command or surfaces network errors. Each event records: command name (`docs`/`list`/`search`/`examples`/`init`/`doctor`/`telemetry`), CLI version, Node version, platform, exit code, a coarse duration bucket (`0-100` / `100-500` / `500-2000` / `2000+` ms), cache hit/miss, a stable anonymous UUID, whether stdout is a TTY, whether the CLI was invoked by an AI agent (`CLAUDECODE`, `CURSOR_AGENT`, `VSCODE_AGENT`, `CODEX_SANDBOX`, or `AI_AGENT` env var set), and the flags passed (values redacted — only flag presence/enum value is kept; free-form `--search` terms are recorded as `used`, never the term itself).

Telemetry is automatically suppressed when:

- `MARIGOLD_TELEMETRY_DISABLED=1` is set
- `DO_NOT_TRACK=1` is set ([consoledonottrack.com](https://consoledonottrack.com) standard)
- CI is detected (via [`ci-info`](https://github.com/watson/ci-info) — covers GitHub Actions, GitLab CI, CircleCI, etc.)

### Global flags

- `-h`, `--help` — print usage
- `-v`, `--version` — print the installed CLI version

## For AI agents

When invoked by an AI coding agent, prefer `--format json` and `--section props` for structured, precise component data. When you don't yet know the component name, start with `marigold search <query> --format json` to find the right component in one call, then fetch `marigold docs <Component> --section props --format json`. See the `## Marigold CLI` section in [CLAUDE.md](https://github.com/marigold-ui/marigold/blob/main/CLAUDE.md) for recommended patterns.

To adopt a whole feature pattern (rather than a single component), use `marigold examples list` to discover patterns and `marigold examples get <slug> --format json` to retrieve a pattern's source plus the metadata needed to adapt it — then read `marigold docs getting-started/examples-for-agents` once for the framework-transformation rules.

The CLI detects common agent runtimes (Claude Code, Cursor, VS Code agent mode, Codex, generic `AI_AGENT=1`) via environment variables and tags telemetry accordingly, so we can prioritize the agent surface based on real usage.

## Environment

- `MARIGOLD_DOCS_URL` — override the docs site base URL (default: `https://www.marigold-ui.io`)
- `MARIGOLD_CACHE_TTL_MS` — override the default 24h cache TTL (in milliseconds)
- `MARIGOLD_CACHE_DIR` — override the cache directory location
- `MARIGOLD_CONFIG_DIR` — override the config directory (where telemetry preference + anonymous ID are stored)
- `MARIGOLD_TELEMETRY_DISABLED=1` — opt out of telemetry
- `DO_NOT_TRACK=1` — opt out of telemetry (standard)
- `CLAUDECODE`, `CURSOR_AGENT`, `VSCODE_AGENT`, `CODEX_SANDBOX`, `AI_AGENT` — when set, the run is tagged as agent-driven in telemetry

Default locations:

- Cache: `$XDG_CACHE_HOME/marigold` (Linux/macOS), `%LOCALAPPDATA%\marigold` (Windows)
- Config: `$XDG_CONFIG_HOME/marigold` (Linux/macOS), `%APPDATA%\marigold` (Windows)
