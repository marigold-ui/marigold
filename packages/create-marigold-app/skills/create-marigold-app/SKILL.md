---
name: create-marigold-app
description: Scaffold a new Marigold Design System app from the starter template and kick off prototyping. Clones marigold-ui/starter, cleans up repo files, configures package.json, and installs dependencies so the user can start building immediately. Use this skill whenever someone wants to create a new Marigold project, prototype a UI with Marigold components, scaffold a Vite + React app with accessible components, set up a fresh starter from marigold-ui/starter, or start building a new app with the Marigold design system -- even if they don't say "scaffold" or "create-marigold-app" explicitly. Do NOT use for adding components to existing projects, debugging Marigold builds, or contributing components to the marigold monorepo.
argument-hint: '[project-name]'
---

# Create Marigold App

Scaffold a new [Marigold Design System](https://github.com/marigold-ui/marigold) app and prototype with accessible React components.

This skill is used by designers and product people, not just developers. Execute all steps in sequence without pausing for confirmation between them -- the user invoked the skill expecting it to run the complete workflow. The only time to stop and ask is if the project name is missing (Step 1) or the target directory already exists (Step 1).

### Step 1: Get project name and validate

Use `$ARGUMENTS` as the project name. If empty, ask the user for a name.

Validate: only letters, numbers, hyphens, dots, underscores. Scoped names like `@scope/name` are allowed. For scoped names, use the part after `/` as the directory name.

Check if the target directory already exists. If it does, tell the user and ask whether to pick a different name or overwrite the existing directory. Do not proceed until the user confirms.

### Step 2: Clone the starter template

```bash
npx degit marigold-ui/starter <project-name>
```

If `degit` is not available, fall back to:

```bash
git clone --depth 1 https://github.com/marigold-ui/starter.git <project-name>
rm -rf <project-name>/.git
```

If both methods fail (e.g., no network connection, repository unavailable), tell the user the specific error and suggest:

- Checking their internet connection
- Cloning manually: `git clone https://github.com/marigold-ui/starter.git <project-name>`

Do not continue with the remaining steps if cloning fails.

### Step 3: Clean up template files

The cloned directory is a fresh copy of the starter template, so these removals only affect starter-specific files, not any user content.

Known files to remove (this list mirrors the starter repo as of March 2025 -- if a file doesn't exist, skip it):

```bash
cd <project-name>
rm -f copy-vendor.js renovate.json pnpm-lock.yaml pnpm-workspace.yaml
rm -rf .bolt .github
```

### Step 4: Update package.json

Read the current `package.json`, apply the changes below, and write it back using the Write tool:

- Set `"name"` to the project name
- Remove `"repository"`, `"homepage"`, `"packageManager"` fields
- Remove `"copy-styles"` from `"scripts"` if present
- If `"scripts.dev"` contains `"copy-styles"`, replace it with `"vite"`

### Step 5: Install dependencies

Detect the user's preferred package manager:

1. Check the parent directory for lockfiles: `yarn.lock` -> yarn, `package-lock.json` -> npm, `pnpm-lock.yaml` -> pnpm
2. If no lockfile found, check if `pnpm` is available, then fall back to `npm`

Install with the detected package manager:

```bash
cd <project-name> && <pm> install
```

### Step 6: Done

Change into the new project directory so subsequent commands run in the right context:

```bash
cd <project-name>
```

Tell the user:

```
<pm> dev
```

Open http://localhost:5173 to see the app. Start editing `src/App.tsx` to build your prototype.

The scaffolded project includes a `CLAUDE.md` with everything needed for prototyping: component import patterns, React Aria conventions, styling rules, and AI-optimized doc URLs at `https://www.marigold-ui.io/mcp/components/<category>/<name>.md`. Claude Code will automatically read this when working in the new project directory.

Then ask the user: **"What would you like to build?"** to kick off prototyping immediately.
