---
name: changeset
description: DST — Write the changeset file for the current change, with the right packages, bump level and release-note text in the repository's own format. Use when the user asks to "add a changeset", "write the changeset", "does this need a changeset", or types `/changeset`, and at the end of any change to a published package. Writes one file under `.changeset/`. Never versions or publishes.
argument-hint: [ticket key]
---

# Changeset

A changeset is the only thing that turns a merged change into a release, and its text becomes
the changelog entry consumers read. Nothing in CI fails when one is missing, so the change
simply never ships. Write the file by hand: `pnpm changeset` is an interactive prompt and does
not work from here.

## Usage

```
/changeset
/changeset DST-1234
```

## Workflow

### 1. Decide whether one is needed

```bash
git diff --name-only main...HEAD
git status --short
```

Needed when the diff touches the source of a published package: `packages/components`,
`packages/system`, `packages/icons`, `packages/types`, `packages/cli`, `themes/theme-rui`, or
`docs` content that should appear in the docs changelog.

Not needed for tests, stories, CI, repo tooling, `.claude/`, `.memory/` or config-only changes.
Say so and stop.

### 2. Pick packages and bump

One entry per published package whose source changed.

| Bump | When |
| --- | --- |
| `patch` | A bug fix, or a visual correction that keeps the same API |
| `minor` | New, additive API: a component, a prop, a variant, a token |
| `major` | Anything a consumer must change code for. **Never choose this alone.** Stop and ask |

`@marigold/system`, `@marigold/components` and `@marigold/docs` are a fixed group and always
get the same version, so the highest bump among them applies to all three.

If `.changeset/pre.json` exists, the repo is in prerelease mode. Write the changeset as usual
and tell the user: the release goes to the prerelease dist-tag, not `latest`.

### 3. Write the file

Name it `.changeset/<ticket-lowercase>_<short-slug>.md`, for example
`.changeset/dst-1829_filefield-label-addon.md`. Take the ticket from the argument, the branch
name or the commits. With no ticket, use a descriptive slug.

```md
---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1829): name and describe the FileField trigger by its label and addon

`FileField` now announces itself like every other form field. Its label used to sit next to the
field without being linked to anything, so a screen reader read only "Upload" on focus.
```

- First line: `<type>(<TICKET>): <summary>`, same type as the PR title.
- Then one or more paragraphs for a **consumer**: what changed for them, what it looked like
  before, and what to do if anything. Name components and props in backticks. Leave out file
  names, refactoring notes and how the fix works internally.
- A breaking change states the migration: before, after, and the codemod if there is one.
- Prose rules apply (`.claude/rules/prose.md`): no em dashes, no semicolons.

### 4. Check

```bash
pnpm lint:prose
```

Then read it back as someone upgrading who has never seen the PR. If they could not tell
whether they are affected, rewrite it.

### 5. Stop there

Do not run `changeset version`, `changeset publish` or `changeset pre`. The release workflow
does the first two when the release PR merges, and switching prerelease mode is a team decision.
