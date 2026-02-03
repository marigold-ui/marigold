# Marigold v15.3.0

We're excited to announce the release of Marigold v15.3.0! This update brings a host of new features, enhancements, and bug fixes across our component library. In this release, you'll find new variants for cards and lists, expanded customization options for drawers and checkboxes, and several new beta components to help streamline your workflows. Read on for a detailed breakdown of what's new and improved in Marigold v15.3.0.

## Components

### Accordion

- Added two new properties. The `stickyHeader` prop keeps headers fixed while scrolling long content. `iconPosition` prop lets you place the header icon on the left or right side. Both properties applies to thw whole Accordion.

### Card

- Introduced new `master` and `admin` variants for the `<Card>` component. These variants enable you to display cards exclusively to users with master or admin roles, simplifying role-based content management.

### Checkbox

- Added a `description` property to the `<Checkbox>` component, allowing you to provide helpful text or guidance beneath the checkbox label.

### Confirmation Dialog and Hook (beta)

- Introduced the `<ConfirmationDialog>` component (beta), which provides a standardized modal dialog for confirming user actions such as deletions or submissions. This component helps ensure consistent confirmation flows across your application.

**Usage example:**

```jsx
<ConfirmationDialog
  title="Sign out"
  description="Are you sure you want to sign out? You can sign in again at any time."
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

Use `<ConfirmationDialog>` when you need to prompt users to confirm or cancel potentially destructive (`variant="destructive"`) or important actions.

In addition, there is a new `useConfirmation` hook to conveniently open confirmation dialogs from anywhere in your application. This hook provides an easy way to trigger a confirmation dialog and handle user responses without manually managing dialog state.

```jsx
const confirm = useConfirmation();
// Example mutation from TanStack React Query
const mutation = useMutation(deleteItem);

const handleDelete = async itemId => {
  // Returns true if the user confirmed, false otherwise.
  const confirmed = await confirm({
    title: 'Delete Item',
    description:
      'Are you sure you want to delete this item? This action cannot be undone.',
    variant: 'destructive',
  });
  if (confirmed) {
    mutation.mutate(itemId);
  }
};
```

### Drawer (beta)

- Added a `placement` property to the `<Drawer>` component, allowing you to open the drawer from the `left`, `right`, `top`, or `bottom` of the screen.
- Introduced size options for `<Drawer>`, making it easier to adjust the drawer's width for various use cases.

### Link

- Added a `small` size variant to the `<Link>` component, allowing you to easily display links with consistently smaller text.

### LinkButton (beta)

- Introduced the `<LinkButton>` component, which combines the appearance and accessibility of a button with the navigation behavior of a link. Use `<LinkButton>` when you want an element that looks and acts like a button but navigates to a different page or route when clicked.

**Usage example:**

```jsx
<LinkButton href="/settings" variant="primary">
  Go to Settings
</LinkButton>
```

### List

- Added a `small` variant to the `<List>` component, allowing you to display more compact lists when needed.

### Menu

- Added a `destructive` variant to the `<Menu.Item>` component, allowing you to visually indicate actions that are potentially harmful or irreversible (such as "Delete" or "Remove").

### Text

- Added a `noWrap` property to the `<Text>` component, allowing you to prevent text from wrapping onto multiple lines. This is especially useful when `<Text>` is used in tables.
- Add white space control to `<Text>`, allowing you to manage how whitespace is handled within text elements for improved formatting flexibility.

## Miscellaneous

- Exposed `TimeValue` types from `@marigold/components` to facilitate better type safety and integration when working with time-related properties in components like `<TimeField>`.
- Added a helper function called `parseFormData` to conveniently parse form data, simplifying the process of extracting and handling form inputs in your applications when using the `onSubmit` handler.
- Add more alignment options to `<Inline>`, `<Stack>` and `<Grid>` components, allowing for greater flexibility in layout and design.

## Design

- Improved `<List>` styles for better readability and visual consistency.
- Adjusted `<Tag>` styles to remove extra padding when displaying a small or text-only tag, ensuring a more compact appearance in empty or minimal states.

## Documentation

- Introduced a new "Action" category for components, grouping together related components such as `<Button>`, `<ButtonLink>`, and `<Link>` for improved discoverability and organization.
- Although the `<Drawer>` component remains in beta, comprehensive documentation is now available.

## Bug fixes

- Updated all `react-aria` dependencies to allow version ranges instead of pinning to specific versions. This change helps prevent accidental installation of multiple versions in the future.
- Adjusted `<Accordion.Header>` styles to support full width, ensuring headers span the entire container for improved usability and alignment.
- Applied the `data-rac` attribute to all table elements. This prevents accidental style overrides and ensures consistent table styling across our applications.
- Added font color in the `<Accordion>` component to ensure text is displayed with the correct color across all applications.
- Added `background-color` in the `<Accordion>` component to ensure consistent background styling across all applications.
- Added missing `background-color` for the `master` and `admin` badge variants to ensure they display with the correct background styling across all applications.
- Removed extra padding at the bottom of `<Select>` to ensure a more compact and visually consistent appearance.
