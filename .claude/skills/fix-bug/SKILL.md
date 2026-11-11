---
name: fix-bug
description: DST — Fix a bug in a Marigold component test-first, so the fix is proven and cannot regress (reproduce, write the failing test, fix, verify, changeset). Use when the user reports a defect in a component, pastes a DST or DSTSUP bug, says "fix this bug", "this is broken", "regression in <Component>", or types `/fix-bug`. Local file changes only.
argument-hint: <ticket key or description>
---

# Fix a bug, test first

The order is the point. A test written after the fix passes whether or not it tests the bug.
A test that fails first, for the right reason, and passes afterwards is the only evidence that
the fix is the fix.

## Usage

```
/fix-bug DSTSUP-301
/fix-bug Select loses focus after clearing
```

## Workflow

### 1. Reproduce and locate

Restate the bug as *given, when, expected, actual*. If a ticket key was given and the Atlassian
tools are available, read the ticket. Find the component and read it, its stories and its tests.
Check whether an ADR governs the area: `grep -l "<Name>" .memory/adr/*.md`.

If you cannot reproduce it from the description, say so and ask for the missing step. Do not
fix a bug you have not seen.

### 2. Decide where the cause is

- A React Aria behaviour: check the React Aria MCP and whether Marigold passes the right props.
  Do not paper over an upstream bug with a workaround before saying that is what it is.
- A theme style: the fix belongs in `themes/theme-rui`, and the test is usually a story.
- Component logic: the fix belongs in `packages/components/src/<Name>/`.

### 3. Write the failing test

Pick the layer the user would have hit the bug in:

- **Interaction, focus, keyboard, announcements**: a `.test()` on a story. Add a story if no
  existing one sets up the situation.
- **Rendering, props, edge cases**: a unit test in `<Name>.test.tsx` that renders a story.

Name the test after the behaviour, not the ticket. Assert through roles and accessible names.
Rules and examples are in `.claude/rules/testing.md`.

### 4. Watch it fail

```bash
pnpm vitest run --project=unit-tests packages/components/src/<Name>
# or
pnpm vitest run --project=storybook-tests packages/components/src/<Name>
```

It must fail, and with the symptom from step 1. A failure from a typo in the test, or a missing
import, proves nothing: fix the test until it fails for the bug. Show the user the failure.

If you cannot make a test fail (a purely visual bug, a browser-specific rendering issue), stop
and say so. Do not write a test that passes before the fix and call it coverage.

### 5. Fix

The smallest change that makes the test pass. No refactoring alongside, no behaviour changes
beyond the bug. If the real fix changes public API or a default, stop and ask
(`.claude/rules/components.md`, "Public API is the product").

### 6. Verify

```bash
pnpm vitest run --project=unit-tests packages/components/src/<Name>
pnpm vitest run --project=storybook-tests packages/components/src/<Name>
pnpm typecheck:only
pnpm lint
```

The new test passes, every existing test in the component still passes, and none was edited to
get there. If an existing test had to change, explain why its old expectation was wrong.

If the fix touched something shared (`packages/system`, a `utils/` file, a context, a theme
utility), run the whole suite: `pnpm vitest run`.

### 7. Changeset and docs

`/changeset`, normally `patch`. Update the docs page only if documented behaviour changed.

### 8. Report

The cause in one sentence, the test that now guards it, the commands and their results. Say
plainly what was not verified, for instance a screen reader announcement that was asserted in
the DOM and not heard.
