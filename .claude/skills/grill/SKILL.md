---
name: grill
description: Marigold repo — Interrogate an under-specified idea one question at a time until every decision branch is resolved, recommending an answer for each. When the work concerns this codebase, also maintain the glossary in .memory/CONTEXT.md and record hard-to-reverse decisions as ADRs under .memory/adr/. Use before writing a ticket, before starting non-trivial work, when a plan needs stress-testing, or when the user types `/grill`.
---

# Grill

Turn an under-specified idea into a scoped one by interrogating it, then leave behind the part worth keeping.

Two jobs, and the second only sometimes:

1. **Always** — interrogate. One question at a time, each with your recommended answer, until every branch of the decision tree is resolved.
2. **When the session concerns this codebase** — record. Vocabulary goes to `.memory/CONTEXT.md`; decisions that are hard to reverse go to `.memory/adr/`.

Read [.memory/README.md](../../../.memory/README.md) before writing anything to `.memory/`. It defines what belongs there and — more importantly — what does not.

## Usage

```
/grill                 # scope whatever is being discussed
/grill <idea>          # scope a specific idea
```

## Workflow

### 1. Establish what is being scoped

State the idea back in one or two sentences before asking anything. If that restatement is already wrong, the interrogation is about to go the wrong way, and the user can correct it for free.

### 2. Interrogate, one question at a time

The rules that make this useful rather than annoying:

- **One question per turn.** A list of six questions gets one answer and five shrugs.
- **Always recommend.** Every question carries your recommended answer and the reason. The user is confirming or overruling a position, not filling in a blank form.
- **Answer from the code, don't ask.** If a question is answerable by reading the repo, read the repo. Asking the user what the code already says wastes the turn and reduces trust in the questions that genuinely need them.
- **Resolve dependencies in order.** When answer A changes which questions B and C even are, ask A first.
- **Challenge vague terms against the code.** When someone says "the layout component" or "the wrapper", find out which one they mean. Half of scoping is discovering that two people have been using one word for two things — that discovery is what step 4 records.

Stop when the remaining questions no longer change what gets built.

### 3. Decide whether the documentation layer applies

It applies when the session is about this codebase — a component, an API, an architectural call, a convention.

It does not apply to one-off questions, throwaway exploration, or scoping that concerns process rather than code. In those sessions, finish at step 6 and write nothing. **A `/grill` session that records nothing is a normal outcome, not a failure.**

### 4. Update the glossary

If the session settled what a term means, add or correct its entry in `.memory/CONTEXT.md`.

One term per `###` heading, kept alphabetical. Define the term and name what it is *not* when there is a neighbouring term it gets confused with — that confusion is usually why the entry is needed.

Do not add rules here. A rule the agent must follow belongs in `CLAUDE.md`. The glossary says what words mean; it does not say what to do.

### 5. Write an ADR when the bar is met

Write one only when at least one of these holds:

- **Hard to reverse.** Undoing it means a migration, a breaking change, or touching many files.
- **Surprising without context.** Someone reading the code cold would "fix" it back, not understanding why it is the way it is.
- **A live alternative was rejected.** Without the record, the same alternative gets proposed again next quarter.

Copy `.memory/adr/TEMPLATE.md` to `.memory/adr/NNNN-<slug>.md`, taking the next free number. Fill in the frontmatter — `id`, `status`, `date`, and an `applies_to` glob narrow enough that the record only loads for work it governs.

Set `status: proposed`. It becomes `accepted` when the PR carrying it merges.

**Never edit an accepted ADR to change its decision.** Write a new one and set the old record's status to `superseded-by ADR-NNNN`. The history is the point; correcting the past in place destroys it.

If none of the three criteria hold, write nothing. Records with the thinking removed are worse than absence — they look like documentation while doing nothing, and they cost context on every future session that loads them.

### 6. Close with a scoped summary

End with a short summary the user can act on: what is being built, the decisions that were settled, and anything explicitly ruled out of scope.

Offer to hand it to `/create-ticket` once that skill exists. Do not file the ticket from here.

If you wrote to `.memory/`, say exactly which files changed. These are committed, reviewed files — the user needs to know they are in the diff.

## Limits worth knowing

Records under `.memory/` are **advisory**. They enter the context window and influence what the agent does; nothing verifies compliance. An ADR that no check enforces is a well-argued comment, and a probabilistic reader cannot turn it into a guarantee. Write them because they compress genuine context, not because they constrain anything.
