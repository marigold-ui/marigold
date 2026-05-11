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

- `--section <name>` — `props`, `usage`, `examples`, or `all` (default: `all`)
- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

Component name input is case-insensitive (`Button`, `button`, `BUTTON` all resolve to the same component).

### `marigold list`

List all available components.

```sh
marigold list
marigold list --category form
marigold list --search date
marigold list --format json
marigold list --fresh
```

Flags:

- `--category <name>` — filter by category (e.g. `actions`, `form`, `layout`)
- `--search <term>` — substring filter on component names
- `--format <name>` — `markdown` (default), `json`, or `plain`
- `--fresh` — bypass the local cache
- `--offline` — use only the local cache; fail if missing

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

Telemetry is on by default and sent fire-and-forget via a detached background process — it never blocks the foreground command or surfaces network errors. Each event records: command name (`docs`/`list`/`init`/`telemetry`), CLI version, Node version, platform, exit code, a coarse duration bucket (`0-100` / `100-500` / `500-2000` / `2000+` ms), cache hit/miss, a stable anonymous UUID, whether stdout is a TTY, whether the CLI was invoked by an AI agent (`CLAUDECODE`, `CURSOR_AGENT`, `VSCODE_AGENT`, `CODEX_SANDBOX`, or `AI_AGENT` env var set), and the flags passed (values redacted — only flag presence/enum value is kept; free-form `--search` terms are recorded as `used`, never the term itself).

Telemetry is automatically suppressed when:

- `MARIGOLD_TELEMETRY_DISABLED=1` is set
- `DO_NOT_TRACK=1` is set ([consoledonottrack.com](https://consoledonottrack.com) standard)
- CI is detected (via [`ci-info`](https://github.com/watson/ci-info) — covers GitHub Actions, GitLab CI, CircleCI, etc.)

### Global flags

- `-h`, `--help` — print usage
- `-v`, `--version` — print the installed CLI version

## For AI agents

When invoked by an AI coding agent, prefer `--format json` and `--section props` for structured, precise component data. See the `## Marigold CLI` section in [CLAUDE.md](https://github.com/marigold-ui/marigold/blob/main/CLAUDE.md) for recommended patterns.

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
