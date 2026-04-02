# MCP Server: Killer Scenarios

> **Status**: Proposal
> **Related**: [mcp-server-beyond-search.md](./mcp-server-beyond-search.md) | [cli-and-mcp-overview.md](./cli-and-mcp-overview.md)

---

## Table of Contents

- [Why These Scenarios Matter](#why-these-scenarios-matter)
- [Tier 1: Solve Real Pain, Clearly Unique to MCP](#tier-1-solve-real-pain-clearly-unique-to-mcp)
  - [1. The "Which Component?" Problem](#1-the-which-component-problem)
  - [2. Component Composition Advisor](#2-component-composition-advisor)
  - [3. Real-Time Drift Detection](#3-real-time-drift-detection)
- [Tier 2: Powerful, Requires More Infrastructure](#tier-2-powerful-requires-more-infrastructure)
  - [4. Figma-to-Marigold Pipeline](#4-figma-to-marigold-pipeline)
  - [5. Sampling: Server-Initiated Code Review](#5-sampling-server-initiated-code-review)
  - [6. Stateful Theme Playground](#6-stateful-theme-playground)
- [Tier 3: Novel but Speculative](#tier-3-novel-but-speculative)
  - [7. Cross-Theme Validation](#7-cross-theme-validation)
  - [8. Tribal Knowledge Encoding](#8-tribal-knowledge-encoding)
  - [9. Component Usage Telemetry](#9-component-usage-telemetry)
- [Build Priority](#build-priority)

---

## Why These Scenarios Matter

The MCP server's value is NOT "the CLI over a different protocol." If it were, the CLI would always win on token cost and latency. The MCP server justifies its existence through capabilities that a CLI fundamentally cannot provide:

- **Resources**: Proactive context injection — the AI knows things _before being asked_
- **Sampling**: Server-initiated AI work — the server _asks_ the AI to analyze code
- **State**: Persistent sessions — multi-step workflows that build on each other
- **Composition**: Multiple MCP servers cooperating — Figma + Marigold + Git together
- **Notifications**: Server pushes updates — the AI is informed of changes proactively

Each scenario below is evaluated on whether it genuinely needs these MCP-native capabilities or could be done just as well with a CLI command.

---

## Tier 1: Solve Real Pain, Clearly Unique to MCP

These scenarios solve the most common design system pain points, require MCP-native capabilities, and can be built with existing infrastructure.

### 1. The "Which Component?" Problem

**The pain:** The #1 reason developers don't use design systems is they don't know a component exists. They build a custom dropdown because they didn't know `ComboBox` is different from `Select`, or that `Autocomplete` exists at all. Research consistently shows that discovery — not documentation quality — is the primary adoption barrier.

**Why CLI falls short:** The CLI requires the developer to _already know they should look something up_. `marigold list --search "date"` only helps if you think to search for "date." If you're building a scheduling feature and thinking in terms of "time slots," you might never discover `Calendar`.

**How MCP solves it with Resources:**

Resources automatically inject component knowledge based on what the user is building. The IDE client attaches resources based on the file being edited, the imports present, and the patterns the AI detects.

```
Developer writes:
  <div onClick={() => setEnabled(!enabled)}>
    {enabled ? 'On' : 'Off'}
  </div>

Resources already in context:
  component://Switch/api
  component://ToggleButton/api
  component://Checkbox/api

AI (without being asked):
  "This toggle pattern would be better served by Marigold's <Switch>
  component, which handles accessibility (role='switch', aria-checked),
  keyboard interaction (Space to toggle), and theming automatically:

  <Switch defaultSelected={enabled} onChange={setEnabled}>
    Notifications
  </Switch>"
```

The developer never searched for anything. The MCP server made the right component discoverable at the exact moment it was relevant.

**How MCP solves it with semantic search:**

For active discovery, the `search_docs` tool handles conceptual queries:

```
Developer: "I need a way for users to pick multiple tags from
a predefined list, with the ability to type to filter"

search_docs("pick multiple tags filter type predefined list")
→ Returns: TagField (create free-form tags), Multiselect
  (pick from predefined options with filter), ComboBox
  (single select with type-ahead)

AI: "Based on your description, <Multiselect> is the best fit.
It provides a dropdown with predefined options that users can
filter by typing, and supports multiple selection. Here's how..."
```

Compare with CLI: `marigold list --search "tag"` would find `TagField` and `Tag` but miss `Multiselect` entirely, because the keyword doesn't match.

**What to build:**

- Component Resources with rich metadata (use cases, related components, "use this when...")
- Semantic search tuned for intent-based queries, not just keyword matching

---

### 2. Component Composition Advisor

**The pain:** Developers don't struggle with individual component APIs — they struggle with _how to compose components together_. "How do I build a filter panel with a date range, multi-select tags, and a search field that all submit together?" This question involves 5+ components, layout primitives, form handling, and event wiring. No single docs page answers it.

**Why CLI falls short:** The CLI can fetch docs for individual components (`marigold docs Form`, `marigold docs DatePicker`, `marigold docs Multiselect`). But the developer has to:

1. Know which components to look up
2. Read each one separately
3. Figure out how they compose together
4. Wire up the state management and event handling themselves

This is the hardest part of using a design system, and the CLI provides zero help here.

**How MCP solves it:**

With all component APIs loaded as Resources, the AI doesn't need to look anything up. It can reason about composition immediately:

```
User: "Build a filter panel for our product catalog. Users need to
filter by category (predefined list), price range, and search by
name. The filters should apply on submit, not on change."

AI already has in context (via Resources):
  component://Form/api         → knows onSubmit, validationBehavior
  component://Select/api       → knows it's for predefined lists
  component://Slider/api       → knows it supports range
  component://SearchField/api  → knows it has onSubmit
  component://Stack/api        → knows it handles vertical layout
  component://Inline/api       → knows it handles horizontal layout
  component://Button/api       → knows about type="submit"

AI generates a complete, correct composition:

<Form onSubmit={handleFilter}>
  <Stack space={4}>
    <Select label="Category">
      <Select.Option id="electronics">Electronics</Select.Option>
      <Select.Option id="clothing">Clothing</Select.Option>
      <Select.Option id="books">Books</Select.Option>
    </Select>

    <Slider
      label="Price range"
      minValue={0}
      maxValue={1000}
      step={10}
      defaultValue={[0, 500]}
    />

    <SearchField label="Search by name" />

    <Inline space={2}>
      <Button type="submit" variant="primary">Apply Filters</Button>
      <Button type="reset" variant="ghost">Clear</Button>
    </Inline>
  </Stack>
</Form>
```

The AI knew to use `Form` as the container (not a plain `<form>`), `Stack` for vertical layout (not `<div style={{display:'flex'}}`), `Inline` for the button row, and `type="submit"` on the button. This composition knowledge comes from having all APIs in context simultaneously.

**What to build:**

- Resources for all layout primitives (Stack, Inline, Columns, Grid, Split, Aside)
- Resources for pattern recipes (forms, filters, data tables, navigation)
- Prompt: `/compose` that asks the user to describe a UI and generates a full composition

---

### 3. Real-Time Drift Detection

**The pain:** Design system consistency erodes gradually. A developer adds `className="mt-4"` to fix spacing. Another adds `style={{ padding: 16 }}`. A third builds a raw `<div>` flexbox instead of using `<Stack>`. Each deviation is small, but they accumulate until the app looks nothing like the design system.

Current enforcement happens too late: linters catch some patterns, code review catches others, but by then the code is written and the developer is emotionally invested in their solution. Asking them to rewrite is friction.

**Why CLI falls short:** The CLI's `marigold scan` (v2) can detect drift, but only when explicitly run. It's a batch analysis tool — you run it, review the report, fix issues. It doesn't prevent drift from being introduced in the first place.

**How MCP solves it with ambient Resources:**

With component APIs and design guidelines always in context (Resources), the AI can notice anti-patterns _as code is being written_, not after the fact:

```
Developer writes:
  <TextField
    label="Email"
    className="mb-4 rounded-none"
    style={{ borderColor: 'red' }}
  />

AI (with component://TextField/api in context, which states
"className and style props are not supported"):

  "Heads up: Marigold's TextField doesn't support className or
  style props — they're removed from the API by design to ensure
  theme consistency.

  For the spacing, wrap in a layout component:
    <Stack space={4}>
      <TextField label='Email' />
      ...
    </Stack>

  For the error border, use the errorMessage prop which
  automatically applies error styling:
    <TextField label='Email' errorMessage='Invalid email' />

  For custom border radius, use the theme's variant system:
    <TextField label='Email' variant='compact' />"
```

The key difference from a linter: the AI doesn't just say "don't use className." It understands _why_ the developer reached for className (spacing, error state, border radius) and provides the design-system-native alternative for each case. This is enforcement that feels like mentorship.

**What to build:**

- Resources that explicitly state what props are NOT supported and why
- Resources for common "escape hatch" patterns and their design-system equivalents
- Pattern: `docs://guidelines/avoiding-overrides` with concrete before/after examples

---

## Tier 2: Powerful, Requires More Infrastructure

These scenarios are high-impact but depend on external services, MCP features with varying client support, or additional data sources.

### 4. Figma-to-Marigold Pipeline

**The pain:** The design-to-code handoff is lossy. A Figma mockup shows a card layout, but doesn't communicate: which Marigold `Card` variant? Which layout primitive (`Stack` vs `Columns`)? How should it behave responsively? Developers interpret the design, often incorrectly. The result: code that looks right at one breakpoint but diverges from design intent everywhere else.

**How MCP Composition solves it:**

MCP clients can connect to multiple servers simultaneously. If a developer has both the Figma MCP server and the Marigold MCP server connected, the AI sees tools from both and can orchestrate:

```
User: "Implement this Figma frame" [pastes Figma URL]

AI calls Figma MCP: get_node(fileId, nodeId)
→ Returns: Frame with Auto Layout (vertical, gap: 16),
  containing: Text "Settings", two Input fields,
  a Toggle, and a Button (filled, blue)

AI has Marigold Resources in context:
  component://TextField/api, component://Switch/api,
  component://Button/api, component://Stack/api,
  component://Headline/api, component://Card/api

AI maps:
  Figma Auto Layout (vertical, gap: 16) → <Stack space={4}>
  Figma Text "Settings" (24px, bold)    → <Headline level={3}>
  Figma Input fields                    → <TextField>
  Figma Toggle                          → <Switch>
  Figma Button (filled, blue)           → <Button variant="primary">
  Figma Frame (padding: 24, rounded)    → <Card>

AI generates:
<Card>
  <Stack space={4}>
    <Headline level={3}>Settings</Headline>
    <TextField label="Display name" />
    <TextField label="Email" type="email" />
    <Switch>Enable notifications</Switch>
    <Button variant="primary">Save changes</Button>
  </Stack>
</Card>
```

The result is not generic `<div>` soup with inline styles — it's idiomatic Marigold code. The AI bridged two knowledge domains (Figma's visual language and Marigold's component library) because it had access to both via MCP composition.

**Requirements:**

- Figma MCP server (exists, official from Figma)
- Marigold component Resources with "maps from Figma" metadata
- A resource or prompt that defines the Figma → Marigold component mapping

**What to build:**

- Resource: `docs://figma-mapping` — a mapping table of Figma component names to Marigold components
- Resource: `theme://figma-tokens` — design token mapping between Figma variables and Marigold CSS custom properties

---

### 5. Sampling: Server-Initiated Code Review

**The pain:** Design system governance typically works through code review — the design system team reviews PRs for correct component usage. This doesn't scale. The team becomes a bottleneck, reviews are delayed, and by the time feedback arrives, the developer has moved on.

**How MCP Sampling solves it:**

MCP Sampling lets the server _ask the client's AI to do work on the server's behalf_. The flow:

1. Developer saves a file that imports Marigold components
2. MCP server detects the change (via resource subscription or tool call)
3. Server sends a `sampling/createMessage` request to the client:
   "Review this code for design system compliance. Check for: raw HTML where Marigold components should be used, className/style overrides, incorrect prop usage, accessibility issues."
4. Client's AI processes the request (with user approval)
5. Server receives the review and returns structured findings

```
MCP Server (via sampling):
  "Please review this component for Marigold design system compliance:

  [file contents]

  Check for:
  - <div>/<span> elements that should use Marigold layout/text components
  - className or style props on Marigold components
  - Deprecated prop names (isDisabled→disabled, isPending→loading)
  - Missing labels on form components
  - Non-standard spacing (px values instead of space prop)"

AI returns:
  {
    "findings": [
      {
        "line": 23,
        "severity": "warning",
        "issue": "<div className='flex gap-4'> should be <Inline space={4}>",
        "fix": "<Inline space={4}>"
      },
      {
        "line": 45,
        "severity": "error",
        "issue": "<TextField> missing label prop",
        "fix": "Add label='Search' or aria-label='Search'"
      }
    ]
  }
```

**Caveat:** Sampling requires human-in-the-loop approval in most MCP clients. The developer would see something like "The Marigold server wants to review your code — allow?" This is by design — it's a suggestion, not silent surveillance.

**Requirements:**

- MCP client support for sampling (varies by IDE)
- Well-defined review criteria encoded in the sampling prompt
- Structured output format for findings

**What to build:**

- Sampling prompt template for design system compliance review
- Integration with the `marigold scan` logic from CLI v2 (reuse the same detection rules)

---

### 6. Stateful Theme Playground

**The pain:** Theme customization is trial-and-error. Change a token, rebuild, check the result, repeat. There's no way to explore the cascading effects of a token change before committing to it. "If I make the primary color warmer, which components are affected? Do any contrast ratios break?"

**How MCP State solves it:**

MCP servers maintain persistent connections and can hold state between calls. A theme editing session builds iteratively:

```
User: "I want to explore making our primary color warmer"

AI calls: start_theme_session({ base: "theme-rui" })
Server: creates session, loads theme into memory

User: "Shift the primary hue from blue (260) to blue-violet (280)"

AI calls: modify_token({
  session: "abc123",
  token: "--color-primary-*",
  transform: "shift hue to 280"
})

Server:
  - Adjusts all 10 primary scale values
  - Recalculates contrast ratios
  - Returns affected components and any WCAG violations

→ "Modified 10 tokens in the primary scale.
   Contrast check: all AA ratios pass.
   Components affected: Button (primary), Link, Badge (info),
   focus rings on all form components."

User: "That's too saturated. Reduce chroma by 20%"

AI calls: modify_token({
  session: "abc123",
  token: "--color-primary-*",
  transform: "reduce chroma by 20%"
})

Server: adjusts, checks, reports (building on previous state)

User: "Show me how Button looks now"

AI calls: preview_component({
  session: "abc123",
  component: "Button",
  variant: "primary"
})

Server: resolves full Button styles with modified tokens
→ Shows the new classes and resolved CSS values

User: "Go back to the version before the chroma change"

AI calls: undo_theme_change({ session: "abc123" })
Server: rolls back to previous state in the session

User: "I like this. Export the final theme"

AI calls: export_theme_session({
  session: "abc123",
  format: "css"
})

Server: exports the modified tokens as CSS custom properties
```

Each step builds on the last. The server maintains the session state (modified tokens, history stack, contrast calculations). This is impossible with a CLI where each command is stateless.

**Requirements:**

- Theme resolution engine from CLI v3
- Session management in the MCP server
- Color math library for contrast calculations and color space manipulation

**What to build:**

- MCP Tools: `start_theme_session`, `modify_token`, `preview_component`, `undo_theme_change`, `export_theme_session`
- In-memory session store with undo/redo stack

---

## Tier 3: Novel but Speculative

These scenarios are interesting but either require infrastructure that doesn't exist yet or solve problems that are less universally painful.

### 7. Cross-Theme Validation

**The pain:** Teams maintaining multiple themes (white-label, B2B/B2C, light/dark) can't easily verify that a component composition works across all themes. Something that looks fine in `theme-rui` might have broken contrast in `theme-b2b`.

**How MCP could solve it:**

A tool that takes a component usage and validates it against every registered theme:

```
AI calls: validate_across_themes({
  component: "Card",
  children: [
    { component: "Text", props: { color: "secondary" } },
    { component: "Button", props: { variant: "primary" } }
  ]
})

Server returns:
  theme-rui:  PASS (all contrast ratios OK)
  theme-b2b:  WARN (Text secondary on Card background: 3.8:1,
              below AA for body text)
  theme-dark: PASS
```

**Why it's speculative:** Requires theme resolution to work across multiple themes simultaneously. Most teams only have 1-2 themes, limiting the audience.

### 8. Tribal Knowledge Encoding

**The pain:** Every design system team has unwritten rules that live in people's heads:

- "Don't nest Dialog inside Drawer — the focus trap conflicts"
- "Always use `Stack` for form fields, never `Inline` — it breaks on mobile"
- "The compact Table variant only works with single-line cells"

When team members leave, this knowledge disappears.

**How MCP could solve it:**

Resources can carry tribal knowledge as ambient context that the AI always has:

```
Resource URI: docs://guidelines/component-gotchas
Content:
  # Component Gotchas

  ## Dialog + Drawer
  Never nest a Dialog inside a Drawer. Both use focus trapping,
  and the nested trap captures focus permanently. Use Dialog OR
  Drawer, not both. If you need a confirmation inside a Drawer,
  use an inline confirmation pattern instead.

  ## Table compact variant
  The compact variant reduces row height. This only works with
  single-line text cells. If any cell wraps to multiple lines,
  the layout breaks. Use the default variant for multi-line content.

  [...]
```

**Why it's partially solved already:** CLAUDE.md files and the CLI's docs serve a similar purpose. The MCP advantage is that this knowledge is _always in context_ — the AI doesn't need to look it up when it encounters the relevant situation.

### 9. Component Usage Telemetry

**The pain:** Design system teams need data to make decisions: Which components should we invest in? Which are underused? Which prop combinations cause issues? Today this requires separate analytics tooling.

**How MCP could solve it with push notifications:**

If the MCP server had access to usage analytics, it could push relevant insights:

```
Notification: "The compact size on DatePicker has 0 usages across
all consuming apps. Consider deprecating in the next major version."

Notification: "Button variant='primary' accounts for 83% of all
Button usage. This suggests either over-use of primary or that
secondary variants aren't compelling enough."

Notification: "5 teams independently wrap Select in a custom
component to add search functionality. Consider adding a built-in
search prop."
```

**Why it's speculative:** Requires analytics infrastructure (telemetry collection, aggregation, storage) that doesn't exist. The MCP notification mechanism is well-suited for delivery, but the data pipeline is the hard part.

---

## Build Priority

| Scenario                      | MCP-native?                   | Pain severity                      | Infrastructure needed                | Priority    |
| ----------------------------- | ----------------------------- | ---------------------------------- | ------------------------------------ | ----------- |
| **1. "Which Component?"**     | Yes (Resources)               | Critical — #1 adoption barrier     | Resources on existing component docs | **Phase 1** |
| **2. Composition Advisor**    | Yes (Resources + Search)      | High — hardest part of using a DS  | Resources + pattern docs             | **Phase 1** |
| **3. Drift Detection**        | Yes (ambient context)         | High — slow erosion of consistency | Resources with anti-pattern docs     | **Phase 1** |
| **4. Figma Pipeline**         | Yes (MCP composition)         | High — design-code gap             | Figma MCP + component mapping        | **Phase 2** |
| **5. Sampling Review**        | Yes (Sampling)                | Medium — governance bottleneck     | Sampling support in clients          | **Phase 2** |
| **6. Theme Playground**       | Yes (State)                   | Medium — theme customization pain  | Theme engine + session mgmt          | **Phase 2** |
| **7. Cross-Theme Validation** | Partially                     | Low — niche audience               | Multi-theme resolution               | **Phase 3** |
| **8. Tribal Knowledge**       | Partially (CLAUDE.md overlap) | Medium — knowledge loss            | Resource authoring                   | **Phase 3** |
| **9. Usage Telemetry**        | Yes (Notifications)           | Medium — data-driven decisions     | Full analytics pipeline              | **Phase 3** |

Phase 1 scenarios share a common foundation: **rich component Resources**. Building great Resources enables all three Tier 1 scenarios simultaneously. The investment is in content quality (detailed component metadata, composition patterns, anti-pattern documentation), not in complex infrastructure.
