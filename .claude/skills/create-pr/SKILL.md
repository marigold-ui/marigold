---
name: create-pr
description: Create a GitHub pull request for the Marigold Design System repo that follows the project's PR template and Conventional Commits title convention with a DST Jira scope (e.g. `feat(DST-1234): ...`). Use whenever the user asks to "create a PR", "open a pull request", "submit this for review", "ship this branch", or types `/create-pr`. Inspects the branch diff to infer change type, extracts the Jira ticket from the branch name or commit history, auto-fills the PR body, and auto-ticks checklist items it can verify (changeset, stories, tests, docs).
---

# Create-PR Skill for Marigold Design System

Help the user open a pull request that matches Marigold's PR template (`.github/PULL_REQUEST_TEMPLATE.md`) and title convention. The goal is a PR a reviewer can act on immediately — correct title format, Jira link, scoped checklist, and test instructions.

## Usage

```
/create-pr
/create-pr for DST-1234
/create-pr https://reservix.atlassian.net/browse/DST-1234
```

By default the skill works from the current branch and infers the Jira ticket from the branch name or commit history. If the ticket isn't on the branch (or you don't want to switch), pass it in the invocation — accepts `DST-1234` or a full Jira URL. An explicit ticket overrides inference.

## Title format

Marigold uses **Conventional Commits with the Jira ticket as the scope**:

```
<type>(DST-<number>): <short description>
```

| Field | Notes |
|-------|-------|
| `type` | `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `build`, `ci`, `revert` |
| `DST-<number>` | The Jira ticket (project key `DST`). If no ticket exists, omit the scope entirely: `chore: bump deps`. Don't invent a number. |
| description | Imperative, lowercase first letter (after the type), no trailing period, under ~60 chars |

Examples:
- `feat(DST-1234): add loading state to Button`
- `fix(DST-5678): correct focus ring on Select`
- `chore(DST-9012): bump react-aria to 1.5.0`
- `docs: clarify Drawer usage example` (no ticket — fine for trivial docs)

## Workflow

### 1. Pre-flight checks

Run these in parallel — fail fast if any block PR creation:

```bash
git status --short
git branch --show-current
git log --oneline origin/main..HEAD
git diff --stat origin/main...HEAD
```

Refuse to proceed (and tell the user why) if:
- The current branch is `main` — ask them to create a feature branch first
- There are uncommitted changes — ask whether to commit, stash, or abort
- There are no commits ahead of `main` — nothing to PR

If the branch isn't pushed yet or has unpushed commits, note this — you'll push after the user confirms in step 6.

### 2. Gather change context

Use the diff to classify the change. This determines the title `type`, which body sections to include, and which checklist items to auto-tick.

```bash
git diff --name-status origin/main...HEAD
```

Classify changed paths against these buckets — a PR can fall into several:

| Bucket | Path patterns | Implies |
|--------|---------------|---------|
| Component source | `packages/components/src/**` (excluding `.test.tsx`, `.stories.tsx`, `.styles.ts`) | UI change → screenshots, VRT, a11y |
| New component | A new directory under `packages/components/src/` | `feat` |
| Stories | `**/*.stories.tsx` | Tick "Stories added/updated" |
| Unit tests | `**/*.test.tsx`, `**/*.test.ts` | Tick "Unit tests added/updated" |
| Theme/styles | `themes/**`, `**/*.styles.ts` | UI change → screenshots, VRT |
| System utilities | `packages/system/src/**` | Possibly UI-adjacent |
| Docs | `docs/**`, `**/*.mdx` | Tick "Documentation added/updated" |
| Changeset | `.changeset/*.md` (new files) | Tick "Changeset added" |
| Config/build | `package.json`, `pnpm-lock.yaml`, `turbo.json`, `tsconfig*.json`, `.github/**` | Likely `chore`/`build`/`ci` |
| Tooling/scripts | `scripts/**`, `.husky/**` | Likely `chore` |

**Inferring the `type`:**
- New component or new public API → `feat`
- Bug fix (look for "fix" in commit messages or branch name) → `fix`
- Docs only → `docs`
- Test only → `test`
- Lockfile/deps/config only → `chore` or `build`
- CI workflow changes → `ci`
- Pure code restructuring (no behavior change) → `refactor`

When ambiguous, pick the most user-facing type (`feat` > `fix` > `refactor` > `chore`). Show the inferred type to the user in step 6 — they can override.

### 3. Extract the Jira ticket

If the user passed a DST ticket or Jira URL in the invocation (e.g. `/create-pr for DST-1234`), use that and skip inference. Otherwise search these sources in order — stop at the first hit:

1. **Branch name** — match `DST-\d+` case-insensitively (e.g. `feature/DST-1234-add-loading-state`)
2. **Commit messages on this branch** — `git log origin/main..HEAD --format=%B` and grep for `DST-\d+`
3. **Existing draft PR description** — if there's already an open PR (`gh pr view --json body`), reuse the ticket from it

If nothing is found, ask the user once for the ticket number. Accept `DST-1234`, `1234`, or "none" (for trivial PRs that genuinely don't need a ticket).

### 4. Build the PR body

Use the PR template as the skeleton. The repo's template lives at `.github/PULL_REQUEST_TEMPLATE.md` — read it if its shape is unclear, but the current shape is reproduced below for reference.

**Sections to fill:**

#### Description
2–4 sentences covering what changed and why. For UI changes, describe current vs new behavior explicitly. Pull context from:
- Commit messages (`git log origin/main..HEAD --format='%s%n%n%b'`)
- The Jira ticket title/description if available (via `mcp__plugin_atlassian_atlassian__getJiraIssue` — only if Jira tools are present in this session, otherwise skip)

End the section with `Closes DST-XXXX` on its own line. Omit the line if there's no ticket.

#### Screenshots / Preview
**Only include this section if the change touches UI** (Component source, Stories visible to users, Theme/styles, or new components). Otherwise delete it entirely — leaving an empty Before/After table is worse than no table.

Leave the table cells empty for the user to fill in:

```markdown
| Before | After |
| ------ | ----- |
|        |       |
```

Add a line: `<!-- Paste screenshots/GIFs above, or link the Storybook preview once it's built. -->`

#### Test Instructions
Numbered steps a reviewer can follow. Derive from the change:
- For new components: "Open Storybook, navigate to `Components/<Name>`, exercise each story"
- For bug fixes: reproduce steps from the ticket + verification
- For chores/deps: "Run `pnpm install && pnpm typecheck:only && pnpm test`"
- For docs only: "Run `pnpm start`, navigate to the updated page"

If you genuinely can't infer anything useful, write `1. No manual testing required — covered by CI.` rather than leaving it blank.

#### Breaking Changes
Default to `No`. Flag as `Yes` only if you see:
- Removed exports from a `packages/*/src/index.ts`
- Renamed component props (changed type in `*Props` interface)
- Major version bumps in a changeset
- Removed/renamed CSS custom properties in `themes/`

If `Yes`, add a short migration note and apply the `🚨 Breaking Change` label to the PR (pass `--label "🚨 Breaking Change"` to `gh pr create` in step 7).

#### Checklist
Start with all items unchecked, then auto-tick the ones you can verify:

| Item | Auto-tick condition |
|------|---------------------|
| Storybook preview and Marigold docs preview are available | Leave unchecked — depends on CI; user verifies |
| Stories added/updated (with `component-test` tag where applicable) | Tick if any `*.stories.tsx` in the diff |
| Unit tests added/updated | Tick if any `*.test.tsx` or `*.test.ts` in the diff |
| Component documentation added/updated (if it exists) | Tick if any `docs/**` or `**/*.mdx` in the diff |
| Accessibility reviewed against ARIA APG (for new/changed interactive components) | Leave unchecked — requires human judgment; tick only if there's an explicit a11y commit/note |
| Visual regression tests updated (for UI changes) | Leave unchecked — handled by Chromatic, user verifies |
| Changeset added (`pnpm changeset`) | Tick if `.changeset/*.md` (other than `README.md`/`config.json`) is added in the diff |

If the change is non-UI (e.g. CI config, docs typo, internal refactor), it's fine to tick "Visual regression tests updated" as N/A — but prefer leaving it unchecked and noting "N/A — no UI changes" in the Description.

### 5. Detect missing changeset (warn, don't block)

If the diff touches `packages/**/src/**` or `themes/**` and there's no new file in `.changeset/`, mention this to the user before creating the PR — a changeset is almost always required for those paths. Offer to run `pnpm changeset` first, or proceed without it if the user confirms.

### 6. Confirm with the user before creating

Show the user the full proposed PR:

```
Title: feat(DST-1234): add loading state to Button

Body:
<full rendered body>

Branch: feature/DST-1234-loading-state → main
Push needed: yes (3 unpushed commits)
```

Use `AskUserQuestion` with options:
- **Create PR** — proceed
- **Create as draft** — pass `--draft` to `gh pr create`
- **Edit title/body** — let the user redirect, then re-show
- **Cancel**

Do **not** push or create without an explicit confirm.

### 7. Push and create the PR

If the branch has unpushed commits or isn't tracking a remote, push first:

```bash
git push -u origin <branch-name>
```

**Never** pass `--no-verify` — pre-push hooks exist for a reason. If a hook fails, surface the failure to the user and stop. Do not retry with `--no-verify`.

Then create the PR using `gh pr create` with a HEREDOC body to preserve formatting:

```bash
gh pr create \
  --title "feat(DST-1234): add loading state to Button" \
  --body "$(cat <<'EOF'
# Description

Adds a `loading` prop to the Button component...

Closes DST-1234

## Test Instructions

1. Open Storybook → Components/Button/Loading
2. Confirm the spinner appears...

## Breaking Changes

No

## Checklist

- [ ] Storybook preview and Marigold docs preview are available
- [x] Stories added/updated (with `component-test` tag where applicable)
- [x] Unit tests added/updated
- [ ] Component documentation added/updated (if it exists)
- [ ] Accessibility reviewed against [ARIA APG](https://www.w3.org/WAI/ARIA/apg/) (for new/changed interactive components)
- [ ] Visual regression tests updated (for UI changes)
- [x] Changeset added (\`pnpm changeset\`)
EOF
)"
```

Add `--draft` if the user chose "Create as draft" in step 6.

If Breaking Changes was flagged as `Yes` in step 4, also pass `--label "🚨 Breaking Change"`.

After creation, print the PR URL `gh pr create` returns.

### 8. Post-creation summary

Briefly tell the user:
- The PR URL
- Which checklist items were auto-ticked vs left for them to verify (especially screenshots and VRT)
- A reminder to run `/run-chromatic` if the PR touches UI and they want visual regression coverage now

## Edge cases

**Existing PR for this branch.** If `gh pr view --json url -q .url` returns a URL, an open PR already exists. Don't try to create another. Offer to update the existing PR's title/body instead (`gh pr edit <number> --title ... --body ...`) — confirm with the user first.

**Detached HEAD / no upstream.** If `git branch --show-current` is empty, the user is on a detached HEAD. Ask them to check out a branch first.

**Multiple Jira tickets in the branch.** If commits reference different DST-XXXX tickets, use the one in the branch name if it matches one of them; otherwise ask the user which is the primary ticket. The others can be mentioned in the Description as "Related: DST-XXXX".

**Revert PRs.** If commits start with `Revert "..."`, use type `revert` and reference the original commit/PR in the Description.

**Empty diff vs main but commits exist.** This shouldn't happen, but if it does, the branch has only merge commits or whitespace changes — ask the user what they want to PR.

## Tools required

- `Bash(git *)` — branch state, diff, log, push
- `Bash(gh pr create *)` — create the PR
- `Bash(gh pr view *)` — check for existing PR
- `Bash(gh pr edit *)` — update existing PR if one already exists
- `Read` — inspect the PR template and any files needed to infer context
- `AskUserQuestion` — confirm before pushing/creating
- `mcp__plugin_atlassian_atlassian__getJiraIssue` (optional) — pull ticket title/description for the body

## Notes

- The PR template comment block at the top of `.github/PULL_REQUEST_TEMPLATE.md` is for the contributor's eyes — leave it in the body so future PRs created via the GitHub UI still see it.
- The skill's job is to produce a strong **first draft**. Reviewers will still need screenshots and VRT decisions — flag those explicitly rather than pretending the PR is "done".
- Never use `--no-verify`, never force-push, never amend pushed commits unless the user explicitly asks.
