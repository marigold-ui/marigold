# @marigold/theme-docs

## 4.1.2

### Patch Changes

- a3042ed: fix(DST-1220): Update to use ui classes instead of util classes in components
- Updated dependencies [fd1b092]
- Updated dependencies [a3042ed]
  - @marigold/components@17.1.0
  - @marigold/system@17.1.0

## 4.1.1

### Patch Changes

- @marigold/system@17.0.1
- @marigold/components@17.0.1

## 4.1.0

### Minor Changes

- 0c00d1d: refa(DST-1001): Added a set of relational spacing tokens for future use. Provided documentation explaining the semantic spacing system.
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

- b8bab20: docs([DST-1201]): Fix AppearanceDemo Select
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

- f10119a: refa(DST-1109): Remove required indicator from the label's text content

  **BREACKING CHANGE:** We removed the `indicator` styling from `<Label>`. The component is no longer a multi-part component. Rather than styling the required indicator through a dedicated part (previsouly `indicator`), you can now apply it anyway you want, for example by using `'group-required/field:after:content-["*"]'`.

### Patch Changes

- 0040853: fix(docs): Remove old broken Tailwind plugins
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

## 3.1.13

### Patch Changes

- 2d7f163: fix(SectionMessage): Fix Section Message Styles
  - @marigold/system@15.4.3
  - @marigold/components@15.4.3

## 3.1.12

### Patch Changes

- 961eaf5: fix: Make `grid-templates-areas` class more robust
  - @marigold/system@15.4.2
  - @marigold/components@15.4.2

## 3.1.11

### Patch Changes

- Updated dependencies [d710177]
  - @marigold/components@15.4.1
  - @marigold/system@15.4.1

## 3.1.10

### Patch Changes

- Updated dependencies [f621653]
- Updated dependencies [025d6e9]
- Updated dependencies [ffbebd0]
- Updated dependencies [e985fe2]
- Updated dependencies [9ec4620]
- Updated dependencies [77e0417]
  - @marigold/components@15.4.0
  - @marigold/system@15.4.0

## 3.1.9

### Patch Changes

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

## 3.1.8

### Patch Changes

- @marigold/system@15.2.0
- @marigold/components@15.2.0

## 3.1.7

### Patch Changes

- Updated dependencies [7b3caca]
- Updated dependencies [a3ddf47]
- Updated dependencies [0583b77]
  - @marigold/components@15.1.0
  - @marigold/system@15.1.0

## 3.1.6

### Patch Changes

- @marigold/system@15.0.2
- @marigold/components@15.0.2

## 3.1.5

### Patch Changes

- Updated dependencies [df57868]
- Updated dependencies [00d230a]
- Updated dependencies [b351484]
  - @marigold/components@15.0.1
  - @marigold/system@15.0.1

## 3.1.4

### Patch Changes

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

## 3.1.3

### Patch Changes

- 81f1c9d: fix broken release
- Updated dependencies [424e2f4]
- Updated dependencies [81f1c9d]
  - @marigold/components@14.1.1
  - @marigold/system@14.1.1
  - @marigold/theme-plugins@1.0.2

## 3.1.2

### Patch Changes

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

## 3.1.1

### Patch Changes

- Updated dependencies [a7ec9d3]
- Updated dependencies [5e08185]
- Updated dependencies [6d61be9]
- Updated dependencies [29e6133]
  - @marigold/components@14.0.0
  - @marigold/system@14.0.0

## 3.1.0

### Minor Changes

- 0d7f9db: docs([DST-815]):Updated token display to use RUI theme structure. Replaced deprecated Core and B2B token references with RUI semantic tokens that align with the current design system.

### Patch Changes

- Updated dependencies [9a5791c]
- Updated dependencies [854e00b]
- Updated dependencies [430c266]
- Updated dependencies [c33ad07]
- Updated dependencies [98bea2e]
- Updated dependencies [16f6dbb]
- Updated dependencies [d224a2f]
  - @marigold/components@13.0.0
  - @marigold/system@13.0.0

## 3.0.7

### Patch Changes

- Updated dependencies [a6bcd89]
  - @marigold/components@12.0.5
  - @marigold/system@12.0.5

## 3.0.6

### Patch Changes

- Updated dependencies [3e19b71]
- Updated dependencies [ed72011]
- Updated dependencies [6c230c7]
- Updated dependencies [17d28b5]
- Updated dependencies [5127d58]
  - @marigold/components@12.0.4
  - @marigold/system@12.0.4

## 3.0.5

### Patch Changes

- Updated dependencies [7451134]
- Updated dependencies [12b00ed]
- Updated dependencies [73edbb0]
  - @marigold/components@12.0.3
  - @marigold/system@12.0.3

## 3.0.4

### Patch Changes

- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/components@12.0.2
  - @marigold/system@12.0.2

## 3.0.3

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- Updated dependencies [0e8211b]
- Updated dependencies [af401e5]
- Updated dependencies [534ad77]
  - @marigold/components@12.0.1
  - @marigold/system@12.0.1

## 3.0.2

### Patch Changes

- 438b959: feat([DSTSUP-112]): Add sizes to RUI's `<Dialog>`
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

## 3.0.1

### Patch Changes

- 9965825: infra([DST-771]): Add safelist to theme-docs
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

## 3.0.0

### Major Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

### Patch Changes

- 953cf3d: Making the dialog titles independant
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/components@11.4.1
  - @marigold/system@11.4.1

## 2.4.6

### Patch Changes

- @marigold/system@11.4.0
- @marigold/components@11.4.0

## 2.4.5

### Patch Changes

- Updated dependencies [888e852]
- Updated dependencies [08ba5c7]
- Updated dependencies [611c2e8]
- Updated dependencies [8b404d2]
- Updated dependencies [7554cf9]
  - @marigold/components@11.3.0
  - @marigold/system@11.3.0

## 2.4.4

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/components@11.2.3
  - @marigold/system@11.2.3

## 2.4.3

### Patch Changes

- Updated dependencies [9412037]
- Updated dependencies [91c72e8]
  - @marigold/components@11.2.2
  - @marigold/system@11.2.2

## 2.4.2

### Patch Changes

- Updated dependencies [40db199]
- Updated dependencies [619b4b2]
  - @marigold/components@11.2.1
  - @marigold/system@11.2.1

## 2.4.1

### Patch Changes

- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/components@11.2.0
  - @marigold/system@11.2.0

## 2.4.0

### Minor Changes

- 3d7aaad: feat(DST-693): Expose `theme.css` files from packages

### Patch Changes

- Updated dependencies [be665e7]
  - @marigold/components@11.1.1
  - @marigold/system@11.1.1

## 2.3.0

### Minor Changes

- fd96b48: feat(DST-689): Allow to style body element and header row of a `<Table>`

### Patch Changes

- Updated dependencies [fd96b48]
- Updated dependencies [300bfba]
  - @marigold/components@11.1.0
  - @marigold/system@11.1.0

## 2.2.9

### Patch Changes

- Updated dependencies [8e58923]
  - @marigold/components@11.0.2
  - @marigold/system@11.0.2

## 2.2.8

### Patch Changes

- c0b8d18: HOTFIX: add missing dependency for marigold 11
- Updated dependencies [c0b8d18]
  - @marigold/theme-plugins@1.0.1
  - @marigold/system@11.0.1
  - @marigold/components@11.0.1

## 2.2.7

### Patch Changes

- Updated dependencies [964e025]
- Updated dependencies [82c869c]
- Updated dependencies [d96b809]
  - @marigold/components@11.0.0
  - @marigold/system@11.0.0

## 2.2.6

### Patch Changes

- Updated dependencies [bb2049f]
- Updated dependencies [7f0841d]
  - @marigold/components@10.2.1
  - @marigold/system@10.2.1
  - @marigold/theme-preset@1.3.29

## 2.2.5

### Patch Changes

- Updated dependencies [b89cd49]
- Updated dependencies [dc53196]
  - @marigold/components@10.2.0
  - @marigold/system@10.2.0
  - @marigold/theme-preset@1.3.28

## 2.2.4

### Patch Changes

- @marigold/components@10.1.3
- @marigold/system@10.1.3
- @marigold/theme-preset@1.3.27

## 2.2.3

### Patch Changes

- 3878b6b: fix([DST-638]): update theme package.jsons to resolve the warning: The condition "types" here will never be used as it comes after both "import" and "require".
  - @marigold/system@10.1.2
  - @marigold/components@10.1.2
  - @marigold/theme-preset@1.3.26

## 2.2.2

### Patch Changes

- Updated dependencies [17fd7b4]
- Updated dependencies [93f783a]
- Updated dependencies [d52e52f]
- Updated dependencies [d326823]
- Updated dependencies [85e8cba]
- Updated dependencies [38d461d]
- Updated dependencies [425ce62]
  - @marigold/components@10.1.1
  - @marigold/system@10.1.1
  - @marigold/theme-preset@1.3.25

## 2.2.1

### Patch Changes

- 05f84b1: docs: adjust font size of `code` in `<SectionMessage>` and make them less distracting
- b4036c6: docs([DST-587]): revise `<DatePicker>` page according to new component page structure

  Revised the `<DatePicker>` documentation page to our new layout of component pages.

- Updated dependencies [f2bae7e]
- Updated dependencies [80a9f5b]
- Updated dependencies [2d701a6]
- Updated dependencies [a917acf]
- Updated dependencies [83ad341]
- Updated dependencies [22200a0]
- Updated dependencies [222f674]
- Updated dependencies [ac29d40]
- Updated dependencies [ebc53cb]
- Updated dependencies [3bf3a8e]
- Updated dependencies [2cb5d38]
- Updated dependencies [313f004]
  - @marigold/components@10.1.0
  - @marigold/system@10.1.0
  - @marigold/theme-preset@1.3.24

## 2.2.0

### Minor Changes

- 6687af7: refa: remove footer from `<Dialog>` + allow styles
  - dialogs can only have action now
  - align buttons in `<Dialog.Actions>` correctly

### Patch Changes

- 165e184: style(docs): Improve whitespace of `p`

  Removed the top margin because this lead to some weird extra whitespace.

- 9ff555b: docs: add landing page to the site
- Updated dependencies [65608b4]
- Updated dependencies [caefbe4]
- Updated dependencies [2d9917f]
- Updated dependencies [6f8e3a2]
- Updated dependencies [7ea3838]
- Updated dependencies [6687af7]
- Updated dependencies [2babc0b]
- Updated dependencies [f18c8aa]
- Updated dependencies [d5386e4]
- Updated dependencies [5c029ec]
- Updated dependencies [2169b6f]
- Updated dependencies [bfd2843]
- Updated dependencies [0e77996]
- Updated dependencies [b8cd92a]
- Updated dependencies [45fb3c4]
- Updated dependencies [f6a132c]
- Updated dependencies [956982a]
- Updated dependencies [df04623]
  - @marigold/components@10.0.0
  - @marigold/system@10.0.0
  - @marigold/theme-preset@1.3.23

## 2.1.1

### Patch Changes

- Updated dependencies [[`de0c9e9`](https://github.com/marigold-ui/marigold/commit/de0c9e94584b3f1733bda09722b0e2eb2fc0a8eb), [`d700af0`](https://github.com/marigold-ui/marigold/commit/d700af043a720a231cd4f6de03f59b62b945727f), [`406fd1f`](https://github.com/marigold-ui/marigold/commit/406fd1fed939f75a6731d5e0ec4baa40751dedc8), [`46f06db`](https://github.com/marigold-ui/marigold/commit/46f06dbb3cc38c17aeb1734fa0b8733c4055fcc4), [`66eae8f`](https://github.com/marigold-ui/marigold/commit/66eae8f4ba8949ebabfcfa26de36a147b7765d38), [`77fe4ad`](https://github.com/marigold-ui/marigold/commit/77fe4adb2a9184d52d375eeca4f0993e8d43b7de), [`d35cc6d`](https://github.com/marigold-ui/marigold/commit/d35cc6d7a66996e9da91936e736a7db57a4a2fd3), [`b2b79d4`](https://github.com/marigold-ui/marigold/commit/b2b79d4daf0ab4950a255039729d216023af1764), [`0523f69`](https://github.com/marigold-ui/marigold/commit/0523f69e6bd370ae5be57a5b28cc341b3bb34b82), [`b8c991f`](https://github.com/marigold-ui/marigold/commit/b8c991fc249f69fab09d9aa3c6a71923cf8324de)]:
  - @marigold/components@9.0.2
  - @marigold/system@9.0.2
  - @marigold/theme-preset@1.3.22

## 2.1.0

### Minor Changes

- [#4054](https://github.com/marigold-ui/marigold/pull/4054) [`0fb763d`](https://github.com/marigold-ui/marigold/commit/0fb763ddd199c4f8f2477064d4008fdf22b949a4) Thanks [@sebald](https://github.com/sebald)! - feat: add dedicated export for tokens to all themes (`@marigold/<theme-name>/tokens`)

### Patch Changes

- Updated dependencies [[`5d53af4`](https://github.com/marigold-ui/marigold/commit/5d53af4ef32d8f70ae8d2d84db4fbfdd60998e79), [`965512c`](https://github.com/marigold-ui/marigold/commit/965512c113938cac629bb6cc518926f0d600b40f), [`9598df4`](https://github.com/marigold-ui/marigold/commit/9598df4ed6ac3fa72620d3b2b41d47a451a55d79)]:
  - @marigold/components@9.0.1
  - @marigold/system@9.0.1
  - @marigold/theme-preset@1.3.21

## 2.0.5

### Patch Changes

- [#4028](https://github.com/marigold-ui/marigold/pull/4028) [`db4fa1d`](https://github.com/marigold-ui/marigold/commit/db4fa1d08c80a90b05352bd4ec2e53b0084f843f) Thanks [@sebald](https://github.com/sebald)! - docs: Introduce an appearance demo

- [#4034](https://github.com/marigold-ui/marigold/pull/4034) [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d) Thanks [@sebald](https://github.com/sebald)! - fix([DST-500]): fix popover placement

- Updated dependencies [[`0bf0940`](https://github.com/marigold-ui/marigold/commit/0bf0940842eca39810cb644e4b3b935eaf0f2f4c), [`94e9a1b`](https://github.com/marigold-ui/marigold/commit/94e9a1be5ec8ed56aabab335b4867903161c60b8), [`db4fa1d`](https://github.com/marigold-ui/marigold/commit/db4fa1d08c80a90b05352bd4ec2e53b0084f843f), [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d), [`449de9b`](https://github.com/marigold-ui/marigold/commit/449de9b61c95b1fd848dc31d33143f5e73197383), [`41428b3`](https://github.com/marigold-ui/marigold/commit/41428b3ac939ff970149e046cd31d1d8aacbd9bc), [`391dcd1`](https://github.com/marigold-ui/marigold/commit/391dcd18ea761494ac242ffbfe3e356ab6bbdea8)]:
  - @marigold/components@9.0.0
  - @marigold/system@9.0.0
  - @marigold/theme-preset@1.3.20

## 2.0.4

### Patch Changes

- Updated dependencies [[`ed3bd89`](https://github.com/marigold-ui/marigold/commit/ed3bd8975c535817ca904bd1f17b1a4009950e2b), [`c64d71e`](https://github.com/marigold-ui/marigold/commit/c64d71e190ba7b361fefeb94e25daa8715050448), [`864ed08`](https://github.com/marigold-ui/marigold/commit/864ed08bbc7305292e4777baad795b39e8c171f1)]:
  - @marigold/components@8.0.2
  - @marigold/system@8.0.2
  - @marigold/theme-preset@1.3.19

## 2.0.3

### Patch Changes

- Updated dependencies [[`a02f284`](https://github.com/marigold-ui/marigold/commit/a02f284baa1e4bc78dbad960377810a1665a5c49)]:
  - @marigold/components@8.0.1
  - @marigold/system@8.0.1
  - @marigold/theme-preset@1.3.18

## 2.0.2

### Patch Changes

- Updated dependencies [[`2cde433`](https://github.com/marigold-ui/marigold/commit/2cde433e21bc49e378b96c9d812baf21914cf382), [`d053e37`](https://github.com/marigold-ui/marigold/commit/d053e37f49ef382ea33c7743d0d67d89153ccc9e), [`0773aa8`](https://github.com/marigold-ui/marigold/commit/0773aa8cd6ee71faf4f0d04f80f33cbe7fc56202), [`9c5b80c`](https://github.com/marigold-ui/marigold/commit/9c5b80c7a1dbfef5e1e7c2a557fc17f81640945c), [`5977cba`](https://github.com/marigold-ui/marigold/commit/5977cba2ce729ea32f9db869e9c19e16032e58ec), [`3f7a4ec`](https://github.com/marigold-ui/marigold/commit/3f7a4ec80a4b56fea3c63e44b71ad86fa36e3d75)]:
  - @marigold/components@8.0.0
  - @marigold/system@8.0.0
  - @marigold/theme-preset@1.3.17

## 2.0.1

### Patch Changes

- [#3934](https://github.com/marigold-ui/marigold/pull/3934) [`de73b5a`](https://github.com/marigold-ui/marigold/commit/de73b5af0f1108e1fbe33feaa62a52348f942e1c) Thanks [@sebald](https://github.com/sebald)! - refa: don't use tailwinds color import

- Updated dependencies []:
  - @marigold/system@7.8.2
  - @marigold/components@7.8.2
  - @marigold/theme-preset@1.3.16

## 2.0.0

### Major Changes

- [#3933](https://github.com/marigold-ui/marigold/pull/3933) [`bc08a48`](https://github.com/marigold-ui/marigold/commit/bc08a48087c31b501b5e4aeb9a992cb97ad9e21d) Thanks [@sebald](https://github.com/sebald)! - feat: new package `@marigold/theme-docs`

### Patch Changes

- Updated dependencies [[`290dc0e`](https://github.com/marigold-ui/marigold/commit/290dc0e8b5b5fc1492d391d8e6156bd849f0b37d)]:
  - @marigold/components@7.8.1
  - @marigold/system@7.8.1
  - @marigold/theme-preset@1.3.15
