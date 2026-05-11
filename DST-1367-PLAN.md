# DST-1367 — Panel slot-configuration refactor

**Status:** Plan. Not yet started.
**Jira:** [DST-1367](https://reservix.atlassian.net/browse/DST-1367)
**Depends on:** [DST-1366 / PR #5386](https://github.com/marigold-ui/marigold/pull/5386) (Phase 0 primitives) + two add-on commits on the same branch (see "Phase 0 add-ons" below).
**Final PR target:** `beta-release` (after #5386 lands).
**Working branch:** `feat/DST-1367-panel-slot-configuration`, branched off the updated tip of `feat/DST-1366-slot-configuration-primitives`.

## 1. Goal

Make `<Panel.Header>` a single `<Provider>` that configures every slot-aware primitive nested inside it. Consumers write the role primitives (`<Title>`, `<Description>`, `<ActionButton>`, `<ActionGroup>`, `<ActionMenu>`, `<LinkButton>`) directly; the container injects level, IDs, ref wiring, grid-area positioning, and the action cascade via context. No compound wrappers for slot-aware roles.

Concretely, this consumer code becomes the canonical shape:

```tsx
<Panel headingLevel={2}>
  <Panel.Header>
    <Title>Organizer Profile</Title>
    <Description>Public details shown on the event page.</Description>
    <ActionMenu aria-label="Profile actions">
      <ActionMenu.Item id="edit">Edit</ActionMenu.Item>
    </ActionMenu>
  </Panel.Header>
  <Panel.Content>…</Panel.Content>
</Panel>
```

And the multi-action shape:

```tsx
<Panel.Header>
  <Title>Stripe Payments</Title>
  <ActionGroup aria-label="Integration actions">
    <ActionButton aria-label="Reconnect">
      <Link2 />
    </ActionButton>
    <ActionButton aria-label="Refresh">
      <RefreshCw />
    </ActionButton>
    <ActionMenu aria-label="More">…</ActionMenu>
  </ActionGroup>
</Panel.Header>
```

No `<Panel.Title>`, no `<Panel.Description>`, no `<Panel.HeaderActions>`.

## 2. Architectural principle (new convention to document)

**Positional className flows through slot contexts and is absorbed at the first layout boundary. Container slot-aware components MUST republish (scrub) the descendant slot contexts so positional className does not leak past their cell.**

Why: a parent container (e.g. `Panel.Header`) wants every action it nests to land in `[grid-area:actions]`. It publishes that className on `ActionButtonContext` / `ActionGroupContext` / `ActionMenuContext`. The first slot-aware child consumes it. But without scrubbing, an `<ActionButton>` _inside_ an `<ActionGroup>` would individually re-claim the grid cell — they'd stack. Solution: `<ActionGroup>` republishes a fresh `ActionButtonContext` for its descendants, dropping the positional className.

This pattern scales to every container we will refactor in Phase 2+ (Dialog, Drawer, Tray, ContextualHelp, SectionMessage, EmptyState, Card).

## 3. Phase 0 add-ons (commits pushed to PR #5386's branch BEFORE Phase 1 starts)

Both add-ons sit on `feat/DST-1366-slot-configuration-primitives`. They are required for Phase 1 to work cleanly. They are small in scope, well-motivated by Phase 1's needs, and have no production consumers to break.

### (ii) `<LinkButton>` merges context className

**Why:** Without this, `<LinkButton>` inside `<Panel.Header>` would not pick up `[grid-area:actions]` and would render outside the header's grid cell.

**Current (`packages/components/src/LinkButton/LinkButton.tsx`):**

```tsx
const ctxValue = useSlottedContext(ActionButtonContext, slot);
const groupCtx = useSlottedContext(ActionGroupContext);
// className from ctxValue is ignored.
return <Link {...props} ref={ref} slot={slot} className={cn(classNames, ...)} … />;
```

**Fix:** merge `className` (and `id`, where useful) from `ctxValue` and `groupCtx` into the rendered `<Link>`. The anchor/button ref-type mismatch reason for using `useSlottedContext` instead of `useContextProps` still holds — keep the read-only approach, but extract `className` from the read values and concatenate it.

**Sketch:**

```tsx
const ctxValue = useSlottedContext(ActionButtonContext, slot);
const groupCtx = useSlottedContext(ActionGroupContext);

const ctxClassName = ctxValue?.className;
const groupClassName = groupCtx?.className;

// existing precedence chain for variant / size / disabled stays the same
return (
  <Link
    {...props}
    ref={ref}
    slot={slot}
    className={cn(
      ctxClassName,
      groupClassName,
      classNames,
      fullWidth && 'w-full'
    )}
    isDisabled={disabled}
  >
    {children}
  </Link>
);
```

**Tests to add (`LinkButton.test.tsx`):** a positional className supplied via `<Provider values={[[ActionButtonContext, { className: 'X' }]]}>` reaches the rendered `<a>`. Same for `ActionGroupContext`.

### (iii) `<ActionGroup>` scrubs `ActionButtonContext` for its descendants

**Why:** Without this, every `<ActionButton>` inside an `<ActionGroup>` that sits inside a `<Panel.Header>` would individually claim `[grid-area:actions]`.

**Current (`packages/components/src/ActionGroup/ActionGroup.tsx`):**

```tsx
return (
  <Provider values={[[ActionGroupContext, ctx]]}>
    <Toolbar … />
  </Provider>
);
```

**Fix:** publish a second context entry that clears `ActionButtonContext` for children. The size/variant/disabled cascade is independently published via `ActionGroupContext` (which `<ActionButton>` and `<LinkButton>` both read separately), so `ActionButtonContext` can be set to `{}` (or just `{ className: undefined }`) without losing the cascade.

**Sketch:**

```tsx
const ctx = useMemo(
  () => ({ variant: variant ?? 'ghost', size, disabled }),
  [variant, size, disabled]
);
// Reset ActionButtonContext for descendants so positional className from a
// parent layout boundary (e.g. <Panel.Header>) does not double-apply.
const buttonCtx = useMemo(() => ({}), []);

return (
  <Provider
    values={[
      [ActionGroupContext, ctx],
      [ActionButtonContext, buttonCtx],
    ]}
  >
    <Toolbar
      {...rest}
      ref={ref}
      orientation={orientation}
      className={contextClassName}
    >
      {children}
    </Toolbar>
  </Provider>
);
```

**Tests to add (`ActionGroup.test.tsx`):** when `ActionButtonContext` has a className upstream, an `<ActionButton>` _directly_ inside `<Panel.Header>` (or any container that publishes the context) gets the className, but an `<ActionButton>` _inside an `<ActionGroup>`_ inside the same container does NOT. Size/variant/disabled cascade still works inside the group.

**Document inline in `ActionGroup.tsx`** with a short JSDoc/comment block calling out the convention (the "Architectural principle" from §2).

### Phase 0 changeset update

Append a paragraph to `.changeset/slot-configuration-primitives.md` (still `patch` for all three packages) noting the LinkButton context-className-merge and the ActionGroup context scrub. Both are part of Phase 0's "establish the pattern" promise.

## 4. Phase 1 (DST-1367) — Panel refactor

### 4.1 Public API changes

Remove from `Panel`'s compound subcomponents (no migration concern — no external consumers):

- `Panel.Title` — replaced by bare `<Title>`.
- `Panel.Description` — replaced by bare `<Description>`.
- `Panel.HeaderActions` — replaced by bare `<ActionButton>` / `<ActionGroup>` / `<ActionMenu>` / `<LinkButton>` directly inside `<Panel.Header>`.

Keep (no slot-aware equivalent because the rendering is structurally span-inside-button):

- `Panel.CollapsibleTitle`
- `Panel.CollapsibleDescription`

Keep unchanged (no slot-config relevance):

- `Panel`, `Panel.Header`, `Panel.Content`, `Panel.Collapsible`, `Panel.CollapsibleHeader`, `Panel.CollapsibleContent`, `Panel.Footer`.

### 4.2 `<Panel.Header>` implementation

Wrap the existing `<div data-panel-header>` grid in a single `<Provider>`. Publish four context entries:

```tsx
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroupContext } from '../ActionGroup/Context';

export const PanelHeader = ({ children }: PanelHeaderProps) => {
  const { classNames, titleId, headingLevel, titleSlotRef } = usePanelContext();

  const headingCtx = useMemo(
    () => ({
      slots: {
        title: {
          className: cn(
            '[grid-area:title]',
            'not-in-data-panel-header:px-(--panel-px)',
            classNames.title
          ),
          level: headingLevel,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, headingLevel, titleId, titleSlotRef]
  );

  const textCtx = useMemo(
    () => ({
      slots: {
        description: {
          className: cn('[grid-area:description]', classNames.description),
          elementType: 'p',
        },
      },
    }),
    [classNames.description]
  );

  const actionButtonCtx = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      size: 'icon',
    }),
    [classNames.actions]
  );

  const actionGroupCtx = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      size: 'icon',
    }),
    [classNames.actions]
  );

  return (
    <Provider
      values={[
        [HeadingContext, headingCtx],
        [TextContext, textCtx],
        [ActionButtonContext, actionButtonCtx],
        [ActionGroupContext, actionGroupCtx],
      ]}
    >
      <div
        data-panel-header
        className={cn(
          "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
          'px-(--panel-px)',
          classNames.header
        )}
      >
        {children}
      </div>
    </Provider>
  );
};
```

**Notes on this shape:**

- `slot="title"` and `slot="description"` are the defaults of `<Title>` and `<Description>` respectively. Consumers write bare primitives.
- `ActionButtonContext` / `ActionGroupContext` are NOT slot-keyed because Panel header only has one "actions" role. If a future Panel design grows a second action slot, we slot-key these.
- `ActionMenuContext` is **deliberately not published**. `<ActionMenu>`'s impl discards its own context className (it has no DOM root), and its trigger is internally an `<ActionButton>` which already reads `ActionButtonContext`. Publishing `ActionMenuContext` here would be inert.
- `size: 'icon'` cascades to every action; consumers can override per-action by setting `size` locally (precedence: `<ActionGroup>` wins for size when present, but a bare `<ActionButton>` lets local override).

### 4.3 `<Panel>` root — do NOT publish HeadingContext

We drop the current "title-only shortcut" where `<Panel.Title>` can be a direct child of `<Panel>` without a `<Panel.Header>` wrapper. After this refactor consumers always write `<Panel.Header><Title>X</Title></Panel.Header>`. The header element is a single `<div>` — zero cost. This keeps the Provider story trivial (one Provider, one place) and avoids the nested-Provider gotcha where `<Panel.Header>`'s value would need to fully replace `<Panel>`'s value.

If consumers need an accessible name without rendering a header, they continue to use the existing `aria-label` prop on `<Panel>` (already supported, see `Panel.tsx:42`).

### 4.4 `<Panel.CollapsibleHeader>` implementation

Structurally unchanged: the `<Heading>` wraps the trigger `<Button>`, and the title/description render as `<span>` inside the button (for a single click target with `aria-labelledby` + `aria-describedby` wiring). This means:

- `<Title>` and `<Description>` are **not used** inside the collapsible header — they render Heading/Text elements that cannot nest inside a button.
- `Panel.CollapsibleTitle` and `Panel.CollapsibleDescription` stay as Marigold-internal compound components that render `<span id={…}>` via `useCollapsibleHeaderContext`.
- The existing `CollapsibleHeaderContext` (titleId, descriptionId, descriptionSlotRef) stays exactly as it is.

No Provider needed for the collapsible header beyond what already exists. We do NOT add HeadingContext/TextContext here because there are no slot-aware primitives nested inside.

If a future iteration introduces a span-rendering role primitive (e.g. `<TextLabel>`), we revisit and slot-config the collapsible header too. Not now.

### 4.5 Theme adjustments (`themes/theme-rui/src/components/Panel.styles.ts`)

- Keep entries `root`, `header`, `title`, `description`, `actions`, `content`, `collapsible`, `collapsibleHeader`, `collapsibleTitle`, `collapsibleDescription`, `collapsibleContent`, `footer`.
- No structural changes — the existing entries already key off slot classes, not descendant selectors. Verify by inspection during implementation; the ticket says "remove descendant selectors" but the current file has none.

### 4.6 Stories (`packages/components/src/Panel/Panel.stories.tsx`)

- Update every existing story that uses `<Panel.Title>`, `<Panel.Description>`, `<Panel.HeaderActions>` to use the bare primitives.
- Drop redundant `variant='ghost' size='icon'` from every `<ActionMenu>` and `<Button>` inside the (former) `<Panel.HeaderActions>` location. The context cascade handles size; ghost is the ActionButton default.
- Replace bare `<Button>` (raw, not slot-aware) inside header-actions positions with `<ActionButton>` so the cascade actually applies. Bare `<Button>` is an intentional footgun — consumers must use action primitives inside `<Panel.Header>`.
- Add a story `SlotsActionGroup` (tagged `component-test`) that renders `<ActionGroup>` with multiple `<ActionButton>` + an `<ActionMenu>` inside `<Panel.Header>`. Asserts `role="toolbar"`, arrow-key navigation between buttons, and that each button lands inside the grid cell (visually equivalent to a single positional class).

### 4.7 Docs site (`docs/content/components/layout/panel/`)

- `panel-header-actions.demo.tsx`: replace `<Panel.HeaderActions>` wrapper + `<Button>`/`<ActionMenu variant='ghost' size='icon'>` shape with the bare-primitive shape. Drop `variant='ghost' size='icon'`.
- `panel-appearance.demo.tsx`: review for `<Panel.Title>`/`<Panel.Description>`/`<Panel.HeaderActions>` usage and migrate. Keep `<Button variant="ghost">` if it's outside the header (e.g. footer area).
- `panel-anatomy.tsx`: update labelled regions to reflect new structure.
- `panel-collapsible-anatomy.tsx`: unchanged (collapsible structure unchanged).
- All other demos: scan and migrate.

### 4.8 Tests

- `Panel.test.tsx`: existing tests likely break (they reference `Panel.Title` etc.). Rewrite to use bare primitives. Coverage stays equivalent.
- `PanelCollapsible.test.tsx`: unchanged behavior, light touch only if any test used the removed compound subcomponents.
- New story tests for `SlotsActionGroup` (toolbar a11y).

### 4.9 Changeset

`patch` for `@marigold/components`. `patch` for `@marigold/theme-rui` if the styles file changes structurally; otherwise omit. No `@marigold/system` bump.

Rationale for `patch` despite removing `Panel.Title`/`Panel.Description`/`Panel.HeaderActions` from the public API: Panel is on `beta-release` (unreleased channel). Beta releases ratchet the `-beta.N` suffix regardless of bump level; `patch` is the convention for in-beta evolutions.

## 5. Open questions still to resolve at implementation time

These have recommended answers but should be confirmed when the code lands.

1. **Drop the "title-only shortcut"?** Recommended: yes (see §4.3). Confirm by inspecting whether any internal docs/demos rely on `<Panel.Title>` as a direct child of `<Panel>`.
2. **Should `<Panel.HeaderActions>` deletion happen in one commit or via a deprecation cycle?** Recommended: one commit. No external consumers; beta channel.
3. **`size: 'icon'` cascade — should `<ActionGroup>` inside the header inherit it?** Yes, ActionGroupContext.size='icon' published → group's children read groupCtx.size → 'icon' wins. Verify in the SlotsActionGroup story.
4. **`<Panel.HeaderActions>` removal — do we keep `classNames.actions` in the theme?** Yes — it's now consumed via the action-context className. Still a theme surface.
5. **Per-story snapshot baseline:** the visual output of existing stories should be pixel-identical post-refactor (the existing stories already render the same DOM minus internal context wiring). Verify via Chromatic.

## 6. Files touched (estimate)

### Phase 0 add-ons (on `feat/DST-1366-slot-configuration-primitives`)

- `packages/components/src/LinkButton/LinkButton.tsx`
- `packages/components/src/LinkButton/LinkButton.test.tsx`
- `packages/components/src/ActionGroup/ActionGroup.tsx`
- `packages/components/src/ActionGroup/ActionGroup.test.tsx`
- `.changeset/slot-configuration-primitives.md`

### Phase 1 (on `feat/DST-1367-panel-slot-configuration`)

- `packages/components/src/Panel/Panel.tsx` (remove Title/Description/HeaderActions attachments; remove imports)
- `packages/components/src/Panel/PanelHeader.tsx` (Provider wiring)
- `packages/components/src/Panel/PanelTitle.tsx` (DELETE)
- `packages/components/src/Panel/PanelDescription.tsx` (DELETE)
- `packages/components/src/Panel/PanelHeaderActions.tsx` (DELETE)
- `packages/components/src/Panel/Context.tsx` (simplify — drop titleId/titleSlotRef plumbing if no longer needed by surviving subcomponents; verify CollapsibleHeader still needs them)
- `packages/components/src/Panel/Panel.stories.tsx`
- `packages/components/src/Panel/Panel.test.tsx`
- `themes/theme-rui/src/components/Panel.styles.ts` (verify; likely no change)
- `docs/content/components/layout/panel/*.demo.tsx` (sweep)
- `docs/content/components/layout/panel/index.mdx` (sweep; update consumer code snippets)
- `.changeset/<new>.md`

## 7. Out of scope (Phase 2+ tickets, not this one)

- Dialog / Drawer / Tray refactor → DST-1369.
- ContextualHelp / SectionMessage / EmptyState refactor → DST-1370.
- ListBox item label/description → DST-1364.
- Bespoke `<ActionButton>` visual design → DST-1368.
- Any UI Kit (Figma) updates.
- Any change to `<Headline>` / `<Text>` / `<Button>` / `<Menu>`.

## 8. Implementation order

1. Check out `feat/DST-1366-slot-configuration-primitives`.
2. Push commit (ii) — LinkButton context className merge + tests.
3. Push commit (iii) — ActionGroup scrubs ActionButtonContext + tests + JSDoc.
4. Update Phase 0 changeset paragraph.
5. Wait for #5386 review to acknowledge the add-ons (or merge if pre-approved).
6. Branch `feat/DST-1367-panel-slot-configuration` off the updated tip.
7. Implement Panel refactor per §4.
8. Open PR targeting `beta-release` (will auto-retarget when #5386 lands).
9. Verify Chromatic visual parity for existing stories.

## 9. Pickup notes

If you're returning to this work after a gap:

- Read §2 first — it's the new convention this refactor establishes.
- Read §3 — the Phase 0 add-ons are prerequisites; if PR #5386 has moved on or merged without them, you may need to land them separately on `beta-release`.
- Read §4.3 — the "do NOT publish HeadingContext on `<Panel>`" decision is load-bearing for the Provider story.
- Read §4.4 — the CollapsibleHeader deliberately stays compound; don't try to push slot-aware primitives into it.
