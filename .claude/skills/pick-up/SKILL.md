---
name: pick-up
description: Marigold repo — Turn a DST ticket into a loaded, planned session: gathers the ticket, its comments and links, the precedent in git history and the files it touches, gates on whether the ticket is startable at all, writes a spec and ordered plan to `.claude/tasks/`, and only after you approve that plan creates the branch, self-assigns and moves the ticket to In Progress. Reach for this whenever someone says "pick up DST-1234", "I'll take DST-1234", "what should I work on", "what's next on the board", "give me my next sprint ticket", or types `/pick-up`. Each of those is itself the explicit request this skill needs, so start it rather than answering the question yourself. It assigns and transitions a real Jira ticket, so never run it proactively or as a follow-up to unrelated work.
allowed-tools: Read, Write, Glob, Grep, Skill, Bash(git status:*), Bash(git fetch:*), Bash(git log:*), Bash(git branch:*), Bash(git checkout:*), Bash(git ls-remote:*), Bash(gh pr list:*), Bash(gh pr view:*), mcp__plugin_atlassian_atlassian__searchJiraIssuesUsingJql, mcp__plugin_atlassian_atlassian__getJiraIssue, mcp__plugin_atlassian_atlassian__getJiraIssueRemoteIssueLinks, mcp__plugin_atlassian_atlassian__getTransitionsForJiraIssue, mcp__plugin_atlassian_atlassian__transitionJiraIssue, mcp__plugin_atlassian_atlassian__editJiraIssue, mcp__plugin_atlassian_atlassian__addCommentToJiraIssue, mcp__plugin_atlassian_atlassian__atlassianUserInfo, mcp__plugin_rx-baseline_atlassian__searchJiraIssuesUsingJql, mcp__plugin_rx-baseline_atlassian__getJiraIssue, mcp__plugin_rx-baseline_atlassian__getJiraIssueRemoteIssueLinks, mcp__plugin_rx-baseline_atlassian__getTransitionsForJiraIssue, mcp__plugin_rx-baseline_atlassian__transitionJiraIssue, mcp__plugin_rx-baseline_atlassian__editJiraIssue, mcp__plugin_rx-baseline_atlassian__addCommentToJiraIssue, mcp__plugin_rx-baseline_atlassian__atlassianUserInfo
---

# Pick-Up Skill for Marigold Design System

Turn a ticket sitting on the board into a session that already knows what it is doing. The step from "I'll take DST-1234" to writing code is the most repeated cold start in the workflow, and none of it is normally written down.

Four phases: **gather, plan, confirm, start.** Gather and plan write nothing but the plan file. The confirm gate is the boundary, and everything that touches your branches or the board happens after it.

**This skill assigns and transitions a real Jira ticket.** Step 7 shows the branch it will create and the two Jira writes it will make, and waits. Nothing touches your branches, or the ticket's assignee and status, before that. The one write that can land earlier is the scope comment at step 4, which carries a gate of its own and only fires if you ask for it.

## Usage

```
/pick-up                  # queue your startable open-sprint tickets and choose
/pick-up DST-1234         # a specific ticket
```

Jira coordinates that cannot drift: cloud id `4d9db72d-4108-4483-8582-40a3286e29c9` (`reservix.atlassian.net`), project key `DST`. Everything else is read at run time.

## Workflow

### 1. Pick the work

With a ticket key, skip to step 2. With no argument, query the board:

```
project = DST AND sprint in openSprints()
  AND status IN ("Ready", "Backlog")
  AND (assignee = currentUser() OR assignee IS EMPTY)
  ORDER BY Rank ASC
```

Pass `fields: ["summary", "status", "assignee"]` and `maxResults: 5`. An unfiltered sprint query returns well over a hundred thousand characters and will be truncated before you can read it.

Two things about that query are the result of getting it wrong first:

**Status names in JQL are the canonical English ones, and the API hands back localised ones.** A `de` locale account reads `Bereit` off the response, and `status = "Bereit"` then matches nothing. Never round-trip a status name from a response into a query. The ids are locale-proof if you prefer them: `11128` is Ready, `11153` is Backlog.

**`statusCategory = "To Do"` is too wide.** It also contains `On hold` and `Re-shape`, which are parked and re-scoping rather than startable, so the query names the two startable statuses instead.

**An empty result is a claim you have to earn.** It looks identical to "nothing to pick up", which is how the locale trap above hid itself. Before reporting an empty queue, re-run without the status clause. If that returns rows, the query is broken, not the board.

Render the rows as a list with key, title, status and assignee, so "unassigned" and "already mine" are distinguishable, and let the user choose. **Do not auto-take the top row.** Rank is a planning artifact that goes stale, and gathering context for the wrong ticket costs more than one turn.

### 2. Check the preconditions

Read the issue, then decide before spending anything on gather:

- **Assigned to someone else** — stop, say who. Taking a colleague's ticket is not a skill's decision to make.
- **In review or done** — stop, say so. The user can overrule in their next message.
- **Already In Progress and assigned to the user** — this is a resume. Gather and plan as normal, and skip both Jira writes at step 8, since there is nothing left to change.
- **Not in an open sprint** — proceed, mention it once. Deliberately picking up backlog work is normal.
- **Not a ticket about this repo** — stop, say which repo it looks like. `DST` is the design system team's project, not this repository's issue tracker: it also carries work on the Core app, ClearingAdministration, the Cypress end-to-end suite and the Insights scanner and dashboard. A skill that cannot tell the difference greps this repo for files that live in another one, finds nothing, and builds a plan on invented candidates. Read the paths and systems the description names, and check one of them exists here before going further. DST-1510 is the worked example: `tests/end2end/cypress/`, `cypress.config.ts` and `docs/superpowers/` are all absent, and its central symbol greps to nothing.

Request every field the plan will need here rather than a minimal set, naming them explicitly rather than sending `*all`. This read **is** the first row of step 3, so a second call for the same issue is waste. Comments are the exception and stay in their own call, for the reason step 3 gives.

### 3. Gather the context bundle

Read-only, no side effects. Order matters, because the codebase pass depends on what the ticket names.

| Source | Call | What it is for |
| --- | --- | --- |
| The issue | `getJiraIssue` with an explicit `fields` list | the spec and the definition of done |
| Comments | `getJiraIssue` again, `fields: ["comment"]` | decisions and scope that never reached the description |
| Issue links | the `issuelinks` field | blockers and related tickets |
| Remote links | `getJiraIssueRemoteIssueLinks` | Confluence pages, designs, external references |
| Attachments | the `attachment` field | screenshots and mockups |
| Codebase | grep and glob first, read only what surfaces, then trace imports | the files this ticket actually touches |
| Precedent | `git log` on those candidates, then PR bodies | how work of this shape was done here before |

**Fetch comments in a separate call.** `getJiraIssue` can hang for around a minute when comments are requested alongside everything else.

**Attachments are exposed** and the `attachment` field returns an array of file metadata. Earlier notes in this project claimed the MCP hides them, which was checked and is wrong. List the filenames so the user knows something visual exists, and say plainly that you cannot see inside them.

**Remote links get listed, not followed.** Fetch a Confluence page only when the description actually leans on it. Following every link is how this step gets slow enough that nobody runs the skill.

**Precedent comes from the files, not from ticket text.** Once the codebase pass has candidates:

```bash
git log --oneline -5 -- <candidate files>
```

That answers "who last worked on this, under which ticket" more reliably than any similarity search. Take the DST keys out of those subjects and read **at most three PR bodies** with `gh pr list --search`. Read a diff only if the user asks for one by name.

Two reasons it is deliberately not a JQL similarity search over resolved tickets. Summary matching in DST is noisy, since a resolved ticket that shares three words with yours usually shares nothing else, and here a false positive does not show up as a stray suggestion, it becomes the pattern the plan is modelled on. And precedent goes stale: `.memory/adr/` exists precisely because code in this repo gets "fixed back" by someone who did not know why it was written that way, so a diff from eight months ago is the trap rather than the guide.

### 4. Gate on startability

**Run this before writing anything.** Three checks, read against the ticket **plus its comments and links**:

- the ticket states a problem, not just the change someone wants
- the outcome is checkable by someone who was not in the conversation that produced it
- the scope has a boundary: either something explicitly **not** included, or an enumeration precise enough that "done" is unambiguous

Comments and links count as part of the ticket here. In DST the decisions frequently live there rather than in the description, and refusing to read them would fail tickets that are actually fine.

**Three checks, not the five DST-1523 asked for.** The ticket also listed *constraints known* and *reversibility understood*. Neither is a startability condition. An unstated constraint, or a change that turns out to be hard to undo, is something the plan surfaces under Open questions where a person can weigh it, not grounds for refusing to start. Gating on them fails tickets whose only fault is that nobody wrote down the obvious.

The third check deliberately accepts less than a named exclusion. When an agent is writing the scope itself, an exclusion is the only evidence a person drew the line. Here the ticket already exists, and a concrete checklist of edits is a boundary too: it says what done means without needing a Not-included section. DST-1510 is the case that forced this. It lists the exact files to delete, the steps to replace and a grep to prove nothing is left, and it has no exclusions at all. Failing the board's most precise ticket is how a gate teaches people to skip it.

**What does not count is your own inference from the code.** Reading the repo can evidence a problem someone has already stated. It cannot supply the other two. What counts as done, and what is deliberately left out, are somebody's calls, and nothing in the repo contains them. A plan that reads as complete while resting on exclusions the agent invented is worse than an obviously thin one, because nobody can see which parts were decided and which were filled in.

**On failure, stop before writing the plan** and name which checks failed. Then invoke `/grill`, scoped to just those gaps, and continue in the same session once they are resolved. Do not hand the user off and end the turn. The brief behind a ticket on the board was usually written by someone else months ago rather than by the person at the keyboard a minute ago, so sending the user away re-imposes the cold start this skill exists to remove.

**Grill's interrogation job only, not its recording job.** `/grill` also writes a glossary entry to `.memory/CONTEXT.md` and ADRs under `.memory/adr/`, and those are committed, reviewed files. The only writes this skill makes before step 8 are the plan file and the comment below, so scope the invocation to the questions and leave the store alone. If grilling a thin ticket does turn up a decision worth recording, that is a separate `/grill` the user runs on purpose.

Once the gaps are resolved, **offer to post the resolved scope as a comment on the ticket** so the next person to open it is not cold either. This is the skill's one outward write before step 7, so it gets step 7's discipline rather than a passing mention: render the comment in full, name the ticket it will be posted to, end the turn, and post only on an explicit yes. Never `AskUserQuestion`, for the reason step 7 gives.

### 5. Write the plan

Write to `.claude/tasks/DST-1234-<slug>.md`. The directory is gitignored.

```markdown
# DST-1234 — <title with the emoji stripped>

<the ticket in one sentence>

- **Epic** DST-1520, **Appetite** 2 days, **Sprint** <name>, or backlog
- **Reporter** <name>, <assignee or unassigned>, <status>
- <comments, links, attachments: what exists, or that none do>

## Acceptance criteria
- [ ] <checkable outcome>

## Candidate files
- `path/to/file.tsx` — <why it is in scope>

## Plan
1. <ordered step>

## Out of scope
- <explicitly excluded>

## Open questions
- <what is still unresolved, and who can answer it>
```

**No date in the filename.** The DST key is already unique, and a date prefix means a second run next week produces a second plan for the same ticket with no way to tell which is current.

**If the file already exists, read it and continue from it.** Do not silently regenerate. Show what is there, say what has changed on the ticket since (new comments, a different status, an edited description), and offer to update it or start over. This is the whole reason the plan is a file on disk rather than a session artifact.

The plan is deliberately **not** in `.memory/tasks/`, which both DST-1523 and [`.memory/README.md`](../../../.memory/README.md) originally reserved for it. That store is committed, reviewed, and governed by a write rule requiring entries to be durable and cross-session. A per-ticket plan is task-local and dead the day the ticket ships, so it fails the rule the store is built on. Untracked in `.claude/tasks/` it still survives a new session, which is the only property actually needed.

### 6. Confirm the plan

Render the plan and wait. Nothing exists yet but the plan file, and the ticket is untouched apart from a step 4 comment if you asked for one.

**Render a summary, not the file.** The metadata block, the counts (criteria, candidate files, plan steps, exclusions), every open question in full, and the path. A plan long enough to be worth writing is long enough that pasting it back is noise, and the open questions are the part that actually needs a person.

Say plainly which parts came from the ticket and which are your reading of the code, and put anything unresolved under Open questions rather than smoothing it over. A plan that hides its guesses cannot be reviewed.

Offer: **Approve**, **Edit** (say what to change, apply it, re-render, ask again), or **Stop**.

### 7. Confirm the start

The hard stop immediately before anything touches your branches or the board. Render exactly what is about to happen:

```
Branch    feat/DST-1234-loading-state   (new, from origin/main)
Jira      assign to you, Ready -> In Progress
Plan      .claude/tasks/DST-1234-loading-state.md
```

On a resume the Jira line reads `already yours, already In Progress - no change`, because step 2 has already established there is nothing to write. Never render a write the skill is not about to make.

**Render the options as text and end the turn. Do not use `AskUserQuestion` anywhere in this skill.** It is resolved by the permission component, so on a machine running `skipAutoPermissionPrompt` under `permissions.defaultMode: "auto"` it never reaches the screen: it returns the first option, and nothing in the result says it was never asked. Ending the turn is the one gate no setting can answer on someone's behalf. This is also why step 1 renders its queue as a list rather than as a question.

Three choices:

- **Start** — branch, self-assign, transition
- **Branch only** — create the branch, leave the board untouched
- **Cancel** — nothing happens

Creating a branch is not itself an outward action, which is why it shares the gate with the Jira writes rather than getting one of its own. The two Jira writes are one intent, "I am starting this", and splitting them produces a half-state where the ticket is yours but still sitting in Ready.

**Preconditions checked before this gate is rendered, not after:**

- **A dirty worktree has to be resolved first.** Uncommitted changes ride along into a new branch. Offer commit, stash or abort, which is what `/create-pr` offers on the same condition.
- **A branch for this DST key already exists**, locally or on the remote, means check it out instead of creating a second one. Say which.

### 8. Start

**Branch.** `git fetch origin main`, then branch from `origin/main`:

```
<type>/DST-1234-<slug>
```

`type` comes from the title emoji, mapped to the Conventional Commits types `/create-pr` already uses, so the two speak one vocabulary:

| Emoji | `type` | | Emoji | `type` |
| --- | --- | --- | --- | --- |
| 🐛 🩹 | `fix` | | 📝 ✍️ | `docs` |
| ✨ 🧩 | `feat` | | 💄 | `style` |
| 🧹 | `refactor` | | 🏗️ | `chore` |

**Take the leftmost emoji in the title that the table maps, and ignore every other one.** Titles carry more than type: CLAUDE.md's modifiers (⚡️, 🏚️), area markers the board uses that neither table lists (👁️ Insights, 📟 CLI), and sometimes two type emojis at once. So `🧹✨ Expand util-touch-hitbox` is a `refactor`, and `✨ 📟: marigold validate` is a `feat`.

**With no mapped emoji at all, fall back to the issue type**: `Bug` to `fix`, anything else to `feat`. That covers a bare title like DST-1510's and an unmapped emoji alike. Do not reason from an emoji's meaning to a type it has not been given: 🎨 sits on several Ready tickets and appears in neither table, and inventing `style` for it puts a prefix on the branch that nothing else in the repo recognises.

The two skills can still disagree, because they read different evidence. This one reads the ticket's emoji, while `/create-pr` reads the diff and can also land on `test`, `perf`, `build`, `ci` or `revert`, none of which an emoji maps to. A 🧹 ticket that turns out to add a component directory gets `refactor/` here and `feat(...)` there. Let `/create-pr` win: its title is what reaches the changelog, the branch name is only a label.

The slug is the title with **every emoji stripped**, kebab-cased, four or five words at most. Strip them explicitly: `DST-1625-👁️-track-marigold-docs-mcp-server-usage-in-insights` is a real branch on this repo.

**Self-assign.** Get the account id from `atlassianUserInfo` at run time, never from a value written down here, since this skill is committed and every developer runs it as themselves. Then `editJiraIssue` with `fields: { "assignee": { "accountId": "<account_id>" } }`.

**Transition.** `getTransitionsForJiraIssue`, then take the transition whose `to.id` is `11135`, which is In Progress, and pass it as `transition: { "id": "<id>" }`. Never hardcode the transition id itself. A status id is stable, but a transition id is workflow configuration and differs with the status you are leaving, so the two are not interchangeable.

**Match on `to`, not on names.** Transition names come back in English while status names come back localised, so on a `de` account the transition to In Progress is named `In Progress` and its `to.name` is `In Arbeit`. Those are two different strings for one destination, and matching one against the other finds nothing. `to.id` is the only field that is neither translated nor renamed.

### 9. Report

Say what happened and what is still the user's:

- the branch, and that it is checked out
- the Jira state now, or that it was left alone
- the plan's path
- open questions still unanswered, and attachments you could not read

Then stop. Implementing the plan is the next thing the user asks for, not something this skill continues into.

## Atlassian MCP rough edges

- **JQL takes canonical English status names, responses return localised ones.** Verified on a `de` account: `status = "Bereit"` matches nothing, `status = "Ready"` matches. Status ids work and are immune to both.
- **`getJiraIssue` can hang on comment-heavy issues.** Fetch comments in their own call.
- **The fields the plan template needs are not all guessable.** Sprint is `customfield_10020`, and carried-over issues list their closed sprints alongside the active one. Appetite is `customfield_11370`, free text. The epic is `parent`, which returns the epic's key *and* summary, so its title costs no second call.
- **Link type names are numbered** in this instance: `1 Relates`, `3 Blocks`. Only relevant for reading a ticket's links.
- **An unfiltered sprint query is far too large to read.** Always send an explicit `fields` list and a small `maxResults`.
- **Two Atlassian MCP servers may be connected**, depending on which plugins a developer enabled. Use whichever is authenticated. The tool names differ only in their server prefix.

## Edge cases

**The Atlassian MCP is unreachable.** Say so at the first failed call and stop. There is no useful degraded mode: without the issue there is nothing to plan, and a plan built from the ticket key alone would be invention.

**The ticket names files that no longer exist.** Report the paths that did not resolve rather than silently substituting neighbours. A ticket pointing at a moved file is a real finding and belongs under Open questions. If **none** of them resolve, this is not a moved file, it is the wrong-repo case from step 2.

**The plan comes out thin because the ticket is thin.** That is step 4's job, so if you have arrived here with a three-line plan, the gate was passed when it should not have been. Go back rather than shipping a plan that will not survive first contact.

**Nothing in the queue.** Re-run without the status clause before saying the board is empty, per step 1.

**Attachments are the only spec.** A ticket whose requirements live entirely in a screenshot cannot be planned from text. List the filenames, say the content is unreadable, and ask for the substance in writing.

## Notes

- Plans live in `.claude/tasks/`, untracked. Nothing prunes them and nothing needs to.
- Nothing auto-updates a plan after step 7. It is a snapshot, not a tracker, and a file that drifts against the code while looking authoritative is worse than one that is visibly a starting point.
- `/create-pr` does not read the plan. It derives from the diff and the ticket, and the coupling would buy very little.
- `.claude/` is not a published package, so changes here need no changeset.
- Loading a ticket is the job. Deciding it is worth doing is `/grill`'s, and doing it is yours.
