---
name: add-variant
description: DST — Add a `variant` or `size` value to an existing Marigold component, in every place the value has to appear (prop union, theme style file, stories, docs table, changeset). Use when the user asks to "add a variant", "add a size", "new appearance for <Component>", or types `/add-variant`. Local file changes only. Not for removing or renaming a variant, which is a breaking change.
argument-hint: <Component> <variant|size> <value>
---

# Add a variant or size

A variant lives in two packages that are released separately. The prop union in the component
tells TypeScript the value exists, and the theme style file makes it look like something. Add
one without the other and you get either a value that renders unstyled or styles nobody can
reach, with no error either way.

## Usage

```
/add-variant Badge variant neutral
/add-variant Button size compact
```

## Workflow

### 1. Check it should be a variant

- **Appearance, not behaviour.** A variant changes how a component looks. If the new value
  changes what it renders or how it behaves, it is a mode boolean in disguise: stop and propose
  a compound part or a separate component instead (`.claude/rules/components.md`, Composition).
- **Additive only.** Removing or renaming a value, or changing the default, breaks consumers.
  That is not this skill. Stop and ask.
- **Not already covered.** Read the component's style file. An existing value, or a combination
  of `variant` and `size`, may already do it.

### 2. Change the two sources

1. `packages/components/src/<Name>/<Name>.tsx`: add the value to the `variant` or `size` union,
   before the trailing `(string & {})`. Update the prop's JSDoc if the list is described there.
2. `themes/theme-rui/src/components/<Name>.styles.ts`: add the value under `variants.variant` or
   `variants.size`. In a multi-slot component (`Card` is one), only the slots whose look changes
   need an entry. Read which slots already define that variant key before adding it elsewhere.

Use semantic tokens. If the look needs a token that does not exist, add it to
`themes/theme-rui/src/tokens.css` and call that out to the user: a new token is public API of
the theme.

Some components share another component's styles. If `<Name>` has no style file of its own,
look for it in the alias map at the top of `themes/theme-rui/scripts/build-appearances.mjs`.

### 3. Show and test it

- Stories: add the value to the `argTypes` options, and to any story that renders every variant
  side by side.
- A unit test that renders all variants by index (as `Badge.test.tsx` does) keeps a hand-written
  order list. Update it.
- Add a test only when the variant carries behaviour worth guarding, such as an icon that
  appears. A new colour does not need an interaction test.

### 4. Verify

```bash
pnpm typecheck:only
pnpm vitest run --project=unit-tests packages/components/src/<Name>
pnpm vitest run --project=storybook-tests packages/components/src/<Name>
pnpm check:theme-zindex
```

Inline snapshots that include class names will change for the affected variants only. If a
snapshot for an untouched variant changes, you altered the base styles. Find out why before
updating anything.

### 5. Document

In `docs/content/components/<category>/<name>/index.mdx`, add a row to the variant table saying
what the value means and when to use it. The `<AppearanceDemo>` picker and `<AppearanceTable>`
pick the value up from the built theme, so run `pnpm build:themes` before looking at the docs
site. Run `pnpm lint:prose`.

### 6. Changeset

`/changeset`. Usually `minor` for both `@marigold/components` and `@marigold/theme-rui`, in one
changeset file.

### 7. Report

State the two source changes, the checks run, and that the change is visual and so not covered
by any test here. The user can run `/vrt` to see it in Chromatic.
