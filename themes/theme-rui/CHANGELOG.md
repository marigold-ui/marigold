# @marigold/theme-rui

## 6.0.0-beta.0

### Major Changes

- adb8a18: feat(DST-1237): theme-owned breakpoints with CSS fallback

  Breakpoint resolution is now theme-driven: `useSmallScreen` and `useResponsiveValue` read `theme.screens` from the ThemeProvider context instead of relying on hardcoded values in `defaultTheme`. If no theme provides screens, the hooks fall back to reading Tailwind v4's `--breakpoint-*` CSS custom properties.
  - Added `screens` to `@marigold/theme-rui` (matches Tailwind v4 defaults)
  - Removed `screens` from `defaultTheme` in `@marigold/system`
  - Added `resolveScreens` utility for theme-first, CSS-fallback resolution

- f629319: refactor([DST-1283]): **Breaking Change** — Remove `<Multiselect>` (and the `react-select` dependency) from `@marigold/components`.

  Use `<TagField>` instead.

- d35022b: DST-878: Polish design tokens and add token documentation.

  **New color palette:**
  - Replace default gray scale with warm neutral "charcoal" palette (oklch, hue 54, 11 steps from 50-950)

  **Token renames and restructuring:**
  - Rename `brand` to `primary`, `muted-foreground` to `secondary`, `focus` to `focus-highlight`
  - Rename status token structure from `*-muted`/`*-muted-foreground`/`*-muted-accent` to `*`/`*-foreground`/`*-accent`
  - Add `disabled-surface` token for disabled control backgrounds
  - Add `overlay-backdrop` token for modal/tray backdrops
  - Update page background colors

  **New hover utilities:**
  - Add `ui-state-hover` utility (solid hover for list items, table rows, menu items)
  - Add `ui-state-hover-ghost` utility (translucent hover for ghost buttons, tabs, action bar)
  - Migrate all components from raw `hover:bg-hover`/`hover:bg-current/10` to the new utilities

  **Documentation:**
  - Add new Token Overview page with complete token reference
  - Add annotated UI diagram, color palette demo, Do/Don't guidance, hover and selection pattern docs
  - Remove outdated `design-tokens.mdx` and `design-token-guidelines.mdx` pages

- 968bc0b: DST-1209: Refactor elevation documentation and remove deprecated utilities.

  **Breaking: Remove `util-surface-*` utilities**
  - Delete `util-surface-sunken`, `util-surface-body`, `util-surface-raised`, `util-surface-overlay`
  - Remove `utils.css` from theme-rui build

  **Migration from legacy utilities:**
  | Old utility | New replacement |
  |---|---|
  | `util-surface-sunken` | Removed, use `bg-background` for the page base layer |
  | `util-surface-body` | `bg-background` (no shadow needed) |
  | `util-surface-raised` | `ui-surface shadow-elevation-raised` |
  | `util-surface-overlay` | `ui-surface shadow-elevation-overlay` |

  **Documentation:**
  - Rewrite elevation page around the 3-tier shadow system (border, raised, overlay)
  - Add surfaces section explaining `bg-background`, `bg-surface`, `bg-muted`, and `ui-surface`
  - Add interactive demos, annotated SVG diagram, and per-tier Do/Don't guidelines
  - Add migration table from legacy `util-surface-*` to new tokens

  **Fixes:**
  - Fix broken `bg-bg-surface-*` tokens in card-elevation demo, inset-equal demo, and Columns story
  - Update Card docs elevation section to match new page structure

- 00d93c8: feat(DST-1246): update Switch component layout and sizing to align with Checkbox and Radio

  The Switch component previously rendered its label on the left and toggle on the right, which was inconsistent with Checkbox and Radio where the control sits on the left. When used together in forms, this created a visually misaligned layout.

  **Layout**: Toggle now renders before the label (control on the left, label on the right), matching Checkbox and Radio. This ensures consistent visual alignment when Switch is used alongside other boolean controls in form layouts.

  **Sizing**: Reduced the default track size from 24x40px to 16x28px and thumb from 20px to 12px. This brings the Switch closer in visual weight to Checkbox/Radio (16px), making it fit better in the flow of forms.

  **Settings variant**: A new `variant="settings"` mirrors the default layout — label and description on the left, toggle on the far right. This is the common pattern used on settings/preferences pages. The variant is propagated to `BooleanField` so that grid columns and description placement adjust accordingly.

  **Description support**: Switch now accepts a `description` prop (help text rendered below the control), matching Checkbox's existing support. The description text aligns with the label text using CSS grid + subgrid, automatically adapting to any control size without hardcoded padding. Properly wired with `aria-describedby` for accessibility.

  **Form support**: The `name` prop passes through to the underlying input for HTML form submission.

  **Shared BooleanField**: Extracted a reusable `BooleanField` wrapper used by both Checkbox and Switch for consistent description rendering and `aria-describedby` wiring. Uses CSS grid with subgrid to align description text with label text across both components.

  ## Breaking changes

  ### Restoring the old Switch behavior

  The default Switch layout has changed: the toggle is now on the **left** and the label on the **right** (previously reversed). If you need the old layout (label left, toggle right), use the new `variant="settings"`:

  ```diff
  - <Switch label="Wi-Fi" />
  + <Switch label="Wi-Fi" variant="settings" />
  ```

  The `size="large"` prop has been removed. The default size is now smaller (16x28px track). There is no built-in way to get the old large dimensions (24x40px track) — if needed, create a custom size variant in your theme's `Switch.styles.ts`.

  ### Custom theme migration

  This release introduces a new required theme component `BooleanField` and changes the layout model of the `Checkbox` and `Switch` container slots from flexbox to CSS grid. **Custom themes must be updated or Checkbox/Switch will throw a runtime error.**

  ### 1. Add `BooleanField` to your theme (required)

  `BooleanField` is a new multi-slot theme component used internally by both `Checkbox` and `Switch` to render descriptions. If your theme does not include it, any `Checkbox` or `Switch` with a `description` prop will throw:

  ```
  Error: Component "BooleanField" is missing styles in the current theme.
  ```

  Add the following to your theme's component styles:

  ```ts
  import { cva } from '@marigold/system';

  export const BooleanField = {
    container: cva({
      base: 'grid gap-x-2',
      variants: {
        variant: {
          default: 'grid-cols-[auto_1fr]',
          settings: 'grid-cols-[1fr_auto]',
        },
      },
      defaultVariants: { variant: 'default' },
    }),
    description: cva({
      base: 'mt-0.5',
      variants: {
        variant: {
          default: 'col-start-2',
          settings: 'col-start-1',
        },
      },
      defaultVariants: { variant: 'default' },
    }),
  };
  ```

  - `container`: Defines the 2-column grid layout wrapping the control and its description. The `default` variant uses `grid-cols-[auto_1fr]` (control left, label right). The `settings` variant uses `grid-cols-[1fr_auto]` (label left, control right).
  - `description`: Styles the description text wrapper. Placed under the label column via `col-start-2` (default) or `col-start-1` (settings). `mt-0.5` adds vertical spacing between the label row and description.

  Then export it from your theme's component index file:

  ```ts
  export { BooleanField } from './BooleanField.styles';
  ```

  ### 2. Update `Checkbox` container slot (required if customized)

  The `Checkbox` container slot changed from flexbox to CSS grid with conditional subgrid support:

  **Before:**

  ```ts
  container: cva({ base: 'cursor-pointer read-only:cursor-default gap-2' }),
  ```

  **After:**

  ```ts
  container: cva({
    base: [
      'grid grid-cols-[auto_1fr] gap-x-2 items-center',
      'cursor-pointer read-only:cursor-default',
      'group-data-[booleanfield]/booleanfield:grid-cols-subgrid group-data-[booleanfield]/booleanfield:col-span-full',
    ],
  }),
  ```

  Key changes:
  - `gap-2` changed to `gap-x-2` (column gap only, since row gap is now handled by `BooleanField.description`)
  - `grid grid-cols-[auto_1fr] items-center` replaces the `flex items-center` that was previously hardcoded in the component
  - `group-data-[booleanfield]/booleanfield:grid-cols-subgrid` and `group-data-[booleanfield]/booleanfield:col-span-full` enable subgrid when inside a `BooleanField` wrapper, so the description aligns with the label

  ### 3. Update `Switch` container slot (required if customized)

  The `Switch` container slot also changed from minimal styles to CSS grid with subgrid:

  **Before:**

  ```ts
  container: cva({
    base: 'disabled:cursor-not-allowed disabled:text-disabled-foreground',
  }),
  ```

  **After:**

  ```ts
  container: cva({
    base: [
      'grid gap-x-2 items-center',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      'group-data-booleanfield/booleanfield:grid-cols-subgrid group-data-booleanfield/booleanfield:col-span-full',
    ],
    variants: {
      variant: {
        default: 'grid-cols-[auto_1fr]',
        settings: 'grid-cols-[1fr_auto]',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  ```

  Key changes:
  - Added `grid gap-x-2 items-center` (replaces `flex items-center gap-2` that was previously hardcoded in the component)
  - Grid columns moved to `variant` to support both default and settings layouts
  - Added subgrid support for BooleanField integration

- 724f0ce: refa([DST-1162]): **Breaking changes**: The `Card` component has been refactored into a compound component pattern.

  **What changed:**
  - The previous prop-based API (`padding`, `space`, etc.) has been removed.
  - Content must now be composed using explicit sub-components: `Card.Header`, `Card.Body`, `Card.Footer`, and `Card.Preview`.
  - A `CardContext` is now required — sub-components will throw an error if used outside of a `<Card>`.

  **Migration:**

  ```tsx
  // Before
  <Card>
    <SomeContent />
  </Card>

  // After
  <Card>
    <Card.Header>Title</Card.Header>
    <Card.Body><SomeContent /></Card.Body>
    <Card.Footer>Actions</Card.Footer>
  </Card>
  ```

### Minor Changes

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

- 93f9ef1: feat(DST-1257): add universal `none` spacing token
  - Introduce `NoSpacingToken = 'none'` shared across all spacing token families
  - Add `'none'` to `SpacingTokens`, `PaddingSpacingTokens`, and `InsetSpacingTokens`
  - Add `--spacing-none: --spacing(0)` CSS custom property to the theme

  `'none'` now works wherever a spacing token is accepted: `Stack`/`Inline` gap (`space="none"`), `Inset` axis padding (`spaceX="none"` / `spaceY="none"`), and `Inset` recipes (`space="none"`) — useful for wrappers that should render without adding any spacing (e.g. an edge-to-edge `Table` inside a containing component).

- 8326bf7: feat(DST-1326): introduce `Panel.CollapsibleHeader`, `Panel.CollapsibleTitle`, and `Panel.CollapsibleDescription`. The collapsible mirrors `Panel.Header` — a header wrapper with a title plus an optional description — and the whole visual surface is a single click target: title and description render as spans inside the trigger `<button>`, with the accessible name wired via `aria-labelledby` and the description via `aria-describedby`. The chevron icon uses a reusable `MorphCaret` that animates via SVG path morphing (honours `prefers-reduced-motion`).
- 326f707: feat(theme-rui): preflight fixes, file layout refactor, token and export corrections

  A cohesive set of changes that (1) adds peer-dependency fixes needed
  for page-level scroll, (2) splits the theme's CSS into files with
  unambiguous roles, and (3) fixes a prefixer bug that stranded design
  tokens inside the scoped bundle.

  **New: `preflight.css`**

  Two peer-dependency fixes on the real `<html>` / `<body>`:
  - `html { scrollbar-gutter: stable }` — prevents a 1 px reflow when
    `@react-aria/overlays` locks the page (it sets `overflow: hidden`
    on `<html>` and compensates scrollbar width).
  - `body { position: relative; overflow-x: clip }` — contains the
    `@react-aria/live-announcer` portal (mounted at `top: -10000px;
left: -10000px`) so it cannot expand the document's scrollable
    area. `clip` (not `hidden`) keeps `position: sticky` on
    descendants working.

  These rules ship inside both entry points; the prefixer excludes
  `html`/`body` so the rules reach the document root while the rest
  of the bundle stays scoped to `[data-theme="rui"]`.

  **Scrollbar track**

  `ui-scrollbar`'s track is now transparent so the themed scrollbar
  blends into any surface.

  **File layout refactor**
  - `tokens.css` (new) — `@plugin` declaration and every design token
    in one place. Easy to find, easy to extend.
  - `theme.css` (Tailwind-native entry) — imports `preflight.css` +
    `tokens.css` + `ui.css` + `variants.css` and paints `<body>`
    directly. A Marigold-first app needs zero extra markup to get the
    theme's page background, text color, and font.
  - `styles.css` (pre-compiled entry) — imports the same base and
    paints `[data-theme="rui"]`. The consumer places the attribute on
    `<html>`, `<body>`, or a wrapper `<div>` to control where Marigold
    paints — whole-app or island.
  - `global.css` (removed, never released) — the body paint now lives
    inline in the two entry points that actually need it, so a shared
    file with ambiguous semantics is no longer necessary.

  **Two clean mental models**
  - Use `theme.css` with your own Tailwind build when Marigold is the
    whole app. Body paints automatically, tokens live at `:root`,
    utilities tree-shake against your content.
  - Use `styles.css` as a pre-compiled drop-in when Marigold is an
    island or you are not running Tailwind. Place `data-theme="rui"`
    wherever Marigold should paint.

  **Tokens at `:root`**

  `postcss-prefix-selector` previously rewrote `@theme`'s output from
  `:root, :host` to `[data-theme="rui"], [data-theme="rui"] :host`,
  which meant any unscoped rule could not resolve
  `var(--color-background)` because the variables were only declared
  inside the `[data-theme="rui"]` scope. The prefixer now excludes
  `:root`, `:host`, and `[data-theme="rui"]` in addition to
  `html`/`body`, so design tokens are emitted globally while utility
  classes remain scoped. The `[data-theme="rui"]` exclude uses a
  quote-agnostic regex so prettier round-trips don't reintroduce
  double-prefixing.

  **CSS exports carry a `style` condition**

  Tailwind v4's CSS resolver uses `conditionNames: ["style"]`.
  Bare-string export entries without a matching condition fail under
  strict resolvers, so every `.css` subpath now declares both `style`
  and `default` targets. The unused `./*` JS catchall is removed. New
  subpath exports: `./tokens.css`, `./preflight.css`.

  Existing documented imports (`theme.css`, `styles.css`) continue to
  work.

### Patch Changes

- 5cd5290: fix(DST-1359): align `ActionBar` action button spacing with the regular `Button`. The `actionButton` style in `theme-rui` was missing `gap-2 items-center justify-center`, which caused icons and labels inside ActionBar buttons to render without the proper spacing/alignment used by the ghost/default `Button`. Adding these utilities restores visual parity across the design system.
- 84d3213: Paint `Checkbox` and `Radio` controls with `bg-surface` so the inner area follows the theme surface token. Keeps the controls visually distinct over containers that paint a non-default background — e.g. a hovered or selected `SelectList` row. `Radio` already used `bg-surface` (added in DST-878 token polish); this brings `Checkbox` in parity.
- b7c132d: fix(DST-1354): restore collapsing `Table.EditableCell` edit trigger

  The overlay/ring affordance introduced in #5250 (DST-1275) did not read as editable in user testing: sighted users did not associate the hover ring with inline editing, and there was no discoverable trigger for keyboard or touch. This change reverts that approach and restores the explicit pencil edit button.

  The trigger collapses to zero layout space at rest (`w-0 overflow-hidden`) and expands on row hover or keyboard focus, so static layout remains clean while the affordance is discoverable the moment the user interacts with the row. When expanded, the wrapper switches to `overflow-visible` so the button's focus outline is not clipped. The cell itself stays clickable as a touch target. Enabled editable cells always truncate their content to stay aligned with column headers and match the single-line editing controls; disabled cells behave like a regular `Table.Cell`.

- f16b887: fix(DST-1352): use correct outline for focus + error state in compound fields
- 20a42b0: Rename universal spacing token from `none` to `collapsed` to avoid a Tailwind v4 collision. `--spacing-none` inside `@theme static` caused `leading-none` to resolve to `0` instead of `line-height: 1`. The new name `collapsed` is a semantic design term (cf. CSS margin collapse) that reads naturally in both gap (`space="collapsed"`) and padding (`inset="collapsed"`) contexts.
- 8902b10: fix: register `--ui-background-color`, `--ui-border-color`, and `--ui-highlight-color` as non-inheriting custom properties

  Previously, setting one of these variables on a themed surface (e.g. a destructive Panel overriding `--ui-border-color`) would cascade the value into every nested element that also reads `ui-surface`, tinting Inputs, Buttons, Cards, etc. with the parent's color.

  These three custom properties are now registered via `@property { inherits: false }`, so each surface resolves its own fallback via the existing `var(..., var(--color-…))` pattern and nested surfaces keep their defaults.

- Updated dependencies [adb8a18]
- Updated dependencies [326f707]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [f629319]
- Updated dependencies [93f9ef1]
- Updated dependencies [8326bf7]
- Updated dependencies [bfea9df]
- Updated dependencies [8326bf7]
- Updated dependencies [1cac70d]
- Updated dependencies [cddcfd3]
- Updated dependencies [e33a1e7]
- Updated dependencies [20a42b0]
- Updated dependencies [00d93c8]
- Updated dependencies [c2a1c72]
- Updated dependencies [724f0ce]
- Updated dependencies [62cca29]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/system@18.0.0-beta.0
  - @marigold/components@18.0.0-beta.0

## 5.2.4

### Patch Changes

- 5dfb6da: Remove muted text color from Dialog content slot for better readability
- bbf0832: refactor([DSTSUP-245]): Clean up Calendar styles

  Move hardcoded Tailwind classes from Calendar component files into theme slots, reduce cell padding from `p-2` to `p-1`, and add new `calendarHeading` theme slot.

- 85b2eb0: fix(DST-1275): improve EditableCell hover/focus affordance with data-editable attribute
- d341a9d: Fix CJS export paths pointing to non-existent `.js` files. Since tsdown 0.16.0, output uses `.cjs` extensions but `main`, `types`, and `exports` fields were never updated to match.
- d6507d5: Switch focus ring implementation from `box-shadow` (`ring-*`) to CSS `outline` to prevent clipping in scrollable containers and improve Windows High Contrast Mode accessibility. Replace `transition-all` and `transition-colors` with explicit `transition-[color,background-color]` to prevent outline-color from animating on focus. Redistribute padding from compound component containers to individual sub-components (Dialog, ContextualHelp, Accordion) so focus outlines have breathing room inside overflow boundaries.
- 27d13b7: fix([DSTSUP-245]): Calendar Days alinged centered through class
- 49fc2e2: fix(DST-1278): unify Table row hover styles for href and selectionMode rows
- Updated dependencies [f4f7a05]
- Updated dependencies [bbf0832]
- Updated dependencies [3f77810]
- Updated dependencies [85b2eb0]
- Updated dependencies [d341a9d]
- Updated dependencies [f560d95]
- Updated dependencies [a4b467f]
- Updated dependencies [50566a2]
- Updated dependencies [203baca]
- Updated dependencies [969c8cc]
  - @marigold/components@17.4.0
  - @marigold/system@17.4.0

## 5.2.3

### Patch Changes

- Updated dependencies [d3374cd]
  - @marigold/components@17.3.1
  - @marigold/system@17.3.1

## 5.2.2

### Patch Changes

- 6a29a6c: style([DST-1256]): Replace hardcoded values with semantic tokens
- f3068d7: fix([DST-1255]): Use correct semantic tokens in Tag and Slider style files
- Updated dependencies [a48059c]
- Updated dependencies [6a29a6c]
- Updated dependencies [548dcb4]
  - @marigold/components@17.3.0
  - @marigold/system@17.3.0

## 5.2.1

### Patch Changes

- fd6f323: bugfix[DST-1250]: fix broken style in `<Menu>`
  - @marigold/system@17.2.1
  - @marigold/components@17.2.1

## 5.2.0

### Minor Changes

- ed928a0: Update ActionBar with enter/exit animations, keyboard support, and built-in Table integration.
  - Add `useActionBar` hook and `ActionBarContext` for managing selection state between ActionBar and Table
  - Add `actionBar` render prop to Table for automatic selection wiring and ActionBar positioning
  - Add enter/exit animations using `motion/react` and react-aria `useEnterAnimation`/`useExitAnimation`
  - Add Escape key support to clear selection via `FocusScope` and `useKeyboard`
  - Add screen reader announcement when ActionBar appears
  - Add localized `selectedCount`/`selectedAll` messages (en-US, de-DE)
  - Update ActionBar theme slots: rename `actions` to `toolbar`, add `selection` slot
  - Update theme type definition to match new slot names

- e6091b6: Export `appearances` map from `@marigold/theme-rui/appearances`

  The theme package now exports a typed `appearances` object (and `Appearances` type) via `@marigold/theme-rui/appearances`. This map is auto-generated during the build from component style files and contains the available `variant`/`size` keys for each themed component.

  This removes the duplicated `build-appearances.mjs` scripts that previously existed in `docs`, replacing them with a single source of truth in the theme package.

- b115fda: Migrate from `class-variance-authority` to `cva` and simplify `extendTheme` via function composition.
  - Replace `class-variance-authority` dependency with `cva` (v1 beta), which has built-in Tailwind merge support via `defineConfig`
  - Refactor the custom `cva` wrapper to use `cva`'s `defineConfig` with a `twMerge` hook, storing variant configs in a WeakMap (for docs introspection) instead of a `.variants` property
  - Simplify `extendTheme` to compose style functions directly (`cn(existingFn(props), newFn(props))`) instead of extracting and merging variant configs — this preserves `defaultVariants` and `compoundVariants` that were previously lost during merging
  - Update all theme style files in `theme-rui` to the new `cva` API (object config with `base`/`variants`/`compoundVariants` keys)

- 61bfc60: Refactor relational spacing scale for better semantic clarity and visual rhythm.
  - Rename `--spacing-peer` token to `--spacing-regular`
  - Remove unused `--spacing-joined` and `--spacing-context` tokens
  - Adjust spacing scale values: tight (4px→6px), regular (16px→24px), group (32px→48px), section (64px→96px)
  - Move field-internal spacing from theme (`Field.styles` `space-y-2`) into component implementations using new `in-field` custom variant
  - Add `in-field:mb-1.5` to Label and `in-field:mt-1` to HelpText for consistent field layout
  - Update `SpacingTokens` type to reflect new scale

- 470d81c: feat(DST-979): Introduce a dedicated Sidebar component

  Add new `Sidebar` component for persistent app-level navigation. Features compound component API (`Sidebar.Header`, `Sidebar.Nav`, `Sidebar.Item`, `Sidebar.Footer`, `Sidebar.Toggle`, etc.), drill-down sub-navigation with animated transitions, collapse/expand with keyboard shortcut (Cmd+B / Ctrl+B) and localStorage persistence, mobile-responsive sheet overlay, full accessibility support, and i18n (EN/DE).

- c3bf8e4: feat([DST-1168]): Introduce TopNavigation Component
  - Three-slot grid layout (`Start`, `Middle`, `End`) using compound component pattern
  - Semantic HTML with `<header>` container and `<nav>` landmarks
  - Sticky by default, configurable alignment, and i18n ARIA labels
  - Theme styles for `theme-rui` and type definitions in `@marigold/system`

### Patch Changes

- 91eb222: Update ActionBar styling with surface contrast and dedicated button slot.
  - Apply `ui-surface-contrast` utility to ActionBar container for adaptive theming
  - Add `button` slot to ActionBar theme for properly styled action buttons (replaces `Button.ghost`)
  - Add `clearButton` hover/focus/disabled styles using theme-aware utilities
  - Update `ActionButton` to use `ActionBar.button` classNames instead of `Button.ghost`
  - Replace `CloseButton` with `IconButton` for the clear selection button
  - Update stories to use `lucide-react` icons directly

- cf56729: Add explicit `types` condition to package exports for reliable type resolution.
- 5d4c915: feat([DST-1240]): Add auto-collapse behavior to Breadcrumbs. The `maxVisibleItems` prop now defaults to `'auto'`, which uses a `ResizeObserver` to progressively show or hide breadcrumb items based on available container width.
- 28eba72: Improve color contrast ratios to meet WCAG AA standards.

  **Token changes (theme.css):**
  - Bump `muted-foreground` from stone-500 to stone-600 (4.71:1 → 7.55:1)
  - Bump `disabled-foreground` from stone-400 to stone-500 (2.37:1 → 4.71:1)
  - Bump `placeholder` from stone-500 to stone-600 (4.71:1 → 7.55:1)

  **Component fixes:**
  - Remove opacity modifiers (`/80`, `/70`) on muted-foreground in Calendar, ComboBox, Select, DatePicker, and Input
  - Replace `text-foreground/60` in Table editable cells with `text-muted-foreground`
  - Replace `marker:text-foreground/50` in List with `marker:text-muted-foreground`
  - Replace `opacity-60` in Accordion icon and Menu item SVGs with `text-muted-foreground`
  - Replace `disabled:opacity-50` in Tabs with `disabled:text-disabled-foreground`
  - Replace hardcoded `bg-stone-300`/`bg-stone-800` in Table drop indicator with `bg-border`/`bg-brand` tokens
  - Fix bug where `disabled:text-gray-50` made Input icons nearly invisible

- b61ba43: Refined elevation shadow tokens: `shadow-elevation-border` is slightly more subtle with symmetric spread; `shadow-elevation-raised` softens the crisp first layer and is a touch darker overall.
- 7ca2eb1: feat([DST-1227]): 💄 Implement Animated Transitions for Tabs Component, The active tab underline must slide smoothly between items
- f7870ce: Reinforce floating Drawer panel boundary with darker border and spread shadow
- a3e3e8e: Replace fixed `hover:bg-hover hover:text-foreground` with `hover:bg-current/10` on ghost-style buttons. The new value uses `currentColor` at 10% opacity so the hover background adapts to any container (light or dark) without forcing a fixed stone-100 background or overriding text color. Applied consistently to `Button` (ghost, destructive-ghost), `IconButton`, `Pagination`, `Tabs`, and `Table` editable-cell action buttons.
- beebd7c: Improve ListBox and Menu usability on mobile screens (DST-1210).
  - Align `useSmallScreen` hook with Tailwind's `sm` breakpoint by deriving the value from `defaultTheme.screens.sm` using CSS Media Queries Level 4 range syntax (`width < 640px`)
  - Add `max-sm:min-h-11` (44px) to ListBox and Menu items for WCAG 2.1 touch targets on mobile
  - Replace `min-[600px]:` with `sm:` in Table editable cell styles for breakpoint consistency
  - Refactor `useSmallScreen` to use `MediaQueryList.addEventListener('change')` instead of `window.resize`
  - Extract shared `mockMatchMedia` test helper into `test.utils`

- 9de007c: Align `Menu` button styles with `Button` by reusing `buttonBase` — consistent sizing, hover, disabled, and pending states across both components.
- ed2baef: fix(NumberField): prevent group from appearing disabled when stepper hits min/max boundary
- a715f08: Add shared CSS utilities `ui-interactive`, `ui-press`, `ui-panel-header`, and `ui-panel-actions` to reduce repeated style patterns across component theme files.
- 600d09f: fix(DSTSUP-233): Added card shadows to master- and adminmark
- 1ec6788: Set explicit `py-0` on table column headers to prevent external systems from overriding vertical padding
- f63e57f: refactor(DST-1233): remove tailwindcss-animate, standardize overlay animations
- Updated dependencies [91eb222]
- Updated dependencies [ed928a0]
- Updated dependencies [cf56729]
- Updated dependencies [5d4c915]
- Updated dependencies [b3c7085]
- Updated dependencies [3019d28]
- Updated dependencies [efbd292]
- Updated dependencies [7ca2eb1]
- Updated dependencies [95c22b6]
- Updated dependencies [4a24ad6]
- Updated dependencies [beebd7c]
- Updated dependencies [b115fda]
- Updated dependencies [61bfc60]
- Updated dependencies [470d81c]
- Updated dependencies [600d09f]
- Updated dependencies [c3bf8e4]
- Updated dependencies [f63e57f]
- Updated dependencies [d963df2]
  - @marigold/components@17.2.0
  - @marigold/system@17.2.0

## 5.1.0

### Minor Changes

- fd1b092: feat(DST-1219): Improve click area of `<TagField>`

  Improves the click area of the TagField component so that clicking
  anywhere on the field (not just the chevron button) opens the dropdown.

### Patch Changes

- a3042ed: fix(DST-1220): Update to use ui classes instead of util classes in components
- Updated dependencies [fd1b092]
- Updated dependencies [a3042ed]
  - @marigold/components@17.1.0
  - @marigold/system@17.1.0

## 5.0.1

### Patch Changes

- fb32888: Add `ui.css` with reusable UI component utilities (input, surface, state styles) to the theme build output.
  - @marigold/system@17.0.1
  - @marigold/components@17.0.1

## 5.0.0

### Major Changes

- 44d01a6: feat(DST-1141): Update `<Card>` to use semantic spacing and add `stretch` property
  - `<Card>` uses semantic spacing
  - Added `stretch` in favor of `size="full"`
  - Updated test suite
  - Fixed that the `<Card>` always take full width

- 63f1603: style([DST-1143]): Improve ContextualHelp sizes

  **Breaking Change**: Sizes have been removed, the default has a new style.

- 0c00d1d: ## 🎨 Changes

  ### 1. Refactored Surface Styling

  **What changed:**
  - Completely refactored the surface styling system to use `background-clip` and `background-origin` for gradient borders
  - Improved contrast and depth across all surface-based components (inputs, cards, dialogs, etc.)
  - **DateInput**: Added new `input` part for styling

  **Technical Details:**
  - New `ui-surface` utility class that works on single elements including `<input>`
  - Gradient borders transition from lighter (top) to darker (bottom) for improved depth perception
  - Removed deprecated utilities: `util-focus-*`, `util-disabled`
  - Introduced new state utilities: `ui-state-focus`, `ui-state-disabled`, `ui-state-error`, `ui-state-readonly`
  - New elevation system: `ui-elevation-raised`, `ui-elevation-overlay`

  ### 2. Semantic Spacing System (DST-1001)

  **New Relational Spacing Scale:**
  Introduced semantic tokens that describe the strength of relationships between elements:
  - `joined` (0.25rem) - Elements attached as a single unit
  - `tight` (1rem) - Packed containers for high-density scanning
  - `related` (2rem) - Minimal separation for related pairs (label + input)
  - `peer` (4rem) - Self-contained equals in the same flow
  - `group` (8rem) - Logical separation between content zones
  - `section` (16rem) - Distinct layout sections
  - `context` (32rem) - Complete contextual shift

  **New Inset (Padding) Scale:**
  - `tight`, `snug`, `regular`, `relaxed`, `loose` - with square, squish, and stretch variants
  - Example: `--spacing-squish-regular`, `--spacing-stretch-relaxed`

  **Benefits:**
  - Decouples intent from pixel values
  - Consistent rhythm across the interface
  - Improved scannability and hierarchy
  - Reduced reliance on explicit containers (cards/borders)

  ### 3. Component Improvements

  **FileField:**
  - Removed hardcoded unchangeable styles
  - Better grid-based layout for file items
  - Added `itemRemove` part for styling
  - Proper internationalization for remove button

  **DatePicker:**
  - Fixed dropdown sizing - now fits content instead of input width
  - Improved calendar popover positioning

  **Select & Input Components:**
  - Simplified container structure
  - Better icon and action placement
  - Improved accessibility with proper ARIA attributes

  **Dialog & Overlay Components:**
  - Consistent elevation styling
  - Better scrollbar styling
  - Improved focus management

  ## 📝 Documentation
  - **New Spacing Guide**: Comprehensive documentation explaining the semantic spacing system
  - Added visual examples for relational and inset spacing
  - Guidance on implicit vs. explicit grouping
  - Updated all example forms and patterns to use new spacing tokens

  ## 🔧 Technical Improvements
  - Replaced deprecated data attributes with proper CSS selectors
  - Better TypeScript typing for spacing tokens
  - Improved theme component definitions
  - Cleaner CSS with reduced specificity
  - Better support for different component states (disabled, readonly, error, focus)

  ## 📊 Statistics
  - **118 files changed**
  - **1,677 insertions**, **690 deletions**
  - Components affected: TextArea, Input, DateField, FileField, Select, Calendar, Card, Dialog, Menu, Toast, and many more

  ## ⚠️ Migration Notes

  ### Spacing Values

  ```tsx
  // Before
  <Stack space="fieldY">
  <Inline space="fieldX">

  // After
  <Stack space="peer">
  <Inline space="related">
  ```

  ### Surface Styling

  ```css
  /* Before */
  .util-surface-raised

  /* After */
  .ui-surface /* uses raised elevation by default */
  .ui-surface.ui-elevation-overlay /* for overlays */
  ```

### Minor Changes

- d8ce791: feat([DST-1092]): Add TagField component and deprecate Multiselect
  - Add `<TagField>` component: a multi-select field that displays selected items as removable tags with a searchable dropdown, built on react-aria's Select, Autocomplete, and TagGroup
  - Support for controlled/uncontrolled selection, disabled state, error state, disabled keys, sections, and custom empty state
  - Deprecate `<Multiselect>` component with updated docs pointing to `<TagField>`

- 0c00d1d: refa(DST-1001): Added a set of relational spacing tokens for future use. Provided documentation explaining the semantic spacing system.
- 196172e: **BREAKING CHANGE**: Comprehensive Table component rewrite with modern features

  This release introduces a complete rewrite of the `Table` component built on react-aria-components, providing enhanced accessibility, modern features, and improved developer experience.

  ## Breaking Changes

  The old `Table` component has been moved to `@marigold/components/legacy`. The main `Table` export now refers to the new implementation.

  ### Changed API Structure

  **Migration Required:**

  ```typescript
  // Before (old Table)
  import { Table } from '@marigold/components';

  // After - Option 1: Use legacy export (temporary)
  import { Table } from '@marigold/components/legacy';

  // After - Option 2: Migrate to new Table API (recommended)
  import { Table } from '@marigold/components';

  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ### Empty State Prop Location

  The `emptyState` prop has been moved from the `Table` component to `Table.Body`. This change provides better composition and follows react-aria-components patterns.

  **Migration Required:**

  ```typescript
  // Before (old Table)
  <Table emptyState={<EmptyMessage />}>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      {/* rows */}
    </Table.Body>
  </Table>

  // After (new Table)
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body emptyState={<EmptyMessage />}>
      {/* rows */}
    </Table.Body>
  </Table>
  ```

  ### Form Fields in Table Cells

  Inlining form fields directly in table cells is no longer supported. This approach broke accessibility patterns and keyboard navigation as it created conflicting focus management between the table's row selection and form inputs.

  **Migration Required:**

  ```typescript
  // Before (old Table) - NOT ACCESSIBLE
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <TextField />  {/* This breaks keyboard navigation */}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

  // After (new Table) - Use TableEditableCell
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.EditableCell
          field={<TextField name="name" defaultValue={value} />}
          onSubmit={handleSubmit}
        >
          {value}
        </Table.EditableCell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ### Cell Alignment Props

  The `align` prop on `Table.Column`, `Table.Cell`, and `Table.EditableCell` has been renamed to `alignX` for consistency with other Marigold layout components.

  Vertical alignment (`alignY`) is only available on the `Table` component itself, not on individual cells. It controls the vertical alignment of all cell content.

  **Migration Required:**

  ```typescript
  // Before
  <Table.Column align="right">Balance</Table.Column>
  <Table.Cell align="right">{value}</Table.Cell>

  // After
  <Table.Column alignX="right">Balance</Table.Column>
  <Table.Cell alignX="right">{value}</Table.Cell>

  // Vertical alignment (table-level only)
  <Table alignY="top">
    {/* ... */}
  </Table>
  ```

  ### Column Width Values

  Tailwind CSS width classes are no longer supported on `Table.Column`. Column widths now use pixel values or CSS grid units, which provides better content-fitting behavior and more predictable layouts.

  **Migration Required:**

  ```typescript
  // Before (old Table)
  <Table.Column width="w-32">Name</Table.Column>
  <Table.Column width="w-full">Description</Table.Column>

  // After (new Table)
  <Table.Column width="200px">Name</Table.Column>
  <Table.Column width="1fr">Description</Table.Column>  {/* Default: 1fr */}
  ```

  By default, columns use `1fr` as their width, which distributes available space evenly. You can now specify exact pixel widths for columns that need fixed sizing, or use CSS grid units like `2fr` for proportional layouts.

  ## New Features

  The new `Table` component includes:

  ### Core Features
  - **Enhanced Accessibility**: Built on react-aria with full ARIA pattern compliance, keyboard navigation, and screen reader support
  - **Sorting**: Click column headers to sort ascending/descending with visual indicators (`SortAscending`, `SortDescending` icons)
  - **Selection**: Single or multiple row selection with checkboxes and keyboard support
  - **Row Actions**: Support for action menus and interactive elements within rows

  ### Advanced Features
  - **Editable Cells**: Inline cell editing with `TableEditableCell` component supporting text inputs, selects, and custom editors
  - **Drag and Drop**: Reorder rows with visual drag preview and drop indicators
  - **Sticky Headers**: Keep table headers visible while scrolling through data
  - **Empty States**: Built-in support for displaying empty state messages
  - **Links**: Clickable cells and proper link handling within table rows

  ### Layout & Styling
  - **Text Overflow Control**: Choose between truncation and wrapping for cell content
  - **Text Selection**: Enable/disable text selection within table cells
  - **Cell Alignment**: Flexible horizontal (`alignX`) and vertical (`alignY`) text alignment options
  - **Responsive Design**: Better handling of different viewport sizes
  - **Column Width Control**: Support for fixed and flexible column widths

  ## New Components

  This release adds several new subcomponents:
  - `Table.Column` - Define table columns with sorting, alignment, and width options
  - `Table.EditableCell` - Editable table cells with inline editing support
  - `Table.SelectableCell` - Checkbox cells for row selection
  - `Table.renderDropIndicator` - Render function for custom drop indicators
  - `Table.renderDragPreview` - Render function for custom drag previews

  ## New Icons
  - `Pencil` - Indicates editable cells
  - `SortAscending` - Ascending sort indicator
  - `SortDescending` - Descending sort indicator

  ## Theme Updates
  - New theme styles for the modern `Table` component in `@marigold/theme-rui`
  - Legacy `Table` styles preserved as `LegacyTable.styles.ts`
  - Updated documentation theme (`@marigold/theme-docs`) with new Table styles

  ## Documentation

  Comprehensive documentation updates including:
  - Complete API reference with all new props and features
  - Interactive demos for all features (sorting, selection, editing, drag-drop, etc.)
  - Anatomy diagram showing component structure
  - Migration guide from legacy Table
  - Accessibility guidelines

  ## Backward Compatibility

  The legacy `Table` component remains available at `@marigold/components/legacy` for backward compatibility. However, it is now considered deprecated and will receive maintenance updates only. We strongly recommend migrating to the new `Table` component to benefit from:
  - Better accessibility and ARIA compliance
  - Modern features (sorting, selection, editing)
  - Improved performance
  - Active development and new features
  - Better React 19 compatibility

  ## Examples

  ### Basic Table

  ```tsx
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ### Sortable Table

  ```tsx
  <Table>
    <Table.Header>
      <Table.Column allowsSorting>Name</Table.Column>
      <Table.Column allowsSorting>Email</Table.Column>
    </Table.Header>
    <Table.Body>{/* rows */}</Table.Body>
  </Table>
  ```

  ### Selectable Table

  ```tsx
  <Table selectionMode="multiple">
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>{/* rows with selection */}</Table.Body>
  </Table>
  ```

  ### Editable Table

  ```tsx
  <Table>
    <Table.Header>
      <Table.Column>Name</Table.Column>
      <Table.Column>Email</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.EditableCell>
          {name => <TextField value={name} />}
        </Table.EditableCell>
        <Table.EditableCell>
          {email => <TextField value={email} />}
        </Table.EditableCell>
      </Table.Row>
    </Table.Body>
  </Table>
  ```

  ## Technical Details
  - Built on `react-aria-components` v1.5.0+
  - Fully typed with TypeScript
  - Comprehensive test coverage (unit + browser tests)
  - Follows WCAG 2.1 AA accessibility standards
  - Compatible with React 19
  - Supports both controlled and uncontrolled modes

### Patch Changes

- 34c785a: style([DST-1154]): Update Admin/Master Badge Styling
- f756051: fix(DST-1192): Do not show button as pressed when used to "expand" something
- 2e3f7d2: fix(DST-1188): Correctly apply elevation shadows
- 00a3c81: fix(DST-1205): Fix visuals of `<NumberField>` stepper when disabled using min/max
- 01e6bdb: [DST-1157]: introduce new `<ActionBar>` alpha component
- a0564dc: style(DST-1158): Set table background color to white.
- 282b330: fix([DST-1170]): Update Drawer styles to take full height on small screens when position top or bottom
- 7928a23: Refactor z-index implementation to move all z-index values from theme style files to component implementations. This ensures consistent stacking order across all themes and makes z-index behavior theme-independent.

  **Changes:**
  - Moved z-index classes from theme style files (`*.styles.ts`) to component implementations
  - Z-index values are now applied directly in component `className` props using Tailwind utilities
  - Updated 8 component files: ToastProvider, Popover, Tooltip, Underlay, DrawerModal, Drawer, ActionBar
  - Updated 7 theme style files to remove z-index classes
  - Added comprehensive z-index documentation to CLAUDE.md
  - ActionBar moved to floating layer (z-30) for better integration with content overlays

  **Benefits:**
  - Z-index stacking order is now consistent across all themes
  - Components control their own z-index, making it part of component behavior
  - Easier maintenance - developers only check component files to understand stacking
  - Future themes automatically inherit correct z-index stacking

- 5a90757: feat(DSTSUP-225): Introduce `<ToggleButton>` and `<ToggleButtonGroup>` as alpha components
- 4645c5d: style(DST-1197): Refine elevation shadows
- 8dd0455: feat([DSTSUP-222]): Introduce `<EmptyState>` Component as beta
- b7c64cc: fix(Checkbox): Correctly apply focus styling on checkboxes
- 8a70185: refa(DST-974): Refactoring width property on `FieldBase` and Form Elements like `Input`, `TextArea`, `DateInput` and `Select`. Labels and HelpText can now be wider as the actual input field.
- Updated dependencies [d8ce791]
- Updated dependencies [34c785a]
- Updated dependencies [96e145a]
- Updated dependencies [196172e]
- Updated dependencies [cfa9b99]
- Updated dependencies [00a3c81]
- Updated dependencies [cc61968]
- Updated dependencies [01e6bdb]
- Updated dependencies [2244030]
- Updated dependencies [6c071f0]
- Updated dependencies [44d01a6]
- Updated dependencies [63f1603]
- Updated dependencies [7928a23]
- Updated dependencies [5a90757]
- Updated dependencies [0c00d1d]
- Updated dependencies [4645c5d]
- Updated dependencies [59ed05f]
- Updated dependencies [8dd0455]
- Updated dependencies [1469268]
- Updated dependencies [196172e]
- Updated dependencies [31a4e38]
- Updated dependencies [f916a20]
- Updated dependencies [726239d]
- Updated dependencies [1bd9f27]
- Updated dependencies [b7c64cc]
- Updated dependencies [8a70185]
  - @marigold/components@17.0.0
  - @marigold/system@17.0.0

## 4.0.2

### Patch Changes

- 89acee4: feat: Add a generic spacing scale that can be used with `createSpacingVar`
- Updated dependencies [89acee4]
- Updated dependencies [4ac589b]
- Updated dependencies [d720c5e]
- Updated dependencies [0b8ca1e]
- Updated dependencies [c5bd98b]
  - @marigold/components@16.1.0
  - @marigold/system@16.1.0

## 4.0.1

### Patch Changes

- Updated dependencies [77a64e8]
- Updated dependencies [b90a67e]
  - @marigold/components@16.0.1
  - @marigold/system@16.0.1

## 4.0.0

### Major Changes

- b947276: style(DST-1089): Add expand/collapse animation to `<Accordion>`
- f10119a: refa(DST-1109): Remove required indicator from the label's text content

  **BREACKING CHANGE:** We removed the `indicator` styling from `<Label>`. The component is no longer a multi-part component. Rather than styling the required indicator through a dedicated part (previsouly `indicator`), you can now apply it anyway you want, for example by using `'group-required/field:after:content-["*"]'`.

### Minor Changes

- 98bf929: [DST-1075]: Introduce `<FileField>`component

### Patch Changes

- 832e3fa: fix(styles): Remove extra spacing when hidden/a11y elements are causing it
- 13b5c4b: fix(DST-1112): Show focus ring of `<CloseButton>` only when focused with keyboard
- 2ac63f7: fix([DSTSUP-196]): Fix Listbox layout when more than one element is used.
- 57a2bd3: style([DST-1126]): Fix Breadcrumb styling
- 0040853: fix(docs): Remove old broken Tailwind plugins
- 62692a6: style(DST-1086): Add a new destructive button variant
- 4eebff4: [DSTSUP-191]:
  Breaking chnge: `<XLoader />` renamed to `<Loader />`
  Added a new prop `loaderType` which is by default `cycle`. New option `cycle` shows a spinning cycle.
- Updated dependencies [832e3fa]
- Updated dependencies [845f26c]
- Updated dependencies [1e98c67]
- Updated dependencies [9027ce9]
- Updated dependencies [b947276]
- Updated dependencies [2ac63f7]
- Updated dependencies [29494b4]
- Updated dependencies [98bf929]
- Updated dependencies [57a2bd3]
- Updated dependencies [62692a6]
- Updated dependencies [f10119a]
- Updated dependencies [4eebff4]
  - @marigold/components@16.0.0
  - @marigold/system@16.0.0

## 3.0.3

### Patch Changes

- 2d7f163: fix(SectionMessage): Fix Section Message Styles
  - @marigold/system@15.4.3
  - @marigold/components@15.4.3

## 3.0.2

### Patch Changes

- 961eaf5: fix: Make `grid-templates-areas` class more robust
  - @marigold/system@15.4.2
  - @marigold/components@15.4.2

## 3.0.1

### Patch Changes

- Updated dependencies [d710177]
  - @marigold/components@15.4.1
  - @marigold/system@15.4.1

## 3.0.0

### Major Changes

- 77e0417: fix([DST-1078]): Fix scrolling within `<ContextualHelp>`

### Minor Changes

- e985fe2: feat([DST-1091]): Add multiselection mode to `<Select>`

### Patch Changes

- f621653: feat([DSTSUP-187]): Enhance Toast component with action support
  - Introduced `action` property
  - Update description to support JSX

- 35df36a: style([DST-1082]): Use correct accordion font-size
- Updated dependencies [f621653]
- Updated dependencies [025d6e9]
- Updated dependencies [ffbebd0]
- Updated dependencies [e985fe2]
- Updated dependencies [9ec4620]
- Updated dependencies [77e0417]
  - @marigold/components@15.4.0
  - @marigold/system@15.4.0

## 2.3.0

### Minor Changes

- 4395d2e: feat([DST-1047]): Improve `<List>` styles and add `small` variant
- 5e62b84: feat([DST-1051]): Introduce `ConfirmationDialog`
- beeba04: feat([DST-1042]): Add "destrutive" variant to `<Menu.Item>`

### Patch Changes

- fa1f489: fix(Link): Add 'text-sm' class to Link component styles
- 217d415: fix([DST-1054]): Add missing font color in accordion component
- f22bfdd: fix([DST-1053]): Add missing background-color for Accordion
- 061b5e9: feat([DST-1050]): Card master and adminmark variant
- 89e2b70: fix(Tag): Adjust tag styles (no extra padding if empty state is small, e.g. only text)
- 8fa6736: fix([DST-1057]): Add missing background color for master and admin badge
- ce13acf: fix([DST-1046]): Remove extra padding at the bottom of `<Select>`.
- Updated dependencies [95b55b8]
- Updated dependencies [c6fb6c2]
- Updated dependencies [bad3ef4]
- Updated dependencies [ba5f502]
- Updated dependencies [4395d2e]
- Updated dependencies [97adc14]
- Updated dependencies [061b5e9]
- Updated dependencies [91a5e7b]
- Updated dependencies [baf550b]
- Updated dependencies [4ccbec2]
- Updated dependencies [5e62b84]
- Updated dependencies [ce996ae]
- Updated dependencies [beeba04]
  - @marigold/components@15.3.0
  - @marigold/system@15.3.0

## 2.2.0

### Minor Changes

- 6147cf9: style(DST-1041): Switch Master and Admin Colors

### Patch Changes

- @marigold/system@15.2.0
- @marigold/components@15.2.0

## 2.1.0

### Minor Changes

- a3ddf47: feat([DST-1037]): Add `description` (help text) to `<Checkbox>` component

### Patch Changes

- e46a11d: fix(Drawer): Apply `z-index` to prevent overlap
- Updated dependencies [7b3caca]
- Updated dependencies [a3ddf47]
- Updated dependencies [0583b77]
  - @marigold/components@15.1.0
  - @marigold/system@15.1.0

## 2.0.2

### Patch Changes

- 16ae83d: style([DST-1034]): update styles for headline levels
  - @marigold/system@15.0.2
  - @marigold/components@15.0.2

## 2.0.1

### Patch Changes

- df57868: Fix([DSTSUP-181]): Adjust Accordion.Header styles to support full width
- 00d230a: chore: allow `react-aria` patch version range as dependencies
- b351484: feat([DST-981]): Drawer supports controlling the origin of the `<Drawer>` by using `placement` property (e.g. left, right, top, bottom), also supports configurable sizes to adapt to different sizes.
- Updated dependencies [df57868]
- Updated dependencies [00d230a]
- Updated dependencies [b351484]
  - @marigold/components@15.0.1
  - @marigold/system@15.0.1

## 2.0.0

### Major Changes

- cd21a2c: refa([DST-1007]): Rename "secondary" to "default" variant and fix appearance demo

  **Breaking Change:** If you used `<Menu variant="secondary">` remove the variant prop.

### Minor Changes

- 2a64b4f: feat([DST-1008]): Introduce a "remove all" function for `<Tag.Group>`
- 41da911: feat([DST-1005]): Add a "link" variant to `<Button>`

### Patch Changes

- 9881913: feat([DST-728]): Animate `<Button>` on press
- bbed52e: fix: correct broken classnames in `<Pagination>` and `<Slider>`
- Updated dependencies [6d8358c]
- Updated dependencies [44ceb28]
- Updated dependencies [2a64b4f]
- Updated dependencies [7e33a7f]
- Updated dependencies [82370d2]
- Updated dependencies [80a4427]
- Updated dependencies [801e968]
- Updated dependencies [9bac182]
- Updated dependencies [62ac4b8]
- Updated dependencies [0585db1]
- Updated dependencies [17318a8]
- Updated dependencies [6d2d2d4]
- Updated dependencies [5e06780]
- Updated dependencies [41da911]
- Updated dependencies [13d27bf]
- Updated dependencies [1ab48da]
  - @marigold/components@15.0.0
  - @marigold/system@15.0.0

## 1.4.1

### Patch Changes

- 81f1c9d: fix broken release
- Updated dependencies [424e2f4]
- Updated dependencies [81f1c9d]
  - @marigold/components@14.1.1
  - @marigold/system@14.1.1
  - @marigold/theme-plugins@1.0.2

## 1.4.0

### Minor Changes

- cc493fc: feat([DST-737]): Add Toast component

  Added ToastProvider Component with corresponding documentation and stories. It's a small Temporary Notification on the edge of the screen, that should be used for messages that don’t need immediate interaction.

- 2163518: feat([DST-899]):Breadcrumb Component

  We added a new Breadcrumbs component to improve navigation and accessibility in the UI.
  It supports collapsing long breadcrumb lists, custom separators (chevron or slash), and integrates with react-aria-components for full accessibility and keyboard navigation.
  The component is flexible, supports links and custom content, and includes comprehensive documentation and usage examples.

### Patch Changes

- ea0f758: fix(DST-968): Fix `<Tag>` styles and add multiselect tag filter to filter pattern example
- 906c84f: refa([DST-969]): Remove obsolete "text" variant from `<Button>`
- 37f40ba: feat([DST-977]): Style icons inside `<Menu.Item>`
- Updated dependencies [cc493fc]
- Updated dependencies [930e633]
- Updated dependencies [8f550ec]
- Updated dependencies [69e7b61]
- Updated dependencies [ea0f758]
- Updated dependencies [8e178b7]
- Updated dependencies [2163518]
- Updated dependencies [37f40ba]
  - @marigold/components@14.1.0
  - @marigold/system@14.1.0

## 1.3.0

### Minor Changes

- 29e6133: feat([DST-937]): Add master and admin mark variants

### Patch Changes

- a7ec9d3: fix[DSTSUP-169]: Fix width property on Calendar component
- 5e08185: docs([DST-925]): Introduce "admin- and master mark" pattern
  fix([DST-925]): Adjust styles of Tabs to work better with badges
- 9311338: docs([DST-936]): Update tooltip page
- Updated dependencies [a7ec9d3]
- Updated dependencies [5e08185]
- Updated dependencies [6d61be9]
- Updated dependencies [29e6133]
  - @marigold/components@14.0.0
  - @marigold/system@14.0.0

## 1.2.0

### Minor Changes

- 0d7f9db: docs([DST-815]):Updated token display to use RUI theme structure. Replaced deprecated Core and B2B token references with RUI semantic tokens that align with the current design system.

### Patch Changes

- 9a5791c: docs([DST-914]): Update Divider docs to match new structure of component pages

  **Breaking Change**: Removed `className` property on this component.

- e31a116: [DSTSUP-161]: The `<Multiselect>` matches now our default `<input>` styles in RUI.
- 854e00b: refa([DST-871]): Enhance Inline component to dynamically align buttons with input fields when descriptions are present.
- c33ad07: docs([DST-921]): Revise text component page to new component page structure.

  **Breaking Change**: Some propertys has been removed, including `className` and HtMLElement props.

- Updated dependencies [9a5791c]
- Updated dependencies [854e00b]
- Updated dependencies [430c266]
- Updated dependencies [c33ad07]
- Updated dependencies [98bea2e]
- Updated dependencies [16f6dbb]
- Updated dependencies [d224a2f]
  - @marigold/components@13.0.0
  - @marigold/system@13.0.0

## 1.1.5

### Patch Changes

- Updated dependencies [a6bcd89]
  - @marigold/components@12.0.5
  - @marigold/system@12.0.5

## 1.1.4

### Patch Changes

- 3e19b71: feat([DST-883]): New variant for RUI table. You can now use a new variant for RUI theme.
- ed72011: feat(DSTSUP-150): add `ghost` version to `<Menu>` + normalize svg sizes in buttons and menus
- 6c230c7: feat[DST-731]: Add ContextualHelp Component with Docs
  We added a new ContextualHelp component to provide inline help and guidance within the UI.
  It displays contextual information in a popover triggered by an icon button, with configurable placement, size, and icon variant (help or info).
  The component is accessible, supports both controlled and uncontrolled open states, and is designed for flexible content layout.
- befd17d: chore([DST-882]): Remove default right alignment in RUI table
- 17d28b5: feat([DST-885]): update default `<Link>` styles and add link variant
- 5127d58: feat([DST-884]): add vertical alignment property (alignY) to table
- Updated dependencies [3e19b71]
- Updated dependencies [ed72011]
- Updated dependencies [6c230c7]
- Updated dependencies [17d28b5]
- Updated dependencies [5127d58]
  - @marigold/components@12.0.4
  - @marigold/system@12.0.4

## 1.1.3

### Patch Changes

- 12b00ed: feat[DST-856]: Add TimeField Component

  We added a new TimeField component to support time-based user input.
  It allows users to select and edit time values, with configurable granularity (hours, minutes, seconds) and optional 12/24-hour format.
  The component supports accessibility features like keyboard navigation.

- be782c3: feat([DST-864]): Add `full` to `size` options to `Card` so that it spans the availble width
- Updated dependencies [7451134]
- Updated dependencies [12b00ed]
- Updated dependencies [73edbb0]
  - @marigold/components@12.0.3
  - @marigold/system@12.0.3

## 1.1.2

### Patch Changes

- ca26659: refa([DST-715]): Refactor `<Calendar>` component, Fix resizing when open calendar listboxes
- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/components@12.0.2
  - @marigold/system@12.0.2

## 1.1.1

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- af401e5: fix([DSTSUP-135]): Use correct padding on `<MultiSelect>` component
- 2a96627: ([DST-862]): Update RUI link styles and remove empty variants
- f2cbc72: refa([DST-858]): remove border and circle from badges
- 534ad77: refa([DST-738]): Adding checkmark icon as selection indicator in RUI theme for SelectList and Listbox components.
- Updated dependencies [0e8211b]
- Updated dependencies [af401e5]
- Updated dependencies [534ad77]
  - @marigold/components@12.0.1
  - @marigold/system@12.0.1

## 1.1.0

### Minor Changes

- 438b959: feat([DSTSUP-112]): Add sizes to RUI's `<Dialog>`
- 2ed500d: feat([DST-804]): Allow `Tag` to be used in forms and overhaul its docs

  BREACKING CHANGE: Remove the `allowsRemoving` prop. This didn't had an effect for a while and to make it more clear removing is enabled, if there is a function set on the `onRemove` prop.

### Patch Changes

- beaa990: styles([DSTSUP-128]): Fix `disabled` styles for `Radio` and `Checkbox`
- 15b844d: fix([DST-811]): Add color to tabs separator
- d71d9ab: styles([DST-823]): adjust RUI `<NumberField>` background styles
- Updated dependencies [d7cfabd]
- Updated dependencies [438b959]
- Updated dependencies [20ecd9c]
- Updated dependencies [fe4b9de]
- Updated dependencies [4e510fb]
- Updated dependencies [9d57c1f]
- Updated dependencies [2ed500d]
- Updated dependencies [4e0971e]
- Updated dependencies [c30993e]
  - @marigold/components@12.0.0
  - @marigold/system@12.0.0

## 1.0.1

### Patch Changes

- 70399e4: style([DST-724]): Adjust required icon for form elements in RUI style
- 25c37c6: refa([DST-800]): Simplify animation in `<Drawer>`
- 798e410: fix([DST-794]): Set correct outline on focus for input and textarea
- 87e7f4d: feat:([DSTSUP-110]): Add surface tokens to the theme and creates Tailwind utils to apply the (`utils-surface-{sunken,body,raised,overlay}`)
- 1e5ce6e: refa([DST-681]): Simplify label required classes
- 16b9e54: fix([DSTSUP-123]): Adjust z-index of table styles for sticky header
- 2a87f43: feat[DST-759]: Implement `<CloseButton>` component to be re-used into other components internally (e.g Dialog, Tag, Drawer and SectionMessage).
- Updated dependencies [8dab2e6]
- Updated dependencies [70399e4]
- Updated dependencies [c9b95bc]
- Updated dependencies [337f9ee]
- Updated dependencies [d24cee3]
- Updated dependencies [4686a0d]
- Updated dependencies [c42767f]
- Updated dependencies [2a87f43]
  - @marigold/components@11.5.0
  - @marigold/system@11.5.0

## 1.0.0

### Major Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

### Patch Changes

- 953cf3d: Making the dialog titles independant
- 334abb9: chore([DSTSUP-111]): Icon size in `<SectionMessage>`
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/components@11.4.1
  - @marigold/system@11.4.1

## 0.5.0

### Minor Changes

- 0e1e515: feat: adding multiselect rui styles

### Patch Changes

- @marigold/system@11.4.0
- @marigold/components@11.4.0

## 0.4.0

### Minor Changes

- 611c2e8: feat(733): Introduce a `<Drawer>` component
- 7554cf9: refa([DST-755]): Cleanup `NumberField` styles for RUI + left align text when stepper is hidden

### Patch Changes

- 599ef6b: fix([DST-752]): use `rgba` instead of `alpha` value in our theme.css
- a7a9e2c: fix: Use stone value without rgba to keep oklch color
- 8b404d2: fix([DST-750]): Do not set styles for content in `<Accordion>`
- Updated dependencies [888e852]
- Updated dependencies [08ba5c7]
- Updated dependencies [611c2e8]
- Updated dependencies [8b404d2]
- Updated dependencies [7554cf9]
  - @marigold/components@11.3.0
  - @marigold/system@11.3.0

## 0.3.2

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/components@11.2.3
  - @marigold/system@11.2.3

## 0.3.1

### Patch Changes

- f775048: Fix mixins

## 0.3.0

### Minor Changes

- 9412037: RUI theme release 0.3.0

### Patch Changes

- 933b49a: fix(rui): Correctly apply padding when `<Input>` has an icon/action
- ec860e7: fix(rui): Correctly apply error styles in fields
- 3b734cc: fix(rui): Correctly display readonly state
- Updated dependencies [9412037]
- Updated dependencies [91c72e8]
  - @marigold/components@11.2.2
  - @marigold/system@11.2.2

## 0.2.0

### Minor Changes

- 40db199: feat(rui): Add more styles to components

### Patch Changes

- Updated dependencies [40db199]
- Updated dependencies [619b4b2]
  - @marigold/components@11.2.1
  - @marigold/system@11.2.1

## 0.1.1

### Patch Changes

- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/components@11.2.0
  - @marigold/system@11.2.0

## 0.1.0

### Minor Changes

- 3d7aaad: feat(DST-693): Expose `theme.css` files from packages

### Patch Changes

- Updated dependencies [be665e7]
  - @marigold/components@11.1.1
  - @marigold/system@11.1.1

## 0.0.5

### Patch Changes

- Updated dependencies [fd96b48]
- Updated dependencies [300bfba]
  - @marigold/components@11.1.0
  - @marigold/system@11.1.0

## 0.0.4

### Patch Changes

- Updated dependencies [8e58923]
  - @marigold/components@11.0.2
  - @marigold/system@11.0.2

## 0.0.3

### Patch Changes

- @marigold/system@11.0.1
- @marigold/components@11.0.1

## 0.0.2

### Patch Changes

- Updated dependencies [964e025]
- Updated dependencies [82c869c]
- Updated dependencies [d96b809]
  - @marigold/components@11.0.0
  - @marigold/system@11.0.0

## 0.0.1
