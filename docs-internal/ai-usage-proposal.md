# Proposal: AI-Assisted Development Workflow for Marigold

**Author:** Sebastian Sebald
**Status:** Draft for team review
**Audience:** DST team meeting

---

We have quietly built a fairly complete AI-assisted workflow inside the Marigold
repo — custom skills, agents, MCP servers, and conventions baked into
`CLAUDE.md`. Right now most of it lives in one person's muscle memory. This
proposal **documents the end-to-end workflow** from ticket creation to PR
review so the whole team can adopt it, and **proposes concrete extensions**
(skills, hooks, CI) so AI usage is consistent, reviewable, and safe for everyone.

**Why it matters:** consistency (every PR looks the same to a reviewer), speed
(the boring glue — changesets, PR bodies, ticket transitions — is automated),
and onboarding (a new teammate inherits the workflow instead of reinventing it).

---

## 1. The workflow (centerpiece)

This is the **intended happy path** for a DST ticket. Steps 1–8 are all
supported today by an existing skill/agent or a documented convention — though
adoption varies (see §2): the glue steps (`simplify`, review, VRT) are used
constantly, while the scaffolding steps are available but under-used. Step 0 is
proposed (see §4).

```
   ┌──────────────────────┐
   │ 0 · Scope & refine   │  /grill-me · /grill-with-docs   ← PROPOSED
   │                      │  interrogate the idea until every decision
   │                      │  branch is resolved; capture vocabulary + ADRs
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 1 · Jira ticket      │  create / assign / sprint (DST conventions in CLAUDE.md)
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 2 · Implement        │  /create-component · component-scaffold agent · MDX docs
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 3 · /simplify        │  reduce + de-duplicate the diff
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 4 · Quality gates    │  typescript-codequality-check · testing-codequality-check
   │                      │  a11y-audit agent · prose style rules
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 5 · changeset+commit │  Conventional Commits + DST scope: fix(DST-1501): …
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 6 · /create-pr       │  fills PR template, links Jira, ticks checklist
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 7 · Vercel preview   │  resolve preview comments
   └──────┬───────────────┘
          ▼
   ┌──────────────────────┐
   │ 8 · /review-pr + vrt │  code/TS/a11y review; visual regression if UI changed
   └──────────────────────┘
```

---

## 2. The toolkit we already have

Everything below is committed to the repo (`.claude/`) — so it is already
**team-available**, not personal config.

"Available" is not the same as "adopted" — the **Adoption** column reflects
real usage, and the gap is itself a finding (see the note below and §4 P8).

### Skills (`/command`)
| Skill | What it does | Adoption |
|-------|--------------|----------|
| `simplify` | Reduces and de-duplicates the current diff. | **Heavy** |
| `vrt` | Triggers Chromatic visual regression tests. | Regular |
| `review-pr` | Reviews a PR for code quality, TS, React, a11y; auto-detects whether VRT is needed. | Regular |
| `typescript-codequality-check` | Post-change quality pass for `.ts`/`.tsx`. | Auto-triggered |
| `testing-codequality-check` | Post-change quality pass for tests/stories. | Auto-triggered |
| `component-docs-writer` | Writes MDX docs, demos, anatomy diagrams. | Rare |
| `create-pr` | Opens a PR matching our template + Conventional Commits + DST scope; auto-ticks checklist. | Rare |
| `create-component` | Scaffolds a new component with all required files. | Rare |

### Agents
| Agent | What it does | Adoption |
|-------|--------------|----------|
| `component-scaffold` | Creates new components with full file structure. | Unused |
| `a11y-audit` | WCAG 2.1 AA audit of a component. | Unused |

> **The pattern:** the lightweight, general-purpose skills (`simplify`, and the
> not-yet-committed `grill-me`) get heavy use, while the heavyweight scaffolding
> skills (`create-component`, `component-scaffold`, `component-docs-writer`,
> `create-pr`) are barely touched. Likely reasons: they're invoked rarely by
> nature (you scaffold a component far less often than you simplify a diff),
> they're not discoverable, or doing it by hand still feels faster. Either way,
> a tool nobody runs is maintenance cost with no payoff. P8 proposes what to do
> about it.

### Conventions encoded in `CLAUDE.md`
- Marigold CLI for live component APIs (stops the model inventing prop names).
- Full Jira (DST) ticket conventions: issue types, required custom fields,
  description template, title emoji convention.
- Component patterns (RAC wrapping, compound components, `useClassNames`,
  z-index scale).
- MCP servers: Storybook, React Aria, Atlassian, GitHub, Vercel, Figma.

---

## 3. Recommendations for the team

1. **Adopt the chain as the default workflow.** Treat the diagram in §1 as the
   happy path for any DST ticket.
2. **Keep skills in the repo, reviewed like code.** Skills are checked in, so
   changes go through PR review — the workflow improves for everyone at once.
3. **Lean on `CLAUDE.md` as the contract.** When the model gets something
   wrong, the fix is usually a `CLAUDE.md` edit, not a one-off prompt.
4. **Plan before patching.** For bugs, require ranked root-cause hypotheses
   (with evidence from the code) before any edit — via plan mode or a grilling
   session. This kills the most common failure mode: confidently fixing the
   wrong thing.
5. **Session hygiene.** Short, scoped sessions (`/clear` between tasks) keep the
   model focused and cheap.
6. **Always verify outward-facing actions.** PRs, ticket transitions, and
   Confluence edits get a human confirmation before they go out.

---

## 4. Proposals: filling the gaps

Each proposal names the gap, the fix, and how to implement it. Ordered by
expected impact.

### P1 — Adopt `/grill-me` as the standard scoping step

**Gap:** Work often starts from an under-specified idea; misunderstandings
surface late (during review) instead of early.

**Fix:** Before creating a ticket or starting non-trivial implementation, run a
grilling session: the AI interviews you relentlessly, one question at a time,
resolving every branch of the decision tree, and explores the codebase itself
when a question can be answered there.

**Implementation:** The skill is a single markdown file — commit it to
`.claude/skills/grill-me/` so the whole team gets it from the repo. Proven in
practice for scoping initiatives, patterns, and Confluence pages.

### P2 — Adopt `grill-with-docs` for codebase work (CONTEXT.md + ADRs)

**Gap:** Good scoping sessions produce shared language and decisions — and then
nothing is written down. (Example from our own work: the "app chrome" vs
"frame" naming debate for AppLayout. That decision lives in a chat log.)

**Fix:** [`grill-with-docs`](https://www.aihero.dev/grill-with-docs) (from
[`mattpocock/skills`](https://github.com/mattpocock/skills)) is `/grill-me`
plus live documentation:

- maintains a **`CONTEXT.md`** domain glossary (precise definitions of terms
  like *slot-configuration pattern*, *app chrome*, *trigger props*),
- writes an **ADR** whenever a decision is hard to reverse or surprising
  without context,
- challenges vague terms against the actual code during the session.

A shared vocabulary compounds: variables, files, and docs get named
consistently, and the agent stops re-deriving context every session.

**Implementation:** `npx skills@latest add mattpocock/skills` (select
`grill-with-docs` + the setup skill), commit the result. Routing rule: use
`grill-with-docs` when working in the codebase, `/grill-me` for everything else.

### P3 — `/triage-feedback` skill: one triage pass over GitHub + Vercel comments

**Gap:** Feedback on a PR arrives in *two* places — GitHub review comments and
Vercel preview (toolbar) comments. Resolving them is one of our most repeated
multi-step workflows, done by hand each time, with a constant context-switch
between the PR tab and the preview UI. Steps get missed.

**Fix:** One committed skill that pulls from both sources, triages every item,
and acts on it — replying and resolving in whichever system it came from. Both
sides are fully API-addressable: GitHub via `gh`, and Vercel via its MCP
(`list_toolbar_threads` → `get_toolbar_thread` → `reply_to_toolbar_thread` →
`change_toolbar_thread_resolve_status`).

It triages each comment on three axes, then presents a table for approval
*before* acting:

| Axis | Values |
|------|--------|
| **Source** | GitHub review comment · Vercel toolbar thread |
| **Validity** (verify against current code/diff) | confirmed · stale / already-fixed · incorrect |
| **Severity** | blocker · should-fix · nice-to-have · question / non-actionable |
| **Action** | apply · push back with reasoning · needs human |

Then the loop:

1. Gather unresolved comments from GitHub **and** Vercel for the current branch.
2. Triage each (table above); only **needs-human** items interrupt you.
3. Apply accepted fixes, run typecheck + build, push.
4. Reply in each thread (GitHub via `--body-file` — never inline strings, which
   shell-escaping can mangle) and resolve it in its origin system.
5. Update the changeset; post a summary comment.

**Limitation — visual feedback:** Vercel comments are often design/visual
("spacing looks off"). An agent can't verify pixels from text alone, so v1
routes visual comments straight to **needs-human**. The ambitious version uses
the Playwright MCP to load the preview URL at the comment's page and screenshot
it before judging — powerful, but more moving parts; ship the simple version
first.

**Implementation:** New `.claude/skills/triage-feedback/SKILL.md`, mirroring our
existing `create-pr`/`review-pr` skills with two source adapters and a shared
triage core. Needs the Vercel MCP connected and the project linked
(`.vercel/project.json` for the team/org id). The `--body-file` rule also goes
into `CLAUDE.md` as a general convention.

### P4 — `/create-ticket` skill: close the loop at the start

**Gap:** The workflow officially starts at "Jira ticket", but ticket creation
itself is ad-hoc — conventions (emoji title, required custom fields,
description template) are applied manually and inconsistently.

**Fix:** A `/create-ticket` skill that takes the output of a grilling session
(P1/P2) and produces a DST-conform ticket: correct issue type, emoji prefix,
Appetite/Rollout/UI-Kit fields, and the Problem/Outcome/Scope template — then
links it to the sprint. `grill-me → create-ticket → implement` becomes one
continuous chain.

**Implementation:** New `.claude/skills/create-ticket/SKILL.md`; all conventions
already exist in `CLAUDE.md`, the skill just enforces them via the Atlassian
MCP (with documented fallbacks for its known flaky errors).

### P5 — Hooks: pre-flight check and post-edit typecheck

**Gap:** Two recurring time sinks: starting work on the wrong branch/with wrong
env assumptions, and type/build regressions discovered late.

**Fix:** Two project-scoped hooks in `.claude/settings.json` (hooks are
committed, so the whole team gets them):

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|clear",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/preflight.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/typecheck-changed.sh",
            "timeout": 90
          }
        ]
      }
    ]
  }
}
```

- **`preflight.sh`** prints current branch (flagging when it isn't the expected
  target, e.g. `beta-release` during a beta), pnpm version, and Tailwind major —
  `SessionStart` stdout lands directly in the model's context.
- **`typecheck-changed.sh`** runs a scoped typecheck after edits. Caveat: a full
  `tsc --noEmit` over the monorepo is too slow per-edit — scope it to the
  changed package, or run the full check on the `Stop` event instead.

### P6 — Prose style as lint, not tribal knowledge

**Gap:** Our docs prose rules (no em-dashes, no semicolons in prose — we
shipped a whole cleanup PR for this) live in people's heads and in review
comments.

**Fix:** Encode them as [Vale](https://vale.sh) rules (simple YAML `existence`
checks for `—` and `;` scoped to prose in `*.mdx`), wired into lint-staged and
CI. The same rules can be referenced from `CLAUDE.md` so the AI writes
compliant prose from the start instead of being corrected after.

### P7 — AI review in CI with `claude-code-action`

**Gap:** `/review-pr` is powerful but local and opt-in — it only runs when the
author remembers, on the author's machine.

**Fix:** [`anthropics/claude-code-action`](https://github.com/anthropics/claude-code-action)
runs Claude in GitHub Actions:

- **Auto-review on `pull_request` events** — every PR gets a baseline review
  against our standards (it reads `CLAUDE.md`, so our conventions apply
  automatically).
- **`@claude` mentions in comments** — any reviewer can ask for clarification,
  a fix, or an explanation directly in the PR thread.

This complements rather than replaces `/review-pr`: CI gives every PR a
consistent floor; the local skill remains the deep, interactive review.

**Implementation:** `/install-github-app` from Claude Code (needs repo admin +
an API key secret). Start with `@claude` mentions only, expand to auto-review
once we trust the signal-to-noise.

---

### P8 — Audit and consolidate the toolkit

**Gap:** Several committed skills/agents see little or no use
(`create-component`, `component-scaffold`, `component-docs-writer`, `create-pr`,
`a11y-audit`). Unused tools are not free — they drift out of date, mislead new
teammates about "the way we work," and dilute the set of skills worth learning.

**Fix:** A short adoption review. For each low-use tool, pick one:

- **Improve** — if it's valuable but clunky/undiscoverable (e.g. `create-pr` is
  genuinely useful but rarely reached for — maybe it needs to be the default
  muscle-memory step, or merged into a `ship` skill).
- **Document** — if it's only used rarely *by nature* (scaffolding a component
  is inherently infrequent), make sure people know it exists when they need it.
- **Retire** — if hand-doing it is genuinely faster, delete it and reduce noise.

**Implementation:** one team session to triage the list; fold the verdicts back
into `CLAUDE.md` and this doc. Re-check adoption next quarter.

---

## 5. On the horizon (stretch — for discussion, not commitment)

The same loops are close to running semi-autonomously as models improve:

- **Autonomous feedback-resolution pipeline** — P3 triggered by a PR/preview
  event instead of manually: gather GitHub + Vercel comments, triage, fix, test,
  reply, resolve, file follow-up tickets; surface only judgment calls.
- **Parallel migration agents** — fan out one subagent per package for
  repeatable migrations (beta bumps, Tailwind major upgrades), each opening its
  own tested PR.
- **Test-first bug-fix loop** — write a failing reproduction before any fix, so
  misdiagnoses are caught by the harness instead of by the reviewer.

---

*Basis: one month of real-world usage of this workflow in the Marigold repo
(reviewed via Claude Code's usage analytics). Detailed per-person stats omitted
— available on request.*
