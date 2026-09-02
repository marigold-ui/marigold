---
name: create-ticket
description: Marigold repo — Turn a settled scope (normally the summary `/grill` ends with) into one DST-conformant Jira issue, with the emoji title convention, the right issue type, the fields that type actually requires, and the description template Jira carries for that type. Use when the user asks to "create a ticket", "file this in Jira", "make a DST ticket", or types `/create-ticket`. Creating an issue is an outward action, so run this only on an explicit request, never proactively and never as a follow-up to unrelated work. The full rendered ticket is shown for confirmation before anything is written to Jira.
allowed-tools: AskUserQuestion, Read, mcp__plugin_atlassian_atlassian__getJiraIssueTypeMetaWithFields, mcp__plugin_atlassian_atlassian__searchJiraIssuesUsingJql, mcp__plugin_atlassian_atlassian__getIssueLinkTypes, mcp__plugin_atlassian_atlassian__createJiraIssue, mcp__plugin_atlassian_atlassian__createIssueLink, mcp__plugin_atlassian_atlassian__getJiraIssue, mcp__plugin_rx-baseline_atlassian__getJiraIssueTypeMetaWithFields, mcp__plugin_rx-baseline_atlassian__searchJiraIssuesUsingJql, mcp__plugin_rx-baseline_atlassian__getIssueLinkTypes, mcp__plugin_rx-baseline_atlassian__createJiraIssue, mcp__plugin_rx-baseline_atlassian__createIssueLink, mcp__plugin_rx-baseline_atlassian__getJiraIssue
---

# Create-Ticket Skill for Marigold Design System

Turn a scope that is already settled into one DST issue a teammate can pick up cold. The conventions this enforces live in `CLAUDE.md` under "Jira (DST Project)". This skill applies them, it does not restate them.

**This skill writes to Jira.** Step 7 shows the whole rendered ticket and waits for an explicit confirmation. Nothing reaches Jira before that.

## Usage

```
/create-ticket                     # uses the /grill summary from this session
/create-ticket <pasted scope>      # or a path to a file holding one
/create-ticket --sprint            # opt into the active sprint (see step 7)
```

Jira coordinates that cannot drift: cloud id `4d9db72d-4108-4483-8582-40a3286e29c9` (`reservix.atlassian.net`), project key `DST`. Everything else about the project's fields is read from Jira at run time, see step 4.

## Workflow

### 1. Assemble the brief

Take the first of these that is present:

1. A `/grill` summary already in this session. Use it as-is, it is the intended input.
2. Text passed to the invocation, or a path to a file holding it. Read the file if it is a path.
3. Whatever the user typed, treated as a raw idea.

### 2. Gate on completeness

**Run this before any investigation.** Reading the repo first and arriving here with the gaps already filled is the exact failure this step exists to prevent, and it is easy to talk yourself into.

Three checks, against the brief as it arrived:

- the problem is stated, not just the desired change
- the outcome is checkable by someone who was not in the conversation
- the scope names at least one thing that is explicitly **not** included

If any fails, stop and say which. **Do not draft the ticket.** Route the user to `/grill` and wait for a scoped brief to come back.

**Reading the code is not a way past this gate.** It can evidence a problem someone has already stated, which is what `/grill` does too. It cannot supply the other two checks. What counts as done, and what is deliberately left out, are the user's calls, and nothing in the repo contains them. A ticket that reads as complete while resting on exclusions the agent invented is worse than an obviously thin one, because nobody can see which parts were decided and which were filled in.

This has already gone wrong once. A one-line brief, "align the checkbox and radio styles", was answered by reading the two style files, manufacturing an outcome and a Not-included list from them, and carrying on to the confirm gate. The problem statement was sound and the code did supply it. The exclusions were never the agent's to make.

Appetite is handled separately in step 5, since it is collectable rather than a reason to send someone back to scoping.

### 3. Classify

**Is this one ticket?** Separability is the wrong test, because almost any ticket with three scope bullets could be split. Ask whether the pieces share one problem. If fixing one without the others leaves that problem unsolved, it is one ticket. DST-1529 normalized several skills at once and was rightly filed as one, because no single skill on its own delivered a consistent toolkit.

Flag a split only when the pieces carry separate problems, each worth shipping alone, that would plausibly be picked up by different people at different times. Then say so before anything else, list the split, and offer to create the first now and run again for the rest.

This skill creates one issue per invocation either way. Do not silently fold several tickets into one, and do not split a coherent one to look thorough.

**Issue type.** Default to `Task`. Work that reached this skill through `/grill` is planned by construction, someone deliberately sat down and scoped it.

The type is a statement about planning provenance, not about the kind of work. The emoji already carries the kind of work, which is why a feature and a defect can both be `Unplanned`. You cannot read provenance off a scope document, so default and let the human switch it in step 7:

- **Task** for planned work.
- **Unplanned** for work picked up inside an already-planned sprint.
- **Bug** only when the brief is plainly a defect report.

Switching the type changes which fields exist. Step 4 is what makes that safe.

**Title.** Emoji prefix per the convention in `CLAUDE.md`, then a short imperative summary. Modifier emojis combine with a type emoji, they do not replace it.

### 4. Read the type's fields from Jira

Call `getJiraIssueTypeMetaWithFields` for `DST` and the chosen issue type, taking the type's id from the issue-type table in `CLAUDE.md`. Build the create payload from what comes back: which fields are required, their allowed option ids, and which carry a server-side default.

**Pass `requiredFieldsOnly: false`.** It defaults to true, and the narrow response is the wrong one here: the template step 8 renders lives on `description`, which is not a required field and so is filtered out. On `Task` the narrow call returns 6 fields of 24 and no `description` at all. A skill that reads the metadata and still builds a `Bug` on `Task`'s headings has bought nothing.

**Do not keep a copy of the answer in this file.** The required-field set differs per issue type and is Jira configuration, so a table written here would be a second source of truth that nothing keeps honest. Reading it costs one call, and if that call fails you cannot create the issue anyway, so there is nothing a fallback table could buy.

The same response carries the type's own description template, as `description.defaultValue` in ADF. Take the section headings from there. Each issue type has a different one, so a `Bug` built on `Task`'s template loses the reproduce steps a bug report needs.

For orientation only, and true at the time of writing rather than something to rely on: `Appetite` and `Rollout Communication` sat on `Task` alone, `Requires UI Kit Update` on `Task` and `Unplanned`, and only `Appetite` lacked a server-side default.

### 5. Collect what only a human knows

For every field the step-4 metadata marks required with no default, you need a value. In practice this is **Appetite**, free text such as `2 days`, `1 week`, `3 weeks`.

Propose one from the shape of the scope and let the user correct it. A proposal someone rejects costs less than a blank prompt.

Fields that are required but carry a default can be omitted from the payload. Jira fills them. Only send one when the brief gives a reason to depart from the default, for example a change that genuinely needs external communication.

`AskUserQuestion` is fine for this. A wrong appetite is visible at the gate and costs a correction, which is a different class of mistake from a create nobody saw. Step 7 is where the mechanism matters.

**The epic.** Take it from the brief, either a parent it names outright or the epic an obviously related ticket sits under. If nothing names one, leave it unset and render `none` at the gate. A guessed parent files the ticket into someone else's plan, and adding the right one through **Edit** is cheaper than noticing a wrong one later.

### 6. Search for an existing ticket

Build the query from the most specific terms the scope actually contains, preferring:

1. **Proper nouns** — a component (`Checkbox`, `Popover`), a file or utility (`GridSelectionIndicator`), a skill (`create-ticket`). DST summaries are written around these, so they match well.
2. **A compound term the scope keeps repeating**, when there is no proper noun.

OR up to three of them together:

```
project = DST AND statusCategory != Done
  AND (summary ~ "Checkbox" OR summary ~ "Radio")
```

Never search on generic words alone. `padding`, `spacing`, `style`, `layout`, `fix`, `update` and `component` each match hundreds of DST tickets and tell you nothing.

**If no usable term exists, say so instead of running a weak query.** The gate then reads "no distinctive term to search on" rather than a confident "none found". An empty result from a bad query and an empty result from a good one look identical, and only one of them means anything.

Carry any hits into the gate as context, with key, title, and status. **This never blocks.** Summary matching is noisy, and a false positive must not stand between someone and a legitimate ticket.

### 7. Show the ticket and confirm

Render the complete issue and ask. Nothing has touched Jira yet.

```
Type      Task
Title     ✨ <emoji title>
Epic      DST-1520 (or none)
Labels    ai-workflow (or none)
Appetite  3 days
Sprint    backlog
Links     blocks DST-1523

Description
<the full rendered description, on the chosen type's template from step 4>

Possible duplicates (not blocking)
DST-1522  ✨ /create-ticket skill — In Arbeit
```

**Render the options as text and end the turn. Do not use `AskUserQuestion` here.** It is resolved by the permission component, so on a machine running `skipAutoPermissionPrompt` under `permissions.defaultMode: "auto"` it never reaches the screen: it returns the first option, and nothing in the result says it was never asked. The first option below is **Create**. Ending the turn is the one gate no setting can answer on someone's behalf. `.claude/README.md` has the whole story.

Offer four choices and wait for the user's next message:

- **Create**, proceed to step 8, backlog placement
- **Create and add to the active sprint**, proceed to step 8, then place it
- **Edit**, say what to change. Apply it, re-render, ask again
- **Cancel**, nothing happens

Do **not** create without an explicit confirm. The confirmation belongs to **this** rendered ticket: an earlier "go ahead", the invocation itself, or approval of some other step is not consent to file an issue.

A new ticket lands in the backlog by default. Adding to a running sprint changes that sprint's committed scope, which is a decision for a person, so it is an explicit opt-in here or via `--sprint`.

If **Edit** switches the issue type, go back to step 4. The required-field set belongs to
the type, so a payload built for a `Task` is wrong for an `Unplanned` and will be
rejected. Re-read the metadata, drop or collect fields accordingly, and show the gate
again.

### 8. Create

`createJiraIssue` with `contentFormat: "markdown"`, and the description built on **the chosen type's** template from the step-4 response, not on a fixed one.

Everything the create screen accepts goes in one call via `additional_fields`: the required custom fields from step 5, the epic as `{"parent": {"key": "DST-1520"}}`, and `labels`. The tool's top-level `parent` argument is for sub-tasks, so an epic sent there is not the same thing. Inherit labels from the parent epic when its children share one, otherwise send none. DST tickets are mostly unlabelled.

Leave `assignee` unset. Filing a ticket is not taking it, and whoever picks the work up assigns it to themselves when they start.

**Sprint,** only if the user opted in. No MCP tool returns sprint ids directly, so read one off an issue that already has it:

```
project = DST AND sprint in openSprints()      fields: ["customfield_10020"]
```

Take the entry whose `state` is `active`. Carried-over issues list their closed sprints too, so an unfiltered read can silently place the ticket in a finished sprint. Pass that id as `customfield_10020`.

### 9. Link, then read back

Create any relationships the brief named with `createIssueLink`. Resolve the type name with `getIssueLinkTypes` first, because the names in this instance are numbered: `1 Relates`, `3 Blocks`, and so on. Passing `Relates` fails. Direction is not symmetric. On `3 Blocks`, `inwardIssue` is the blocker and `outwardIssue` is the issue being blocked, so "this ticket blocks DST-1523" sends the new key as `inwardIssue`. Render the relationship in words at the gate, not as an arrow, so a reversed link is visible before it is created.

Then read the issue back with `getJiraIssue` and report its URL, its type, and anything the human still owns (sprint placement, assignee). If a link failed but the create succeeded, say so plainly. The ticket is valid and the link is a one-click fix.

## Atlassian MCP rough edges

- **Custom fields are per issue type.** Sending a field the chosen type's create screen does not carry gets the whole create rejected. Step 4 exists for this.
- **Link type names are numbered.** Resolve them, never guess.
- **Mentions need ADF.** In markdown, `[~accountid:...]` is escaped to literal text. If the description has to @-mention someone, send that description as ADF with a proper mention node instead.
- **`getJiraIssue` can hang on comment-heavy issues.** Only relevant when reading a parent epic for context. Fetch comments separately rather than in the same call.
- **Two Atlassian MCP servers may be connected**, depending on which plugins a developer has enabled. Use whichever is authenticated. The tool names differ only in their server prefix.

## Edge cases

**The Atlassian MCP is unreachable.** Say so at the first call that fails, and stop there rather than carrying on to the gate. Without step 4 the payload cannot be built, and without step 6 the gate's duplicate line would read as a confident "none found" that was never checked. Hand over the brief and a draft title as markdown to paste into Jira by hand, and say plainly which checks did not run. Do not pretend the create happened.

**The brief is a bug someone already filed.** The step-6 search surfaces it. Prefer commenting on the existing ticket over creating a second one, but that is the user's call, not the skill's.

**Epic creation.** Out of scope. Epics use text prefixes rather than emojis and are a structural decision about how work is grouped, which is not something to make from a single scope document.

**A create that fails on a field.** Report the exact Jira error rather than retrying with fields stripped. A silently degraded ticket is harder to notice than a failed create.

## Notes

- `.claude/` is not a published package, so changes here need no changeset.
- Producing the ticket is the job. Deciding it is worth doing is not, and neither is starting it.
