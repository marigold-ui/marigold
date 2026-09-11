---
name: triage-feedback
description: Marigold repo — Make one triage pass over all feedback on a PR, from both GitHub review threads and Vercel preview toolbar comments, then reply and resolve in whichever system each item came from. Use when the user asks to "triage feedback", "go through the review comments", "handle the PR feedback", "address the preview comments", or types `/triage-feedback`. It posts replies, resolves threads and pushes commits, so run it only on an explicit request, never proactively and never as a follow-up to unrelated work.
allowed-tools: Bash(gh pr view *), Bash(gh repo view *), Bash(gh pr diff *), Bash(gh api graphql *), Bash(gh api repos/*), Bash(gh api user *), Bash(git branch --show-current), Bash(git status --porcelain), Bash(git log *), Bash(git add *), Bash(git commit *), Bash(git push *), Bash(pnpm typecheck:only), Bash(pnpm build), Read, Edit, Write, Grep, Glob, mcp__plugin_vercel_vercel__list_teams, mcp__plugin_vercel_vercel__list_toolbar_threads, mcp__plugin_vercel_vercel__get_toolbar_thread, mcp__plugin_vercel_vercel__reply_to_toolbar_thread, mcp__plugin_vercel_vercel__change_toolbar_thread_resolve_status
---

# Triage-Feedback Skill

Feedback on a PR arrives in two places. GitHub review threads carry the code review, and Vercel preview toolbar comments carry everything someone noticed while clicking through the deployed preview. Working them by hand means two tabs, two idioms for "resolved", and steps that get missed.

This skill makes one pass over both, triages every item on the same three axes, and acts on each in the system it came from.

**Two gates, and they are the shape of the skill.** The triage table in step 4 is the approval for every reply and resolve. The push confirmation in step 6 is separate, because pushing is governed by a standing rule of its own. Steps 1 to 3 are read-only. Nothing before step 5 changes a file, and nothing before step 7 leaves this machine.

**Two modes, and step 1 decides which.** On your own PR you are the author, and feedback is work incoming. On someone else's you are a reviewer, and the feedback is yours: there is nothing to fix, only replies to write and threads to close. Getting this wrong produces a skill that tries to commit fixes to a branch it does not own.

## Usage

```
/triage-feedback              # the current branch's PR
/triage-feedback 5776         # a PR by number
/triage-feedback --github     # one source only
/triage-feedback --vercel
/triage-feedback --repo marigold-ui/insights 116   # a PR in another repo
```

## Workflow

### 1. Resolve the repo, the target, the sources and the mode

```bash
gh api user -q .login
gh repo view [<owner>/<name>] --json nameWithOwner -q .nameWithOwner
gh pr view [<number>] [--repo <owner>/<name>] --json number,title,author,headRefName,baseRefName,state,isDraft,headRefOid
git branch --show-current
```

Stop if the PR is merged or closed. Resolving threads on a landed PR is noise, and the fixes have nowhere to go. A draft is fine, proceed and say so.

**Repo.** Nothing in this skill is bound to one repository. `--repo <owner>/<name>` names it explicitly, otherwise `gh repo view` reads it from the checkout's remote. Record the result: every `gh` call below takes it, and the GraphQL query in step 2 needs the owner and the name as separate values.

The repo argument is **positional** on `gh repo view` and a **flag** on `gh pr view`. There is no `--repo` flag on the former, and `GH_REPO` does not override it either: it reports the remote regardless, so it is not a second way in. Verified on `gh 2.92.0`. Resolve once, in this step, and pass the result explicitly everywhere after it.

**Sources.** Both by default. `--github` runs the GitHub half alone, `--vercel` the Vercel half alone, and passing both is the same as passing neither. A source that is switched off is not gathered in step 2 and contributes no rows. Step 4 names which sources ran, so an empty table is never mistaken for a PR with no feedback.

**Mode**, because it decides which half of this skill runs:

| Condition | Mode | What the skill does |
| --- | --- | --- |
| PR author is you, branch checked out | **author** | Full workflow, steps 1 to 8 |
| PR author is you, branch **not** checked out | **author, no apply** | Ask them to switch to it and re-run. Until then every `apply` row becomes `needs-human`. Replies do not need the code, fixes do |
| PR author is someone else | **respond-only** | Steps 1 to 4, then 7 and 8. **Skips 5 and 6 entirely** |
| No PR for the branch | **author** | The GitHub source is absent, which is not an error. Gather Vercel only and say so |
| PR is in a repo other than the checkout | **author, no apply** or **respond-only**, by author | The worktree is a different repository, so no fix can land there. Replies and resolves still work |

Mode is about who owns the branch, not about who opened a PR. That is why a branch with no PR is still author mode: previews build per branch, so toolbar feedback can arrive before a PR exists.

`--repo` pointing elsewhere is that same constraint from the other side. The feedback is reachable, the code is not, so the pass is a reply pass whatever the authorship says. Never offer to fix something in a repository you are not standing in.

The skill does not check the branch out itself. Steps 1 to 3 are read-only, and swapping someone's worktree under them is the largest side effect in the whole pass. Asking keeps that invariant true, which is why no checkout command appears in `allowed-tools`.

In respond-only mode there is nothing to apply, nothing to commit, nothing to push, and no changeset. Saying "I will now apply 3 fixes" on a branch you do not own is the failure this table exists to prevent.

Record `headRefOid`. Every code check in step 3 reads that commit, not your worktree.

### 2. Gather

Every source selected in step 1 is read-only here. Run them in parallel.

#### GitHub

Skip this half when `--vercel` was passed, or when the branch has no PR.

REST does not expose whether a review thread is resolved, so this has to be GraphQL:

```bash
gh api graphql -f query='
query($o:String!,$r:String!,$n:Int!){
  repository(owner:$o,name:$r){
    pullRequest(number:$n){
      reviewThreads(first:100){
        pageInfo{hasNextPage}
        nodes{
          id isResolved isOutdated path line
          comments(first:50){totalCount nodes{databaseId author{login} body createdAt url}}
        }
      }
    }
  }
}' -f o=<owner> -f r=<name> -F n=<number>
```

- **Skip threads where `isResolved` is true.** They are done, and reopening them to say so is noise.
- **`isOutdated` means the diff moved under the comment.** It is the single strongest stale signal available, so carry it into Validity rather than re-deriving staleness from the diff.
- `line` is `null` on outdated threads. Do not treat that as a malformed thread.
- **Record who spoke last** in each thread, from the final entry in `comments.nodes`. Step 3 turns it into the Turn column, and it is the difference between feedback nobody has answered and feedback already answered that is waiting on you.
- **Read the caps back.** `hasNextPage` true, or a thread whose `comments.totalCount` exceeds the 50 fetched, means the gather is partial. Say so in step 4. A table that silently drops the 101st thread looks complete and is not, which is the one failure this skill cannot afford.
- Also fetch `gh pr view <n> --json reviews` for review bodies with no inline comment attached. They carry the summary objections and are easy to miss.

#### Vercel

Skip this half when `--github` was passed.

Resolve the team at run time. Never hardcode the id: it is account state, and this file is committed.

```
list_teams                        -> teamId
list_toolbar_threads              -> teamId, branch: <headRefName>, status: unresolved, limit: 100
get_toolbar_thread                -> full messages when a thread is truncated in the list
```

**Pass `limit` explicitly.** It defaults to 20, which a visual-heavy docs PR reaches, and nothing in the response says the list was cut short. If a full page comes back, page with `offset` before triaging.

**Filter by `branch`, never by `projectId`.** One repo's preview feedback can land in several Vercel projects, and a project filter silently drops whichever one you did not name. Branch spans all of them in a single call. Marigold is the worked example: `marigold-docs` and `marigold-storybook` both build from this repo.

`.vercel/project.json` is **not** a prerequisite, whatever an older ticket may say. `teamId` is the only required argument on these tools, `list_teams` supplies it, and `.vercel` is gitignored so the file can never be committed anyway.

A toolbar thread's branch name is our git branch name, which is what makes the join work. Pass `headRefName` from step 1 **verbatim**. `branch` is an exact match, not a substring one: `DST-1665` returns zero threads where `feat/DST-1665-listview-selection` returns six. Naming is not uniform either (`dst-1745_fix-popover`, `fumadocs`, `multiselect-recipe`), so never rebuild the name from the ticket key or assume a `feat/` prefix.

**An empty result is ambiguous, and the fix is not to drop the filter.** Zero threads means either no feedback or a branch string that did not match, and the two are indistinguishable. Do not settle it by listing the team unfiltered: that returns every open thread in every project and overflows a single tool result, 64 threads and roughly 244k characters when this was measured. Narrow instead, with `search` for wording you expect in the comment or `page` for the preview path. `limit: 100` is the right cap *with* a branch filter and the wrong one without.

Each thread carries context worth keeping: `webUrl` for the table, `context.href` for the exact preview page, `context.pageTitle`, a CSS `selector`, a React component tree, and often screenshot attachments. Carry all of it into the triage row. The component tree in particular usually identifies the file faster than grepping.

### 3. Triage

Every item gets all five columns. No item is skipped, including ones you intend to do nothing about.

| Column | Values |
| --- | --- |
| **Validity** | `confirmed`, `stale`, `incorrect`, `unassessed` |
| **Severity** | `blocker`, `should-fix`, `nice-to-have`, `question` |
| **Action** | `apply`, `push back`, `needs-human` |
| **Thread** | `resolve`, `keep open` |
| **Turn** | `yours` when someone else spoke last, `theirs` when you did |

The first three are the triage axes and are your judgement. `Thread` is a judgement too, but about the conversation rather than the code. `Turn` is the only one you do not decide: it is thread state, read off the data in step 2.

#### Reading an item against the code

Read each item against **the PR head**, not your worktree and not the diff that provoked the comment. In respond-only mode the worktree is a different branch entirely, and even in author mode it can be ahead of what the reviewer saw.

```bash
gh pr diff <number> --repo <owner>/<name>              # what the PR actually changes
gh pr diff <number> --repo <owner>/<name> --name-only  # fast check that a file exists
gh api -H "Accept: application/vnd.github.raw" \
  "repos/<owner>/<name>/contents/<path>?ref=<headRefOid>"    # one file at that commit
```

**Send the raw Accept header.** Without it the contents endpoint returns a JSON envelope with the source base64-encoded in `.content`, which is not something to read code from. Verified on `gh 2.92.0`.

Quote any URL containing `?`. Unquoted, zsh treats it as a glob and fails with `no matches found` before `gh` ever runs.

A comment is `stale` when the code it describes has since changed, and `incorrect` when the code is as described but the reader was wrong about it. Those need different replies, so do not collapse them.

#### `unassessed`, and when it is the only honest answer

**Visual and design comments route straight to `needs-human`.** Do not attempt to judge from a screenshot whether something is correctly aligned, sufficiently prominent, or visually balanced. This is a deliberate v1 limit rather than a gap: a wrong confident answer about a visual is worse than an honest hand-off.

Those items take Validity `unassessed`, because Validity is exactly the judgement the rule forbids. Do not put `confirmed` on something you did not verify.

`unassessed` is for that case only. It is never a shrug for an item you could have checked and did not.

#### Turn

`Turn: theirs` means you had the last word and nobody has answered. Those rows need no reply from you: adding one is nagging. The exception is a row you then fixed. "Fixed in abc1234" is news rather than a nudge, so an `apply` row earns a reply whichever way Turn points. They still belong in the table, because an unanswered blocker of yours is the thing most likely to have stalled the PR.

`Turn: yours` is where the work is, in both modes. In author mode it is unaddressed review feedback. In respond-only mode it is the author answering you, and often asking you something back.

#### Thread

`Action` says what happens to the code. `Thread` says what happens to the conversation, and the two come apart more often than they look.

By default `push back` and `needs-human` keep the thread open, and `apply` resolves it. What breaks the last one is a **partial apply**: you did some of what was asked and deferred the rest. The code action is still `apply`, but resolving would decide on the reviewer's behalf that they are satisfied with half an answer. Those rows are `apply` plus `keep open`, and the reply has to say which half landed and where the rest went.

`resolve` needs the item to be both acted on *and* finished. Anything else keeps the thread open, and step 8 reports it as still waiting.

#### Correlation

Correlate across sources but do not merge. The same problem raised in both a review thread and a preview comment is two rows, because each needs its own reply and its own resolve. Note the correlation in the table so the person can see it is one issue.

**Only `needs-human` items interrupt.** Do not stop to ask about each row. The table in step 4 is the single interrupt for the whole pass.

### 4. Confirm the triage table

Render the table as text and **end the turn**.

```
| # | Source | Where | Who | Item | Validity | Severity | Action | Thread | Turn |
|---|--------|-------|-----|------|----------|----------|--------|--------|------|
| 1 | GitHub | Popover.tsx:58 | @sebald | containerPadding is symmetric… | confirmed | should-fix | apply | resolve | yours |
| 2 | Vercel | /components/…/provider | @osama | scroll thumb only moves per category | unassessed | question | needs-human | keep open | yours |
```

State the mode in one line above the table, so it is never ambiguous which half of the skill is about to run. If step 2 hit a cap, say on the same line that the gather was partial and which source it truncated.

Below the table, list every `needs-human` row again in full with its link (`webUrl` for Vercel, the comment `url` for GitHub), because those are the rows that actually need the person.

Then state plainly what the act phase will do, in the mode's own terms:

- **author** — how many fixes, which files, how many replies, how many resolves
- **respond-only** — how many replies and resolves, and that no code will change

If that count is zero, say so in as many words. A pass where every row is `needs-human` is a real and useful outcome, not a failure.

**Never use `AskUserQuestion`, here or anywhere in this skill.** It is resolved by the permission component, so under `permissions.defaultMode: "auto"` with `skipAutoPermissionPrompt` it never reaches a screen: it returns the first option, and nothing in the result says a human was never asked. It fails toward acting, which is the wrong direction for a gate to fail in. Ending the turn is the one gate no setting can answer on someone's behalf. See the convention in `.claude/README.md`.

Offer: **Approve**, **Edit** (change any row's Action, re-render, ask again), or **Stop**.

Approval here covers the replies and the resolves. It does not cover the push, which has its own gate.

### 5. Apply — author mode only

**Skip this step entirely in respond-only mode.** Go to step 7. There is nothing here in author-no-apply either, because the mode table in step 1 turns every `apply` row into `needs-human`.

Only rows marked `apply`. Work them smallest-blast-radius first so a later failure does not strand a half-finished larger change.

Then run the repo's own verification and versioning steps. Read them out of that repo's `CLAUDE.md` rather than assuming this one's: a repo that is not built with `pnpm` has neither of the commands below. In marigold they are

```bash
pnpm typecheck:only
pnpm build          # only if a package's public surface changed
```

followed by a changeset whenever anything under `packages/`, `themes/` or `docs/` changed, its body starting with the Conventional Commits line (`fix(DST-1234): …`). A docs-only change still needs one (`@marigold/docs: patch`).

Run only the checks the change can actually fail. A markdown or JSON change never reaches `pnpm typecheck:only` or `pnpm build`, and running them anyway is a green tick that means nothing.

Commit, in the repo's own commit convention. Do not push.

**The commit is not inert.** Husky runs lint-staged on it, which here means `prettier --write` plus Vale on markdown, and it re-stages whatever it rewrote. The committed content can therefore differ from what step 4 was approved against. Run the formatter yourself before committing rather than letting the hook do it, and if the hook still rewrites something, say so in step 8 rather than reporting the diff you intended.

### 6. Confirm the push — author mode only

**Skip this step entirely in respond-only mode.** There is nothing to push.

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

Reply in the origin system. Reply to every row where `Turn` is `yours`, plus any `apply` row you fixed, whichever way its Turn points.

What a reply says depends on the mode:

- **author** — what changed and where. Name the commit when a fix landed **and the branch was pushed**. On the reply-only path the SHA is local and resolves to nothing for the reader, so say the fix is made and pending a push instead.
- **respond-only** — you are answering as the reviewer. Accept the author's response, or say what still does not hold and why. If they asked you something, answer it. Do not describe fixes: they are not yours to make.

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

**`-F` reads the file. `-f` does not.** In `gh api`, `-f/--raw-field` sends the literal string `@/tmp/reply.md`, exits 0, and posts garbage. This is verified behaviour on `gh 2.92.0`, not a theoretical risk. See the convention in this repo's `CLAUDE.md`.

Then resolve:

```bash
gh api graphql -f threadId=<thread node id> -f query='
mutation($threadId:ID!){
  resolveReviewThread(input:{threadId:$threadId}){ thread{ isResolved } }
}'
```

Resolve exactly the rows marked `Thread: resolve`. Everything else stays open, including an `apply` row whose fix was partial: step 3 already made that call, so step 7 does not second-guess it from `Action`.

**In respond-only mode, resolve only threads you opened.** Closing someone else's thread decides on their behalf that they are satisfied.

#### Vercel

```
reply_to_toolbar_thread              -> teamId, threadId, markdown
change_toolbar_thread_resolve_status -> teamId, threadId, resolved: true
```

`reply_to_toolbar_thread` takes `markdown` as a plain string with no file flag, so the `--body-file` rule does not apply on this side. Keep replies short: the toolbar renders them in a small panel.

### 8. Summarise

Report, and stop:

- the mode the pass ran in
- what was fixed, and in which commits (author mode)
- what was pushed, or that the branch is still local (author mode)
- replies and resolves posted, per system
- every `needs-human` row still open, with its link
- every `push back` row, and what you said
- every `apply` row left `Thread: keep open`, and which half of the ask is still outstanding
- every `Turn: theirs` row, as what the PR is waiting on

Then stop. Acting on the `needs-human` rows is the next thing the user asks for, not something this skill continues into.

## Rough edges

- **Quote `gh api` URLs containing `?`.** Unquoted, zsh globs them and fails with `no matches found` before `gh` runs. `gh pr diff --name-only` is usually the cheaper existence check anyway.
- **Vercel MCP tool names carry a plugin prefix** (`mcp__plugin_vercel_vercel__list_teams`) which differs with how the developer installed the plugin. Use whichever is connected.
- **`list_toolbar_threads` defaults to unresolved**, which is what you want. Passing `status: resolved` is only useful when hunting for something already closed.
- **Toolbar threads include localhost sessions** (`isLocalhost: true`). Those came from someone's dev server, not the preview, and are usually noise on a PR pass.
- **A Vercel thread has no notion of "outdated".** Unlike a GitHub review thread, nothing marks it stale when the code moves, so staleness on that side always has to be read from the code.
- **`gh api graphql` needs the repo owner and name explicitly.** There is no `{owner}/{repo}` placeholder expansion in a GraphQL query the way there is in a REST path, and no `--repo` flag either. That is why step 1 keeps the owner and the name as two separate values rather than one `owner/name` string.

## Edge cases

**No feedback in either source.** Say so and stop. Do not go looking for something to fix. Word the Vercel half as "no threads matched this branch" rather than "no feedback": the filter is an exact match and cannot tell an empty branch from a missed one, so claiming the stronger of the two is a claim the gather did not support.

**Every row lands on `needs-human`.** Common on a visual-heavy PR, and normal in respond-only mode where the author has answered everything and is waiting on you. Still render the table, since the hand-off list is the value, and say plainly that the skill judged none of them.

**A thread's fix belongs in another PR.** Mark it `push back`, reply saying where it belongs, and leave it unresolved. Do not silently widen this PR's scope.

**Every row is `Turn: theirs`.** You are not blocked, they are. Report what the PR is waiting on and post nothing.

**The branch has no PR.** Author mode with the GitHub source absent, per step 1's mode table. Vercel threads may still exist, since previews build per branch. Triage them, and say there is no GitHub side rather than treating it as an error.
