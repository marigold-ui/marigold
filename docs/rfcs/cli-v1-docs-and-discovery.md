# Marigold CLI v1: Documentation & Discovery

> **Status**: Proposal
> **Scope**: `marigold docs`, `marigold list`, `marigold doctor`, `marigold init`
> **Package**: `packages/cli` (new)
> **Depends on**: Existing `/mcp/*.md` API routes on the docs site

---

## Table of Contents

- [Motivation](#motivation)
- [Why a CLI alongside the MCP Server](#why-a-cli-alongside-the-mcp-server)
- [How AI Agents Use the CLI](#how-ai-agents-use-the-cli)
- [Commands](#commands)
  - [`marigold docs`](#marigold-docs)
  - [`marigold list`](#marigold-list)
  - [`marigold doctor`](#marigold-doctor)
  - [`marigold init`](#marigold-init)
- [Architecture](#architecture)
- [Relationship to the MCP Server](#relationship-to-the-mcp-server)
- [The Manifest Endpoint](#the-manifest-endpoint)
- [Output Formats](#output-formats)
- [Caching Strategy](#caching-strategy)
- [Telemetry](#telemetry)
- [Package Structure](#package-structure)
- [Open Questions](#open-questions)

---

## Motivation

Developers using the Marigold Design System need fast, reliable access to component documentation, props tables, usage guidelines, and code examples while they code. Today, this information lives on the docs site at [marigold-ui.io](https://www.marigold-ui.io), which means context-switching out of the terminal/editor to a browser tab.

PR #5233 introduces an MCP server with semantic vector search over the docs corpus. This is powerful for AI agents in sandboxed environments (Claude Desktop, chat UIs), but it carries significant overhead for the most common use case: a developer (or their coding agent) asking "what props does Button accept?" while editing a file.

**v1 solves the simplest, most frequent problem**: getting Marigold documentation into the terminal and into AI agent context efficiently.

---

## Why a CLI alongside the MCP Server

The MCP server and CLI serve different environments and different interaction patterns. Neither replaces the other.

### Token economics

This is the primary driver. Real-world benchmarks (Playwright, GitHub) consistently show CLIs are **4-10x more token-efficient** than MCP servers for the same information:

| Aspect               | MCP Server                                                        | CLI                                        |
| -------------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| Per-request overhead | Tool schema injection (~2-5K tokens), auth handshake, SSE framing | Zero — just stdout text                    |
| Result format        | Embedded in conversation context (stays forever)                  | Written to stdout, agent reads selectively |
| Cumulative cost      | Grows with every query (stale results pollute context)            | Each query is independent                  |

For a coding session where an agent queries 10 component docs, the MCP approach might consume 50K+ tokens in schema overhead alone. The CLI approach: 10 shell commands, each returning exactly the markdown needed, with no residual context pollution.

### Model familiarity

LLMs have been trained on billions of terminal interactions. They know how to:

- Run a command and read its stdout
- Parse markdown tables, code blocks, and headings from CLI output
- Chain CLI commands with pipes and redirects
- Handle exit codes and stderr

MCP tool schemas have zero representation in training data. The model encounters them for the first time at runtime, increasing cognitive load and error rates.

### No authentication required

The MCP server in PR #5233 requires Keycloak OAuth — the agent must complete a browser-based login flow before it can search. The CLI fetches from the same public `/mcp/*.md` routes that are already statically generated and cached on the CDN. No auth, no tokens, no expiry.

### Offline capability

With local caching (see [Caching Strategy](#caching-strategy)), the CLI works without network access. The MCP server is always online-only.

### When to use the MCP server instead

The MCP server remains valuable for:

- **Semantic/fuzzy search**: "How do I build a form with validation?" — this requires vector similarity, not keyword matching
- **Sandboxed environments**: Claude Desktop, v0, or any chat UI without shell access
- **Remote access**: Team members who don't have the repo cloned

---

## How AI Agents Use the CLI

This is the most important section. The CLI's primary consumer is not a human developer typing commands — it's an AI coding agent (Claude Code, Cursor, GitHub Copilot) that needs Marigold context to write correct code.

### The fundamental interaction pattern

When an AI agent is editing a file that uses Marigold components, it needs to answer questions like:

1. "What props does `<TextField>` accept?"
2. "What variants are available for `<Button>`?"
3. "How do I use `<Dialog>` with a trigger?"
4. "What's the recommended pattern for form validation?"

Without the CLI, the agent must either:

- **Guess** from training data (often wrong — Marigold's API is not in public training corpora)
- **Read source code** (slow — requires navigating `packages/components/src/`, understanding RAC wrappers, and inferring usage)
- **Use the MCP server** (expensive — schema overhead, auth flow, vector search for simple lookups)

With the CLI, the agent runs a single command:

```bash
marigold docs TextField
```

And receives clean, structured markdown with props tables, usage guidelines, code examples, and accessibility notes — exactly what it needs, with zero overhead.

### How Claude Code discovers the CLI

Claude Code discovers CLI tools through two mechanisms:

**1. CLAUDE.md instructions (recommended for v1)**

Add to the project's `CLAUDE.md`:

```markdown
## Marigold CLI

When working with Marigold components, use the `marigold` CLI to look up documentation:

- `marigold docs <component>` — Full documentation (props, variants, examples, guidelines)
- `marigold docs <component> --section props` — Just the props table
- `marigold list` — List all available components
- `marigold list --category form` — List components in a category
- `marigold doctor` — Check installation health

Always run `marigold docs <ComponentName>` before using a component you haven't
seen in the current conversation. Do not guess props or variants from training data.
```

This is the simplest and most reliable approach. Claude Code reads `CLAUDE.md` at the start of every session and follows its instructions.

**2. Shell command execution**

Claude Code can run any shell command via its Bash tool. When it encounters a Marigold component it doesn't know, the `CLAUDE.md` instruction tells it to run:

```bash
marigold docs Button
```

The command returns markdown to stdout. Claude Code reads this output and now has accurate, up-to-date information about the component.

### Example: Agent workflow for building a form

Here's how an AI agent session looks with the CLI available:

```
User: "Create a login form with email and password fields"

Agent thinks: "I need TextField, Button, and Form from Marigold.
Let me check their APIs."

Agent runs: marigold docs TextField --format json
→ Gets props table, learns about `label`, `type`, `description`,
  `errorMessage`, `disabled`, `required`, variant/size options

Agent runs: marigold docs Button --section props
→ Gets props: `variant`, `size`, `onPress`, `loading`, `disabled`, `type`

Agent runs: marigold docs Form --section props
→ Gets props: `onSubmit`, `validationErrors`, `validationBehavior`

Agent writes correct code on the first try:

<Form onSubmit={handleSubmit}>
  <Stack space={4}>
    <TextField
      label="Email"
      type="email"
      required
      description="We'll never share your email"
    />
    <TextField
      label="Password"
      type="password"
      required
    />
    <Button variant="primary" type="submit">
      Log in
    </Button>
  </Stack>
</Form>
```

Without the CLI, the agent would likely guess wrong prop names (e.g., `onChange` instead of `onSubmit`, `isRequired` instead of `required`, `variant="contained"` instead of `variant="primary"`).

### Example: Agent discovers available components

```
User: "Add a date range picker to the filter panel"

Agent thinks: "Does Marigold have a date range component?"

Agent runs: marigold list --category form
→ Sees: Autocomplete, Calendar, Checkbox, ComboBox, DateField,
  DatePicker, FileField, Form, Multiselect, NumberField, Radio,
  SearchField, Select, Slider, Switch, TagField, TextArea,
  TextField, TimeField

Agent thinks: "DatePicker exists. Let me check if it supports ranges."

Agent runs: marigold docs DatePicker
→ Reads full documentation, finds range examples and props

Agent writes correct implementation.
```

### Example: Agent diagnoses a setup problem

```
User: "My Marigold components have no styling"

Agent runs: marigold doctor
→ Output:
  Marigold Doctor
  ===============
  Packages:
    @marigold/components  7.5.0  OK
    @marigold/system      7.5.0  OK
    @marigold/theme-rui   MISSING

  Issues found:
    No theme package installed. Components require a theme
    to render correctly.

    Fix: pnpm add @marigold/theme-rui

    Ensure your root layout wraps the app with MarigoldProvider:

    import { MarigoldProvider } from '@marigold/components';
    import theme from '@marigold/theme-rui';

    <MarigoldProvider theme={theme}>
      {children}
    </MarigoldProvider>

Agent: "You're missing the theme package. Let me install it and
set up the provider."
```

### JSON output for structured agent consumption

For agents that want to parse component information programmatically rather than reading markdown, the CLI supports `--format json`:

```bash
marigold docs Button --format json
```

```json
{
  "name": "Button",
  "category": "actions",
  "description": "Allows users to perform an action.",
  "props": [
    {
      "name": "variant",
      "type": "'primary' | 'secondary' | 'ghost' | 'text' | (string & {})",
      "default": "-",
      "description": "The visual style of the button."
    },
    {
      "name": "size",
      "type": "'small' | 'default' | (string & {})",
      "default": "'default'",
      "description": "The size of the button."
    }
  ],
  "subcomponents": [],
  "examples": ["button-basic", "button-primary", "button-disabled"],
  "url": "https://www.marigold-ui.io/components/actions/button"
}
```

This is particularly useful for agents that want to validate their code against the actual API before presenting it to the user.

---

## Commands

### `marigold docs`

The core command. Fetches and displays component documentation.

**Usage:**

```bash
# Full documentation for a component
marigold docs Button

# Case-insensitive, fuzzy-matched
marigold docs textfield
marigold docs text-field
marigold docs TextField

# Specific section only
marigold docs Button --section props
marigold docs Button --section usage
marigold docs Button --section examples

# Non-component pages (patterns, foundations, getting started)
marigold docs patterns/forms
marigold docs foundations/spacing
marigold docs getting-started/installation

# Output format
marigold docs Button --format markdown   # default
marigold docs Button --format json       # structured data
marigold docs Button --format plain      # no formatting, plain text
```

**How it works:**

1. Resolves the component name to a URL slug using the [manifest](#the-manifest-endpoint)
2. Fetches `https://www.marigold-ui.io/mcp/<slug>.md` (the same static routes the MCP server uses)
3. Optionally filters to a specific section (by heading)
4. Formats for terminal output (syntax highlighting, table alignment) or JSON

**Why this approach:**

- The `/mcp/*.md` routes already exist and are statically generated at build time
- They include resolved props tables, code examples, and design tokens — no additional processing needed
- CDN-cached, so responses are fast (~50ms from edge)
- No new server infrastructure required

**Example output:**

```
$ marigold docs Button

# Button

Allows users to perform an action. It is the primary component
for user interaction.

## Appearance

| Variant    | Size    |
|------------|---------|
| primary    | default |
| secondary  | small   |
| ghost      |         |
| text       |         |

## Usage

Use buttons for the most important actions you want users to take
on a page or in a flow. Avoid using too many buttons on a single
page. [...]

## Props

| Property  | Type                                          | Default    | Description                    |
|-----------|-----------------------------------------------|------------|--------------------------------|
| variant   | 'primary' | 'secondary' | 'ghost' | 'text'  | -          | The visual style of the button |
| size      | 'small' | 'default'                       | 'default'  | The size of the button         |
| disabled  | boolean                                       | false      | Whether the button is disabled |
| loading   | boolean                                       | false      | Shows a loading spinner        |
| onPress   | (e: PressEvent) => void                       | -          | Handler called on press        |
| type      | 'button' | 'submit' | 'reset'                | 'button'   | The HTML button type           |
| [...]     |                                               |            |                                |
```

### `marigold list`

Lists all available components, optionally filtered by category.

**Usage:**

```bash
# All components
marigold list

# Filter by category
marigold list --category form
marigold list --category layout
marigold list --category overlay
marigold list --category content
marigold list --category actions
marigold list --category navigation
marigold list --category collection
marigold list --category hooks-and-utils

# Output as JSON (for scripting/agents)
marigold list --format json

# Search by name
marigold list --search "date"
```

**Why this command exists:**

When a developer or AI agent starts working with Marigold, the first question is always "what components are available?" Currently, answering this requires opening the docs site and browsing the sidebar. The `list` command makes this information instantly available in the terminal.

For AI agents specifically, this is critical for **component discovery**. When a user says "add a way to pick a date," the agent needs to know that `DatePicker`, `DateField`, and `Calendar` all exist before it can choose the right one.

**Example output:**

```
$ marigold list --category form

Form Components (18)
====================

  Autocomplete     Combo box with async suggestions
  Calendar         Calendar display for date selection
  Checkbox         Boolean input with label
  ComboBox         Filterable dropdown selection
  DateField        Keyboard-friendly date input
  DatePicker       Date input with calendar popup
  FileField        File upload input
  Form             Form container with validation
  Multiselect      Multiple selection dropdown
  NumberField      Numeric input with increment/decrement
  Radio            Single selection from options
  SearchField      Text input optimized for search
  Select           Dropdown selection
  Slider           Range input
  Switch           Toggle between two states
  TagField         Input with tag creation
  TextArea         Multi-line text input
  TextField        Single-line text input
  TimeField        Time input

$ marigold list --search "date"

Search results for "date" (3)
=============================

  DateField    components/form       Keyboard-friendly date input
  DatePicker   components/form       Date input with calendar popup
  Calendar     components/form       Calendar display for date selection
  DateFormat   components/formatters Date formatting utility
```

### `marigold doctor`

Diagnoses common setup problems in a consumer project.

**Usage:**

```bash
# Run all checks
marigold doctor

# Specific check only
marigold doctor --check packages
marigold doctor --check theme
marigold doctor --check provider

# JSON output for CI
marigold doctor --format json
```

**What it checks:**

| Check                  | What it detects                                                     | Why it matters                                                   |
| ---------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Package versions**   | Missing packages, version mismatches between `@marigold/*` packages | Mismatched versions are the #1 cause of "it doesn't work" issues |
| **Theme installation** | No theme package installed, or theme not imported                   | Components render unstyled without a theme                       |
| **Provider setup**     | `MarigoldProvider` not found in root layout/app                     | Components fail silently without the provider                    |
| **Tailwind config**    | Missing Tailwind CSS setup, missing content paths for Marigold      | Styles don't apply without proper Tailwind configuration         |
| **Peer dependencies**  | React version incompatibility, missing react-aria                   | Runtime errors from unmet peer deps                              |
| **Duplicate packages** | Multiple versions of the same Marigold package in node_modules      | Causes React context mismatches and broken styling               |

**Why this command exists:**

Design system setup issues are notoriously difficult to debug. The symptom is always the same ("components look wrong" or "nothing renders"), but the cause can be any of a dozen configuration problems. `marigold doctor` automates the diagnostic process that the team currently walks users through manually.

For AI agents, `doctor` is the first command to run when a user reports styling or rendering issues. Instead of the agent guessing at the problem, it gets a structured diagnosis.

**Example output:**

```
$ marigold doctor

Marigold Doctor
===============

Packages
  @marigold/components   7.5.0   OK
  @marigold/system       7.5.0   OK
  @marigold/theme-rui    7.5.0   OK
  @marigold/icons        7.5.0   OK
  react                  19.2.4  OK (peer: >=18)
  react-dom              19.2.4  OK (peer: >=18)

Theme
  Theme package:    @marigold/theme-rui  OK
  Theme import:     Found in src/app/layout.tsx  OK

Provider
  MarigoldProvider: Found in src/app/layout.tsx  OK

Tailwind
  tailwind.config:  Found  OK
  Content paths:    Includes @marigold/*  OK

All checks passed. Your Marigold setup looks healthy.
```

```
$ marigold doctor

Marigold Doctor
===============

Packages
  @marigold/components   7.5.0   OK
  @marigold/system       7.3.0   WARN  Version mismatch (expected 7.5.0)
  @marigold/theme-rui    -       ERROR Not installed

2 issues found:

  1. @marigold/system version mismatch
     Installed: 7.3.0, Expected: 7.5.0 (matching @marigold/components)
     Fix: pnpm add @marigold/system@7.5.0

  2. No theme package installed
     Components require a theme to render correctly.
     Fix: pnpm add @marigold/theme-rui@7.5.0

     Then add to your root layout:
       import { MarigoldProvider } from '@marigold/components';
       import theme from '@marigold/theme-rui';

       <MarigoldProvider theme={theme}>
         {children}
       </MarigoldProvider>
```

### `marigold init`

Sets up Marigold in a new or existing project.

**Usage:**

```bash
# Interactive setup
marigold init

# Non-interactive with defaults
marigold init --theme theme-rui --skip-prompts

# Specific framework
marigold init --framework next
marigold init --framework vite
```

**What it does:**

1. Detects the project framework (Next.js, Vite, Remix, or plain React)
2. Installs required packages (`@marigold/components`, `@marigold/system`, theme)
3. Configures Tailwind CSS (adds Marigold content paths, imports theme CSS)
4. Adds `MarigoldProvider` to the root layout/app entry point
5. Runs `marigold doctor` to verify the setup

**Why this command exists:**

Getting started with a design system involves multiple configuration steps that are easy to get wrong. The docs page walks through them, but each step is a potential failure point. `marigold init` automates the entire process, reducing "time to first component" from 15+ minutes of manual configuration to a single command.

For AI agents, `init` is what they run when a user says "set up Marigold in my project." Instead of the agent trying to manually edit config files (often getting Tailwind setup wrong), it delegates to a purpose-built tool that handles framework-specific quirks.

**Example session:**

```
$ marigold init

  Marigold Design System Setup
  ============================

  Detected framework: Next.js (App Router)
  Detected package manager: pnpm

  Installing packages...
    @marigold/components@7.5.0
    @marigold/system@7.5.0
    @marigold/theme-rui@7.5.0
    @marigold/icons@7.5.0

  Configuring Tailwind CSS...
    Updated: tailwind.config.ts
    Added content path: './node_modules/@marigold/*/dist/**'

  Setting up MarigoldProvider...
    Updated: src/app/layout.tsx
    Added: import theme from '@marigold/theme-rui'
    Added: <MarigoldProvider theme={theme}>

  Running doctor check...
    All checks passed.

  Done! Start using Marigold components:

    import { Button } from '@marigold/components';

    <Button variant="primary">Hello Marigold</Button>
```

---

## Architecture

### Data flow

```
                                    Build time
                                    ==========
docs/content/**/*.mdx ──→ parser.ts ──→ /mcp/*.md (static routes, CDN-cached)
                              │
                              └──→ /mcp/manifest.json (component index)


                                    Runtime (CLI)
                                    =============
marigold docs Button
    │
    ├── 1. Load manifest (cached locally)
    │       GET https://www.marigold-ui.io/mcp/manifest.json
    │
    ├── 2. Resolve "Button" → "components/actions/button"
    │
    ├── 3. Fetch documentation (cached locally)
    │       GET https://www.marigold-ui.io/mcp/components/actions/button.md
    │
    ├── 4. Parse markdown, extract sections if --section flag
    │
    └── 5. Format and output to stdout
```

### Why fetch from the docs site (not bundle at build time)

We considered three approaches:

| Approach                 | Pros                                                   | Cons                                                            |
| ------------------------ | ------------------------------------------------------ | --------------------------------------------------------------- |
| **Fetch from API**       | Always fresh, tiny CLI package, single source of truth | Requires network                                                |
| **Bundle at build time** | Works offline, instant                                 | Stale until CLI updates, large package, extra release artifact  |
| **Run parser locally**   | Works offline, always fresh from source                | Requires ts-morph + full repo, 10s+ startup, heavy dependencies |

**v1 uses fetch-from-API with local caching.** The `/mcp/*.md` routes are statically generated and CDN-cached, so they're fast (~50ms) and reliable. The CLI caches responses locally so repeated lookups are instant and work offline.

This is the same pattern used by `gh` (GitHub CLI), which fetches from the GitHub API but caches aggressively for offline use.

### Why reuse the existing `/mcp/*.md` routes

The parser pipeline in `docs/app/mcp/parser.ts` already does all the heavy lifting:

- Resolves `<AutoTypeTable>` → markdown props tables (via ts-morph TypeScript introspection)
- Resolves `<AppearanceTable>` → markdown variant/size tables
- Resolves `<ComponentDemo>` → fenced code blocks with demo source
- Resolves `<ColorTokenTable>` → markdown design token tables
- Strips JSX, injects frontmatter as heading

The output is clean, structured markdown that's optimized for LLM consumption (it was built for the MCP server's vector search). The CLI simply fetches and displays it.

**No new data pipeline. No new build step. No new infrastructure.**

---

## Relationship to the MCP Server

This is a critical architectural decision: **the CLI does NOT query the MCP server, and the MCP server does NOT replace the CLI.** Instead, the MCP server wraps the CLI.

### Why the CLI should not query the MCP server

It's tempting to think "the MCP server has semantic search, so the CLI should use it." But this creates the wrong dependency:

| Problem                     | Explanation                                                                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth overhead**           | The MCP server requires Keycloak OAuth. The CLI would need to implement the full OAuth flow (browser redirect, token exchange, refresh) just to look up a component. The `/mcp/*.md` static routes need no auth. |
| **Unnecessary indirection** | CLI → MCP server → docs API → response → MCP protocol → CLI. vs. CLI → docs API → response. Three extra hops for zero benefit.                                                                                   |
| **Coupling**                | If the MCP server is down or the OAuth provider has issues, the CLI breaks. The static `/mcp/*.md` routes on the CDN have effectively 100% uptime.                                                               |
| **Latency**                 | MCP server: cold start + embedding generation + vector search + auth = 2-5s. Static route: CDN edge = 50ms.                                                                                                      |

### The right relationship: MCP wraps CLI

```
┌──────────────────────────────────────────────────────┐
│                    MCP Server                         │
│                                                       │
│  Tools (AI-invocable actions)                        │
│  ├── search_docs(query)     → semantic vector search │
│  ├── get_component(name)    → delegates to CLI logic │
│  ├── scan_project(path)     → delegates to CLI logic │
│  ├── check_upgrade(target)  → delegates to CLI logic │
│  └── audit_a11y(files)      → delegates to CLI logic │
│                                                       │
│  Resources (contextual knowledge — MCP-only)         │
│  ├── component://{name}/api      → props, types      │
│  ├── component://{name}/examples → code examples     │
│  ├── theme://tokens              → design token list │
│  └── docs://guidelines/{topic}   → design guidelines │
│                                                       │
│  Prompts (workflow templates — MCP-only)              │
│  ├── /create-component   → scaffolding workflow      │
│  ├── /migrate            → upgrade workflow          │
│  └── /audit-a11y         → accessibility workflow    │
│                                                       │
└───────────────────┬──────────────────────────────────┘
                    │ delegates to
┌───────────────────▼──────────────────────────────────┐
│                      CLI                              │
│                                                       │
│  marigold docs Button          → fetch /mcp/*.md     │
│  marigold list                 → fetch manifest.json │
│  marigold scan                 → local AST analysis  │
│  marigold check --target 8.0   → scan + changelog    │
│  marigold migrate              → AST codemods        │
│  marigold theme inspect        → theme resolution    │
│  marigold a11y                 → static a11y checks  │
│  marigold doctor               → local project check │
│  marigold init                 → project setup       │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### What the MCP server uniquely provides (not in CLI)

The MCP protocol has three primitives — **Tools**, **Resources**, and **Prompts**. The CLI can only replicate Tools (as shell commands). Resources and Prompts have no CLI equivalent and are the MCP server's unique value:

**Resources** — contextual knowledge injected into the AI's context _without being asked_:

Unlike CLI commands (which the AI must decide to run), MCP resources are always available. The IDE client can pre-load them based on what file the user is editing. For example:

- User opens `LoginForm.tsx` which imports `TextField` and `Button`
- The MCP client automatically attaches `component://TextField/api` and `component://Button/api` as context
- The AI now knows the exact props and usage guidelines _before the user even asks a question_

With a CLI, the AI would need to recognize that it doesn't know the API → decide to run `marigold docs TextField` → wait for output → read it. Resources skip this entire discovery loop.

**Prompts** — packaged multi-step workflows:

```
User types: /create-component DateRangePicker

MCP server returns a rich prompt with:
- Component scaffolding instructions
- Marigold patterns (RAC wrapping, useClassNames, forwardRef)
- Props interface template
- Story template
- Test template
- Theme style template
- Accessibility checklist specific to date/range inputs
```

With a CLI, the AI would need to chain multiple commands (`marigold docs DatePicker`, read the source of a similar component, scaffold files). The MCP prompt encapsulates this entire workflow.

**Semantic search** — fuzzy conceptual queries:

The MCP server's vector search handles questions a CLI can't:

- "How do I build a form with client-side validation?" (maps to patterns/forms + Form component + error handling)
- "What's the best way to handle loading states?" (maps to patterns/loading-states + Loader + Button loading prop)
- "How do I create a sidebar navigation?" (maps to Sidebar + AppLayout + TopNavigation)

The CLI's `marigold docs` requires you to already know the component name. The MCP's `search_docs` helps you discover what you don't know you need.

### Decision matrix: When consumers use which

| Scenario                         | Use CLI                                | Use MCP Server                         |
| -------------------------------- | -------------------------------------- | -------------------------------------- |
| "What props does Button have?"   | `marigold docs Button --section props` | `component://Button/api` (auto-loaded) |
| "How do I build a filter panel?" | ❌ Need to know component names first  | `search_docs("filter panel")`          |
| Coding agent editing a file      | `marigold docs <Component>`            | Resources auto-attached by IDE         |
| Upgrade to new version           | `marigold check` + `marigold migrate`  | `/migrate` prompt wraps the CLI        |
| CI pipeline                      | `marigold a11y --ci`                   | ❌ MCP not available in CI             |
| Developer in terminal            | `marigold list --category form`        | ❌ No MCP client in terminal           |
| Claude Desktop / v0 / web chat   | ❌ No shell access                     | Full MCP access                        |

### Implications for the CLI codebase

The CLI should be designed as a **library with a CLI entry point**, so the MCP server can import and call the same functions:

```typescript
// packages/cli/src/lib/docs.ts — shared logic
export async function getComponentDocs(name: string, options?: DocsOptions): Promise<ComponentDoc> { ... }

// packages/cli/src/bin/marigold.ts — CLI entry point
const doc = await getComponentDocs(args.component);
console.log(formatMarkdown(doc));

// MCP server (in docs/app/mcp/) — MCP entry point
import { getComponentDocs } from '@marigold/cli';
server.tool("get_component", async ({ name }) => {
  const doc = await getComponentDocs(name);
  return { content: [{ type: "text", text: doc.markdown }] };
});
```

This "library-first" architecture means:

- Zero code duplication between CLI and MCP server
- CLI can be tested independently
- MCP server stays thin — just protocol translation
- Other integrations (VS Code extension, Figma plugin) can import the same library

---

## The Manifest Endpoint

The CLI needs a machine-readable index of all available components. This is a new endpoint that should be added to the docs site.

**Route:** `GET /mcp/manifest.json`

**Purpose:**

- Powers `marigold list` (component discovery)
- Powers name resolution in `marigold docs` (fuzzy matching)
- Powers tab completion in shells
- Powers `--search` filtering

**Schema:**

```json
{
  "version": "7.5.0",
  "generatedAt": "2026-03-24T12:00:00Z",
  "baseUrl": "https://www.marigold-ui.io/mcp",
  "categories": [
    {
      "name": "actions",
      "label": "Actions",
      "components": [
        {
          "name": "ActionBar",
          "slug": "components/actions/actionbar",
          "description": "Floating bar with bulk actions for selected items."
        },
        {
          "name": "Button",
          "slug": "components/actions/button",
          "description": "Allows users to perform an action."
        }
      ]
    },
    {
      "name": "form",
      "label": "Form",
      "components": [
        {
          "name": "TextField",
          "slug": "components/form/textfield",
          "description": "Component for input forms."
        }
      ]
    }
  ],
  "pages": [
    {
      "title": "Form Patterns",
      "slug": "patterns/forms",
      "description": "Recommended patterns for building forms."
    },
    {
      "title": "Spacing",
      "slug": "foundations/spacing",
      "description": "Spacing scale and usage guidelines."
    }
  ]
}
```

**How to generate it:**

The manifest is generated from the same `getAllMdxFiles()` + `parseFrontmatter()` functions already in `parser.ts`. It should be a static route (`force-static`) generated at build time alongside the markdown routes.

---

## Output Formats

The CLI supports three output formats, selectable via `--format`:

### `markdown` (default for humans and AI agents)

Clean markdown rendered for the terminal. This is the default because:

- Markdown is the lingua franca of AI agents — they read and produce it natively
- Terminal rendering can add syntax highlighting and table alignment
- Sections, headings, and code blocks are preserved

### `json` (for scripting and structured agent consumption)

Structured JSON with parsed props, examples, and metadata. Useful when:

- An AI agent needs to validate its code against the actual prop types
- A CI script checks for deprecated component usage
- Another tool consumes Marigold metadata programmatically

### `plain` (for piping and minimal environments)

Strip all formatting. Useful for `grep`, `awk`, and other Unix tool chains:

```bash
# Find all components with a "loading" prop
marigold list --format json | jq '.[] | select(.props[] | .name == "loading")'

# Pipe docs into an LLM prompt
marigold docs TextField --format plain | pbcopy
```

---

## Caching Strategy

### Cache location

```
~/.cache/marigold/
  manifest.json          # Component index
  docs/
    components-actions-button.md
    components-form-textfield.md
    ...
```

Following the [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) — `$XDG_CACHE_HOME/marigold` or `~/.cache/marigold`.

### Cache behavior

| Scenario                    | Behavior                                      |
| --------------------------- | --------------------------------------------- |
| First request               | Fetch from API, write to cache                |
| Subsequent request (< 24h)  | Serve from cache                              |
| Subsequent request (>= 24h) | Fetch from API, update cache                  |
| `--fresh` flag              | Always fetch from API                         |
| `--offline` flag            | Only serve from cache (error if not cached)   |
| Network error               | Fall back to cache if available, error if not |

### Why 24-hour TTL

Marigold releases happen at most weekly. A 24-hour TTL means:

- During a normal workday, the first `marigold docs` call fetches fresh data; all subsequent calls are instant
- After a release, the cache refreshes within a day automatically
- `--fresh` is available for immediate updates when needed

---

## Package Structure

```
packages/cli/
  package.json
  tsconfig.json
  src/
    index.ts              # Entry point, argument parsing
    commands/
      docs.ts             # marigold docs <component>
      list.ts             # marigold list
      doctor.ts           # marigold doctor
      init.ts             # marigold init
    lib/
      manifest.ts         # Fetch and cache manifest.json
      fetch-docs.ts       # Fetch and cache markdown docs
      cache.ts            # XDG-compliant file cache
      resolve.ts          # Fuzzy component name resolution
      format.ts           # Output formatting (markdown, json, plain)
      detect-project.ts   # Framework/package manager detection (for doctor/init)
    bin/
      marigold.ts         # CLI binary entry point
```

### Dependencies (minimal)

The CLI should be lightweight. Proposed dependencies:

- **Argument parsing**: Node.js built-in `parseArgs` (Node 22+, no dependency needed)
- **Terminal formatting**: A single small library for colors/tables, or raw ANSI codes
- **HTTP**: Node.js built-in `fetch` (Node 22+, no dependency needed)
- **File system**: Node.js built-in `fs/promises`

No heavy dependencies. No bundler. No build step beyond TypeScript compilation. The CLI should install in under 2 seconds.

### Distribution

```json
{
  "name": "@marigold/cli",
  "bin": {
    "marigold": "./dist/bin/marigold.js"
  }
}
```

Installed via:

```bash
# Global (recommended for standalone use)
npm install -g @marigold/cli

# Local (for project-specific usage and CI)
pnpm add -D @marigold/cli

# One-off (no install)
npx @marigold/cli docs Button
```

---

## Open Questions

1. **Should the CLI live in the marigold monorepo or a separate repo?**
   - Monorepo: easier to keep in sync with docs, shared infrastructure
   - Separate: independent release cycle, simpler CI
   - Recommendation: monorepo (`packages/cli`), since it depends on the docs site's API

2. **Should `marigold init` handle Tailwind v4 specifically?**
   - Marigold currently uses Tailwind v4, which has a different config format
   - The init command needs to be aware of this

3. **Should we add shell completions in v1?**
   - Tab completion for component names would be very useful
   - Can be generated from the manifest
   - Adds complexity to the install process (bash/zsh/fish scripts)

4. **Docs site base URL: should it be configurable?**
   - For development: point to `localhost:3000`
   - For enterprise: point to an internal mirror
   - Default: `https://www.marigold-ui.io`
   - Configurable via `MARIGOLD_DOCS_URL` env var or `~/.config/marigold/config.json`
