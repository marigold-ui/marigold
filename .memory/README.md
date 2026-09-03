# `.memory` — persistent context for agents

Context an agent would otherwise re-derive every session: what our words mean, and why decisions were made the way they were.

**This directory is committed and must not be added to `.gitignore`.** That is the whole point. Shared context has to travel with the repo and go through review like code — an agent-written note that nobody reviewed is not team knowledge, it is a rumour with a file path. It also happens to be the control that matters most for safety: `/grill` sessions read Jira tickets, PR comments and web pages, and content from those sources can end up proposed as a memory. Review is what stops a bad one from becoming something every future session treats as fact.

`/grill` writes here. So can you, by hand.

## What lives here

| Path                 | Holds                          | Nature                              |
| -------------------- | ------------------------------ | ----------------------------------- |
| `CONTEXT.md`         | Glossary — what our terms mean | Descriptive, corrected in place     |
| `adr/NNNN-<slug>.md` | Why a decision was made        | Historical, immutable once accepted |

There is no `tasks/`. Per-ticket specs were reserved here once and then moved out: `/pick-up` writes its plans to `.claude/tasks/`, untracked. A plan for one ticket is task-local and dead the day the ticket ships, so it fails the write rule below, and this store is only worth loading while everything in it is still true.

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

Split the file once it passes roughly 200 lines — long files get read less faithfully, and a glossary nobody finishes reading is a glossary that quietly stops working. Split into `CONTEXT/<area>.md` and keep `CONTEXT.md` as the index that links them, so the one path `CLAUDE.md` and the skill both point at stays valid.

**One term per heading is a merge-safety rule, not just tidiness.** Two branches appending different definitions of the same term in the same place produce a git conflict, which someone resolves. Two branches appending to a shared blob merge cleanly and leave the file holding two definitions that cannot both be true — with nothing failing to tell you.

## ADR conventions

One decision per file, `adr/NNNN-<slug>.md`, numbered sequentially from `0001`. Start from `0000-template.md`.

Frontmatter carries:

- **`id`** — stable and citable (`ADR-0001`), so a review comment can name the record it means.
- **`status`** — `accepted`, or `superseded-by ADR-NNNN`. Never anything else. **There is deliberately no `proposed` state:** deciding happens in review, so a record only reaches `main` by being accepted — "on main" and "accepted" are the same fact, and a field duplicating it would be one more thing to drift. It also means the no-editing rule below applies from the first commit rather than from a status flip nobody performs.
- **`applies_to`** — globs for the paths the decision governs. This is an **index for finding records, not a loading mechanism**: nothing scopes an agent's context by it. Its job is to make "which records govern this file?" answerable by grep, and it is checked so it cannot rot silently.

Keep each record under ~200 lines. It competes for context with the code the agent actually needs to read.

**Cite other records as links, never bare numbers.** `[ADR-0004](0004-slot-driven-composition.md)`, not `ADR-0004`. A bare number survives a renumber by silently re-pointing at whichever record later takes that slot — a citation that is wrong rather than dead, which nothing can detect. Putting the slug in the link moves the identity into the filename, so the same renumber leaves a target that does not exist and the check fails. This is enforced.

**Take the next free number, and expect the check to catch you if you collide.** Sequential numbering has no allocation mechanism — two branches each adding `0003-<their-own-slug>.md` have different filenames, so git merges both without a conflict and `ADR-0003` then names two decisions. That is the same clean-merge hazard the one-term-per-heading rule addresses in the glossary, and it is why the numbering is checked rather than trusted.

**Once a record is on `main`, it is not edited to change its decision.** Supersede it: write the new record, then set the old one's status to `superseded-by ADR-NNNN`. Fixing the past in place destroys the reason the file existed. (Before it merges it is still a draft in an open PR — revise it freely there, which is what review is for.)

## What this is not

These records are **advisory**. They enter the context window and influence what an agent does. Nothing verifies compliance — no check reads an ADR and blocks a change that violates it. A record that nothing enforces is a well-argued comment, and no amount of careful writing turns a probabilistic reader into a guarantee.

`pnpm check:memory` (CI: `.github/workflows/memory-store.yml`) does not change that. It checks the store's **structure** — number collisions, `id`/filename agreement, the status vocabulary, supersede targets that resolve, cross-references that point at the record they name, `applies_to` globs that still match something, duplicate or misordered glossary terms. Those are the failures that make the store untrustworthy without anything breaking. Whether a decision was actually followed is not checkable here.

Worth revisiting if a decision here ever matters enough to need one: pairing a specific record with its own runnable check is what would turn that record into a constraint.
