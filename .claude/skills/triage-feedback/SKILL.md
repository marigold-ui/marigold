---
name: triage-feedback
description: Marigold repo — Make one triage pass over all feedback on a PR, from both GitHub review threads and Vercel preview toolbar comments, then reply and resolve in whichever system each item came from. Use when the user asks to "triage feedback", "go through the review comments", "handle the PR feedback", "address the preview comments", or types `/triage-feedback`. It posts replies, resolves threads and pushes commits, so run it only on an explicit request, never proactively and never as a follow-up to unrelated work.
allowed-tools: Bash(gh pr view *), Bash(gh pr list *), Bash(gh pr diff *), Bash(gh api graphql *), Bash(git branch --show-current), Bash(git status --porcelain), Bash(git log *), Bash(git add *), Bash(git commit *), Bash(git push *), Bash(pnpm typecheck:only), Bash(pnpm build), Read, Edit, Write, Grep, Glob
---

# Triage-Feedback Skill for Marigold Design System

Feedback on a PR arrives in two places. GitHub review threads carry the code review, and Vercel preview toolbar comments carry everything someone noticed while clicking through the deployed docs or Storybook. Working them by hand means two tabs, two idioms for "resolved", and steps that get missed.

This skill makes one pass over both, triages every item on the same three axes, and acts on each in the system it came from.

**Two gates, and they are the shape of the skill.** The triage table in step 4 is the approval for every reply and resolve. The push confirmation in step 6 is separate, because pushing is governed by a standing rule of its own. Steps 1 to 3 are read-only. Nothing before step 5 changes a file, and nothing before step 7 leaves this machine.

## Usage

```
/triage-feedback              # the current branch's PR
/triage-feedback 5776         # a PR by number
/triage-feedback --github     # one source only
/triage-feedback --vercel
```

With no argument the skill works from the current branch. A PR number lets you triage someone else's, which changes the tone of every reply: you are answering a reviewer on your own PR, or responding to feedback on theirs. Say which case you are in when you draft replies.

## Workflow

### 1. Resolve the target

```bash
git branch --show-current
gh pr view --json number,title,headRefName,baseRefName,state,isDraft,headRefOid
```

With a PR number in `$ARGUMENTS`, pass it to `gh pr view` instead and take `headRefName` from the result. The branch name is the join key between the two sources, so resolve it before gathering either.

Stop if the PR is merged or closed. Resolving threads on a landed PR is noise, and the fixes have nowhere to go.

Record `headRefOid`. Any thread whose feedback predates a later commit may already be fixed, which is a Validity signal in step 3.

### 2. Gather

Both sources are read-only here. Run them in parallel.

#### GitHub

REST does not expose whether a review thread is resolved, so this has to be GraphQL:

```bash
gh api graphql -f query='
query($o:String!,$r:String!,$n:Int!){
  repository(owner:$o,name:$r){
    pullRequest(number:$n){
      headRefName
      reviewThreads(first:100){
        nodes{
          id isResolved isOutdated path line
          comments(first:50){nodes{databaseId author{login} body createdAt}}
        }
      }
    }
  }
}' -f o=marigold-ui -f r=marigold -F n=<number>
```

- **Skip threads where `isResolved` is true.** They are done, and reopening them to say so is noise.
- **`isOutdated` means the diff moved under the comment.** It is the single strongest stale signal available, so carry it into Validity rather than re-deriving staleness from the diff.
- `line` is `null` on outdated threads. Do not treat that as a malformed thread.
- Also fetch `gh pr view <n> --json reviews` for review bodies with no inline comment attached. They carry the summary objections and are easy to miss.

#### Vercel

Resolve the team at run time. Never hardcode the id: it is account state, and this file is committed.

```
list_teams                        -> teamId
list_toolbar_threads              -> teamId, branch: <headRefName>, status: unresolved
get_toolbar_thread                -> full messages when a thread is truncated in the list
```

**Filter by `branch`, never by `projectId`.** Marigold's preview feedback lands in two Vercel projects, `marigold-docs` and `marigold-storybook`, and a project filter silently drops whichever one you did not name. Branch spans both in a single call.

`.vercel/project.json` is **not** a prerequisite, whatever an older ticket may say. `teamId` is the only required argument on these tools, `list_teams` supplies it, and `.vercel` is gitignored so the file can never be committed anyway.

Thread branch names match our git branch names, which is what makes the join work. Older branches do not all follow the convention (`dst-1745_fix-popover`), so match the string loosely rather than by `feat/` prefix.

Each thread carries context worth keeping: `webUrl` for the table, `context.href` for the exact preview page, `context.pageTitle`, a CSS `selector`, a React component tree, and often screenshot attachments. Carry all of it into the triage row. The component tree in particular usually identifies the file faster than grepping.

### 3. Triage

Every item gets all three axes. No item is skipped, including ones you intend to do nothing about.

| Axis | Values |
| --- | --- |
| **Validity** | `confirmed`, `stale`, `incorrect` |
| **Severity** | `blocker`, `should-fix`, `nice-to-have`, `question` |
| **Action** | `apply`, `push back`, `needs-human` |

Read each item against the current code, not against the diff that provoked it. A comment is `stale` when the code it describes has since changed, and `incorrect` when the code is as described but the reader was wrong about it. Those need different replies, so do not collapse them.

**Visual and design comments route straight to `needs-human`.** Do not attempt to judge from a screenshot whether something is correctly aligned, sufficiently prominent, or visually balanced. This is a deliberate v1 limit rather than a gap: a wrong confident answer about a visual is worse than an honest hand-off. In practice this catches a large share of Vercel items, which is expected.

**Only `needs-human` items interrupt.** Do not stop to ask about each row. The table in step 4 is the single interrupt for the whole pass.

Correlate across sources but do not merge. The same problem raised in both a review thread and a preview comment is two rows, because each needs its own reply and its own resolve. Note the correlation in the table so the person can see it is one issue.

### 4. Confirm the triage table

Render the table as text and **end the turn**.

```
| # | Source | Where | Who | Item | Validity | Severity | Action |
|---|--------|-------|-----|------|----------|----------|--------|
| 1 | GitHub | Popover.tsx:58 | @sebald | containerPadding is symmetric… | confirmed | should-fix | apply |
| 2 | Vercel | /components/…/provider | @osama | scroll thumb only moves per category | confirmed | question | needs-human |
```

Below the table, list every `needs-human` row again in full with its link (`webUrl` for Vercel, the thread URL for GitHub), because those are the rows that actually need the person.

Then state plainly what the act phase will do: how many fixes, which files, how many replies, how many resolves.

**Never use `AskUserQuestion`, here or anywhere in this skill.** It is resolved by the permission component, so on a machine running `skipAutoPermissionPrompt` under `permissions.defaultMode: "auto"` it never reaches a screen. It returns the first option and nothing in the result says a human was never asked. Ending the turn is the one gate no setting can answer on someone's behalf.

Offer: **Approve**, **Edit** (change any row's Action, re-render, ask again), or **Stop**.

Approval here covers the replies and the resolves. It does not cover the push, which has its own gate.

### 5. Apply

Only rows marked `apply`. Work them smallest-blast-radius first so a later failure does not strand a half-finished larger change.

```bash
pnpm typecheck:only
pnpm build          # only if a package's public surface changed
```

Then a changeset, if any package under `packages/` or `themes/` changed. Body starts with the Conventional Commits line, for example `fix(DST-1234): …`. Docs-only changes still need one (`@marigold/docs: patch`).

Commit. Do not push.

### 6. Confirm the push

The second gate. Render what is about to leave the machine and **end the turn**:

```
Push      feat/DST-1234-…  ->  origin   (2 commits ahead)
Commits   fix(DST-1234): correct containerPadding on the gutter side
          fix(DST-1234): drop the data-testid query from the story
Then      4 GitHub replies + 4 resolves, 2 Vercel replies + 2 resolves
```

Offer: **Push and reply**, **Reply only** (leave the branch unpushed), or **Stop**.

Pushing is an outward action under a standing never-without-confirmation rule, and it is a different act from answering a comment. That is why it is gated separately even though step 4 already approved the replies.

### 7. Reply and resolve

Reply in the origin system. Every reply names what changed and, where a fix landed, the commit.

#### GitHub

Write the body to a file first, then read it with `-F`. Never build the body as an inline shell string: quoting eats backticks, newlines and emoji, and a mangled review reply is public.

```bash
cat > /tmp/reply.md <<'EOF'
Fixed in abc1234. `containerPadding` now applies only on the gutter side.
EOF

gh api graphql -F body=@/tmp/reply.md -f threadId=<thread node id> -f query='
mutation($threadId:ID!,$body:String!){
  addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:$threadId, body:$body}){
    comment{ url }
  }
}'
```

**`-F` reads the file. `-f` does not.** In `gh api`, `-f/--raw-field` sends the literal string `@/tmp/reply.md`, exits 0, and posts garbage. This is verified behaviour on `gh 2.92.0`, not a theoretical risk. See the convention in `CLAUDE.md`.

Then resolve:

```bash
gh api graphql -f threadId=<thread node id> -f query='
mutation($threadId:ID!){
  resolveReviewThread(input:{threadId:$threadId}){ thread{ isResolved } }
}'
```

Resolve only threads you actually acted on. A `needs-human` row stays open, and so does a `push back` row until the reviewer answers.

#### Vercel

```
reply_to_toolbar_thread            -> teamId, threadId, markdown
change_toolbar_thread_resolve_status -> teamId, threadId, resolved: true
```

`reply_to_toolbar_thread` takes `markdown` as a plain string with no file flag, so the `--body-file` rule does not apply on this side. Keep replies short: the toolbar renders them in a small panel.

### 8. Summarise

Report, and stop:

- what was fixed, and in which commits
- what was pushed, or that the branch is still local
- replies and resolves posted, per system
- every `needs-human` row still open, with its link
- every `push back` row, and what you said

Then stop. Acting on the `needs-human` rows is the next thing the user asks for, not something this skill continues into.

## Rough edges

- **Vercel MCP tool names carry a plugin prefix** (`mcp__plugin_vercel_vercel__list_teams`) which differs with how the developer installed the plugin. Use whichever is connected.
- **`list_toolbar_threads` defaults to unresolved**, which is what you want. Passing `status: resolved` is only useful when hunting for something already closed.
- **Toolbar threads include localhost sessions** (`isLocalhost: true`). Those came from someone's dev server, not the preview, and are usually noise on a PR pass.
- **A Vercel thread has no notion of "outdated".** Unlike a GitHub review thread, nothing marks it stale when the code moves, so staleness on that side always has to be read from the code.
- **`gh api graphql` needs the repo owner and name explicitly.** There is no `{owner}/{repo}` placeholder expansion in a GraphQL query the way there is in a REST path.

## Edge cases

**No feedback in either source.** Say so and stop. Do not go looking for something to fix.

**The PR is a draft.** Proceed, and say it is a draft. Feedback on drafts is normal and often the point.

**A thread's fix belongs in another PR.** Mark it `push back`, reply saying where it belongs, and leave it unresolved. Do not silently widen this PR's scope.

**Every Vercel row lands on `needs-human`.** Expected on a visual-heavy PR. Still render the table, since the value is the hand-off list, and say plainly that the skill judged none of them.

**The branch has no PR.** Vercel threads may still exist, since previews are built per branch. Triage them, and say there is no GitHub side rather than treating it as an error.
