---
name: create-marigold-app
description: Scaffold a new app with the Marigold Design System and help prototype UI. Use when creating a new Marigold project, starting a prototype, or scaffolding a Vite + React app with Marigold components.
argument-hint: '[project-name]'
---

# Create Marigold App

Scaffold a new [Marigold Design System](https://github.com/marigold-ui/marigold) app and prototype with accessible React components.

## Scaffolding Workflow

When the user invokes `/create-marigold-app <project-name>`:

### Step 1: Get project name

Use `$ARGUMENTS` as the project name. If empty, ask the user for a name.

Validate: only letters, numbers, hyphens, dots, underscores. Scoped names like `@scope/name` are allowed.

### Step 2: Clone the starter template

```bash
npx degit marigold-ui/starter <project-name>
```

If `degit` is not available, fall back to:

```bash
git clone --depth 1 https://github.com/marigold-ui/starter.git <project-name>
rm -rf <project-name>/.git
```

### Step 3: Clean up template files

Remove files that should not be in the scaffolded project:

```bash
cd <project-name>
rm -f copy-vendor.js renovate.json pnpm-lock.yaml pnpm-workspace.yaml
rm -rf .bolt
```

### Step 4: Update package.json

Read `package.json` and update it:

- Set `"name"` to the project name
- Remove `"repository"`, `"homepage"`, `"packageManager"` fields
- Remove `"copy-styles"` from `"scripts"` if present
- If `"scripts.dev"` contains `"copy-styles"`, replace it with `"vite"`

### Step 5: Install dependencies

Detect the user's preferred package manager (check if `pnpm` is available, fall back to `npm`):

```bash
cd <project-name> && pnpm install
```

### Step 6: Done

Tell the user:

```
cd <project-name>
pnpm dev
```

Open http://localhost:5173 to see the app. Start editing `src/App.tsx` to build your prototype.

The scaffolded project includes a `CLAUDE.md` with everything needed for prototyping: component import patterns, React Aria conventions, styling rules, and AI-optimized doc URLs at `https://www.marigold-ui.io/mcp/components/<category>/<name>.md`. Claude Code will automatically read this when working in the new project directory.
