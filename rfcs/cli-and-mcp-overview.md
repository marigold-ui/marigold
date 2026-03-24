# Marigold CLI & MCP Server — Overview

> **Status**: Proposal
> **Related RFCs**:
> [cli-v1-docs-and-discovery.md](./cli-v1-docs-and-discovery.md) |
> [cli-v2-codebase-intelligence.md](./cli-v2-codebase-intelligence.md) |
> [cli-v3-theme-and-accessibility.md](./cli-v3-theme-and-accessibility.md) |
> [mcp-server-beyond-search.md](./mcp-server-beyond-search.md) |
> [mcp-killer-scenarios.md](./mcp-killer-scenarios.md) |
> [companion-chat.md](./companion-chat.md)

---

## The Problem

Developers using Marigold need component APIs, usage guidelines, and code examples while they code. Today this requires leaving the terminal to browse the docs site. AI coding agents (Claude Code, Cursor) have it worse — Marigold's API isn't in public training data, so they guess wrong.

## The Solution: Two Interfaces, One Library

A **CLI** for developers and coding agents with shell access, and an **MCP server** for AI agents in sandboxed environments (Claude Desktop, v0, Cursor chat). Both share a single core library.

```
┌─────────────────────────────────────────────┐
│               MCP Server                     │
│                                              │
│  Resources  (proactive context — MCP-only)   │
│  Prompts    (workflow templates — MCP-only)   │
│  Tools      (delegates to CLI library)        │
│  Search     (vector search — MCP-only)        │
└──────────────────┬──────────────────────────┘
                   │ imports
┌──────────────────▼──────────────────────────┐
│            @marigold/cli                     │
│                                              │
│  Core library   (shared logic)               │
│  CLI binary     (terminal interface)         │
└──────────────────┬──────────────────────────┘
                   │ fetches
              /mcp/*.md routes (static, CDN-cached)
              /mcp/manifest.json
```

### Why not just one or the other?

|                                       | CLI                                | MCP Server                                |
| ------------------------------------- | ---------------------------------- | ----------------------------------------- |
| **Token cost**                        | 4-10x cheaper (no schema overhead) | Expensive (tool schemas in every request) |
| **Auth**                              | None (public CDN routes)           | Keycloak OAuth required                   |
| **Offline**                           | Yes (local cache)                  | No                                        |
| **CI/CD**                             | Yes                                | No                                        |
| **Sandboxed AI** (Claude Desktop, v0) | No shell access                    | Yes                                       |
| **Proactive context**                 | No (must be invoked)               | Yes (Resources auto-attach)               |
| **Semantic search**                   | No                                 | Yes (vector embeddings)                   |
| **Workflow templates**                | No                                 | Yes (Prompts)                             |

---

## Architecture: CLI Does NOT Query MCP

The dependency flows one direction: **MCP wraps CLI**, never the reverse.

The CLI fetches from the same static `/mcp/*.md` routes that already exist on the docs site. These are CDN-cached, require no auth, and respond in ~50ms. Having the CLI route through the MCP server would add auth complexity, latency, and a single point of failure for zero benefit.

The CLI is built as a **library with a CLI entry point**, so the MCP server imports the same functions:

```typescript
// Shared library
export function getComponentDocs(name: string): Promise<ComponentDoc> { ... }

// CLI calls it
const doc = await getComponentDocs('Button');
console.log(formatMarkdown(doc));

// MCP server calls the same function
server.tool("get_component_docs", schema, async ({ name }) => {
  const doc = await getComponentDocs(name);
  return { content: [{ type: "text", text: doc.markdown }] };
});
```

---

## What the MCP Server Uniquely Provides

The MCP protocol has three primitives. The CLI can only replicate **Tools**. **Resources** and **Prompts** are the MCP server's unique value.

### Resources — proactive context

Resources are knowledge injected into the AI's context _without being asked_. When a user opens a file importing `TextField`, the IDE client attaches `component://TextField/api` automatically. The AI knows the exact props before the user asks anything.

With CLI, the AI must: recognize it doesn't know → decide to run `marigold docs TextField` → wait → read output. Resources skip this entire loop.

### Prompts — packaged workflows

Prompts are slash commands that package multi-step expert workflows:

- `/create-component DateRangePicker` — scaffolding with all Marigold conventions
- `/migrate 8.0.0` — guided upgrade with check → dry-run → apply → verify
- `/audit-a11y` — accessibility analysis with remediation guidance
- `/explain-component DatePicker` — deep architectural explanation

### Semantic search — conceptual queries

The existing `search_docs` tool (PR #5233) handles queries where you don't know the component name: "How do I show a confirmation before deleting?" → finds Dialog, AlertDialog pattern, Toast for undo.

---

## CLI Roadmap

### v1: Documentation & Discovery

| Command                                | What it does                                                             |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `marigold docs Button`                 | Fetch component docs (props, variants, examples, guidelines)             |
| `marigold docs Button --section props` | Just the props table                                                     |
| `marigold list --category form`        | List available components                                                |
| `marigold doctor`                      | Diagnose setup issues (version mismatches, missing theme, provider)      |
| `marigold init`                        | Set up Marigold in a project (install, configure Tailwind, add provider) |

**Data source**: Fetches from existing `/mcp/*.md` static routes. Caches locally (24h TTL). No new infrastructure.

### v2: Codebase Intelligence

| Command                         | What it does                                                                     |
| ------------------------------- | -------------------------------------------------------------------------------- |
| `marigold scan`                 | Analyze project — component usage, prop patterns, adoption rate, deprecated APIs |
| `marigold check --target 8.0.0` | Pre-upgrade compatibility — which breaking changes affect YOUR code              |
| `marigold migrate --to 8.0.0`   | Auto-fix breaking changes via AST codemods                                       |
| `marigold migrate --dry-run`    | Preview changes before applying                                                  |

**Why this is the differentiator**: Marigold is an installed dependency (unlike shadcn which copies code). We know exactly what version consumers have, which components they import, and which props they use. This enables personalized migration guides and automatic fixes that shadcn-style systems cannot offer.

### v3: Theme & Accessibility

| Command                                           | What it does                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| `marigold theme inspect Button --variant primary` | Resolve full style cascade (cva → Tailwind → CSS vars → final values) |
| `marigold theme diff theme-rui ./custom-theme`    | Compare two themes side by side                                       |
| `marigold theme validate ./custom-theme`          | Check for missing tokens, components, format issues                   |
| `marigold theme export --format css`              | Export tokens as CSS, JSON, TypeScript, or DTCG                       |
| `marigold a11y`                                   | Static accessibility audit (contrast, labels, keyboard, headings)     |
| `marigold a11y --ci --format sarif`               | CI integration with GitHub Code Scanning                              |

---

## How AI Agents Use This

### CLAUDE.md integration (recommended)

```markdown
## Marigold CLI

When working with Marigold components, use the `marigold` CLI:

- `marigold docs <Component>` — Look up props, variants, examples
- `marigold list` — Discover available components
- `marigold doctor` — Diagnose setup issues

Always run `marigold docs <Component>` before using a component you
haven't seen in the current conversation. Do not guess props from
training data.
```

### Typical agent workflow

```
User: "Create a login form with email and password"

Agent runs: marigold docs TextField --format json
Agent runs: marigold docs Button --section props
Agent runs: marigold docs Form --section props

Agent writes correct code on the first try — right prop names,
right variants, right patterns.
```

### MCP Resources make this even faster

```
User opens LoginForm.tsx (imports TextField, Button, Form)
IDE auto-attaches: component://TextField/api, component://Button/api, component://Form/api
Agent already knows all three APIs — zero commands needed.
```

---

## Key Design Decisions

| Decision                                                  | Rationale                                                               |
| --------------------------------------------------------- | ----------------------------------------------------------------------- |
| CLI fetches from `/mcp/*.md`, not the MCP server          | No auth needed, CDN-fast, works offline                                 |
| MCP server wraps CLI, not the reverse                     | Single source of truth, no code duplication                             |
| CLI is a library with a binary entry point                | MCP server imports the same functions                                   |
| `migrate` is a CLI command, not an MCP tool               | Too destructive for autonomous AI invocation                            |
| `search_docs` stays MCP-only                              | Needs vector embeddings; CLI uses manifest for exact lookups            |
| 24h cache TTL                                             | Marigold releases at most weekly; `--fresh` flag for immediate updates  |
| Manifest endpoint (`/mcp/manifest.json`)                  | Powers `list`, fuzzy name resolution, tab completion                    |
| `--format json` on all commands                           | Enables structured agent consumption and scripting                      |
| Minimal dependencies (Node built-in `fetch`, `parseArgs`) | CLI installs in <2 seconds                                              |
| Anonymous telemetry from day one                          | Data-driven v2/v3 priorities; detached process pattern for zero latency |
| Opt-out via env var, CLI command, or `DO_NOT_TRACK`       | GDPR-friendly, follows Next.js/Storybook conventions                    |

---

## What Needs to Be Built

### New (docs site)

- `/mcp/manifest.json` route — component index with names, slugs, categories, descriptions
- `/mcp/changelog.json` route — structured breaking changes per version (for `check`/`migrate`)
- `/api/telemetry` route — receives anonymous CLI usage events
- MCP Resources, Prompts, and CLI-delegated Tools (extending PR #5233)

### New (monorepo)

- `packages/cli/` — CLI package with library exports, binary entry point, and telemetry

### Already exists (reused as-is)

- `/mcp/*.md` static routes — resolved component docs (parser.ts pipeline)
- `/mcp/[...slug]/route.ts` — static route handler
- `docs/app/mcp/parser.ts` — MDX → markdown pipeline with ts-morph props extraction
- `docs/app/mcp/build.ts` — batch build script
- PR #5233 — MCP server with `search_docs` and OAuth
