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

## Commands

### `marigold docs <Component>`

Fetch and print a component's documentation.

```sh
marigold docs Button
marigold docs button --section props
marigold docs TextField --section props --format json
marigold docs select --format plain
```

Flags:

- `--section <name>` — `props`, `usage`, or `examples` (default: all)
- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

### `marigold list`

List all available components.

```sh
marigold list
marigold list --category form
marigold list --search date
marigold list --format json
```

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

### `marigold telemetry`

Opt in or out of anonymous usage telemetry.

```sh
marigold telemetry status
marigold telemetry disable
marigold telemetry enable
```

Also honored: `MARIGOLD_TELEMETRY_DISABLED=1`, `DO_NOT_TRACK=1`, `CI=1` (auto-suppressed in CI).

## For AI agents

When invoked by an AI coding agent, prefer `--format json` and `--section props` for structured, precise component data. See the `## Marigold CLI` section in [CLAUDE.md](https://github.com/marigold-ui/marigold/blob/main/CLAUDE.md) for recommended patterns.

## Environment

- `MARIGOLD_DOCS_URL` — override the docs site base URL (default: `https://www.marigold-ui.io`)
- `MARIGOLD_CACHE_TTL_MS` — override the default 24h cache TTL

Cache lives in `$XDG_CACHE_HOME/marigold` on Linux/macOS, `%LOCALAPPDATA%\marigold\Cache` on Windows.
