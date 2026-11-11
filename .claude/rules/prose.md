---
paths:
  - 'docs/content/**/*.mdx'
  - '.changeset/*.md'
  - 'README.md'
  - 'contributing.md'
  - 'CODE-OF-CONDUCT.md'
  - 'MIGRATION-v18.md'
  - 'packages/*/README.md'
  - 'themes/*/README.md'
  - 'config/*/README.md'
---

# Prose rules

Prose written for a reader is linted by Vale (`pnpm lint:prose`, the pre-commit hook and the
Prose CI check). The rules live in `.vale/styles/Marigold/`. `error` blocks CI, `warning` is
advisory.

- **No em dashes.** Use a comma, a colon or a second sentence. In a list write
  `- **Term**: definition`.
- **No semicolons in prose.** Use a period or a comma. Code is untouched: fenced blocks, code
  spans and MDX `import` lines are out of scope.
- **No en dash asides.** Ranges keep the en dash: `4–9`, `Jan 1 – Dec 31`.

Table cells are exempt from all three.

Out of scope, so do not "fix" them: `CLAUDE.md`, `.claude/**`, `.memory/**`,
`packages/*/src/**/README.md`, and generated output (`CHANGELOG.md`,
`docs/content/releases/**/release.mdx`, `docs/content/releases/blog/**`). `.claude/README.md`
requires an em dash in skill descriptions.

## Component docs pages

A page is a folder under `docs/content/components/<category>/<name>/`:

- `index.mdx`: frontmatter `title` and `description`, then prose.
- `<name>-<topic>.demo.tsx`: a default-exported component, rendered with
  `<ComponentDemo name="<name>-<topic>" />`. Demos import from `@marigold/components`.
- `<name>-anatomy.tsx`: the anatomy diagram. Contract in `docs/CLAUDE.md`.
- Props are not written by hand: `<AutoTypeTable path="<Name>" name="<Name>Props" />` renders
  the JSDoc from the component source. Variants come from `<AppearanceDemo>` and
  `<AppearanceTable>`, which read the built theme.

Write for product developers: when to use the component, when not to, and what each variant
means. Do not restate the props table.

## Changesets

Write the file by hand, `pnpm changeset` is interactive. Name it
`.changeset/<ticket-lowercase>_<slug>.md`, e.g. `dst-1829_filefield-label-addon.md`.

- One entry per published package whose source changed. `@marigold/system`,
  `@marigold/components` and `@marigold/docs` are a fixed group with one version, so the
  highest bump among them applies to all three.
- `major` is never chosen alone. Ask first.
- First line `<type>(DST-1234): summary`, as in the PR title. Then a paragraph for a consumer:
  what changed for them and what to do. No file names or internals. A breaking change states
  before, after and the migration.
