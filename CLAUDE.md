# Marigold

The Reservix design system: React components built on `react-aria-components` and Tailwind CSS
v4, published to npm as `@marigold/*`. Product teams consume it in many apps, mostly through AI
agents. **A stable public API and a clear migration path matter more than an elegant one.**

Scripts and pinned versions: @package.json

React 19 (`ref` is a prop, no `forwardRef`), Tailwind v4, Storybook 10 and Vitest 4 are newer
than most training data. Read the source or the docs tools below before relying on memory.

## Map

| Path                  | What                                                                               |
| --------------------- | ---------------------------------------------------------------------------------- |
| `packages/components` | Components, one folder each: `src/<Name>/<Name>.tsx`, `.stories.tsx`, `.test.tsx`  |
| `packages/system`     | `useClassNames`, `cva`, `cn`, theme types (`src/types/theme.ts`)                   |
| `packages/icons`      | Icon components                                                                    |
| `packages/cli`        | The `marigold` CLI that consumers run (`docs`, `search`, `validate`, `migrate`, …) |
| `themes/theme-rui`    | The theme: tokens in `src/tokens.css`, styles in `src/components/<Name>.styles.ts` |
| `docs`                | Next.js docs site. Content in `docs/content/**`. Has its own `CLAUDE.md`           |
| `.memory`             | Glossary (`CONTEXT.md`) and decision records (`adr/`), reviewed like code          |
| `scripts/check-*.mjs` | Repo guards that CI runs                                                           |

## Commands

Always `pnpm`. On a fresh clone run `pnpm install && pnpm build` once. After that Storybook,
typecheck and the tests read package source, and only the docs site and the CLI need a rebuild.

| Task                       | Command                                                                       |
| -------------------------- | ----------------------------------------------------------------------------- |
| Typecheck                  | `pnpm typecheck:only` (a hook also runs it after every `.ts`/`.tsx` edit)     |
| Lint                       | `pnpm lint` (0 errors is the bar, the existing warnings are not yours to fix) |
| Unit tests, one component  | `pnpm vitest run --project=unit-tests packages/components/src/<Name>`         |
| Story tests, one component | `pnpm vitest run --project=storybook-tests packages/components/src/<Name>`    |
| All tests                  | `pnpm vitest run` (about 4 minutes, Firefox via Playwright)                   |
| Docs prose                 | `pnpm lint:prose`                                                             |
| Repo guards                | `pnpm check:rac-imports`, `pnpm check:theme-zindex`, `pnpm check:memory`      |
| Storybook / docs site      | `pnpm sb` (port 6006) / `pnpm start` (port 3000, needs `pnpm build` first)    |

Prettier and Vale run on commit through lint-staged, so there is nothing to format by hand.

## Rules that always apply

- **Do not change public API without asking.** A removed or renamed prop or export, a changed
  default or a changed DOM/ARIA contract is breaking for many apps.
- **Never weaken a check to get green.** No skipped or loosened tests, no disabled lint rules,
  no `any`, no `@ts-ignore`.
- **Do not edit generated files**: any `CHANGELOG.md`, `docs/content/releases/**/release.mdx`,
  `themes/theme-rui/src/appearances.ts`, and `pnpm-lock.yaml` by hand.
- **Do not guess a component's API.** In this repo the source is the truth. Read
  `packages/components/src/<Name>/<Name>.tsx`.
- Components never expose `className` or `style`, style only through `useClassNames`, and are
  built on React Aria. The full rules load when you open a component file.

## Definition of done

For a change to a published package (`components`, `system`, `icons`, `theme-rui`, `cli`):

1. The behaviour is covered by a test. For a bug, the failing test comes first.
2. `pnpm typecheck:only` passes, `pnpm lint` reports no errors, the affected component's unit
   and story tests pass.
3. Stories are updated, tagged `component-test` where they carry tests.
4. The docs page is updated when consumers can see the change.
5. A changeset exists for every published package touched. **No CI check enforces this**, so a
   missing one ships nothing.
6. Keyboard use, accessible names and focus are checked by hand or asserted in a test. The
   automated a11y pass reports but does not fail.

Commits and PR titles: `<type>(DST-1234): description`, with `feat`, `fix`, `chore`, `docs`,
`refactor`, `test`, `style` (a visual change, not formatting), `perf`, `build`, `ci`, `revert`.
Branch from `main` as `<type>/DST-1234-slug`.

## Where the detail lives

Loaded automatically when you touch a matching file, or on demand. Nothing here needs reading
up front.

| When you are…                                   | Read / use                                                      |
| ----------------------------------------------- | --------------------------------------------------------------- |
| Editing component or system source              | `.claude/rules/components.md` (auto), `/new-component`          |
| Editing stories or tests                        | `.claude/rules/testing.md` (auto), `/fix-bug`                   |
| Editing the theme                               | `.claude/rules/theme.md` (auto), `/add-variant`                 |
| Writing docs, changesets or READMEs             | `.claude/rules/prose.md` (auto), `docs/CLAUDE.md`, `/changeset` |
| Reviewing a diff before a PR                    | the `marigold-reviewer` subagent, `.github/review-checklist.md` |
| Unsure what a term means or why something is so | `.memory/CONTEXT.md`, `.memory/adr/`                            |
| Filing a DST ticket                             | `/dst:create-ticket` (conventions live in the `dst` plugin)     |
| Releasing or prereleasing                       | `README.md`, "Releasing". CI publishes, never a local command   |
| Adding a hook or skill                          | `.claude/README.md`                                             |

## Ask first

These reach outside the checkout or spend something. Do them only on an explicit request, and
confirm the target.

- **Visual regression tests (Chromatic).** Every run spends snapshot quota. `/vrt` only.
- **Publishing.** Never run `changeset publish`, `changeset pre enter|exit`, `pnpm publish` or
  `changeset version` locally.
- **Pushing, opening or commenting on a PR, writing to Jira.** Pass every comment or PR body
  from a file (`gh pr create --body-file`, `gh api -F body=@file`), never as an inline shell
  string. `gh api -f body=@file` posts the literal text `@file` and exits 0. For `glab`, the
  file must sit inside the checkout.

## Tools

- **Hooks** (`.claude/settings.json`): a pre-flight block at session start, and a typecheck
  after each TypeScript edit and at the end of a turn. Its output is a real error, so fix it.
- **MCP** (`.mcp.json`): `sb-mcp-server` answers only while `pnpm sb` is running and brings its
  own usage instructions. `React Aria` is the react-aria-components reference. `marigold-docs`
  searches the **published** docs and needs Reservix OAuth.
- **`marigold` CLI**: built for consumer apps and not on `PATH` here. After `pnpm build`, run
  `node packages/cli/dist/bin/marigold.mjs <command>`. It describes the published release, not
  your working tree, and `doctor`/`validate` judge a consumer app, not this source.
- **`dst` plugin**: the team's workflow skills (`/dst:grill`, `/dst:pick-up`, `/dst:create-pr`,
  `/dst:review-pr`, …) are installed per user, not in this repo:
  `claude plugin marketplace add marigold-ui/dst-toolkit && claude plugin install dst@dst-toolkit`.
  Start non-trivial work with `/dst:grill`.
