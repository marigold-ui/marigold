# Jira (DST project)

Read this before creating or editing a DST issue by hand. `/dst:create-ticket` applies the same
conventions and is the normal path. Moved here from the root `CLAUDE.md` unchanged, so it costs
context only when a ticket is actually being written.

Jira Cloud ID: `reservix.atlassian.net` | Project key: `DST`

### Issue Types and Title Emojis

Both tables live in the [`dst` plugin](https://github.com/marigold-ui/dst-toolkit), at
`skills/create-ticket/references/dst-conventions.md`:
the issue types with their ids, and the title emoji convention every DST title starts
with. They are the team's conventions rather than this repository's, and `/dst:create-ticket`
has to apply them from the Core, ClearingAdministration and Insights checkouts too, so
they travel with the skill instead of living here. One copy, wherever you are reading from.

The two you will reach for most: `Task` is work planned into a sprint, `Unplanned` is
work picked up inside an already-planned one. They are used in roughly equal numbers, so
`Unplanned` is a normal case rather than an exception. The two differ by **planning
provenance**, not by the kind of work: a feature and a defect can both be `Unplanned`.
The title emoji is what says which kind of work it is.

### Custom Fields by Issue Type

The `Task` create screen marks these three required. They are set through `additional_fields`:

- **Appetite** (`customfield_11370`) — Free text time estimate. Examples: `"2 days"`, `"1 week"`, `"3 weeks"`
- **Rollout Communication** (`customfield_12908`) — Select field. Defaults to `"no communication"` (id: `13833`). Options: `"internal communication"` (`13834`), `"internal & external communication"` (`13835`)
- **Requires UI Kit Update** (`customfield_13205`) — Select field. Defaults to `"No"` (id: `14326`). Other option: `"Yes"` (`14325`)

**These fields do not exist on every issue type.** `Appetite` and `Rollout Communication`
are on the `Task` create screen only. `Requires UI Kit Update` is also on `Unplanned`,
where it is optional and carries no default. `Bug` has none of the three. Sending a field
the chosen type does not carry gets the whole create rejected, so omit what does not apply
and put the appetite in the description instead. Since `Unplanned` is about half of what
the team files, this is the common case rather than an edge one.

On `Task`, only `Appetite` actually needs a value. The other two carry server-side
defaults, so Jira fills them when they are omitted.

Required fields are Jira configuration and can change without notice. When creating an
issue programmatically, read them with `getJiraIssueTypeMetaWithFields` for the issue
type you are about to create rather than trusting this list.

Always use `contentFormat: "markdown"` for descriptions.

### Description Template

**Each issue type has its own template**, and Jira carries it as that type's `description`
field default. The one below is `Task`'s. `Unplanned` uses `Summary`, `Context / Trigger`
and `Impact`, carried as bold paragraphs rather than headings. `Bug` uses `Which version
of Marigold are you using?`, `Description`, `How to reproduce`, `Expected behavior`,
`Screenshots` and `Stakeholders`. When creating programmatically, take the section
headings from `description.defaultValue` in the `getJiraIssueTypeMetaWithFields` response
for the type you are creating. That call needs `requiredFieldsOnly: false`. It defaults to
true, and `description` is not a required field, so the plain call returns every required
field and no template at all.

```markdown
#### **Problem:**

[Motivation. Include bullet points: Why now? Why important? Impact? Stakeholders?]

#### **Expected Outcome:**

[What success looks like for the user/team]

#### **Scope:**

**Included:**

- [requirement 1]
- [requirement 2]

**Not included:**

- [explicit exclusion 1]

#### **Suggested Solution:**

[Rough sketch, code examples, architecture notes]

#### **References:**

- [Links to files, related tickets, Confluence pages, RFCs]
```
