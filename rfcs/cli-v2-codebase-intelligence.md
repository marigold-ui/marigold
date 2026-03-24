# Marigold CLI v2: Codebase Intelligence

> **Status**: Proposal
> **Scope**: `marigold scan`, `marigold check`, `marigold migrate`
> **Depends on**: v1 (manifest, cache infrastructure, project detection)

---

## Table of Contents

- [Motivation](#motivation)
- [Why This Is the Differentiator](#why-this-is-the-differentiator)
- [How AI Agents Use v2 Commands](#how-ai-agents-use-v2-commands)
- [Commands](#commands)
  - [`marigold scan`](#marigold-scan)
  - [`marigold check`](#marigold-check)
  - [`marigold migrate`](#marigold-migrate)
- [Architecture](#architecture)
- [AST Analysis Engine](#ast-analysis-engine)
- [Codemod System](#codemod-system)
- [MCP Integration](#mcp-integration)
- [Open Questions](#open-questions)

---

## Motivation

v1 gives developers and AI agents access to Marigold documentation. v2 gives them **awareness of how Marigold is actually used in the consumer's codebase**.

This is the gap that no docs site, no MCP server, and no amount of training data can fill. Only a tool running locally — with access to the file system, `node_modules`, and the project's AST — can answer questions like:

- "Which Marigold components are used in this project, and where?"
- "Are there any deprecated props that need updating?"
- "What will break if we upgrade from 7.3 to 8.0?"
- "Can you automatically fix these breaking changes?"

These are the questions that make design system upgrades painful. v2 automates the answers.

---

## Why This Is the Differentiator

### What other design system CLIs offer

| Tool              | Capabilities                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **shadcn CLI**    | Install components, init projects, build registries. Cannot scan usage — shadcn copies code into your project, so there's no installed dependency to track. |
| **MUI codemods**  | AST transforms for major version migrations. Single-purpose, no scanning or diagnostics.                                                                    |
| **Storybook CLI** | `automigrate` and `doctor` for Storybook config. Not for component usage analysis.                                                                          |
| **Chakra CLI**    | Type generation and snippet management. No codebase scanning.                                                                                               |

### What Marigold CLI v2 offers that they cannot

Marigold is an **installed dependency** (not copied source like shadcn). This means:

1. **We know exactly what version the consumer has** — read from `package.json` / lockfile
2. **We know exactly which components they import** — static analysis of import statements
3. **We know exactly which props they use** — AST analysis of JSX attributes
4. **We know exactly what will break on upgrade** — cross-reference usage against changelog

This dependency relationship is the foundation for `scan`, `check`, and `migrate`. It's a structural advantage that shadcn-style "copy code" design systems fundamentally cannot replicate.

### Industry validation

Several specialized tools have proven the demand for this capability:

- **react-scanner**: Open source, 1.5K+ GitHub stars. Scans React codebases for component usage patterns. Output: JSON reports of import counts and prop usage. Proves that developers need codebase-level component intelligence.
- **Omlet**: VC-funded SaaS product ($3M+ raised). Its entire product is "scan your codebase, show you how your design system is used." Proves there's commercial value in this capability.
- **Stylebit**: Analyzes design system adoption rate. Reports percentage of UI built with design system vs. custom components.

All of these are separate tools with separate install/config steps. Marigold v2 builds this capability directly into the design system's own CLI, with zero additional setup.

---

## How AI Agents Use v2 Commands

v2 transforms the AI agent from a **code writer that looks up docs** into a **codebase-aware assistant that understands the project's relationship with Marigold**.

### The upgrade workflow (most impactful)

Today, upgrading a design system is one of the most dreaded tasks in frontend development. It typically involves:

1. Reading the changelog (10-30 minutes)
2. Mentally mapping breaking changes to your codebase (???)
3. Searching for affected files manually (30-60 minutes)
4. Making changes one by one (hours)
5. Testing everything (hours)
6. Discovering you missed something in production (priceless)

With v2 + an AI agent:

```
User: "Upgrade Marigold to the latest version"

Agent runs: marigold check --target latest
→ Output:
  Upgrade Check: 7.3.0 → 8.0.0
  ================================

  Breaking changes affecting your project:

  1. Button: `variant="outline"` renamed to `variant="ghost"`
     Files affected (3):
       src/components/Header.tsx:42
       src/components/Sidebar.tsx:18
       src/components/Modal.tsx:67

  2. TextField: `onChange` callback signature changed
     Old: (value: string) => void
     New: (e: ChangeEvent) => void
     Files affected (7):
       src/forms/LoginForm.tsx:23
       src/forms/SearchBar.tsx:15
       [...]

  3. Dialog: `isOpen` prop removed, use `open` instead
     Files affected (2):
       src/components/ConfirmDialog.tsx:11
       src/components/EditModal.tsx:8

  Summary: 3 breaking changes, 12 files affected

Agent: "There are 3 breaking changes affecting 12 files.
I can fix all of them automatically. Shall I proceed?"

User: "Yes"

Agent runs: marigold migrate --from 7.3.0 --to 8.0.0
→ Applies codemods to all 12 files

Agent runs: marigold check --target 8.0.0
→ "No breaking changes detected. Safe to upgrade."

Agent runs: pnpm add @marigold/components@8.0.0 @marigold/system@8.0.0 @marigold/theme-rui@8.0.0

Agent: "Done. Upgraded to 8.0.0 and fixed all breaking changes.
Here's what changed: [shows diff summary]"
```

**Total time: 2 minutes instead of 2 hours.**

### The adoption analysis workflow

Design system teams need to know: "Is our design system actually being adopted?" Today, this requires manual auditing or expensive SaaS tools. With v2:

```
User: "How well are we using Marigold in our project?"

Agent runs: marigold scan
→ Output:
  Marigold Usage Report
  =====================

  Components used:     34 / 78 (44%)
  Import locations:    127 files
  Total usages:        483 instances

  Most used:
    Button          87 usages   (34 files)
    TextField       62 usages   (28 files)
    Stack           54 usages   (41 files)
    Text            48 usages   (36 files)
    Card            31 usages   (12 files)

  Unused but available:
    Accordion, ActionBar, Aside, Breadcrumbs, Calendar,
    ContextualHelp, DateField, Drawer, EmptyState, FileField,
    Grid, Pagination, SearchField, Sidebar, Slider, TagField,
    TimeField, TopNavigation, ...

  Potential replacements (custom → Marigold):
    src/components/CustomModal.tsx
      → Consider using Marigold Dialog
      Uses: overlay, backdrop, close button pattern

    src/components/Dropdown.tsx
      → Consider using Marigold Select or ComboBox
      Uses: options list, keyboard navigation

  Deprecated API usage:
    src/forms/UserForm.tsx:15  TextField isRequired → required
    src/forms/UserForm.tsx:28  TextField isDisabled → disabled

Agent: "You're using 34 of 78 Marigold components. I found 2 files
using deprecated prop names and 2 custom components that could be
replaced with Marigold equivalents. Want me to fix the deprecated
props and show you how to replace the custom components?"
```

### The PR review workflow

When an AI agent reviews a PR, it can use `scan` to check whether new code follows design system guidelines:

```
Agent runs: marigold scan --files $(git diff --name-only HEAD~1)
→ Output:
  New component usage in this PR:
    src/features/Dashboard.tsx
      + Select (new import)
      + Card (new import)
      + custom <DropdownMenu> ← not a Marigold component

  Suggestion: DropdownMenu could use Marigold Menu component.
    Run `marigold docs Menu` for API reference.
```

---

## Commands

### `marigold scan`

Analyzes the consumer's codebase to understand how Marigold is used.

**Usage:**

```bash
# Full project scan
marigold scan

# Scan specific files or directories
marigold scan --files src/components/
marigold scan --files src/forms/LoginForm.tsx

# Only report deprecated usage
marigold scan --deprecated

# Only report custom components that could be replaced
marigold scan --replacements

# Only report prop usage patterns
marigold scan --props

# Output format
marigold scan --format json    # structured report
marigold scan --format table   # terminal table (default)
marigold scan --format csv     # for spreadsheets/dashboards
```

**What it analyzes:**

| Analysis              | What it finds                                            | Why it matters                                                        |
| --------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| **Import census**     | Every `import { X } from '@marigold/components'`         | Answers "what do we use?"                                             |
| **Usage count**       | How many times each component appears in JSX             | Identifies most/least used components                                 |
| **Prop patterns**     | Which props are passed to each component                 | Reveals which variants/sizes are popular, identifies deprecated props |
| **Deprecated APIs**   | Props, components, or patterns that have been deprecated | Proactive maintenance before forced migration                         |
| **Custom candidates** | Custom components that duplicate Marigold functionality  | Adoption opportunity — reduce custom code                             |
| **File map**          | Which files use which components                         | Impact analysis for upgrades                                          |

**How "custom candidates" detection works:**

The scanner uses heuristics to identify React components that might be replaceable with Marigold:

1. **Import-based**: A component that imports `react-aria` or `react-aria-components` directly (Marigold wraps these — if you're using them raw, you might want the Marigold wrapper instead)
2. **Pattern-based**: A component that renders common UI patterns (modal with backdrop, dropdown with options list, form with validation) that match Marigold component descriptions
3. **Name-based**: Components named `CustomButton`, `AppDialog`, `MySelect`, etc. that match Marigold component names

This is intentionally conservative — it suggests, never asserts. False positives are shown with low confidence scores and clear explanations.

**JSON output schema** (for programmatic consumption):

```json
{
  "version": "7.5.0",
  "scannedAt": "2026-03-24T12:00:00Z",
  "summary": {
    "componentsUsed": 34,
    "componentsAvailable": 78,
    "adoptionRate": 0.44,
    "totalUsages": 483,
    "totalFiles": 127,
    "deprecatedUsages": 2,
    "customCandidates": 2
  },
  "components": [
    {
      "name": "Button",
      "usages": 87,
      "files": [
        {
          "path": "src/components/Header.tsx",
          "line": 42,
          "props": {
            "variant": "primary",
            "onPress": "<handler>",
            "size": "small"
          }
        }
      ]
    }
  ],
  "deprecated": [
    {
      "file": "src/forms/UserForm.tsx",
      "line": 15,
      "component": "TextField",
      "prop": "isRequired",
      "replacement": "required",
      "autoFixable": true
    }
  ],
  "customCandidates": [
    {
      "file": "src/components/CustomModal.tsx",
      "confidence": 0.82,
      "suggestedComponent": "Dialog",
      "reason": "Uses overlay pattern with backdrop and close button",
      "signals": [
        "imports react-aria OverlayTriggerState",
        "renders backdrop div",
        "has close button"
      ]
    }
  ]
}
```

### `marigold check`

Pre-upgrade compatibility analysis. Tells you exactly what will break before you upgrade.

**Usage:**

```bash
# Check against latest version
marigold check --target latest

# Check against specific version
marigold check --target 8.0.0

# Check against a version range
marigold check --target "^8.0.0"

# Only show breaking changes (skip warnings/deprecations)
marigold check --breaking-only

# Output format
marigold check --format json
marigold check --format table
```

**How it works:**

```
1. Read current version from consumer's package.json
       ↓
2. Fetch breaking changes for target version
   (from changelog/migration guide on docs site)
       ↓
3. Run `marigold scan` to get current component/prop usage
       ↓
4. Cross-reference: "which breaking changes affect MY code?"
       ↓
5. Report affected files, line numbers, and fix instructions
```

**What makes this powerful:**

Most changelogs list every breaking change for every user. If a release has 20 breaking changes but you only use 5 affected components, you only need to know about those 5. `marigold check` gives you a **personalized migration guide** based on your actual usage.

**Breaking changes data source:**

The CLI needs a machine-readable list of breaking changes per version. Two approaches:

1. **Structured changelog endpoint**: A new `/mcp/changelog.json` route on the docs site that exposes breaking changes with component names, prop names, and migration instructions
2. **Changeset metadata**: Extract from the existing changesets (`@changesets/cli`) that Marigold already uses for versioning

Recommendation: option 1, because it allows richer metadata (affected props, codemod availability, migration code examples).

**Example output:**

```
$ marigold check --target 8.0.0

Upgrade Check: @marigold/components 7.3.0 → 8.0.0
===================================================

Breaking Changes (3 affect your project, 7 do not)

  HIGH  Button: `variant="outline"` → `variant="ghost"`
  ├── Auto-fixable: Yes (marigold migrate will handle this)
  ├── Files affected:
  │     src/components/Header.tsx:42
  │     src/components/Sidebar.tsx:18
  │     src/components/Modal.tsx:67
  └── Migration: Replace variant="outline" with variant="ghost"

  HIGH  TextField: onChange signature changed
  ├── Auto-fixable: Partial (value extraction added automatically,
  │   but custom logic may need manual review)
  ├── Files affected:
  │     src/forms/LoginForm.tsx:23
  │     src/forms/SearchBar.tsx:15
  │     src/forms/ProfileForm.tsx:8
  │     src/forms/SettingsForm.tsx:31
  │     src/forms/ContactForm.tsx:12
  │     src/forms/SignupForm.tsx:44
  │     src/forms/FeedbackForm.tsx:19
  └── Migration: onChange now receives ChangeEvent instead of string.
      Wrap handlers: (value) => ... → (e) => { const value = e.target.value; ... }

  LOW   Dialog: `isOpen` → `open`
  ├── Auto-fixable: Yes
  ├── Files affected:
  │     src/components/ConfirmDialog.tsx:11
  │     src/components/EditModal.tsx:8
  └── Migration: Rename prop isOpen to open

Not affected (7 breaking changes in this release don't apply to your project):
  - Accordion: new required `id` prop (you don't use Accordion)
  - Calendar: removed `minValue`/`maxValue` (you don't use Calendar)
  - [...]

Summary
  Breaking changes:     3 affect your code (10 total in release)
  Files to update:      12
  Auto-fixable:         11 of 12 (92%)
  Manual review needed: 1 file (src/forms/LoginForm.tsx)

Run `marigold migrate --from 7.3.0 --to 8.0.0` to apply automatic fixes.
Run `marigold migrate --from 7.3.0 --to 8.0.0 --dry-run` to preview changes first.
```

### `marigold migrate`

Automatically transforms code to handle breaking changes between versions.

**Usage:**

```bash
# Preview changes without applying them
marigold migrate --from 7.3.0 --to 8.0.0 --dry-run

# Apply all automatic fixes
marigold migrate --from 7.3.0 --to 8.0.0

# Apply only specific codemods
marigold migrate --from 7.3.0 --to 8.0.0 --only button-variant-rename

# Apply to specific files/directories
marigold migrate --from 7.3.0 --to 8.0.0 --files src/components/

# Show diff instead of applying
marigold migrate --from 7.3.0 --to 8.0.0 --diff
```

**How codemods work:**

Each breaking change can have an associated **codemod** — an AST transformation that automatically rewrites code. Codemods are:

- **Deterministic**: Given the same input, always produce the same output
- **Safe**: They only modify what they understand; ambiguous cases are flagged for manual review
- **Reversible**: `--dry-run` and `--diff` let you inspect before applying
- **Composable**: Multiple codemods chain together for multi-version upgrades

**Example codemod: prop rename**

```
Before:  <Button variant="outline">Click me</Button>
After:   <Button variant="ghost">Click me</Button>

Before:  <Dialog isOpen={showDialog} onClose={handleClose}>
After:   <Dialog open={showDialog} onClose={handleClose}>

Before:  <TextField isRequired isDisabled={!canEdit}>
After:   <TextField required disabled={!canEdit}>
```

**Example codemod: callback signature change**

```
Before:  <TextField onChange={(value) => setName(value)} />
After:   <TextField onChange={(e) => setName(e.target.value)} />

Before:  <TextField onChange={setName} />    ← ambiguous!
After:   ⚠️ Manual review needed — cannot determine if setName
         expects a string or ChangeEvent
```

**Dry run output:**

```
$ marigold migrate --from 7.3.0 --to 8.0.0 --dry-run

Migration Preview: 7.3.0 → 8.0.0
==================================

Codemods to apply:
  1. button-variant-rename (3 files)
  2. dialog-isopen-rename (2 files)
  3. textfield-onchange-signature (7 files, 1 needs manual review)

Changes:

  src/components/Header.tsx
  ─────────────────────────
  - <Button variant="outline" onPress={toggle}>
  + <Button variant="ghost" onPress={toggle}>

  src/components/ConfirmDialog.tsx
  ────────────────────────────────
  - <Dialog isOpen={isConfirming} onClose={cancel}>
  + <Dialog open={isConfirming} onClose={cancel}>

  src/forms/LoginForm.tsx
  ───────────────────────
  - <TextField onChange={(value) => setEmail(value)} />
  + <TextField onChange={(e) => setEmail(e.target.value)} />

  ⚠️  src/forms/SearchBar.tsx:15
      Cannot auto-fix: onChange handler is a variable reference.
      Manual review needed.

  [... more files ...]

Summary: 11 auto-fixes, 1 manual review needed.
Run without --dry-run to apply changes.
```

---

## Architecture

### AST Analysis Engine

The core of v2 is a TypeScript AST analyzer that understands React/JSX patterns. It needs to:

1. **Find Marigold imports**: Parse `import { Button, TextField } from '@marigold/components'` statements
2. **Track component usage**: Follow imported identifiers through the file and count JSX usages
3. **Extract props**: Read JSX attributes and their values (including spread props, computed values, and ternaries)
4. **Handle re-exports**: If a project wraps Marigold components (`export { Button } from '@marigold/components'`), follow the chain

**Implementation options:**

| Tool                        | Speed   | Accuracy                        | Dependencies                    |
| --------------------------- | ------- | ------------------------------- | ------------------------------- |
| **TypeScript Compiler API** | Medium  | Highest (full type resolution)  | `typescript` (already a devDep) |
| **ts-morph**                | Medium  | Highest (wrapper around TS API) | `ts-morph` + `typescript`       |
| **@swc/core**               | Fastest | Good (no type resolution)       | `@swc/core` (native binary)     |
| **Babel parser**            | Medium  | Good (no type resolution)       | `@babel/parser`                 |

**Recommendation**: Use `@swc/core` for speed. Type resolution is not needed for import/usage analysis — pattern matching on import specifiers and JSX element names is sufficient. SWC parses a large codebase in milliseconds, which matters for `marigold scan` usability.

Fall back to `ts-morph` only for advanced analysis (like the "custom candidates" detection in `scan`) that genuinely needs type information.

### Analysis pipeline

```
marigold scan
    │
    ├── 1. Glob for source files
    │       **/*.{tsx,jsx,ts,js} excluding node_modules, dist, .next
    │
    ├── 2. Parallel parse with SWC
    │       Each file → AST
    │
    ├── 3. Extract Marigold imports
    │       import { Button } from '@marigold/components'
    │       import { useTheme } from '@marigold/system'
    │       import { Add } from '@marigold/icons'
    │
    ├── 4. Walk JSX elements
    │       Match element names to imported identifiers
    │       Extract props: name, value, spread, computed
    │
    ├── 5. Aggregate results
    │       Per-component: usage count, files, prop frequency
    │       Per-file: components used, lines, props
    │
    ├── 6. (Optional) Deprecated API detection
    │       Cross-reference props against known deprecations
    │
    ├── 7. (Optional) Custom candidate detection
    │       Heuristic analysis for replacement opportunities
    │
    └── 8. Format and output
```

### Performance targets

| Metric            | Target       | Why                               |
| ----------------- | ------------ | --------------------------------- |
| Scan 100 files    | < 2 seconds  | Feels instant in a terminal       |
| Scan 1,000 files  | < 10 seconds | Acceptable for large projects     |
| Scan 10,000 files | < 30 seconds | Enterprise-scale monorepos        |
| Memory usage      | < 500MB      | Doesn't crowd out other processes |

These targets are achievable with SWC. For reference, react-scanner processes ~5,000 files in ~3 seconds.

---

## Codemod System

### How codemods are defined

Each codemod is a self-contained module that describes a breaking change and its automatic fix:

```typescript
interface Codemod {
  /** Unique identifier, e.g. "8.0.0/button-variant-rename" */
  id: string;

  /** Human-readable description */
  description: string;

  /** Version range this codemod applies to */
  fromVersion: string;
  toVersion: string;

  /** Which component/prop this affects */
  component: string;
  prop?: string;

  /** The AST transformation */
  transform: (file: SourceFile) => TransformResult;
}

interface TransformResult {
  /** The transformed source code (null if no changes) */
  output: string | null;

  /** Changes that were applied */
  changes: Change[];

  /** Issues that need manual review */
  warnings: Warning[];
}
```

### Codemod registry

Codemods are bundled with the CLI package and versioned alongside it. When a new Marigold version ships with breaking changes, the corresponding codemods are added to the CLI.

```
packages/cli/
  src/
    codemods/
      8.0.0/
        button-variant-rename.ts
        dialog-isopen-rename.ts
        textfield-onchange-signature.ts
        index.ts  ← exports all codemods for this version
      7.5.0/
        checkbox-value-prop.ts
        index.ts
      registry.ts ← maps version ranges to codemod sets
```

### How `marigold migrate` chains codemods for multi-version upgrades

If a project is on 7.0.0 and wants to upgrade to 8.0.0, the CLI chains all intermediate codemods:

```
7.0.0 → 7.3.0: [codemod-a, codemod-b]
7.3.0 → 7.5.0: [codemod-c]
7.5.0 → 8.0.0: [codemod-d, codemod-e, codemod-f]

Applied in order: a → b → c → d → e → f
```

Each codemod receives the output of the previous one, so transformations compose correctly.

### Safety mechanisms

| Mechanism           | Purpose                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `--dry-run`         | Show what would change without modifying files                                                      |
| `--diff`            | Show unified diff output for review                                                                 |
| Ambiguity detection | Flag cases where the codemod can't determine intent (e.g., spread props, dynamic values)            |
| Backup              | Write `.marigold-backup` files before modifying (deletable with `marigold migrate --clean-backups`) |
| Idempotency         | Running the same migration twice produces the same result (no double-transforms)                    |
| Git awareness       | Warn if there are uncommitted changes; suggest committing first                                     |

---

## How AI Agents Use v2 Specifically

### Agent discovers `scan` during problem-solving

```
User: "We have a lot of custom components in our project.
I wonder how many of them we could replace with Marigold."

Agent runs: marigold scan --replacements --format json
→ Gets structured list of custom components with confidence
  scores and suggested Marigold replacements

Agent: "I found 4 custom components that could be replaced:
1. CustomModal → Dialog (82% confidence)
2. Dropdown → Select (91% confidence)
3. AppToast → Toast (95% confidence)
4. CustomTabs → Tabs (88% confidence)

Want me to start replacing them? I'll begin with AppToast
since it has the highest confidence and is used in 3 files."
```

### Agent uses `check` proactively before upgrades

The CLAUDE.md instruction can include:

```markdown
Before upgrading any @marigold/\* package, always run:
marigold check --target <version> --format json
Review the output before proceeding with the upgrade.
```

This makes the AI agent automatically check for breaking changes instead of blindly running `pnpm add @marigold/components@latest`.

### Agent uses `scan` for code review

```
User: "Review this PR for design system compliance"

Agent runs: marigold scan --files $(git diff --name-only main)
→ Gets usage report for only the changed files

Agent can now identify:
- New custom components that should use Marigold instead
- Deprecated props introduced in new code
- Inconsistent variant/size usage compared to the rest of the project
```

### Agent chains commands for complex workflows

```
User: "Upgrade Marigold and clean up our codebase"

Agent:
1. marigold scan → understand current state
2. marigold scan --deprecated → find deprecated usage
3. marigold check --target latest → preview breaking changes
4. marigold migrate --to latest --dry-run → preview fixes
5. marigold migrate --to latest → apply fixes
6. pnpm add @marigold/components@latest ... → upgrade packages
7. marigold doctor → verify health
8. marigold scan → verify clean state
```

---

## MCP Integration

v2 commands are exposed as MCP Tools that delegate to the CLI library. See [mcp-server-beyond-search.md](./mcp-server-beyond-search.md) for the full MCP architecture.

### How v2 tools appear in the MCP server

| CLI Command                 | MCP Tool        | Notes                                                       |
| --------------------------- | --------------- | ----------------------------------------------------------- |
| `marigold scan`             | `scan_project`  | Runs local AST analysis on the project                      |
| `marigold check --target X` | `check_upgrade` | Cross-references usage against changelog                    |
| `marigold migrate`          | (not exposed)   | Too destructive for autonomous AI — user should run via CLI |

### Why `migrate` is NOT an MCP tool

Migration rewrites files across the entire project. This is a destructive operation that should require explicit user consent at the terminal level, not implicit AI agent invocation. The MCP server exposes `check_upgrade` (read-only analysis) but delegates migration to the CLI.

The MCP `/migrate` **prompt** (workflow template) instructs the AI to guide the user through the process step by step, using the CLI for the actual file changes.

### MCP prompt: `/migrate`

The MCP server packages the upgrade workflow as a Prompt:

```
User types: /migrate 8.0.0

Prompt instructs the AI to:
1. Call check_upgrade({ target: "8.0.0" }) — MCP tool
2. Present findings and get user confirmation
3. Tell the user to run: marigold migrate --dry-run — CLI command
4. Review the dry-run output with the user
5. Tell the user to run: marigold migrate — CLI command
6. Call scan_project() to verify clean state — MCP tool
```

This hybrid approach uses MCP for read-only analysis and the CLI for write operations. The user stays in control of destructive changes.

---

## Open Questions

1. **Where do breaking changes live?**
   - Option A: `/mcp/changelog.json` on the docs site (structured, queryable)
   - Option B: Parsed from existing changeset files in the repo
   - Option C: A `BREAKING_CHANGES.md` file in each version's changeset
   - Recommendation: Option A, with the data sourced from changesets at build time

2. **Should codemods ship with the CLI or be downloaded on-demand?**
   - Bundled: works offline, versioned with CLI, simpler
   - Downloaded: CLI stays small, codemods can be updated without CLI release
   - Recommendation: Bundled for reliability; the codemods are small (a few KB each)

3. **How to handle monorepo consumers?**
   - A monorepo might have multiple apps using different Marigold versions
   - `marigold scan` should respect workspace boundaries
   - `--workspace` flag to scope analysis to a specific workspace

4. **Should `scan --replacements` use an LLM for better accuracy?**
   - Heuristic-based detection is fast but has false positives
   - An LLM could analyze the custom component's code and compare it semantically to Marigold components
   - Could use the MCP server's semantic search for this
   - Recommendation: Start with heuristics, add LLM-powered analysis as an opt-in flag (`--ai`) in a later version

5. **How granular should prop usage tracking be?**
   - Just prop names? (simple, fast)
   - Prop names + values? (e.g., `variant="primary"` used 45 times, `variant="ghost"` used 12 times)
   - Prop names + values + computed detection? (e.g., `variant={isPrimary ? "primary" : "ghost"}`)
   - Recommendation: Names + literal values for v2; computed detection is complex and rarely needed
