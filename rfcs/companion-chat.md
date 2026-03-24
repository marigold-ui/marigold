# Marigold Companion: Chat Interface & Claude Code Plugin

> **Status**: Proposal
> **Related**: [mcp-server-beyond-search.md](./mcp-server-beyond-search.md) | [mcp-killer-scenarios.md](./mcp-killer-scenarios.md) | [cli-and-mcp-overview.md](./cli-and-mcp-overview.md)

---

## Table of Contents

- [Motivation](#motivation)
- [Two Surfaces, One Backend](#two-surfaces-one-backend)
- [Shared Backend](#shared-backend)
  - [RAG Pipeline](#rag-pipeline)
  - [Authentication](#authentication)
  - [Reuse from MCP Server](#reuse-from-mcp-server)
- [Surface 1: Claude Code Plugin](#surface-1-claude-code-plugin)
  - [Why Claude Code](#why-claude-code)
  - [Skill Design: `/ask-marigold`](#skill-design-ask-marigold)
  - [How It Uses the MCP Server](#how-it-uses-the-mcp-server)
  - [Code Generation Focus](#code-generation-focus)
  - [Plugin Structure](#plugin-structure)
- [Surface 2: Docs Site Chat](#surface-2-docs-site-chat)
  - [Who It's For](#who-its-for)
  - [Chat UI](#chat-ui)
  - [API Route: `/api/chat`](#api-route-apichat)
  - [Streaming Response](#streaming-response)
- [Feedback System](#feedback-system)
  - [Collection](#collection)
  - [Storage](#storage)
  - [What Feedback Enables](#what-feedback-enables)
- [Architecture](#architecture)
- [Open Questions](#open-questions)

---

## Motivation

The MCP server (PR #5233) provides semantic search over Marigold documentation. The CLI (v1 RFC) provides terminal access to component docs. But neither is a **conversational** interface — neither lets someone simply ask "How do I build a settings page with a form that validates on submit?" and get a complete, code-ready answer.

A conversational companion solves three problems that docs and CLIs don't:

1. **Composition questions**: "How do these 5 components work together?" — requires synthesizing multiple docs pages into one coherent answer with working code
2. **Intent-to-code**: "I need a filter panel" — requires understanding intent, selecting components, and generating a complete implementation
3. **Accessibility for non-developers**: Designers and PMs need to understand the design system too, but they won't use a CLI or read API docs

### Why not just use the MCP server directly?

The MCP server returns raw documentation chunks. It doesn't:

- Synthesize multiple chunks into a coherent answer
- Generate code that composes multiple components
- Explain _why_ one component is better than another for a use case
- Adapt its response to the audience (developer vs. designer)

The companion adds the **conversational layer** — an LLM that uses the MCP server's knowledge to have a helpful, contextual conversation.

---

## Two Surfaces, One Backend

The companion exists in two places, serving different audiences with the same knowledge:

| Surface                                  | Who                                 | When                               | Output                                                        |
| ---------------------------------------- | ----------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| **Claude Code plugin** (`/ask-marigold`) | Developers coding with Marigold     | "How do I...?" while editing files | Code-ready: imports, JSX, correct props — directly applicable |
| **Docs site chat**                       | Designers, PMs, developers browsing | Exploring, learning, comparing     | Explanation-ready: prose, links to docs, visual examples      |

Both surfaces share the same backend: Keycloak auth, semantic search, embedding pipeline, and documentation corpus. The difference is the interface and how the LLM is instructed to format its output.

```
┌──────────────────────────────────────────────┐
│              Shared Backend                   │
│                                               │
│  chunks_search.json  (vector embeddings)      │
│  /mcp/*.md routes    (full component docs)    │
│  Keycloak OIDC       (authentication)         │
│  Semantic search     (cosine similarity)      │
│  LLM                 (response generation)    │
│                                               │
├───────────────────┬──────────────────────────┤
│                   │                           │
│  MCP Server       │  /api/chat                │
│  (tools +         │  (RAG pipeline +          │
│   resources)      │   streaming)              │
│                   │                           │
│       ↓           │       ↓                   │
│  Claude Code      │  Docs site                │
│  /ask-marigold    │  chat widget              │
│  skill            │                           │
│                   │                           │
└───────────────────┴──────────────────────────┘
```

---

## Shared Backend

### RAG Pipeline

The core of the companion is a Retrieval-Augmented Generation (RAG) pipeline. It prevents hallucination by grounding every answer in actual Marigold documentation.

```
User question
     │
     ▼
1. Embed the question
   (AWS Bedrock Titan v2 — same model as MCP server)
     │
     ▼
2. Semantic search over chunks_search.json
   (cosine similarity — same as MCP server's search_docs)
   → Returns top 5-10 relevant documentation chunks
     │
     ▼
3. (Optional) Fetch full docs for mentioned components
   GET /mcp/components/form/textfield.md
   → Ensures complete API reference is available
     │
     ▼
4. Construct LLM prompt
   System: "You are a Marigold Design System assistant..."
   Context: [retrieved documentation chunks]
   User: [original question]
     │
     ▼
5. Stream LLM response
   (grounded in retrieved docs, with source links)
     │
     ▼
6. Return response + source references
```

### Why RAG instead of fine-tuning

| Approach                                       | Pros                                                                               | Cons                                                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **RAG** (retrieve docs → feed to LLM)          | Always up-to-date (docs change, RAG adapts), transparent sources, no training cost | Slightly slower (retrieval step), limited by chunk quality                                        |
| **Fine-tuning** (train model on Marigold docs) | Faster responses, potentially deeper understanding                                 | Stale immediately after training, expensive to retrain, no source attribution, hallucination risk |

RAG is the right choice because Marigold's API changes with every release. Fine-tuned knowledge goes stale; retrieved knowledge is always current.

### Authentication

Both surfaces require Keycloak authentication. The MCP server (PR #5233) already implements this:

```typescript
// Existing in PR #5233 — reuse directly
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.OIDC_AUTHORITY}/protocol/openid-connect/certs`)
);

async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, JWKS, {
    audience: process.env.OIDC_CLIENT_ID,
  });
  return payload;
}
```

**For Claude Code**: The MCP server already handles OAuth. When a user connects the MCP server via `claude mcp add`, the browser-based Keycloak login flow runs automatically.

**For the docs site chat**: The docs site can use the same Keycloak OIDC provider. Users log in once, and the chat widget becomes available. The JWT is sent with each `/api/chat` request.

### Reuse from MCP Server

The companion reuses nearly everything from PR #5233:

| Component                                  | Already built in PR #5233 | New for companion |
| ------------------------------------------ | ------------------------- | ----------------- |
| Embedding pipeline (chunker + embedder)    | Yes                       | No                |
| `chunks_search.json` (precomputed vectors) | Yes                       | No                |
| Query embedding (Bedrock Titan v2)         | Yes                       | No                |
| Cosine similarity search                   | Yes                       | No                |
| Keycloak JWT verification                  | Yes                       | No                |
| OAuth Protected Resource metadata          | Yes                       | No                |
| `/mcp/*.md` static docs routes             | Yes                       | No                |
| LLM prompt construction                    | —                         | **Yes**           |
| Streaming response generation              | —                         | **Yes**           |
| Chat UI component                          | —                         | **Yes**           |
| `/api/chat` route                          | —                         | **Yes**           |
| Feedback collection                        | —                         | **Yes**           |
| `/ask-marigold` skill                      | —                         | **Yes**           |

The new work is the conversational layer on top of the existing retrieval infrastructure.

---

## Surface 1: Claude Code Plugin

### Why Claude Code

Developers working with Marigold are most likely using Claude Code (or Cursor/VS Code with AI). This is where they write code, and this is where they need Marigold knowledge.

The companion in Claude Code is not a separate chat window — it's the same Claude Code conversation, enriched with Marigold expertise via the MCP server and a dedicated skill.

### Skill Design: `/ask-marigold`

The skill is a prompt template that instructs Claude to use the MCP server tools to answer Marigold questions with accurate, code-ready responses.

```markdown
---
name: ask-marigold
description: >
  Ask questions about the Marigold Design System and get code-ready
  answers grounded in actual documentation. Use when the user asks
  about Marigold components, patterns, theming, accessibility, or
  how to build something with Marigold. Generates complete, correct
  code using real component APIs — never guesses prop names.
argument-hint: '[your question]'
---

# Ask Marigold

You are answering a question about the Marigold Design System. Your
answers MUST be grounded in actual Marigold documentation retrieved
via the marigold-docs MCP server. Never guess component APIs, prop
names, or patterns from training data.

## Step 1: Understand the question

Parse `$ARGUMENTS` to understand what the user is asking. Classify:

- **Component lookup**: "What props does X have?" → direct docs fetch
- **Comparison**: "What's the difference between X and Y?" → fetch both
- **Composition**: "How do I build X?" → search for patterns, then
  fetch all involved component docs
- **Troubleshooting**: "Why doesn't X work?" → fetch component docs
  and check for common pitfalls

## Step 2: Retrieve documentation

Use the marigold-docs MCP server tools:

1. Call `search_docs` with the user's question to find relevant docs
2. For any specific component mentioned in the results, fetch the
   full documentation via:
```

curl -s https://www.marigold-ui.io/mcp/components/<category>/<name>.md

```
3. Read ALL retrieved documentation before generating a response

## Step 3: Generate response

Based on the retrieved documentation:

- **Always include working code** with correct imports
- **Use exact prop names** from the docs (not training data)
- **Show complete compositions** (don't just show one component in
isolation if the question involves multiple)
- **Include layout components** (Stack, Inline, Columns) where
appropriate — don't use raw divs
- **Explain your component choices** briefly ("I chose ComboBox over
Select because you need type-ahead filtering")
- **Link to source docs**: "See: [TextField docs](https://www.marigold-ui.io/components/form/textfield)"

## Step 4: Offer next steps

After answering, suggest what the user might want to do next:
- "Want me to add this to your file?"
- "Need me to look up the theming options for this component?"
- "Should I check if your current code follows this pattern?"
```

### How It Uses the MCP Server

The skill doesn't implement search or docs retrieval itself — it instructs Claude to use the MCP server's existing tools:

```
User: /ask-marigold How do I build a data table with sorting
and pagination?

Claude Code (following the skill):
1. Calls MCP: search_docs("data table sorting pagination")
   → Returns: Table docs, Pagination docs, collection patterns

2. Fetches: /mcp/components/collection/table.md
   Fetches: /mcp/components/navigation/pagination.md

3. Reads all documentation

4. Generates:

   import { Table, Pagination } from '@marigold/components';
   import { useAsyncListData } from '@marigold/components';

   const list = useAsyncListData({
     load: async ({ cursor }) => {
       const res = await fetch(`/api/data?page=${cursor || 1}`);
       const data = await res.json();
       return { items: data.items, cursor: data.nextPage };
     },
   });

   <Stack space={4}>
     <Table
       aria-label="Products"
       sortDescriptor={sortDescriptor}
       onSortChange={setSortDescriptor}
     >
       <Table.Header>
         <Table.Column id="name" allowsSorting>Name</Table.Column>
         <Table.Column id="price" allowsSorting>Price</Table.Column>
         <Table.Column id="status">Status</Table.Column>
       </Table.Header>
       <Table.Body items={list.items}>
         {(item) => (
           <Table.Row>
             <Table.Cell>{item.name}</Table.Cell>
             <Table.Cell>{item.price}</Table.Cell>
             <Table.Cell>{item.status}</Table.Cell>
           </Table.Row>
         )}
       </Table.Body>
     </Table>
     <Pagination
       count={totalPages}
       page={currentPage}
       onChange={setCurrentPage}
     />
   </Stack>

   See: [Table docs](https://www.marigold-ui.io/components/collection/table)
   See: [Pagination docs](https://www.marigold-ui.io/components/navigation/pagination)

5. "Want me to add this to your current file? Or should I look
    up the sorting implementation in detail?"
```

### Code Generation Focus

The Claude Code companion is primarily a **code generator**, not a documentation browser. Every answer should include runnable code. This is what distinguishes it from just reading docs:

| Question type                  | Docs give you                        | Companion gives you                                                                                     |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| "How do I use TextField?"      | Props table, isolated examples       | A `TextField` configured for your specific use case, with the right variant, in a form, with validation |
| "Build a filter panel"         | Nothing (no single page covers this) | A complete `Form` + `Select` + `Slider` + `SearchField` composition with state management               |
| "What's wrong with my Dialog?" | Dialog docs                          | Analysis of your code + the correct pattern from docs                                                   |

### Plugin Structure

Extend the existing `create-marigold-app` plugin:

```
packages/create-marigold-app/
  .claude-plugin/
    plugin.json                          # add ask-marigold skill reference
    marketplace.json
  skills/
    create-marigold-app/
      SKILL.md                           # existing
    ask-marigold/
      SKILL.md                           # new — the skill described above
```

The plugin already exists and is published. Adding a new skill is a single file addition.

**Prerequisite**: The user must have the MCP server connected:

```bash
claude mcp add marigold-docs --transport http https://www.marigold-ui.io/mcp
```

The skill's documentation should note this and offer to set it up if not configured.

---

## Surface 2: Docs Site Chat

### Who It's For

The docs site chat serves people who are **not in a code editor**:

- **Designers** checking if a component supports their design intent
- **Product managers** understanding what's possible with the design system
- **Developers browsing** before they start coding — exploring options
- **New team members** learning the system for the first time

### Chat UI

A floating chat widget on the docs site, gated behind Keycloak login:

```
┌──────────────────────────────────────────┐
│  marigold-ui.io/components/form/textfield │
│                                           │
│  [normal docs page content]               │
│                                           │
│                                           │
│                          ┌───────────────┐│
│                          │ 🌼 Ask        ││
│                          └───────────────┘│
│   Click opens:                            │
│   ┌──────────────────────────────────┐    │
│   │  Ask Marigold              ✕     │    │
│   │                                  │    │
│   │  How can I help with Marigold?   │    │
│   │                                  │    │
│   │  ┌────────────────────────────┐  │    │
│   │  │ Type your question...     │  │    │
│   │  └────────────────────────────┘  │    │
│   │                                  │    │
│   │  Suggestions:                    │    │
│   │  • How do I build a form?        │    │
│   │  • What's the difference between │    │
│   │    Select and ComboBox?          │    │
│   │  • Show me all layout components │    │
│   └──────────────────────────────────┘    │
└───────────────────────────────────────────┘
```

**Design decisions:**

- **Floating widget** (not a full page): Doesn't disrupt the normal docs browsing flow. The user can reference the docs page while chatting.
- **Ephemeral**: No conversation history. Each session starts fresh. Avoids storage costs and privacy concerns.
- **Suggestions**: Pre-populated questions based on the current docs page. On the TextField page, suggest "How do I add validation to TextField?" On the patterns page, suggest "Show me a complete form example."
- **Source links**: Every answer includes links to the docs pages it drew from, so the user can dive deeper.

### API Route: `/api/chat`

```typescript
// docs/app/api/chat/route.ts
import { streamText } from 'ai';
import { loadVectorStore, searchChunks } from '../mcp/search';
import { withChatAuth } from './auth';

export const POST = withChatAuth(async (req, user) => {
  const { message } = await req.json();

  // 1. Semantic search for relevant documentation
  const vectorStore = await loadVectorStore();
  const chunks = await searchChunks(vectorStore, message, { limit: 8 });

  // 2. Build context from retrieved chunks
  const context = chunks
    .map(c => `## ${c.metadata.heading}\n\n${c.text}`)
    .join('\n\n---\n\n');

  // 3. Stream LLM response grounded in retrieved docs
  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Use the following Marigold documentation to answer the question.
Do not make up component APIs — only use what's in the documentation below.
If the documentation doesn't cover the question, say so.

DOCUMENTATION:
${context}

QUESTION:
${message}`,
      },
    ],
  });

  return result.toTextStreamResponse();
});
```

### System Prompt

The system prompt shapes the companion's personality and behavior:

```typescript
const SYSTEM_PROMPT = `You are the Marigold Design System companion — a helpful
assistant that answers questions about Marigold components, patterns, and theming.

RULES:
1. ONLY use information from the provided documentation context.
   Never guess component props, variant names, or API details.
2. When showing code, always include import statements.
3. Use Marigold layout components (Stack, Inline, Columns) instead of raw HTML.
4. When multiple components could work, explain the tradeoffs.
5. Always end with links to relevant documentation pages using the format:
   📖 [Component Name](https://www.marigold-ui.io/components/category/name)
6. If the question is outside Marigold's scope, say so politely.
7. Keep answers concise. Lead with the code or the answer, not the preamble.
8. For design questions (not code), explain the component's purpose and when
   to use it, without assuming the reader knows React.`;
```

### Streaming Response

Responses stream token-by-token for a responsive feel. The chat UI renders markdown in real-time (code blocks, tables, links).

The response always ends with source references:

```
Here's how to build a notification preferences form:

[code block with complete implementation]

I used Stack for vertical layout and Switch for the toggle
because it provides built-in accessibility (role="switch",
keyboard support) that a custom checkbox toggle wouldn't have.

📖 [Switch](https://www.marigold-ui.io/components/form/switch)
📖 [Form](https://www.marigold-ui.io/components/form/form)
📖 [Form Patterns](https://www.marigold-ui.io/patterns/forms)
```

---

## Feedback System

Both surfaces collect feedback to improve retrieval quality and identify documentation gaps.

### Collection

After each companion response, show thumbs up/down:

**Claude Code** (via skill instruction):

```markdown
After answering, ask:
"Was this helpful? (If not, tell me what was wrong and I'll
look up more specific docs)"
```

The skill can't collect structured feedback (no API call), but it enables the user to iterate. The MCP server could expose a `submit_feedback` tool for structured collection.

**Docs site chat** (UI buttons):

```
┌─────────────────────────────────────┐
│  [assistant response]               │
│                                     │
│  👍  👎  Was this helpful?          │
│                                     │
│  [If 👎 clicked:]                   │
│  What was wrong?                    │
│  ○ Answer was incorrect             │
│  ○ Code didn't work                 │
│  ○ Didn't answer my question        │
│  ○ Other: [____________]            │
└─────────────────────────────────────┘
```

### Storage

```typescript
// POST /api/chat/feedback

interface ChatFeedback {
  sessionId: string; // ephemeral session ID
  messageId: string; // which response
  rating: 'up' | 'down';
  reason?: string; // optional, from the radio options
  query: string; // the original question
  chunkIds: string[]; // which doc chunks were retrieved
  timestamp: string;
}
```

Storage options (same decision as CLI telemetry):

- **PostHog**: Custom events, built-in dashboards, correlate with CLI telemetry
- **Simple database table**: Vercel Postgres or similar, query with SQL

### What Feedback Enables

| Signal                              | What it tells you                                                                 | Action                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 👎 on a specific component question | The docs for that component are insufficient or the chunking split important info | Improve docs, adjust chunk boundaries                                   |
| 👎 with "Code didn't work"          | The LLM hallucinated props or the docs are outdated                               | Check if the MDX → markdown pipeline missed something                   |
| 👎 with "Didn't answer my question" | The semantic search didn't retrieve the right chunks                              | Review the embedding for that topic, possibly add more explicit content |
| 👍 on composition questions         | The RAG pipeline handles multi-component questions well                           | Validate the pattern and consider adding it as a docs page              |
| Low 👍 rate on a topic              | Systematic gap in documentation coverage                                          | Write new docs for that topic                                           |
| High volume on a single question    | Many people have the same question                                                | Promote the answer to a prominent place in the docs                     |

Feedback data also helps tune the RAG pipeline:

- **Retrieval quality**: If 👎 responses consistently have low similarity scores, the embedding model may need adjustment
- **Chunk granularity**: If 👎 responses have high similarity but wrong chunks, the chunking strategy needs work
- **Number of chunks**: If answers improve with more context, increase the retrieval limit

---

## Architecture

### Full system diagram

```
                              Build Time
                              ==========

docs/content/**/*.mdx
    │
    ├── parser.ts ────→ /mcp/*.md (static, CDN-cached)
    │                    /mcp/manifest.json
    │
    └── chunker.ts ──→ embedder.ts ──→ chunks_search.json
                                       (precomputed vectors)


                        Runtime: MCP Server
                        ====================

Claude Code ──→ MCP Server (/mcp route)
Cursor            │
VS Code           ├── search_docs (semantic search)
                  ├── get_component_docs
                  ├── Resources (component APIs)
                  ├── Prompts (/create-component, etc.)
                  └── Auth: Keycloak OAuth


                     Runtime: Chat API
                     =================

Docs site ──→ /api/chat
chat widget     │
                ├── 1. Verify Keycloak JWT
                ├── 2. Embed query (Bedrock Titan v2)
                ├── 3. Search chunks_search.json
                ├── 4. Fetch full /mcp/*.md for top components
                ├── 5. Construct RAG prompt
                ├── 6. Stream LLM response
                └── 7. Return with source links


                  Runtime: Claude Code Plugin
                  ===========================

/ask-marigold skill
    │
    ├── Instructs Claude to call MCP tools
    │   (search_docs, get_component_docs)
    │
    ├── Claude reads retrieved documentation
    │
    └── Claude generates code-ready response
        grounded in actual docs


                  Feedback Loop
                  =============

Both surfaces ──→ /api/chat/feedback
                     │
                     └── Storage (PostHog or database)
                         │
                         ├── Dashboard: answer quality metrics
                         ├── Alert: low satisfaction on topic X
                         └── Input: docs improvement priorities
```

### What to build, in order

**Phase 1: Claude Code skill** (smallest effort, highest developer impact)

1. Add `skills/ask-marigold/SKILL.md` to the existing plugin
2. Test with the MCP server from PR #5233
3. No new backend infrastructure needed — uses existing MCP tools

**Phase 2: Docs site chat API**

1. Extract semantic search logic from MCP route into shared module
2. Build `/api/chat` route with RAG pipeline
3. Add Keycloak auth middleware (reuse from MCP server)
4. Choose LLM provider (AI Gateway recommended)

**Phase 3: Docs site chat UI**

1. Build floating chat widget component
2. Markdown rendering with streaming support
3. Context-aware suggestions (based on current page)
4. Feedback buttons (thumbs up/down)

**Phase 4: Feedback pipeline**

1. `/api/chat/feedback` endpoint
2. Storage (PostHog or database)
3. Dashboard for monitoring answer quality

---

## Open Questions

1. **LLM provider for docs site chat**
   - AI Gateway (`anthropic/claude-sonnet-4.6`) — unified billing, failover, cost tracking
   - Direct Anthropic API — simpler, but requires managing API keys
   - Recommendation: AI Gateway if the docs site is on Vercel, direct API otherwise

2. **Rate limiting**
   - How many questions per user per day?
   - Suggestion: 50/day for authenticated users (generous, covers a full exploration session)
   - Show remaining quota in the UI

3. **Context window management**
   - Ephemeral sessions mean no conversation history to manage
   - But within a session, should follow-up questions include previous Q&A?
   - Suggestion: Include the last 2-3 exchanges as conversation context (still ephemeral — not persisted)

4. **Page-aware context**
   - Should the chat widget automatically include the current docs page as context?
   - "I'm on the TextField page and I ask 'how do I add validation'" — the companion should know I mean TextField
   - Suggestion: Yes, include the current page's `/mcp/*.md` content as baseline context

5. **Should the skill auto-configure the MCP server?**
   - If the user runs `/ask-marigold` without the MCP server connected, what happens?
   - Option A: Skill detects missing MCP and offers to set it up
   - Option B: Skill falls back to direct HTTP fetches (no MCP needed)
   - Recommendation: Option B for resilience — the skill can fetch `/mcp/*.md` routes directly via curl. MCP tools are a bonus, not a requirement.

6. **Should the companion know about the user's codebase?**
   - In Claude Code, the companion could read the user's files for context
   - "How do I add a date picker to my filter panel?" — companion reads the filter panel file, understands the existing pattern, generates code that fits
   - This happens naturally in Claude Code (it already has file access). The skill should encourage it: "Read the user's file first if they reference one"

7. **Branding and personality**
   - Should the companion have a name? "Marigold Assistant"? "Ask Marigold"?
   - Should it have a personality or be neutral?
   - Suggestion: Keep it neutral and professional. Name: "Ask Marigold" for the docs widget. No special persona in Claude Code (it's just Claude with Marigold knowledge).
