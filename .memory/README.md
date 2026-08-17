# `.memory` — persistent context for agents

Context an agent would otherwise re-derive every session: what our words mean, and why decisions were made the way they were.

**This directory is committed and must not be added to `.gitignore`.** That is the whole point. Shared context has to travel with the repo and go through review like code — an agent-written note that nobody reviewed is not team knowledge, it is a rumour with a file path. It also happens to be the control that matters most for safety: `/grill` sessions read Jira tickets, PR comments and web pages, and content from those sources can end up proposed as a memory. Review is what stops a bad one from becoming something every future session treats as fact.

`/grill` writes here. So can you, by hand.

## What lives here

| Path                 | Holds                          | Nature                              |
| -------------------- | ------------------------------ | ----------------------------------- |
| `CONTEXT.md`         | Glossary — what our terms mean | Descriptive, corrected in place     |
| `adr/NNNN-<slug>.md` | Why a decision was made        | Historical, immutable once accepted |

## The boundary with CLAUDE.md

No rule lives in two places. Copies do not stay in sync; they disagree within a couple of months and then the agent picks one arbitrarily.

- **`CLAUDE.md`** — normative. Rules the agent must follow. "Use `useClassNames`", "never expose `className`". Loaded every session.
- **`.memory/CONTEXT.md`** — descriptive. What a term means. No rules, no instructions.
- **`.memory/adr/`** — historical. Why a decision was made and what was rejected. Loaded when relevant.

If you are about to write a rule into `CONTEXT.md`, it belongs in `CLAUDE.md`. If you are about to restate a `CLAUDE.md` rule in an ADR, link to it instead.

## The write rule

Persist something only if all three hold:

1. **Durable** — it will still be true in three months.
2. **Cross-session** — it is not specific to the task at hand.
3. **Confident** — it was settled, not guessed.

Anything task-local, fast-changing or uncertain stays in the session. The store is only useful while it is small enough to load and trustworthy enough to believe; every marginal entry costs context on every future session and dilutes both.

Prune on sight. A wrong entry is worse than a missing one, because the agent has no way to doubt it.

## Glossary conventions

One term per `###` heading, alphabetical. Define the term, and name what it is _not_ when a neighbouring term gets confused with it.

Split the file once it passes roughly 200 lines — long files get read less faithfully, and a glossary nobody finishes reading is a glossary that quietly stops working.

**One term per heading is a merge-safety rule, not just tidiness.** Two branches appending different definitions of the same term in the same place produce a git conflict, which someone resolves. Two branches appending to a shared blob merge cleanly and leave the file holding two definitions that cannot both be true — with nothing failing to tell you.

## ADR conventions

One decision per file, `adr/NNNN-<slug>.md`, numbered sequentially from `0001`. Start from `TEMPLATE.md`.

Frontmatter carries:

- **`id`** — stable and citable (`ADR-0001`), so a review comment can name the record it means.
- **`status`** — `proposed` → `accepted`, then `superseded-by ADR-NNNN`. Never anything else.
- **`applies_to`** — globs for the paths the decision governs. Narrow ones let an agent load only the records relevant to the file it is editing rather than the whole set.

Keep each record under ~200 lines. It competes for context with the code the agent actually needs to read.

**Accepted ADRs are not edited to change a decision.** Supersede them: write the new record, then set the old one's status to `superseded-by ADR-NNNN`. Fixing the past in place destroys the reason the file existed.

## What this is not

These records are **advisory**. They enter the context window and influence what an agent does. Nothing verifies compliance — no check reads an ADR and blocks a change that violates it. A record that nothing enforces is a well-argued comment, and no amount of careful writing turns a probabilistic reader into a guarantee.

Worth revisiting if a decision here ever matters enough to need one: pairing a record with a runnable check is what would turn it into a constraint.
