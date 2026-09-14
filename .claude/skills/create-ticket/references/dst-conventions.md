# DST ticket conventions

What `/create-ticket` needs to know about the DST project before it calls Jira. It lives here rather than in a repo's `CLAUDE.md` because DST is the design system team's project across the Core app, ClearingAdministration, the Cypress suite and the Insights scanner as well as the Marigold repository, and the skill has to read the same conventions from any of them.

Everything on this page is either a team convention or a stable Jira id. **Nothing here describes which fields an issue type requires.** That is Jira configuration, it differs per type, and step 4 reads it at run time.

## Coordinates

Cloud id `4d9db72d-4108-4483-8582-40a3286e29c9` (`reservix.atlassian.net`), project key `DST`.

## Issue types

| Type      | ID    | Use for                                         |
| --------- | ----- | ----------------------------------------------- |
| Task      | 10697 | Work planned into a sprint                      |
| Bug       | 10698 | Defects and errors                              |
| Epic      | 10671 | Collection of related tasks                     |
| Sub-task  | 10672 | Breakdown of a parent task                      |
| Unplanned | 10860 | Work picked up inside an already-planned sprint |

`Task` and `Unplanned` are used in roughly equal numbers, so `Unplanned` is a normal case rather than an exception. The two differ by **planning provenance**, not by the kind of work: a feature and a defect can both be `Unplanned`. The title emoji is what says which kind of work it is.

The ids are what `getJiraIssueTypeMetaWithFields` takes. They are project configuration and change only if someone rebuilds the issue-type scheme, which is a different class of thing from the required-field set. If a call rejects one, read the project's types back from Jira rather than guessing another number.

## Title emoji convention

Every issue title **must** start with an emoji indicating its type of work (see [Confluence: Emojis](https://reservix.atlassian.net/wiki/spaces/DST/pages/3797942472/Emojis)):

| Emoji | Category                  |
| ----- | ------------------------- |
| 🐛    | Bug                       |
| 🩹    | Hotfix                    |
| 🏗️    | Infrastructure            |
| 🧹    | Refactor / Cleanup        |
| 📝    | Documentation             |
| 💄    | Style / Theme             |
| ✨    | Feature                   |
| 🧩    | New Component             |
| ✍️    | Blog / Confluence article |

**Modifier emojis** (combine with a type emoji above):

| Emoji | Meaning                      |
| ----- | ---------------------------- |
| ⚡️    | Quick task / spare-time work |
| 🏚️    | Core-only task               |

Examples: `📝⚡️ Quick docs fix`, `🧹🏚️ Core-only refactor`, `✨ New feature title`

**Exception**: Epics use text prefixes instead of emojis: `[CPB]`, `[RUI]`, `[Infra]`. Creating one is out of scope for this skill either way.

The board also carries area markers that this table does not list, `👁️` for Insights and `📟` for the CLI among them. They are not type emojis and never replace one.
