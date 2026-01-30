# TableView Features

This document provides a comprehensive list of features available in the `<TableView>` component.

## Foundation

- **Built on React Aria Components**: Provides excellent accessibility and ARIA compliance out of the box
- **Keyboard Navigation**: Full keyboard support for navigating and interacting with the table
- **Semantic HTML**: Uses proper table elements (`table`, `thead`, `tbody`, `tr`, `th`, `td`)
- **Theme Integration**: Integrated with Marigold's theming system via `useClassNames`

## Selection

- **Selection Modes**: Support for `none`, `single`, and `multiple` row selection
- **Checkbox Selection**: Automatic checkboxes in first column when selection is enabled
- **Select All**: Header checkbox for selecting/deselecting all rows (multiple selection mode)
- **Controlled Selection**: Manage selection state via `selectedKeys` and `onSelectionChange` props
- **Selection Behavior**: Toggle behavior for row selection

## Sorting

- **Sortable Columns**: Enable sorting on individual columns via `allowsSorting` prop
- **Sort Direction**: Support for ascending and descending sort order
- **Sort Indicators**: Visual icons indicating sort state and direction
- **Sort Descriptor**: Track current sort state with `sortDescriptor` prop
- **Custom Sort Handler**: Implement client-side or server-side sorting via `onSortChange`

## Column Features

- **Fixed Width**: Set exact column width via `width` prop
- **Resizable Columns**: Columns can be resized by users (via `ResizableTableContainer`)
- **Min/Max Width**: Constrain column sizes with `minWidth` and `maxWidth` props
- **Column Alignment**: Align column content (left, center, right) via `align` prop
- **Nested Columns**: Support for grouped column headers
- **Dynamic Columns**: Show/hide columns dynamically using `columns` prop with collections
- **Row Header Columns**: Mark semantic row headers via `isRowHeader` prop

## Cell Features

- **Cell Alignment**: Individual cell text alignment via `align` prop
- **Editable Cells**: Inline editing with `<TableView.EditableCell>`
  - Popover editing on desktop
  - Dialog editing on mobile/small screens
  - Form submission with `onSubmit` callback
  - Cancel and save actions
  - Loading state during save operations
  - Support for React 19 form actions
- **Colspan**: Merge cells across columns via `colSpan` prop
- **Text Selection**: Control text selectability via `allowTextSelection` prop
- **Overflow Handling**: Choose between `wrap` (default) or `truncate` for cell content
- **Selectable Text Wrapper**: Internal wrapper for text selection without interfering with row selection

## Layout & Appearance

- **Variants**:
  - `default`: Standard table appearance
  - `muted`: Reduced visual noise with muted backgrounds
  - `grid`: Vertical borders between columns for better separation
  - `admin`/`master`: Internal-only feature markers
- **Size Variants**: `default`, `compact`, `spacious` for different density needs
- **Sticky Header**: Pin header to top during scroll via `sticky` prop on `<TableView.Header>`
- **Scrollable Container**: Works with `<Scrollable>` component for fixed-height tables
- **Responsive**: Adapts behavior for small screens (e.g., editable cells use dialogs)

## Content & Data

- **Static Content**: Direct JSX children for simple tables
- **Dynamic Collections**: Use `items` prop with render functions for data-driven tables
- **Empty State**: Custom empty state component via `emptyState` prop on `<TableView.Body>`
- **Dependencies Tracking**: Re-render optimization via `dependencies` prop

## Interactive Features

- **Row Actions**:
  - Embed buttons in cells for row-specific actions
  - Support for `<ActionMenu>` to group multiple actions
  - Destructive action variants
- **Clickable Rows**: Navigate via `href` prop on `<TableView.Row>`
- **Editable Cells**:
  - Edit button appears on hover
  - Supports any form input (TextField, Select, etc.)
  - Cancel/save controls
  - Loading states
  - Form validation support

## Drag and Drop

- **Row Reordering**: Drag and drop to reorder rows
- **Drag Preview**: Custom drag preview component via `<TableView.DragPreview>`
- **Drop Indicators**: Visual feedback during drag via `<TableView.DropIndicator>`
- **Drag Hooks**: Integration with `useDragAndDrop` from react-aria-components
- **Custom Handlers**: `onReorder` callback for implementing reorder logic

## Data Formatting

- **Numeric Formatting**: Works with `<NumericFormat>` component for currency, percentages, etc.
- **Date Formatting**: Works with `<DateFormat>` component
- **Badge/Tag Display**: Embed `<Badge>` components for status indicators
- **Secondary Content**: Stack multiple pieces of information in cells using `<Stack>`

## Accessibility Features

- **ARIA Labels**: Required `aria-label` prop for table identification
- **Screen Reader Support**: Proper ARIA roles and attributes
- **Keyboard Navigation**:
  - Arrow keys for navigation
  - Space/Enter for selection
  - Tab navigation through interactive elements
- **Focus Management**: Proper focus indicators and focus trap in editable cells
- **Sort Announcements**: Screen reader announcements for sort state changes

## Advanced Features

- **Resizable Container**: Horizontal resizing of entire table via `<ResizableTableContainer>`
- **Context Provider**: Shares theme and configuration across all table components
- **Selection Behavior**: Customizable selection interaction patterns
- **Multi-column Actions**: Support for action columns with multiple buttons/menus
- **Conditional Rendering**: Show/hide columns or cells based on data or state
- **Custom Cell Renderers**: Full control over cell content and styling

## Developer Experience

- **TypeScript Support**: Full type definitions for all components and props
- **Compound Components**: Clean API with `TableView.Header`, `TableView.Column`, etc.
- **React 19 Compatible**: Supports latest React patterns including form actions
- **Storybook Integration**: Comprehensive stories demonstrating all features
- **Test Coverage**: Unit and component tests for all major features
