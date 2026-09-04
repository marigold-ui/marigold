---
name: review-queue
description: Marigold repo — Produce one ranked digest of the review work waiting on you, across every repo in the marigold-ui org. Two sections: open PRs awaiting your review, ranked by the linked DST ticket's sprint and board rank rather than by when it was last touched, and your own PRs that bounced back with changes requested, unresolved review threads or failing CI. Use when the user asks "what should I review", "what's in my review queue", "which of my PRs need rework", "anything waiting on me", or types `/review-queue`. Read-only: it ranks and reports, and never posts, replies, resolves or transitions anything.
allowed-tools: Bash(gh api user *), Bash(gh search prs *), Bash(gh pr list *), Bash(gh pr view *), Bash(gh api graphql *), Read, mcp__plugin_atlassian_atlassian__searchJiraIssuesUsingJql, mcp__plugin_rx-baseline_atlassian__searchJiraIssuesUsingJql
---

# Review-Queue Skill for Marigold Design System

Answer two questions that currently need several browser tabs: what should I review next, and which of my PRs bounced back. GitHub can list both, but it cannot know that a PR attached to a sprint-committed ticket outranks a drive-by change. That signal is on the Jira board, in another system.

So this skill is the join. It gathers PRs from GitHub, ranks them by the board, and prints one capped digest.

**This skill is read-only, and that is why it has no confirmation gate.** `/vrt`, `/pick-up` and `/triage-feedback` each open with a gate because each of them eventually posts, dispatches or transitions something. This one has no outward call to gate: every command in `allowed-tools` is a read, and there is no `Write`, no `Edit`, no `git`, no `gh pr review`. The narrow list is the guarantee, not the prose. Acting on what the digest surfaces is `/review-pr`'s job and `/triage-feedback`'s.

Board mechanics, JQL traps and field ids live in [../references/jira-board.md](../references/jira-board.md). Read it before writing a query.

## Usage

```
/review-queue              # both sections
/review-queue --review     # awaiting your review only
/review-queue --rework     # your PRs needing rework only
/review-queue --all        # lift the per-section cap
```

Passing both `--review` and `--rework` is the same as passing neither.

## Workflow

### 1. Establish who you are and what was asked for

```bash
gh api user -q .login
```

The login splits the two sections, recognises your own approvals, and tells you whose turn a thread is on. Never read it from a value written down here: this file is committed and every developer runs it as themselves.

**Name the sections that ran, in the output.** A section that was switched off contributes no rows, and an empty section has to be distinguishable from one that was never gathered. This is the same failure `/triage-feedback` guards against with its source list.

### 2. Discover which repos have anything open

One call, org-wide:

```bash
gh search prs --owner=marigold-ui --state=open --limit 100 \
  --json number,title,repository,author,isDraft,url,updatedAt,labels
```

**The org is the allowlist.** There is no configurable repo list, deliberately: `--owner=marigold-ui` already covers every work repo, excludes personal forks and OSS clones by construction, and cannot go stale the way a hand-maintained list in this file would. DST-1531 asked for the list, and the flag is the same thing without the maintenance.

The result is genuinely multi-repo. At the time of writing it spans `marigold` (15), `search-form-pattern` (11), `reference-app` (3), `insight` (2) and `insights` (1). Note that `insight` and `insights` are two different repositories, and both are live.

**Read the cap back.** Exactly 100 results means the gather is partial, and the digest has to say so. A digest that silently drops the 101st PR looks complete and is not.

Take the distinct `repository.nameWithOwner` values. Querying only the repos that have open PRs is why this step exists at all rather than looping over a fixed list.

**Loop with `while read`, never `for r in $REPOS`.** zsh does not word-split unquoted parameters, so the `for` form passes all five repo names to `--repo` as one argument. `gh` then fails, and if its stderr is suppressed the digest comes back empty and looks like a quiet board. This was hit while building the skill, and it is the same class as `/triage-feedback`'s rule about quoting a URL containing `?`.

### 3. Pull the detail the search cannot give you

`gh search prs` supports 17 `--json` fields and **`headRefName` is not one of them**, so the branch name (the best source of a ticket key) has to come from `gh pr list`, per repo:

```bash
gh pr list --repo <owner/repo> --state open --limit 100 \
  --json number,title,author,isDraft,headRefName,reviewDecision,url,updatedAt,labels
```

Then filter:

- **Drop bots** (`author.is_bot`). Renovate's `chore(deps)` PRs and the `release: version packages` PR carry no ticket and need no human queue position.
- **Drop drafts.** A draft is not asking for review, and your own draft is work in progress rather than rework.
- **Split on `author.login`.** Yours feeds section 2, everyone else's feeds section 1.

`reviewDecision` is a string enum: `APPROVED`, `CHANGES_REQUESTED`, `REVIEW_REQUIRED`. **`REVIEW_REQUIRED` also means nobody has looked yet**, so it is the normal state of a healthy new PR and never on its own a rework signal.

### 4. Count unresolved threads, in one batched call

REST does not expose whether a review thread is resolved, so this has to be GraphQL. Query the whole shortlist in **one document with aliased fields** rather than one request per PR:

```bash
gh api graphql -f query='
query($o:String!,$r:String!){
  repository(owner:$o,name:$r){
    pr5779: pullRequest(number:5779){ ...prBits }
    pr5761: pullRequest(number:5761){ ...prBits }
  }
}
fragment prBits on PullRequest {
  number headRefName reviewDecision
  reviewThreads(first:100){
    totalCount pageInfo{hasNextPage}
    nodes{ isResolved isOutdated }
  }
  latestReviews(first:20){ nodes{ author{login} state } }
}' -f o=marigold-ui -f r=marigold
```

One document per repo, since `repository` is the root. Build the aliases from the shortlist.

**Unresolved count is the highest-signal column in the whole digest, and it is orthogonal to `reviewDecision`.** Measured on real PRs: 5776 and 5761 are both `CHANGES_REQUESTED`, but 5776 has 2 unresolved threads out of 9 and 5761 has 3 out of 23. Ranking on `reviewDecision` alone would treat those as equal, and ranking on total threads would put the almost-finished one first.

- **Do not count `reviews` as a measure of feedback.** Every inline comment submission lands as its own `COMMENTED` review, so PR 5761 shows 20+ entries for 3 live threads.
- **`isOutdated` means the diff moved under the thread.** Carry it through as a staleness hint rather than re-deriving it from the diff. Report it, do not subtract it: a thread on a moved hunk is often still a live objection.
- **Read the caps back**, both `hasNextPage` and a `totalCount` above the 100 fetched.
- **Drop from section 1 any PR whose `latestReviews` shows your login with state `APPROVED`.** You are done with it, whoever else is not.

In `latestReviews` the `id` and `commit.oid` come back as empty strings. Use `reviews` if you ever need those, and neither is needed here.

### 5. Extract the ticket key

Cascade, first hit wins, the same shape `/create-pr` uses:

1. `headRefName`
2. the PR title
3. no key, and the PR is unranked

Match `\[?(DSTSUP|DST)-([0-9]+)\]?` case-insensitively, **anchored on the whole key**. A looser `dst-?(\d+)` mis-parses `DSTSUP-275`, and there are real branches and commits for both projects.

It has to be tolerant, because three branch conventions coexist and none is going away:

| Shape | Real example |
| --- | --- |
| `<type>/DST-NNNN-kebab` | `feat/DST-1527-ai-review-ci` |
| `dst-nnnn_slug` | `dst-1607_boolean-fields`, `dstsup-275_fix-filefield` |
| `DST-NNNN-kebab` | `DST-889-link-new-tab-indicator` |

Commit and title scopes are sometimes bracketed (`fix([DST-1684]):`), and one branch on this repo has an emoji in its name. Tolerate all of it, and never assume a `type/` prefix is present.

### 6. Join the board

One JQL call **per project key**, listing only the keys the shortlist actually produced:

```
key IN (DST-1526, DST-1607, DST-1745) ORDER BY Rank ASC
```

`fields: ["summary", "status", "assignee", "customfield_10020", "parent"]`.

The **response order is the ranking**. Nothing needs to read a rank value, and none is returned. One query per key because rank is a global lexorank string, so a mixed `DST` and `DSTSUP` set comes back interleaved in an order that means nothing. See [../references/jira-board.md](../references/jira-board.md) for both.

**There is no priority input, and its absence is deliberate.** DST-1531 specified ranking by "open-sprint membership + priority + board rank". Priority is a dead field on this board: three open issues carry one at all, none above Medium, and current issues do not return the field. Ranking by it would sort by a constant while appearing to sort by importance, which is worse than not claiming to rank at all.

### 7. Rank, and cap

**Section 1, awaiting your review.** Sort by:

1. In the active sprint before not in it. Match `customfield_10020[].state == "active"`, **never `[0]`**. DST-1625 is the live worked example: it carries `Calvin Klein` (closed) at `[0]` and `Enchantment` (active) at `[1]`, so indexing gets the answer exactly backwards. `DSTSUP` issues have no sprint field at all, so treat missing as "no sprint" rather than as an error.
2. Board rank, from step 6's response order.
3. Has a ticket but no sprint.
4. Unranked, at the bottom. **Never dropped.** A PR with no ticket is still a PR someone is waiting on, and repos outside `DST`'s reach have no keys at all.
5. Below even those, a PR whose ticket is already Done. Its sprint and rank are live values on a closed ticket, so tier 1 would otherwise float it to the top of the queue. See the edge case below for why it stays in the digest at all.

**Section 2, your PRs needing rework.** The filter is `CHANGES_REQUESTED`, or unresolved threads, or a failing check. Sort by:

1. A failing check or `CHANGES_REQUESTED` first.
2. Unresolved thread count, descending.
3. Board rank.

For section 2 only, add CI status. It is a handful of PRs, so one call each is cheap:

```bash
gh pr view <n> --repo <owner/repo> --json statusCheckRollup
```

Aggregate to `any(conclusion == "FAILURE")` and name the failing checks. **Do not print the rollup.** There are about 25 entries per PR on marigold (Builds, CodeQL, Format, Lint, Size Limit, Typecheck, four Unit Tests shards, four Storybook shards, and the repo's own guards) and the digest dies of it.

**Cap each section at 7**, with a `+N more` line naming what was cut. `--all` lifts the cap. The cap is the feature: a digest nobody finishes reading by week two has failed, whatever it contains.

Every row carries a one-line why-this-rank. A ranked list whose ranking cannot be checked is asking for trust it has not earned.

### 8. The board tail: review work with no PR

One JQL call per project, for what the board thinks is in review:

```
project = DST AND status = "In Review" ORDER BY Rank ASC
project = DSTSUP AND status = "Review" ORDER BY Rank ASC
```

**The status names differ between the two projects**, and both are the canonical English ones rather than what a `de` account reads back off a response.

Subtract the tickets already matched to a PR in section 1 or 2. List what is left as "board says in review, no PR found".

It also catches tickets whose PR already merged while the ticket stayed in review. DST-1529 was in exactly that state on the first live run: the work is on `main` and the board still lists it as under review. That is a one-second fix nobody would otherwise notice.

This is the section that makes the digest honest rather than just a prettier GitHub tab. Much of the team's work lives in GitLab (`git.reservix.io`: accv3, clearing, core, portal, rx-ai-suite), which `gh` cannot see at all. Those tickets sit in review with no GitHub PR to find, and without this tail they are invisible. It reads as a gap report, not an error: say plainly that a ticket is in review and no PR was located, rather than implying the ticket is wrong.

### 9. Render, and stop

Terminal output only. **No file.** `/pick-up` writes its plan to `.claude/tasks/` because a plan is resumable and worth returning to. A queue is a snapshot of a board that moves hourly, and a stale digest on disk that looks authoritative is worse than no digest.

A real run, both sections, all values verified live:

```
Awaiting your review (7 of 9)      5 repos searched, marigold + reference-app had rows

 1. #5684  Track MCP usage in Insights      DST-1625  sprint · rank 1 ·  0/11 open
 2. #5761  Boolean fields misalign          DST-1607  sprint · rank 2 ·  3/23 open
 3. #5779  Prose style as lint              DST-1526  sprint · rank 3 · 12/12 open
 4. #5740  Expose dependencies              DST-1717  sprint · rank 5 ·  0/2 open
 5. #5748  Sidebar category hierarchy       DST-1726  sprint · rank 6 ·  0/0 open
 6. #5764  FileField size in MB           DSTSUP-275  no sprint    ·  9/13 open, 8 outdated
 7. #5766  Year list era boundary         DSTSUP-276  no sprint    ·  0/7 open
 +2 more (--all): reference-app#306 (no key), #5776 (DST-1745 is Done)

Your PRs needing rework (0 of 4 open)
 Nothing bounced back. #5777, #5778, #5780 and #5781 are all awaiting first review,
 no changes requested, no unresolved threads, no failing checks.

Board says in review, no PR found (5)
 · DST-1750, DST-1757, DST-1759   Core-only, lives in GitLab
 · DST-1529                       PR already merged, ticket never moved to Done
 · DST-1754                       no open PR located
```

Three things that output is doing on purpose. The rows are in **board order, not recency order**, so #5684 leads despite being the oldest PR in the list. An **empty section says what it gathered** rather than printing nothing. And the tail earns its place twice over: it catches the GitLab work `gh` cannot see, and it caught DST-1529, whose PR merged while the ticket sat in review. Neither is visible from any GitHub dashboard.

Close with the hand-offs that continue the loop, **as text, not as invocations**: `/review-pr <n>` for something in the queue, `/triage-feedback <n>` for something needing rework.

**Render the digest as text and end the turn. Never auto-open the top row.** Board rank is a planning artifact that goes stale, and the whole point of a ranked list is that a person reads it and picks. `/pick-up` step 1 renders its ticket queue the same way and for the same reason. There is nothing here to confirm, so there is no question to ask either.

## Edge cases

**The Atlassian MCP is unreachable.** Degrade, do not stop. This is the opposite of `/pick-up`, which has nothing to plan without the ticket. Here the PRs are already in hand and an unranked digest is still useful. Print it in an explicitly unranked order and say the board could not be reached. Do not fall back to `updatedAt` order and present it as a ranking: sorting by recency is the exact failure DST-1531 was written to fix.

**`gh` is unauthenticated or missing a scope.** Stop and say which call failed. Without the PRs there is nothing to rank, and there is no degraded mode worth having.

**A ticket key that resolves to nothing.** A typo'd branch, or a deleted ticket. Show the PR under unranked and name the key that failed to resolve. Do not silently treat it as keyless: those are different findings, and one of them means someone's branch name is wrong.

**A key from a project that is neither `DST` nor `DSTSUP`.** Unranked. Do not invent a board for it or guess at its statuses.

**An open PR whose ticket is already Done.** It happens: PR #5776 is open against DST-1745, which is `Fertig`. Rank it last within its section and flag it, because it is one of two things and both want a person. Either the ticket was closed while the PR was still in flight, or the PR is abandoned and wants closing. Do not drop it, and do not let a closed ticket's board rank float it above live work.

**Both sections come back empty.** Earn the claim, per the reference. Re-run step 8 without the status clause before reporting a clear board, and check that step 2 returned anything at all. An empty digest and a broken query look identical from the outside.

**A repo with no DST keys anywhere.** Expected, not a defect. `reference-app` is like this, and DST-1531 verified the same of `insight`. Those PRs belong in the unranked group, which is the whole reason that group exists.

**A repo whose every open PR is a bot's.** Also expected. `search-form-pattern` had 11 open PRs on the first live run and contributed no rows, because all of them were renovate. The repo appearing in step 2 and then vanishing from the digest is the bot filter working, so count it in "repos searched" rather than reporting it as empty.

## Notes

- The digest is a snapshot. Nothing in it auto-refreshes, and re-running is the refresh.
- Section order is fixed: reviewing others unblocks them, and reworking your own unblocks you. The first is the more expensive to leave undone.
- Scheduled delivery to Slack is deliberately not here. DST-1531 phases it as a follow-up, to be earned once the ranking has proven itself in practice rather than shipped alongside it.
- A GitLab source for step 8's tail is the natural next extension, via the `rx-baseline:gitlab` skill's `glab` wrapper.
- `.claude/` is not a published package, so changes here need no changeset.
