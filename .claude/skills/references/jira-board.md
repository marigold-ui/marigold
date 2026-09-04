# The DST board, and the Atlassian MCP's rough edges

What a skill needs to know to read this instance's boards without getting a wrong answer that looks right. Every item here was found by getting it wrong first.

Loaded on demand by the skills that talk to Jira. It is not owned by any one of them.

## Coordinates that cannot drift

Cloud id `4d9db72d-4108-4483-8582-40a3286e29c9` (`reservix.atlassian.net`).

Two project keys, and they are not variations of one board:

| Key | What it is | Statuses |
| --- | --- | --- |
| `DST` | The design system team's board. Sprints, rank, epics | `11128` Ready, `11135` In Progress, `11136` In Review, `11153` Backlog, plus `On hold` and `Re-shape` |
| `DSTSUP` | Support intake. No sprint field at all | `11281` In Arbeit, `11282` Review, `11283` Wait for Informations |

Everything else is read at run time.

`DST` is the team's project, not this repository's issue tracker. It also carries work on the Core app, ClearingAdministration, the Cypress end-to-end suite and the Insights scanner and dashboard. A ticket key is not evidence the work lives here.

## Status names in JQL are English, responses are localised

JQL matches the canonical English name. The API hands back the localised one. So a `de` locale account reads `Bereit` off a response, and `status = "Bereit"` then matches nothing at all, silently.

**Never round-trip a status name from a response into a query.** The ids above are immune to both translation and renaming.

The same split applies to transitions, which is worse because both fields are present on one object: transition names come back in English while their `to.name` comes back localised. On a `de` account the transition to In Progress is named `In Progress` and its `to.name` is `In Arbeit`. Match on `to.id`, the only field that is neither translated nor renamed. Never hardcode a transition id itself: a status id is stable, a transition id is workflow configuration and differs with the status you are leaving.

## `statusCategory` is too wide to stand in for a status

`statusCategory = "To Do"` also contains `On hold` and `Re-shape`, which are parked and re-scoping rather than actionable. Name the statuses you mean.

## An empty result is a claim you have to earn

An empty response looks identical to "nothing on the board", which is how the locale trap above hid itself for a while. Before reporting an empty result, re-run without the status clause. If that returns rows, the query is broken and the board is fine.

## Always send an explicit `fields` list and a small `maxResults`

An unfiltered sprint query returns well over a hundred thousand characters and is truncated before you can read it. Name the fields you want rather than sending `*all`.

## Field ids the responses do not make guessable

| Field | Id | Notes |
| --- | --- | --- |
| Sprint | `customfield_10020` | An array of sprint objects. Carried-over issues list their closed sprints alongside the active one, so match on `state == "active"` rather than taking `[0]` |
| Appetite | `customfield_11370` | Free text, e.g. `"1 week"` |
| Epic | `parent` | Returns the epic's key *and* summary, so its title costs no second call |

`priority` is **not** a ranking input on this board. Three open DST issues carry a priority at all, all of them from the DST-700/800 era, and `priority IN (Highest, High) AND statusCategory != Done` returns zero. Current issues do not come back with the field at all. Anything that ranks by priority here is sorting by a constant while looking like it is sorting by importance.

## Rank without a board API

`ORDER BY Rank ASC` works on an arbitrary set of keys, so board rank is readable in one call with no Agile API and no board id:

```
key IN (DST-1526, DST-1607, DST-1745) ORDER BY Rank ASC
```

The **response order is the ranking**. No rank value needs reading, and none is returned.

One query per project key. Rank is a global lexorank string, so ordering a set that spans `DST` and `DSTSUP` interleaves two independent boards into an order that means nothing.

## `getJiraIssue` can hang on comment-heavy issues

Around a minute, when comments are requested alongside everything else. Fetch comments in their own call with `fields: ["comment"]`.

## Attachments are exposed

The `attachment` field returns an array of file metadata. Earlier notes in this project claimed the MCP hides them, which was checked and is wrong. You still cannot see inside them, so list the filenames and say so plainly.

## Link type names are numbered

`1 Relates`, `3 Blocks`. Only relevant when reading a ticket's links.

## Two Atlassian MCP servers may be connected

Depending on which plugins a developer enabled: `mcp__plugin_atlassian_atlassian__*` and `mcp__plugin_rx-baseline_atlassian__*`. The tool names differ only in that prefix. Use whichever is authenticated, and list both in a skill's `allowed-tools`.
