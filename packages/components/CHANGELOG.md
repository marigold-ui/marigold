# @marigold/components

## 17.1.0

### Minor Changes

- fd1b092: feat(DST-1219): Improve click area of `<TagField>`

  Improves the click area of the TagField component so that clicking
  anywhere on the field (not just the chevron button) opens the dropdown.

### Patch Changes

- a3042ed: fix(DST-1220): Update to use ui classes instead of util classes in components
- Updated dependencies [fd1b092]
  - @marigold/system@17.1.0

## 17.0.1

### Patch Changes

- @marigold/system@17.0.1

## 17.0.0

### Major Changes

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

### Minor Changes

- d8ce791: feat([DST-1092]): Add TagField component and deprecate Multiselect
  - Add `<TagField>` component: a multi-select field that displays selected items as removable tags with a searchable dropdown, built on react-aria's Select, Autocomplete, and TagGroup
  - Support for controlled/uncontrolled selection, disabled state, error state, disabled keys, sections, and custom empty state
  - Deprecate `<Multiselect>` component with updated docs pointing to `<TagField>`

- 196172e: feat: Add ref forwarding support to Form component
- cfa9b99: feat([DST-1206]): Mobile support for `<TagField>`
- 6c071f0: refa(DST-1146): Migrate `<Center>` to semantic spacing tokens
- 44d01a6: feat(DST-1141): Update `<Card>` to use semantic spacing and add `stretch` property
  - `<Card>` uses semantic spacing
  - Added `stretch` in favor of `size="full"`
  - Updated test suite
  - Fixed that the `<Card>` always take full width

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

- 59ed05f: feat([DST-900]): Introduce Internal `<Tray>` Component for Mobile Support. `<DatePicker>`, `<Menu>`, `<Autocomplete>`, `<Combobox>` and `<Select>` have a new mobile experience.
- 31a4e38: feat(DST-1184): Add `name` prop to `FileField`

### Patch Changes

- 34c785a: style([DST-1154]): Update Admin/Master Badge Styling
- 96e145a: fix(Container): Fix a regression which made `<Container>` not correctly work with `<Breakout>` anymore
- 00a3c81: fix(DST-1205): Fix visuals of `<NumberField>` stepper when disabled using min/max
- cc61968: refa(DST-1150): Remove `space` prop from `<TabList>`
- 01e6bdb: [DST-1157]: introduce new `<ActionBar>` alpha component
- 2244030: fix(DSTSUP-231): Scrolling when pointer hovers over `<Scrollable>` works as expected.
- 63f1603: style([DST-1143]): Improve ContextualHelp sizes

  **Breaking Change**: Sizes have been removed, the default has a new style.

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
- 1469268: [DST-1088]: add docs for `onAction` prop
- f916a20: fest(DST-1149): Allow to use semantic spacing with `<Grid>`
- 726239d: feat(DST-1148): Allow to use semantic spacing with `<Container>`.
- 1bd9f27: feat(DST-1147): Allow to use semantic spacing in `<Columns>`
- b7c64cc: fix(Checkbox): Correctly apply focus styling on checkboxes
- 8a70185: refa(DST-974): Refactoring width property on `FieldBase` and Form Elements like `Input`, `TextArea`, `DateInput` and `Select`. Labels and HelpText can now be wider as the actual input field.
- Updated dependencies [01e6bdb]
- Updated dependencies [5a90757]
- Updated dependencies [0c00d1d]
- Updated dependencies [8dd0455]
- Updated dependencies [8a70185]
  - @marigold/system@17.0.0

## 16.1.0

### Minor Changes

- c5bd98b: feat(DST-1136): Make clear that `"stretch"` is the default for `<Stack>`

### Patch Changes

- 89acee4: feat: Add a generic spacing scale that can be used with `createSpacingVar`
- 4ac589b: refa(DST-1130): Use CSS var instead of map for spacing in `<Stack>`
- d720c5e: feat(DST-1138): `<Inline>` uses spacing helper instead of style-props
- 0b8ca1e: feat(DST-1145): Use semantic tokens with `<Aside>`
- Updated dependencies [89acee4]
- Updated dependencies [4ac589b]
- Updated dependencies [c5bd98b]
  - @marigold/system@16.1.0

## 16.0.1

### Patch Changes

- 77a64e8: fix: Use relative imports & remove default React import usage
- b90a67e: fix(FileField): Use local svg instead from @marigold/icons
  - @marigold/system@16.0.1

## 16.0.0

### Major Changes

- b947276: style(DST-1089): Add expand/collapse animation to `<Accordion>`
- f10119a: refa(DST-1109): Remove required indicator from the label's text content

  **BREACKING CHANGE:** We removed the `indicator` styling from `<Label>`. The component is no longer a multi-part component. Rather than styling the required indicator through a dedicated part (previsouly `indicator`), you can now apply it anyway you want, for example by using `'group-required/field:after:content-["*"]'`.

- 4eebff4: [DSTSUP-191]:
  Breaking chnge: `<XLoader />` renamed to `<Loader />`
  Added a new prop `loaderType` which is by default `cycle`. New option `cycle` shows a spinning cycle.

### Minor Changes

- 98bf929: [DST-1075]: Introduce `<FileField>`component

### Patch Changes

- 832e3fa: fix(styles): Remove extra spacing when hidden/a11y elements are causing it
- 845f26c: feat([DST-1025]): Adding possibilty to paste date values in `<DatePicker>` component.
- 1e98c67: [DST-1103]: Added a new section "Placement and order" onto the `<Button>` component page.
- 9027ce9: feat([DST-973]): Select value on focus in `<NumberField>`
- 2ac63f7: fix([DSTSUP-196]): Fix Listbox layout when more than one element is used.
- 29494b4: fix(DST-1110): Remove extra whitespace from `<Container>`

  When there is no `<Breakout>` inside the container we do not have to apply the 3 column layout. Otherwise this causes 2 empty columns to be there.

- 57a2bd3: style([DST-1126]): Fix Breadcrumb styling
- 62692a6: style(DST-1086): Add a new destructive button variant
- Updated dependencies [b947276]
- Updated dependencies [98bf929]
- Updated dependencies [f10119a]
- Updated dependencies [4eebff4]
  - @marigold/system@16.0.0

## 15.4.3

### Patch Changes

- @marigold/system@15.4.3

## 15.4.2

### Patch Changes

- @marigold/system@15.4.2

## 15.4.1

### Patch Changes

- d710177: fix(drawer): Fix drawer styles for some enviroments
  - @marigold/system@15.4.1

## 15.4.0

### Minor Changes

- e985fe2: feat([DST-1091]): Add multiselection mode to `<Select>`

### Patch Changes

- f621653: feat([DSTSUP-187]): Enhance Toast component with action support
  - Introduced `action` property
  - Update description to support JSX

- 025d6e9: fix([DST-1095]): Don't break table header when sorting indicator is shown and use `cursor` when sortable
- ffbebd0: refa([DST-1099]): Adjust icons sizes in some components to bette fit their container.
- 9ec4620: fix([DSTSUP-193]): update Inline components `alignY=input` now also alignes with input elements regardless of description
- 77e0417: fix([DST-1078]): Fix scrolling within `<ContextualHelp>`
- Updated dependencies [f621653]
- Updated dependencies [e985fe2]
- Updated dependencies [77e0417]
  - @marigold/system@15.4.0
  - @marigold/types@1.4.0

## 15.3.0

### Minor Changes

- 95b55b8: feat([DST-1074]): Introduce a `useConfirmation` hook to conveniently open confirmation dialogs
- bad3ef4: feat([DST-1056]): Add a helper to conveniently parse form data
- 4395d2e: feat([DST-1047]): Improve `<List>` styles and add `small` variant
- 97adc14: feat([DST-1061]): Add more alignment options to `<Inline>`, `<Stack>` and `<Grid>`
- 91a5e7b: feat([DST-1044]): Introduce `LinkButton` component
- baf550b: feat([DST-940]): Introduce `<Drawer>` component

  Added `<Drawer>` component along with usage guideline and stories. The drawer offers a consisten way to present secondary content in a non-blocking way.

- 4ccbec2: feat([DST-1077]): Add white space control to `<Text>`
- 5e62b84: feat([DST-1051]): Introduce `ConfirmationDialog`
- beeba04: feat([DST-1042]): Add "destrutive" variant to `<Menu.Item>`

### Patch Changes

- c6fb6c2: feat: Expose `TimeValue` types
- ba5f502: feat([DST-1069]): Add `noWrap` prop to `<Inline>`
- 061b5e9: feat([DST-1050]): Card master and adminmark variant
- ce996ae: feat([DSTSUP-185]): added `stickyHeader`and `iconPosition`props to `Accordion`
- Updated dependencies [97adc14]
- Updated dependencies [4ccbec2]
  - @marigold/system@15.3.0

## 15.2.0

### Patch Changes

- @marigold/system@15.2.0

## 15.1.0

### Minor Changes

- a3ddf47: feat([DST-1037]): Add `description` (help text) to `<Checkbox>` component
- 0583b77: feat([DST-1039]): Allow `<Text>` to not wrap lines

### Patch Changes

- 7b3caca: feat([DST-1035]): Apply `data-rac` attribute to our table elements.
- Updated dependencies [a3ddf47]
- Updated dependencies [0583b77]
  - @marigold/system@15.1.0

## 15.0.2

### Patch Changes

- @marigold/system@15.0.2

## 15.0.1

### Patch Changes

- df57868: Fix([DSTSUP-181]): Adjust Accordion.Header styles to support full width
- 00d230a: chore: allow `react-aria` patch version range as dependencies
- b351484: feat([DST-981]): Drawer supports controlling the origin of the `<Drawer>` by using `placement` property (e.g. left, right, top, bottom), also supports configurable sizes to adapt to different sizes.
- Updated dependencies [00d230a]
  - @marigold/system@15.0.1

## 15.0.0

### Major Changes

- 9bac182: refa([DST-904]): **Breaking Changes**: Rename `noOptionsMessage` property to `emptyState` in `<Multiselect>` component.
- 62ac4b8: refa([DST-919]): Remove `<Image>` component

  ## Breaking Change

  The `<Image>` component has been removed from Marigold.
  Please replace it with the native `<img>` element.

  If you previously used the `fit` or `position` props, you can replicate the same behavior using the corresponding Tailwind CSS utility classes.

  ### Replacement table

  | Prop type    | Prop value    | Tailwind class        |
  | ------------ | ------------- | --------------------- |
  | **fit**      | `contain`     | `object-contain`      |
  |              | `cover`       | `object-cover`        |
  |              | `fill`        | `object-fill`         |
  |              | `none`        | `unset`               |
  |              | `scaleDown`   | `object-scale-down`   |
  | **position** | `none`        | — (no class)          |
  |              | `bottom`      | `object-bottom`       |
  |              | `center`      | `object-center`       |
  |              | `left`        | `object-left`         |
  |              | `leftBottom`  | `object-left-bottom`  |
  |              | `leftTop`     | `object-left-top`     |
  |              | `right`       | `object-right`        |
  |              | `rightBottom` | `object-right-bottom` |
  |              | `rightTop`    | `object-right-top`    |
  |              | `top`         | `object-top`          |

- 0585db1: refa([DST-1010]): Separate `aria-label` and `name` for slider's thumbs

  **Breaking Change:** The aria-label (`thumbLabels`) and `name` attributes for slider thumbs are now separate. Update implementations to set both explicitly if needed.

### Minor Changes

- 6d8358c: feat([DST-1003]): Improve type safety for component variants.
- 2a64b4f: feat([DST-1008]): Introduce a "remove all" function for `<Tag.Group>`
- 41da911: feat([DST-1005]): Add a "link" variant to `<Button>`
- 13d27bf: feat([DST-1006]): Introduce a collapsible section for long checkbox groups and radios

### Patch Changes

- 44ceb28: bugfix([DST-935]): Controlled `<Dialog>` now working correctly when dismissable is set to `true`
- 7e33a7f: docs: Add alpha to for top navigation (previously a recipe)
- 801e968: fix([DSTSUP-176]): Calendar - Hide, disable, limit the MonthListBox and YearListBox depening on minValue and maxValue
- 17318a8: fix([DSTSUP-172]): Fix alignment of buttons and inputs in `<Inline>` component.
- 6d2d2d4: refa([DST-916]): Remove `<Header>` component and replace with native `<header>`

  ## Breaking Change: `<Header>` component removed

  The `<Header>` component has been removed from Marigold.
  Please replace it with the native HTML `<header>` element.

  Example migration:

  **Before**

  ```tsx
  <Header>
    <h1>Page title</h1>
  </Header>
  ```

  **After**

  ```tsx
  <header>
    <h1>Page title</h1>
  </header>
  ```

- 5e06780: docs([DST-902]): Define asyncronous data loading patterns for components like `<Combobox>` and `<Autocomplete>`.

  Both `<Combobox>` and `<Autocomplete>` now accept a new prop called `emptyState` that allows you to provide custom content to display when there are no items in the list, such as a message

- 1ab48da: refa([DST-915]): Remove `Footer` component

  ## Breaking Change: `<Footer>` component removed

  The `<Footer>` component has been removed from Marigold.
  Please replace it with the native HTML `<footer>` element.

  **Before**

  ```tsx
  <Footer>
    <p>© 2025 Company Name</p>
  </Footer>
  ```

  After

  ```tsx
  <footer>
    <p>© 2025 Company Name</p>
  </footer>
  ```

- Updated dependencies [2a64b4f]
- Updated dependencies [82370d2]
- Updated dependencies [80a4427]
- Updated dependencies [62ac4b8]
  - @marigold/system@15.0.0

## 14.1.1

### Patch Changes

- 424e2f4: feat([DST-998]): prevent page bounce when `<Scrollable>` is used inside a page.
- 81f1c9d: fix broken release
- Updated dependencies [81f1c9d]
  - @marigold/system@14.1.1
  - @marigold/types@1.3.2

## 14.1.0

### Minor Changes

- cc493fc: feat([DST-737]): Add Toast component

  Added ToastProvider Component with corresponding documentation and stories. It's a small Temporary Notification on the edge of the screen, that should be used for messages that don’t need immediate interaction.

- 2163518: feat([DST-899]):Breadcrumb Component

  We added a new Breadcrumbs component to improve navigation and accessibility in the UI.
  It supports collapsing long breadcrumb lists, custom separators (chevron or slash), and integrates with react-aria-components for full accessibility and keyboard navigation.
  The component is flexible, supports links and custom content, and includes comprehensive documentation and usage examples.

### Patch Changes

- 930e633: chore: Update `react-aria` (Release 22/07/2025)
- 8f550ec: refa([DST-976]): Remove unused class names from `ContextualHelp`
- 69e7b61: refa([DST-978]): Add item and section as child component of `ActionMenu`
- ea0f758: fix(DST-968): Fix `<Tag>` styles and add multiselect tag filter to filter pattern example
- 8e178b7: fix([DST-942]): Fix `<Drawer>` on mobile and refactor `<OverlayContainerProvider>`
- 37f40ba: feat([DST-977]): Style icons inside `<Menu.Item>`
- Updated dependencies [cc493fc]
- Updated dependencies [930e633]
- Updated dependencies [2163518]
  - @marigold/system@14.1.0

## 14.0.0

### Major Changes

- 6d61be9: refa([DST-904]): **Breaking Changes**: Deprecate `className` prop from `<Button>` component.
  - Styling should now use `variant` or `size` props instead.
  - Added `SelectListAction` to `SelectList` for handing actions position.

### Minor Changes

- 29e6133: feat([DST-937]): Add master and admin mark variants

### Patch Changes

- a7ec9d3: fix[DSTSUP-169]: Fix width property on Calendar component
- 5e08185: docs([DST-925]): Introduce "admin- and master mark" pattern
  fix([DST-925]): Adjust styles of Tabs to work better with badges
  - @marigold/system@14.0.0

## 13.0.0

### Major Changes

- 9a5791c: docs([DST-914]): Update Divider docs to match new structure of component pages

  **Breaking Change**: Removed `className` property on this component.

- c33ad07: docs([DST-921]): Revise text component page to new component page structure.

  **Breaking Change**: Some propertys has been removed, including `className` and HtMLElement props.

- d224a2f: style([DST-721]): **Breaking Changes**: Deprecate B2B and Core themes
  - **_@marigold/theme-b2b_** and **_@marigold/theme-core_** are now deprecated and will no longer receive updates or maintenance. Please migrate to RUI theme package.
  - The **FieldGroup** component has been removed and is no longer available in `@marigold/components`.
  - All documentation and Storybook references to the B2B and Core themes, as well as FieldGroup, have been removed.
  - If you are using either of these themes , please update your project to our lates release.

### Minor Changes

- 854e00b: refa([DST-871]): Enhance Inline component to dynamically align buttons with input fields when descriptions are present.
- 430c266: feat([DSTSUP-158]): List accessibility for `<Stack>` component

  The `<Stack>` component supports a new property `asList` making it possible to provide accessibility when using a `<Stack>` which behaves as a list element. The `<List>` has an updated documentation.

### Patch Changes

- 98bea2e: docs([DST-917]): Revise Headline documentation
- 16f6dbb: fix[DST-812]: Migrate from UNSTABLE_portalContainer to UNSAFE_PortalProvider

  Changed UNSTABLE_portalContainer to UNSAFE_PortalProvider as UNSTABLE_portalContainer is deprecated.

- Updated dependencies [d224a2f]
  - @marigold/system@13.0.0

## 12.0.5

### Patch Changes

- a6bcd89: chore(deps): update react-aria
- Updated dependencies [a6bcd89]
  - @marigold/system@12.0.5

## 12.0.4

### Patch Changes

- 3e19b71: feat([DST-883]): New variant for RUI table. You can now use a new variant for RUI theme.
- ed72011: feat(DSTSUP-150): add `ghost` version to `<Menu>` + normalize svg sizes in buttons and menus
- 6c230c7: feat[DST-731]: Add ContextualHelp Component with Docs
  We added a new ContextualHelp component to provide inline help and guidance within the UI.
  It displays contextual information in a popover triggered by an icon button, with configurable placement, size, and icon variant (help or info).
  The component is accessible, supports both controlled and uncontrolled open states, and is designed for flexible content layout.
- 17d28b5: feat([DST-885]): update default `<Link>` styles and add link variant
- 5127d58: feat([DST-884]): add vertical alignment property (alignY) to table
- Updated dependencies [6c230c7]
  - @marigold/system@12.0.4

## 12.0.3

### Patch Changes

- 7451134: feat([DST-863]): Improve `Accordion.Header` when using additional content in the header.
- 12b00ed: feat[DST-856]: Add TimeField Component

  We added a new TimeField component to support time-based user input.
  It allows users to select and edit time values, with configurable granularity (hours, minutes, seconds) and optional 12/24-hour format.
  The component supports accessibility features like keyboard navigation.

- 73edbb0: feat([DST-866]): Support `alignX` and `alignY` properties for `<Grid>` component.
- Updated dependencies [12b00ed]
  - @marigold/system@12.0.3

## 12.0.2

### Patch Changes

- 0bca5d8: Update React aria components
- ca26659: refa([DST-715]): Refactor `<Calendar>` component, Fix resizing when open calendar listboxes
- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/system@12.0.2
  - @marigold/types@1.3.1

## 12.0.1

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- af401e5: fix([DSTSUP-135]): Use correct padding on `<MultiSelect>` component
- 534ad77: refa([DST-738]): Adding checkmark icon as selection indicator in RUI theme for SelectList and Listbox components.
- Updated dependencies [0e8211b]
  - @marigold/system@12.0.1

## 12.0.0

### Major Changes

- 2ed500d: feat([DST-804]): Allow `Tag` to be used in forms and overhaul its docs

  BREACKING CHANGE: Remove the `allowsRemoving` prop. This didn't had an effect for a while and to make it more clear removing is enabled, if there is a function set on the `onRemove` prop.

- c30993e: refa([DST-816]): Remove children prop, only label is now available

  BREAKING CHANGE: The `children` prop is no longer supported in the `<Checkbox>`, `<Slider>` and `<Switch>` component to display a label. Use the dedicated `label? prop instead.

### Minor Changes

- 438b959: feat([DSTSUP-112]): Add sizes to RUI's `<Dialog>`
- fe4b9de: feat([DST-801]): Allow to format ranges with `<NumericFormat>`

### Patch Changes

- d7cfabd: fix([DST-808]): Don't render empty helptext when no description or error is present.
- 20ecd9c: fix([DST-803]): Span empty state over the whole table width.
- 4e510fb: [DST-763]: Migrate to eslint flat config.
- 9d57c1f: fix([DST-802]): remove unneeded classnames from `<Modal>`
- Updated dependencies [438b959]
- Updated dependencies [fe4b9de]
- Updated dependencies [4e0971e]
  - @marigold/system@12.0.0

## 11.5.0

### Minor Changes

- c9b95bc: feat([DST-799]): Add `unstyled` and `maxWidth` to `<Form>`

### Patch Changes

- 8dab2e6: chore: update `react-aria` (April 2025 release)
- 70399e4: style([DST-724]): Adjust required icon for form elements in RUI style
- 337f9ee: doc[DST-727]: add copyable examples to the pagination documentation.
- d24cee3: fix([DST-232]): Align icon in `<HelpText>` to the start of text begin.
- 4686a0d: refa([DST-754]): Add `<FocusScope>` to `<Pagination>` to improve focus state.
- c42767f: refa([DST-762]): support `label` prop for `<CheckBox>` and `<Switch>`.

  **Breaking Change**: Deprecate `children` property, use `label` instead. With the next major version `children` will be removed.

- 2a87f43: feat[DST-759]: Implement `<CloseButton>` component to be re-used into other components internally (e.g Dialog, Tag, Drawer and SectionMessage).
- Updated dependencies [8dab2e6]
- Updated dependencies [c9b95bc]
- Updated dependencies [2a87f43]
  - @marigold/system@11.5.0

## 11.4.1

### Patch Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

- 953cf3d: Making the dialog titles independant
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/system@11.4.1

## 11.4.0

### Patch Changes

- @marigold/system@11.4.0

## 11.3.0

### Minor Changes

- 611c2e8: feat(733): Introduce a `<Drawer>` component
- 7554cf9: refa([DST-755]): Cleanup `NumberField` styles for RUI + left align text when stepper is hidden

### Patch Changes

- 888e852: [DST-769]: use useId from `react-aria` utils to support React 17+
- 08ba5c7: chore([DSTSUP-109]): change visibility of icon to hidden when sorting…
- 8b404d2: fix([DST-750]): Do not set styles for content in `<Accordion>`
- Updated dependencies [611c2e8]
  - @marigold/system@11.3.0

## 11.2.3

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/system@11.2.3

## 11.2.2

### Patch Changes

- 9412037: RUI theme release 0.3.0
- 91c72e8: feat[DST-606]: Implement `<MultiSelect>` component

  Introcude `<MultiSelect>` as component!

- Updated dependencies [91c72e8]
  - @marigold/system@11.2.2

## 11.2.1

### Patch Changes

- 40db199: feat(rui): Add more styles to components
- 619b4b2: fix([DST-702]): add space for multiple selection mode in `<SelectList>`

  There were no space between `<Checkbox>` and `children` when using `<SelectList>` in multiple selection mode.
  - @marigold/system@11.2.1

## 11.2.0

### Minor Changes

- c387b43: feat: allow React >=17.0.0

### Patch Changes

- c387b43: feat: allow React >=17.0.0
- a31881d: fix(DST-696): Make it possible to only pass in the color name without a prefix
- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/system@11.2.0
  - @marigold/types@1.3.0

## 11.1.1

### Patch Changes

- be665e7: fix(DST-691): Fix regression, allow to use custom color values with `<Text>`, `<Headline>` and `<SVG>`
- Updated dependencies [be665e7]
  - @marigold/system@11.1.1

## 11.1.0

### Minor Changes

- fd96b48: feat(DST-689): Allow to style body element and header row of a `<Table>`

### Patch Changes

- 300bfba: fix(DST-690): Rotate chevron when `Accordion.Item` is expanded + align header and content
- Updated dependencies [fd96b48]
  - @marigold/system@11.1.0

## 11.0.2

### Patch Changes

- 8e58923: fix([DSTSUP-104]): mobile behaviour for `<Popover>`

  `<Underlay>` stayed remaining open on small screens while `<Popover>` was correctly closing, fixed this and added styles for `<Popover>` back.
  - @marigold/system@11.0.2

## 11.0.1

### Patch Changes

- @marigold/system@11.0.1

## 11.0.0

### Major Changes

- 964e025: refa([DST-665]): Refactoring Accordion

  Added two Accordion components `Accordion.Header` and `Accordion.Content`.
  `Accordion.Header` replaces the title in `Accordion.Item`.
  `Accordion.Content` is now the place where the content needs to be.

  Reworked the `Accordion` Documentation Page.

- 82c869c: refa: improve `<Container>` and `<Breakout>` component

  **BREAKING CHANGE:** This PR includes breaking changes, because we removed and changed a lot ot the props API of `<Container>` and `<Breakout>`. The `<Container>` now only works with `<Text>` and `<Headline>` component. This allows for a smoother developer experience and prevents suprises.

  Make the `<Container>` and `<Breakout>` component more usable for real world scenarios.
  - `<Container>` supporst `space` style prop
  - simplify `<Container>` usage by removing unnecessary props
  - simplify `<Breakout>` and make it composable with other layout components
  - make `<Text>` and `<Headline>` adhere to a `<Container>` content length

- d96b809: refa(DST-629): Align `<XLoader>` modes with loading pattern naming convention

  **BREAKING CHANGE:** Rename `mode` prop to align with the "Loading state" pattern. Renamed `"fullsize"` to `"fullscreen"` and `"inline"` to `"section"`.

### Patch Changes

- Updated dependencies [964e025]
  - @marigold/system@11.0.0

## 10.2.1

### Patch Changes

- bb2049f: bugfix[DSTSUP-100]: Bug in pagination component
  - display of results counter fixed
  - when page size changed the first page will now be selected

- 7f0841d: fix(DSTSUP-102): Set dimensions of checkmark

  Fixes a bug in Safari where the checkmark was not displayed.
  - @marigold/system@10.2.1

## 10.2.0

### Minor Changes

- b89cd49: feat(DST-646): Improve a11y by translation fallback loading message

### Patch Changes

- dc53196: fix(DST-644): Make `<XLoader>` use underlay styles from theme in docs
  - @marigold/system@10.2.0

## 10.1.3

### Patch Changes

- Updated dependencies [8b7be8e]
  - @marigold/types@1.2.1
  - @marigold/system@10.1.3

## 10.1.2

### Patch Changes

- @marigold/system@10.1.2

## 10.1.1

### Patch Changes

- 17fd7b4: docs([DST-621]): Revise `<Tiles>` page

  Revised `<Tiles>` page according to our new structure of component pages.

- 93f783a: feat([DSTSUP-98]): introduce controlled dismissable `<SectionMessage>`

  Added possibility to control the dismissable state in `<SectionMessage>`, you can now use `onClose` and `close` to control the closing of a section message.

- d52e52f: docs([DST-624]): Revise `<Calendar>` page and change some properties
  - Revised the page according to our new template.
  - Rename `isDateUnavailable` to `dateUnavailable`.
  - Remove the props: `visibleDuration` and `pageBehavior`.
  - Added outline focus styles for keyboard navigation in both themes.

- d326823: bugfix([DST-627]): replace useState import from storybook

  Some controlled stories in Storybook were incorrect because the useState import from react was used, resulting in an error.

  The stories of the following component were affected:
  - Calendar
  - DateField
  - DatePicker
  - Dialog
  - HelpText
  - SearchField

- 85e8cba: feat(DST-608): Make `<XLoader>` accessible and update documentation
  - Refactored the `<XLoader>` component to be more accessible
  - Updated the `<XLoader>` documentation page
  - Adjusted styling to fit regular underlay styles when using "fullsize" mode

- 38d461d: docs([DST-628]): Revise `<SearchField>` page

  Revised `<SearchField>` documentation page according to the new structure.

- 425ce62: fix(`<Text>`): prevent `elementType` prop from being passed down into the DOM. This is a prop used interally to make `<Text>` polymorphic.
- Updated dependencies [85e8cba]
  - @marigold/system@10.1.1

## 10.1.0

### Minor Changes

- 83ad341: feat(dialog): Introduce a dedicated button to close a dialog

  Make it more convenient to have a button that closes the `<Dialog>`. With this, there is less need to use the child function to access the `close` method. Instead you can now use `<Button slot="close">` to render a close button.

### Patch Changes

- f2bae7e: fix: Remove `isOpen` from `<Select>`

  The `isOpen` prop was set by default. Remove it. Only required when controlled.

- 80a9f5b: fix(Text): Only apply `elementType` when RAC Text component is used.
- 2d701a6: docs[DST-611]: Revise `<Scrollable>` documentation page

  Revised the `<Scrollable>` page according to our new structure of component documentation pages.

- a917acf: refa: Remove icons dependency from components package

  Make `@marigold/components` not depend on `@marigold/icons` since this might bloat the bundling.

- 22200a0: docs([DST-581]): revise `<DateField>` page according to new component page structure

  Revised the `<DateField>` documentation page to our new layout of component pages.

- 222f674: refa[DST-607]: revise `<Badge>` page

  The `<Badge>` was revised according to our new component guidelines.

- ac29d40: refa[DST-610]: Revise `<Card>` page

  The `<Card>`is now revised according to our new component page guidelines.

- ebc53cb: refa[DST-598]: Improve `<Slider>` component

  The `<Slider>` component appears in a new guise. Functionalities and documentation have been significantly revised. So make sure to check out the Marigold documentation and storybook. It's worth it.

  Some key features are:
  - multithumb or range slider
  - visual indicator for selected track
  - use slider in forms

- 3bf3a8e: docs([DST-615]): Revise `<Center>` documentation

  Revised the `<Center>` page according to our new structure of component documentation.

- 2cb5d38: feat(DST-596): add loading indicator in `<Button>` component

  Introduced a new loading indicator for the `<Button>` component's loading state, enhancing the visibility of its loading status. The `<Button>` now supports a loading property for this functionality.

- 313f004: docs([DST-609]): Revise `<Columns>` documentation page

  Revised the `<Columns>` page according to our new structure of component documentation pages.

- Updated dependencies [ebc53cb]
  - @marigold/system@10.1.0

## 10.0.0

### Major Changes

- 65608b4: fix([DSTSUP-94]): Adjust date unavailable property from `<DatePicker>`

  **Breaking Change:** Adjusted `isDateUnavailable` prop to our code guidelines `dateUnavailable`

  Added disabled styles for `data-unavailable` in both b2b and core theme

- caefbe4: refa(listbox): Allow sections in `<Combobox>` and `<Autocomplete>`, adjust Section API in `<Select>`, `<Combobox>` and `<Autocomplete>`.
  - Added the possibility to use sections with `<Combobox>` and `<Autocomplete>`
  - Refactored the `<Section>` (from `<Listbox>`) to fit our API, no need for the extra `<Header>` anymore. Instead you can do `<Select.Section header="My header">`, same for the other components
  - Renamed `<Item>` to `<Option>` in `<Combobox>` and `<Autocomplete>` to align with `<Select>`
  - Updated the docs for `<Select>`, `<Combobox>` and `<Autocomplete>`
  - Updated Storybook for `<Select>`, `<Combobox>` and `<Autocomplete>` with section stories
  - Renamed the part of the `<ListBox>` accordingly (from `sectionTitle` to `header`)

    **BREAKING CHANGE:** We changed the API of the `<Section>` component that is used in `<Select>`, `<Combobox>` and `<Autocomplete>`. It is no longer necessary to add a `Header` within the `<Section>`.

    Use the newly added `header` prop instead. Additionally, to unify the APIs all choices of `<Select>`, `<Combobox>` and `<Autocomplete>` are now called `<Option>` instead of `<Item>`.

- 2d9917f: **Breaking changes**
  - `Dialog.Headline` has been renamed to `Dialog.Title`. Please update your code accordingly.
  - `<Dialog.Content>` and `<Dialog.Actions>` have been introduced for better organization and flexibility.
  - The internal layout now uses grid areas, ensuring consistent ordering and layout of the dialog elements.
  - Existing implementations of the `<Dialog>` component will need to be updated to use these new subcomponents.

### Minor Changes

- 6f8e3a2: style(dialog): make `<Dialog>` sizes responsive

  Using `size` with a `<Dialog>` will allow the dialog to be at most sm/md/lg wide. Will use full width on smaller screens.

- 6687af7: refa: remove footer from `<Dialog>` + allow styles
  - dialogs can only have action now
  - align buttons in `<Dialog.Actions>` correctly

- 2babc0b: feat(components): Mark layout components as regions for accessibility.

  Added the ability to mark layout components as regions (ARIA role). This improves accessibility by allowing assistive technologies to identify significant sections of the page, making navigation easier for users with disabilities.

- 956982a: feat(components): Make `<Text>` and `<Headline>` accessible by allowing ARIA labelling props

  `<Text>` and `<Headline>` will no longer cause type errors when ARIA labelling is used (`aria-label`, `id`, ...).

- df04623: Adding size to dialog component

### Patch Changes

- 7ea3838: feat(Menu): pass `aria-label` to menu button instead of menu
- f18c8aa: [DST-494]: add loading states pattern

  [DST-494]: added prop `mode`to the `<XLoader />` to support inline and full-section loading

- d5386e4: fix(components): Display `<Checkbox>` focus ring and adjust focus ring of `<Table>`

  Focus ring was not showing for the `<Checkbox>`. It does now!

- 5c029ec: feat(components): Expose `Selection` type for easy usage with `Table` and other components

  When working with a `<Table>` you can now use

  ```ts
  import type { Selection } from '@marigold/components';
  ```

  instead of creating the type.

- 2169b6f: bugfix([DSTSUP-92]): fixed variants in table stories

  At certain stories the control variants doesn't worked properly. Now it should work at least for all table stories.

- bfd2843: chore: refa `<Text>` component. Based on the slot property it now takes the RAC text or not. Needed to prevent other components breaking.
- 0e77996: docs([DST-572]): Adding a general form guideline in docs explaining different concepts such as when to use lable and help text
- b8cd92a: feat: `CheckboxGroup` can now be used as a compound component
  - Refactored the `CheckboxGroup` to be a compound component and align it with other components: `<CheckboxGroup>` -> `<Checkbox.Group>`
  - Adjusted the Checkbox appearance demo a bit

- 45fb3c4: chore(deps): update react-aria to 1.4
- f6a132c: docs([DST-582]): revise `<SectionMessage>` page according to new component page structure
  feat(components): add close button on `<SectionMessage>`

  Revised the `<SectionMessage>` documentation page to our new layout of component pages. And added a close button to allow the user to dismiss the `<SectionMessage>` this is now aligned with our feedback message pattern.

- Updated dependencies [caefbe4]
- Updated dependencies [6687af7]
- Updated dependencies [2babc0b]
- Updated dependencies [45fb3c4]
- Updated dependencies [956982a]
  - @marigold/system@10.0.0
  - @marigold/types@1.2.0
  - @marigold/icons@1.2.58

## 9.0.2

### Patch Changes

- [#4116](https://github.com/marigold-ui/marigold/pull/4116) [`de0c9e9`](https://github.com/marigold-ui/marigold/commit/de0c9e94584b3f1733bda09722b0e2eb2fc0a8eb) Thanks [@aromko](https://github.com/aromko)! - docs[DST-513]: Revise `<Autocomplete>` component page.

- [#4102](https://github.com/marigold-ui/marigold/pull/4102) [`d700af0`](https://github.com/marigold-ui/marigold/commit/d700af043a720a231cd4f6de03f59b62b945727f) Thanks [@sebald](https://github.com/sebald)! - feat: add `as` prop to Text to render different elements

- [#4071](https://github.com/marigold-ui/marigold/pull/4071) [`406fd1f`](https://github.com/marigold-ui/marigold/commit/406fd1fed939f75a6731d5e0ec4baa40751dedc8) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[DST-503]:Revise Select and add slots to text component

- [#4125](https://github.com/marigold-ui/marigold/pull/4125) [`46f06db`](https://github.com/marigold-ui/marigold/commit/46f06dbb3cc38c17aeb1734fa0b8733c4055fcc4) Thanks [@aromko](https://github.com/aromko)! - docs[DST-517]: revise `<Tabs>` component

- [#4146](https://github.com/marigold-ui/marigold/pull/4146) [`66eae8f`](https://github.com/marigold-ui/marigold/commit/66eae8f4ba8949ebabfcfa26de36a147b7765d38) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: adjust visibility for autocomplete clear button

- [#4143](https://github.com/marigold-ui/marigold/pull/4143) [`77fe4ad`](https://github.com/marigold-ui/marigold/commit/77fe4adb2a9184d52d375eeca4f0993e8d43b7de) Thanks [@aromko](https://github.com/aromko)! - Bugfix: fix datepicker storybook Controlled example

- [#4134](https://github.com/marigold-ui/marigold/pull/4134) [`d35cc6d`](https://github.com/marigold-ui/marigold/commit/d35cc6d7a66996e9da91936e736a7db57a4a2fd3) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix DOM tree for empty tables

- [#4110](https://github.com/marigold-ui/marigold/pull/4110) [`b2b79d4`](https://github.com/marigold-ui/marigold/commit/b2b79d4daf0ab4950a255039729d216023af1764) Thanks [@aromko](https://github.com/aromko)! - docs[DST-511]: Revise switch component.

- [#4115](https://github.com/marigold-ui/marigold/pull/4115) [`0523f69`](https://github.com/marigold-ui/marigold/commit/0523f69e6bd370ae5be57a5b28cc341b3bb34b82) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix SelectListItem layout

- [#4103](https://github.com/marigold-ui/marigold/pull/4103) [`b8c991f`](https://github.com/marigold-ui/marigold/commit/b8c991fc249f69fab09d9aa3c6a71923cf8324de) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[DST-507]: revise `<Inline>` page

- Updated dependencies []:
  - @marigold/system@9.0.2
  - @marigold/icons@1.2.57

## 9.0.1

### Patch Changes

- [#4056](https://github.com/marigold-ui/marigold/pull/4056) [`5d53af4`](https://github.com/marigold-ui/marigold/commit/5d53af4ef32d8f70ae8d2d84db4fbfdd60998e79) Thanks [@aromko](https://github.com/aromko)! - [DST-504]: Sorting indicator is shown only on sorted column.

- [#4042](https://github.com/marigold-ui/marigold/pull/4042) [`965512c`](https://github.com/marigold-ui/marigold/commit/965512c113938cac629bb6cc518926f0d600b40f) Thanks [@sebald](https://github.com/sebald)! - feat: allow to render an empty state when collection of `<Table>` is empty

- [#4039](https://github.com/marigold-ui/marigold/pull/4039) [`9598df4`](https://github.com/marigold-ui/marigold/commit/9598df4ed6ac3fa72620d3b2b41d47a451a55d79) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-487]: align core styles to marigold

- Updated dependencies []:
  - @marigold/system@9.0.1
  - @marigold/icons@1.2.56

## 9.0.0

### Major Changes

- [#3994](https://github.com/marigold-ui/marigold/pull/3994) [`41428b3`](https://github.com/marigold-ui/marigold/commit/41428b3ac939ff970149e046cd31d1d8aacbd9bc) Thanks [@sebald](https://github.com/sebald)! - fix: remove `HTMLProps` from components

### Patch Changes

- [#4032](https://github.com/marigold-ui/marigold/pull/4032) [`0bf0940`](https://github.com/marigold-ui/marigold/commit/0bf0940842eca39810cb644e4b3b935eaf0f2f4c) Thanks [@sebald](https://github.com/sebald)! - fix([DST-501]): Pass down appearance props and use context from CheckboxGroup to apply label width

- [#4026](https://github.com/marigold-ui/marigold/pull/4026) [`94e9a1b`](https://github.com/marigold-ui/marigold/commit/94e9a1be5ec8ed56aabab335b4867903161c60b8) Thanks [@sebald](https://github.com/sebald)! - fix: correctly apply styles to `<Select>` icon

- [#4028](https://github.com/marigold-ui/marigold/pull/4028) [`db4fa1d`](https://github.com/marigold-ui/marigold/commit/db4fa1d08c80a90b05352bd4ec2e53b0084f843f) Thanks [@sebald](https://github.com/sebald)! - docs: Introduce an appearance demo

- [#4034](https://github.com/marigold-ui/marigold/pull/4034) [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d) Thanks [@sebald](https://github.com/sebald)! - fix([DST-500]): fix popover placement

- [#4033](https://github.com/marigold-ui/marigold/pull/4033) [`449de9b`](https://github.com/marigold-ui/marigold/commit/449de9b61c95b1fd848dc31d33143f5e73197383) Thanks [@sebald](https://github.com/sebald)! - fix([DST-501]): Don't render helptext if there is no error and description.

- [#4027](https://github.com/marigold-ui/marigold/pull/4027) [`391dcd1`](https://github.com/marigold-ui/marigold/commit/391dcd18ea761494ac242ffbfe3e356ab6bbdea8) Thanks [@sebald](https://github.com/sebald)! - fix: pass down appearance props to `FieldBase` in `Select` and `TextField`

- Updated dependencies []:
  - @marigold/system@9.0.0
  - @marigold/icons@1.2.55

## 8.0.2

### Patch Changes

- [#3992](https://github.com/marigold-ui/marigold/pull/3992) [`ed3bd89`](https://github.com/marigold-ui/marigold/commit/ed3bd8975c535817ca904bd1f17b1a4009950e2b) Thanks [@sebald](https://github.com/sebald)! - refa: use `FieldErrorContext` in `<HelpText>` and fix `key` issue

- [#4005](https://github.com/marigold-ui/marigold/pull/4005) [`c64d71e`](https://github.com/marigold-ui/marigold/commit/c64d71e190ba7b361fefeb94e25daa8715050448) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Add ref to datepicker

- [#3985](https://github.com/marigold-ui/marigold/pull/3985) [`864ed08`](https://github.com/marigold-ui/marigold/commit/864ed08bbc7305292e4777baad795b39e8c171f1) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: adjust the triggerwidth of the autocomplete

- Updated dependencies []:
  - @marigold/system@8.0.2
  - @marigold/icons@1.2.54

## 8.0.1

### Patch Changes

- [#3979](https://github.com/marigold-ui/marigold/pull/3979) [`a02f284`](https://github.com/marigold-ui/marigold/commit/a02f284baa1e4bc78dbad960377810a1665a5c49) Thanks [@sarahgm](https://github.com/sarahgm)! - Fix: fix some props and add command to build step

- Updated dependencies [[`a02f284`](https://github.com/marigold-ui/marigold/commit/a02f284baa1e4bc78dbad960377810a1665a5c49)]:
  - @marigold/system@8.0.1
  - @marigold/icons@1.2.53

## 8.0.0

### Major Changes

- [#3939](https://github.com/marigold-ui/marigold/pull/3939) [`2cde433`](https://github.com/marigold-ui/marigold/commit/2cde433e21bc49e378b96c9d812baf21914cf382) Thanks [@sarahgm](https://github.com/sarahgm)! - feat[DST-481]: rename `<Message>` in `<SectionMessage>`

- [#3967](https://github.com/marigold-ui/marigold/pull/3967) [`0773aa8`](https://github.com/marigold-ui/marigold/commit/0773aa8cd6ee71faf4f0d04f80f33cbe7fc56202) Thanks [@sebald](https://github.com/sebald)! - refa: Update TypeScript and adjust `<NumericFormat>` props

- [#3940](https://github.com/marigold-ui/marigold/pull/3940) [`9c5b80c`](https://github.com/marigold-ui/marigold/commit/9c5b80c7a1dbfef5e1e7c2a557fc17f81640945c) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-461]: refactor `<Message>` component

### Minor Changes

- [#3942](https://github.com/marigold-ui/marigold/pull/3942) [`5977cba`](https://github.com/marigold-ui/marigold/commit/5977cba2ce729ea32f9db869e9c19e16032e58ec) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Keep our documentation props table dynamic

### Patch Changes

- [#3959](https://github.com/marigold-ui/marigold/pull/3959) [`d053e37`](https://github.com/marigold-ui/marigold/commit/d053e37f49ef382ea33c7743d0d67d89153ccc9e) Thanks [@sebald](https://github.com/sebald)! - chore: make github linter happy

- Updated dependencies [[`2cde433`](https://github.com/marigold-ui/marigold/commit/2cde433e21bc49e378b96c9d812baf21914cf382), [`0773aa8`](https://github.com/marigold-ui/marigold/commit/0773aa8cd6ee71faf4f0d04f80f33cbe7fc56202), [`2658e2f`](https://github.com/marigold-ui/marigold/commit/2658e2f075c9aaae89b5817a864313f887c1a8fe), [`5977cba`](https://github.com/marigold-ui/marigold/commit/5977cba2ce729ea32f9db869e9c19e16032e58ec), [`3f7a4ec`](https://github.com/marigold-ui/marigold/commit/3f7a4ec80a4b56fea3c63e44b71ad86fa36e3d75)]:
  - @marigold/system@8.0.0
  - @marigold/types@1.1.1
  - @marigold/icons@1.2.52

## 7.8.2

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.8.2
  - @marigold/icons@1.2.51

## 7.8.1

### Patch Changes

- [#3924](https://github.com/marigold-ui/marigold/pull/3924) [`290dc0e`](https://github.com/marigold-ui/marigold/commit/290dc0e8b5b5fc1492d391d8e6156bd849f0b37d) Thanks [@sebald](https://github.com/sebald)! - fix: inconsistent naming of `SelectList`

- Updated dependencies []:
  - @marigold/system@7.8.1
  - @marigold/icons@1.2.50

## 7.8.0

### Minor Changes

- [#3913](https://github.com/marigold-ui/marigold/pull/3913) [`8c4631f`](https://github.com/marigold-ui/marigold/commit/8c4631f53744e9316f4d6ae325602de8287bbe86) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `Grid` component

### Patch Changes

- Updated dependencies [[`8c4631f`](https://github.com/marigold-ui/marigold/commit/8c4631f53744e9316f4d6ae325602de8287bbe86)]:
  - @marigold/system@7.8.0
  - @marigold/icons@1.2.49

## 7.7.2

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.7.2
  - @marigold/icons@1.2.48

## 7.7.1

### Patch Changes

- [#3893](https://github.com/marigold-ui/marigold/pull/3893) [`f57caec`](https://github.com/marigold-ui/marigold/commit/f57caecd8c964ba2012bf1fcab9b15a15a58080d) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: add className to MarigoldProvider

- [#3898](https://github.com/marigold-ui/marigold/pull/3898) [`a54d186`](https://github.com/marigold-ui/marigold/commit/a54d186bf53da1a0afa6ee22a7711a803a155d6a) Thanks [@sebald](https://github.com/sebald)! - feat: Ensure datepicker shows only date by default

- Updated dependencies []:
  - @marigold/system@7.7.1
  - @marigold/icons@1.2.47

## 7.7.0

### Minor Changes

- [#3892](https://github.com/marigold-ui/marigold/pull/3892) [`3f02ea1`](https://github.com/marigold-ui/marigold/commit/3f02ea15fab7b27907b0b478d479d6f2766e3ab2) Thanks [@sebald](https://github.com/sebald)! - feat: Allow to disable keyboard navigation on `Table`

### Patch Changes

- [#3885](https://github.com/marigold-ui/marigold/pull/3885) [`72ece08`](https://github.com/marigold-ui/marigold/commit/72ece08fe8009ee19b05c2ad8796658dfa91ebb8) Thanks [@sebald](https://github.com/sebald)! - fix: `getColor` correctly works with deeply nested values

- [#3880](https://github.com/marigold-ui/marigold/pull/3880) [`4a59427`](https://github.com/marigold-ui/marigold/commit/4a59427fc1d4c14b1971c07778de1977cdde5dda) Thanks [@sebald](https://github.com/sebald)! - chore: cleanup peerdeeps

- Updated dependencies [[`72ece08`](https://github.com/marigold-ui/marigold/commit/72ece08fe8009ee19b05c2ad8796658dfa91ebb8), [`4a59427`](https://github.com/marigold-ui/marigold/commit/4a59427fc1d4c14b1971c07778de1977cdde5dda)]:
  - @marigold/system@7.7.0
  - @marigold/icons@1.2.46

## 7.6.0

### Minor Changes

- [#3841](https://github.com/marigold-ui/marigold/pull/3841) [`05d2ca0`](https://github.com/marigold-ui/marigold/commit/05d2ca03fbac80de9a1b6887932301b0d91691f2) Thanks [@sebald](https://github.com/sebald)! - feat: Allow configure position of menu popover

- [#3708](https://github.com/marigold-ui/marigold/pull/3708) [`af1807b`](https://github.com/marigold-ui/marigold/commit/af1807b4335022bcd12db0d454992ef8bf6b2cc7) Thanks [@aromko](https://github.com/aromko)! - Creating new component `SelectList`

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.6.0
  - @marigold/icons@1.2.45

## 7.5.4

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.5.4
  - @marigold/icons@1.2.44

## 7.5.3

### Patch Changes

- [#3834](https://github.com/marigold-ui/marigold/pull/3834) [`7fd7ad7`](https://github.com/marigold-ui/marigold/commit/7fd7ad7393ed524e5c72b4eecea896ffc67e7c86) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding cursor hover for tag component in multiselect

- [#3824](https://github.com/marigold-ui/marigold/pull/3824) [`879a0e1`](https://github.com/marigold-ui/marigold/commit/879a0e12368318f4535792ed09917481fbd46f3b) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding Multiselect guideline

- [#3829](https://github.com/marigold-ui/marigold/pull/3829) [`81a84e5`](https://github.com/marigold-ui/marigold/commit/81a84e520dc9021d2b813ee345e8af14368b237e) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DSTSUP-65]: fix demo and add overlayprovider to tooltip

- Updated dependencies []:
  - @marigold/system@7.5.3
  - @marigold/icons@1.2.43

## 7.5.2

### Patch Changes

- [#3828](https://github.com/marigold-ui/marigold/pull/3828) [`f996764`](https://github.com/marigold-ui/marigold/commit/f99676498dd62ffa671314b18be140967162b69b) Thanks [@aromko](https://github.com/aromko)! - BUGFIX: fix onClear on SearchInput.tsx

- [#3827](https://github.com/marigold-ui/marigold/pull/3827) [`95ce246`](https://github.com/marigold-ui/marigold/commit/95ce246e7367031ec2241c9dd40e89a56bbb3547) Thanks [@sebald](https://github.com/sebald)! - fix: restore default `collapseAt` for `<Columns>`

- Updated dependencies []:
  - @marigold/system@7.5.2
  - @marigold/icons@1.2.42

## 7.5.1

### Patch Changes

- [#3802](https://github.com/marigold-ui/marigold/pull/3802) [`d4479c7`](https://github.com/marigold-ui/marigold/commit/d4479c770b3833f0dbdaa488fabed5aee5d009ce) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: changing the token back to z-40 from underlay

- [#3777](https://github.com/marigold-ui/marigold/pull/3777) [`02f1934`](https://github.com/marigold-ui/marigold/commit/02f1934f85d58ffd694e234a0b7e45dadc7e55cf) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-271]:feat: Column allow fit width of item

- [#3810](https://github.com/marigold-ui/marigold/pull/3810) [`dea175a`](https://github.com/marigold-ui/marigold/commit/dea175a3c3d848db98a8ab5664c35e2bbce41d74) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-60]: add examples using state in table with input fields
  [DSTSUP-60]: add `useListData` hook to docs

- [#3812](https://github.com/marigold-ui/marigold/pull/3812) [`3d1e813`](https://github.com/marigold-ui/marigold/commit/3d1e8135d6af203400b4610b128037bed05ab0b1) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-59]:fix if no label no gap style

- [#3803](https://github.com/marigold-ui/marigold/pull/3803) [`886ff54`](https://github.com/marigold-ui/marigold/commit/886ff5424e44e20f8e65551bde6e3d8373d849a7) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: add possibility to align Checkbox to FieldGroups

- Updated dependencies [[`fba5e92`](https://github.com/marigold-ui/marigold/commit/fba5e92e8e70de0c3a65696cd2c462b6dfa7819e)]:
  - @marigold/system@7.5.1
  - @marigold/icons@1.2.41

## 7.5.0

### Minor Changes

- [#3767](https://github.com/marigold-ui/marigold/pull/3767) [`6de438b`](https://github.com/marigold-ui/marigold/commit/6de438b81cd21da9d57e1312692938817b359b16) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-53]:feat: text variant muted for b2b theme

### Patch Changes

- [#3764](https://github.com/marigold-ui/marigold/pull/3764) [`ade96cf`](https://github.com/marigold-ui/marigold/commit/ade96cf23f071140d8d935dc16c9096659b70bce) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-54]: feat: update link token in core theme

- [#3772](https://github.com/marigold-ui/marigold/pull/3772) [`d6c44fa`](https://github.com/marigold-ui/marigold/commit/d6c44fa342d1221f42a8d4f82889c70865b97b39) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fix Select component in small screens

- Updated dependencies [[`5643257`](https://github.com/marigold-ui/marigold/commit/5643257afd66f093b45ca303876085b4c2b80e32), [`07d9277`](https://github.com/marigold-ui/marigold/commit/07d927746893c846200c2ca6ee6977d50a4ed5a4)]:
  - @marigold/system@7.5.0
  - @marigold/icons@1.2.40

## 7.4.0

### Minor Changes

- [#3702](https://github.com/marigold-ui/marigold/pull/3702) [`dbaadeb`](https://github.com/marigold-ui/marigold/commit/dbaadeb54251f39f54c49ab9144f837711c764d5) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-279]: remove overlay provider

- [#3713](https://github.com/marigold-ui/marigold/pull/3713) [`2b9e03e`](https://github.com/marigold-ui/marigold/commit/2b9e03effbbcc63e50781448b89f4e9062c4d0e5) Thanks [@sebald](https://github.com/sebald)! - feat: Render empty state of `<Tag>`

### Patch Changes

- [#3750](https://github.com/marigold-ui/marigold/pull/3750) [`ebea32e`](https://github.com/marigold-ui/marigold/commit/ebea32e2e2d875de430eea07d7f31e2ed23fd21a) Thanks [@sebald](https://github.com/sebald)! - fix([DSTSUP-31]): prevent immediately selection is Select/Combobox/Autocomplete

- [#3722](https://github.com/marigold-ui/marigold/pull/3722) [`c61895d`](https://github.com/marigold-ui/marigold/commit/c61895db7fbc3cee7fd0d622518f64d881da7f9b) Thanks [@sebald](https://github.com/sebald)! - fix: core `linedTable` variant works again

- [#3674](https://github.com/marigold-ui/marigold/pull/3674) [`3d66a58`](https://github.com/marigold-ui/marigold/commit/3d66a58ca0843a9586e37a87cdfb41b6a6318fd6) Thanks [@sebald](https://github.com/sebald)! - docs: Add docs for `<Form>`

- [#3720](https://github.com/marigold-ui/marigold/pull/3720) [`4d2f94f`](https://github.com/marigold-ui/marigold/commit/4d2f94fcfe17d510298ef0e545736f6dfd6b5992) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DSTSUP-41]: Combobox styles for icon

- [#3715](https://github.com/marigold-ui/marigold/pull/3715) [`7969fd9`](https://github.com/marigold-ui/marigold/commit/7969fd9d38275c6dbad0d80d2b84c8e8e365dfa4) Thanks [@sebald](https://github.com/sebald)! - fix: add placeholder prop to `Combobox` types

- Updated dependencies [[`4d2f94f`](https://github.com/marigold-ui/marigold/commit/4d2f94fcfe17d510298ef0e545736f6dfd6b5992)]:
  - @marigold/system@7.4.0
  - @marigold/icons@1.2.39

## 7.3.3

### Patch Changes

- [#3690](https://github.com/marigold-ui/marigold/pull/3690) [`b37c3ee`](https://github.com/marigold-ui/marigold/commit/b37c3eebc8b859d7c6b6e35290203d0eb393a1eb) Thanks [@sebald](https://github.com/sebald)! - fix: unify clear buttons in search fields

- Updated dependencies []:
  - @marigold/system@7.3.3
  - @marigold/icons@1.2.38

## 7.3.2

### Patch Changes

- [#3683](https://github.com/marigold-ui/marigold/pull/3683) [`c2c7e71`](https://github.com/marigold-ui/marigold/commit/c2c7e71a405adabec937a5ff0b087b7a8b6c1c8d) Thanks [@sebald](https://github.com/sebald)! - fix: `placeholder` prop was missing on `TextArea`

- Updated dependencies []:
  - @marigold/system@7.3.2
  - @marigold/icons@1.2.37

## 7.3.1

### Patch Changes

- [#3660](https://github.com/marigold-ui/marigold/pull/3660) [`35ff260`](https://github.com/marigold-ui/marigold/commit/35ff26022c0815f37037ea1054471ac3a5302910) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix `Switch` positioning in themes

- [#3668](https://github.com/marigold-ui/marigold/pull/3668) [`01148ac`](https://github.com/marigold-ui/marigold/commit/01148aca8c0dc0c236bc698b2fcc8980a5aa6470) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DSTSUP-30]: Fix-select-width

- [#3676](https://github.com/marigold-ui/marigold/pull/3676) [`63d407e`](https://github.com/marigold-ui/marigold/commit/63d407e11c8ec31ce5375868f174b306d5cda8f1) Thanks [@sebald](https://github.com/sebald)! - feat: use `size-` util (also fixes linting)

- Updated dependencies [[`f8ed8d1`](https://github.com/marigold-ui/marigold/commit/f8ed8d13ef4bfcbe150cf1ffcfefff0aee233e8a), [`63d407e`](https://github.com/marigold-ui/marigold/commit/63d407e11c8ec31ce5375868f174b306d5cda8f1)]:
  - @marigold/icons@1.2.36
  - @marigold/system@7.3.1

## 7.3.0

### Minor Changes

- [#3644](https://github.com/marigold-ui/marigold/pull/3644) [`b4999d8`](https://github.com/marigold-ui/marigold/commit/b4999d8ecc9118df94b57f03dd67a80df4af7576) Thanks [@sebald](https://github.com/sebald)! - feat: `getColor` util

- [#3651](https://github.com/marigold-ui/marigold/pull/3651) [`8b6f34a`](https://github.com/marigold-ui/marigold/commit/8b6f34abf562158ea4bfbd6ad7a8a33c143a929f) Thanks [@sebald](https://github.com/sebald)! - feat: Expose `I18nProvider`

- [#3621](https://github.com/marigold-ui/marigold/pull/3621) [`3c72997`](https://github.com/marigold-ui/marigold/commit/3c729971879d41543ef074bab6b9874a283039d4) Thanks [@sarahgm](https://github.com/sarahgm)! - DST-[266]:feat: use new b2b tokens in code

### Patch Changes

- [#3653](https://github.com/marigold-ui/marigold/pull/3653) [`34a7482`](https://github.com/marigold-ui/marigold/commit/34a748234747b91cb3b4fb9cb4c6708508ac05aa) Thanks [@sebald](https://github.com/sebald)! - fix([DSTSUP-23]): Correctly prefix days/months with zeroes

- [#3654](https://github.com/marigold-ui/marigold/pull/3654) [`fd16ef5`](https://github.com/marigold-ui/marigold/commit/fd16ef5f593d0bebaff24563edf663ad5a542feb) Thanks [@sebald](https://github.com/sebald)! - fix([DSTSUP-19]): Allow Popovers to outgrow their trigger element

- [#3645](https://github.com/marigold-ui/marigold/pull/3645) [`7e3aa28`](https://github.com/marigold-ui/marigold/commit/7e3aa287a2d3987ff82d2f7cda37194db3533cfa) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding onClear prop over Autocomplete component

- [#3656](https://github.com/marigold-ui/marigold/pull/3656) [`c1fb6aa`](https://github.com/marigold-ui/marigold/commit/c1fb6aa690caa0bd316ad93a9ffa3ac045afeb2e) Thanks [@sarahgm](https://github.com/sarahgm)! - feat[DSTSUP-17]: add placeholder text styles for b2b theme

- [#3649](https://github.com/marigold-ui/marigold/pull/3649) [`299941b`](https://github.com/marigold-ui/marigold/commit/299941b52c027f8c203ba5b13335ab22b9441e13) Thanks [@sebald](https://github.com/sebald)! - feat([DSTSUP-22]): Disable `cmd+a` (open all items) in `<Accordion>`

- Updated dependencies [[`b4999d8`](https://github.com/marigold-ui/marigold/commit/b4999d8ecc9118df94b57f03dd67a80df4af7576)]:
  - @marigold/system@7.3.0
  - @marigold/icons@1.2.35

## 7.2.0

### Minor Changes

- [#3592](https://github.com/marigold-ui/marigold/pull/3592) [`0b23a25`](https://github.com/marigold-ui/marigold/commit/0b23a25efa8be6bf0dcc6cbb315b6fb4a0ad9dfd) Thanks [@sebald](https://github.com/sebald)! - feat: Enable built-in browser validation

- [#3596](https://github.com/marigold-ui/marigold/pull/3596) [`9f1ae32`](https://github.com/marigold-ui/marigold/commit/9f1ae32297f6e5d3c08ce861b4e497a15bf06b37) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Added new Helpers components `NumericFormat` & `DateFormat`

- [#3589](https://github.com/marigold-ui/marigold/pull/3589) [`b228e09`](https://github.com/marigold-ui/marigold/commit/b228e099be8940b6ea50bdc6ad8ef6e52ddc4c3d) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: Update `react-aria-components` to v1.0.0

- [#3575](https://github.com/marigold-ui/marigold/pull/3575) [`cba7099`](https://github.com/marigold-ui/marigold/commit/cba7099f1f89b30f23be0074134c224c7ba173b1) Thanks [@sarahgm](https://github.com/sarahgm)! - feat[DST-263]: new component `<Scrollable>`!!!

- [#3593](https://github.com/marigold-ui/marigold/pull/3593) [`46e1a41`](https://github.com/marigold-ui/marigold/commit/46e1a41551b9524668836dc4ed085a6780e10d10) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding sticky header feature to tables

### Patch Changes

- [#3517](https://github.com/marigold-ui/marigold/pull/3517) [`7a8d40a`](https://github.com/marigold-ui/marigold/commit/7a8d40abdeb34d28cab0771269e1cfc6b7f4b1f0) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-220]: seperate data-theme attribute and classnames on provider (so you don't need any data-theme attribute anymore)

- [#3623](https://github.com/marigold-ui/marigold/pull/3623) [`6697a67`](https://github.com/marigold-ui/marigold/commit/6697a67c11f251b8361f8be522b8c4be608455dc) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: [DSTSUP-13]: add disabled also on the `<ActionMenu>`

- [#3639](https://github.com/marigold-ui/marigold/pull/3639) [`d76a835`](https://github.com/marigold-ui/marigold/commit/d76a83587c3d839c50deceb7303ddb59fc38f4b1) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing Table Selectable header alignment

- Updated dependencies [[`7a8d40a`](https://github.com/marigold-ui/marigold/commit/7a8d40abdeb34d28cab0771269e1cfc6b7f4b1f0), [`9f1ae32`](https://github.com/marigold-ui/marigold/commit/9f1ae32297f6e5d3c08ce861b4e497a15bf06b37)]:
  - @marigold/system@7.2.0
  - @marigold/icons@1.2.34

## 7.1.0

### Minor Changes

- [#3551](https://github.com/marigold-ui/marigold/pull/3551) [`49a702446`](https://github.com/marigold-ui/marigold/commit/49a702446394e82c72df1691f53709a70a4be41a) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding Table Column alignment feature

- [#3576](https://github.com/marigold-ui/marigold/pull/3576) [`08e89a407`](https://github.com/marigold-ui/marigold/commit/08e89a40738e78459be976b8c6f6a5d23ffd8720) Thanks [@sebald](https://github.com/sebald)! - feat: expose form from `react-aria-components`

### Patch Changes

- [#3571](https://github.com/marigold-ui/marigold/pull/3571) [`6a4d1e8d0`](https://github.com/marigold-ui/marigold/commit/6a4d1e8d0fbf2270d0b393f4c89a0d6187964037) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DSTSUP-10]: add min/max props to textfield

- [#3554](https://github.com/marigold-ui/marigold/pull/3554) [`b6cb6edce`](https://github.com/marigold-ui/marigold/commit/b6cb6edce3872cde0b49161b838147914b1976a3) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: DatePicker as react aria component

- [#3563](https://github.com/marigold-ui/marigold/pull/3563) [`4fa5dee85`](https://github.com/marigold-ui/marigold/commit/4fa5dee853c31cf81121ce1f9ff22fff0db0b415) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: add placeholder property to autocomplete

- [#3564](https://github.com/marigold-ui/marigold/pull/3564) [`a984d90e2`](https://github.com/marigold-ui/marigold/commit/a984d90e2e8d937b600af72a895db934f9d6d674) Thanks [@sebald](https://github.com/sebald)! - refa: remov cloning children in `<Columns>`

- [#3562](https://github.com/marigold-ui/marigold/pull/3562) [`b3fd3e5e0`](https://github.com/marigold-ui/marigold/commit/b3fd3e5e09c044e52fcdeac19ebdd6d6361b7f6a) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: `<Menu>` can contain disabled button

- [#3557](https://github.com/marigold-ui/marigold/pull/3557) [`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-5]: Bugfix: Loss of input values after collapsing accordion elements is now prevented by hiding the corresponding section.

- [#3577](https://github.com/marigold-ui/marigold/pull/3577) [`63b093ad8`](https://github.com/marigold-ui/marigold/commit/63b093ad8ca6d7bf1767db2b42c467016871ce49) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing Scrollable table story

- [#3552](https://github.com/marigold-ui/marigold/pull/3552) [`e2fa304a6`](https://github.com/marigold-ui/marigold/commit/e2fa304a6528c51a1f1ded1d954ae36d2113a70f) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-4] bugfix accordion item do not collapse and hide after first click

- Updated dependencies [[`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b), [`535d1088b`](https://github.com/marigold-ui/marigold/commit/535d1088b5d0de60ec07e72d2b5faac7b918ad01)]:
  - @marigold/system@7.1.0
  - @marigold/icons@1.2.33

## 7.0.0

### Major Changes

- [#3542](https://github.com/marigold-ui/marigold/pull/3542) [`3952ee0e8`](https://github.com/marigold-ui/marigold/commit/3952ee0e893704e791bc6a51ed57b3dc80b78ece) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Menu react aria components

  > ` [!WARNING] >` **BREAKCING CHANGE** `<Menu.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Menu.item key="something"/>` to `<Menu.item id="something"/>`.

- [#3535](https://github.com/marigold-ui/marigold/pull/3535) [`e4cfbc7d1`](https://github.com/marigold-ui/marigold/commit/e4cfbc7d1f07015532f359217d2b8d0d74f932bf) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Migrate Select component to RAC

  > ` [!WARNING] >` **BREAKCING CHANGE** `<Select.Option>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Select.Option key="something"/>` to `<Select.Option id="something"/>`.

- [#3546](https://github.com/marigold-ui/marigold/pull/3546) [`9c61ffe09`](https://github.com/marigold-ui/marigold/commit/9c61ffe09271c4f4b2ab9907472763d222d24f04) Thanks [@sebald](https://github.com/sebald)! - refa: Migrate `ComBox` to RAC

  > ` [!WARNING] >` **BREAKCING CHANGE** `<ComboBox.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<ComboBox.item key="something"/>` to `<ComboBox.item id="something"/>`.

- [#3550](https://github.com/marigold-ui/marigold/pull/3550) [`30167bb78`](https://github.com/marigold-ui/marigold/commit/30167bb78f11c557c45c19dc25a7d66db805879b) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Autocomplete

  > ` [!WARNING] >` **BREAKCING CHANGE** `<Autocomplete.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Autocomplete.item key="something"/>` to `<Autocomplete.item id="something"/>`.

### Patch Changes

- [#3544](https://github.com/marigold-ui/marigold/pull/3544) [`dc5c193e0`](https://github.com/marigold-ui/marigold/commit/dc5c193e02a71eb16a064b50dad5a51d4f9b0c2b) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: new table variant borderedTable for b2b theme

- [#3527](https://github.com/marigold-ui/marigold/pull/3527) [`4ae97c004`](https://github.com/marigold-ui/marigold/commit/4ae97c004a68c4331cd8fa0fdbc276fc3f7f452d) Thanks [@aromko](https://github.com/aromko)! - chore[DST-258] `<Checkbox>` storybook improvements

- [#3540](https://github.com/marigold-ui/marigold/pull/3540) [`72125e114`](https://github.com/marigold-ui/marigold/commit/72125e11492d60f08665054e4427de24cde337be) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate `<Calendar>`, `<DatePicker>`, `<DateField>` component

- [#3529](https://github.com/marigold-ui/marigold/pull/3529) [`f3a45c302`](https://github.com/marigold-ui/marigold/commit/f3a45c302852c460395411cdafa1558120227efb) Thanks [@aromko](https://github.com/aromko)! - RAC: use new `<Input>` component in all affected components

- Updated dependencies [[`72125e114`](https://github.com/marigold-ui/marigold/commit/72125e11492d60f08665054e4427de24cde337be)]:
  - @marigold/system@7.0.0
  - @marigold/icons@1.2.32

## 6.11.0

### Minor Changes

- [#3520](https://github.com/marigold-ui/marigold/pull/3520) [`bc96dda88`](https://github.com/marigold-ui/marigold/commit/bc96dda88894271bc7fdc4a01270932855337af8) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Introduce RAC popover component

- [#3445](https://github.com/marigold-ui/marigold/pull/3445) [`91badb0e1`](https://github.com/marigold-ui/marigold/commit/91badb0e1da21d8cefa36c48c57d53c5abe54123) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - migrate ListBox component to RAC

### Patch Changes

- [#3522](https://github.com/marigold-ui/marigold/pull/3522) [`a748252c5`](https://github.com/marigold-ui/marigold/commit/a748252c5e233d37548dd0b9d9dd18cbbbd6fdb5) Thanks [@aromko](https://github.com/aromko)! - chore[DST-255]: `<Button>` storybook improvements

- [#3537](https://github.com/marigold-ui/marigold/pull/3537) [`148034202`](https://github.com/marigold-ui/marigold/commit/148034202a502f9c669c5c500c6dcae13924b409) Thanks [@sebald](https://github.com/sebald)! - feat: Make `Popover` at least as wide as trigger element

- [#3531](https://github.com/marigold-ui/marigold/pull/3531) [`071bd792a`](https://github.com/marigold-ui/marigold/commit/071bd792ac0ed9fc0adbb7aa9ae781ed7fa280fd) Thanks [@aromko](https://github.com/aromko)! - chore: add placeholder to TextFieldProps

- [#3530](https://github.com/marigold-ui/marigold/pull/3530) [`51611dbe0`](https://github.com/marigold-ui/marigold/commit/51611dbe075fa43aef219bf30a196b34b3ec7d73) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: remove Dialog trigger out of Popover

- [#3521](https://github.com/marigold-ui/marigold/pull/3521) [`f972b3a25`](https://github.com/marigold-ui/marigold/commit/f972b3a2579483c5e8632cc13ce6d4dbacc18a73) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-256]: `<XLoader>` storybook improvements

- [#3525](https://github.com/marigold-ui/marigold/pull/3525) [`cf59ce1e4`](https://github.com/marigold-ui/marigold/commit/cf59ce1e4154e670b51ee43387e372e3f7ec8e60) Thanks [@aromko](https://github.com/aromko)! - chore[DST-257]: `<Card>`storybook improvements

- [#3536](https://github.com/marigold-ui/marigold/pull/3536) [`bc09a9ce1`](https://github.com/marigold-ui/marigold/commit/bc09a9ce1c917b0fc3cfbd3459a0c83cf804308e) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: add "Tray" behavior inside Popover

- [#3519](https://github.com/marigold-ui/marigold/pull/3519) [`849f4c534`](https://github.com/marigold-ui/marigold/commit/849f4c534f71ce64bb7181b2bdc60ff4864b3ce1) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: remove unused `stretch` prop and improve storybook story

- [#3513](https://github.com/marigold-ui/marigold/pull/3513) [`cdc17ee83`](https://github.com/marigold-ui/marigold/commit/cdc17ee83771dc367d29126903feca831c43a421) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate `<TagGroup>` component

- Updated dependencies [[`cdc17ee83`](https://github.com/marigold-ui/marigold/commit/cdc17ee83771dc367d29126903feca831c43a421)]:
  - @marigold/system@6.11.0
  - @marigold/icons@1.2.31

## 6.10.0

### Minor Changes

- [#3501](https://github.com/marigold-ui/marigold/pull/3501) [`14f5d5d30`](https://github.com/marigold-ui/marigold/commit/14f5d5d301f6e2dd49667439ecda54c2ce7d08a7) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Migrate Tabs to RAC Tabs

- [#3514](https://github.com/marigold-ui/marigold/pull/3514) [`5a3d71cae`](https://github.com/marigold-ui/marigold/commit/5a3d71cae1b4243db94ff997313ceada2fa3bfeb) Thanks [@sebald](https://github.com/sebald)! - feat([DST-249]): Add feedback variants to `<Badge>`

### Patch Changes

- [#3512](https://github.com/marigold-ui/marigold/pull/3512) [`213d32f5b`](https://github.com/marigold-ui/marigold/commit/213d32f5b79ee9063e30fbe52c064560f771df21) Thanks [@sebald](https://github.com/sebald)! - fix([DST-243]): Fix `<Listbox>` overflowing the `<Popover>`

- [#3515](https://github.com/marigold-ui/marigold/pull/3515) [`aac41db30`](https://github.com/marigold-ui/marigold/commit/aac41db30bfb7613bf9ba537d1030cd5c8d1baa0) Thanks [@sebald](https://github.com/sebald)! - fix: SearchField is missing from export index

- [#3516](https://github.com/marigold-ui/marigold/pull/3516) [`71eb13b30`](https://github.com/marigold-ui/marigold/commit/71eb13b30b3d94a8bacb1f69f457c13d7e33fad2) Thanks [@aromko](https://github.com/aromko)! - chore: remove some unnecessary exports

- Updated dependencies [[`14f5d5d30`](https://github.com/marigold-ui/marigold/commit/14f5d5d301f6e2dd49667439ecda54c2ce7d08a7)]:
  - @marigold/system@6.10.0
  - @marigold/icons@1.2.30

## 6.9.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.9.1
  - @marigold/icons@1.2.29

## 6.9.0

### Minor Changes

- [#3505](https://github.com/marigold-ui/marigold/pull/3505) [`c068869a9`](https://github.com/marigold-ui/marigold/commit/c068869a98f3c7ceb91bd04b59342668d546f589) Thanks [@sebald](https://github.com/sebald)! - feat: add a success `<Message>` variant

- [#3482](https://github.com/marigold-ui/marigold/pull/3482) [`a16541314`](https://github.com/marigold-ui/marigold/commit/a165413142b6d64f9995678498c6d68091ce526e) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Dialog & Modal migration

### Patch Changes

- [#3500](https://github.com/marigold-ui/marigold/pull/3500) [`79eaec78c`](https://github.com/marigold-ui/marigold/commit/79eaec78c8c1a5d99d4ad09f93f8b2ca39aaade2) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate `<NumberField />`

- [#3498](https://github.com/marigold-ui/marigold/pull/3498) [`7507ac7f5`](https://github.com/marigold-ui/marigold/commit/7507ac7f52d9a6d0826534b4035bb0dce7f074aa) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate searchfield

- [#3481](https://github.com/marigold-ui/marigold/pull/3481) [`729158c87`](https://github.com/marigold-ui/marigold/commit/729158c8799205cdc6a733cd01f6a2239850ac2a) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate TextField component

- [#3486](https://github.com/marigold-ui/marigold/pull/3486) [`17ee74d46`](https://github.com/marigold-ui/marigold/commit/17ee74d4686e003b133dab2598eb2bbb6d87e948) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate textarea

- [#3499](https://github.com/marigold-ui/marigold/pull/3499) [`f19a502d4`](https://github.com/marigold-ui/marigold/commit/f19a502d4badd559a27e86e6e74747dfccb0a6c2) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: `DateField` to react-aria-components

- [#3487](https://github.com/marigold-ui/marigold/pull/3487) [`75bad8b84`](https://github.com/marigold-ui/marigold/commit/75bad8b84c127cd38a30f70af26795aa8e8d4ae0) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: `<Tooltip>` to react aria components

- Updated dependencies []:
  - @marigold/system@6.9.0
  - @marigold/icons@1.2.28

## 6.8.0

### Minor Changes

- [#3471](https://github.com/marigold-ui/marigold/pull/3471) [`c76bd48a2`](https://github.com/marigold-ui/marigold/commit/c76bd48a2f12b488f58de09e38c4d78da62c2e3b) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding a fixed-height scrollable table example

### Patch Changes

- [#3476](https://github.com/marigold-ui/marigold/pull/3476) [`30b94e542`](https://github.com/marigold-ui/marigold/commit/30b94e542fe3d60676b2e00868e48b28e8c12ff6) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing Scrollable table story

- [#3483](https://github.com/marigold-ui/marigold/pull/3483) [`3a21b538a`](https://github.com/marigold-ui/marigold/commit/3a21b538a5f72fb021bf7cb023f565d6e84e2ea7) Thanks [@aromko](https://github.com/aromko)! - chore: add data-required attribute for label

- [#3480](https://github.com/marigold-ui/marigold/pull/3480) [`4c76cf114`](https://github.com/marigold-ui/marigold/commit/4c76cf114adf3c2485518f386ebd14c0415df3ac) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: add `FieldError` in `HelpText`

- [#3477](https://github.com/marigold-ui/marigold/pull/3477) [`84c427dec`](https://github.com/marigold-ui/marigold/commit/84c427dec67be6ef488ece0afb179dc95c403447) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate input

- Updated dependencies []:
  - @marigold/system@6.8.0
  - @marigold/icons@1.2.27

## 6.7.0

### Minor Changes

- [#3473](https://github.com/marigold-ui/marigold/pull/3473) [`22446fa66`](https://github.com/marigold-ui/marigold/commit/22446fa66d38b34d975ed88b4dcd0b1ca7190a57) Thanks [@sebald](https://github.com/sebald)! - refa: Update `react-aria-components` to `rc.0`, `CheckboxGroup` and `HelpText`

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.7.0
  - @marigold/icons@1.2.26

## 6.6.4

### Patch Changes

- [#3466](https://github.com/marigold-ui/marigold/pull/3466) [`174f534b5`](https://github.com/marigold-ui/marigold/commit/174f534b5bcb5c3d34284d7cdeb5bf6fd372a350) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: adjust core switch

- [#3468](https://github.com/marigold-ui/marigold/pull/3468) [`cac5ef60d`](https://github.com/marigold-ui/marigold/commit/cac5ef60d36c2c7c0eea5cc9096a849315eefeed) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding selected prop over Switch component

- Updated dependencies []:
  - @marigold/system@6.6.4
  - @marigold/icons@1.2.25

## 6.6.3

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.6.3
  - @marigold/icons@1.2.24

## 6.6.2

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.6.2
  - @marigold/icons@1.2.23

## 6.6.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.6.1
  - @marigold/icons@1.2.22

## 6.6.0

### Minor Changes

- [#3452](https://github.com/marigold-ui/marigold/pull/3452) [`43e792d6a`](https://github.com/marigold-ui/marigold/commit/43e792d6a55b60429a208e206f00cdab5bd23a9f) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: expose `RouterProvider`

- [#3416](https://github.com/marigold-ui/marigold/pull/3416) [`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-38]: Implement mobile optimization for `DatePicker`

### Patch Changes

- [#3448](https://github.com/marigold-ui/marigold/pull/3448) [`547fca472`](https://github.com/marigold-ui/marigold/commit/547fca47212de69da8366988d2e7e1d29c3411ca) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: nested lists

- [#3455](https://github.com/marigold-ui/marigold/pull/3455) [`4cb379e5a`](https://github.com/marigold-ui/marigold/commit/4cb379e5ac0a5ba36cc8de55a73b901c701f80c6) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: link props type

- [#3451](https://github.com/marigold-ui/marigold/pull/3451) [`f2b764380`](https://github.com/marigold-ui/marigold/commit/f2b764380c3775c640b56e2a2fdd838762699318) Thanks [@sebald](https://github.com/sebald)! - fix: `<Checkbox>` "checked" state

- Updated dependencies [[`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff)]:
  - @marigold/system@6.6.0
  - @marigold/icons@1.2.21

## 6.5.1

### Patch Changes

- [`80ac67eac`](https://github.com/marigold-ui/marigold/commit/80ac67eac8ad065c8c0f458e5f888c3f0e42a02b) Thanks [@sebald](https://github.com/sebald)! - fix: `FieldBase` renders empty element when no label is given

- Updated dependencies []:
  - @marigold/system@6.5.1
  - @marigold/icons@1.2.20

## 6.5.0

### Minor Changes

- [#3430](https://github.com/marigold-ui/marigold/pull/3430) [`1ce0cabbf`](https://github.com/marigold-ui/marigold/commit/1ce0cabbf8e04cab4345265dbe131d48be773d68) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: refa `<Radio>` as react-aria-components

### Patch Changes

- [#3434](https://github.com/marigold-ui/marigold/pull/3434) [`5e1219c84`](https://github.com/marigold-ui/marigold/commit/5e1219c84810991be0253186a7f7ec19bd916689) Thanks [@sebald](https://github.com/sebald)! - fix([DST-228]): Hotfix `react-aria` so space works inside forms in an accordion

- Updated dependencies []:
  - @marigold/system@6.5.0
  - @marigold/icons@1.2.19

## 6.4.0

### Minor Changes

- [#3405](https://github.com/marigold-ui/marigold/pull/3405) [`1eb93352a`](https://github.com/marigold-ui/marigold/commit/1eb93352a8c08cac7903ac08fb91d8f9be8c0bfd) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: updated `Button` to react aria components

- [#3429](https://github.com/marigold-ui/marigold/pull/3429) [`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd) Thanks [@sebald](https://github.com/sebald)! - feat: adjust `<SliderOutput>` position

- [#3422](https://github.com/marigold-ui/marigold/pull/3422) [`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56) Thanks [@sebald](https://github.com/sebald)! - refa: Make `<FieldBase>` work with RAC components

- [#3406](https://github.com/marigold-ui/marigold/pull/3406) [`e968e5eb5`](https://github.com/marigold-ui/marigold/commit/e968e5eb5ce58b37c364b01b7617b1bc108c5f74) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Label as React aria Component

- [#3408](https://github.com/marigold-ui/marigold/pull/3408) [`78840aa04`](https://github.com/marigold-ui/marigold/commit/78840aa04e83dce5f8fbfa7357f7099eddf71126) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Headline as React Aria Component

- [#3396](https://github.com/marigold-ui/marigold/pull/3396) [`60c7f1dc5`](https://github.com/marigold-ui/marigold/commit/60c7f1dc549e6b489a1852a18da849fcbb052f5c) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Switch component

- [#3407](https://github.com/marigold-ui/marigold/pull/3407) [`0fbb7f963`](https://github.com/marigold-ui/marigold/commit/0fbb7f96327d0af6acb9c9d2f4e6bfa76cb5384d) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Divider as React Aria Component

- [#3400](https://github.com/marigold-ui/marigold/pull/3400) [`700cdf296`](https://github.com/marigold-ui/marigold/commit/700cdf2963f7b0b46ed715599646fa7ed71e7c0b) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Replace old `Slider` with the new RAC `slider`

- [#3424](https://github.com/marigold-ui/marigold/pull/3424) [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9) Thanks [@sebald](https://github.com/sebald)! - feat: add styles to checkbox and radio groups

- [#3392](https://github.com/marigold-ui/marigold/pull/3392) [`5ed86abd0`](https://github.com/marigold-ui/marigold/commit/5ed86abd0643b0fcf4254a7a2fec74266085346d) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Link as react aria component

### Patch Changes

- [#3432](https://github.com/marigold-ui/marigold/pull/3432) [`9b0ed3862`](https://github.com/marigold-ui/marigold/commit/9b0ed38624cbed0edde8a3cb502ba34259ed5bfc) Thanks [@sebald](https://github.com/sebald)! - fix: adjust chevrons in accordion

- [#3418](https://github.com/marigold-ui/marigold/pull/3418) [`dc2b1484c`](https://github.com/marigold-ui/marigold/commit/dc2b1484cd77141e5bc8c94d50ecfaf29a8a3571) Thanks [@sebald](https://github.com/sebald)! - refa: `<HelpText>` to RAC

- [#3423](https://github.com/marigold-ui/marigold/pull/3423) [`470d00c6d`](https://github.com/marigold-ui/marigold/commit/470d00c6d6be571d6fc9cb82cde7f4756b360b83) Thanks [@sebald](https://github.com/sebald)! - fix: add gap in checkbox group

- [#3425](https://github.com/marigold-ui/marigold/pull/3425) [`4be30b28a`](https://github.com/marigold-ui/marigold/commit/4be30b28a7bd64807c28bc8371d9162f922905f6) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: numberfield width

- Updated dependencies [[`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd), [`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56), [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9)]:
  - @marigold/system@6.4.0
  - @marigold/types@1.1.0
  - @marigold/icons@1.2.18

## 6.3.1

### Patch Changes

- [#3402](https://github.com/marigold-ui/marigold/pull/3402) [`d8b3cca2d`](https://github.com/marigold-ui/marigold/commit/d8b3cca2dfe5ff199c5045c1e77cec7d6384c725) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DST-222]: Select width by item

- Updated dependencies []:
  - @marigold/system@6.3.1
  - @marigold/icons@1.2.17

## 6.3.0

### Minor Changes

- [#3383](https://github.com/marigold-ui/marigold/pull/3383) [`958477f43`](https://github.com/marigold-ui/marigold/commit/958477f43da2b599430d4bb91470673b8cf04608) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: remove className prop from all components

### Patch Changes

- [#3394](https://github.com/marigold-ui/marigold/pull/3394) [`ea9db88fd`](https://github.com/marigold-ui/marigold/commit/ea9db88fdee91e3e9d912f58ae7a99e90633fa42) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: width props for switch and slider

- Updated dependencies []:
  - @marigold/system@6.3.0
  - @marigold/icons@1.2.16

## 6.2.6

### Patch Changes

- [#3366](https://github.com/marigold-ui/marigold/pull/3366) [`1d305f963`](https://github.com/marigold-ui/marigold/commit/1d305f963af96b5ad7b087dbd3365550e2eaae6b) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: allow width on datepicker

- Updated dependencies []:
  - @marigold/system@6.2.6
  - @marigold/icons@1.2.15

## 6.2.5

### Patch Changes

- [#3331](https://github.com/marigold-ui/marigold/pull/3331) [`b9e1d147a`](https://github.com/marigold-ui/marigold/commit/b9e1d147a0ab61393ba4704dc4bef6fce70fe854) Thanks [@sebald](https://github.com/sebald)! - fix: correctly apply spacing in `<Inset>`

- [#3339](https://github.com/marigold-ui/marigold/pull/3339) [`581702881`](https://github.com/marigold-ui/marigold/commit/5817028810f503d941be93b66e63ea545c4f17c3) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add `<Card>` size to b2b theme

- Updated dependencies []:
  - @marigold/system@6.2.5
  - @marigold/icons@1.2.14

## 6.2.4

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.2.4
  - @marigold/icons@1.2.13

## 6.2.3

### Patch Changes

- [#3273](https://github.com/marigold-ui/marigold/pull/3273) [`f7c475053`](https://github.com/marigold-ui/marigold/commit/f7c4750533aadc9119e2dfb4bb5745cb56684a86) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies []:
  - @marigold/system@6.2.3
  - @marigold/icons@1.2.12

## 6.2.2

### Patch Changes

- [`46e86e2b3`](https://github.com/marigold-ui/marigold/commit/46e86e2b3969a4c95c9e49c202e922bfc22d28a2) Thanks [@sebald](https://github.com/sebald)! - fix: Resolve conflicting type dependencies in `react-aria`

- Updated dependencies []:
  - @marigold/system@6.2.2
  - @marigold/icons@1.2.11

## 6.2.1

### Patch Changes

- [#3314](https://github.com/marigold-ui/marigold/pull/3314) [`a5515f34b`](https://github.com/marigold-ui/marigold/commit/a5515f34b35e3c4677daf05d36a2ac1f2a45cfb4) Thanks [@sarahgm](https://github.com/sarahgm)! - change jsx compiler option to react-jsx

- Updated dependencies []:
  - @marigold/system@6.2.1
  - @marigold/icons@1.2.10

## 6.2.0

### Minor Changes

- [#3293](https://github.com/marigold-ui/marigold/pull/3293) [`3eba5fdd4`](https://github.com/marigold-ui/marigold/commit/3eba5fdd4dac255923b1063be8731c0e5924023f) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - fix with for checkbox in multi-select tables

### Patch Changes

- [#3311](https://github.com/marigold-ui/marigold/pull/3311) [`6329c32ac`](https://github.com/marigold-ui/marigold/commit/6329c32acb34ff963c0afbd85a76e7a788db45c8) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-96]: Improve sorting table

- Updated dependencies []:
  - @marigold/system@6.2.0
  - @marigold/icons@1.2.9

## 6.1.0

### Minor Changes

- [#3270](https://github.com/marigold-ui/marigold/pull/3270) [`c2629d7c8`](https://github.com/marigold-ui/marigold/commit/c2629d7c88ee5870ba78361bbfb4db11c8c1af48) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding option to specify table column width

- [#3250](https://github.com/marigold-ui/marigold/pull/3250) [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-111]: enhance styling tabs

- [#3268](https://github.com/marigold-ui/marigold/pull/3268) [`c61999892`](https://github.com/marigold-ui/marigold/commit/c619998923fec65d099c1a16b1d5d22601e97d22) Thanks [@sebald](https://github.com/sebald)! - feat: checkbox adheres labelwidth when inside `<FieldGroup>`

### Patch Changes

- Updated dependencies [[`566ec30e4`](https://github.com/marigold-ui/marigold/commit/566ec30e43454719b05adc3d3ca3864887280546), [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da), [`8a4ef1805`](https://github.com/marigold-ui/marigold/commit/8a4ef1805a57a878f2f050c5523af2f921111bfd)]:
  - @marigold/system@6.1.0
  - @marigold/icons@1.2.8

## 6.0.1

### Patch Changes

- [#3232](https://github.com/marigold-ui/marigold/pull/3232) [`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-65]: Spacing of Popover can me customized based on themes

- Updated dependencies [[`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22)]:
  - @marigold/system@6.0.1
  - @marigold/icons@1.2.7

## 6.0.0

### Major Changes

- [#3117](https://github.com/marigold-ui/marigold/pull/3117) [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa) Thanks [@sebald](https://github.com/sebald)! - Switch @marigold/styles to Tailwind CSS, replaces Emotion CSS & Theme-UI

### Patch Changes

- [#3227](https://github.com/marigold-ui/marigold/pull/3227) [`54416dc6c`](https://github.com/marigold-ui/marigold/commit/54416dc6c87a8de39893a23678d716553a0d991c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: unify switch api

- [#3137](https://github.com/marigold-ui/marigold/pull/3137) [`1d0fd2ac5`](https://github.com/marigold-ui/marigold/commit/1d0fd2ac5e45a9a05ef311fc811b9e6049535641) Thanks [@sebald](https://github.com/sebald)! - fix: `<Text>` component doesn't enforce defaults

- [#3229](https://github.com/marigold-ui/marigold/pull/3229) [`7b7348f30`](https://github.com/marigold-ui/marigold/commit/7b7348f30f62662ccb86930ac4bf65ef063d2065) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-60]: change depricated API

- [#3092](https://github.com/marigold-ui/marigold/pull/3092) [`44dd7408a`](https://github.com/marigold-ui/marigold/commit/44dd7408a27dc5031598ebbd818e911981b8c9d3) Thanks [@renovate](https://github.com/apps/renovate)! - Update `react-aria`

- [#3003](https://github.com/marigold-ui/marigold/pull/3003) [`9082cfe4f`](https://github.com/marigold-ui/marigold/commit/9082cfe4fd8d9cd848c185041dabcec46622822b) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies [[`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa)]:
  - @marigold/system@6.0.0
  - @marigold/icons@1.2.6

## 5.6.0

### Minor Changes

- [#2947](https://github.com/marigold-ui/marigold/pull/2947) [`a35f82a13`](https://github.com/marigold-ui/marigold/commit/a35f82a13cbdf278cca526904ba0baaf87c30442) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Releasing DateField component

- [#2953](https://github.com/marigold-ui/marigold/pull/2953) [`992d76d1b`](https://github.com/marigold-ui/marigold/commit/992d76d1b343bf8bb0be4919b0a26f9f71d0307b) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Introducing DateField component

- [#2912](https://github.com/marigold-ui/marigold/pull/2912) [`3fbeb7b17`](https://github.com/marigold-ui/marigold/commit/3fbeb7b17b704813bb1218b04d781773e1d1dc92) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Introducing Tabs component

- [#2951](https://github.com/marigold-ui/marigold/pull/2951) [`fc5411f39`](https://github.com/marigold-ui/marigold/commit/fc5411f39449664f375ea68526ccecc396c4a6ed) Thanks [@aromko](https://github.com/aromko)! - feat: Add tag group component `<Tag/>` + `<Tag.Group/>`

- [#2932](https://github.com/marigold-ui/marigold/pull/2932) [`85039a29c`](https://github.com/marigold-ui/marigold/commit/85039a29c59ba178005bed6e3c8f2b53753feecb) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Introducing Calendar component

- [#2955](https://github.com/marigold-ui/marigold/pull/2955) [`e285e0c94`](https://github.com/marigold-ui/marigold/commit/e285e0c942622b34d58c32799647ec2707c712d5) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding New ComboBox Component

### Patch Changes

- [#2928](https://github.com/marigold-ui/marigold/pull/2928) [`dc791efab`](https://github.com/marigold-ui/marigold/commit/dc791efabc696c7fdf1e3cd336860962b150c0df) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies []:
  - @marigold/system@5.6.0
  - @marigold/icons@1.2.5

## 5.5.0

### Minor Changes

- [#2915](https://github.com/marigold-ui/marigold/pull/2915) [`4c2cd1b45`](https://github.com/marigold-ui/marigold/commit/4c2cd1b451a7987813e8e65ad6fa118a73359285) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: new Accordion Component

- [#2921](https://github.com/marigold-ui/marigold/pull/2921) [`b07dab50c`](https://github.com/marigold-ui/marigold/commit/b07dab50c134a612061ccf8ef51f9aa332437e53) Thanks [@sebald](https://github.com/sebald)! - feat: let the `<Body>` flex 💪

- [#2920](https://github.com/marigold-ui/marigold/pull/2920) [`a56d83788`](https://github.com/marigold-ui/marigold/commit/a56d8378858cd75b42babc280ba19a446acfa2c0) Thanks [@sebald](https://github.com/sebald)! - feat: `<Card>` is no a flex col by default + configure gap via `space` prop

### Patch Changes

- [#2877](https://github.com/marigold-ui/marigold/pull/2877) [`862963f54`](https://github.com/marigold-ui/marigold/commit/862963f541fd57d2eaab03b1e9111c59241ffda6) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - feat: added menu section

- Updated dependencies []:
  - @marigold/system@5.5.0
  - @marigold/icons@1.2.4

## 5.4.0

### Minor Changes

- [#2892](https://github.com/marigold-ui/marigold/pull/2892) [`aaff48559`](https://github.com/marigold-ui/marigold/commit/aaff485594d34f878217f5906f7ee69e7f66c8f2) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add fontStyle to `<Text>` component

### Patch Changes

- [#2894](https://github.com/marigold-ui/marigold/pull/2894) [`b3d577339`](https://github.com/marigold-ui/marigold/commit/b3d577339e16e73185d2fb80707479ce689e7f7f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.29

- Updated dependencies [[`b3d577339`](https://github.com/marigold-ui/marigold/commit/b3d577339e16e73185d2fb80707479ce689e7f7f), [`8972cbaca`](https://github.com/marigold-ui/marigold/commit/8972cbaca29ccce9c17a15b772ab0c7a3e921d20)]:
  - @marigold/types@1.0.1
  - @marigold/system@5.4.0
  - @marigold/icons@1.2.3

## 5.3.0

### Minor Changes

- [#2826](https://github.com/marigold-ui/marigold/pull/2826) [`aaf6b55c6`](https://github.com/marigold-ui/marigold/commit/aaf6b55c6c2b07f7baea9e7af1cab69e70c333e8) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Improved `<Input>` with icons/actions

- [#2846](https://github.com/marigold-ui/marigold/pull/2846) [`3a766be9d`](https://github.com/marigold-ui/marigold/commit/3a766be9d83219e3295962cfc08d43c0e2556101) Thanks [@sebald](https://github.com/sebald)! - feat: Styles for `<Autocomplete>`

### Patch Changes

- [#2816](https://github.com/marigold-ui/marigold/pull/2816) [`cda6ac809`](https://github.com/marigold-ui/marigold/commit/cda6ac80984059035ec315481685dce1dbc6cc79) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies [[`aaf6b55c6`](https://github.com/marigold-ui/marigold/commit/aaf6b55c6c2b07f7baea9e7af1cab69e70c333e8), [`80cdbe062`](https://github.com/marigold-ui/marigold/commit/80cdbe062445b6c4b8073cb72976ce9ce4bcefb1)]:
  - @marigold/system@5.3.0
  - @marigold/icons@1.2.2

## 5.2.0

### Minor Changes

- [#2807](https://github.com/marigold-ui/marigold/pull/2807) [`f9175829d`](https://github.com/marigold-ui/marigold/commit/f9175829db6ab268a6c9620430a99a69d0d57c7c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: update storybook to version 7 + fix coverage

- [#2824](https://github.com/marigold-ui/marigold/pull/2824) [`33329ace2`](https://github.com/marigold-ui/marigold/commit/33329ace2711b139938af05006ed6f00a65f6b99) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: refa `<Input>` and `<Input.Field>` components and support icons

- [#2805](https://github.com/marigold-ui/marigold/pull/2805) [`c0609c0b3`](https://github.com/marigold-ui/marigold/commit/c0609c0b32bb8075fdeacf88f9c6ce5d8fdf781e) Thanks [@sebald](https://github.com/sebald)! - feat: introduce `<Inset>` component

### Patch Changes

- Updated dependencies [[`f11e2d7db`](https://github.com/marigold-ui/marigold/commit/f11e2d7dbb3d6b4ee4b8651f48b52736f64fd778)]:
  - @marigold/system@5.2.0
  - @marigold/icons@1.2.1

## 5.1.0

### Patch Changes

- Updated dependencies [[`f5ec10d93`](https://github.com/marigold-ui/marigold/commit/f5ec10d93112677b9a5b1c6f41a4b334591f8544), [`6d7d6f621`](https://github.com/marigold-ui/marigold/commit/6d7d6f621788dc42aadd2f38aa90abfdb9438364)]:
  - @marigold/icons@1.2.0
  - @marigold/system@5.1.0

## 5.0.0

### Major Changes

- [#2764](https://github.com/marigold-ui/marigold/pull/2764) [`1ff29cc0c`](https://github.com/marigold-ui/marigold/commit/1ff29cc0ca5416eed14b54d0dda8ec1aad762cda) Thanks [@sebald](https://github.com/sebald)! - refa: fix polymorph types + remove style props from `<Box>`

  **BREAKING CHANGE:**

  We deprecated the available short hands for styling on the `<Box>` component (also known as style props), for example `<Box p="small">`. This way it is more clear what to use when ->`always the`css` prop.

  _How to update your code:_ Basically move all style props to the `css` prop. E.g. `<Box p="small" bg="primary">` becomes `<Box css={{ p: "small, bg; "primary" }}>`.

- [#2740](https://github.com/marigold-ui/marigold/pull/2740) [`7a61d39f4`](https://github.com/marigold-ui/marigold/commit/7a61d39f4c34981cc57b13fdaef2bc73f201dc5c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: rename onSelect to onAction in Menu component

- [#2733](https://github.com/marigold-ui/marigold/pull/2733) [`9cb030c11`](https://github.com/marigold-ui/marigold/commit/9cb030c111f05f4dadc339f4f9fafe6591d2cd0b) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: change prop onSelectionChange to onChange for select component

### Minor Changes

- [#2766](https://github.com/marigold-ui/marigold/pull/2766) [`6d9b36b6a`](https://github.com/marigold-ui/marigold/commit/6d9b36b6af7f8a82072485216612a9500da3ba33) Thanks [@sebald](https://github.com/sebald)! - feat: add `open` prop to `Dialog.Controller`

- [#2760](https://github.com/marigold-ui/marigold/pull/2760) [`fafc52cbb`](https://github.com/marigold-ui/marigold/commit/fafc52cbbbc48613a7bec52727664414c3f6b9d1) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: Allow `<Dialog>` to be controlled via `<Dialog.Controller‚>`

- [#2759](https://github.com/marigold-ui/marigold/pull/2759) [`596b7b901`](https://github.com/marigold-ui/marigold/commit/596b7b9015dd32cd19a78ef2bc5e39fefa3e26ff) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: update Menu.Trigger with open and onOpenChange property

### Patch Changes

- [#2741](https://github.com/marigold-ui/marigold/pull/2741) [`f65487486`](https://github.com/marigold-ui/marigold/commit/f65487486ef6849bc9850f5c13bc56ae7fe02b1f) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add `<ActionMenu>` Component with dots

- [#2756](https://github.com/marigold-ui/marigold/pull/2756) [`f9f71ed9d`](https://github.com/marigold-ui/marigold/commit/f9f71ed9d252f046e2c54d2614c683f62eb83afc) Thanks [@sebald](https://github.com/sebald)! - fix: `<Link>` whitespace

- [#2726](https://github.com/marigold-ui/marigold/pull/2726) [`0f539b788`](https://github.com/marigold-ui/marigold/commit/0f539b788a72654e834c374810ef677c307fdadb) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.27

- Updated dependencies [[`1ff29cc0c`](https://github.com/marigold-ui/marigold/commit/1ff29cc0ca5416eed14b54d0dda8ec1aad762cda), [`0f539b788`](https://github.com/marigold-ui/marigold/commit/0f539b788a72654e834c374810ef677c307fdadb)]:
  - @marigold/system@5.0.0
  - @marigold/types@1.0.0
  - @marigold/icons@1.1.17

## 4.2.2

### Patch Changes

- [#2714](https://github.com/marigold-ui/marigold/pull/2714) [`55c7cd7e`](https://github.com/marigold-ui/marigold/commit/55c7cd7e3a5397f8845f9928c15d85e1bc418d10) Thanks [@benediktgrether](https://github.com/benediktgrether)! - fix: set max-height to ul instead of div

- [#2699](https://github.com/marigold-ui/marigold/pull/2699) [`c9725e77`](https://github.com/marigold-ui/marigold/commit/c9725e77025f8b2d750f0ecd71b4088e5db98691) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies []:
  - @marigold/icons@1.1.16
  - @marigold/system@4.2.2
  - @marigold/tokens@3.1.0

## 4.2.1

### Patch Changes

- [#2694](https://github.com/marigold-ui/marigold/pull/2694) [`c7b919a3`](https://github.com/marigold-ui/marigold/commit/c7b919a334f6f5b0240361a7e6ce805650ca8d01) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix on pointer event for menu and select

- Updated dependencies []:
  - @marigold/system@4.2.1
  - @marigold/icons@1.1.15

## 4.2.0

### Minor Changes

- [#2688](https://github.com/marigold-ui/marigold/pull/2688) [`1bfe10cf`](https://github.com/marigold-ui/marigold/commit/1bfe10cf7ec08136ca67e23a2dc2e97f9c027e59) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: add `<Fieldbase>` to `<RadioGroup>` and `<CheckboxGroup>` to support errorMessage and helptext

### Patch Changes

- [#2689](https://github.com/marigold-ui/marigold/pull/2689) [`8675c5f2`](https://github.com/marigold-ui/marigold/commit/8675c5f2d609cddceff7661c2e6d173655adc813) Thanks [@benediktgrether](https://github.com/benediktgrether)! - fix: add in FieldBase component position relative to fix position absolute bug in HiddenSelect component

- [#2683](https://github.com/marigold-ui/marigold/pull/2683) [`7be11c1a`](https://github.com/marigold-ui/marigold/commit/7be11c1a8ba6bca9ac651da75569234b443fcae5) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: add `<Tray>` for responsiveness in `<Menu>` and `<Select>`

- [#2684](https://github.com/marigold-ui/marigold/pull/2684) [`14463546`](https://github.com/marigold-ui/marigold/commit/144635460ee4c0eb44e1ce9d2cf12709262dc6e6) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: removed icon dependency from @marigold/components

- [#2686](https://github.com/marigold-ui/marigold/pull/2686) [`bb0dea93`](https://github.com/marigold-ui/marigold/commit/bb0dea93c6c24e5271f18ceddc3699d07a53b56a) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: required label

- [#2687](https://github.com/marigold-ui/marigold/pull/2687) [`7954ba24`](https://github.com/marigold-ui/marigold/commit/7954ba241a8ca3bc048177aa32c1fb0f3dd77a9c) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: `<Radio>` tabs in default selected value instead of first

- Updated dependencies []:
  - @marigold/system@4.2.0
  - @marigold/icons@1.1.14

## 4.1.5

### Patch Changes

- [#2674](https://github.com/marigold-ui/marigold/pull/2674) [`832da2a6`](https://github.com/marigold-ui/marigold/commit/832da2a69f9bad5adcbcc57cba3cb215dfaa51e2) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: refactoring Popover with usePopover

- Updated dependencies [[`832da2a6`](https://github.com/marigold-ui/marigold/commit/832da2a69f9bad5adcbcc57cba3cb215dfaa51e2)]:
  - @marigold/types@0.5.7
  - @marigold/icons@1.1.13
  - @marigold/system@4.1.5
  - @marigold/tokens@3.1.0

## 4.1.4

### Patch Changes

- Updated dependencies []:
  - @marigold/system@4.1.4
  - @marigold/icons@1.1.12

## 4.1.3

### Patch Changes

- Updated dependencies []:
  - @marigold/system@4.1.3
  - @marigold/icons@1.1.11

## 4.1.2

### Patch Changes

- Updated dependencies [[`fcc320db`](https://github.com/marigold-ui/marigold/commit/fcc320dba298105f5afa11fba624ee7eb50a78c1), [`de5df9b6`](https://github.com/marigold-ui/marigold/commit/de5df9b649d2b8ddc840846e83efa7a33d1d8a5e)]:
  - @marigold/icons@1.1.10
  - @marigold/system@4.1.2

## 4.1.1

### Patch Changes

- [#2655](https://github.com/marigold-ui/marigold/pull/2655) [`0208fb01`](https://github.com/marigold-ui/marigold/commit/0208fb0111f44ed2de78098c1cf4757a55302048) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix fieldbase width

- Updated dependencies []:
  - @marigold/system@4.1.1
  - @marigold/icons@1.1.9

## 4.1.0

### Minor Changes

- [#2647](https://github.com/marigold-ui/marigold/pull/2647) [`f764d3a0`](https://github.com/marigold-ui/marigold/commit/f764d3a080f075fe4e9b0cea30ded53a460689b4) Thanks [@sebald](https://github.com/sebald)! - feat: add `fontWeight` style prop to `<Text>` component

- [#2576](https://github.com/marigold-ui/marigold/pull/2576) [`7a9129c1`](https://github.com/marigold-ui/marigold/commit/7a9129c1c2d2ada75fa5cd793874ab0b7db8d48b) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: add side property to label

### Patch Changes

- [#2652](https://github.com/marigold-ui/marigold/pull/2652) [`40aeefd7`](https://github.com/marigold-ui/marigold/commit/40aeefd704e4ac23b36cb83ade928b19bdaf68c0) Thanks [@sebald](https://github.com/sebald)! - feat: Improve `<Message>` look

- [#2651](https://github.com/marigold-ui/marigold/pull/2651) [`2e98753d`](https://github.com/marigold-ui/marigold/commit/2e98753d80af8a00a2b8c9adb0d3e08ee631ea4b) Thanks [@sebald](https://github.com/sebald)! - fix: `<Menu>` width is adjusted by its content not the trigger

- [#2643](https://github.com/marigold-ui/marigold/pull/2643) [`473ae72b`](https://github.com/marigold-ui/marigold/commit/473ae72bc5ea11c8092a613b76500140f78cd12f) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- [#2619](https://github.com/marigold-ui/marigold/pull/2619) [`727460fc`](https://github.com/marigold-ui/marigold/commit/727460fcd2dce035b18a539512ecf89f1ab7a11b) Thanks [@sebald](https://github.com/sebald)! - fix: set `<Switch>` width in flex so it doesn't shrink below a certain threshold

- Updated dependencies [[`312a23cf`](https://github.com/marigold-ui/marigold/commit/312a23cf95352beba4b2798a479fa9e0cdbfa20a), [`080b1fed`](https://github.com/marigold-ui/marigold/commit/080b1fedc582511e0155a9199aa3b2b995cfb609), [`d250fc00`](https://github.com/marigold-ui/marigold/commit/d250fc0041f2beca498107d3e60e2d50e9ffb293)]:
  - @marigold/system@4.1.0
  - @marigold/types@0.5.6
  - @marigold/icons@1.1.8

## 4.0.0

### Major Changes

- [#2610](https://github.com/marigold-ui/marigold/pull/2610) [`eb35da96`](https://github.com/marigold-ui/marigold/commit/eb35da96a52dc4b2b47d57ea115897bd7ee3bc69) Thanks [@sebald](https://github.com/sebald)! - feat: `<Tiles>` can now be used as a grid with fixed widths or fully respsonsive.

  BREAKING CHANGE: Renamed the whole API. Please checkout the documentation at https://marigold-ui.io/components/tiles/#props

### Patch Changes

- [#2607](https://github.com/marigold-ui/marigold/pull/2607) [`41f60e3d`](https://github.com/marigold-ui/marigold/commit/41f60e3d3c95a21e4a3a1a167905270d6f5dc966) Thanks [@benediktgrether](https://github.com/benediktgrether)! - fix: add missing values for one point and set begin of first dot to 0.0s

- [#2612](https://github.com/marigold-ui/marigold/pull/2612) [`31e1219d`](https://github.com/marigold-ui/marigold/commit/31e1219dd684fde238aac17ef00c68cf7e458519) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add hover color and flex property

- Updated dependencies [[`02bd8efe`](https://github.com/marigold-ui/marigold/commit/02bd8efe1a5660910338a9f2cba39cc061588793), [`be3f2060`](https://github.com/marigold-ui/marigold/commit/be3f20600b195f62d8d5bc1b784329d7bf152d9a), [`f38ae20a`](https://github.com/marigold-ui/marigold/commit/f38ae20a23badf8cf141f582f0c20d85fdd6534b), [`4554b26e`](https://github.com/marigold-ui/marigold/commit/4554b26ef49986d2ebf457cc000284db5d8d85e8)]:
  - @marigold/icons@1.1.7
  - @marigold/system@4.0.0
  - @marigold/types@0.5.5

## 3.0.6

### Patch Changes

- Updated dependencies [[`d8fc387d`](https://github.com/marigold-ui/marigold/commit/d8fc387df8ce1afef229bc421ed5cee114e24190)]:
  - @marigold/system@3.0.6
  - @marigold/icons@1.1.6

## 3.0.5

### Patch Changes

- [#2575](https://github.com/marigold-ui/marigold/pull/2575) [`0441cd20`](https://github.com/marigold-ui/marigold/commit/0441cd20fcdfc1964b8854ae8910e52586b85a4a) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: `<XLoader>` component for loading states

- Updated dependencies []:
  - @marigold/system@3.0.5
  - @marigold/icons@1.1.5

## 3.0.4

### Patch Changes

- [#2564](https://github.com/marigold-ui/marigold/pull/2564) [`09745fca`](https://github.com/marigold-ui/marigold/commit/09745fca3b285b88c11e129a4a34d5efef71a703) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add card, text style for core

- [#2569](https://github.com/marigold-ui/marigold/pull/2569) [`b20b0111`](https://github.com/marigold-ui/marigold/commit/b20b0111d645939b6210fad8b43690964186cd9c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add gridAutoRows to `<Tiles>`

- [#2568](https://github.com/marigold-ui/marigold/pull/2568) [`51a95328`](https://github.com/marigold-ui/marigold/commit/51a95328331aa5d3f6d334ef3b205d6b70bf8f0f) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: improve headline with align and color property

- Updated dependencies []:
  - @marigold/system@3.0.4
  - @marigold/icons@1.1.4

## 3.0.3

### Patch Changes

- [#2561](https://github.com/marigold-ui/marigold/pull/2561) [`04c7f2eb`](https://github.com/marigold-ui/marigold/commit/04c7f2eb3d52b3eebf755a58f6df2559c0acb3cd) Thanks [@sebald](https://github.com/sebald)! - fix: `<Table>` stretch works as expected

- [#2562](https://github.com/marigold-ui/marigold/pull/2562) [`74d47ba2`](https://github.com/marigold-ui/marigold/commit/74d47ba2ac4d28147c5052ffff9c7a287c001f2c) Thanks [@sebald](https://github.com/sebald)! - fix: `<Select>` chevron

- Updated dependencies []:
  - @marigold/system@3.0.3
  - @marigold/icons@1.1.3

## 3.0.2

### Patch Changes

- [#2560](https://github.com/marigold-ui/marigold/pull/2560) [`7368d457`](https://github.com/marigold-ui/marigold/commit/7368d457bf62dcd3fd99a95123fb4229a078982a) Thanks [@sebald](https://github.com/sebald)! - fix: allow `<NumberField>` with little width

- [#2551](https://github.com/marigold-ui/marigold/pull/2551) [`d9974f91`](https://github.com/marigold-ui/marigold/commit/d9974f91b03531ac46715a4cf85965141ee64dfd) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: improve core theme

- Updated dependencies [[`e65171c6`](https://github.com/marigold-ui/marigold/commit/e65171c6b30f0091491a7e0394e5ddafc0d72bf4), [`d9974f91`](https://github.com/marigold-ui/marigold/commit/d9974f91b03531ac46715a4cf85965141ee64dfd)]:
  - @marigold/system@3.0.2
  - @marigold/icons@1.1.2

## 3.0.1

### Patch Changes

- [#2510](https://github.com/marigold-ui/marigold/pull/2510) [`690191b2`](https://github.com/marigold-ui/marigold/commit/690191b2cd8cbc980f5ff54a2dbc82a726782f36) Thanks [@sebald](https://github.com/sebald)! - update: @react-aria/focus

- [#2509](https://github.com/marigold-ui/marigold/pull/2509) [`fb7b1b9f`](https://github.com/marigold-ui/marigold/commit/fb7b1b9fb083f48b744c3873823865d63bf3dbd5) Thanks [@benediktgrether](https://github.com/benediktgrether)! - refa: improve usage of `fit` prop

- Updated dependencies [[`4af6c016`](https://github.com/marigold-ui/marigold/commit/4af6c01618922473fa126786550fba74475bf7da), [`eb7e453c`](https://github.com/marigold-ui/marigold/commit/eb7e453c23f310d70d58514c24e8fe0d0cd375d4)]:
  - @marigold/types@0.5.4
  - @marigold/system@3.0.1
  - @marigold/icons@1.1.1

## 3.0.0

### Major Changes

- [#2463](https://github.com/marigold-ui/marigold/pull/2463) [`fcb15230`](https://github.com/marigold-ui/marigold/commit/fcb15230d4565eba65c7164ffaa042d59ad02e7a) Thanks [@sebald](https://github.com/sebald)! - refa: Improve behavior of `<Stack>` and remove option to render it as a list (use `<List>` instead)
  - `<Stack>` will no longer align items by default, since this will cause children to not take all the available space
  - `<Stack as="ul|ol">` will no longer work, we have a `<List>` comopnent for that

### Minor Changes

- [#2490](https://github.com/marigold-ui/marigold/pull/2490) [`baf5bb57`](https://github.com/marigold-ui/marigold/commit/baf5bb573b5e2f4ff273f9436657a5e38ee866ea) Thanks [@sebald](https://github.com/sebald)! - feat: `Columns` can stretch to available height via `stretch` prop + don't collapse by default

- [#2470](https://github.com/marigold-ui/marigold/pull/2470) [`7b9c90ec`](https://github.com/marigold-ui/marigold/commit/7b9c90ecff94431a807d300015940e64fe240353) Thanks [@sebald](https://github.com/sebald)! - feat: introduce `extendTheme` helper, for more information see https://marigold-ui.io/introduction/theming/#extend-an-existing-theme

### Patch Changes

- [#2458](https://github.com/marigold-ui/marigold/pull/2458) [`20aeba63`](https://github.com/marigold-ui/marigold/commit/20aeba63b2bd7dceff3cb7324764dca2c4d8842b) Thanks [@sebald](https://github.com/sebald)! - fix: style props override theme in `<Text>`

- [#2460](https://github.com/marigold-ui/marigold/pull/2460) [`4495fcb1`](https://github.com/marigold-ui/marigold/commit/4495fcb12723261c61846d30ff09597e2da56f1f) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add height prop to Breakout and refactor docs page

- [#2462](https://github.com/marigold-ui/marigold/pull/2462) [`885e3ca4`](https://github.com/marigold-ui/marigold/commit/885e3ca477a6524855f7a62cb3568fec2b561cd4) Thanks [@sebald](https://github.com/sebald)! - fix: use 'initial' for default `Container` item alignment

- [#2496](https://github.com/marigold-ui/marigold/pull/2496) [`d10bb310`](https://github.com/marigold-ui/marigold/commit/d10bb310914deaa4a5b01ade1e783ad956483021) Thanks [@benediktgrether](https://github.com/benediktgrether)! - chore: change property names in breakout to alignX and AlignY

- Updated dependencies [[`87600058`](https://github.com/marigold-ui/marigold/commit/87600058a47831759fb5a55048ce07a33c173f1b), [`a795f29a`](https://github.com/marigold-ui/marigold/commit/a795f29ae0977ab5d386cba0e12be29457f748ff)]:
  - @marigold/icons@1.1.0
  - @marigold/system@3.0.0

## 2.2.0

### Minor Changes

- [#2411](https://github.com/marigold-ui/marigold/pull/2411) [`a4ccb92f`](https://github.com/marigold-ui/marigold/commit/a4ccb92f294129dce1dd050513044dbd7bd96e28) Thanks [@sebald](https://github.com/sebald)! - feat: `css` props supports array (again) + padding props for `<Card>`

- [#2415](https://github.com/marigold-ui/marigold/pull/2415) [`d5116b5d`](https://github.com/marigold-ui/marigold/commit/d5116b5d452f337fd2873e1a514da1cd571dc72e) Thanks [@sebald](https://github.com/sebald)! - refa: Improve `<Container>` API and make it reponsive

### Patch Changes

- [#2313](https://github.com/marigold-ui/marigold/pull/2313) [`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update dependency @types/react to v18.0.19

- [#2443](https://github.com/marigold-ui/marigold/pull/2443) [`fb76bbbe`](https://github.com/marigold-ui/marigold/commit/fb76bbbe5a7bdb2d124aac6c01be0db5434d589b) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: downgrade aria-focus version

- [#2440](https://github.com/marigold-ui/marigold/pull/2440) [`515ea633`](https://github.com/marigold-ui/marigold/commit/515ea633312bf82a2f8446dd569d2765fcadaadd) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: use useLocalizedStringFormatter instead of depricated useMessage…

- [#2437](https://github.com/marigold-ui/marigold/pull/2437) [`23a78264`](https://github.com/marigold-ui/marigold/commit/23a78264cf713ebf439c264a45ff946fd58472de) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update testing (major)

- [#2412](https://github.com/marigold-ui/marigold/pull/2412) [`44723f1c`](https://github.com/marigold-ui/marigold/commit/44723f1c6123fcac429a485804b610108ce7b846) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: table scrollable

- [#2438](https://github.com/marigold-ui/marigold/pull/2438) [`535f80da`](https://github.com/marigold-ui/marigold/commit/535f80daf738c60e92855310bb96ba6ca054c19b) Thanks [@sebald](https://github.com/sebald)! - fix: `Columns` work with complex and different children types

- Updated dependencies [[`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92), [`f76f4870`](https://github.com/marigold-ui/marigold/commit/f76f48703fc03f6ceae09ff5c0b8bd60ea811564), [`23a78264`](https://github.com/marigold-ui/marigold/commit/23a78264cf713ebf439c264a45ff946fd58472de), [`a4ccb92f`](https://github.com/marigold-ui/marigold/commit/a4ccb92f294129dce1dd050513044dbd7bd96e28)]:
  - @marigold/types@0.5.3
  - @marigold/system@2.2.0
  - @marigold/icons@1.0.5

## 2.1.3

### Patch Changes

- [#2371](https://github.com/marigold-ui/marigold/pull/2371) [`7bb83042`](https://github.com/marigold-ui/marigold/commit/7bb83042e608fbff1f58498e76172174d54f8960) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix the links

- [#2399](https://github.com/marigold-ui/marigold/pull/2399) [`beea5b0b`](https://github.com/marigold-ui/marigold/commit/beea5b0bc67fe4a4c43e5d900d1cf59095b9c2fd) Thanks [@sebald](https://github.com/sebald)! - feat: Make text in non-interactive tables selectable

- [#2378](https://github.com/marigold-ui/marigold/pull/2378) [`d5fd75cb`](https://github.com/marigold-ui/marigold/commit/d5fd75cb0b83d76fece43f959fa4aa5bcdf3f4c1) Thanks [@sarahgm](https://github.com/sarahgm)! - docs: fix responsive layout and responsive table

- Updated dependencies [[`d3143f65`](https://github.com/marigold-ui/marigold/commit/d3143f65fd4dc207d21006f21078b03c6123ff62), [`f6b49c37`](https://github.com/marigold-ui/marigold/commit/f6b49c37a0293e4d060db292d22a085fcf0bbc65)]:
  - @marigold/icons@1.0.4
  - @marigold/system@2.1.3

## 2.1.2

### Patch Changes

- [#2361](https://github.com/marigold-ui/marigold/pull/2361) [`b84e6ff5`](https://github.com/marigold-ui/marigold/commit/b84e6ff56e124e2215278b11971269dba9a49bbe) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: update table with compact and expanded

- Updated dependencies [[`630d8026`](https://github.com/marigold-ui/marigold/commit/630d80269e8bdff5c2900d6366c9fe5cbdaebe5d), [`294e31e3`](https://github.com/marigold-ui/marigold/commit/294e31e3c023cebd64f17a6e8cca97d78151f674)]:
  - @marigold/icons@1.0.3
  - @marigold/system@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@2.1.1
  - @marigold/icons@1.0.2

## 2.1.0

### Minor Changes

- [#2328](https://github.com/marigold-ui/marigold/pull/2328) [`22350f02`](https://github.com/marigold-ui/marigold/commit/22350f025932c871028ea1292cb13fbb5492865e) Thanks [@sebald](https://github.com/sebald)! - feat: add `fit` and `potision` props to `<Image>`

### Patch Changes

- [#2333](https://github.com/marigold-ui/marigold/pull/2333) [`92feeafe`](https://github.com/marigold-ui/marigold/commit/92feeafe7e9de8c4b685c9ed474f193cff747bf6) Thanks [@sebald](https://github.com/sebald)! - fix: justify content in `<Button>`

* [#2326](https://github.com/marigold-ui/marigold/pull/2326) [`6e236e78`](https://github.com/marigold-ui/marigold/commit/6e236e782b33a22c1fd1a8124ea8b6eb9be9ee6e) Thanks [@sebald](https://github.com/sebald)! - fix: correctly apply read only state to `<Checkbox>`

* Updated dependencies []:
  - @marigold/system@2.1.0
  - @marigold/icons@1.0.1

## 2.0.0

### Minor Changes

- [#2289](https://github.com/marigold-ui/marigold/pull/2289) [`13695db8`](https://github.com/marigold-ui/marigold/commit/13695db8db0d057afa68e1f93ad499c1096d969a) Thanks [@sebald](https://github.com/sebald)! - feat: `<SVG>` and Icons support refs and css prop

* [#2255](https://github.com/marigold-ui/marigold/pull/2255) [`e6d18a82`](https://github.com/marigold-ui/marigold/commit/e6d18a82bc55a051b53108e5856d00a18002953d) Thanks [@sebald](https://github.com/sebald)! - feat: export `useAsyncList` and `useListData`

- [#2247](https://github.com/marigold-ui/marigold/pull/2247) [`8e9ea3da`](https://github.com/marigold-ui/marigold/commit/8e9ea3daaa0b3ea666394badabcfc3e76eba5512) Thanks [@sebald](https://github.com/sebald)! - feat: improve theme type

* [#2285](https://github.com/marigold-ui/marigold/pull/2285) [`6f3b6949`](https://github.com/marigold-ui/marigold/commit/6f3b69498f6c09506867b1f20ee3a2a77112efdc) Thanks [@sebald](https://github.com/sebald)! - feat: `<Button>` correctly pass through all native props and option to take full width

### Patch Changes

- [#2320](https://github.com/marigold-ui/marigold/pull/2320) [`6656342b`](https://github.com/marigold-ui/marigold/commit/6656342b3622e4ad7fda47d11d38035228c779bf) Thanks [@sebald](https://github.com/sebald)! - fix: remove deprecated type from `<Aside>`

* [#2319](https://github.com/marigold-ui/marigold/pull/2319) [`7a43970e`](https://github.com/marigold-ui/marigold/commit/7a43970e4c32d74754722b8a8c24117ef4888a0e) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- [#2272](https://github.com/marigold-ui/marigold/pull/2272) [`fb9df312`](https://github.com/marigold-ui/marigold/commit/fb9df312e50a5d4be27a528e339f0d2c5768324d) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update testing

- Updated dependencies [[`13695db8`](https://github.com/marigold-ui/marigold/commit/13695db8db0d057afa68e1f93ad499c1096d969a), [`32353f56`](https://github.com/marigold-ui/marigold/commit/32353f56728ddc02e8b4ec848184b7dc5e5f9d19), [`4c63400f`](https://github.com/marigold-ui/marigold/commit/4c63400fef291181f29f994c7f8a8b020772cbee), [`f4f308e4`](https://github.com/marigold-ui/marigold/commit/f4f308e4ce390cf1a4f055042498fe6787dd6879), [`8e9ea3da`](https://github.com/marigold-ui/marigold/commit/8e9ea3daaa0b3ea666394badabcfc3e76eba5512), [`406f186c`](https://github.com/marigold-ui/marigold/commit/406f186c7f91cebbf3d17795361807e902a4dfab), [`88a3d4b0`](https://github.com/marigold-ui/marigold/commit/88a3d4b030e67e46a4af429b01a884195601b7a2), [`997ccfc1`](https://github.com/marigold-ui/marigold/commit/997ccfc1814a87b9f6b8b4f3716c88ec47554da2)]:
  - @marigold/icons@1.0.0
  - @marigold/tokens@3.1.0
  - @marigold/system@2.0.0

## 1.3.0

### Minor Changes

- [#2236](https://github.com/marigold-ui/marigold/pull/2236) [`a5b7e876`](https://github.com/marigold-ui/marigold/commit/a5b7e876c3a70351fc7fac889af9f89a1ab25f8c) Thanks [@sebald](https://github.com/sebald)! - feat: improve styling options of `<List>`

* [#2209](https://github.com/marigold-ui/marigold/pull/2209) [`c346ef60`](https://github.com/marigold-ui/marigold/commit/c346ef60aa4d64e66645ef5966fdf327a1d8337e) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: support forwarding refs in `<Link>`

- [#2233](https://github.com/marigold-ui/marigold/pull/2233) [`3adfdeea`](https://github.com/marigold-ui/marigold/commit/3adfdeea7bb962b1d4241b4d05b8ff51fa65b584) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `<List>` component

### Patch Changes

- [#2211](https://github.com/marigold-ui/marigold/pull/2211) [`527b222f`](https://github.com/marigold-ui/marigold/commit/527b222f1776c30ffb887c72cef2c58b2392309c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: next link component

- Updated dependencies [[`c60f8527`](https://github.com/marigold-ui/marigold/commit/c60f8527cc4d61c3b7d8eeb2ec29a0cd7679e8dc)]:
  - @marigold/system@1.3.0
  - @marigold/icons@0.7.7

## 1.2.2

### Patch Changes

- [#2177](https://github.com/marigold-ui/marigold/pull/2177) [`51132dd8`](https://github.com/marigold-ui/marigold/commit/51132dd83ead1b5b5a89b1281ba1a2c2d4e17f04) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies []:
  - @marigold/system@1.2.2
  - @marigold/icons@0.7.6

## 1.2.1

### Patch Changes

- [#2164](https://github.com/marigold-ui/marigold/pull/2164) [`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: update to React 18

- Updated dependencies [[`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f)]:
  - @marigold/icons@0.7.5
  - @marigold/system@1.2.1
  - @marigold/types@0.5.2

## 1.2.0

### Minor Changes

- [#2147](https://github.com/marigold-ui/marigold/pull/2147) [`2e688960`](https://github.com/marigold-ui/marigold/commit/2e6889600f9c2e50e58e928e09dadd61c5488fd8) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<FieldText>`

* [#2151](https://github.com/marigold-ui/marigold/pull/2151) [`1e512a48`](https://github.com/marigold-ui/marigold/commit/1e512a480bd9784525241fef7874c9e37c67d3e8) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Slider>`

- [#2144](https://github.com/marigold-ui/marigold/pull/2144) [`82c376a9`](https://github.com/marigold-ui/marigold/commit/82c376a9c34c69104456e6e356231132f53c3efe) Thanks [@sebald](https://github.com/sebald)! - feat: Improve usage of Marigold when not used as a full page app

* [#2149](https://github.com/marigold-ui/marigold/pull/2149) [`1a0070a4`](https://github.com/marigold-ui/marigold/commit/1a0070a437304cb0ebc9a2a0e30082ba8deee821) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Radio>`

- [#2148](https://github.com/marigold-ui/marigold/pull/2148) [`33c54b37`](https://github.com/marigold-ui/marigold/commit/33c54b37cd96b232c2f81a38af64143be4b02283) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<TextArea>`

* [#2150](https://github.com/marigold-ui/marigold/pull/2150) [`8f3c3e1b`](https://github.com/marigold-ui/marigold/commit/8f3c3e1b92eed5e432667ae8dae0a5f26a6dea3f) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Select>`

- [#2146](https://github.com/marigold-ui/marigold/pull/2146) [`9e6e0671`](https://github.com/marigold-ui/marigold/commit/9e6e0671908491566ac9d5a2f1f316145e7c2d6a) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref of `<Checkbox>`

### Patch Changes

- [#2152](https://github.com/marigold-ui/marigold/pull/2152) [`8980b645`](https://github.com/marigold-ui/marigold/commit/8980b64518f792c837776aea817e422ea0e3d658) Thanks [@sebald](https://github.com/sebald)! - feat: forward ref for `<Switch>`

- Updated dependencies [[`82c376a9`](https://github.com/marigold-ui/marigold/commit/82c376a9c34c69104456e6e356231132f53c3efe)]:
  - @marigold/system@1.2.0
  - @marigold/icons@0.7.4

## 1.1.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@1.1.1
  - @marigold/icons@0.7.3

## 1.1.0

### Minor Changes

- [#2106](https://github.com/marigold-ui/marigold/pull/2106) [`d0b3abfe`](https://github.com/marigold-ui/marigold/commit/d0b3abfe218e7b6d8b0d943836b4b17c0551a785) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `<Split>` component for `<Inline>` and `<Stack>`

* [#2116](https://github.com/marigold-ui/marigold/pull/2116) [`16f1459c`](https://github.com/marigold-ui/marigold/commit/16f1459c9bc19402b960fe8edb8662b632b1e583) Thanks [@sebald](https://github.com/sebald)! - feat: Add option to stretch `<Table>`

### Patch Changes

- [#2113](https://github.com/marigold-ui/marigold/pull/2113) [`5a32c4b4`](https://github.com/marigold-ui/marigold/commit/5a32c4b49482c961f93f0db74cfbdf083329ba1e) Thanks [@sebald](https://github.com/sebald)! - feat: Show sorting in `<Table>`

- Updated dependencies []:
  - @marigold/system@1.1.0
  - @marigold/icons@0.7.2

## 1.0.1

### Patch Changes

- [#2103](https://github.com/marigold-ui/marigold/pull/2103) [`68921616`](https://github.com/marigold-ui/marigold/commit/6892161681c8673dd94af8bbd4312f73a125cc68) Thanks [@sebald](https://github.com/sebald)! - fix: `Textarea` allows to set rows via prop

* [#2101](https://github.com/marigold-ui/marigold/pull/2101) [`52fdb7d2`](https://github.com/marigold-ui/marigold/commit/52fdb7d2d5ebf220b1800e639693276af62eb70e) Thanks [@sebald](https://github.com/sebald)! - fix: add `size` prop to `<Image>`

- [#2102](https://github.com/marigold-ui/marigold/pull/2102) [`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350) Thanks [@sebald](https://github.com/sebald)! - feat: Remove all occurances of `React.FC`

- Updated dependencies [[`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350), [`bfa0caea`](https://github.com/marigold-ui/marigold/commit/bfa0caeac9fdb817ceed7ee30dbcce0819460f30)]:
  - @marigold/system@1.0.1
  - @marigold/types@0.5.1
  - @marigold/icons@0.7.1

## 1.0.0

### Major Changes

- [#2096](https://github.com/marigold-ui/marigold/pull/2096) [`a41bb8a3`](https://github.com/marigold-ui/marigold/commit/a41bb8a39ace6006bfc2351f6d4649305bc1d286) Thanks [@sebald](https://github.com/sebald)! - feat: `<Stack>` can align on x and y axis

* [#2081](https://github.com/marigold-ui/marigold/pull/2081) [`93429e12`](https://github.com/marigold-ui/marigold/commit/93429e12e1f31c85fec0d92efd2a7b0013809b41) Thanks [@sebald](https://github.com/sebald)! - refa: separate selection/regular cell + use `<Checkbox>`

- [#2053](https://github.com/marigold-ui/marigold/pull/2053) [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255) Thanks [@sebald](https://github.com/sebald)! - refa: `<Dialog>`

* [#2054](https://github.com/marigold-ui/marigold/pull/2054) [`3c86c3b7`](https://github.com/marigold-ui/marigold/commit/3c86c3b7399a525c2743a1a42b806f862b050cd3) Thanks [@sebald](https://github.com/sebald)! - refa: Move &lt;Label&gt; and &lt;HelpText&gt; to components root

- [#2069](https://github.com/marigold-ui/marigold/pull/2069) [`c35afcf2`](https://github.com/marigold-ui/marigold/commit/c35afcf21c10bb043041e56e91f954efc2083eff) Thanks [@sebald](https://github.com/sebald)! - refa: `<Tooltip>`
  - with arrow pointer yay!
  - allows to change placement
  - uses `useComponentStyles`

* [#2092](https://github.com/marigold-ui/marigold/pull/2092) [`4d6da0bb`](https://github.com/marigold-ui/marigold/commit/4d6da0bb8171be6a2cacaa5caea4fc1e11043345) Thanks [@sebald](https://github.com/sebald)! - feat: `<Inline>` can align on x and y axis

- [#2074](https://github.com/marigold-ui/marigold/pull/2074) [`3aa2c100`](https://github.com/marigold-ui/marigold/commit/3aa2c100fce8884cf0e1ae8e848516923f0d8456) Thanks [@sebald](https://github.com/sebald)! - refa: Remove "variant" prop from `<Box>`, use `useComponentStyles` instead

### Minor Changes

- [#2029](https://github.com/marigold-ui/marigold/pull/2029) [`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104) Thanks [@sebald](https://github.com/sebald)! - feat: Accessible `<Radio>` and `<RadioGroup>`

* [#2036](https://github.com/marigold-ui/marigold/pull/2036) [`819dab0b`](https://github.com/marigold-ui/marigold/commit/819dab0bfe549f7fb6156cdb9938595ccbe32439) Thanks [@ti10le](https://github.com/ti10le)! - refa: remove align prop from Table

- [#2048](https://github.com/marigold-ui/marigold/pull/2048) [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec) Thanks [@sebald](https://github.com/sebald)! - refa: `<Select>`

* [#2052](https://github.com/marigold-ui/marigold/pull/2052) [`bf12129c`](https://github.com/marigold-ui/marigold/commit/bf12129c6d5d21bf372fd6ee7e3a28f6a03326c9) Thanks [@sebald](https://github.com/sebald)! - refa: Remove `<ValidationMessage>`

- [#2034](https://github.com/marigold-ui/marigold/pull/2034) [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Slider rewrite with react-aria and new styling

* [#2056](https://github.com/marigold-ui/marigold/pull/2056) [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `<NumberFields>`

- [#2025](https://github.com/marigold-ui/marigold/pull/2025) [`2b5a0967`](https://github.com/marigold-ui/marigold/commit/2b5a0967707534a1650f1258bebdd176c934dedc) Thanks [@sebald](https://github.com/sebald)! - fix: `<TextField>`/`<TextArea>` support variant/size

* [#2070](https://github.com/marigold-ui/marigold/pull/2070) [`a4117230`](https://github.com/marigold-ui/marigold/commit/a4117230928f640938f4ce69098bb665b90fe194) Thanks [@sebald](https://github.com/sebald)! - feat: Add `width` prop to fields to control width

### Patch Changes

- [#2043](https://github.com/marigold-ui/marigold/pull/2043) [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Message new styling

* [#2079](https://github.com/marigold-ui/marigold/pull/2079) [`04db9229`](https://github.com/marigold-ui/marigold/commit/04db922957c8731ea952ce123e6d63a15ec02a93) Thanks [@sebald](https://github.com/sebald)! - fix: Indeterminate is visual only + correctly render with checkbox only

- [#2049](https://github.com/marigold-ui/marigold/pull/2049) [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: switch with new styling

- Updated dependencies [[`a41bb8a3`](https://github.com/marigold-ui/marigold/commit/a41bb8a39ace6006bfc2351f6d4649305bc1d286), [`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64), [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075), [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec), [`f5128944`](https://github.com/marigold-ui/marigold/commit/f512894439dff2b5769fe2e5aa23f61a28b3d14e), [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c), [`3aa2c100`](https://github.com/marigold-ui/marigold/commit/3aa2c100fce8884cf0e1ae8e848516923f0d8456)]:
  - @marigold/tokens@3.0.0
  - @marigold/system@1.0.0
  - @marigold/types@0.5.0
  - @marigold/icons@0.7.0

## 1.0.0-beta.0

### Major Changes

- [#2053](https://github.com/marigold-ui/marigold/pull/2053) [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255) Thanks [@sebald](https://github.com/sebald)! - refa: `<Dialog>`

* [#2054](https://github.com/marigold-ui/marigold/pull/2054) [`3c86c3b7`](https://github.com/marigold-ui/marigold/commit/3c86c3b7399a525c2743a1a42b806f862b050cd3) Thanks [@sebald](https://github.com/sebald)! - refa: Move &lt;Label&gt; and &lt;HelpText&gt; to components root

### Minor Changes

- [#2029](https://github.com/marigold-ui/marigold/pull/2029) [`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104) Thanks [@sebald](https://github.com/sebald)! - feat: Accessible `<Radio>` and `<RadioGroup>`

* [#2036](https://github.com/marigold-ui/marigold/pull/2036) [`819dab0b`](https://github.com/marigold-ui/marigold/commit/819dab0bfe549f7fb6156cdb9938595ccbe32439) Thanks [@ti10le](https://github.com/ti10le)! - refa: remove align prop from Table

- [#2048](https://github.com/marigold-ui/marigold/pull/2048) [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec) Thanks [@sebald](https://github.com/sebald)! - refa: `<Select>`

* [#2052](https://github.com/marigold-ui/marigold/pull/2052) [`bf12129c`](https://github.com/marigold-ui/marigold/commit/bf12129c6d5d21bf372fd6ee7e3a28f6a03326c9) Thanks [@sebald](https://github.com/sebald)! - refa: Remove `<ValidationMessage>`

- [#2034](https://github.com/marigold-ui/marigold/pull/2034) [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Slider rewrite with react-aria and new styling

* [#2056](https://github.com/marigold-ui/marigold/pull/2056) [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce `<NumberFields>`

- [#2025](https://github.com/marigold-ui/marigold/pull/2025) [`2b5a0967`](https://github.com/marigold-ui/marigold/commit/2b5a0967707534a1650f1258bebdd176c934dedc) Thanks [@sebald](https://github.com/sebald)! - fix: `<TextField>`/`<TextArea>` support variant/size

### Patch Changes

- [#2043](https://github.com/marigold-ui/marigold/pull/2043) [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Message new styling

* [#2049](https://github.com/marigold-ui/marigold/pull/2049) [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: switch with new styling

* Updated dependencies [[`02d13e84`](https://github.com/marigold-ui/marigold/commit/02d13e84a27ac075587f7278c8c858aeee884f64), [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075), [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec), [`f5128944`](https://github.com/marigold-ui/marigold/commit/f512894439dff2b5769fe2e5aa23f61a28b3d14e), [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c)]:
  - @marigold/system@1.0.0-beta.0
  - @marigold/types@0.5.0-beta.0
  - @marigold/icons@0.7.0-beta.0

## 0.9.0

### Minor Changes

- [#2016](https://github.com/marigold-ui/marigold/pull/2016) [`d79a590a`](https://github.com/marigold-ui/marigold/commit/d79a590aeb7dcbda23ddb40e3f712385c2b11da0) Thanks [@sebald](https://github.com/sebald)! - refa: `<Checkbox>` and `<CheckboxGroup>`

* [#1987](https://github.com/marigold-ui/marigold/pull/1987) [`cc149c9a`](https://github.com/marigold-ui/marigold/commit/cc149c9aaaf11f78a58f0c6d51bc9f12720f18a4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): introduce Table component v1

- [#1963](https://github.com/marigold-ui/marigold/pull/1963) [`872c7413`](https://github.com/marigold-ui/marigold/commit/872c7413f7dca317fc048437634c78d909cefd15) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce a new input for text `<TextField>`

* [#1964](https://github.com/marigold-ui/marigold/pull/1964) [`08ee4bf5`](https://github.com/marigold-ui/marigold/commit/08ee4bf520779e1696b18d2959bed89e0bac2d39) Thanks [@sebald](https://github.com/sebald)! - refa: Use `<Field>` in `<TextArea>`

- [#1997](https://github.com/marigold-ui/marigold/pull/1997) [`37d2fd69`](https://github.com/marigold-ui/marigold/commit/37d2fd69aafedd288490410dc56be1ede43bd41d) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: New component `<Content>`

### Patch Changes

- [#2000](https://github.com/marigold-ui/marigold/pull/2000) [`121e2b3a`](https://github.com/marigold-ui/marigold/commit/121e2b3aa2fd1d87c534c92a9665678abe031d20) Thanks [@sebald](https://github.com/sebald)! - refa: remove unsued elements from `<Aspect>`

* [#2017](https://github.com/marigold-ui/marigold/pull/2017) [`5dfe5f88`](https://github.com/marigold-ui/marigold/commit/5dfe5f8869c7cd9f5ca912575990b211ee9d3a69) Thanks [@sarahgm](https://github.com/sarahgm)! - Button restructure

- [#1991](https://github.com/marigold-ui/marigold/pull/1991) [`37b3b0e9`](https://github.com/marigold-ui/marigold/commit/37b3b0e93bc12ff93946a314d6128b2c50089157) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: textarea restructure styles

* [#2018](https://github.com/marigold-ui/marigold/pull/2018) [`6e4f52cf`](https://github.com/marigold-ui/marigold/commit/6e4f52cf1f6d74d5c6464feab642187e5c9c2720) Thanks [@sarahgm](https://github.com/sarahgm)! - Menu component restructure

- [#2013](https://github.com/marigold-ui/marigold/pull/2013) [`f6c3263f`](https://github.com/marigold-ui/marigold/commit/f6c3263fc327478372069b7a3d6352e151af930c) Thanks [@sarahgm](https://github.com/sarahgm)! - feat:Footer component

* [#1999](https://github.com/marigold-ui/marigold/pull/1999) [`413df088`](https://github.com/marigold-ui/marigold/commit/413df088ed497a3dfb4221c31a1b68245f43e984) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: divider restructure

- [#2008](https://github.com/marigold-ui/marigold/pull/2008) [`4ff1e2b6`](https://github.com/marigold-ui/marigold/commit/4ff1e2b6e668db90cfb7e2d04d9365c80dbf4cc2) Thanks [@sebald](https://github.com/sebald)! - refa: `<Checkbox>` (uses new styling)

* [#1992](https://github.com/marigold-ui/marigold/pull/1992) [`59f3e6f3`](https://github.com/marigold-ui/marigold/commit/59f3e6f31c00c422bc95b25fb0faf1b77bc9a273) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Link styles

- [#1990](https://github.com/marigold-ui/marigold/pull/1990) [`a98ddc11`](https://github.com/marigold-ui/marigold/commit/a98ddc11076150886d4384cc7a7e7cc12f4c2494) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Input Component restyled and restructure

* [#1994](https://github.com/marigold-ui/marigold/pull/1994) [`3dff2282`](https://github.com/marigold-ui/marigold/commit/3dff2282b75ca91547f478f3305b138d1d409670) Thanks [@sarahgm](https://github.com/sarahgm)! - Refa: card-styles-structur

- [#1982](https://github.com/marigold-ui/marigold/pull/1982) [`7fc15cb7`](https://github.com/marigold-ui/marigold/commit/7fc15cb7624b5ccb8c282f238fa6954947789731) Thanks [@sebald](https://github.com/sebald)! - refa: Badge uses new styling solution

* [#1988](https://github.com/marigold-ui/marigold/pull/1988) [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Field Component restructure

- [#2001](https://github.com/marigold-ui/marigold/pull/2001) [`b3246070`](https://github.com/marigold-ui/marigold/commit/b3246070c7bd3dcadb28e30140aead330a6b9ff1) Thanks [@sebald](https://github.com/sebald)! - refa: Use `<Headline>` instead of `<Text>`

* [#2014](https://github.com/marigold-ui/marigold/pull/2014) [`cc01f7dc`](https://github.com/marigold-ui/marigold/commit/cc01f7dc5e9aae665511374b1352efa9f2c942bf) Thanks [@sarahgm](https://github.com/sarahgm)! - Text component restructure

- [#2012](https://github.com/marigold-ui/marigold/pull/2012) [`f0ec4333`](https://github.com/marigold-ui/marigold/commit/f0ec433306319e6ed948bfa573a18aad6c41906c) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: Header component

* [#1998](https://github.com/marigold-ui/marigold/pull/1998) [`6dd92ad6`](https://github.com/marigold-ui/marigold/commit/6dd92ad6e8ecc8bbf3d578413bd2b2c5fbe5a6f8) Thanks [@sarahgm](https://github.com/sarahgm)! - feat(comp): headline component

- [#1984](https://github.com/marigold-ui/marigold/pull/1984) [`733f5488`](https://github.com/marigold-ui/marigold/commit/733f54887393503fbdeb4fb6803d3bd267ec6138) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Image new styling solution

- Updated dependencies [[`424f1705`](https://github.com/marigold-ui/marigold/commit/424f1705159d7a03dce368adadbae152acc80687), [`dbc55934`](https://github.com/marigold-ui/marigold/commit/dbc55934775a6c2362525f0078ecf1595475ddc8), [`3dff2282`](https://github.com/marigold-ui/marigold/commit/3dff2282b75ca91547f478f3305b138d1d409670), [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee)]:
  - @marigold/system@0.9.0
  - @marigold/types@0.4.1
  - @marigold/icons@0.6.1

## 0.8.0

### Minor Changes

- [#1928](https://github.com/marigold-ui/marigold/pull/1928) [`059e9324`](https://github.com/marigold-ui/marigold/commit/059e9324375b0dc67fef6ac84b65f997a930a345) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Container component

* [#1892](https://github.com/marigold-ui/marigold/pull/1892) [`a91171f9`](https://github.com/marigold-ui/marigold/commit/a91171f96d0eed696f988e4fc45c13757ea1971e) Thanks [@sebald](https://github.com/sebald)! - feat(components): Normalize link variant

- [#1937](https://github.com/marigold-ui/marigold/pull/1937) [`a1f4796f`](https://github.com/marigold-ui/marigold/commit/a1f4796fafe476154e8e03cd4a336e5266a8950d) Thanks [@sebald](https://github.com/sebald)! - refa: Redo `<Field>` now called `<TextField>`

* [#1919](https://github.com/marigold-ui/marigold/pull/1919) [`5319745c`](https://github.com/marigold-ui/marigold/commit/5319745cbc20919a423dda49f4fb8ac4608009e1) Thanks [@sebald](https://github.com/sebald)! - feat: SVG supports size token from theme

- [#1930](https://github.com/marigold-ui/marigold/pull/1930) [`249b0c81`](https://github.com/marigold-ui/marigold/commit/249b0c81a5889e558d85e8f9214afa0897368dd8) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Introduce Breakout component

* [#1898](https://github.com/marigold-ui/marigold/pull/1898) [`3cf378e9`](https://github.com/marigold-ui/marigold/commit/3cf378e9c80f700e78eaafcfc0701a20e29e37d0) Thanks [@sebald](https://github.com/sebald)! - feat: `<Stack>` supports rendering as list

- [#1925](https://github.com/marigold-ui/marigold/pull/1925) [`e3d62a22`](https://github.com/marigold-ui/marigold/commit/e3d62a22fdc42c394516d477ad8d477ae02bff1e) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Rewrite Columns and remove Column

* [#1870](https://github.com/marigold-ui/marigold/pull/1870) [`e94a08d7`](https://github.com/marigold-ui/marigold/commit/e94a08d76d036754aa9237ee5b1ef52fb93aadab) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Center component

### Patch Changes

- [#1926](https://github.com/marigold-ui/marigold/pull/1926) [`5e5e0fcc`](https://github.com/marigold-ui/marigold/commit/5e5e0fcc45aadf62f8c3b33e722e9132a7267cbc) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Container with grid

- Updated dependencies [[`382ac6cc`](https://github.com/marigold-ui/marigold/commit/382ac6cca1865d033ba601ad269247f26ee0a13e), [`2f45aa5d`](https://github.com/marigold-ui/marigold/commit/2f45aa5d236f861ab8187a4a574a7113d6c1f1b8), [`5319745c`](https://github.com/marigold-ui/marigold/commit/5319745cbc20919a423dda49f4fb8ac4608009e1), [`74c91e28`](https://github.com/marigold-ui/marigold/commit/74c91e289ffadfc082a548fc55ab9bd315ac1d8a)]:
  - @marigold/system@0.8.0
  - @marigold/icons@0.6.0
  - @marigold/tokens@2.0.0

## 0.7.0

### Minor Changes

- [#1882](https://github.com/marigold-ui/marigold/pull/1882) [`d436930f`](https://github.com/marigold-ui/marigold/commit/d436930f7d88b572c4365a442a0914bba1147657) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): introduce Tiles component

* [#1881](https://github.com/marigold-ui/marigold/pull/1881) [`d2c3eb50`](https://github.com/marigold-ui/marigold/commit/d2c3eb50ceb9941926e7e658dcba7a74cb87e6d7) Thanks [@ti10le](https://github.com/ti10le)! - Component: Aspect

- [#1868](https://github.com/marigold-ui/marigold/pull/1868) [`ec4f8f22`](https://github.com/marigold-ui/marigold/commit/ec4f8f228f05e88f2b9f17784b59f3cfc8ceabe7) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): renew Container component

### Patch Changes

- Updated dependencies [[`af566de4`](https://github.com/marigold-ui/marigold/commit/af566de483e80bfedcd09b073be8559eebf17fca)]:
  - @marigold/tokens@1.0.0
  - @marigold/system@0.7.0
  - @marigold/icons@0.5.1

## 0.6.0

### Minor Changes

- [#1819](https://github.com/marigold-ui/marigold/pull/1819) [`d162a6a8`](https://github.com/marigold-ui/marigold/commit/d162a6a8d1f9d99bfc08d59f6dae294a6fa95310) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): add new Component Switch

* [#1842](https://github.com/marigold-ui/marigold/pull/1842) [`e053b7b9`](https://github.com/marigold-ui/marigold/commit/e053b7b903f02c56cf10e6b9aecbedd29399895d) Thanks [@ti10le](https://github.com/ti10le)! - feat: extend svg fill prop to handle theme color

- [#1822](https://github.com/marigold-ui/marigold/pull/1822) [`527ba94f`](https://github.com/marigold-ui/marigold/commit/527ba94fa1a3255dc6f846fcc9def978ec906bf3) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp/docs): Alert update variant + docs

* [#1807](https://github.com/marigold-ui/marigold/pull/1807) [`b55e10bc`](https://github.com/marigold-ui/marigold/commit/b55e10bc7119554373d43f9d8872346c1e6d6c39) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): add Tooltip component v1

- [#1851](https://github.com/marigold-ui/marigold/pull/1851) [`9a95a6f5`](https://github.com/marigold-ui/marigold/commit/9a95a6f541dec34e27eac8557186f929e811c07c) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): make Inline accepting fragment + standard text

* [#1820](https://github.com/marigold-ui/marigold/pull/1820) [`f62033b6`](https://github.com/marigold-ui/marigold/commit/f62033b642a623a75f311af701febc4b54f77120) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox add indeterminated state + doc update

### Patch Changes

- [#1849](https://github.com/marigold-ui/marigold/pull/1849) [`21f72b34`](https://github.com/marigold-ui/marigold/commit/21f72b3499c7ed2f88a0b96315f0374140e98e85) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: remove Alert

* [#1852](https://github.com/marigold-ui/marigold/pull/1852) [`25c8675e`](https://github.com/marigold-ui/marigold/commit/25c8675ed470cc71f8f968a83b9781b66412c493) Thanks [@ti10le](https://github.com/ti10le)! - refa(comp): fill prop instead of css or \_\_basCSS

* Updated dependencies [[`4cc0ad3b`](https://github.com/marigold-ui/marigold/commit/4cc0ad3b85b993e01b4d85b6f30b1a81cdee2351), [`64b9089e`](https://github.com/marigold-ui/marigold/commit/64b9089ed2e1e35975472e342b02cda40f5de66f), [`539d4198`](https://github.com/marigold-ui/marigold/commit/539d41987118db125ee37a4a83231335ea15830a), [`e053b7b9`](https://github.com/marigold-ui/marigold/commit/e053b7b903f02c56cf10e6b9aecbedd29399895d)]:
  - @marigold/system@0.6.0
  - @marigold/icons@0.5.0

## 0.5.1

### Patch Changes

- [#1795](https://github.com/marigold-ui/marigold/pull/1795) [`a178eafe`](https://github.com/marigold-ui/marigold/commit/a178eafe8c8380ee23b4587d953ee52b231414ff) Thanks [@ti10le](https://github.com/ti10le)! - refa: use interface instead of type

* [#1798](https://github.com/marigold-ui/marigold/pull/1798) [`9939b743`](https://github.com/marigold-ui/marigold/commit/9939b743df4dfe40bfd5dd61a1a4b88641ef9559) Thanks [@sebald](https://github.com/sebald)! - fix(components): Use own `flattenChildren` helper to fix ESM build

* Updated dependencies [[`a178eafe`](https://github.com/marigold-ui/marigold/commit/a178eafe8c8380ee23b4587d953ee52b231414ff)]:
  - @marigold/system@0.5.1
  - @marigold/icons@0.4.2

## 0.5.0

### Minor Changes

- [#1784](https://github.com/marigold-ui/marigold/pull/1784) [`99af3b37`](https://github.com/marigold-ui/marigold/commit/99af3b37de24599138777ed90de0445571c3095e) Thanks [@ti10le](https://github.com/ti10le)! - refa(comp): use interface instead of type

* [#1727](https://github.com/marigold-ui/marigold/pull/1727) [`026300b1`](https://github.com/marigold-ui/marigold/commit/026300b1b539b57785c0eb0282a3d3fd763194bc) Thanks [@sebald](https://github.com/sebald)! - feat(components): `<Text>` add possibility to change font size via style props

### Patch Changes

- [#1774](https://github.com/marigold-ui/marigold/pull/1774) [`93480b63`](https://github.com/marigold-ui/marigold/commit/93480b6333a4d6231db35dbf12de5726533ebfc8) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove label prop and add children + refa

* [#1775](https://github.com/marigold-ui/marigold/pull/1775) [`6da8eba2`](https://github.com/marigold-ui/marigold/commit/6da8eba28c518c75758180697e5f0f5e5989c1f4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox remove label prop and add children + refa

* Updated dependencies [[`5936de75`](https://github.com/marigold-ui/marigold/commit/5936de75e5a0134584438117c53c5edfe15c6c5d)]:
  - @marigold/system@0.5.0
  - @marigold/icons@0.4.1

## 0.4.0

### Minor Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - chore: Use `tsup` to build packages

* [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - Improved size in node_modules

### Patch Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - feat(comp): Rewrite Textarea with react-aria

* [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - feat(comp): rewrite Field component with react-aria

* Updated dependencies [[`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942), [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942)]:
  - @marigold/icons@0.4.0
  - @marigold/system@0.4.0
  - @marigold/types@0.4.0

## 0.3.2

### Patch Changes

- [#1701](https://github.com/marigold-ui/marigold/pull/1701) [`45b05af2`](https://github.com/marigold-ui/marigold/commit/45b05af2d93eb21d50ed21363d7177d9161865be) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): rewrite Divider and add react-aria

## 0.3.1

### Patch Changes

- [#1634](https://github.com/marigold-ui/marigold/pull/1634) [`26ff3618`](https://github.com/marigold-ui/marigold/commit/26ff361822fe31d466bfeae988b0193ac5999f3b) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Radio component rewrite

* [#1676](https://github.com/marigold-ui/marigold/pull/1676) [`379041bc`](https://github.com/marigold-ui/marigold/commit/379041bc7d4502bca98029a95afe43ce693222cd) Thanks [@ti10le](https://github.com/ti10le)! - remove the last mdx stories

* Updated dependencies [[`379041bc`](https://github.com/marigold-ui/marigold/commit/379041bc7d4502bca98029a95afe43ce693222cd)]:
  - @marigold/icons@0.3.1
  - @marigold/system@0.3.1

## 0.3.0

### Patch Changes

- [#1269](https://github.com/marigold-ui/marigold/pull/1269) [`ebb704dd`](https://github.com/marigold-ui/marigold/commit/ebb704dd5fe1697482220face07bd4390ab34293) Thanks [@ti10le](https://github.com/ti10le)! - feature: section to select component

* [#1189](https://github.com/marigold-ui/marigold/pull/1189) [`be8dc989`](https://github.com/marigold-ui/marigold/commit/be8dc989a418884fe12b0c772db71d10657a661d) Thanks [@sebald](https://github.com/sebald)! - feat(components): `<Stack>` correctly uses whitespace and supports usage as list

- [#1378](https://github.com/marigold-ui/marigold/pull/1378) [`b0c967de`](https://github.com/marigold-ui/marigold/commit/b0c967de1097de50ff4de4c3b14a5bd6e236319b) Thanks [@ti10le](https://github.com/ti10le)! - feature: Textarea - make error boolean and add errorMessage

* [#1510](https://github.com/marigold-ui/marigold/pull/1510) [`a9b8b083`](https://github.com/marigold-ui/marigold/commit/a9b8b08316c0e9bf1308e64c78eb1ecc81f8febf) Thanks [@ti10le](https://github.com/ti10le)! - refa(comp): Stack

- [#1515](https://github.com/marigold-ui/marigold/pull/1515) [`8eda245f`](https://github.com/marigold-ui/marigold/commit/8eda245f01a918fcdaa9f0ac211889ed869aa375) Thanks [@sebald](https://github.com/sebald)! - feat: add normalization for body and html & fix emotion leak

* [#1651](https://github.com/marigold-ui/marigold/pull/1651) [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox component rewrite

- [#1316](https://github.com/marigold-ui/marigold/pull/1316) [`edfec8d9`](https://github.com/marigold-ui/marigold/commit/edfec8d9a7a4e4a0e45cc912838789804c0cace1) Thanks [@ti10le](https://github.com/ti10le)! - aria-label for all usages of select component
  use SSR Provider which is exported from package components/Provider in Gatsby wrapper

* [#1440](https://github.com/marigold-ui/marigold/pull/1440) [`c1da52c0`](https://github.com/marigold-ui/marigold/commit/c1da52c0f035b141608fd606e6ba3bc2b5482dc1) Thanks [@ti10le](https://github.com/ti10le)! - feature: use Element in Box + necessary fix changes

- [#1658](https://github.com/marigold-ui/marigold/pull/1658) [`af485505`](https://github.com/marigold-ui/marigold/commit/af4855058358e75a6ae9f8594f1b4d3d4d383f3c) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): refa + react-aria Hidden component

* [#1228](https://github.com/marigold-ui/marigold/pull/1228) [`ccebc98e`](https://github.com/marigold-ui/marigold/commit/ccebc98e4c27a597557e06ad32521249afd7c401) Thanks [@ti10le](https://github.com/ti10le)! - docs: Use Select component in ThemeSelect

- [#1514](https://github.com/marigold-ui/marigold/pull/1514) [`5107b943`](https://github.com/marigold-ui/marigold/commit/5107b943cb3085eb3137d84e79966acad6173a26) Thanks [@sebald](https://github.com/sebald)! - feat(system): Use emotion's context

* [#1631](https://github.com/marigold-ui/marigold/pull/1631) [`9d0e0b96`](https://github.com/marigold-ui/marigold/commit/9d0e0b961afc21ef7a649e8d4dbf584ece6f0e57) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Label and add color prop

- [#1488](https://github.com/marigold-ui/marigold/pull/1488) [`5ea6ac42`](https://github.com/marigold-ui/marigold/commit/5ea6ac428b67e6802a640ac65ccaf79b07327d45) Thanks [@ti10le](https://github.com/ti10le)! - fix(comp): Select coverage

* [#1235](https://github.com/marigold-ui/marigold/pull/1235) [`657d508b`](https://github.com/marigold-ui/marigold/commit/657d508b00f13df6269228af396fd5ccebe2d0a4) Thanks [@ti10le](https://github.com/ti10le)! - feature: ActionGroup component

- [#1618](https://github.com/marigold-ui/marigold/pull/1618) [`bd51a81b`](https://github.com/marigold-ui/marigold/commit/bd51a81b4d961f3366c28f34732e13840e78b346) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Input default variant

* [#1660](https://github.com/marigold-ui/marigold/pull/1660) [`6f9a9d61`](https://github.com/marigold-ui/marigold/commit/6f9a9d61473b715cd492ef765815251c14575768) Thanks [@ti10le](https://github.com/ti10le)! - feat(storybook): rewrite stories from mdx to tsx

- [#1313](https://github.com/marigold-ui/marigold/pull/1313) [`2203155c`](https://github.com/marigold-ui/marigold/commit/2203155c406c91289e36f2a82c24bc6474b687bf) Thanks [@ti10le](https://github.com/ti10le)! - Slider component - design update

* [#1447](https://github.com/marigold-ui/marigold/pull/1447) [`29e4dcc5`](https://github.com/marigold-ui/marigold/commit/29e4dcc589f9bc97db56e554804b4cd78c0d2ec8) Thanks [@ti10le](https://github.com/ti10le)! - feature: Card component

- [#1556](https://github.com/marigold-ui/marigold/pull/1556) [`470f6e8d`](https://github.com/marigold-ui/marigold/commit/470f6e8d9a4c71f504a05f67b3b83d0554d7b480) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove span from button and add some styles to the button element, add space prop to button

* [#1521](https://github.com/marigold-ui/marigold/pull/1521) [`00588fef`](https://github.com/marigold-ui/marigold/commit/00588fef28270bdd0483701ffa8ec1f6bdbc3f01) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp/docs): change Inline component default align + use it in DoAndDont

- [#1616](https://github.com/marigold-ui/marigold/pull/1616) [`ac186e8c`](https://github.com/marigold-ui/marigold/commit/ac186e8c6658bcd6a2892bbe4717c0d60c67e0b4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hardcoded variants in `<Dialog>`

* [#1639](https://github.com/marigold-ui/marigold/pull/1639) [`71551547`](https://github.com/marigold-ui/marigold/commit/71551547e8da4a65ccb69cd785f1be19256aac3c) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label from Select

- [#1451](https://github.com/marigold-ui/marigold/pull/1451) [`6f24c585`](https://github.com/marigold-ui/marigold/commit/6f24c585d0f78fac0bf4037e13c53dfdb6138037) Thanks [@ti10le](https://github.com/ti10le)! - bugfix: change Stack that pt has higher priority than base

* [#1374](https://github.com/marigold-ui/marigold/pull/1374) [`90dd906c`](https://github.com/marigold-ui/marigold/commit/90dd906c0ba660ba695efbd39ff52ecc69f9a98f) Thanks [@ti10le](https://github.com/ti10le)! - feature: Field - make error boolean and add errorMessage

- [#1230](https://github.com/marigold-ui/marigold/pull/1230) [`ebd6e26f`](https://github.com/marigold-ui/marigold/commit/ebd6e26f71f675b98b663bc45c6a2d5badddcd47) Thanks [@viktoria-schwarz](https://github.com/viktoria-schwarz)! - feat: add GlobalStyles via theme

* [#1196](https://github.com/marigold-ui/marigold/pull/1196) [`d3a0698f`](https://github.com/marigold-ui/marigold/commit/d3a0698fc6503c208298537c1385a981af93d1d4) Thanks [@ti10le](https://github.com/ti10le)! - Add error and required prop to `<Select>`

- [#1513](https://github.com/marigold-ui/marigold/pull/1513) [`686c4572`](https://github.com/marigold-ui/marigold/commit/686c4572bc75a3e2016a1ecc49cba9f4307719af) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): inline Component

* [#1493](https://github.com/marigold-ui/marigold/pull/1493) [`45d022dc`](https://github.com/marigold-ui/marigold/commit/45d022dc2459f6e0053e8ba760dc7a6502cd52f1) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Slider

- [#1498](https://github.com/marigold-ui/marigold/pull/1498) [`9e46b437`](https://github.com/marigold-ui/marigold/commit/9e46b4376497b45445aefed138a14e9a82cff705) Thanks [@ti10le](https://github.com/ti10le)! - feat: add GlobalStyles

* [#1563](https://github.com/marigold-ui/marigold/pull/1563) [`6e485f5a`](https://github.com/marigold-ui/marigold/commit/6e485f5a8800094fe54c075a2b21f8abe726b3cd) Thanks [@sebald](https://github.com/sebald)! - feat: Introduce a `Theme` with all available scales

- [#1482](https://github.com/marigold-ui/marigold/pull/1482) [`bf19214e`](https://github.com/marigold-ui/marigold/commit/bf19214e3c1c75d7ba9fbd31bb7e02fb491f2af7) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Card

* [#1448](https://github.com/marigold-ui/marigold/pull/1448) [`ab879e66`](https://github.com/marigold-ui/marigold/commit/ab879e6645ccaf8f9671a8b0231ed4cdf3081753) Thanks [@ti10le](https://github.com/ti10le)! - feature: replace useStyles in Badge, Menu, Message and ValidationMessage

- [#1232](https://github.com/marigold-ui/marigold/pull/1232) [`4c32db13`](https://github.com/marigold-ui/marigold/commit/4c32db13dfc9d76e05e2c015fa99872a49bf920b) Thanks [@ti10le](https://github.com/ti10le)! - Field component redesign

* [#1579](https://github.com/marigold-ui/marigold/pull/1579) [`e13e3cc1`](https://github.com/marigold-ui/marigold/commit/e13e3cc1fc66b261209973b1fc90eb48117076e9) Thanks [@ti10le](https://github.com/ti10le)! - feat: remove Heading from marigold

- [#1234](https://github.com/marigold-ui/marigold/pull/1234) [`cf2a345d`](https://github.com/marigold-ui/marigold/commit/cf2a345d49aedfcea82f8030ba840bbcbf523ee8) Thanks [@ti10le](https://github.com/ti10le)! - fix Dialog component example + styles

* [#1622](https://github.com/marigold-ui/marigold/pull/1622) [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Card default variant

- [#1619](https://github.com/marigold-ui/marigold/pull/1619) [`57d955ee`](https://github.com/marigold-ui/marigold/commit/57d955ee7c04350a4cdabc582f7d1a1937cb4802) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Textarea default variant

* [#1501](https://github.com/marigold-ui/marigold/pull/1501) [`1c1f8648`](https://github.com/marigold-ui/marigold/commit/1c1f864820a060214406ef711f4ed873746c16c4) Thanks [@ti10le](https://github.com/ti10le)! - feat(storybook): remove use styles stories

- [#1366](https://github.com/marigold-ui/marigold/pull/1366) [`78a8e5c8`](https://github.com/marigold-ui/marigold/commit/78a8e5c879760ba666be4566935dd773996159cf) Thanks [@ti10le](https://github.com/ti10le)! - feature: renew radio component

* [#1483](https://github.com/marigold-ui/marigold/pull/1483) [`f725277b`](https://github.com/marigold-ui/marigold/commit/f725277bf66a6e2d51b69608d1b2ebb55330a46e) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Checkbox + Radio

- [#1365](https://github.com/marigold-ui/marigold/pull/1365) [`6d1e47c1`](https://github.com/marigold-ui/marigold/commit/6d1e47c190c527f3a1ae014f87523c7fcc70c8c8) Thanks [@ti10le](https://github.com/ti10le)! - feature: redesign dialog component

* [#1492](https://github.com/marigold-ui/marigold/pull/1492) [`57a6d470`](https://github.com/marigold-ui/marigold/commit/57a6d47058eb1a5fc46b3ccaa831513b8806e257) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Columns

- [#1264](https://github.com/marigold-ui/marigold/pull/1264) [`c6c8f986`](https://github.com/marigold-ui/marigold/commit/c6c8f9860633570177a978719d5fbe4159415cf0) Thanks [@ti10le](https://github.com/ti10le)! - bugfix/feature: link + menu component

* [#1651](https://github.com/marigold-ui/marigold/pull/1651) [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): refa + react-aria Hidden component

- [#1506](https://github.com/marigold-ui/marigold/pull/1506) [`7b2a0374`](https://github.com/marigold-ui/marigold/commit/7b2a0374b2ca4546a7e616d99313028da3ef412e) Thanks [@ti10le](https://github.com/ti10le)! - infra(packages): add icons package as dependency to component package

* [#1367](https://github.com/marigold-ui/marigold/pull/1367) [`902be38c`](https://github.com/marigold-ui/marigold/commit/902be38ca9efb3018a0f6c0cf981229c7ae2bf7f) Thanks [@ti10le](https://github.com/ti10le)! - feature: renew checkbox component

- [#1499](https://github.com/marigold-ui/marigold/pull/1499) [`ec5baf85`](https://github.com/marigold-ui/marigold/commit/ec5baf85a9a0f82a4fca5bbd1e1680316c186593) Thanks [@sebald](https://github.com/sebald)! - feat: Update and simplify normalization

* [#1375](https://github.com/marigold-ui/marigold/pull/1375) [`dd237e6d`](https://github.com/marigold-ui/marigold/commit/dd237e6d904826e8b3701f4a8470f75c88b0bd78) Thanks [@ti10le](https://github.com/ti10le)! - feature: Select - make error boolean and add errorMessage

- [#1221](https://github.com/marigold-ui/marigold/pull/1221) [`3885f64c`](https://github.com/marigold-ui/marigold/commit/3885f64c353a056ccb9a5368ac4f105b4b9efb62) Thanks [@viktoria-schwarz](https://github.com/viktoria-schwarz)! - feat(storybook): add Welcome stories and additional config

* [#1485](https://github.com/marigold-ui/marigold/pull/1485) [`1bb6f32e`](https://github.com/marigold-ui/marigold/commit/1bb6f32e69b5eac37d67357e46c868a87855bd6f) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Label

- [#1466](https://github.com/marigold-ui/marigold/pull/1466) [`80984f41`](https://github.com/marigold-ui/marigold/commit/80984f41391f42cc17928a8127190ea6fd9abe53) Thanks [@ti10le](https://github.com/ti10le)! - feat(docs): doAndDont + CodePreview component - e.g. button

* [#1131](https://github.com/marigold-ui/marigold/pull/1131) [`0ccc10de`](https://github.com/marigold-ui/marigold/commit/0ccc10dec290ed3e5ce042277a6c6e51c40ae4c3) Thanks [@sebald](https://github.com/sebald)! - feat(types): Clarify and improve polymorphic types by calling it by its actual name ... polymorphic! We also added types when no `ref` should be passed.

- [#1633](https://github.com/marigold-ui/marigold/pull/1633) [`ab786e92`](https://github.com/marigold-ui/marigold/commit/ab786e927ab1069a83aeed7bb3b223d0c0d1bd50) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label variant in radio

* [#1617](https://github.com/marigold-ui/marigold/pull/1617) [`e5aed4bf`](https://github.com/marigold-ui/marigold/commit/e5aed4bffc4cb81ab531bb1ed8b5da871c9b8b00) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Slider default variant

- [#1621](https://github.com/marigold-ui/marigold/pull/1621) [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Badge default variant

* [#1589](https://github.com/marigold-ui/marigold/pull/1589) [`8cbcb91a`](https://github.com/marigold-ui/marigold/commit/8cbcb91a7b63ce8f10ee79ed76121e5022cbe07b) Thanks [@sebald](https://github.com/sebald)! - feat: normalize `<SVG>` and move to system package

  BREAKING: `<SVG>` moved from `@marigold/icons` to `@marigold/system`

- [#1641](https://github.com/marigold-ui/marigold/pull/1641) [`c49e5049`](https://github.com/marigold-ui/marigold/commit/c49e5049b1cb9621957ad14fa1e8b7bc8df9505d) Thanks [@sebald](https://github.com/sebald)! - chore(config): Update storyboook configuration and used CSF again

* [#1636](https://github.com/marigold-ui/marigold/pull/1636) [`4aeac33f`](https://github.com/marigold-ui/marigold/commit/4aeac33f619e6f9caee36a71223b312cfe1b9401) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Field fix default variant + remove hardcoded variants

- [#1550](https://github.com/marigold-ui/marigold/pull/1550) [`846eb640`](https://github.com/marigold-ui/marigold/commit/846eb640ad035c7f3410b4a8a451f8de56e62339) Thanks [@sebald](https://github.com/sebald)! - feat: Merge `<Box>` and `<Element>`

* [#1509](https://github.com/marigold-ui/marigold/pull/1509) [`12b74338`](https://github.com/marigold-ui/marigold/commit/12b7433843c477ab722e464fde3aa1e1f058ee46) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Column + Columns component

- [#1449](https://github.com/marigold-ui/marigold/pull/1449) [`a89bd85c`](https://github.com/marigold-ui/marigold/commit/a89bd85c349ef9d8098ccaeb0261bf09cefd22e1) Thanks [@ti10le](https://github.com/ti10le)! - Replace useStyles in ListBox, Textarea and Field.test

* [#1182](https://github.com/marigold-ui/marigold/pull/1182) [`f3f61456`](https://github.com/marigold-ui/marigold/commit/f3f61456afa65ddeec8c9f1346c439bd91f3aa12) Thanks [@ti10le](https://github.com/ti10le)! - improve Button component with react-aria

- [#1132](https://github.com/marigold-ui/marigold/pull/1132) [`b6614f1f`](https://github.com/marigold-ui/marigold/commit/b6614f1f54165bc295709fa2e7f1c50892163fc3) Thanks [@sebald](https://github.com/sebald)! - feat(compoents): Make `<Text>` and `<Link>` polymorphic

  **`<Text>`**
  - the `as` prop supports arbitrary inputs
  - supporst ref
  - supports style props (text-align, color, cursor, user-select)

  **`<Link>`**
  - the `as` prop supports arbitrary inputs
  - does not support `ref`!
  - improved accessibility (react-aria)

* [#1572](https://github.com/marigold-ui/marigold/pull/1572) [`4add22cc`](https://github.com/marigold-ui/marigold/commit/4add22ccf06313b79802919205643a859665c7f3) Thanks [@sebald](https://github.com/sebald)! - feat(components): Harden types in theme

- [#1474](https://github.com/marigold-ui/marigold/pull/1474) [`abdde032`](https://github.com/marigold-ui/marigold/commit/abdde0326428a1fa5db340197e71ca0190e7780e) Thanks [@sebald](https://github.com/sebald)! - refa: remove useStyles from `<Alert>`

* [#1484](https://github.com/marigold-ui/marigold/pull/1484) [`24367e63`](https://github.com/marigold-ui/marigold/commit/24367e63477a2345b856302115bb59d931da1ba4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove useStyles from Select

- [#1632](https://github.com/marigold-ui/marigold/pull/1632) [`c96d54a2`](https://github.com/marigold-ui/marigold/commit/c96d54a21901a72aeb6af71837c9642ace394c78) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label variant in checkbox

* [#1229](https://github.com/marigold-ui/marigold/pull/1229) [`bd00c6da`](https://github.com/marigold-ui/marigold/commit/bd00c6da6515a320c37ee48946f2ac9a505e6d36) Thanks [@ti10le](https://github.com/ti10le)! - Label component redesign

- [#1522](https://github.com/marigold-ui/marigold/pull/1522) [`6a82a490`](https://github.com/marigold-ui/marigold/commit/6a82a490865c709a354141f68d65b9af38184f24) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): use Inline in ActionGroup

- Updated dependencies [[`c030aa85`](https://github.com/marigold-ui/marigold/commit/c030aa85156356c294bafe9831024f6b6f2ce4db), [`8eda245f`](https://github.com/marigold-ui/marigold/commit/8eda245f01a918fcdaa9f0ac211889ed869aa375), [`5a04de11`](https://github.com/marigold-ui/marigold/commit/5a04de110637d004f5824679697ee4d6a90eaf34), [`c1da52c0`](https://github.com/marigold-ui/marigold/commit/c1da52c0f035b141608fd606e6ba3bc2b5482dc1), [`1448ddca`](https://github.com/marigold-ui/marigold/commit/1448ddcaa0f647f48b018fa74a8686af30eccc53), [`5107b943`](https://github.com/marigold-ui/marigold/commit/5107b943cb3085eb3137d84e79966acad6173a26), [`cd3a0d3e`](https://github.com/marigold-ui/marigold/commit/cd3a0d3edb3f2ddc1f561e8007e1c20000f7855a), [`ebd6e26f`](https://github.com/marigold-ui/marigold/commit/ebd6e26f71f675b98b663bc45c6a2d5badddcd47), [`6e485f5a`](https://github.com/marigold-ui/marigold/commit/6e485f5a8800094fe54c075a2b21f8abe726b3cd), [`80a2abe5`](https://github.com/marigold-ui/marigold/commit/80a2abe5804ba2c5a48cc6b05211245c37baf266), [`e13e3cc1`](https://github.com/marigold-ui/marigold/commit/e13e3cc1fc66b261209973b1fc90eb48117076e9), [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf), [`1c1f8648`](https://github.com/marigold-ui/marigold/commit/1c1f864820a060214406ef711f4ed873746c16c4), [`51af6693`](https://github.com/marigold-ui/marigold/commit/51af669330fd52e4e31fe5ad71d2b202ab8d2231), [`a00b7eb9`](https://github.com/marigold-ui/marigold/commit/a00b7eb971131634414d3912d059fb505bb7a370), [`7b2a0374`](https://github.com/marigold-ui/marigold/commit/7b2a0374b2ca4546a7e616d99313028da3ef412e), [`ec5baf85`](https://github.com/marigold-ui/marigold/commit/ec5baf85a9a0f82a4fca5bbd1e1680316c186593), [`0bb8f19e`](https://github.com/marigold-ui/marigold/commit/0bb8f19ebdec0e2f9dc3f6164f4373cac5c10880), [`c4ae5c5c`](https://github.com/marigold-ui/marigold/commit/c4ae5c5ca442f93034ff8f4c70adc295547951d4), [`a1ef2108`](https://github.com/marigold-ui/marigold/commit/a1ef2108dd6c8e6838b517dd58c82d38e71dae2b), [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d), [`8cbcb91a`](https://github.com/marigold-ui/marigold/commit/8cbcb91a7b63ce8f10ee79ed76121e5022cbe07b), [`846eb640`](https://github.com/marigold-ui/marigold/commit/846eb640ad035c7f3410b4a8a451f8de56e62339), [`5d63cd9c`](https://github.com/marigold-ui/marigold/commit/5d63cd9c14578787083c82c85d93bbd2ff0efac6), [`46aede50`](https://github.com/marigold-ui/marigold/commit/46aede50c43e2dce0cacdc8f4c7da55fa18962b9)]:
  - @marigold/system@0.3.0
  - @marigold/icons@0.3.0
