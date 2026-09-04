# AI toolkit conventions

How the committed AI tooling in this repo is shaped. **Conventions only — this file deliberately does not list the tools it describes.**

Claude Code already injects every available skill's name and description into each session, so a hand-maintained inventory here would be a second copy of that list, kept by hand, drifting a little further with every change. That is what happened last time: the ticket that produced this file (DST-1529) was itself written as a verified-on-disk inventory, and three of its five findings were wrong eight weeks later. Rules only change when we decide to change them, so this file records rules. To see what exists, look in `skills/` or ask Claude what it has.

## Where things come from

| Source | Lives in | Applies to |
| --- | --- | --- |
| First-party skills | `.claude/skills/<name>/SKILL.md` | Committed, ours to edit |
| Project hooks | registered in `.claude/settings.json`, scripts in `.claude/hooks/` | Committed, run automatically for everyone |
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
2. **Confirmation is step 1 of the workflow, before anything is dispatched.** Not a note, not a caveat at the end — the first numbered step.

Narrow `allowed-tools` to the exact commands the skill needs. It is the one guardrail in a skill that is structural rather than a matter of prose.

## Hooks

Hooks are the opposite of skills. A skill is offered to the model, which decides whether to reach for it. A hook is a shell command Claude Code runs itself at a fixed point in the session, whether anyone wanted it or not. Registration lives in `.claude/settings.json`, scripts live in `.claude/hooks/`, and both are committed, so a hook added here runs on every teammate's machine. Nothing gates it: [workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) holds back a project's `permissions.allow` rules, not its hooks, and the file watcher picks up a settings edit mid-session, so a pull can start one running before the next session.

That removes the confirmation gate the section above depends on. A side-effecting skill can be told to ask first. A hook has nobody to ask, so the rule is stricter instead:

1. **A hook may read, and may write only to a cache.** No edits to tracked files, no network, nothing outward-facing. `node_modules/.cache/` is the place for state, because it is gitignored, per-checkout and disposable. A hook must never dirty the working tree.
2. **It must reject the cases it does not care about in the first few lines**, before doing any work, because it fires on every occurrence of its event. Past that filter, a couple of seconds after a source edit is the ceiling the team accepts: the typecheck hook sits at ~2.6s and is the most expensive hook here. Anything slower needs a change gate, the way that hook gates its `Stop` run on whether the tree moved since the last answer.
3. **It must degrade to silence, never to noise.** A hook that cannot do its job exits 0 and says nothing. `preflight.mjs` swallows every probe failure for this reason: `SessionStart` discards the output of a hook that exits non-zero, so a crash would cost the session its context block and tell nobody why.
4. **It carries a named opt-out**, documented here. Personal settings cannot remove a single hook the project registers, only `disableAllHooks` can, and that is all or nothing. Never set `"disableAllHooks": false` in this repo's settings: project settings win, so it would override every teammate's personal opt-out.

Write hooks as `#!/usr/bin/env node` ESM with Node built-ins only, matching `scripts/check-*.mjs`. The payload arrives as JSON on stdin and `jq` is not guaranteed to be installed. Commit the executable bit (`chmod +x`), and note that `.claude` is in `.prettierignore`, so nothing will reformat or lint these files for you.

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

## Adding and removing

Anything committed here is a claim that the team works this way, so add a skill when a workflow is worth standardising, not to record that you once did something twice.

Removing is the cheaper direction than it looks. An unused skill costs about one line of context, so "unused" alone is a weak reason to keep one around — and everything deleted stays in git history.
