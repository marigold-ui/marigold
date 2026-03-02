# Content Patterns

Detailed templates and patterns for different documentation types.

## Writing Style Rules

### Never Use Dashes in Prose

**CRITICAL**: Do not use em dashes (—) or en dashes (–) in documentation text.

Use alternative punctuation:
- Use commas for parenthetical information
- Use periods to separate independent clauses
- Use colons to introduce lists or explanations
- Rephrase sentences to avoid needing dashes

**Examples:**
- ❌ "When users need to upload files—such as documents or images—use FileField"
- ✅ "When users need to upload files such as documents or images, use FileField"
- ❌ "The component provides two methods—drag and drop or browse"
- ✅ "The component provides two methods: drag and drop or browse"
- ❌ "For specific use cases—like accepting only PDFs—specify allowed types"
- ✅ "For specific use cases, such as accepting only PDFs, specify allowed types"

## Component Documentation Pattern

### Frontmatter
```yaml
---
title: ComponentName
caption: Brief one-sentence description of what the component does.
badge: updated  # optional: "new", "updated"
---
```

### Introduction (2-3 paragraphs)

**Paragraph 1:** Define what the component is and its primary purpose.

Template:
> The `<ComponentName>` component is a [category] that allows users to [primary action]. It is used for [main use case] such as [example 1], [example 2], or [example 3].

Example:
> The `<Button>` component is a crucial component of any user interface, allowing users to initiate actions such as submitting forms, adding items to a cart, or opening dialogs.

**Paragraph 2 (optional):** Explain variations or additional context.

Template:
> Different types of [component], such as [variant 1] and [variant 2], help guide users by [benefit]. [Variant 1] are typically used for [use case], while [variant 2] provide [alternative use case].

**Paragraph 3 (optional):** Broader context or common applications.

Template:
> [Component name] are particularly useful in [context] where users need to [action]. They provide [benefit] and can be combined with [other elements].

### Anatomy Section

```mdx
## Anatomy

A [component] consists of [part 1], [part 2], and [part 3], which users can [interaction] using [method].

<Image
  src="/component/component-anatomy.svg"
  alt="Anatomy of a component"
  width={800}
  height={550}
  className="mx-auto block"
/>
```

**Guidelines:**
- List all visual parts of the component
- Explain how users interact with it
- Always include an annotated diagram image
- Use passive, descriptive language

### Appearance Section

```mdx
## Appearance

<AppearanceDemo component={title} />

<AppearanceTable component={title} />
```

**Required:**
- Must have `{component}-appearance.demo.tsx` file
- Demo must accept props to show variants

### Usage Section

The main content section organized by **use cases**, not API features. Focus on scenarios where users would apply the component, ordered from most common to least common.

**Key Principle**: Don't walk through each prop. Instead, explain real-world scenarios and when/why to use the component that way.

**Ordering Strategy**:
1. **Primary use case** - The most common, basic usage
2. **Common variations** - Frequently needed modifications
3. **Specific scenarios** - Situational features (validation, error states, etc.)
4. **Guidelines** - Best practices, do/donts, accessibility
5. **Edge cases** - Less common but important scenarios
6. **Advanced usage** - Complex or rarely used features

#### Use Case Subsection Pattern

**Use-case driven** (correct approach):
```mdx
### Uploading multiple files

When users need to attach multiple documents at once—such as supporting materials for an application or multiple photos for a gallery—set the `multiple` prop to `true`.

<ComponentDemo file="./component-multiple.demo.tsx" />
```

**API-driven** (avoid):
```mdx
### Multiple prop

The `multiple` prop allows multiple file selection.

<ComponentDemo file="./component-multiple.demo.tsx" />
```

**Guidelines:**
- Lead with the use case or scenario, not the prop name
- Explain WHEN and WHY users would need this
- Use subsection titles that describe scenarios, not features
- Good: "Uploading multiple files", "Restricting file types", "Handling large forms"
- Avoid: "Multiple prop", "Accept prop", "Width customization"

#### Guideline Subsection Pattern

```mdx
### Guideline Topic

Explanation of the guideline and why it matters.

<GuidelineTiles>
  <Do>
    <Do.Figure>
      <Image src="/component/do.jpg" alt="..." width={700} height={700} unoptimized />
    </Do.Figure>
    <Do.Description>
      Clear, actionable guidance on correct usage.
    </Do.Description>
  </Do>
  <Dont>
    <Dont.Figure>
      <Image src="/component/dont.jpg" alt="..." width={700} height={700} unoptimized />
    </Dont.Figure>
    <Dont.Description>
      Clear explanation of what to avoid.
    </Dont.Description>
  </Dont>
</GuidelineTiles>
```

**When to use:**
- Visual hierarchy or placement decisions
- Common mistakes to avoid
- Accessibility considerations
- Best practices with clear right/wrong examples

**Text-only pattern** (for simple guidelines):
```mdx
<GuidelineTiles>
  <Do>
    <Do.Description>Keep button labels short and to the point.</Do.Description>
  </Do>
  <Do>
    <Do.Description>
      Write button text that is clear and starts with a verb.
    </Do.Description>
  </Do>
</GuidelineTiles>
```

#### Accessibility Callout Pattern

```mdx
<SectionMessage variant="info">
  <SectionMessage.Title>Keep it accessible</SectionMessage.Title>
  <SectionMessage.Content>
    Specific accessibility guidance, such as required ARIA attributes or
    keyboard interaction requirements.
  </SectionMessage.Content>
</SectionMessage>
```

**When to use:**
- After introducing a feature that needs a11y considerations
- When showing icon-only usage
- For keyboard interaction requirements
- Screen reader considerations

#### Warning Pattern

```mdx
<SectionMessage variant="warning">
  <SectionMessage.Title>Warning Title</SectionMessage.Title>
  <SectionMessage.Content>
    Explanation of what not to do and why it's problematic.
  </SectionMessage.Content>
</SectionMessage>
```

**When to use:**
- Critical mistakes that harm UX
- Common anti-patterns
- Technical limitations

### Props Section

```mdx
## Props

<StorybookHintMessage component={title} />

<PropsTable component={title} />
```

**Always include:**
- StorybookHintMessage before PropsTable
- Both components in this order
- No additional explanation needed (auto-generated)

### Alternative Components Section

```mdx
## Alternative components

- [ComponentName](/path/to/component): Brief description of when to use instead.
- [AnotherComponent](/path/to/another): Brief description of relationship.
```

**Guidelines:**
- List 2-4 related components
- Explain the relationship or when to use instead
- Use relative paths

## Pattern Documentation Pattern

### Frontmatter
```yaml
---
title: Pattern Name
caption: Brief description of what problem the pattern solves.
---
```

### Introduction

**Paragraph 1:** Problem statement and overview.

Template:
> [Pattern name] patterns provide [solution] for implementing [use case]. These patterns ensure [benefit] across [applicable components].

### Usage Section

Unlike components, patterns focus on **approaches and solutions** rather than features.

```mdx
## Usage

There are [number] main approaches for [pattern]:

**Approach 1**: Brief description.

**Approach 2**: Brief description.

### Approach 1 (Recommended)

Explanation of the approach, when to use it, and why it's recommended.

<ComponentDemo file="./approach-1.demo.tsx" />

### Approach 2

Explanation of the alternative approach and when to prefer it.

<ComponentDemo file="./approach-2.demo.tsx" />
```

### Related Section

```mdx
## Related

<TeaserList
  items={[
    {
      title: 'Component Name',
      href: '/path/to/component',
      caption: 'Description',
      icon: <svg>...</svg>,
    },
  ]}
/>
```

## Foundation Documentation Pattern

### Frontmatter
```yaml
---
title: Foundation Topic
caption: Brief description of the foundational concept.
---
```

### Structure

```mdx
---
title: Topic
caption: Brief description.
---

Introduction explaining the concept and why it matters.

## Key Concept 1

Explanation with examples.

```tsx
const Demo = () => (
  <Example />
);
```

## Key Concept 2

Explanation with examples.

## Reference

Table or list of available values, tokens, or options.
```

**Guidelines:**
- Focus on concepts, not components
- Include practical examples
- Provide reference tables
- Keep it concise and scannable

## Usage Section Ordering Examples

### Example: FileField Component

**Correct order** (common to complex, problem-focused):
1. Uploading files (basic user need - attaching files)
2. Uploading multiple files (specific scenario - batch uploads)
3. Restricting file types (UX guidance - preventing errors)
4. Labeling (best practice guideline)
5. Accessibility (a11y considerations)

**Incorrect order** (API-driven or common props):
1. ❌ Multiple prop (prop-focused instead of problem-focused)
2. ❌ Accept prop (prop-focused instead of problem-focused)
3. ❌ Disabled state (common prop, belongs in Props table)
4. ❌ Width customization (common prop, belongs in Props table)
5. ❌ Required (common prop, belongs in Props table)

### Example: Button Component

**Correct order** (common to complex, problem-focused):
1. Visual hierarchy (UX concept - guiding user actions)
2. Placement and order (UX guidance - action priority)
3. Icons and labels (UX best practice - clarity)
4. Destructive buttons (specific use case - dangerous actions)
5. Avoid disabled buttons (UX best practice - alternative approaches)
6. Button or link (component selection guidance)
7. Loading state (specific scenario - async operations)
8. Press events (advanced interaction handling)

**Incorrect order** (API-driven or common props):
1. ❌ Variant prop (prop-focused instead of UX-focused)
2. ❌ Size prop (common styling prop, belongs in Props table)
3. ❌ Disabled prop (common prop, belongs in Props table)
4. ❌ FullWidth prop (common layout prop, belongs in Props table)
5. ❌ OnPress prop (prop-focused instead of problem-focused)

## Common Usage Subsections

### Loading State
```mdx
### Loading state

The `<Component>` includes a `loading` property that can be used to display loading behavior. This visually indicates the progress of system operations.

While in the loading state, the component becomes disabled, preventing further interaction until the operation is completed.

<ComponentDemo file="./component-loading.demo.tsx" />
```

### Disabled State
```mdx
### Avoid disabled buttons

A disabled button can't be actioned. Keep buttons active and use validation and error messages to guide users on what needs to be done to proceed.

Disabled buttons are problematic as they offer no feedback on why an action is unavailable.

<GuidelineTiles>
  <Do>
    <Do.Description>
      Use validation and error messages to guide users.
    </Do.Description>
  </Do>
  <Dont>
    <Dont.Description>
      Don't disable form submission buttons without clear guidance.
    </Dont.Description>
  </Dont>
</GuidelineTiles>
```

### Labeling
```mdx
### Labeling

Labels should be clear, concise, and descriptive. Keep labels short (fewer than three words when possible).

If you are tight on space, consider rewording the label. Do not truncate label text with an ellipsis.

<GuidelineTiles>
  <Do>
    <Do.Description>
      If the label is long, wrap to a second line.
    </Do.Description>
  </Do>
  <Dont>
    <Dont.Description>
      Do not truncate label text with an ellipsis.
    </Dont.Description>
  </Dont>
</GuidelineTiles>
```

### Events/Interactions
```mdx
### Press Event

The `<Component>` supports user interactions via mouse, keyboard, and touch, handled through the `onPress` prop. This prop is similar to `onClick` but normalized for all interaction methods.

Each handler receives a `PressEvent`, providing details about the target and the type of event.

<ComponentDemo file="./component-press.demo.tsx" />
```
