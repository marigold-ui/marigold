# `.memory` — persistent context for agents

Context an agent would otherwise re-derive every session: what our words mean, and why decisions were made the way they were.

**This directory is committed and must not be added to `.gitignore`.** That is the whole point. Shared context has to travel with the repo and go through review like code — an agent-written note that nobody reviewed is not team knowledge, it is a rumour with a file path. It also happens to be the control that matters most for safety: `/grill` sessions read Jira tickets, PR comments and web pages, and content from those sources can end up proposed as a memory. Review is what stops a bad one from becoming something every future session treats as fact.

`/grill` writes here. So can you, by hand.

## What lives here

| Path                 | Holds                          | Nature                              |
| -------------------- | ------------------------------ | ----------------------------------- |
| `CONTEXT.md`         | Glossary — what our terms mean | Descriptive, corrected in place     |
| `adr/NNNN-<slug>.md` | Why a decision was made        | Historical, immutable once accepted |
| `tasks/`             | Reserved — per-ticket specs    | Not in use yet; `/pick-up` fills it |

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

One decision per file, `adr/NNNN-<slug>.md`, where `NNNN` is the DST ticket the decision was made under — `1521-memory-store-conventions.md` is `ADR-1521`. Start from `TEMPLATE.md`.

**The number comes from the ticket, not from a sequence**, because a sequence is not merge-safe. Two branches each taking the next free `0002` produce two different filenames, so git merges both without complaint and leaves two records claiming the same `id` — the same clean-merge-into-contradiction this file warns about for the glossary above. Ticket numbers are already unique, already on the branch and the commits, and they link the record to the discussion for free. Two ADRs from one ticket is the only collision left, and it happens inside a single branch where you can see it: suffix the second `NNNN-b-<slug>`.

Frontmatter carries:

- **`id`** — stable and citable (`ADR-1521`), so a review comment can name the record it means.
- **`status`** — `proposed` → `accepted`, then `superseded-by ADR-NNNN`. Never anything else. **The author flips `proposed` to `accepted` in the same PR, once the review approves and before it merges.** Nothing does this for you, and a status nobody moves stops meaning anything.
- **`applies_to`** — globs for the paths the decision governs, so a reader pointed at this directory can tell in one line whether a record concerns the file in front of them. Nothing loads records on its own: no script consumes the glob and nothing puts `adr/` into a session by itself. Keep them narrow anyway — the day something does the selecting, wide globs are what makes it useless.

Keep each record under ~200 lines. It competes for context with the code the agent actually needs to read.

**Accepted ADRs are not edited to change a decision.** Supersede them: write the new record, then set the old one's status to `superseded-by ADR-NNNN`. Fixing the past in place destroys the reason the file existed.

## What this is not

These records are **advisory**. They enter the context window and influence what an agent does. Nothing verifies compliance — no check reads an ADR and blocks a change that violates it. A record that nothing enforces is a well-argued comment, and no amount of careful writing turns a probabilistic reader into a guarantee.

Worth revisiting if a decision here ever matters enough to need one: pairing a record with a runnable check is what would turn it into a constraint.
