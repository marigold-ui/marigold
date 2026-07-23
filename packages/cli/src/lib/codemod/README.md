# Marigold migration codemods

Codemods for breaking style and HTML-structure changes in consumer themes
(DST-1543). The design goal: **per-version work is data, not code**. The
transforms in `primitives/` are version-agnostic and should never need
touching for a new release; everything release-specific lives in a manifest.

## Usage

```sh
npx marigold migrate [version] [path] [--dry-run]
```

- `version` is optional: when omitted, the installed
  `@marigold/components` is detected (walking up from the target path,
  falling back to the declared package.json range) and the applicable
  migration is proposed for interactive confirmation — Enter runs it.
  Non-interactive sessions must pass the version explicitly.
- `path` defaults to the current directory; point it at the consumer repo
  (or its theme directory) you want to migrate.
- **Always run `--dry-run` first** and read the report.
- After a real run, run the consumer's typechecker: the slot Records in
  `@marigold/system`'s `Theme` type are exhaustive, so the typecheck is the
  built-in completeness check for anything the codemod could not fix.

Report legend:

| Prefix | Meaning                                                       |
| ------ | ------------------------------------------------------------- |
| `~`    | change applied (or would be applied, in dry-run)              |
| `!`    | warning: needs a human decision, the codemod did not touch it |
| `-`    | file skipped (e.g. parse error)                               |
| `+`    | file created (scaffolded component styles)                    |

## How it works

```
commands/migrate.ts        runner: file scan, inventory, pipeline, scaffolds
lib/codemod/
  types.ts                 Codemod / CodemodOutcome / MigrationManifest
  anchor.ts                finds ThemeComponent<'X'> declarations
  engine.ts                indent detection, reindent, class-string helpers
  primitives/              version-agnostic transforms (see below)
  manifests/v18.ts         per-version data driving the primitives
```

Consumer code is located via the **type anchor**: a
`const X: ThemeComponent<'Name'> = ...` declaration whose `ThemeComponent`
verifiably comes from `@marigold/system`. File names and directory layout do
not matter. Anything that cannot be found or verified becomes a warning,
never a guess.

The pipeline order matters and is fixed in `commands/migrate.ts`:

1. `restructure-to-slots`: single-cva components become slot objects; the
   consumer's cva moves **verbatim** into the primary slot.
2. `swap-exact-classes`: baseline slots are swapped to the new baseline,
   but only on a byte-exact match (runs before stubbing so a fresh `cva({})`
   stub is never mistaken for a customized slot).
3. `stub-missing-slots`: missing slot keys are added as `cva({})` stubs;
   dropped slot keys are reported.
4. `rename-jsx-members` / `rename-jsx-props` / `remove-jsx-props`: safe
   application-code edits (see below).
5. `report-dead-keys` / `report-structure` / `report-jsx-usage`: report-only
   passes.

Scaffolding (new components like `BooleanField`) runs last, per manifest
entry, next to the theme file of a component that requires it, and registers
the new file in the local barrel `index.ts`.

## Application code

Besides theme files, the pipeline applies **safe** codemods to application
code (`primitives/jsx.ts`, driven by the manifest's `jsx` section). Safe
means lexically decidable, no judgment involved:

- prop renames (`Inset` `space`/`spaceX`/`spaceY` to `p`/`px`/`py`,
  `acceptedFileType` to `acceptedFileTypes` including the array wrap)
- compound-member renames (`Tabs.TabPanel` to `Tabs.Panel`, opening and
  closing tags)
- removals of props the target version dropped (`TextField` `min`/`max`)

The anchor here is the **import**: a JSX element only counts as a Marigold
component when its (possibly aliased) name is imported from
`@marigold/components`. Only explicit JSX attributes are touched; props
hidden behind spreads are unreachable by design and left to the consumer's
typecheck.

**Renamed exports** (the v18 icon migration, driven by the manifest's
`jsx.importRenames` and the official mapping table in
`.changeset/iconography-docs.md`) are renamed **directly** — import and
every usage (`<Pickup />` becomes `<Store />`) — when the file provably
allows it. Member accesses, object keys, and attribute names with the same
spelling are never touched. When a direct rename is not provably safe (the
old name is shadowed or used as a shorthand property, or the new name
already exists in the file), the specifier falls back to the
release-notes-blessed alias form (`Store as Pickup`), which keeps every
call site valid, and the report names the reason. Re-running is a no-op
either way.

Everything that needs a structural JSX move or a design decision is a
warning, never an edit: `Tooltip open` (moves to `Tooltip.Trigger`),
`width="fit"` (removed, needs a chosen width), `Multiselect` (removed, the
`TagField` replacement has a different API), and `Switch size="large"`. That
last one is deliberately NOT auto-removed: the `size` prop still exists in
v18 and a standalone theme may define its own size variants; only the
default theme dropped `large`.

## What is important (invariants)

1. **Never override, only add.** Consumer class strings survive
   byte-for-byte. The only exception is `swap-exact-classes`, and it fires
   only when the consumer's class strings equal the old Marigold baseline
   exactly, which proves the slot was never customized. The check is per
   slot, not per file. Any deviation: warn, do not touch.
2. **Byte-preserving edits.** Everything is `magic-string`; untouched code
   is never re-printed, so a consumer's differing Prettier style produces no
   diff churn.
3. **Warn, never guess.** Spread elements, non-cva helpers, unmatched
   baselines: all bail to structured warnings.
4. **Idempotent.** Re-running a migration is a no-op; already-swapped slots
   are recognized as being on the target baseline.
5. **The Theme contract is a stable API of this system.** The primitives and
   the manifest format assume optional component keys, exhaustive slot
   Records, and cva-based style functions. Changing that contract in
   `@marigold/system` is itself a breaking change: bump the manifest
   `schemaVersion`, keep the old interpreter so chained migrations
   (v17 to v19) still work.

## Adding a new migration (e.g. v19)

Per-version work should be data entry, not transform code:

1. Create `manifests/v19.ts`. Follow the provenance comments in `v18.ts`:
   - `slots`: extract from the `Theme` type of the target version (see the
     type-diff approach documented in `v18.ts`; a codegen script is the
     planned step 3 of DST-1543 and will generate this file).
   - `swaps`: hand-author only the `{ component, slot }` targets. The
     `oldClasses` strings must be extracted from the **previous major's
     published theme-rui** and `newSource` from the current one. Never type
     class strings by hand; a single whitespace difference silently disables
     the swap.
   - `restructures`: components whose type changed from a single style
     function to a slot Record, plus the slot that receives the existing
     styles (`container` is the default).
   - `structureWarnings`: hand-written texts for DOM changes that break
     consumer CSS selectors. Not auto-fixable, but must not go unannounced.
   - Warning links: point at the **source in this repo**, as GitHub
     permalinks pinned to a commit SHA or release tag (never a branch name:
     line numbers rot). Link the line that answers "what do I replace this
     with", e.g. the prop type that excludes the removed value. Codegen
     should re-resolve line numbers against the release tag.
2. Register it in `MANIFESTS` in `commands/migrate.ts`.
3. Acceptance test: `--dry-run` against a real consumer repo and read every
   line of the report.

A change that no primitive can express gets a **one-off transform** for that
version (same `Codemod` interface, added to the pipeline). Promote it to a
primitive only when the same shape shows up in a second major; designing a
general abstraction from a single example is how wrong abstractions happen.

## Adding or changing a primitive

- A primitive is a factory: `(manifest: MigrationManifest) => Codemod`. It
  must return `edited | unchanged | skipped` plus warnings, re-parse its own
  input (transforms are chained by re-parsing; babel parse is fast), and
  uphold the invariants above.
- Add fixture tests in `codemod.test.ts`. Fixtures are consumer-shaped
  (4-space indent, single quotes, portal-style files), and byte-preservation
  is asserted on the fixture's class strings.
- Wire it into the pipeline in `commands/migrate.ts`; think about ordering
  (see above).

## Known limitations

- The swap token warning lists every string literal that is new relative to
  the old baseline, which includes variant names like `default`. Noise, but
  safe. Upgrade path: resolve utilities against the consumer's actual CSS.
- Only annotated `ThemeComponent<'X'>` declarations are anchored. A theme
  assembled as one inline `Theme`-typed object without per-component
  annotations is not found yet (no known consumer does this).
- HTML-structure changes are report-only by design: consumers with their own
  CSS against Marigold's DOM (e.g. generated BEM selectors) must review the
  named components manually.
