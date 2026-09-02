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

## Skills with side effects

Some skills spend money or touch the outside world. `vrt` dispatches a Chromatic run; a deploy or release skill would be the same class.

These carry two extra obligations:

1. **The description must rule out proactive use.** State plainly that the skill runs only on an explicit request. A description that merely describes the capability invites the model to fire it on its own.
2. **Confirmation is a hard stop immediately before the first outward call.** Where the skill has nothing to render first, that is step 1, as in `vrt`. Where the gate's value is showing what is about to be filed or pushed, it comes after the steps that build it. What holds either way: no outward call precedes the gate, and it is a stop rather than a note or a closing caveat.

Narrow `allowed-tools` to the exact commands the skill needs. It is the one guardrail in a skill that is structural rather than a matter of prose.

**A confirmation only holds if the question reaches a human.** `AskUserQuestion` is resolved by the permission component, so on a machine running `skipAutoPermissionPrompt` under `permissions.defaultMode: "auto"` it never renders. The tool returns the first option and nothing in the result distinguishes that from a real answer, so the model believes it was approved. This was found the slow way: seven questions in one session came back selecting the recommended option every time, and the person at the keyboard had seen none of them.

Two things follow. It fails toward performing the outward action, which is the worst direction for a guardrail to fail in. And it is invisible on a machine where the setting is off, so a gate that works for you can be silently open for a teammate. Check `/config` if a gate ever seems to answer itself. A skill that must hold regardless of anyone's configuration can render its options and end the turn instead, which no setting can resolve.

## Adding and removing

Anything committed here is a claim that the team works this way, so add a skill when a workflow is worth standardising, not to record that you once did something twice.

Removing is the cheaper direction than it looks. An unused skill costs about one line of context, so "unused" alone is a weak reason to keep one around — and everything deleted stays in git history.
