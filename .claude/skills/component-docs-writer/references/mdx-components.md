# MDX Components Reference

Special components available in Marigold documentation MDX files.

## Component Demos

### ComponentDemo

Embeds an interactive demo from a `.demo.tsx` file.

```mdx
<ComponentDemo file="./button-icon.demo.tsx" />
```

**Props:**
- `file` (required) - Relative path to the demo file

**Usage:**
- Use for all interactive examples
- Path is relative to the current MDX file
- Demo file must be in the same directory

### AppearanceDemo

Automatically renders all variants of a component with variant/size switchers.

```mdx
<AppearanceDemo component={title} />
```

**Props:**
- `component` (required) - Component name (usually `{title}` from frontmatter)

**Usage:**
- Always use in the "Appearance" section
- Requires corresponding `.demo.tsx` file named `{component}-appearance.demo.tsx`
- Demo must accept props to show different variants

### AppearanceTable

Displays a table describing all available variants for a component.

```mdx
<AppearanceTable component={title} />
```

**Props:**
- `component` (required) - Component name (usually `{title}` from frontmatter)

**Usage:**
- Always place after `<AppearanceDemo>`
- Auto-generated from theme configuration

## Guidelines

### GuidelineTiles

Container for Do/Dont guideline examples.

```mdx
<GuidelineTiles>
  <Do>
    <Do.Description>
      Use clear, action-oriented button labels.
    </Do.Description>
  </Do>
  <Dont>
    <Dont.Description>
      Don't use vague or ambiguous button text.
    </Dont.Description>
  </Dont>
</GuidelineTiles>
```

**Usage:**
- Use for showing correct vs incorrect usage
- Can include text-only or visual examples
- Typically 2-4 guidelines per tile group

### Do

Individual "Do" guideline with optional visual.

```mdx
<Do>
  <Do.Figure>
    <Image src="/path/to-do.jpg" alt="..." width={700} height={700} />
  </Do.Figure>
  <Do.Description>
    Clear guidance on what to do.
  </Do.Description>
</Do>
```

**Nested components:**
- `<Do.Figure>` (optional) - Visual example
- `<Do.Description>` (required) - Text explanation

**Usage:**
- Description only for simple guidelines
- Figure + Description for visual guidelines

### Dont

Individual "Don't" guideline with optional visual.

```mdx
<Dont>
  <Dont.Figure>
    <Image src="/path/to-dont.jpg" alt="..." width={700} height={700} />
  </Dont.Figure>
  <Dont.Description>
    Clear guidance on what to avoid.
  </Dont.Description>
</Dont>
```

**Nested components:**
- `<Dont.Figure>` (optional) - Visual example
- `<Dont.Description>` (required) - Text explanation

## Messages

### SectionMessage

Callout boxes for important information, warnings, or tips.

```mdx
<SectionMessage variant="info">
  <SectionMessage.Title>Keep it accessible</SectionMessage.Title>
  <SectionMessage.Content>
    For icon-only buttons, ensure you set an `aria-label` attribute.
  </SectionMessage.Content>
</SectionMessage>
```

**Props:**
- `variant` - `"info"`, `"warning"`, or `"error"` (optional, defaults to info)

**Nested components:**
- `<SectionMessage.Title>` (required) - Heading
- `<SectionMessage.Content>` (required) - Body content

**Usage:**
- `variant="info"` - Accessibility tips, helpful information
- `variant="warning"` - Important cautions, things to avoid
- `variant="error"` - Critical issues, severe mistakes

## Content

### Image

Next.js optimized image component.

```mdx
<Image
  src="/button/button-anatomy.jpg"
  alt="Anatomy of a button"
  width={800}
  height={550}
  className="mx-auto block"
/>
```

**Props:**
- `src` (required) - Path to image in `public/` directory
- `alt` (required) - Accessibility description
- `width` (required) - Image width in pixels
- `height` (required) - Image height in pixels
- `className` (optional) - Tailwind classes (commonly `"mx-auto block"` for centered)
- `unoptimized` (optional) - Skip Next.js optimization

**Usage:**
- Use for anatomy diagrams, Do/Dont visuals
- Images stored in `docs/public/{component}/`
- Always include descriptive alt text
- Use `className="mx-auto block"` to center

### Table

Custom table component for structured data.

```mdx
<Table>
  <Table.Header>
    <Table.Column>Variant</Table.Column>
    <Table.Column>Use Case</Table.Column>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>primary</Table.Cell>
      <Table.Cell>Main call-to-action</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>secondary</Table.Cell>
      <Table.Cell>Less prominent actions</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

**Nested components:**
- `<Table.Header>` - Column headers
- `<Table.Column>` - Individual header cell
- `<Table.Body>` - Table rows
- `<Table.Row>` - Individual row
- `<Table.Cell>` - Individual cell

**Usage:**
- Use for comparing variants, features, or specifications
- Keep tables concise (3-5 rows ideal)

## Props Documentation

### PropsTable

Auto-generated props table from TypeScript types.

```mdx
<PropsTable component={title} />
```

**Props:**
- `component` (required) - Component name (usually `{title}` from frontmatter)

**Usage:**
- Always use in the "Props" section
- Place after `<StorybookHintMessage>`
- Auto-generated from component TypeScript definitions

### StorybookHintMessage

Link to component's Storybook page.

```mdx
<StorybookHintMessage component={title} />
```

**Props:**
- `component` (required) - Component name (usually `{title}` from frontmatter)

**Usage:**
- Always place before `<PropsTable>` in Props section
- Provides link to interactive Storybook examples

## Navigation

### TeaserList

Grid of related component/pattern links.

```mdx
<TeaserList
  items={[
    {
      title: 'Button',
      href: '/components/actions/button',
      caption: 'Learn more about the Button component.',
      icon: <svg>...</svg>,
    },
    {
      title: 'Link',
      href: '/components/actions/link',
      caption: 'Learn more about the Link component.',
      icon: <svg>...</svg>,
    },
  ]}
/>
```

**Props:**
- `items` (required) - Array of objects with:
  - `title` - Link text
  - `href` - URL path
  - `caption` - Description
  - `icon` - SVG icon element

**Usage:**
- Use at the end of pattern docs for related components
- Typically 2-4 items
- Icons are optional but recommended

## Common Patterns

### Standard Component Page Structure

```mdx
---
title: Component Name
caption: Brief description.
---

{/* Introduction paragraphs */}

## Anatomy
<Image src="/component/anatomy.jpg" alt="..." width={800} height={550} className="mx-auto block" />

## Appearance
<AppearanceDemo component={title} />
<AppearanceTable component={title} />

## Usage

### Feature Name
<ComponentDemo file="./component-feature.demo.tsx" />

### Guidelines
<GuidelineTiles>
  <Do>
    <Do.Description>Do this.</Do.Description>
  </Do>
  <Dont>
    <Dont.Description>Don't do this.</Dont.Description>
  </Dont>
</GuidelineTiles>

<SectionMessage variant="info">
  <SectionMessage.Title>Accessibility Note</SectionMessage.Title>
  <SectionMessage.Content>
    Important a11y consideration.
  </SectionMessage.Content>
</SectionMessage>

## Props
<StorybookHintMessage component={title} />
<PropsTable component={title} />

## Alternative components
- [Related](/path): Description
```
