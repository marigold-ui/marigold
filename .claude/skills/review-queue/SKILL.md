---
name: review-queue
description: Marigold repo — Produce one ranked digest of the review work waiting on you, across every repo in the marigold-ui org. Two sections: the open PRs that are actually yours to review, meaning nobody else has reviewed them yet or you already have, ranked by the linked DST ticket's sprint and board rank rather than by when it was last touched, and your own PRs that bounced back with changes requested, unresolved review threads, unresolved Vercel preview comments or a failing build. Use when the user asks "what should I review", "what's in my review queue", "which of my PRs need rework", "anything waiting on me", or types `/review-queue`. Read-only: it ranks and reports, and never posts, replies, resolves or transitions anything.
allowed-tools: Bash(gh api user *), Bash(gh search prs *), Bash(gh repo list *), Bash(gh pr list *), Bash(gh pr view *), Bash(gh api graphql *), Read, mcp__plugin_atlassian_atlassian__searchJiraIssuesUsingJql, mcp__plugin_rx-baseline_atlassian__searchJiraIssuesUsingJql
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

Passing both `--review` and `--rework` is the same as passing neither. `--all` is orthogonal and combines with either, so `--review --all` is every row of section 1, uncapped.

**The board tail from step 8 is review work, so it rides with section 1.** It renders under `--review` and under no flags, and `--rework` drops it along with section 1.

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
gh search prs --owner=marigold-ui --state=open --limit 100 --json repository
```

One field, because one field is used. Everything else this call could return is fetched again per repo in step 3, which is where the branch name has to come from anyway.

**The org is the allowlist.** There is no configurable repo list, deliberately: `--owner=marigold-ui` already covers every work repo, excludes personal forks and OSS clones by construction, and cannot go stale the way a hand-maintained list in this file would. DST-1531 asked for the list, and the flag is the same thing without the maintenance.

**There is no `--review-requested=@me`, and that is the largest departure from the ticket.** DST-1531 specifies exactly that flag as the gather, which would be the obvious way to answer "what is waiting on me" and returns nothing at all here: of 15 open PRs on `marigold`, two carry a review request of any kind (#5740 to `aromko`, #5748 to `OsamaAbdellateef`) and none request the author of this file. The team assigns reviewers in conversation rather than in GitHub's field, so a queue built on it would be permanently empty and look like a clear board. So the sweep is org-wide and "is this mine to review" is decided further down, from who has actually reviewed it. That test is in step 4, and it is doing the job the flag was meant to do.

The result is genuinely multi-repo. At the time of writing it spans `marigold` (15), `search-form-pattern` (11), `reference-app` (3), `insight` (2) and `insights` (1). Note that `insight` and `insights` are two different repositories.

**A repo is absent because it has no open PRs, and that is the whole reason.** `starter` and `ai-assistant` are live repos in the org and never appear, because there is nothing open in them. Verified against a per-repo `gh pr list` over all 16 org repos: the direct counts match this search exactly, so the search index is not quietly dropping anything.

**Drop archived repos.** Their PRs cannot be merged, so reviewing one is effort that can never land:

```bash
gh repo list marigold-ui --limit 100 --json nameWithOwner,isArchived
```

`nameWithOwner` rather than `name`, so it joins directly against what the search returned. Asking for `name` and comparing it to `owner/repo` matches nothing, which fails in the dangerous direction: the filter drops nothing and every archived repo stays in the queue looking reviewable.

Two of the five repos above are archived, `insight` and `search-form-pattern`, and between them they hold 13 of the 32 open PRs. Today every one of those is a draft or a renovate PR, so the step 3 filters happen to remove them all, which is luck rather than design: one non-draft human PR on an archived repo would sit in the queue looking reviewable. Count them under "repos searched" and say how many were skipped.

This also retires the example DST-1531 was written around. The ticket cited `marigold-ui/insight` PRs as the live proof that key-less PRs must not be dropped. Those two PRs still exist, but they are drafts on an archived repo now, so `reference-app` is the honest key-less example.

**Read the cap back.** Exactly 100 results means the gather is partial, and the digest has to say so. A digest that silently drops the 101st PR looks complete and is not.

Take the distinct `repository.nameWithOwner` values. Querying only the repos that have open PRs is why this step exists at all rather than looping over a fixed list.

**Loop with `while read`, never `for r in $REPOS`.** zsh does not word-split unquoted parameters, so the `for` form passes all five repo names to `--repo` as one argument. `gh` then fails, and if its stderr is suppressed the digest comes back empty and looks like a quiet board. This was hit while building the skill, and it is the same class as `/triage-feedback`'s rule about quoting a URL containing `?`. `set -- $spec` inside such a loop fails the same way, so read the fields with `while IFS=' ' read -r a b` rather than splitting a line yourself.

**Write `.name? // ""` with spaces, never `.name?//""`.** jq reads `?//` as the destructuring-alternative operator and refuses to compile. The guard itself is needed because a `StatusContext` has no `name` at all, only `context`, so step 7's classification has to reach for it defensively. The failure is loud on its own and quiet inside a loop, where the surrounding rows still print and only the cells fed by that filter come out wrong. Same shape as the trap above, a shell or jq metacharacter doing something other than what it looks like, so they live together.

While checking that: **`workflowName` is always present on a `CheckRun`, sometimes as an empty string.** Absent and empty are different tests, and it is the empty one step 7 talks about. The full key set is `__typename, completedAt, conclusion, detailsUrl, name, startedAt, status, workflowName` for a `CheckRun` against `__typename, context, startedAt, state, targetUrl` for a `StatusContext`, which is also why a failing deploy is read off `state` rather than `conclusion`.

### 3. Pull the detail the search cannot give you

`gh search prs` supports 17 `--json` fields and **`headRefName` is not one of them**, so the branch name (the best source of a ticket key) has to come from `gh pr list`, per repo:

```bash
gh pr list --repo <owner/repo> --state open --limit 100 \
  --json number,title,author,isDraft,headRefName,baseRefName,reviewDecision,url,updatedAt,labels
```

**Keep this list, unfiltered, for step 8.** The filters below are for the two rendered sections only, and step 8 needs to know about every PR that exists, drafts and bots included.

Then filter:

- **Drop bots** (`author.is_bot`). Renovate's `chore(deps)` PRs and the `release: version packages` PR carry no ticket and need no human queue position.
- **Drop drafts.** A draft is not asking for review, and your own draft is work in progress rather than rework.
- **Split on `author.login`.** Yours feeds section 2, everyone else's feeds section 1.

`reviewDecision` is a string enum: `APPROVED`, `CHANGES_REQUESTED`, `REVIEW_REQUIRED`. **`REVIEW_REQUIRED` also means nobody has looked yet**, so it is the normal state of a healthy new PR and never on its own a rework signal.

**Mark a PR whose `baseRefName` is not `main`.** It is stacked on another branch, so reviewing it before its base lands may be premature and its diff may include the base's commits. Say so on the row rather than dropping it: a stacked PR is often exactly what wants reviewing, but the reader needs to know the order. Every open PR in the org has `main` as its base today, so this rule currently never fires and is here for the first stack rather than for a live example.

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
  number headRefName headRefOid reviewDecision
  author{ login }
  reviewThreads(first:100){
    totalCount pageInfo{hasNextPage}
    nodes{ isResolved isOutdated }
  }
  latestReviews(first:20){ nodes{ author{login} state commit{oid} } }
}' -f o=marigold-ui -f r=marigold
```

One document per repo, since `repository` is the root. Build the aliases from the shortlist.

**Unresolved count is the highest-signal column in the whole digest, and it is orthogonal to `reviewDecision`.** Measured on real PRs: 5776 and 5761 are both `CHANGES_REQUESTED`, but 5776 has 2 unresolved threads out of 9 and 5761 has 3 out of 23. Ranking on `reviewDecision` alone would treat those as equal, and ranking on total threads would put the almost-finished one first.

- **`reviews` is deliberately not in that query, because a review count is not a measure of feedback.** Every inline comment submission lands as its own `COMMENTED` review, so PR 5761 carries a `reviews.totalCount` of 47 against 3 live threads. `latestReviews` collapses that to one node per author, which is the only shape anything here needs. Ask for `reviews` with a `last:` window and you get the window back rather than the total, which is its own way to misreport this.
- **`isOutdated` means the diff moved under the thread.** Carry it through as a staleness hint rather than re-deriving it from the diff. Report it, do not subtract it: a thread on a moved hunk is often still a live objection.
- **Read the caps back**, both `hasNextPage` and a `totalCount` above the 100 fetched.
- **Drop from section 1 any PR whose `latestReviews` shows your login with state `APPROVED`.** You are done with it, whoever else is not.

`latestReviews[].state` is not the same enum as `reviewDecision`. It carries `APPROVED`, `CHANGES_REQUESTED`, `COMMENTED` and also **`DISMISSED`**, which is a review someone has since dismissed. Treat a dismissed review as absent rather than as an opinion. `reference-app#306` is the live example.

#### Is it yours to review at all

**Cut a PR from section 1 when someone else has reviewed it and you have not.** They are already on it, and a second opinion nobody asked for is the cheapest thing to drop from a queue. #5684 is the case: `sebald` and `jim761` have both commented, every thread is resolved, and there is nothing there for a third reviewer.

So section 1 keeps exactly two kinds of PR:

- **Nobody has reviewed it.** No reviews at all, or only `DISMISSED` ones, which count as absent.
- **You have reviewed it.** Your involvement continues, whatever anyone else has said.

**An unresolved preview comment does not count as someone reviewing.** It is feedback left for the author, not a code review, so #5740 and #5748 stay in the queue: nobody has looked at either, and their only open feedback is a preview comment. Reading the `Open feedback` column as "somebody is on it" would hide two PRs that no human has read.

**Name the cut rows, never drop them silently.** They go in a `+N cut (others reviewing)` line under the table, one clause each. A PR that others commented on and nobody approved can otherwise sit forever without ever reaching you, which is the failure mode of every review dashboard that filters by cleverness.

#### Whose turn is it

**A PR you have already reviewed is not automatically off your queue, and it is not automatically on it either.** This is the single biggest correctness question in section 1, because the wrong answer puts work you have finished at the top of your own list.

Read it from two fields:

| Your latest review on it | The author has pushed since | Turn |
| --- | --- | --- |
| `CHANGES_REQUESTED` | no | **theirs**, demote per step 7 |
| `CHANGES_REQUESTED` | yes | **yours**, they answered your review, rank normally |
| `COMMENTED` only | either | **yours**, a comment is not a verdict |
| `APPROVED` | either | dropped above |
| none | — | **yours**, first review |

"Pushed since" is your latest `CHANGES_REQUESTED` review's `commit.oid` against the PR's current `headRefOid`. Both come off `latestReviews`, which is one node per author and so is already the "latest review" this table asks about. Verified live: on #5779 both oids are `5f38f3e`, so it is still the author's turn, while on #5776 the review sat on `1165e01` and the head has moved to `63ea2b5`, so the author has answered and it is yours again.

Do not use `reviewDecision` for this. It stays `CHANGES_REQUESTED` until a reviewer approves, so it cannot distinguish "they have not replied yet" from "they pushed fixes and are waiting on you", which are the two cases that matter most.

### 5. Extract the ticket key

**Read both the branch and the title, every time. This is not a first-hit-wins cascade.** `/create-pr` stops at the first hit because it only needs one answer, and copying that here silently picks the wrong ticket when the two disagree.

1. Extract from `headRefName` and from the PR title independently.
2. If they agree, or only one yields a key, use it.
3. **If they disagree, use the title's key and say so on the row.**
4. Neither yields a key, and the PR is unranked.

The title wins because it is written as prose, read by every reviewer, edited when wrong, and lands in the changelog. A branch name is typed once at creation and never corrected.

**#5776 is the worked example, and it is why this rule exists.** Its branch is `dst-1745_fix-popover` and its title is `fix(DST-1754): keep popovers inside the body's clip box at the window edge`: transposed digits. DST-1745 is a Core-only invoice-printing migration that is already Done, DST-1754 is the popover bug the PR actually fixes and is In Review in the active sprint. Taking the branch gave the wrong ticket, demoted the PR as "ticket is Done", and made step 8 report DST-1754 as having no PR. One typo, three wrong rows. Checked across all 32 open PRs in the org, it is the only disagreement, so surfacing it costs one flag and almost never fires.

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

**Read `status.statusCategory.key`, never `status.name`.** The name comes back localised, so a `de` account reads `Fertig` and `Wird überprüft` where an `en` one reads `Done` and `In Review`. The category key is neither translated nor renamed, and it is the same three values (`new`, `indeterminate`, `done`) in both projects despite `DST` and `DSTSUP` having entirely different status ids. Step 7 and the Done edge case both depend on this.

The **response order is the ranking**. Nothing needs to read a rank value, and none is returned. One query per key because rank is a global lexorank string, so a mixed `DST` and `DSTSUP` set comes back interleaved in an order that means nothing. See [../references/jira-board.md](../references/jira-board.md) for both.

**There is no priority input, and its absence is deliberate.** DST-1531 specified ranking by "open-sprint membership + priority + board rank". Priority is a dead field on this board: three open issues carry one at all, none above Medium, and current issues do not return the field. Ranking by it would sort by a constant while appearing to sort by importance, which is worse than not claiming to rank at all.

### 7. Rank, and cap

**Section 1, awaiting your review.** Five tiers, top to bottom. They are named rather than numbered because the prose below refers to them and numbers drift when a tier is inserted:

1. **Active sprint.** Match `customfield_10020[].state == "active"`, **never `[0]`**. DST-1625 is the live worked example: it carries `Calvin Klein` (closed) at `[0]` and `Enchantment` (active) at `[1]`, so indexing gets the answer exactly backwards. `DSTSUP` issues have no sprint field at all, so treat missing as "no sprint" rather than as an error.
2. **Ticket, no sprint.**
3. **Unranked**, meaning no ticket key. **Never dropped.** A PR with no ticket is still a PR someone is waiting on, and repos outside `DST`'s reach have no keys at all.
4. **Author's turn**: step 4 put the ball in their court, because you requested changes and they have not pushed since. Nobody is blocked on you.
5. **Ticket already Done**, meaning `status.statusCategory.key == "done"`. Its sprint and rank are live values on a closed ticket, so the active-sprint tier would otherwise float it to the top of the queue. See the edge case below for why it stays in the digest at all.

**Board rank orders the rows inside each tier**, taken from step 6's response order. It is not a tier of its own: a well-ranked ticket that is not in the sprint still sits below every sprint row. **Do not print a rank number.** See step 9.

**The author's-turn tier is the one that matters most in practice, because it fires often.** Without it a PR you have already reviewed sits near the top of your own queue on the strength of its sprint and rank, and you re-read work you finished days ago. Measured on the first live run: #5779 ranked **third** while the ball was in the author's court, which is the worst single row the digest produced. It is a demotion rather than a drop so that the queue still shows what you are waiting on, and a demoted row says so in `Ranked by`.

**Test the Done tier on the category key, not on the status name.** `status.name == "Done"` matches nothing on a `de` account, where the value is `Fertig`. The tier then silently never fires, and the closed ticket's live rank floats its PR to the top of the queue, which is the exact failure this tier exists to prevent. A ranking rule that fails silently is worse than one that is absent, because the digest still looks ranked.

**Section 2, your PRs needing rework.** The filter is `CHANGES_REQUESTED`, or unresolved threads, or unresolved preview comments, or a CI failure. Sort by:

1. A CI failure or `CHANGES_REQUESTED` first.
2. Unresolved thread count, descending.
3. Unresolved preview comments.
4. Board rank.

Preview comments qualify a PR for this section but sort below a broken build and below review threads, because a build failure blocks everything and a preview comment is usually a smaller edit.

**Fetch check status for every shortlisted PR, before either filter runs.** It is one call per PR:

```bash
gh pr view <n> --repo <owner/repo> --json statusCheckRollup
```

Not for the rows about to be printed, which is the ordering it is tempting to write and cannot work: two of section 2's four qualifying conditions, a CI failure and unresolved preview comments, exist nowhere but this rollup, so the section cannot know its own membership until the calls are made. Section 1 needs it on every candidate too. #5740 and #5748 both belong in the queue only because of a red preview check, and reporting "nothing bounced back" is a claim about all of your open PRs rather than about a subset. Run it once over the shortlist step 3 produced and rank from what comes back.

**Do not print the rollup.** There are about 27 entries per PR on marigold (Builds, CodeQL, Format, Lint, Size Limit, Typecheck, four Unit Tests shards, four Storybook shards, three Vercel deploys, and the repo's own guards) and the digest dies of it.

**A red check is not one thing, and `any(conclusion == "FAILURE")` is the wrong aggregate.** Classify into three, because they want three different responses. **Match the rows in order and stop at the first hit**, because the name test has to run before the type test:

| What it is | How to recognise it | What it means |
| --- | --- | --- |
| **Unresolved preview comments** | `CheckRun` named `Vercel Preview Comments` | Someone left toolbar feedback on the preview. Not a build failure at all |
| **A deploy or integration problem** | `__typename == "StatusContext"` | Report it as itself. Neither of the above |
| **Our CI failed** | any remaining `CheckRun`, `workflowName` or not | A real build failure. The PR is not ready to review or to merge |

Verified on #5776: 22 of its checks are `CheckRun`s carrying a `workflowName` (`Builds`, `CodeQL`, `Format`, `Test`, `Typecheck`, the guards), three are `StatusContext` Vercel deploys, and two are `CheckRun`s with an empty `workflowName`.

**Those two empty-name checks are why the CI row is last and tests no `workflowName` at all.** They are `Vercel Preview Comments`, which row 1 has already claimed by name, and a bare `CodeQL` aggregate sitting alongside the `Analyze (javascript)` and `Analyze (typescript)` runs that carry `workflowName: "CodeQL"`. An earlier version of this table read the empty name as third-party and sent that `CodeQL` to the integration row, which files a real security-scan failure as somebody else's problem. There is no live example of a `CheckRun` that is genuinely third-party, so `StatusContext` carries that row alone.

**`Vercel Preview Comments` is worth more than the mislabelling it caused.** It fails while preview comments are unresolved, which makes it the only window `gh` has into Vercel toolbar feedback: this skill does not talk to the Vercel MCP, and `/triage-feedback` does. It is also independent of GitHub review threads. #5740 has zero unresolved GitHub threads and a red preview check, so folding it into a thread count would lose it entirely. Carry it as feedback and point at `/triage-feedback`, never as failing CI.

**Cap each section at 7.** `--all` lifts it. The cap is the feature: a digest nobody finishes reading by week two has failed, whatever it contains.

What the cap actually saves is the per-row detail, not the row. So the `+N more` line names the cut items compactly, one clause each, because a reader who cannot see that the two hidden rows are a keyless PR and a closed ticket will run `--all` every time and the cap will have bought nothing. Cutting them to a bare count is the version that gets `--all` typed reflexively.

Every uncapped row shows what ranked it, in the `Ranked by` column step 9 defines. A ranked list whose ranking cannot be checked is asking for trust it has not earned, and a column keeps that legible without a second line per row.

### 8. The board tail: review work with no PR

**This runs with section 1, not independently.** A ticket the board has in review with no PR is review work, so `--review` keeps the tail and `--rework` drops it. Suppressing it under the one flag whose job is to show review work would hide exactly what was asked for.

One JQL call per project, for what the board thinks is in review:

```
project = DST AND status = "In Review" ORDER BY Rank ASC
project = DSTSUP AND status = "Review" ORDER BY Rank ASC
```

**The status names differ between the two projects**, and both are the canonical English ones rather than what a `de` account reads back off a response.

**Subtract against every PR step 3 gathered, before its draft and bot filters, and not against the two rendered sections.** List what is left as "board says in review, no PR found".

**Keep the response order through the subtraction.** These queries carry `ORDER BY Rank ASC` for the same reason step 6's does, and removing rows from a ranked list does not reorder the survivors. It is easy to lose by collecting the leftovers into a set and rendering that instead: on a run where the board held fourteen tickets in review, DST-1529 was tenth and DST-1759 fourteenth, so a tail that ends with 1529 has been sorted by something else.

The distinction is the whole correctness of this section. A ticket whose only PR is a draft is filtered out of both sections, so subtracting the sections reports it as having no PR at all, which is false and sends someone looking for work that already exists. Keep the unfiltered key set from step 3 for exactly this.

It also catches tickets whose PR already merged while the ticket stayed in review. DST-1529 was in exactly that state on the first live run: the work is on `main` and the board still lists it as under review. That is a one-second fix nobody would otherwise notice.

This is the section that makes the digest honest rather than just a prettier GitHub tab. Much of the team's work lives in GitLab (`git.reservix.io`: accv3, clearing, core, portal, rx-ai-suite), which `gh` cannot see at all. Those tickets sit in review with no GitHub PR to find, and without this tail they are invisible. It reads as a gap report, not an error: say plainly that a ticket is in review and no PR was located, rather than implying the ticket is wrong.

### 9. Render, and stop

Terminal output only. **No file.** `/pick-up` writes its plan to `.claude/tasks/` because a plan is resumable and worth returning to. A queue is a snapshot of a board that moves hourly, and a stale digest on disk that looks authoritative is worse than no digest.

**`Title` comes from the PR, not from the ticket.** Strip the Conventional Commits prefix and show the rest: `fix(DSTSUP-276): anchor the Calendar year list at year 1` renders as `anchor the Calendar year list at year 1`. The `Ticket` column already carries the key, so repeating it in the title wastes the widest column in the table.

The ticket summary was the obvious choice and is the wrong one. It describes the ticket, which is often broader than the branch in front of you, and it is not always usable: DSTSUP-276's summary is `Strange things happen when you go back to where Jesus was born :D`, against a PR title of `anchor the Calendar year list at year 1`. Taking the summary also leaves the key-less rows with nothing to show, which needed a second rule of its own.

**Strip every emoji from a ticket summary wherever one is shown**, which after the rule above means the tail table only. DST titles carry leading type and area emoji by convention (`👁️ Track marigold-docs MCP server usage in Insights`). `/pick-up` strips them the same way when it builds a branch slug.

**One markdown table per section, as the default.** Not a fenced code block: a real table renders as a table in the terminal, and the columns are what make a ranked list scannable. Each section keeps its heading line above the table, carrying the counts and the scope.

**An empty section is a sentence, not an empty table.** A header row with nothing under it reads as a rendering failure, and this skill's whole discipline about empty sections is that they must say what they gathered.

A real run, both sections, every value verified live on 2026-09-04. The date is here because this block is a snapshot of a board that moves, and a reader who cannot tell how old it is has to re-check all of it:

**Awaiting your review** — 6 · 3 repos searched, 2 archived skipped

| PR | Title | Author | Ticket | Ranked by | Reviews | Open feedback |
| --- | --- | --- | --- | --- | --- | --- |
| #5761 | align boolean-field controls to the first line of their label | OsamaAbdellateef | DST-1607 | active sprint | you commented | 3/23 threads, 1 outdated |
| #5740 | expose `dependencies` on the components that own their collection | sebald | DST-1717 | active sprint | none | 0/2 threads · preview comments |
| #5748 | make component categories distinguishable in the docs sidebar | sebald | DST-1726 | active sprint | none | preview comments |
| #5776 | keep popovers inside the body's clip box at the window edge | OsamaAbdellateef | DST-1754 ⚠ | active sprint | you requested changes, they pushed since | 2/9 threads · preview comments |
| ref-app#306 | harden npm supply chain (pnpm 11 + min-release-age + renovate) | aromko | — | unranked, no ticket key | 1 dismissed | none |
| #5779 | lint docs prose with Vale in pre-commit and CI | aromko | DST-1526 | author's turn | you requested changes | 12/12 threads |

`+3 cut (others reviewing)`: `#5684` (sebald, jim761), `#5764` (aromko, jim761), `#5766` (jim761)

⚠ `#5776` branch says `dst-1745`, title says `DST-1754`. Using the title. The branch has transposed digits.

Build failing: none

**No `#` column, and no rank number in `Ranked by`.** Row order carries the ordering and `Ranked by` names the basis, so a number adds nothing and actively misleads: it is the position within whatever key set the run happened to query, not a board rank. Measured across two runs of this skill, DST-1717 came back 3rd of 5 keys and 6th of 8, same ticket and same board, because the second run also ranked section 2's keys. `/review-queue --review` and a bare `/review-queue` would print different numbers for the same PR.

A true board rank would mean querying every issue in the sprint and counting, which is the large unfiltered query [../references/jira-board.md](../references/jira-board.md) warns off. The relative order is the part that was ever useful, so print only that.

**`Open feedback` carries both kinds**, GitHub review threads and unresolved Vercel preview comments, because both are somebody waiting on an edit and the two are counted in different systems. #5748 has no review threads at all and is still not clean, which a thread count alone renders as `0/0`.

**A CI failure gets the line under the table, not a column.** It is rarer than feedback and more serious, it wants the failing workflow named, and as a column it would be six empty cells most days. It stays out of the ranking: the board decides the order and the checks decide whether a row is worth starting, so a red build is a warning on the row rather than a demotion. Letting it reorder the queue would put a mechanical signal back in charge of priority, which is the thing this skill exists to stop.

**Your PRs needing rework** — 0 of 4 open

Nothing bounced back. #5777, #5778, #5780 and #5781 are all awaiting first review: no changes requested, no unresolved threads, no preview comments, no CI failures. A fifth, #5786, is a draft and so is not counted, which is the step 3 filter working rather than a row going missing.

**Board says in review, no PR found** — 4

| Ticket | Title | Why there is no PR |
| --- | --- | --- |
| DST-1750 | Migrate the clearing and cash-register pages to TWIG and RUI styles | Core-only, lives in GitLab |
| DST-1757 | Migrate the invoice deletion dialog to RUI styles and document the RUI List component | Core-only, lives in GitLab |
| DST-1529 | Normalize the AI toolkit to one SKILL.md standard | PR already merged, ticket never moved to Done |
| DST-1759 | Migrate the sale options settings page to RUI styles | Core-only, lives in GitLab |

Note what the two cut lines are doing differently. `+N cut (others reviewing)` is the step 4 filter, and those PRs are not yours to review. `+N more (--all)` is the step 7 cap, and those are yours but did not fit. Collapsing them into one line would say two different things with one number.

Four things that output is doing on purpose. The rows are in **board order, not recency order**, and #5779 sinks below a key-less PR despite ranking second on the board, because the turn is the author's. The `Ranked by` column **shows its own reasoning**, so the order can be checked rather than trusted. The **empty section is a sentence** naming what it gathered. And the tail earns its place twice over: it catches the GitLab work `gh` cannot see, and it caught DST-1529, whose PR merged while the ticket sat in review. Neither is visible from any GitHub dashboard.

Section 2 uses the same shape with `Ranked by` replaced by `Blocking`, which names the changes-requested state or the failing check rather than the sprint.

Close with the hand-offs that continue the loop, **as text, not as invocations**: `/review-pr <n>` for something in the queue, `/triage-feedback <n>` for something needing rework.

**Render the digest as text and end the turn. Never auto-open the top row.** Board rank is a planning artifact that goes stale, and the whole point of a ranked list is that a person reads it and picks. `/pick-up` step 1 renders its ticket queue the same way and for the same reason. There is nothing here to confirm, so there is no question to ask either.

## Edge cases

**The Atlassian MCP is unreachable.** Degrade, do not stop. This is the opposite of `/pick-up`, which has nothing to plan without the ticket. Here the PRs are already in hand and an unranked digest is still useful. Print it in an explicitly unranked order and say the board could not be reached. Do not fall back to `updatedAt` order and present it as a ranking: sorting by recency is the exact failure DST-1531 was written to fix.

**`gh` is unauthenticated or missing a scope.** Stop and say which call failed. Without the PRs there is nothing to rank, and there is no degraded mode worth having.

**A ticket key that resolves to nothing.** A typo'd branch, or a deleted ticket. Show the PR under unranked and name the key that failed to resolve. Do not silently treat it as keyless: those are different findings, and one of them means someone's branch name is wrong.

**A key from a project that is neither `DST` nor `DSTSUP`.** Unranked. Do not invent a board for it or guess at its statuses.

**An open PR whose ticket is already Done.** Rank it last within its section and flag it, because it is one of two things and both want a person. Either the ticket was closed while the PR was still in flight, or the PR is abandoned and wants closing. Do not drop it, and do not let a closed ticket's board rank float it above live work.

There is **no live instance of this** in the org today, and the one that looked like it was not. #5776 appeared to be an open PR on a Done ticket only because its branch name has transposed digits, so step 5 resolved it to DST-1745 instead of DST-1754. The rule stands on its own, but do not go looking for that example: it was a typo wearing a costume.

**Both sections come back empty.** Earn the claim, per the reference. Re-run step 8 without the status clause before reporting a clear board, and check that step 2 returned anything at all. An empty digest and a broken query look identical from the outside.

**A repo with no DST keys anywhere.** Expected, not a defect. `reference-app` is like this, and DST-1531 verified the same of `insight`. Those PRs belong in the unranked group, which is the whole reason that group exists.

**A repo whose every open PR is a bot's.** Also expected. `search-form-pattern` had 11 open PRs on the first live run and contributed no rows, because all of them were renovate. The repo appearing in step 2 and then vanishing from the digest is the bot filter working, so count it in "repos searched" rather than reporting it as empty.

## Notes

- The digest is a snapshot. Nothing in it auto-refreshes, and re-running is the refresh.
- Section order is fixed: reviewing others unblocks them, and reworking your own unblocks you. The first is the more expensive to leave undone.
- Scheduled delivery to Slack is deliberately not here. DST-1531 phases it as a follow-up, to be earned once the ranking has proven itself in practice rather than shipped alongside it.
- A GitLab source for step 8's tail is the natural next extension, via the `rx-baseline:gitlab` skill's `glab` wrapper.
- `.claude/` is not a published package, so changes here need no changeset.
