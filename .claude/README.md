# AI toolkit conventions

How the committed AI tooling in this repo is shaped: **hooks, path-scoped rules, one subagent, and
the one skill that is still repo-local.** The team's workflow skills live in the `dst` plugin and carry
their own conventions with them, so this file does not describe them.

**Conventions only — this file deliberately does not list the tools it describes.**

Claude Code already injects every available skill's name and description into each session, so a hand-maintained inventory here would be a second copy of that list, kept by hand, drifting a little further with every change. That is what happened last time: the ticket that produced this file (DST-1529) was itself written as a verified-on-disk inventory, and three of its five findings were wrong eight weeks later. Rules only change when we decide to change them, so this file records rules. To see what exists, look in `skills/` or ask Claude what it has.

## Where things come from

| Source | Lives in | Applies to |
| --- | --- | --- |
| First-party skills | `.claude/skills/<name>/SKILL.md` | Committed, ours to edit. Only skills bound to this repository's own layout or workflows |
| Path-scoped rules | `.claude/rules/<area>.md` | Committed. Loaded when a file matching the `paths:` frontmatter is read or edited, so detail stays out of the root `CLAUDE.md` |
| Subagents | `.claude/agents/<name>.md` | Committed. `marigold-reviewer` reviews a local diff and never writes |
| Project hooks | registered in `.claude/settings.json`, scripts in `.claude/hooks/` | Committed, run automatically for everyone |
| Plugins | declared in `.claude/settings.json`, or installed per-user | Installed per-user, versioned upstream. The team's workflow skills are the `dst` plugin, installed at user scope from the private `dst-toolkit` marketplace, so it is never declared in this public repo's `settings.json` |
| Personal skills | `~/.claude/skills/` | One developer's machine, never the repo |

A skill you did not write and do not intend to maintain belongs in a plugin, not in `skills/`. Vendoring third-party packs into this repo was tried and abandoned: the copy stopped tracking upstream within two months and nobody noticed until it was audited. The same reasoning is what moved our own workflow skills out: `review-pr` existed in two repos and had diverged by 140 lines, with neither copy authoritative.

## Writing a skill

**The authoring rules live in [`dst-toolkit`](https://github.com/marigold-ui/dst-toolkit)'s
`CONTRIBUTING.md`**, not here. The skill layout, how to write a `description` that actually
triggers, when a reference moves up to a shared directory, how gates and prerequisites are
written, and the extra obligations a side-effecting skill carries: one copy, and it is that one.

That is where they belong because that is where the skills are. The team's workflow skills were
extracted into the `dst` plugin (DST-1778) precisely so one copy could serve every DST checkout,
and keeping a second copy of their conventions here would recreate the drift the extraction
removed.

What is still true in this repo:

- A skill lives here only when it cannot work anywhere else. `vrt` stays because exactly one
  repository has a Chromatic workflow for it to dispatch. Repo knowledge that is not a workflow,
  such as where a new component is registered or how a changeset is written, belongs in
  `.claude/rules/`, which loads when a matching file is touched.
- Repo-local skills keep the `DST — ` description prefix. The `dst:` namespace does that job for
  the plugin's skills, and these are unnamespaced, so the marker is still the only thing saying
  whose workflow they encode.
- `vrt` is **side-effecting**: a dispatch spends Chromatic snapshot quota. `CONTRIBUTING.md`'s
  rules for that class apply in full, and the reason they matter here is that the cost is real and
  lands on the team's plan rather than on the person who ran it.

## Rules and the root file

The root `CLAUDE.md` is loaded into every session, so every line in it is paid for every time.
Keep it under roughly 150 lines: what the repo is, the commands, the rules that apply to every
change, the definition of done, and a table saying where the rest lives.

Anything that only matters for one kind of file goes in `.claude/rules/<area>.md` with a `paths:`
list. Two things to know before writing one:

- `paths` is the only frontmatter key that is read, and a rule **without** it loads at session
  start like `CLAUDE.md` does. An unscoped rule file saves nothing.
- A rule loads when a matching file is read or edited, not when it is merely discussed. A fact
  needed before any file is opened belongs in the root file.

One home per rule still holds: a rule in `rules/` is not repeated in `CLAUDE.md`, the review
checklist or an ADR. Link instead.

## Hooks

Hooks are the opposite of skills. A skill is offered to the model, which decides whether to reach for it. A hook is a shell command Claude Code runs itself at a fixed point in the session, whether anyone wanted it or not. Registration lives in `.claude/settings.json`, scripts live in `.claude/hooks/`, and both are committed, so a hook added here runs on every teammate's machine. Nothing gates it: [workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) holds back a project's `permissions.allow` rules, not its hooks, and the file watcher picks up a settings edit mid-session, so a pull can start one running before the next session.

That removes the confirmation gate the section above depends on. A side-effecting skill can be told to ask first. A hook has nobody to ask, so the rule is stricter instead:

1. **A hook may read, and may write only to a cache.** No edits to tracked files, no network, nothing outward-facing. `node_modules/.cache/` is the place for state, because it is gitignored, per-checkout and disposable. A hook must never dirty the working tree.
2. **It must reject the cases it does not care about in the first few lines**, before doing any work, because it fires on every occurrence of its event. Past that filter, a couple of seconds after a source edit is the ceiling the team accepts: the typecheck hook sits at ~2.6s and is the most expensive hook here. Anything slower needs a change gate, the way that hook gates its `Stop` run on whether the tree moved since the last answer.
3. **It must degrade to silence, never to noise.** A hook that cannot do its job exits 0 and says nothing. `preflight.mjs` swallows every probe failure for this reason: `SessionStart` discards the output of a hook that exits non-zero, so a crash would cost the session its context block and tell nobody why.
4. **It carries a named opt-out**, documented here. Personal settings cannot remove a single hook the project registers, only `disableAllHooks` can, and that is all or nothing. Never set `"disableAllHooks": false` in this repo's settings: project settings win, so it would override every teammate's personal opt-out.

Write hooks as `#!/usr/bin/env node` ESM with Node built-ins only, matching `scripts/check-*.mjs`. The payload arrives as JSON on stdin and `jq` is not guaranteed to be installed. Note that `.claude` is in `.prettierignore`, so nothing will reformat or lint these files for you.

Exit codes are per-event and worth checking against the [hooks reference](https://code.claude.com/docs/en/hooks) rather than assumed. Two that this repo relies on: on `SessionStart`, stdout on exit 0 becomes context the model reads, and on `PostToolUse`, only exit 2 puts stderr in front of the model.

Test one by piping a payload at it, which needs no session:

```sh
echo '{"hook_event_name":"Stop"}' | .claude/hooks/typecheck-changed.mjs; echo "exit=$?"
```

Then `/hooks` in a session lists what is registered, and `claude --debug-file /tmp/claude.log` shows which hooks matched and what they returned.

### Opting out

| What | How |
| --- | --- |
| The post-edit typecheck | `MARIGOLD_SKIP_TYPECHECK_HOOK=1` in your shell |
| The session pre-flight | `MARIGOLD_SKIP_PREFLIGHT_HOOK=1` in your shell |
| Every hook at once | `"disableAllHooks": true` in `~/.claude/settings.json` |

## AI review: local and CI

Review runs in two places and they are not the same tool.

`/dst:review-pr` is on demand, for the author, before anyone else looks. It can reach things CI does not: Jira context, the VRT freshness check, whatever you want to ask it next.

The `Claude Review` workflow is the floor. It runs unattended on a pull request, posts one advisory comment, and cannot approve, request changes or block a merge. Which pull requests it runs on is decided by category, read from the Conventional Commits type in the title. `Claude Mentions` is the interactive half, triggered by writing `@claude` in a thread.

Two rules hold this together:

- **The checklist has one home.** `.github/review-checklist.md` is the agreed standard for this repo, and the CI prompt points at that path rather than restating it. It sits under `.github/` because CI cannot read a per-user plugin install. The `dst` plugin carries its own copy with the Marigold-specific rules removed, so a rule about Marigold components goes here, not there. A rule that exists in a workflow file and not in the checklist will drift out of review.
- **CI never becomes required.** The floor stays advisory. Making it blocking would put a non-deterministic check on the merge path. The action cannot submit a formal review, so it can never block on findings, but the job itself can be marked required in branch protection. Do not.

## Adding and removing

**A new workflow skill goes in the `dst` plugin, not here.** That is the default, and the bar for
adding one to `.claude/skills/` is that it genuinely cannot work anywhere else: it has to depend on
something only this repository has, the way `vrt` depends on this repository being the only one
with a Chromatic workflow. "It is convenient here" is not that bar, and a skill that
starts repo-local because it was quicker is how `review-pr` ended up existing twice.

A hook is the opposite: it is always repo-local, because it runs for everyone who opens the
checkout and has no business firing in someone else's.

Anything committed here is a claim that the team works this way, so add a hook when a check is
worth running for everyone, not to record that you once forgot something.

Removing is a cheaper direction than it looks. Everything deleted stays in git history.
