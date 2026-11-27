# @marigold/cli

## 4.0.0-beta.0

### Major Changes

- ae4185b: feat(DST-1969): `marigold migrate` records applied migrations

  After an applied run, `marigold migrate` records the last migration in the `package.json` that declares `@marigold/components`, or `@marigold/system` for a standalone theme package:

  ```json
  "marigold": { "migrated": "v19" }
  ```

  Commit this field with the migrated code. In a standalone theme package, the installed `@marigold/system` stands in for `@marigold/components`, so detection and the recorded migration work there too. The field decides what a bare `marigold migrate` proposes: only migrations newer than the recorded one, and only once their major version is installed. Upgrade first, then migrate. On a version older than the next migration, the CLI now says to upgrade instead of proposing it.

  Running a recorded migration by name prints a warning, changes nothing and exits with code 1, so a second run can no longer rename props it already renamed. A partial run is recorded too, and lists what it skipped with the `--only` command that applies it later.

  Since the record belongs to a package, an applied run now has to target the folder of that `package.json`. A subfolder, such as a theme directory, or a monorepo root is refused with the command to run instead. In a monorepo, migrate each package that declares one of them. A run on a package leaves out nested packages that declare one of them, since each records its own run, and names them in the output. `--dry-run` still works on any path.

  This is breaking for scripts that call the CLI: an applied run on a subfolder or a monorepo root, and a named run of a recorded migration, now exit with code 1 instead of running.

### Minor Changes

- d94a9a3: refactor(DST-1393): remove `<SVG>` from `@marigold/system`

  `<SVG>` dates from before the move to `@marigold/icons`, where it was the base for icons. Icons now come from `@marigold/icons`, and for any other inline graphic a native `<svg>` with Tailwind classes does the same job without the extra component.

  **Before:** `<SVG>` and `SVGProps` are exported from `@marigold/system` and documented under Components > Content > SVG.

  **After:** both are gone. The SVG docs page redirects to the Iconography page, which explains how to replace it.

  ### Migration

  An app that still imports `<SVG>` fails to build after the upgrade. Use the matching icon from `@marigold/icons`, or a native `<svg>`. `<SVG>` always added `flex-none fill-current` and rendered at 24px unless you passed `size`, so carry those over:

  - `size={32}` becomes `className="size-8"`. Without `size`, add `size-6`.
  - `color="info-accent"` becomes `className="text-info-accent"`.
  - Add `flex-none`, so the graphic does not shrink in a flex row, and `fill-current` where you relied on the default fill.

  ```tsx
  // Before
  <SVG size={32} color="info-accent" viewBox="0 0 24 24">
    <path d="…" />
  </SVG>

  // After
  <svg className="text-info-accent size-8 flex-none fill-current" viewBox="0 0 24 24">
    <path d="…" />
  </svg>
  ```

  `marigold migrate v19` makes this change for you. It turns `size` into `width` and `height`, so a size class you already set still wins, and `color` into a `text-*` class. It reports what it cannot rewrite safely: spread props that may carry `size` or `color`, a `color` or `className` that is not a string literal, `SVGProps`, re-exports such as `export * from '@marigold/system'`, and `SVG` used as a value.

  `ProgressCircle` and the sort icons in `Table` no longer use `<SVG>` internally.

- 70de810: feat(DST-1775): `value` means the selected key on ComboBox and Autocomplete

  `<ComboBox>` and `<Autocomplete>` now use `value`, `defaultValue` and `onChange` for the selected option, the same as `<Select>` and react-aria. The input text moves to `inputValue`, `defaultInputValue` and `onInputChange`. Use the new `value` props in place of `selectedKey`, `defaultSelectedKey` and `onSelectionChange`, which react-aria has deprecated.

  ```diff
    <ComboBox
  -   value={filterText}
  -   onChange={setFilterText}
  -   selectedKey={animal}
  -   onSelectionChange={setAnimal}
  +   inputValue={filterText}
  +   onInputChange={setFilterText}
  +   value={animal}
  +   onChange={setAnimal}
      label="Animal"
    >
  ```

  A string `value` still compiles after the upgrade, because a key can be a string, but it is then looked up as an option `id` and the input stays empty. After upgrading, run `marigold migrate v19 <path> --dry-run`, read the report, then run `marigold migrate v19 <path>` to apply it before writing new code. It renames both prop sets on every ComboBox and Autocomplete and skips elements that already use the `inputValue` props. The CLI then records the migration in your `package.json`, so it never offers to rename the same props twice.

  The codemod only sees props written on the element. Spread props get a warning: a react-hook-form `{...field}` spread hides the change from the typechecker too, so pass the handler explicitly as `onInputChange={field.onChange}` for text or `onChange={field.onChange}` for a selection. Your own wrapper components that pass `value` through are not flagged at all, so check those by hand.

  On `<Autocomplete>`, a consumer `onChange` no longer disables `onSubmit`. Both now run when an option is picked.

- 3250bc7: refactor(DST-1869): remove the deprecated `fontWeight` and `textSize` exports from `@marigold/system`

  `@marigold/system` no longer exports the `fontWeight` and `textSize` class maps. They were deprecated in v18, when the style-prop maps moved into `@marigold/components`, and components no longer read them. The `FontWeightProp` and `FontSizeProp` types and the `weight` and `fontSize` props on `<Text>` are unchanged.

  ### Migration

  An app that still imports either map fails to build after the upgrade. Replace each use with one of these:

  - The `weight` or `fontSize` prop on `<Text>`, when the class styles text that `<Text>` can render.
  - The Tailwind class directly, for example `font-bold` for `fontWeight.bold` and `text-2xl` for `textSize['2xl']`.

  ```tsx
  // before
  import { cn, fontWeight, textSize } from '@marigold/system';

  <h1 className={cn(fontWeight.bold, textSize['2xl'])}>Title</h1>;

  // after, with the props on <Text>
  <Text weight="bold" fontSize="2xl">
    Title
  </Text>;

  // after, with the Tailwind classes
  <h1 className={cn('font-bold', 'text-2xl')}>Title</h1>;
  ```

  `marigold migrate v19` keeps your app building. It replaces the import with a copy of the map under the same name in each file that imports it, so the code keeps working unchanged. Replace the copy with the `<Text>` props or the Tailwind classes when you get to it. A re-export such as `export { fontWeight } from '@marigold/system'` or `export * from '@marigold/system'` and namespace access such as `system.fontWeight` get a warning and need a manual change.

### Patch Changes

- 3b1173a: feat(DST-1485): add a general-purpose `Popover` for arbitrary content

  `<Popover>` opens a floating panel next to a trigger and holds any content: a list whose rows have their own controls, a search over such a list, or a short optional form. Until now the only "button opens a panel" component was `Menu`, whose items can't contain interactive controls, so panels like a notifications list had no accessible way to be built.

  ```tsx
  <Popover.Trigger>
    <Button size="icon" aria-label="Notifications">
      <Bell />
    </Button>
    <Popover placement="bottom end" size="large">
      <Title>Notifications</Title>
      <Popover.Content>
        <ListView aria-label="Notifications">…</ListView>
      </Popover.Content>
    </Popover>
  </Popover.Trigger>
  ```

  - `<Popover.Trigger>` wraps the trigger and the panel, like `Dialog.Trigger`. Its `dismissable` and `keyboardDismissable` props control how the panel closes. Both default to `true`.
  - `<Popover>` renders a positioned panel on larger screens and a tray on small ones. `size` sets the panel's width: `small`, `medium` (the default), `large`, or `fit` to size it to its content. A `<Title>` and `<Description>` inside it form the header, and the title becomes the panel's accessible name.
  - `<Popover.Content>` holds the body. If the window is too small for it, only the content scrolls and the header stays in place. Without it, the popover lays out all its children as the body. A `ListView` placed directly inside reaches the popover's edges by itself, and sits flush at the bottom and under a search. For other content, `bleed` removes the horizontal padding, like in `Drawer.Content` and `Panel.Content`.
  - `<Popover>` is modal by default, following React Aria: focus stays inside and the rest of the page is hidden from assistive technology, while the page stays visible and a press outside or Escape closes the panel. `nonModal` keeps the page interactive, for panels without focusable controls. A non-modal popover now also closes on a press outside of it, not only when focus leaves it.
  - `<Popover.Search>` sits next to `<Popover.Content>` and filters the list in it as the user types, for lists whose rows people act on in place. It is a borderless row spanning the popover that stays in view above the results. Under a `<Title>` it sits between two dividers, and without one it becomes the popover's header.

  **BREAKING CHANGE:** the `Popover` theme entry is now a set of slots, and the `Popover` export is a different component.

  - **Theme:** `Popover` used to be a single style. It is now an object with the slots `container`, `body`, `title`, `description`, `search` and `content`. The existing surface styles live in `container`, which every popover uses: the dropdowns of `Select`, `ComboBox`, `Autocomplete` and `TagField`, `Menu`, `ActionMenu`, the date pickers and the new `Popover`. A theme that still defines `Popover` as a single style throws as soon as a page renders one of these. `@marigold/theme-rui` is already updated.
  - **Export:** `Popover` from `@marigold/components` used to be the internal overlay primitive behind those components. It now is the new component. The primitive is no longer exported. It was marked internal and undocumented, so no app code should import it.

  ### Migrating a custom theme

  Every theme maintained outside this repository that defines `Popover` needs this change. After upgrading, run `marigold migrate` from the project root. On 19.x it proposes the v19 migration, which does the change below. To do it by hand, move the existing styles into `container` and add the new slots:

  ```ts
  // Before
  export const Popover: ThemeComponent<'Popover'> = cva({
    base: ['bg-white shadow-lg', 'placement-bottom:mt-1'],
  });

  // After
  export const Popover: ThemeComponent<'Popover'> = {
    container: cva({
      base: ['bg-white shadow-lg', 'placement-bottom:mt-1'],
    }),
    body: cva({}),
    title: cva({}),
    description: cva({}),
    search: cva({}),
    content: cva({}),
  };
  ```

  Empty slots keep the existing dropdowns and menus working. The new `<Popover>` component needs real styles in `body`, `title`, `description`, `search` and `content` to get padding, widths and the header layout. Copy them from [theme-rui's `Popover.styles.ts`](https://github.com/marigold-ui/marigold/blob/main/themes/theme-rui/src/components/Popover.styles.ts) and adjust them to the theme. Run the typechecker afterwards. The slot record in `@marigold/system` is exhaustive, so it flags a missing slot.

- 0ae0ce2: feat(DST-1839): give `Stepper` a compact layout on small screens and animated step changes

  On phones the stepper no longer overflows its container. Below the small-screen breakpoint it switches on its own to a track with one segment per step, with a "Step 2 of 4" counter and the name of the current step below it, so any number of steps fits and the user always sees where they are. Finished steps stay tappable, and a step that failed turns red with a warning icon above its segment. `hideLabels` now only affects large screens, because small screens show the current step's label anyway.

  Moving to another step now fills the line toward it and glides the highlight to the new step, with the same timing as the `Tabs` indicator. The motion is turned off when the user prefers reduced motion. A failed step that is current now gets the current outline on large screens too, with its warning icon inside, instead of a red outline.

  Nothing changes in the component API, and apps using `@marigold/theme-rui` need no code changes. Upgrade `@marigold/components` and `@marigold/theme-rui` together.

  **BREAKING CHANGE:** the `Stepper` theme entry has six new required slots.

  - **Before:** `Stepper` had the slots `container`, `item`, `link`, `marker`, `label`, `connector` and `count`.
  - **After:** it also has `root`, `summary`, `currentLabel`, `segment`, `progressFill` and `currentIndicator`. The stepper's layout, the small-screen parts and the outline of the current marker now come from these slots. `@marigold/theme-rui` is already updated.

  ### Migrating a custom theme

  Every theme maintained outside this repository that defines `Stepper` needs the six new slots. After upgrading, run `marigold migrate` from the project root. It adds them with styles that keep the theme's current row on every screen size. The component hides the small-screen parts until a theme styles them, so most slots start empty. Only `summary` needs styles, to keep the `hideLabels` counter visible.

  ```ts
  root: cva({}),
  summary: cva({ base: 'items-center gap-x-2 in-data-hide-labels:flex' }),
  currentLabel: cva({}),
  segment: cva({}),
  progressFill: cva({}),
  currentIndicator: cva({}),
  ```

  To get the compact layout on small screens as well, copy these slots and the `max-sm:` rules on the existing ones from [theme-rui's `Stepper.styles.ts`](https://github.com/marigold-ui/marigold/blob/main/themes/theme-rui/src/components/Stepper.styles.ts), then move the current marker's fill into `currentIndicator`. Only move the fill together with the `max-sm:` rules. On small screens the component renders `currentIndicator` inside the segment, so a theme that keeps its row there would lose the current step's fill. Run the typechecker afterwards. The slot record in `@marigold/system` is exhaustive, so it flags a missing slot.

- bfbfe77: refactor(DST-1865): build the mobile tray on React Aria's `Sheet`

  The bottom sheet behind Select, ComboBox, Autocomplete, TagField, DatePicker, DateRangePicker, Menu, ActionMenu and the Calendar presets on small screens now runs on React Aria's `Sheet` through a new internal `Sheet` primitive, instead of its own `motion` drag handling. The components and their props are unchanged.

  What changes for users of those components on small screens:

  - A downward swipe anywhere on the tray closes it, not only on the drag handle. When the content can scroll, it scrolls first.
  - The backdrop fades with the swipe.
  - Focus returns to the trigger on close, also without reduced motion.
  - Escape and a press outside are ignored while the tray slides in, so a double tap on the trigger opens it instead of closing it again.
  - Opening the mobile ComboBox, Autocomplete or TagField no longer scrolls the page behind the tray.
  - The tray moves above the on-screen keyboard instead of staying behind it, so the results and actions stay in view while typing.
  - The search field in a tray uses 16px text, so iOS Safari no longer zooms in when it gets focus.

  The [Responsive](/foundations/responsive#overlays-on-small-screens) foundations page describes how the tray behaves.

  Update `@marigold/theme-rui` together with `@marigold/components`. An older theme without `Sheet` styles makes the tray throw on small screens.

  ### Custom theme migration

  This release adds a new required theme component, `Sheet`, and removes the `overlay` slot from the `Tray` theme component. **Custom themes must be updated, or every tray-based component throws on small screens.**

  Without a `Sheet` entry, the page throws as soon as a Select, ComboBox, Autocomplete, TagField, DatePicker, DateRangePicker, Menu or ActionMenu renders on a small screen, even before it opens:

  ```
  Error: Component "Sheet" is missing styles in the current theme.
  ```

  1. Add a `Sheet` theme component. `backdrop` dims the page behind the tray, `container` is the tray surface and `content` is the dialog inside it:

     ```ts
     import { cva } from '@marigold/system';

     export const Sheet = {
       backdrop: cva({
         base: "data-[stack-index='0']:bg-overlay-backdrop",
       }),
       container: cva({
         base: [
           'w-full border-0 inset-shadow-black inset-shadow-sm/20',
           'rounded-b-none ui-surface shadow-elevation-overlay outline-hidden',
         ],
       }),
       content: cva({ base: 'outline-hidden' }),
     };
     ```

  2. Remove `overlay` from your `Tray` theme component. Its backdrop styles belong in `Sheet.backdrop`. Positioning such as `fixed inset-0` is no longer needed.
  3. Move the surface styles (background, border, shadow, rounding) from `Tray.container` to `Sheet.container`. `Tray.container` only lays out the grid inside the tray now, for example `grid grid-rows-[auto_auto_1fr_auto]`.
  4. Replace `group-[[role=dialog]]/tray:` with `group-data-tray/tray:` wherever your theme styles something inside a tray, as the ListBox and Calendar styles do. The tray's group moved off the dialog element, so the old selector silently matches nothing and the list or calendar in a tray gets its ring and padding back.
  5. Keep theme-rui's `@keyframes fade-in` and its `--animate-fade-in` variable, which a theme copied from theme-rui already has. The backdrop fades with the swipe through these keyframes. Without them the page still dims, but the dim does not follow the tray.

  `marigold migrate v19` does steps 1 and 4 for you: it adds the `Sheet` theme component with these styles when your theme has a `Tray`, rewrites the tray selector in theme files that import from `@marigold/`, and warns that `Tray.overlay` and the surface styles have moved, since steps 2 and 3 depend on your customizations. A selector in a plain CSS file needs step 4 by hand.

  The tray sets `--sheet-chrome` on its dialog, the height its handle, title and actions take up. Theme styles that give tray content a fixed height can use `calc(var(--sheet-available) - var(--sheet-chrome))` instead of a hard-coded offset.

- 6d5702b: refactor(DST-1867): render the mobile Sidebar drawer through the internal `Sheet`

  On small screens the `Sidebar` (single column and `Sidebar.Rail`) now opens as a full-width sheet from the start edge, built on the same internal `Sheet` as the tray. Props and the desktop sidebar are unchanged.

  What changes for users on small screens:

  - A swipe toward the start edge closes the drawer. Swiping up and down still scrolls the navigation, and drilling into a section slides inside the drawer without moving it.
  - The slide in and out follows the swipe and mirrors in right-to-left languages, where the drawer comes from the right.
  - Escape, the close button, tapping a link and <kbd>Cmd+B</kbd> / <kbd>Ctrl+B</kbd> close it as before, and focus returns to the toggle.

  **Changed accessibility contract.** The open drawer is now a `dialog` named "Sidebar" ("Seitenleiste" in German). The `aside` inside it no longer carries that name, so it is no longer announced as a named complementary landmark. Tests that look the mobile drawer up by its landmark, for example `getByRole('complementary', { name: 'Sidebar' })`, need `getByRole('dialog', { name: 'Sidebar' })` instead. The desktop sidebar keeps its named `aside`.

  Update `@marigold/theme-rui` together with `@marigold/components`.

  ### Custom theme migration

  The `Sidebar` theme component loses its `overlay` and `modal` slots, and theme-rui no longer defines `animate-slide-in-left` / `animate-slide-out-left`.

  1. Remove `overlay` and `modal` from your `Sidebar` theme component. The backdrop, surface, shadow and slide now come from `Sheet`. Keep styling the drawer's contents through `Sidebar.root`.
  2. Remove any `animate-slide-in-left` / `animate-slide-out-left` classes and the `--animate-slide-in-left`, `--animate-slide-out-left` and `@keyframes slide-in-left` definitions from your theme, unless your own app uses them.
  3. If your `Sheet.container` styles only bottom sheets, scope them to `data-[position=bottom]:` and give the drawer its own look with `data-[position=left]:` / `data-[position=right]:`. theme-rui squares the drawer's corners and keeps the lit top rim on bottom sheets only:

     ```ts
     container: cva({
       base: [
         'w-full border-0 ui-surface shadow-elevation-overlay outline-hidden',
         'data-[position=bottom]:rounded-b-none',
         'data-[position=bottom]:inset-shadow-black data-[position=bottom]:inset-shadow-sm/20',
         'data-[position=left]:rounded-none data-[position=right]:rounded-none',
       ],
     }),
     ```

  `marigold migrate v19` adds a `Sheet` theme component with these styles when your theme has a `Tray` or a `Sidebar`, and warns that `Sidebar.overlay` and `Sidebar.modal` have moved. Steps 1 to 3 depend on your customizations, so make them by hand.

- db282aa: feat(DST-1949): add CommandPalette

  `CommandPalette` is a searchable list of pages and actions that opens with ⌘K (Ctrl+K on Windows and Linux). It opens as a centred dialog on larger screens and as a tray on small ones. The first row is always active, so Enter runs the top match.

  `CommandPalette.Trigger` holds the open state and the shortcut, like `Dialog.Trigger`, and opens the palette from `CommandPalette.Button` or any other button inside it. The palette takes `CommandPalette.Group` and `CommandPalette.Item` as children, and props for the placeholder, the empty state and loading. Each `CommandPalette.Item` needs an `id`, which `onAction` receives. Results are filtered as the user types. Pass `filter={false}` to the palette to load all results yourself, or to a group whose rows come from a server search while the other groups keep the built-in match, and set `loading` while they load. `onSearchChange` hands the term to a server search once people pause typing. A group with a `prefix`, such as `e:` for events, narrows the search to that group when people type it, and the term arrives without the prefix. Enter pressed while server results are still on their way runs the first of the new rows. Screen readers hear when a search finds nothing and when loading takes longer than a second. With `more`, for example "More events…", the group ends with a row that narrows the search to it.

  `Menu.Item` now derives its `textValue` from plain-text children. Typeahead in a `Menu` therefore works without setting `textValue` by hand.

  The `Sidebar` shortcut now follows the same rules as the palette's. It listens for ⌘B on Apple devices and Ctrl+B elsewhere, no longer both, so Ctrl+B on a Mac moves the cursor in text fields again. It also leaves the key to a field that handles it first, for example a rich-text editor that binds it to bold.

  The theme adds a `--text-2xs` token (10px), a step below `text-xs`, used by the palette's key caps.

  The CLI knows the new component and its theme slots.

- cbe5cb4: fix(DST-1986): `marigold validate` skips the rendered checks on files it cannot render, instead of timing out

  With the default `--checks all`, `validate` rendered every file in a sandbox that loads only that one file. On an ordinary app file this failed in two ways:

  - A file with a local import, such as `import { Header } from './Header'`, waited out the full 45 second render budget, then reported an error with a hint to install Playwright.
  - A file whose component was only a named export reported "No component found" as an error.

  Both made `validate` exit with an error on valid code.

  **Now** `validate` checks the file before it starts the browser. When the file imports a local module, or has neither a default export nor a named export called `App`, it skips the layout and accessibility checks and prints one warning that says why. The static checks still run and decide the exit code. An import used only for types does not count, because it is removed before the file runs. When you ask for only the rendered checks, for example `--checks a11y`, the warning says that nothing was checked.

  A file that does render but has an import the sandbox cannot resolve, such as a path alias, now fails within seconds instead of waiting out the budget. The hint under a render failure now matches its cause: install hints only when the render toolchain is missing.

- 5c5c276: fix(DST-1992): `marigold validate` no longer rejects valid `Intl` options on `DateFormat` and `NumericFormat`

  `validate` could report valid formatting options, such as `dateStyle` or `fractionalSecondDigits` on `<DateFormat>` and `notation`, `roundingMode` or `trailingZeroDisplay` on `<NumericFormat>`, as props that do not exist, depending on the packages installed in your app. They are accepted now, in every app, and a prop that really does not exist is still reported. `validate`'s TypeScript check now also accepts the newest JavaScript built-ins, such as `Array.prototype.toSorted`. Whether they run in your supported browsers is up to your own TypeScript setup and build. There is nothing to change in your app.

- 0d96d86: feat(DSTSUP-299): NumberField can show its maximum next to the value

  Set `showMaxValue` on a `NumberField` with a `maxValue` to show the value and the maximum together, for example "1 / 2". Screen readers hear "of 2" as part of the field's description when focus enters the field. The maximum uses the field's `formatOptions`. Nothing is shown without a finite `maxValue` or without the prop. `NumberField` has a new required `maxValue` theme slot, and `marigold migrate v19` adds it to consumer themes.

- Updated dependencies [d94a9a3]
- Updated dependencies [d94a9a3]
- Updated dependencies [3b1173a]
- Updated dependencies [3244580]
- Updated dependencies [70de810]
- Updated dependencies [0ae0ce2]
- Updated dependencies [bfbfe77]
- Updated dependencies [6d5702b]
- Updated dependencies [db282aa]
- Updated dependencies [75963a6]
- Updated dependencies [0d96d86]
- Updated dependencies [f46e8fa]
- Updated dependencies [1904db5]
- Updated dependencies [1904db5]
  - @marigold/components@19.0.0-beta.0
  - @marigold/theme-rui@7.0.0-beta.0

## 3.0.2

### Patch Changes

- 04f4206: fix(DST-1981): write the whole output before the CLI exits

  Output larger than 64 KB was cut off when it was piped or captured, for example by an AI agent, `$(...)` or `| jq`. `marigold docs Table --format json` then returned truncated JSON that could not be parsed. The CLI now waits until its output has been written. Nothing to change on your side.

- 04f4206: docs(DST-1981): document `marigold search` and `marigold validate` for agents

  The CLI page of the docs had no section for `marigold search` and `marigold validate`, and the README pointed AI agents at a file that no longer has the section it named. Both now describe the commands and the loop an agent should follow: search for the component, read its props, write the code, then run `marigold validate --checks technical` until it passes.

- 04f4206: fix(DST-1981): stop `marigold validate` from rejecting valid props such as `dateStyle`

  In a project without `@types/node`, `marigold validate` reported `dateStyle` and `timeStyle` on `<DateFormat>` as props that do not exist, although they work and TypeScript accepts them. The check read the prop types against an outdated set of built-in types. It now uses the same ones in every project, so valid props are no longer reported as errors.

- 04f4206: fix(DST-1981): fail `marigold validate` for a directory or an unsupported file

  `marigold validate src/` and `marigold validate styles.css` used to exit `0` with a list of "check failed" warnings, which reads as a clean result in an automatic fix loop. Both now exit `1` and say what to pass instead: one `.ts`, `.tsx`, `.js` or `.jsx` file per run.

- Updated dependencies [04f4206]
- Updated dependencies [04f4206]
- Updated dependencies [923cef8]
- Updated dependencies [05e61f3]
- Updated dependencies [898ad53]
- Updated dependencies [36e9ad5]
- Updated dependencies [224aca7]
- Updated dependencies [4c5665a]
- Updated dependencies [47f2879]
- Updated dependencies [fb9256b]
  - @marigold/components@18.5.0
  - @marigold/theme-rui@6.4.0

## 3.0.1

### Patch Changes

- 164a8cd: fix(DST-1813): stop the Table's ActionBar from leaving an empty strip below it

  While rows were selected, the Table made room for its ActionBar twice: the bar's own slot below the last row and, on top of that, a bottom padding of the same height. The panel around the table grew by about 128px, and half of that was empty space below the bar. The padding is gone. The Table now keeps room for the bar and an 8px gap only, and that room slides open and closed, so the content after the table moves smoothly instead of jumping.

  The bar still never covers the rows or whatever follows the table, such as a pagination, and it still pins to the bottom of the screen or of a `Scrollable` while the table scrolls past. Keyboard focus now also keeps the focused row clear of the pinned bar on a scrolling page, where the previous `scroll-padding-bottom` on the table had no effect.

  The ActionBar and ListView docs describe the new behaviour, and the ListView bulk actions example drops its own bottom padding.

  The slide is themeable through the new `actionBarSpacer` slot on `Table`. `theme-rui` sets a 200ms height transition, and themes without the slot fall back to the room snapping into place.

- Updated dependencies [5288355]
- Updated dependencies [fa1aa20]
- Updated dependencies [c41a890]
- Updated dependencies [7354d61]
- Updated dependencies [164a8cd]
- Updated dependencies [84c7a60]
- Updated dependencies [43b619c]
- Updated dependencies [c60cb28]
- Updated dependencies [e08584c]
- Updated dependencies [117f12f]
- Updated dependencies [545a06b]
- Updated dependencies [b3d5ae0]
- Updated dependencies [3f4df0f]
  - @marigold/components@18.3.1
  - @marigold/theme-rui@6.2.2

## 3.0.0

### Major Changes

- e1f2e28: feat(DST-1819): default the CLI to JSON output when stdout is not a terminal

  When `--format` is omitted, `docs`, `list`, `search`, `examples`, `doctor` and `validate` now print `json` whenever their output is piped or captured, as it is for an AI agent, a script, CI or a redirect to a file. In an interactive terminal nothing changes: `docs`, `list`, `search` and `examples` still print `markdown`, and `doctor` and `validate` still print `text`. An explicit `--format` always wins.

  **Breaking:** a script that reads the default output of one of these commands through a pipe now receives JSON. Pass `--format markdown`, `--format plain` or `--format text` to keep the previous output. The programmatic `run*()` exports are unchanged and keep their `markdown`/`text` fallback.

### Minor Changes

- a7c4d00: feat: align the CLI with the Command Line Interface Guidelines (clig.dev)

  - **First-run telemetry notice.** Because telemetry is opt-out, the CLI now prints a one-time disclosure (to `stderr`, so JSON/stdout stays clean) explaining that anonymous usage data is collected and how to opt out (`marigold telemetry disable` or `DO_NOT_TRACK=1`). Mirrors the .NET SDK model. The "shown" flag is persisted only after the notice actually prints on an interactive terminal, so agent/pipe runs never consume it before a human sees it. The invocation that shows the notice is itself **not** tracked: no data leaves the machine before the user has seen the disclosure and had a chance to opt out. Tracking begins on the next run.
  - **"Did you mean?" suggestions.** Unknown commands now suggest the nearest valid command via edit distance (e.g. `marigold serach` → _Did you mean "search"?_), matching the error-recovery pattern used by `git`/`cargo`/`npm`.

- a7c4d00: feat: make CLI telemetry identifier-free, and document it in full

  Telemetry stays on by default, but it no longer carries anything that can single out a machine, user, or session. This is what makes the opt-out default defensible under GDPR and ePrivacy: with no identifier there is no personal data to have a lawful basis for, and the CLI no longer stores an identifier on the user's device, which would otherwise require consent under ePrivacy Art. 5(3) / § 25 TDDDG.

  - **Removed the `anonymousId`.** The persistent per-machine UUID is gone from the event payload, from `UserConfig`, and from the server schema. A stale value written by an older CLI is stripped on the next config read and erased from disk. The trade is deliberate: we can now count invocations, not people, and unique-user numbers come from public npm download counts instead.
  - **Corrected the first-run notice.** It previously claimed that no arguments and no personal data were collected, while the event did carry `args` and a persistent UUID. The notice now states exactly what is sent and links to the telemetry section of the CLI docs.
  - **Clamped `args`.** Enum flags are recorded as their validated value or as `invalid`, so a mistyped `--format=jsonn` is no longer echoed back verbatim. `--limit` is recorded only as a positive integer. A name passed as a positional or `--category` is never forwarded as typed: once it resolves against the docs manifest, the manifest's slug is recorded, and anything else is recorded as `unknown`. Free-text search terms remain recorded as `used`.
  - **Hour-granular timestamps, not expiry.** `receivedAt` is truncated to the hour, and so is the ID each event is stored under, in a stream of its own, so events cannot be stitched back into per-session sequences by timing once the identifier is gone. That is also what lets events be kept for long-run usage trends rather than expiring: with no identifier in a record, an old event says no more about you than a new one. The reasoning is in the [telemetry endpoint README](https://github.com/marigold-ui/marigold/blob/main/docs/app/api/telemetry/README.md).
  - **Strict event schema.** The endpoint rejects unknown top-level keys rather than stripping them, so a stale `anonymousId` gets a visible 400 instead of a silent drop. Keys inside `args` are bounded in length and count. The guarantee that no identifier is sent lives in the CLI, which builds `args` only from validated values.
  - **Endpoint-wide rate limit only.** The former per-`anonymousId` quota is gone, since there is no longer a client identifier to key one on, which leaves the endpoint-wide ceiling as the CLI's only bound. That ceiling is a cost backstop, not a security control. Bounding a single misbehaving caller belongs behind WAF rate limiting, which needs no identifier in the body.
  - **Full disclosure in the docs.** The `marigold telemetry` section of the [CLI page](https://www.marigold-ui.io/getting-started/cli#marigold-telemetry) now documents every field sent, what is never sent, why the default is opt-out, and every way to turn it off. It lives there rather than on a standalone privacy page, which nobody would navigate to. `marigold --help` links the anchor, so non-interactive users have a discoverable disclosure too.

### Patch Changes

- Updated dependencies [ab9b05e]
- Updated dependencies [b67903a]
- Updated dependencies [d6b5d77]
- Updated dependencies [d1b1f15]
- Updated dependencies [947b7a9]
- Updated dependencies [2319875]
- Updated dependencies [ec15520]
- Updated dependencies [e9df73e]
- Updated dependencies [44533cd]
- Updated dependencies [8bf58b2]
- Updated dependencies [25b45b3]
- Updated dependencies [e9324b2]
- Updated dependencies [f4e2236]
- Updated dependencies [c860eb4]
- Updated dependencies [ce5eaec]
  - @marigold/components@18.3.0
  - @marigold/theme-rui@6.2.1

## 2.0.1

### Patch Changes

- 39072e8: Prose style is now enforced rather than remembered. Vale runs over the docs site, the
  changesets and the published READMEs, wired into the pre-commit hook and a CI check, with
  the rules in `.vale/styles/Marigold/` and the writing guidance in `CLAUDE.md`.

  Three rules block CI: no em dashes, no semicolons in prose, and no en dash asides. Table
  cells are exempt, because there an em dash is a legitimate "not applicable" marker, and
  ranges keep the en dash so quoted component output stays accurate. All existing violations
  are rewritten in this change, so the check starts green.

  The en dash rule matches only the aside form (a letter, a spaced en dash, then a lowercase
  letter). German uses a spaced en dash where English uses an em dash, which makes it an easy
  slip, but a range reads as digits or a capital around the dash and stays legal.

- 0c56a11: feat(DST-1391): add `Stepper`, a progress indicator for multi-step tasks.

  `<Stepper>` shows where a user stands in a checkout, an onboarding flow, or a multi-page form, replacing the one-off "Step 1 of 4" widgets that several product flows had each built for themselves. It renders a `<nav>` landmark around an ordered list, announces each step's label, position, and state, and never relies on colour alone to convey which step is which.

  State is entirely consumer-owned. `completedKeys` is a set rather than a high-water mark, so non-contiguous completion coming from a server is expressible, and the component never infers that a step is finished: only your code knows whether validation passed. `selectableKeys` replaces the built-in "completed, errored, or current" rule when a backend decides what is reachable, and `disabledKeys` always wins over both. Errored steps stay clickable by default, so a user who is told a step failed has a way back to it, unless `selectableKeys` leaves them out.

  Steps with an `href` render as real links and route through `RouterProvider`. Steps without one render as buttons. Steps that are not reachable render as plain text rather than as disabled controls, since an unreachable step is not a disabled widget. `hideLabels` drops labels visually for flows with too many steps to label, keeping them for screen readers and adding a visible "Step 3 of 5" counter so sighted users still know how far along they are.

- Updated dependencies [d7cf7e4]
- Updated dependencies [741774f]
- Updated dependencies [455eca2]
- Updated dependencies [455eca2]
- Updated dependencies [455eca2]
- Updated dependencies [455eca2]
- Updated dependencies [86f5901]
- Updated dependencies [9a77767]
- Updated dependencies [d816f21]
- Updated dependencies [4b9631c]
- Updated dependencies [ee811e1]
- Updated dependencies [d5f277a]
- Updated dependencies [ea092c1]
- Updated dependencies [8ba1cc4]
- Updated dependencies [7ef7733]
- Updated dependencies [95821ea]
- Updated dependencies [30ecf9d]
- Updated dependencies [0c56a11]
- Updated dependencies [2780c9f]
- Updated dependencies [2fc0951]
  - @marigold/components@18.2.0
  - @marigold/theme-rui@6.2.0

## 2.0.0

### Patch Changes

- Updated dependencies [1dfe461]
- Updated dependencies [c7b5c1d]
- Updated dependencies [17f9158]
- Updated dependencies [148ef97]
- Updated dependencies [1dfe461]
- Updated dependencies [1dfe461]
- Updated dependencies [1fd3f85]
- Updated dependencies [ce2720e]
- Updated dependencies [eeb0a29]
- Updated dependencies [f2dff15]
- Updated dependencies [4a18a38]
- Updated dependencies [e41e633]
  - @marigold/components@18.1.0
  - @marigold/theme-rui@6.1.0

## 1.0.0

### Minor Changes

- 291451f: feat(DST-1475): `marigold validate` to check a component file against the design system's rules — static (AST) and rendered (DOM/a11y) passes, reporting errors and warnings an agent or human can act on.
- b7122c0: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

- b7122c0: feat(DST-1265): add `marigold doctor` — a read-only command that diagnoses a project's Marigold setup (package presence, `@marigold/components`/`@marigold/system` version match, latest-version freshness, that `MarigoldProvider` wraps the app and is actually imported, that its `theme` prop resolves to a real binding, Tailwind config, and React peer deps) and prints actionable fixes grouped by severity. The provider and theme checks verify the referenced identifiers are genuinely bound (imported or declared), so a `<MarigoldProvider theme={theme}>` whose import lines are missing is reported as broken instead of healthy. The freshness check makes a short, best-effort fetch of the docs manifest to learn the latest published versions (cached for 24h; skipped silently when offline or slow, and bypassed entirely with `--offline`). Supports `--format text|json` and `--offline`, and exits `1` only on deterministic errors (e.g. a `<MarigoldProvider>` that is rendered but never imported), so it is safe to gate CI on and easy for AI agents to consume.
- b7122c0: feat(DST-1543): add `marigold migrate <version>` codemods for breaking Marigold releases. The v18 migration restructures theme files to the new slot shapes (never overriding consumer classes), swaps exact-baseline layout classes with a token diff report, scaffolds missing theme components, applies safe application-code renames (icon imports per the official mapping, `Tabs.TabPanel`/`SelectList.Item`, `Inset` spacing props, `TextField` min/max), and reports everything that needs a human decision with pinned source links. The report also covers design-token breakage that no typecheck can see: renamed/removed tokens still referenced, new tokens components require but the consumer CSS does not define, and repurposed tokens that kept their name but changed meaning (with a remap recipe at the definition site). Interactive runs pre-analyze the target and offer the fired changes as a multiselect (Enter applies everything; `--only <names>` selects non-interactively). Run `npx marigold migrate v18 --dry-run` first.

### Patch Changes

- b7122c0: fix: run the CLI when invoked via a symlinked bin. The entry-point guard compared `import.meta.url` (always the realpath) against `path.resolve(process.argv[1])`, so symlinked global bins (`npm install -g`, manual links) exited silently with code 0. `argv[1]` is now resolved through `realpathSync`.
- b7122c0: fix(DST-1656): stop `marigold migrate` from warning on value-conditional props whose value is a literal wrapped in braces. The value check only read a bare `StringLiteral`, so `width={20}`, `width={48}` and `width={'1/2'}` all fell into the "cannot be ruled out statically" branch — a v18 run over a real app produced 16 `Select`/`ComboBox`/`Autocomplete` `width="fit"` warnings without a single site actually using `fit`. Literals inside a JSX expression container now resolve like bare ones; genuinely dynamic values such as `width={someVar}` still warn.
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [85e9a45]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [0e2c676]
- Updated dependencies [a9fdcff]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [2b9df4c]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [68122ff]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [e0f9c05]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [7a122c7]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [bb23186]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [0e2c676]
- Updated dependencies [b7122c0]
- Updated dependencies [f331a41]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [04e22ab]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [6cfcea4]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
- Updated dependencies [b7122c0]
  - @marigold/components@18.0.0
  - @marigold/theme-rui@6.0.0

## 0.5.0-rc.1

### Minor Changes

- b7122c0: feat(DST-1543): add `marigold migrate <version>` codemods for breaking Marigold releases. The v18 migration restructures theme files to the new slot shapes (never overriding consumer classes), swaps exact-baseline layout classes with a token diff report, scaffolds missing theme components, applies safe application-code renames (icon imports per the official mapping, `Tabs.TabPanel`/`SelectList.Item`, `Inset` spacing props, `TextField` min/max), and reports everything that needs a human decision with pinned source links. The report also covers design-token breakage that no typecheck can see: renamed/removed tokens still referenced, new tokens components require but the consumer CSS does not define, and repurposed tokens that kept their name but changed meaning (with a remap recipe at the definition site). Interactive runs pre-analyze the target and offer the fired changes as a multiselect (Enter applies everything; `--only <names>` selects non-interactively). Run `npx marigold migrate v18 --dry-run` first.

### Patch Changes

- b7122c0: fix: run the CLI when invoked via a symlinked bin. The entry-point guard compared `import.meta.url` (always the realpath) against `path.resolve(process.argv[1])`, so symlinked global bins (`npm install -g`, manual links) exited silently with code 0. `argv[1]` is now resolved through `realpathSync`.
- b7122c0: fix(DST-1656): stop `marigold migrate` from warning on value-conditional props whose value is a literal wrapped in braces. The value check only read a bare `StringLiteral`, so `width={20}`, `width={48}` and `width={'1/2'}` all fell into the "cannot be ruled out statically" branch — a v18 run over a real app produced 16 `Select`/`ComboBox`/`Autocomplete` `width="fit"` warnings without a single site actually using `fit`. Literals inside a JSX expression container now resolve like bare ones; genuinely dynamic values such as `width={someVar}` still warn.

## 0.5.0-beta.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

- 946dc9f: feat(DST-1265): add `marigold doctor` — a read-only command that diagnoses a project's Marigold setup (package presence, `@marigold/components`/`@marigold/system` version match, latest-version freshness, that `MarigoldProvider` wraps the app and is actually imported, that its `theme` prop resolves to a real binding, Tailwind config, and React peer deps) and prints actionable fixes grouped by severity. The provider and theme checks verify the referenced identifiers are genuinely bound (imported or declared), so a `<MarigoldProvider theme={theme}>` whose import lines are missing is reported as broken instead of healthy. The freshness check makes a short, best-effort fetch of the docs manifest to learn the latest published versions (cached for 24h; skipped silently when offline or slow, and bypassed entirely with `--offline`). Supports `--format text|json` and `--offline`, and exits `1` only on deterministic errors (e.g. a `<MarigoldProvider>` that is rendered but never imported), so it is safe to gate CI on and easy for AI agents to consume.

## 0.4.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

## 0.3.0

### Minor Changes

- 7877bc6: feat(DST-1421): `marigold examples` commands to expose application patterns

  Adds `marigold examples list` and `marigold examples get <slug>` so AI agents (and humans) can discover and retrieve Marigold's application-level reference patterns from the terminal, mirroring the library-first architecture of the `docs`/`list` commands.
  - **CLI:** new `listExamples()` / `getExample(slug)` library functions and a `examples` command wrapping them, with `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache layer). Tab completion and telemetry are extended to cover the new command and example slugs.
  - **Docs:** a new `build-examples.mjs` registry step emits `public/mcp/examples.json` and `public/mcp/examples/<slug>.json` from colocated `*.marigold-pattern.yaml` sidecars. Examples are discovered by sidecar presence (App-Shell placeholder pages are excluded automatically), and a malformed sidecar fails the build. Sidecars ship for the `filter`, `form` and `inventory` examples.
  - A global framework-transformation note (`marigold docs getting-started/examples-for-agents`) documents porting examples from the Next.js App Router to other frameworks (Vite, etc.) once, rather than per example.

- d84dfeb: feat(DST-1445): surface non-component docs pages in the CLI

  `marigold docs <name-or-slug>` now resolves any docs page, not just components — Foundations, Patterns, and Getting-Started pages are reachable by slug (`docs foundations/accessibility`) or name (`docs installation`). Full slugs route by prefix (`components/…` to a component, otherwise a page); bare names try components first and fall back to pages.

  `marigold list` now also lists those pages, grouped under `Foundations`, `Patterns`, and `Getting Started` headings, and accepts `--category foundations|patterns|getting-started` (the top-level segment, so `--category patterns` returns every pattern page). The `--format json` payload gains an additive top-level `pages` array (`{ title, slug, category, description }`); the existing `categories` shape is unchanged. Shell completion now suggests page slugs for `docs` and page categories for `--category`.

  The package README was updated to document the new page support: the `docs` command reference now covers slugs and page categories, and the `list` reference reflects that pages are listed and searchable alongside components.

  Note: the internal `getComponentDocs` / `ComponentDocs` exports were renamed to `getPageDocs` / `PageDocs`.

## 0.2.1

### Patch Changes

- 401929c: Fix `@marigold/cli` publishing without its `dist/` output. The release build filter excluded the CLI package, so the published tarball shipped without compiled files and the `marigold` bin pointed to a missing entry. The CLI is now built before publish.

## 0.2.0

### Minor Changes

- 6b40542: feat(DST-1264): add `@marigold/cli` — terminal access to Marigold docs, component discovery, and project setup.
  - New package `@marigold/cli` with commands:
    - `marigold docs <Component>` — fetch component documentation (supports `--section`, `--format`, `--fresh`, `--offline`)
    - `marigold list` — list available components (supports `--category`, `--search`)
    - `marigold init` — interactive wizard that installs Marigold packages, edits CSS, wraps the app in `Providers`, and patches the Vite config for Next.js and Vite projects
    - `marigold telemetry <status|enable|disable>` — manage anonymous telemetry
    - `marigold completion <bash|zsh|fish>` — print a shell completion script for tab-completing commands, options, and component names
  - Security: sanitize remote content at the fetch boundary to strip the full ECMA-48 escape set (OSC, DCS, APC/PM/SOS, cursor) so a compromised docs origin can't write to the clipboard via OSC 52 or hijack the terminal; the OSC/DCS matchers are linear-time to avoid ReDoS on adversarial input.
  - Docs site: extended `/api/manifest.json` with categorized components and package version; added `/api/telemetry` ingest route (Upstash Redis).
  - CLAUDE.md: documented CLI usage for AI agents.

  The CLI is designed so AI coding agents can fetch accurate Marigold API data from the terminal instead of guessing from training data. Library exports (`getComponentDocs`, `loadManifest`, …) are available for the MCP server to reuse in a later change.
