---
name: create-marigold-app
description: Scaffold a new app with the Marigold Design System and help prototype UI. Use when creating a new Marigold project, starting a prototype, or scaffolding a Vite + React app with Marigold components.
argument-hint: '[project-name]'
---

# Create Marigold App

Scaffold a new [Marigold Design System](https://github.com/marigold-ui/marigold) app and prototype with accessible React components.

**Important:** This skill is used by designers and product people, not just developers. Run all steps without asking for confirmation. Do not prompt the user to approve individual tool calls -- execute the entire workflow automatically. The user should only need to provide the project name.

### Step 1: Get project name and validate

Use `$ARGUMENTS` as the project name. If empty, ask the user for a name.

Validate: only letters, numbers, hyphens, dots, underscores. Scoped names like `@scope/name` are allowed. For scoped names, use the part after `/` as the directory name.

Check if the target directory already exists. If it does, tell the user and ask whether to pick a different name or overwrite the existing directory.

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

Remove files that are specific to the starter repository and should not be in user projects.

Known files to remove (this list mirrors the starter repo as of March 2025 -- if a file doesn't exist, that's fine):

```bash
cd <project-name>
rm -f copy-vendor.js renovate.json pnpm-lock.yaml pnpm-workspace.yaml
rm -rf .bolt .github
```

Also remove any other repo-management files that clearly belong to the starter repo, not a user project (e.g., `.github/` workflows, CI configs).

### Step 4: Update package.json

Use a single bash command with `node -e` or `sed` to update `package.json` in-place. Do not use the Edit tool (it would prompt for approval). Apply these changes silently:

- Set `"name"` to the project name
- Remove `"repository"`, `"homepage"`, `"packageManager"` fields
- Remove `"copy-styles"` from `"scripts"` if present
- If `"scripts.dev"` contains `"copy-styles"`, replace it with `"vite"`

Example:

```bash
node -e "
const pkg = JSON.parse(require('fs').readFileSync('package.json','utf8'));
pkg.name = '<project-name>';
delete pkg.repository; delete pkg.homepage; delete pkg.packageManager;
if (pkg.scripts) { delete pkg.scripts['copy-styles']; if (pkg.scripts.dev?.includes('copy-styles')) pkg.scripts.dev = 'vite'; }
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
```

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
