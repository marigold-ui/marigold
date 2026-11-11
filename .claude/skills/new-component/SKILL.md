---
name: new-component
description: DST — Scaffold a new Marigold component across every place it has to exist (component source, theme types, theme styles, barrel, stories with tests, unit test, docs page, changeset). Use when the user asks to "add a component", "create a new component", "scaffold <Name>", or types `/new-component`. Local file changes only. Not for adding a variant or a compound part to an existing component.
argument-hint: <ComponentName>
---

# New component

A component is not one file. It is registered in seven places, and missing one fails late: a
missing theme type fails typecheck, a missing barrel line ships nothing, a missing changeset
releases nothing. Work through the list in order and do not skip the gate.

## Usage

```
/new-component Rating
```

## Workflow

### 1. Settle the API before writing code

A new component is new public API that many apps will depend on, and it cannot be taken back
without a major release. Before any file exists, state back and get confirmed:

- the name, and which docs category it belongs to (`docs/content/components/<category>/`)
- the React Aria primitive it wraps (look it up with the React Aria MCP), or why none fits
- its props, its `variant` and `size` values, and its compound parts if any

If the scope is still open, say so and suggest `/dst:grill` instead of guessing. Check that
nothing existing already does the job: `grep -ril "<keyword>" packages/components/src/index.ts docs/content/components`.

### 2. Read the nearest neighbour

Pick the existing component closest in shape and read all of its files: `Badge` (plain
element), `Button` (RAC wrapper with context), `Dialog` (compound with slots). Copy its
structure, not a template from memory. `.claude/rules/components.md` loads when you open it and
holds the rules.

### 3. Create the pieces

| # | File | What |
| --- | --- | --- |
| 1 | `packages/system/src/types/theme.ts` | Add `<Name>` to `Theme['components']`: a single `ComponentStyleFunction`, or a `Record` of slot names |
| 2 | `themes/theme-rui/src/components/<Name>.styles.ts` | `export const <Name>: ThemeComponent<'<Name>'> = cva({…})`, semantic tokens only, no z-index |
| 3 | `themes/theme-rui/src/components/index.ts` | Re-export the style file |
| 4 | `packages/components/src/<Name>/<Name>.tsx` | Component and `<Name>Props`, JSDoc on every prop, `ref` as a prop |
| 5 | `packages/components/src/index.ts` | Named export, plus `export type { <Name>Props }` |
| 6 | `packages/components/src/<Name>/<Name>.stories.tsx` | `preview.meta` / `meta.story`, title `Components/<Name>`, `component-test` tag, `.test()` for each behaviour |
| 7 | `packages/components/src/<Name>/<Name>.test.tsx` | Unit tests that render the stories |

### 4. Verify

```bash
pnpm typecheck:only
pnpm lint
pnpm vitest run --project=unit-tests packages/components/src/<Name>
pnpm vitest run --project=storybook-tests packages/components/src/<Name>
pnpm check:theme-zindex && pnpm check:rac-imports
```

Then check by hand, or in a test, what the suite does not gate: keyboard operation, the
accessible name, the focus ring. With Storybook running, use the `preview-stories` MCP tool and
give the user the URL.

### 5. Document

Create `docs/content/components/<category>/<kebab-name>/`:

- `index.mdx` with `title` and `description` frontmatter, plus `badge: alpha` or `badge: beta`
  if the user wants it marked as such. Ask, do not assume.
- one `<kebab-name>-<topic>.demo.tsx` per example, rendered with `<ComponentDemo name="…" />`
- `<AutoTypeTable path="<Name>" name="<Name>Props" />` for the props
- an anatomy diagram, following `docs/CLAUDE.md`

Add the page's folder name to `pages` in the category's `meta.json`. The list is explicit and
alphabetical, so a page that is not listed does not appear in the navigation. Run
`pnpm lint:prose`.

### 6. Changeset

`/changeset`. A new component is `minor` for `@marigold/components` and `@marigold/theme-rui`,
and `@marigold/system` when its theme types changed.

### 7. Report

List the files created, the commands run with their results, and anything left open (missing
anatomy diagram, undecided badge, visual regression baseline). Visual regression tests are not
yours to start: mention that the user can run `/vrt`.
