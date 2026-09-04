# AI toolkit conventions

How the committed AI tooling in this repo is shaped. **Conventions only — this file deliberately does not list the tools it describes.**

Claude Code already injects every available skill's name and description into each session, so a hand-maintained inventory here would be a second copy of that list, kept by hand, drifting a little further with every change. That is what happened last time: the ticket that produced this file (DST-1529) was itself written as a verified-on-disk inventory, and three of its five findings were wrong eight weeks later. Rules only change when we decide to change them, so this file records rules. To see what exists, look in `skills/` or ask Claude what it has.

## Where things come from

| Source | Lives in | Applies to |
| --- | --- | --- |
| First-party skills | `.claude/skills/<name>/SKILL.md` | Committed, ours to edit |
| Plugins | declared in `.claude/settings.json` | Installed per-user, versioned upstream |
| Personal skills | `~/.claude/skills/` | One developer's machine, never the repo |

A skill you did not write and do not intend to maintain belongs in a plugin, not in `skills/`. Vendoring third-party packs into this repo was tried and abandoned: the copy stopped tracking upstream within two months and nobody noticed until it was audited.

## Writing a first-party skill

One shape, no exceptions:

```
.claude/skills/<name>/
  SKILL.md          # required
  references/       # optional — loaded on demand, not up front
  scripts/          # optional
  assets/           # optional
```

`SKILL.md` starts with frontmatter carrying `name` and `description`, then a `## Usage` block, then a numbered `## Workflow`. See `skills/create-pr/SKILL.md` for the reference shape.

The `description` is the only part of a skill that enters the context window before it runs — everything else loads on invocation. So write it as a trigger, not a summary: say what the skill does *and* the phrases that should reach for it. A vague description is why a good skill never fires.

Open it with `Marigold repo — ` so ours group visibly in a `/` menu that also lists plugin and personal skills. Use the em dash, not a colon: descriptions are read raw rather than as quoted YAML, so quotes leak through literally, and `Marigold repo: ` would need them.

Don't put that marker in the `name`. Plugin and directory-scoped skills are namespaced by the harness with a colon (`vercel:react-best-practices`, `apps/web:deploy`), so a hand-written prefix in the name impersonates a mechanism it isn't part of. The invocation stays `/create-pr`.

Keep the body in `SKILL.md` and push bulk into `references/`. Skills are cheap when idle and expensive when bloated at the top level.

**When two skills need the same reference, it moves up to `skills/references/`** and both link to it:

```
.claude/skills/
  references/       # shared across skills, loaded on demand
  <name>/SKILL.md
```

Not into `CLAUDE.md`, which loads every session and so would make a rarely-needed reference permanently expensive. Not into `.memory/`, which is domain vocabulary and decision history rather than operational how-to. And not duplicated into both skills, because the copies drift and the one you read is not necessarily the corrected one. `references/jira-board.md` is the worked example: `/pick-up` and `/review-queue` hit the same JQL traps and field ids, so those are written down once.

## Gates and questions

`AskUserQuestion` is the normal way to confirm something, and `/create-pr` uses it at its confirmation step to good effect.

The one thing worth knowing is that it is resolved by the permission component, so a machine configured with `skipAutoPermissionPrompt` can have it return the first option without a person seeing it. That is a property of one setting rather than of the tool, but it means a gate built on it fails toward acting. So for the last step before something irreversible, some skills prefer to render the options as text and end the turn, which no setting can answer on anyone's behalf. `/pick-up` and `/triage-feedback` both make that choice and say why.

Either is fine. Pick per gate, on how expensive the wrong answer is.

## Skills with side effects

Some skills spend money or touch the outside world. `vrt` dispatches a Chromatic run; a deploy or release skill would be the same class.

These carry two extra obligations:

1. **The description must rule out proactive use.** State plainly that the skill runs only on an explicit request. A description that merely describes the capability invites the model to fire it on its own.
2. **Confirmation is a numbered step of its own, immediately before the first outward call.** Not a note, not a caveat at the end. A skill that dispatches straight away confirms in step 1. One that reads and plans first confirms in the step just before its first outward call, and says in its opening lines where that boundary falls. `/pick-up` is the worked example: it writes its plan to disk with no gate at all, because a local file is not an outward action, and puts its gate in the step directly before the one that creates a branch and moves the ticket.

Narrow `allowed-tools` to the exact commands the skill needs. It is the one guardrail in a skill that is structural rather than a matter of prose.

## Adding and removing

Anything committed here is a claim that the team works this way, so add a skill when a workflow is worth standardising, not to record that you once did something twice.

Removing is the cheaper direction than it looks. An unused skill costs about one line of context, so "unused" alone is a weak reason to keep one around — and everything deleted stays in git history.
