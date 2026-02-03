# Marigold v13.0.0

The latest Marigold release brings a range of enhancements across components, documentation, and infrastructure—focused on improved accessibility, flexibility, and design consistency.

## Breaking Changes

**Deprecation of B2B and Core Themes**: As part of our ongoing efforts to streamline our themes and focus on the RUI theme, we have made the following changes:

- `@marigold/theme-b2b` and `@marigold/theme-core` are now deprecated and will no longer receive updates or maintenance. Please migrate to RUI theme package.
- The **FieldGroup** component has been removed and is no longer available in `@marigold/components`.
- All documentation and Storybook references to the B2B and Core themes, as well as `<FieldGroup>`, have been removed.

**Text**: We removed certain properties from the `<Text>` component, including `className` and standard HTML attributes. This change is made to ensure a more consistent and predictable API for the component. If you were using these properties, please update your code accordingly.

## Improvements

### Components

#### New

**TimeField**: We now support the `<TimeField>` component. It provides a flexible and accessible way to select time values.

```tsx
<TimeField label="Event time" defaultValue={parseTime('13:45')} />
```

**ContextualHelp**: The `<ContextualHelp>` component has been introduced to provide users with additional information and guidance within the UI. It can be used to display tooltips or help text in a consistent manner.

```tsx
<ContextualHelp>
  <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
  <ContextualHelp.Content>
    This Component explains the most important thinks in the This feature
    explains important functions to you directly in the context of the page.
    <br />
    <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
      To the documentation
    </Link>
  </ContextualHelp.Content>
</ContextualHelp>
```

Also we have made several improvements to our components:

#### Design Alignment:

- **ListBox**, **SelectList** and **Multiselect** components have been updated to align with the latest RUI design standards.
- **Menu** component has been updated to support the latest design standards and now includes a new `ghost` variant for a more subtle appearance.
- **Link** component has been enhanced new styles and variants. You can now use the variant `secondary` for an alternative link style.
- **Badge** styles has been updated to match the latest design standards.
- **Card** component now supports full width through the width property.
- **Accordion** has been improved to allow more flexibility in the header.

#### New Features:

- **Inline** has been improved to dynamically align buttons with input fields when description or error message are present.
- **Grid** component now also supports alignment of items in the grid.
- **Table** component has been updated, it now supports not anymore the right alignment of the last column per default. And you can use a new variant called `muted` to style the table in a more subtle way. Also you can align the content of the table items to the top position.
- **Stack** component has been improved to support the `asList` property, allowing rendering list element as stack for improved accessibility.

### Documentation

The documentation site needs to be updated to align with the latest visual direction and design system standards defined by the RUI theme. This involves replacing the existing "core" theme styling and structure with RUI’s modern visual language, ensuring consistency across the design and development ecosystem and streamlining the adoption of new patterns and tokens.

We also updated the documentation for the following components to our new component documentation format:

- **SelectList**
- **Text**
- **Headline**
- **RouterProvider**

### Infrastructure

- **React Aria Components**: We have updated the React Aria components to the latest version, ensuring compatibility with the latest features and improvements in the React Aria library.

---

Thanks for reading, and we hope you enjoy the new features in the new Marigold version! Be sure to check out the updated documentation for more details, and as always, we're here if you need help.
