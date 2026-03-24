# Marigold CLI v3: Theme Intelligence & Accessibility

> **Status**: Proposal
> **Scope**: `marigold theme`, `marigold a11y`
> **Depends on**: v1 (manifest, cache), v2 (AST engine, project detection)

---

## Table of Contents

- [Motivation](#motivation)
- [Why These Are v3 (Not v1 or v2)](#why-these-are-v3-not-v1-or-v2)
- [How AI Agents Use v3 Commands](#how-ai-agents-use-v3-commands)
- [Commands](#commands)
  - [`marigold theme inspect`](#marigold-theme-inspect)
  - [`marigold theme diff`](#marigold-theme-diff)
  - [`marigold theme validate`](#marigold-theme-validate)
  - [`marigold theme export`](#marigold-theme-export)
  - [`marigold a11y`](#marigold-a11y)
- [Architecture](#architecture)
- [Theme Resolution Engine](#theme-resolution-engine)
- [Accessibility Analysis Engine](#accessibility-analysis-engine)
- [MCP Integration](#mcp-integration)
- [Open Questions](#open-questions)

---

## Motivation

v1 answers "what components exist?" v2 answers "how are they used in my project?" v3 answers the two hardest remaining questions:

1. **"Why does my component look like this?"** — Theme debugging is one of the most time-consuming aspects of working with a design system. A component's final appearance is determined by a cascade of design tokens, variant styles, size styles, and Tailwind utilities. When something looks wrong, tracing the cascade is painful.

2. **"Is my UI accessible?"** — Accessibility is a core requirement (Marigold is built on react-aria for this reason), but the component library can only guarantee accessibility for its own internals. How consumers compose and configure components determines whether the final UI is accessible. Static analysis can catch many common mistakes before they reach production.

---

## Why These Are v3 (Not v1 or v2)

### Theme inspection requires deep framework knowledge

The theme resolution engine needs to understand:

- Marigold's `useClassNames` hook and how it resolves `component` + `variant` + `size` to Tailwind classes
- The `cva` (class variance authority) pattern used in theme style files
- Tailwind CSS v4's `@theme` directive and CSS custom properties
- The cascade: theme CSS variables → cva variants → useClassNames → component render

This is significantly more complex than fetching markdown (v1) or scanning imports (v2).

### Accessibility analysis requires both AST and semantic understanding

Checking "does this TextField have a label?" is simple AST analysis (v2-level). But checking "is this form navigable by keyboard?" or "do these color tokens meet WCAG AA contrast?" requires:

- Theme token resolution (v3's theme engine)
- Component composition analysis (understanding parent-child relationships in JSX)
- Color math (converting Tailwind color values to contrast ratios)

### Dependencies

```
v1: manifest + cache + docs lookup
      ↓
v2: AST engine + codebase scanning
      ↓
v3: theme resolution + a11y analysis
    (uses AST engine from v2 + adds theme + color understanding)
```

---

## How AI Agents Use v3 Commands

### Theme debugging (the "why does it look wrong?" problem)

This is one of the most common developer frustrations with design systems. An AI agent with theme inspection can diagnose styling issues systematically instead of guessing.

```
User: "The Button in our sidebar looks different from the one
in the header. They're both variant='primary'. Why?"

Agent runs: marigold theme inspect Button --variant primary
→ Output:
  Button (variant: primary, size: default)
  =========================================

  Resolved classes:
    bg-primary-500 text-white font-semibold
    rounded-lg px-4 py-2
    hover:bg-primary-600
    focus-visible:outline-2 focus-visible:outline-primary-300

  Token cascade:
    bg-primary-500
      → --color-primary-500
      → oklch(0.55 0.2 260)
      → #2563eb (sRGB approximation)

Agent thinks: "Both buttons use the same variant, so the theme
produces identical classes. The difference must come from context."

Agent runs: marigold scan --files src/components/Sidebar.tsx --props
→ Finds: <Button variant="primary" className="w-full rounded-none">

Agent: "Found the issue! The Sidebar Button has a custom `className`
prop override: `className='w-full rounded-none'`. This overrides the
theme's `rounded-lg`. Marigold components don't support the `className`
prop by design — this is likely being passed through incorrectly.

The fix is to use a wrapper div for layout concerns:
  <div className='w-full'>
    <Button variant='primary' fullWidth>Sidebar Action</Button>
  </div>"
```

### Theme comparison across themes

```
User: "We're creating a white-label version. How different is
our custom theme from theme-rui?"

Agent runs: marigold theme diff theme-rui ./themes/custom-theme
→ Output:
  Theme Diff: theme-rui vs. custom-theme
  =======================================

  Tokens changed: 23 of 147
  Components affected: 8

  Color changes:
    --color-primary-500:  oklch(0.55 0.2 260) → oklch(0.60 0.15 145)
    --color-primary-600:  oklch(0.48 0.2 260) → oklch(0.52 0.15 145)
    --color-secondary-*:  unchanged

  Component style changes:
    Button:
      + variant "brand" added (custom variant)
      ~ variant "primary": border-radius changed (rounded-lg → rounded-full)
    Card:
      ~ shadow changed (shadow-sm → shadow-md)

  Missing in custom-theme (defaults to theme-rui):
    Toast, Drawer, ActionBar (no custom styles defined)

Agent: "Your custom theme modifies 23 tokens and 8 component
styles. The biggest change is the primary color shifting from
blue to green. 3 components (Toast, Drawer, ActionBar) fall back
to theme-rui defaults — you may want to customize those for
brand consistency."
```

### Accessibility auditing

```
User: "Run an accessibility check on our app before we launch"

Agent runs: marigold a11y
→ Output:
  Accessibility Report
  ====================

  Scanned: 127 files, 483 component instances

  ERRORS (must fix) — 4 issues
  ─────────────────────────────

  1. CONTRAST  src/components/Banner.tsx:12
     Text color on background fails WCAG AA (ratio: 3.2:1, required: 4.5:1)
     Theme tokens: text-gray-400 on bg-gray-100
     Fix: Use text-gray-600 or darker (ratio: 5.7:1)

  2. LABEL  src/forms/QuickSearch.tsx:8
     <TextField> without label or aria-label
     Fix: Add label="Search" or aria-label="Search"

  3. LABEL  src/forms/FilterPanel.tsx:22
     <Select> without label
     Fix: Add label="Filter by category"

  4. KEYBOARD  src/components/CardGrid.tsx:45
     Interactive <Card> with onClick but no keyboard handler
     Fix: Use <Button> or add onKeyDown with Enter/Space handling
     Note: If using Marigold's Card, wrap the interactive area
     in a <Link> or <Button> component instead of using onClick on Card

  WARNINGS (should fix) — 6 issues
  ─────────────────────────────────

  5. CONTRAST  src/components/Footer.tsx:8
     Low contrast ratio (4.6:1) — passes AA but fails AAA
     Tokens: text-gray-500 on bg-white

  6. ORDER  src/forms/RegistrationForm.tsx
     Heading levels skip from h2 to h4 (missing h3)

  [...]

  Summary
  ───────
  Errors:   4 (must fix for WCAG 2.1 AA)
  Warnings: 6 (recommended fixes)
  Passed:   473 instances with no issues (97.9%)

Agent: "Found 4 accessibility errors that must be fixed for WCAG 2.1
AA compliance. The most critical are 2 missing labels on form fields —
I can fix those right now. The contrast issue needs a theme token change.
Shall I start with the quick fixes?"
```

---

## Commands

### `marigold theme inspect`

Shows the resolved styles for a component in a specific state.

**Usage:**

```bash
# Show resolved styles for a component
marigold theme inspect Button
marigold theme inspect Button --variant primary
marigold theme inspect Button --variant primary --size small

# Show a specific token's cascade
marigold theme inspect --token color-primary-500
marigold theme inspect --token spacing-4

# Specify theme (defaults to detected project theme)
marigold theme inspect Button --theme theme-rui
marigold theme inspect Button --theme ./themes/custom-theme

# Output formats
marigold theme inspect Button --format json
marigold theme inspect Button --format css
```

**What it resolves:**

```
Input: component="Button", variant="primary", size="small"

1. Locate theme style file
   → themes/theme-rui/src/components/Button.styles.ts

2. Evaluate cva() for the given variant + size
   → ['bg-primary-500', 'text-white', 'font-semibold',
      'rounded-lg', 'px-3', 'py-1', 'text-sm']

3. Resolve Tailwind classes to CSS properties
   → background-color: var(--color-primary-500)
     color: white
     font-weight: 600
     border-radius: var(--radius-lg)
     padding: var(--spacing-1) var(--spacing-3)
     font-size: var(--text-sm)

4. Resolve CSS custom properties to final values
   → background-color: oklch(0.55 0.2 260)
     border-radius: 0.5rem
     padding: 0.25rem 0.75rem
     font-size: 0.875rem
```

**Why this matters:**

When a developer asks "why is my button blue?" the answer involves 4 layers of indirection: JSX prop → theme style file → cva variant → Tailwind class → CSS variable → resolved value. `theme inspect` collapses this entire cascade into a single readable output.

For AI agents, this is essential for debugging styling issues. Instead of the agent reading through theme files, cva definitions, and Tailwind config to piece together the cascade manually, it gets the complete resolution in one command.

**Example output:**

```
$ marigold theme inspect Button --variant primary --size small

Button (variant: primary, size: small)
======================================

Theme:  @marigold/theme-rui
Source: themes/theme-rui/src/components/Button.styles.ts

Tailwind Classes:
  bg-primary-500 text-white font-semibold rounded-lg
  px-3 py-1 text-sm
  hover:bg-primary-600
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-primary-300
  disabled:opacity-50 disabled:cursor-not-allowed

Resolved CSS:
  background-color:  oklch(0.55 0.2 260)  ← --color-primary-500
  color:             #ffffff
  font-weight:       600
  font-size:         0.875rem              ← --text-sm
  line-height:       1.25rem
  padding:           0.25rem 0.75rem       ← --spacing-1 / --spacing-3
  border-radius:     0.5rem                ← --radius-lg

States:
  :hover
    background-color:  oklch(0.48 0.2 260) ← --color-primary-600
  :focus-visible
    outline:           2px solid oklch(0.75 0.15 260) ← --color-primary-300
  :disabled
    opacity:           0.5
    cursor:            not-allowed

Available Variants:  primary, secondary, ghost, text
Available Sizes:     default, small
```

### `marigold theme diff`

Compares two themes side by side.

**Usage:**

```bash
# Compare two installed themes
marigold theme diff theme-rui theme-b2b

# Compare installed theme with a local custom theme
marigold theme diff theme-rui ./themes/custom

# Only show token differences (skip component styles)
marigold theme diff theme-rui theme-b2b --tokens-only

# Only show component style differences
marigold theme diff theme-rui theme-b2b --components-only

# Show differences for a specific component
marigold theme diff theme-rui theme-b2b --component Button

# Output format
marigold theme diff theme-rui theme-b2b --format json
```

**Why this exists:**

When maintaining multiple themes (e.g., a white-label product, a B2B vs. B2C version), developers need to understand how themes diverge. This is currently a manual process of reading two theme files side by side. `theme diff` automates the comparison.

For AI agents, `theme diff` answers questions like "what's different about our custom theme?" without the agent needing to read and mentally diff hundreds of lines of style files.

**Example output:**

```
$ marigold theme diff theme-rui ./themes/brand --component Button

Theme Diff: Button
==================
                        theme-rui                brand
                        ─────────                ─────

  variant: primary
    bg                  bg-primary-500           bg-brand-600
    text                text-white               text-white
    hover:bg            bg-primary-600           bg-brand-700
    border-radius       rounded-lg               rounded-full      ← different
    padding             px-4 py-2                px-6 py-2         ← different

  variant: secondary
    bg                  bg-secondary-100         bg-brand-50
    text                text-secondary-700       text-brand-800
    border              border-secondary-300     border-brand-200

  variant: ghost
    [identical]

  size: small
    [identical]

  size: default
    padding             px-4 py-2                px-6 py-2         ← different

Summary: 4 differences in Button styles
```

### `marigold theme validate`

Checks a custom theme for completeness and correctness.

**Usage:**

```bash
# Validate a custom theme
marigold theme validate ./themes/custom

# Validate against a specific Marigold version
marigold theme validate ./themes/custom --target 8.0.0

# Show missing tokens/components
marigold theme validate ./themes/custom --verbose
```

**What it checks:**

| Check                   | What it validates                                                   | Why it matters                                                             |
| ----------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Required tokens**     | All CSS custom properties needed by components are defined          | Missing tokens cause `undefined` styles at runtime                         |
| **Required components** | Every component in `@marigold/components` has a style definition    | Missing component styles cause unstyled rendering                          |
| **Required variants**   | Built-in variants referenced in component code exist in the theme   | Code that passes `variant="primary"` breaks if the theme doesn't define it |
| **Token format**        | Color values are valid CSS colors, spacing values are valid lengths | Catches typos and format errors                                            |
| **Token consistency**   | Color scales are monotonic (50 is lightest, 900 is darkest)         | Prevents inverted color scales                                             |

**Example output:**

```
$ marigold theme validate ./themes/custom

Theme Validation: ./themes/custom
==================================

Tokens
  Required:  147
  Defined:   142
  Missing:    5
    --color-warning-50
    --color-warning-100
    --color-warning-200
    --color-warning-300
    --color-warning-400

Components
  Required:  78
  Defined:   72
  Missing:    6
    ActionBar, Drawer, Pagination,
    Sidebar, TagField, TopNavigation

  Note: Missing components will fall back to
  unstyled defaults. This may be intentional
  for components you don't plan to use.

Variant Coverage
  Button:     all variants defined  OK
  TextField:  all variants defined  OK
  Select:     missing "compact" variant
    (used by: Table inline editing)

Format Issues
  --spacing-card: "16" ← missing unit (should be "16px" or "1rem")

Summary: 5 missing tokens, 6 missing components, 1 format issue
```

### `marigold theme export`

Exports resolved theme tokens in various formats.

**Usage:**

```bash
# Export as CSS custom properties
marigold theme export --format css > tokens.css

# Export as JSON
marigold theme export --format json > tokens.json

# Export as TypeScript constants
marigold theme export --format typescript > tokens.ts

# Export specific categories
marigold theme export --category colors --format css
marigold theme export --category spacing --format json

# Export from a specific theme
marigold theme export --theme theme-rui --format json
```

**Why this exists:**

Developers working outside the React component layer (e.g., in CSS files, Figma plugins, native mobile apps, email templates) need access to Marigold's design tokens in formats they can use. Currently, they must read the theme source and manually extract values.

**Example output:**

```css
/* marigold theme export --theme theme-rui --category colors --format css */

:root {
  --color-primary-50: oklch(0.97 0.02 260);
  --color-primary-100: oklch(0.93 0.05 260);
  --color-primary-200: oklch(0.87 0.08 260);
  --color-primary-300: oklch(0.75 0.15 260);
  --color-primary-400: oklch(0.65 0.18 260);
  --color-primary-500: oklch(0.55 0.2 260);
  --color-primary-600: oklch(0.48 0.2 260);
  --color-primary-700: oklch(0.4 0.18 260);
  --color-primary-800: oklch(0.33 0.15 260);
  --color-primary-900: oklch(0.25 0.12 260);
  /* ... */
}
```

### `marigold a11y`

Static accessibility analysis of Marigold component usage in the consumer's codebase.

**Usage:**

```bash
# Full project audit
marigold a11y

# Scan specific files
marigold a11y --files src/components/
marigold a11y --files src/forms/LoginForm.tsx

# Only check specific categories
marigold a11y --check contrast     # Color contrast (WCAG 2.1 AA)
marigold a11y --check labels       # Form labels and ARIA
marigold a11y --check keyboard     # Keyboard navigation
marigold a11y --check headings     # Heading hierarchy

# Conformance level
marigold a11y --level AA           # WCAG 2.1 AA (default)
marigold a11y --level AAA          # WCAG 2.1 AAA (stricter)

# Output formats
marigold a11y --format json        # for CI integration
marigold a11y --format sarif       # for GitHub Code Scanning
marigold a11y --format table       # terminal output (default)

# CI mode (exit code 1 if errors found)
marigold a11y --ci
```

**What it checks:**

#### Labels (form accessibility)

| Check                  | What it detects                                                    | WCAG Criterion               |
| ---------------------- | ------------------------------------------------------------------ | ---------------------------- |
| Missing label          | `<TextField>` without `label` or `aria-label` prop                 | 1.3.1 Info and Relationships |
| Missing description    | `<TextField>` with `errorMessage` but no `description` for context | 1.3.1                        |
| Placeholder as label   | `<TextField>` with `placeholder` but no `label`                    | 1.3.1, 3.3.2                 |
| Select without label   | `<Select>` without `label` or `aria-label`                         | 1.3.1                        |
| Checkbox without label | `<Checkbox>` without text content or `aria-label`                  | 1.3.1                        |

These checks leverage Marigold's react-aria foundation. Because react-aria enforces label associations at the component level, the CLI only needs to verify that labels are provided — the actual `aria-labelledby` / `htmlFor` wiring is handled by the component.

#### Contrast (color accessibility)

| Check                | What it detects                                                        | WCAG Criterion           |
| -------------------- | ---------------------------------------------------------------------- | ------------------------ |
| Text contrast        | Foreground/background color combinations below 4.5:1 (AA) or 7:1 (AAA) | 1.4.3 Contrast (Minimum) |
| Large text contrast  | Large text (18pt+) below 3:1 (AA) or 4.5:1 (AAA)                       | 1.4.3                    |
| Interactive contrast | Focus indicators, button borders below 3:1 against background          | 1.4.11 Non-text Contrast |

**How contrast checking works:**

```
1. Read theme CSS custom properties (colors)
       ↓
2. Resolve component styles (from theme inspect engine)
   e.g., Button primary: bg-primary-500 + text-white
       ↓
3. Convert to absolute color values
   oklch(0.55 0.2 260) → sRGB
       ↓
4. Calculate contrast ratio (WCAG relative luminance formula)
       ↓
5. Compare against WCAG thresholds (4.5:1 for AA, 7:1 for AAA)
```

This catches issues that only manifest when specific theme tokens are combined — something no runtime tool can detect until the component is actually rendered.

#### Keyboard (interaction accessibility)

| Check                  | What it detects                                           | WCAG Criterion      |
| ---------------------- | --------------------------------------------------------- | ------------------- |
| Click without keyboard | `onClick` on non-interactive elements without `onKeyDown` | 2.1.1 Keyboard      |
| Missing focus styles   | Interactive elements without visible focus indicator      | 2.4.7 Focus Visible |
| Tab order              | `tabIndex` values > 0 (disrupts natural tab order)        | 2.4.3 Focus Order   |

Most keyboard checks are already handled by react-aria components. The CLI focuses on detecting places where consumers bypass Marigold components (raw `<div onClick>`) or use Marigold components in ways that break keyboard navigation (wrapping interactive components in other interactive elements).

#### Headings (document structure)

| Check                | What it detects                               | WCAG Criterion               |
| -------------------- | --------------------------------------------- | ---------------------------- |
| Skipped levels       | h1 → h3 (missing h2)                          | 1.3.1 Info and Relationships |
| Multiple h1          | More than one `<Headline level={1}>` per page | Best practice                |
| Missing page heading | No h1 on a page/route                         | 2.4.6 Headings and Labels    |

**Example JSON output (for CI):**

```json
{
  "summary": {
    "errors": 4,
    "warnings": 6,
    "passed": 473,
    "passRate": 0.979
  },
  "issues": [
    {
      "severity": "error",
      "category": "labels",
      "rule": "text-field-requires-label",
      "wcag": "1.3.1",
      "file": "src/forms/QuickSearch.tsx",
      "line": 8,
      "column": 5,
      "message": "TextField without label or aria-label",
      "component": "TextField",
      "fix": "Add label=\"Search\" or aria-label=\"Search\" prop",
      "autoFixable": true
    },
    {
      "severity": "error",
      "category": "contrast",
      "rule": "text-contrast-aa",
      "wcag": "1.4.3",
      "file": "src/components/Banner.tsx",
      "line": 12,
      "column": 9,
      "message": "Text contrast ratio 3.2:1 is below AA threshold (4.5:1)",
      "tokens": {
        "foreground": "text-gray-400 → oklch(0.70 0.01 260)",
        "background": "bg-gray-100 → oklch(0.96 0.005 260)"
      },
      "fix": "Use text-gray-600 or darker (achieves 5.7:1)",
      "autoFixable": false
    }
  ]
}
```

### CI Integration

The `--ci` flag makes `marigold a11y` suitable for continuous integration:

```bash
# In CI pipeline (GitHub Actions, etc.)
marigold a11y --ci --format sarif > accessibility.sarif

# Exit code:
#   0 = no errors (warnings are OK)
#   1 = errors found (build should fail)
```

**GitHub Actions example:**

```yaml
- name: Accessibility check
  run: npx @marigold/cli a11y --ci --format sarif > results.sarif

- name: Upload SARIF
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: results.sarif
```

This integrates with GitHub's Code Scanning, showing accessibility issues directly in pull request reviews.

---

## Architecture

### Theme Resolution Engine

The theme engine is the core of v3. It needs to understand the full Marigold styling pipeline.

```
Theme Style File (*.styles.ts)
    │
    │  Export: cva(['base-classes'], { variants: { ... } })
    │
    ▼
useClassNames({ component, variant, size })
    │
    │  Resolves variant/size to Tailwind classes
    │
    ▼
Tailwind CSS Classes
    │
    │  e.g., 'bg-primary-500 text-white rounded-lg px-4 py-2'
    │
    ▼
CSS Custom Properties
    │
    │  bg-primary-500 → background-color: var(--color-primary-500)
    │
    ▼
Resolved Values (from theme.css)
    │
    │  --color-primary-500: oklch(0.55 0.2 260)
    │
    ▼
Final Computed Style
```

**Implementation approach:**

1. **Parse theme style files**: Use SWC or ts-morph to extract `cva()` calls and their arguments. We need the base classes and variant maps.

2. **Evaluate variant resolution**: Given a `variant` + `size`, select the correct class string from the cva definition. This is pure string manipulation — no runtime React needed.

3. **Parse Tailwind classes**: Map utility classes to CSS properties. Use Tailwind's own resolver (or a lightweight subset) to understand what `bg-primary-500` means in CSS terms.

4. **Resolve CSS custom properties**: Read `theme.css` and resolve `var(--color-primary-500)` to its defined value.

5. **Convert color values**: Parse oklch, hsl, rgb values into a normalized format for contrast calculation.

**What makes this challenging:**

- Theme files use TypeScript with `cva()` from `class-variance-authority` — we need to evaluate the cva call statically
- Tailwind v4 uses `@theme` directives and CSS-native custom properties — different from v3's `tailwind.config.js`
- Some classes are conditional (`cn(classNames, fullWidth && 'w-full')`) — we can resolve the static parts and flag the conditional parts

### Accessibility Analysis Engine

Builds on top of v2's AST engine and v3's theme resolution engine.

```
Source files (from v2 AST engine)
    │
    ├─── Label checks
    │    Parse JSX: does <TextField> have label or aria-label?
    │    Pure AST analysis — fast and deterministic
    │
    ├─── Contrast checks
    │    1. Identify foreground/background class combinations
    │       (from theme resolution engine)
    │    2. Resolve to absolute color values
    │    3. Calculate WCAG contrast ratio
    │    4. Compare against AA/AAA thresholds
    │
    ├─── Keyboard checks
    │    Parse JSX: onClick without onKeyDown?
    │    Interactive element nested in interactive element?
    │    tabIndex > 0?
    │
    └─── Heading checks
         Parse JSX: <Headline level={N}> or <h1>..<h6>
         Build heading tree per file/route
         Verify level sequence (no skips)
```

**Performance:**

The label, keyboard, and heading checks are pure AST analysis — they run at the same speed as v2's scan (thousands of files in seconds).

The contrast checks are slower because they require theme resolution, but they only need to run once per unique foreground/background combination. In practice, a Marigold project has ~20-50 unique color combinations, so the contrast check adds negligible time.

---

## How AI Agents Use v3 Specifically

### Theme debugging workflow

```markdown
## CLAUDE.md addition for v3

When debugging styling issues with Marigold components:

1. Run `marigold theme inspect <Component> --variant <variant>` to see resolved styles
2. If the issue is a color, run `marigold theme inspect --token <token-name>` to trace the cascade
3. If comparing themes, run `marigold theme diff <theme-a> <theme-b> --component <Component>`

When reviewing UI for accessibility before shipping:

1. Run `marigold a11y --files <changed-files>` to check new code
2. Fix errors (severity: error) before merging
3. Address warnings in a follow-up if not blocking
```

### Agent self-corrects styling errors

```
User: "The text in our notification banner is hard to read"

Agent runs: marigold theme inspect SectionMessage --variant info
→ Sees: text-info-700 on bg-info-50

Agent runs: marigold a11y --files src/components/NotificationBanner.tsx
→ Output:
  WARNING: text-info-700 on bg-info-50 has contrast ratio 4.1:1
  (passes AA for large text, fails AA for normal text)

Agent: "The info variant's text color has insufficient contrast
for normal-sized text (4.1:1, AA requires 4.5:1). Two options:

1. If this is a theme issue, update --color-info-700 to a darker value
2. If this is only in this component, use text-info-800 instead

Want me to check what text-info-800 would give us?"

Agent runs: marigold theme inspect --token color-info-800
→ oklch(0.35 0.12 230)

Agent: "text-info-800 on bg-info-50 gives 6.2:1 — well above AA.
Shall I update the theme?"
```

### Agent runs a11y as part of every PR

An AI agent configured to review PRs can automatically include accessibility checking:

```
Agent (during PR review):
  1. marigold a11y --files $(git diff --name-only main) --ci --format json
  2. If issues found → comment on PR with findings
  3. If no issues → include "Accessibility: passed" in review
```

This makes accessibility checking automatic and continuous, not a manual step that gets skipped under deadline pressure.

---

## MCP Integration

v3 unlocks the MCP server's most powerful resources and tools. See [mcp-server-beyond-search.md](./mcp-server-beyond-search.md) for the full architecture.

### New MCP Resources (v3-only)

v3 enables two resource types that fundamentally change how AI agents work with Marigold themes:

**`theme://tokens`** — All design tokens, always in context:

Unlike CLI commands that output on demand, this resource is attached to the AI's context whenever the user works on styling. The AI doesn't need to run `marigold theme export` — it already knows every token value.

This eliminates the most common AI styling mistake: guessing token names. Instead of the AI writing `text-gray-500` and hoping it exists, it knows the exact color scale from the resource.

**`theme://{component}/styles`** — Resolved component styles:

When the user edits a component's theme file or debugs a visual issue, this resource provides the full style resolution. The AI can see exactly which classes a variant produces without running `marigold theme inspect`.

### New MCP Tools (v3)

| CLI Command               | MCP Tool              | Notes                                           |
| ------------------------- | --------------------- | ----------------------------------------------- |
| `marigold theme inspect`  | `inspect_theme`       | Resolves the full style cascade for a component |
| `marigold theme diff`     | (not exposed)         | Comparison is better done interactively via CLI |
| `marigold theme validate` | `validate_theme`      | Checks custom theme for completeness            |
| `marigold theme export`   | (covered by resource) | `theme://tokens` resource is the MCP equivalent |
| `marigold a11y`           | `audit_a11y`          | Accessibility checking on specified files       |

### New MCP Prompts (v3)

**`/audit-a11y`** — Structured accessibility workflow:

The prompt instructs the AI to:

1. Run `audit_a11y` on the project or specified files
2. Group findings by severity
3. For each contrast issue: use `inspect_theme` to trace the cascade and suggest a specific fix
4. For each label issue: show the fix and offer to apply it
5. Generate a summary with WCAG criteria references

**`/debug-styles`** — Theme debugging workflow:

The prompt instructs the AI to:

1. Ask the user which component looks wrong
2. Run `inspect_theme` for that component
3. Cross-reference resolved styles with the user's code (are there className overrides? wrong variant?)
4. If it's a theme issue, suggest token changes
5. If it's a usage issue, show the correct usage pattern

### The Resource advantage for theme work

Consider the difference between CLI and MCP for a theme debugging session:

**CLI approach (5+ round trips):**

```
Agent: marigold theme inspect Button --variant primary
Agent: marigold theme inspect --token color-primary-500
Agent: marigold theme inspect Button --variant secondary
Agent: marigold a11y --files src/components/Header.tsx
Agent: marigold theme export --category colors --format json
```

**MCP approach (0 explicit calls):**

```
Resources already attached:
  - theme://Button/styles (all variants pre-loaded)
  - theme://tokens (full color scale in context)
  - component://Button/api (props and usage)

Agent has everything. Starts diagnosing immediately.
```

The MCP approach is not just faster — it enables the AI to **notice problems it wasn't asked about**. With theme tokens in context, the AI might spot a contrast issue while reviewing code for an unrelated reason. With CLI, the AI would only check contrast if explicitly asked.

---

## Open Questions

1. **How to handle responsive styles?**
   - Tailwind classes like `md:px-6 lg:px-8` mean different values at different breakpoints
   - `theme inspect` could show all breakpoints, or default to "base" and accept `--breakpoint md`
   - Recommendation: Show base by default, list responsive overrides separately

2. **How to handle dark mode?**
   - Marigold may have dark mode token overrides
   - `theme inspect` should accept `--mode dark` to show dark mode styles
   - Contrast checks should run for both modes by default

3. **Should a11y auto-fix be in v3 or deferred?**
   - Some issues are trivially auto-fixable (adding `aria-label` to a TextField)
   - Others require design decisions (choosing a different color)
   - Recommendation: Add `--fix` flag for trivially fixable issues (labels, heading order), flag contrast and keyboard issues as manual

4. **How to handle third-party component composition?**
   - Consumers might wrap Marigold components in third-party libraries
   - e.g., `<FormField><TextField /></FormField>` where FormField provides the label
   - The CLI can't know about third-party components
   - Recommendation: Allow `--ignore-rule` flags and a `.marigold-a11y.json` config file for suppressions

5. **SARIF vs. custom format for CI?**
   - SARIF integrates with GitHub Code Scanning but is verbose
   - A simpler JSON format is easier for custom CI scripts
   - Recommendation: Support both (`--format sarif` and `--format json`)

6. **Should theme export support Figma tokens format?**
   - Many teams sync design tokens between code and Figma
   - The [Design Tokens Community Group](https://tr.designtokens.org/format/) format is gaining adoption
   - Recommendation: Add `--format dtcg` for the standard Design Tokens format, enabling Figma plugin compatibility
