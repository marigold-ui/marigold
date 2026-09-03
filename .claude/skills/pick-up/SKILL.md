---
name: pick-up
description: Marigold repo — Turn a DST ticket into a loaded, planned session. Gathers the ticket, its comments and links, the precedent in git history and the files it touches, gates on whether the ticket is startable at all, writes a spec and ordered plan to `.claude/tasks/`, and only after you approve that plan creates the branch, self-assigns and moves the ticket to In Progress. Use when the user says "I'll take DST-1234", "pick up DST-1234", "give me my next sprint ticket", "what should I work on", or types `/pick-up`. It assigns and transitions a real Jira ticket, so run it only on an explicit request, never proactively and never as a follow-up to unrelated work.
allowed-tools: Read, Write, Glob, Grep, Skill, Bash(git status:*), Bash(git fetch:*), Bash(git log:*), Bash(git branch:*), Bash(git checkout:*), Bash(git ls-remote:*), Bash(gh pr list:*), Bash(gh pr view:*), mcp__plugin_atlassian_atlassian__searchJiraIssuesUsingJql, mcp__plugin_atlassian_atlassian__getJiraIssue, mcp__plugin_atlassian_atlassian__getJiraIssueRemoteIssueLinks, mcp__plugin_atlassian_atlassian__getTransitionsForJiraIssue, mcp__plugin_atlassian_atlassian__transitionJiraIssue, mcp__plugin_atlassian_atlassian__editJiraIssue, mcp__plugin_atlassian_atlassian__addCommentToJiraIssue, mcp__plugin_atlassian_atlassian__atlassianUserInfo, mcp__plugin_rx-baseline_atlassian__searchJiraIssuesUsingJql, mcp__plugin_rx-baseline_atlassian__getJiraIssue, mcp__plugin_rx-baseline_atlassian__getJiraIssueRemoteIssueLinks, mcp__plugin_rx-baseline_atlassian__getTransitionsForJiraIssue, mcp__plugin_rx-baseline_atlassian__transitionJiraIssue, mcp__plugin_rx-baseline_atlassian__editJiraIssue, mcp__plugin_rx-baseline_atlassian__addCommentToJiraIssue, mcp__plugin_rx-baseline_atlassian__atlassianUserInfo
---

# Pick-Up Skill for Marigold Design System

Turn a ticket sitting on the board into a session that already knows what it is doing. The step from "I'll take DST-1234" to writing code is the most repeated cold start in the workflow, and none of it is normally written down.

Four phases: **gather, plan, confirm, start.** Gather and plan touch nothing. The confirm gate is the boundary, and everything outward happens after it.

**This skill assigns and transitions a real Jira ticket.** Step 7 shows the branch it will create and the two Jira writes it will make, and waits. Nothing reaches Jira or your branches before that.

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

Request the full `fields` list here rather than a minimal one. This read **is** the first row of step 3, so a second call for the same issue is waste. Comments are the exception and stay in their own call, for the reason step 3 gives.

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

Two reasons it is deliberately not a JQL similarity search over resolved tickets. Summary matching in DST is noisy enough that `/create-ticket` refuses to search on generic words at all, and here a false positive does not show up as a stray suggestion, it becomes the pattern the plan is modelled on. And precedent goes stale: `.memory/adr/` exists precisely because code in this repo gets "fixed back" by someone who did not know why it was written that way, so a diff from eight months ago is the trap rather than the guide.

### 4. Gate on startability

**Run this before writing anything.** Three checks, the same three `/create-ticket` gates a new brief on, read against the ticket **plus its comments and links**:

- the ticket states a problem, not just the change someone wants
- the outcome is checkable by someone who was not in the conversation that produced it
- the scope has a boundary: either something explicitly **not** included, or an enumeration precise enough that "done" is unambiguous

Comments and links count as part of the ticket here. In DST the decisions frequently live there rather than in the description, and refusing to read them would fail tickets that are actually fine.

The third check is deliberately looser than `/create-ticket`'s, which demands a named exclusion. There, the agent is writing the scope and an exclusion is the only evidence a person drew the line. Here the ticket already exists, and a concrete checklist of edits is a boundary too: it says what done means without needing a Not-included section. DST-1510 is the case that forced this. It lists the exact files to delete, the steps to replace and a grep to prove nothing is left, and it has no exclusions at all. Failing the board's most precise ticket is how a gate teaches people to skip it.

**What does not count is your own inference from the code.** Reading the repo can evidence a problem someone has already stated. It cannot supply the other two. What counts as done, and what is deliberately left out, are somebody's calls, and nothing in the repo contains them. A plan that reads as complete while resting on exclusions the agent invented is worse than an obviously thin one, because nobody can see which parts were decided and which were filled in.

**On failure, stop before writing the plan** and name which checks failed. Then invoke `/grill`, scoped to just those gaps, and continue in the same session once they are resolved. Do not hand the user off and end the turn. Unlike `/create-ticket`, where the brief was written a minute ago by the person at the keyboard, this ticket is on the board and was often written by someone else months ago, so sending the user away re-imposes the cold start this skill exists to remove.

Once the gaps are resolved, **offer to post the resolved scope as a comment on the ticket** so the next person to open it is not cold either. That comment is an outward write, so it is the user's explicit choice, never automatic.

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

The plan is deliberately **not** in `.memory/tasks/`, despite the row reserving it there. That store is committed, reviewed, and governed by a write rule requiring entries to be durable and cross-session. A per-ticket plan is task-local and dead the day the ticket ships, so it fails the rule the store is built on. Untracked in `.claude/tasks/` it still survives a new session, which is the only property actually needed.

### 6. Confirm the plan

Render the plan and wait. Nothing has been created or changed outside `.claude/tasks/`.

**Render a summary, not the file.** The metadata block, the counts (criteria, candidate files, plan steps, exclusions), every open question in full, and the path. A plan long enough to be worth writing is long enough that pasting it back is noise, and the open questions are the part that actually needs a person.

Say plainly which parts came from the ticket and which are your reading of the code, and put anything unresolved under Open questions rather than smoothing it over. A plan that hides its guesses cannot be reviewed.

Offer: **Approve**, **Edit** (say what to change, apply it, re-render, ask again), or **Stop**.

### 7. Confirm the start

The hard stop immediately before the first outward call. Render exactly what is about to happen:

```
Branch    feat/DST-1234-loading-state   (new, from origin/main)
Jira      assign to you, Ready -> In Progress
Plan      .claude/tasks/DST-1234-loading-state.md
```

**Render the options as text and end the turn. Do not use `AskUserQuestion` anywhere in this skill.** It is resolved by the permission component, so on a machine running `skipAutoPermissionPrompt` under `permissions.defaultMode: "auto"` it never reaches the screen: it returns the first option, and nothing in the result says it was never asked. Ending the turn is the one gate no setting can answer on someone's behalf. `.claude/README.md` has the whole story. This is also why step 1 renders its queue as a list rather than as a question.

Three choices:

- **Start** — branch, self-assign, transition
- **Branch only** — create the branch, leave the board untouched
- **Cancel** — nothing happens

Creating a branch is not itself an outward action, which is why it shares the gate with the Jira writes rather than getting one of its own. The two Jira writes are one intent, "I am starting this", and splitting them produces a half-state where the ticket is yours but still sitting in Ready.

**Preconditions checked before this gate is rendered, not after:**

- **A dirty worktree stops it.** Uncommitted changes ride along into a new branch. `/create-pr` refuses on the same condition, so the two skills agree.
- **A branch for this DST key already exists**, locally or on the remote, means check it out instead of creating a second one. Say which.

### 8. Start

**Branch.** `git fetch origin main`, then branch from `origin/main`:

```
<type>/DST-1234-<slug>
```

`type` comes from the title emoji, mapped to the Conventional Commits types `/create-pr` already uses, so the branch name and the eventual PR title agree instead of contradicting each other:

| Emoji | `type` | | Emoji | `type` |
| --- | --- | --- | --- | --- |
| 🐛 🩹 | `fix` | | 📝 ✍️ | `docs` |
| ✨ 🧩 | `feat` | | 💄 | `style` |
| 🧹 | `refactor` | | 🏗️ | `chore` |

Modifier emojis (⚡️, 🏚️) do not map to anything, ignore them. With no emoji, fall back to the issue type: `Bug` to `fix`, anything else to `feat`.

The slug is the title with **every emoji stripped**, kebab-cased, four or five words at most. Strip them explicitly: `DST-1625-👁️-track-marigold-docs-mcp-server-usage-in-insights` is a real branch on this repo.

**Self-assign.** Get the account id from `atlassianUserInfo` at run time, never from a value written down here, since this skill is committed and every developer runs it as themselves. Then `editJiraIssue` with `fields: { "assignee": { "accountId": "<account_id>" } }`.

**Transition.** `getTransitionsForJiraIssue`, then take the transition whose `to.id` is the target status and pass it as `transition: { "id": "<id>" }`. Never hardcode the transition id.

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
- **Sprint lives on `customfield_10020`**, and carried-over issues list their closed sprints alongside the active one.
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
