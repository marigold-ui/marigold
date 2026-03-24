# Marigold MCP Server: Beyond Search

> **Status**: Proposal (extends PR #5233)
> **Scope**: MCP Resources, Prompts, and CLI-delegated Tools
> **Depends on**: CLI v1-v3 for core logic, PR #5233 for base MCP infrastructure

---

## Table of Contents

- [Context: What PR #5233 Provides Today](#context-what-pr-5233-provides-today)
- [The Three MCP Primitives](#the-three-mcp-primitives)
- [Why the MCP Server Should Wrap the CLI](#why-the-mcp-server-should-wrap-the-cli)
- [Resources: Contextual Knowledge](#resources-contextual-knowledge)
- [Tools: CLI-Delegated Actions](#tools-cli-delegated-actions)
- [Prompts: Workflow Templates](#prompts-workflow-templates)
- [Real-World Agent Scenarios](#real-world-agent-scenarios)
- [Architecture](#architecture)
- [Rollout Plan](#rollout-plan)

---

## Context: What PR #5233 Provides Today

PR #5233 adds an MCP server with a single tool:

- **`search_docs`**: Semantic vector search over the docs corpus using AWS Bedrock Titan embeddings and cosine similarity

This is valuable but underutilizes the MCP protocol. MCP has three primitives — **Tools**, **Resources**, and **Prompts** — and #5233 only uses one (Tools), with a single tool. The server's full potential is untapped.

The current `search_docs` tool is also doing something that a CLI can do faster and cheaper for exact lookups. Its true value is **fuzzy conceptual search** — the queries where you don't know the component name yet.

This document proposes expanding the MCP server to use all three primitives, with the CLI providing the core logic for Tools.

---

## The Three MCP Primitives

Understanding the three primitives is essential to designing the right CLI↔MCP split.

### Tools — "What can the AI do?"

Tools are **actions** that the AI agent invokes. The AI decides when and how to call them. They have input schemas and return results.

```
AI thinks: "The user wants to know about Button props"
AI calls: search_docs({ query: "Button props" })
AI receives: matching documentation chunks
```

Tools are the most familiar primitive — they're like function calls. Both CLI commands and MCP tools serve this role.

**Key property**: The AI must _decide_ to call a tool. If the AI doesn't realize it needs information, it won't call the tool.

### Resources — "What does the AI already know?"

Resources are **contextual data** that is available to the AI _before it asks_. The IDE client attaches them to the conversation based on context (what file is open, what project is configured).

```
User opens LoginForm.tsx (imports TextField, Button)
IDE client: attaches component://TextField/api, component://Button/api
AI now has: TextField props, variants, usage guidelines in context
User asks: "Add email validation"
AI already knows: TextField's errorMessage prop, description prop — no lookup needed
```

**Key property**: Resources are **proactive**. They eliminate the "AI doesn't know what it doesn't know" problem. The AI doesn't need to decide to look something up — the knowledge is already there.

**This is the MCP server's killer feature for design systems.** No CLI can replicate this behavior.

### Prompts — "How should the AI approach this?"

Prompts are **workflow templates** that the user invokes (like slash commands). They package expert knowledge into reusable multi-step instructions.

```
User types: /create-component DateRangePicker
MCP server returns: a structured prompt with scaffolding instructions,
  Marigold patterns, accessibility requirements, story template, etc.
AI follows the prompt to create a complete, correct component
```

**Key property**: Prompts encode **institutional knowledge** — the "how we do things here" that would otherwise require reading 5 different docs pages and understanding 3 different patterns.

### How the primitives complement each other

| Primitive    | When it activates             | Who controls it                 | CLI equivalent                       |
| ------------ | ----------------------------- | ------------------------------- | ------------------------------------ |
| **Tool**     | AI decides to call it         | AI (model-controlled)           | `marigold <command>`                 |
| **Resource** | IDE attaches based on context | Application (client-controlled) | None — CLI only outputs on demand    |
| **Prompt**   | User invokes explicitly       | User-controlled                 | None — CLI has no workflow packaging |

This is why the MCP server is not just "the CLI over a different protocol." Resources and Prompts are fundamentally new capabilities.

---

## Why the MCP Server Should Wrap the CLI

### The anti-pattern: duplicating logic

```
❌ Wrong: CLI and MCP server each implement docs lookup, scanning, etc.

CLI: parseMdxToMarkdown() → format → stdout
MCP: parseMdxToMarkdown() → format → MCP response

Two codepaths to maintain, test, and keep in sync.
```

### The pattern: CLI as library, MCP as interface

```
✅ Right: CLI is a library. MCP server imports and calls it.

@marigold/cli (library)
  ├── getComponentDocs(name) → ComponentDoc
  ├── listComponents(filter) → Component[]
  ├── scanProject(path) → UsageReport
  ├── checkUpgrade(target) → CompatibilityReport
  ├── inspectTheme(component, variant) → ResolvedStyles
  └── auditA11y(files) → A11yReport

CLI binary:
  calls library → formats for terminal → stdout

MCP server:
  calls library → formats for MCP protocol → MCP response
  ALSO exposes Resources and Prompts (no CLI equivalent)
```

### Benefits

| Benefit                    | Explanation                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Single source of truth** | Fix a bug in `getComponentDocs`, both CLI and MCP get the fix                                                                       |
| **Independent testing**    | Library functions are tested with unit tests. CLI is tested with integration tests. MCP server is tested with protocol-level tests. |
| **No protocol leakage**    | The library doesn't know about MCP or CLI — it returns plain TypeScript objects. Each interface formats as needed.                  |
| **Extensibility**          | A VS Code extension, Figma plugin, or CI integration can import the same library                                                    |

---

## Resources: Contextual Knowledge

Resources are the MCP server's primary differentiator. They provide knowledge that the AI always has access to, without needing to run a command.

### Proposed resources

#### `component://{name}/api`

**What it returns:** Props table, variant/size options, subcomponents, type definitions.

**When it's attached:** When the user opens a file that imports a Marigold component, the IDE client attaches the corresponding resource.

**Why this matters:** The AI knows the exact API surface before writing any code. No guessing, no looking up, no stale training data.

```
Resource URI: component://TextField/api
Content:
  # TextField API

  ## Props
  | Property     | Type                          | Default  | Description                    |
  |-------------|-------------------------------|----------|--------------------------------|
  | label        | string                        | -        | The label for the field        |
  | description  | string                        | -        | Help text below the field      |
  | errorMessage | string                        | -        | Error text (shown on invalid)  |
  | type         | 'text' | 'email' | 'password' | 'text'   | HTML input type                |
  | required     | boolean                       | false    | Whether the field is required  |
  | disabled     | boolean                       | false    | Whether the field is disabled  |
  | variant      | 'default' | (string & {})    | 'default'| Visual style variant           |
  | size         | 'default' | (string & {})    | 'default'| Size variant                   |
  | ...          |                               |          |                                |

  ## Subcomponents
  None (self-contained)

  ## Usage
  import { TextField } from '@marigold/components';
  <TextField label="Email" type="email" required />
```

**Implementation:** Calls `getComponentDocs(name, { section: 'props' })` from the CLI library.

#### `component://{name}/examples`

**What it returns:** Code examples for common usage patterns.

**When it's attached:** Same as above — when a file imports the component.

**Why this matters:** The AI has concrete code examples to follow, not just abstract API docs. This dramatically improves code generation quality.

```
Resource URI: component://TextField/examples
Content:
  # TextField Examples

  ## Basic
  <TextField label="Name" />

  ## With description
  <TextField
    label="Email"
    description="We'll never share your email"
  />

  ## With error
  <TextField
    label="Password"
    errorMessage="Password must be at least 8 characters"
  />

  ## Controlled
  const [value, setValue] = useState('');
  <TextField label="Search" value={value} onChange={setValue} />
```

**Implementation:** Calls `getComponentDocs(name, { section: 'examples' })` from the CLI library.

#### `theme://tokens`

**What it returns:** All design tokens from the active theme (colors, spacing, typography, borders, shadows).

**When it's attached:** Always available as a reference. Attached when the user works on styling or theme-related code.

**Why this matters:** The AI knows the exact token values and can make informed styling decisions. Instead of guessing `text-gray-500`, it knows the full color scale and can choose appropriately.

```
Resource URI: theme://tokens
Content:
  # Design Tokens (theme-rui)

  ## Colors
  --color-primary-50:   oklch(0.97 0.02 260)
  --color-primary-100:  oklch(0.93 0.05 260)
  ...
  --color-primary-900:  oklch(0.25 0.12 260)

  ## Spacing
  --spacing-0: 0
  --spacing-1: 0.25rem
  --spacing-2: 0.5rem
  ...

  ## Typography
  --text-xs: 0.75rem
  --text-sm: 0.875rem
  ...
```

**Implementation:** Calls `exportThemeTokens(theme, { format: 'markdown' })` from the CLI library (v3).

#### `theme://{component}/styles`

**What it returns:** The resolved styles for a specific component across all variants and sizes.

**When it's attached:** When the user is editing a component's theme styles or debugging a visual issue.

```
Resource URI: theme://Button/styles
Content:
  # Button Styles (theme-rui)

  ## Variants
  | Variant   | Classes                                              |
  |-----------|------------------------------------------------------|
  | primary   | bg-primary-500 text-white hover:bg-primary-600       |
  | secondary | bg-secondary-100 text-secondary-700                  |
  | ghost     | bg-transparent border border-current                 |
  | text      | bg-transparent text-primary-500 hover:underline      |

  ## Sizes
  | Size    | Classes                          |
  |---------|----------------------------------|
  | default | px-4 py-2 text-base              |
  | small   | px-3 py-1 text-sm                |
```

**Implementation:** Calls `inspectTheme(component)` from the CLI library (v3).

#### `docs://guidelines/{topic}`

**What it returns:** Design guidelines and best practices for a specific topic.

**When it's attached:** When the user is working on a pattern that matches the topic (forms, layouts, loading states, etc.).

```
Resource URI: docs://guidelines/forms
Content:
  # Form Patterns

  ## Recommended structure
  Use <Form> as the container with <Stack> for field layout...

  ## Validation
  Use validationBehavior="aria" for real-time validation...

  ## Error handling
  Pass validationErrors from the server response...
```

**Implementation:** Calls `getPageDocs('patterns/forms')` from the CLI library.

### Resource templates

All component resources use URI templates (RFC 6570):

```
component://{name}/api
component://{name}/examples
theme://{component}/styles
docs://guidelines/{topic}
```

The MCP client resolves `{name}` from context (e.g., the imports in the current file).

### Dynamic resource updates

When the docs site rebuilds (new version, new components), the MCP server's resources automatically reflect the changes because they delegate to the same data sources as the CLI.

---

## Tools: CLI-Delegated Actions

Tools wrap the CLI's commands for AI consumption. Each tool delegates to the CLI library.

### `search_docs` (existing from PR #5233)

Semantic vector search. This is the one tool that doesn't delegate to the CLI — it uses the embedding-based search pipeline that only the MCP server has.

```typescript
server.tool(
  'search_docs',
  {
    query: z.string().min(1).max(1000),
    limit: z.number().int().min(3).max(10).default(5),
  },
  async ({ query, limit }) => {
    // Uses vector embeddings — unique to MCP server
    const results = await semanticSearch(query, limit);
    return { content: [{ type: 'text', text: formatResults(results) }] };
  }
);
```

**When to use:** Fuzzy conceptual queries where the user doesn't know the exact component name.

### `get_component_docs` (new, delegates to CLI)

Direct component lookup. Faster and more precise than search for known components.

```typescript
import { getComponentDocs } from '@marigold/cli';

server.tool(
  'get_component_docs',
  {
    name: z.string(),
    section: z.enum(['all', 'props', 'usage', 'examples']).default('all'),
  },
  async ({ name, section }) => {
    const doc = await getComponentDocs(name, { section });
    return { content: [{ type: 'text', text: doc.markdown }] };
  }
);
```

**When to use:** The AI knows which component it needs and wants the full or partial docs.

### `list_components` (new, delegates to CLI)

Component discovery and filtering.

```typescript
import { listComponents } from '@marigold/cli';

server.tool(
  'list_components',
  {
    category: z.string().optional(),
    search: z.string().optional(),
  },
  async ({ category, search }) => {
    const components = await listComponents({ category, search });
    return {
      content: [{ type: 'text', text: formatComponentList(components) }],
    };
  }
);
```

### `scan_project` (new, delegates to CLI — v2)

Codebase analysis. Available when CLI v2 ships.

```typescript
import { scanProject } from '@marigold/cli';

server.tool(
  'scan_project',
  {
    path: z.string().default('.'),
    deprecated: z.boolean().default(false),
    replacements: z.boolean().default(false),
  },
  async ({ path, deprecated, replacements }) => {
    const report = await scanProject(path, { deprecated, replacements });
    return { content: [{ type: 'text', text: formatReport(report) }] };
  }
);
```

### `check_upgrade` (new, delegates to CLI — v2)

Pre-upgrade compatibility check.

```typescript
import { checkUpgrade } from '@marigold/cli';

server.tool(
  'check_upgrade',
  {
    target: z.string(),
  },
  async ({ target }) => {
    const report = await checkUpgrade(target);
    return { content: [{ type: 'text', text: formatReport(report) }] };
  }
);
```

### `inspect_theme` (new, delegates to CLI — v3)

Theme token and style resolution.

```typescript
import { inspectTheme } from '@marigold/cli';

server.tool(
  'inspect_theme',
  {
    component: z.string(),
    variant: z.string().optional(),
    size: z.string().optional(),
  },
  async ({ component, variant, size }) => {
    const styles = await inspectTheme(component, { variant, size });
    return { content: [{ type: 'text', text: formatStyles(styles) }] };
  }
);
```

### `audit_a11y` (new, delegates to CLI — v3)

Accessibility checking.

```typescript
import { auditA11y } from '@marigold/cli';

server.tool(
  'audit_a11y',
  {
    files: z.array(z.string()).optional(),
    level: z.enum(['AA', 'AAA']).default('AA'),
  },
  async ({ files, level }) => {
    const report = await auditA11y({ files, level });
    return { content: [{ type: 'text', text: formatReport(report) }] };
  }
);
```

---

## Prompts: Workflow Templates

Prompts package multi-step expert workflows into single invocations. The user triggers them explicitly (like slash commands).

### `/create-component`

**Purpose:** Scaffold a new Marigold component following all project conventions.

**Arguments:**

- `name` (required): Component name, e.g., "DateRangePicker"
- `type` (optional): "simple" | "compound" — default: "simple"

**What the prompt returns:**

A rich system message that instructs the AI to:

1. Check if a similar component already exists (`list_components` tool)
2. Read the closest existing component as a reference pattern
3. Create the component file with:
   - Proper RAC wrapping (remove `isDisabled`/`isPending`, add `disabled`/`loading`)
   - TypeScript interface extending RAC with `RemovedProps` pattern
   - `useClassNames` hook integration
   - `forwardRef` wrapping
   - Named exports
4. Create the story file with:
   - Meta configuration using `preview.meta()`
   - Basic, variant, and interaction stories
   - `play` functions with `tags: ['component-test']`
5. Create the test file importing stories
6. Create the theme style file with `cva()` patterns
7. Run `marigold doctor` to verify

**Why this is better than the AI figuring it out alone:** The prompt encodes patterns from CLAUDE.md, component conventions, testing patterns, and the theming system into one cohesive workflow. Without it, the AI would need to read 5+ files to understand the patterns, and might still miss subtleties like the `RemovedProps` pattern or the `preview.meta()` story format.

### `/migrate`

**Purpose:** Guide a full version upgrade.

**Arguments:**

- `target` (required): Target version, e.g., "8.0.0"

**What the prompt returns:**

Instructions that chain CLI tools:

1. Run `check_upgrade` to identify breaking changes
2. Present findings to the user and get confirmation
3. Run `scan_project --deprecated` to find additional cleanup opportunities
4. Execute migration with `marigold migrate --dry-run` first
5. Show the diff and get user approval
6. Apply changes
7. Update package versions
8. Run `marigold doctor` to verify
9. Run `marigold a11y` on changed files to catch regressions

### `/audit-a11y`

**Purpose:** Comprehensive accessibility audit with remediation.

**Arguments:**

- `scope` (optional): "project" | "changed" | specific file path

**What the prompt returns:**

Instructions to:

1. Run `audit_a11y` on the specified scope
2. Group findings by severity (errors first, then warnings)
3. For each error: explain the WCAG criterion, show the fix, offer to apply it
4. For contrast issues: use `inspect_theme` to trace the token cascade and suggest specific token changes
5. Generate a summary report

### `/explain-component`

**Purpose:** Deep-dive explanation of a component's architecture, accessibility model, and usage patterns.

**Arguments:**

- `name` (required): Component name

**What the prompt returns:**

Instructions to:

1. Fetch the component's full docs (`get_component_docs`)
2. Read the source code of the component
3. Explain: What react-aria component it wraps, what accessibility features are built in, what the consumer is responsible for, common pitfalls, and related components
4. Show examples from simple to complex

This is like having a senior Marigold developer explain a component to you.

---

## Real-World Agent Scenarios

### Scenario 1: Building a new feature (Resources shine)

```
Context: Developer opens a new file to build a settings page.
They write: import { TextField, Select, Switch, Card } from '@marigold/components'

IDE client:
  → Detects imports, attaches resources:
    component://TextField/api
    component://Select/api
    component://Switch/api
    component://Card/api

User: "Build a notification preferences form with email frequency
and push notification toggle"

AI already has: all four component APIs in context
AI writes correct code immediately:

<Card>
  <Stack space={4}>
    <Headline level={3}>Notification Preferences</Headline>
    <Select label="Email frequency">
      <Select.Option id="daily">Daily</Select.Option>
      <Select.Option id="weekly">Weekly</Select.Option>
      <Select.Option id="never">Never</Select.Option>
    </Select>
    <Switch defaultSelected>Push notifications</Switch>
    <TextField
      label="Custom email"
      type="email"
      description="Override the default notification email"
    />
  </Stack>
</Card>

Zero tool calls needed. The AI had everything it needed from Resources.
```

Compare without Resources (CLI-only):

```
AI thinks: "I need to look up 4 components"
AI runs: marigold docs TextField --format json
AI runs: marigold docs Select --format json
AI runs: marigold docs Switch --format json
AI runs: marigold docs Card --format json
→ 4 shell commands, 4 round trips, 4x context overhead
→ Same correct code, but slower and more expensive
```

### Scenario 2: Conceptual question (Search shines)

```
User: "What's the best way to show a confirmation before
deleting something?"

With CLI:
  AI doesn't know which component to look up
  AI might guess: marigold docs Modal ← wrong name
  AI might try: marigold list --search "confirm" ← finds nothing
  AI might try: marigold list --search "dialog" ← finds Dialog
  Eventually gets there, but it takes multiple attempts

With MCP search_docs:
  AI calls: search_docs("confirmation dialog before delete action")
  → Returns: Dialog docs (with AlertDialog pattern), Toast (for undo),
    feedback-messages pattern page
  → AI has comprehensive context in one call
```

### Scenario 3: Upgrade workflow (Prompts shine)

```
User types: /migrate 8.0.0

MCP returns prompt that instructs the AI to:

1. "First, check what will break:"
   AI calls: check_upgrade({ target: "8.0.0" })
   → 3 breaking changes, 12 files

2. "Present findings and ask for confirmation:"
   AI: "I found 3 breaking changes affecting 12 files. [details]
   92% can be auto-fixed. Proceed?"
   User: "Yes"

3. "Preview the changes:"
   AI calls: marigold migrate --from 7.3.0 --to 8.0.0 --dry-run
   AI: "Here's what will change: [shows diff]. Apply?"
   User: "Apply"

4. "Apply and verify:"
   AI calls: marigold migrate --from 7.3.0 --to 8.0.0
   AI calls: marigold doctor
   AI calls: audit_a11y on changed files
   AI: "Migration complete. All checks pass. [summary]"

Without the prompt, the AI would need to figure out this
multi-step workflow on its own — or the user would need to
guide it through each step manually.
```

### Scenario 4: New team member onboarding

```
User types: /explain-component DatePicker

MCP returns prompt, AI produces:

"## DatePicker

DatePicker is a compound input that combines a DateField
(keyboard input) with a Calendar (visual picker) in a Popover.

**Architecture:** It wraps react-aria's `useDatePicker` hook,
which handles:
- Keyboard navigation (arrow keys for date parts, Enter to open)
- Screen reader announcements ('selected date: March 24, 2026')
- Locale-aware formatting (dates render in user's locale)

**Your responsibilities as a consumer:**
- Always provide a `label` (required for accessibility)
- Use `minValue`/`maxValue` for date range constraints
- Handle `onChange` which gives you a CalendarDate object

**Common pitfall:** Don't use native <input type='date'> alongside
DatePicker — they have conflicting date formats and keyboard
handling.

**Related components:**
- DateField: keyboard-only date input (no calendar popup)
- Calendar: standalone calendar display (no text input)
- TimeField: time-only input (complements DatePicker)

[examples from simple to complex]"
```

---

## Architecture

### Package structure

```
packages/cli/
  src/
    lib/           ← Core library (shared between CLI and MCP)
      docs.ts
      list.ts
      scan.ts        (v2)
      check.ts       (v2)
      migrate.ts     (v2)
      theme.ts       (v3)
      a11y.ts        (v3)
    bin/
      marigold.ts  ← CLI entry point
    index.ts       ← Library exports

docs/app/mcp/
  route.ts         ← MCP server (wraps CLI library + adds search/resources/prompts)
  tools/
    search.ts      ← Vector search (MCP-only, not in CLI)
    cli-tools.ts   ← Thin wrappers around @marigold/cli functions
  resources/
    component.ts   ← component://{name}/* resources
    theme.ts       ← theme://* resources
    docs.ts        ← docs://* resources
  prompts/
    create-component.ts
    migrate.ts
    audit-a11y.ts
    explain-component.ts
```

### Dependency graph

```
@marigold/cli (library + CLI binary)
  ├── No dependency on MCP server
  ├── Fetches from /mcp/*.md static routes
  └── Local AST analysis (v2+)

MCP Server (docs/app/mcp/)
  ├── Imports @marigold/cli for Tools
  ├── Hosts vector search (search_docs)
  ├── Exposes Resources (CLI library → MCP format)
  ├── Exposes Prompts (workflow templates)
  └── Depends on: @modelcontextprotocol/sdk, @marigold/cli
```

### Data flow

```
                Build time
                ==========

MDX content → parser.ts → /mcp/*.md (static, CDN)
                        → /mcp/manifest.json
                        → chunks_search.json (embeddings)


           Runtime: CLI                Runtime: MCP Server
           ===========                =====================

Developer/Agent                    IDE Client (Cursor, VS Code, Claude)
     │                                  │
     ▼                                  ▼
CLI binary                         MCP Server
     │                                  │
     ▼                                  ├── Resources → CLI lib → /mcp/*.md
@marigold/cli lib                  │
     │                                  ├── Tools → CLI lib → /mcp/*.md
     ▼                                  │              → local AST (v2+)
/mcp/*.md (static)                 │
manifest.json                      ├── Prompts → workflow templates
Local AST (v2+)                    │
                                        └── search_docs → vector search
                                                         (MCP-only)
```

---

## Rollout Plan

The MCP server capabilities can be added incrementally, matching the CLI versions:

### Phase 1: With CLI v1

**Resources:**

- `component://{name}/api` — props and types
- `component://{name}/examples` — code examples
- `docs://guidelines/{topic}` — design guidelines

**Tools:**

- `search_docs` (already exists in PR #5233)
- `get_component_docs` — delegates to CLI
- `list_components` — delegates to CLI

**Prompts:**

- `/create-component` — scaffolding workflow
- `/explain-component` — deep-dive explanation

### Phase 2: With CLI v2

**New tools:**

- `scan_project` — codebase analysis
- `check_upgrade` — compatibility check

**New prompts:**

- `/migrate` — upgrade workflow
- `/audit-usage` — adoption analysis workflow

### Phase 3: With CLI v3

**New resources:**

- `theme://tokens` — all design tokens
- `theme://{component}/styles` — resolved component styles

**New tools:**

- `inspect_theme` — theme resolution
- `audit_a11y` — accessibility checking

**New prompts:**

- `/audit-a11y` — accessibility workflow
- `/debug-styles` — theme debugging workflow

### Connecting the MCP server

```bash
# Claude Code
claude mcp add marigold-docs --transport http https://www.marigold-ui.io/mcp

# VS Code (.vscode/mcp.json)
{
  "servers": {
    "marigold": {
      "url": "https://www.marigold-ui.io/mcp"
    }
  }
}

# Cursor (.cursor/mcp.json)
{
  "mcpServers": {
    "marigold": {
      "url": "https://www.marigold-ui.io/mcp"
    }
  }
}
```
