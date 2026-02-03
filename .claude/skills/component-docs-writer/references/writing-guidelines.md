# Writing Guidelines

Tone, style, and language conventions for Marigold documentation.

## Documentation Philosophy

### Use-Case Driven, Not API-Driven

Documentation should help users accomplish their goals, not explain the API.

**Principles:**
- Organize by scenarios and use cases, not by props or API features
- Explain WHEN and WHY to use features, not just HOW
- Lead with user needs, not technical capabilities
- Order content from most common to least common usage

**Example - Use-case driven** (correct):
```mdx
### Uploading documents for review

When users need to submit documents like resumes or contracts for review,
use the `<FileField>` with file type restrictions to ensure only appropriate
formats are accepted.
```

**Example - API-driven** (avoid):
```mdx
### Accept Prop

The `accept` prop lets you specify which file types are allowed.
```

### Ordering by Frequency

Always order usage subsections from most common to least common:

1. **Primary use case** - What most users will do most of the time
2. **Common variations** - Frequently needed modifications
3. **Best practices** - Important guidelines (labeling, accessibility)
4. **Specific scenarios** - Situational features
5. **Edge cases** - Less common but important
6. **Advanced** - Rarely used or complex features

This helps users quickly find what they need without wading through edge cases.

## Tone and Voice

### Characteristics

**Clear and direct** - Get to the point quickly
- ✅ "Use checkboxes when users can select multiple options."
- ❌ "You might want to consider using checkboxes in situations where it would be beneficial for users to have the ability to select more than one option."

**Instructional, not conversational** - Professional but approachable
- ✅ "The Button component allows users to trigger actions."
- ❌ "Hey! So buttons are pretty cool—they let you do stuff when you click them!"

**Focus on "why" and "when"** - Not just "how"
- ✅ "Use primary buttons to highlight the most important action on the page."
- ❌ "The primary variant makes the button blue with white text."

**Accessibility-focused** - Always consider a11y
- ✅ "For icon-only buttons, ensure you set an aria-label attribute to provide context for screen readers."
- ❌ "Icon buttons look cleaner without text labels."

**Active voice** - Direct and engaging
- ✅ "Use validation messages to guide users."
- ❌ "Validation messages should be used to guide users."

## Language Conventions

### Punctuation

**Never use dashes:**

Do not use em dashes (—) or en dashes (–) in documentation. Use alternative punctuation instead:

❌ **Bad:**
```mdx
When users need to upload multiple files—such as photos for a gallery—enable multiple file selection.
```

✅ **Good (use commas):**
```mdx
When users need to upload multiple files, such as photos for a gallery, enable multiple file selection.
```

✅ **Good (use periods):**
```mdx
When users need to upload multiple files. For example, photos for a gallery or documents for a report.
```

✅ **Good (use parentheses):**
```mdx
When users need to upload multiple files (such as photos for a gallery), enable multiple file selection.
```

### Component References

Always use code formatting for component names:

```mdx
The `<Button>` component allows users to trigger actions.
```

Not:
```mdx
The Button component allows users to trigger actions.
```

### Props and Attributes

Use inline code for prop names and values:

```mdx
Set the `variant` prop to `"primary"` for the main call-to-action.

For icon-only buttons, add an `aria-label` attribute.
```

### Paths and Files

Use inline code for file paths:

```mdx
See the [documentation](/components/actions/button) for details.
```

### Boolean States

Be clear and consistent:
- ✅ "enabled" / "disabled"
- ✅ "checked" / "unchecked"
- ✅ "open" / "closed"
- ❌ "on" / "off" (ambiguous)

## Section-Specific Guidelines

### Introductions

**First paragraph template:**
```
The `<ComponentName>` component is a [category] that allows users to [primary action]. It is used for [use case] such as [example], [example], or [example].
```

**Example:**
```mdx
The `<Checkbox>` component is a form element that allows users to make a binary choice, either selecting or deselecting an option. Multiple checkboxes can be grouped together using `<Checkbox.Group>` to enable the selection of zero, one, or any number of options.
```

**Guidelines:**
- 2-3 paragraphs maximum
- Define what the component is
- Explain primary purpose
- List common use cases
- Avoid technical jargon

### Anatomy

**Template:**
```
A [component] consists of [part 1], [part 2], and [part 3]. Users interact with it by [interaction method].
```

**Example:**
```mdx
A checkbox consists of a clickable box and a label. The box has three states: unchecked, checked, or indeterminate. Users interact with the checkbox by clicking the box or label to toggle between states.
```

**Guidelines:**
- List visual parts
- Explain states if applicable
- Describe interaction method
- Keep to 2-3 sentences

### Usage Subsections

**Heading style - Use-case driven:**

Focus on scenarios and user needs, not props or technical features:

✅ **Good** (use-case driven):
- "Uploading multiple files" (scenario)
- "Restricting file types" (user need)
- "Handling large documents" (use case)
- "Visual hierarchy" (design concept)
- "Labeling" (best practice)

❌ **Avoid** (API-driven):
- "Multiple prop" (technical)
- "Accept prop" (technical)
- "Width prop" (technical)
- "File type restrictions" (borderline - "Restricting file types" is better)
- "The disabled state" (use "When to disable" or avoid entirely)

**Skip common/shared attributes:**

Do NOT create usage sections for properties that are common across all components of the same type. These are already documented in the Props table and don't need dedicated usage sections:

**For form fields** (TextField, FileField, NumberField, etc.):
- ❌ Don't document: `width`, `disabled` (unless field-specific guidance), `required`, `description`, `errorMessage`
- ✅ Do document: Field-specific features like `accept` for FileField, `multiple` for FileField, `type` for TextField

**For all components:**
- ❌ Don't document: Generic props like `className`, `style`, `id`, `data-*` attributes
- ✅ Do document: Component-specific behavior and features

**When to make an exception:**
- If there's specific UX guidance for how to use a common prop with THIS component
- If the common prop behaves uniquely for this component
- If there are common mistakes users make with this prop for this component

**General rules:**
- Use noun phrases or gerunds
- Lead with user goals or scenarios, not component features
- Avoid prop names in headings
- Think: "What is the user trying to accomplish?" not "What prop does this?"

**Content structure - ALWAYS lead with the problem:**

Each usage subsection MUST follow this structure:

1. **Describe the problem/scenario** (1-2 sentences from user's perspective)
   - What challenge does the user face?
   - What goal are they trying to accomplish?
   - When would they encounter this situation?
2. **Show the solution** (demo that solves the problem)
3. **Explain how it works** (how the component solves the problem, mentioning relevant props)
4. **Provide guidance** (optional: Do/Dont guidelines or best practices)

**Example - Correct pattern:**
```mdx
### Restricting file types

When users need to upload specific file formats—such as images for a profile picture or PDFs for document submission—you should limit which file types can be selected. This prevents errors and improves the user experience by guiding users toward acceptable formats.

<ComponentDemo file="./filefield-accept.demo.tsx" />

Use the `accept` prop to specify allowed file types using MIME types or file extensions. For example, `accept="image/*"` allows all image formats, while `accept=".pdf,.doc,.docx"` restricts to document types.

<SectionMessage variant="info">
  <SectionMessage.Title>Keep it accessible</SectionMessage.Title>
  <SectionMessage.Content>
    Always inform users about file type restrictions before they attempt to upload. Include this information in the field's label or help text.
  </SectionMessage.Content>
</SectionMessage>
```

**Example - Incorrect pattern (avoid):**
```mdx
### Accept prop

Set the `accept` prop to specify which file types are allowed.

<ComponentDemo file="./filefield-accept.demo.tsx" />
```

**Key principles:**
- ❌ Don't start with "Set the `prop`..." or "Use the `prop`..."
- ✅ Do start with "When users need to..." or "To [accomplish goal]..."
- ❌ Don't lead with the technical solution
- ✅ Do lead with the user problem or scenario
- ❌ Don't just show what it does
- ✅ Do explain why and when to use it
- Include helpful Do/Dont guidelines when there are common mistakes or best practices

### Guidelines (Do/Dont)

**Description style:**
- Start with action verb or imperative
- Be specific and actionable
- Explain "why" when not obvious

**Do:**
```mdx
<Do>
  <Do.Description>
    Use one primary button per page or section to highlight the most important action.
  </Do.Description>
</Do>
```

**Dont:**
```mdx
<Dont>
  <Dont.Description>
    Don't include multiple primary buttons in the same section to prevent confusion and visual clutter.
  </Dont.Description>
</Dont>
```

**Patterns:**
- Start Do with "Use...", "Keep...", "Provide..."
- Start Dont with "Don't use...", "Don't include...", "Avoid..."
- Explain the reason after the action

### Accessibility Notes

**When to include:**
- After introducing a feature needing a11y considerations
- For icon-only usage
- For keyboard interactions
- For screen reader considerations

**Style:**
```mdx
<SectionMessage variant="info">
  <SectionMessage.Title>Keep it accessible</SectionMessage.Title>
  <SectionMessage.Content>
    [Specific guidance with "what" and "why"]
  </SectionMessage.Content>
</SectionMessage>
```

**Example:**
```mdx
<SectionMessage variant="info">
  <SectionMessage.Title>Keep it accessible</SectionMessage.Title>
  <SectionMessage.Content>
    For icon-only buttons, ensure you set an `aria-label` or `aria-labelledby`
    attribute to provide context and maintain accessibility.
  </SectionMessage.Content>
</SectionMessage>
```

### Warnings

**When to include:**
- Critical mistakes that harm UX
- Common anti-patterns
- Technical limitations

**Style:**
```mdx
<SectionMessage variant="warning">
  <SectionMessage.Title>[Clear warning about the issue]</SectionMessage.Title>
  <SectionMessage.Content>
    [Explanation of why it's problematic and what to do instead]
  </SectionMessage.Content>
</SectionMessage>
```

**Example:**
```mdx
<SectionMessage variant="warning">
  <SectionMessage.Title>
    Never put tooltips on disabled buttons
  </SectionMessage.Title>
  <SectionMessage.Content>
    Tooltips aren't accessible on all devices or by some assistive technologies,
    and they should never be used on non-interactive elements.
  </SectionMessage.Content>
</SectionMessage>
```

## Word Choice

### Preferred Terms

| Use This | Not This | Why |
|----------|----------|-----|
| users | people, folks | Professional and clear |
| select | pick, choose | Standard UI terminology |
| click | press, tap | Covers all interaction methods when used with react-aria |
| disabled state | disabled mode | "State" is more accurate |
| variant | style, theme | Consistent with codebase |
| component | element, widget | Consistent terminology |

### Action Verbs

**For users:**
- select, deselect
- check, uncheck
- open, close
- expand, collapse
- enable, disable
- submit, cancel

**For developers:**
- use, implement
- set, configure
- add, include
- avoid, prevent
- ensure, verify

### Accessibility Terms

- screen reader (not "screen-reader")
- keyboard navigation (not "keyboard accessibility")
- ARIA attribute (not "aria property")
- assistive technology (not "AT")
- accessible (not "accessibility-friendly")

## Common Phrases

### To Start Sections

- "The `<Component>` component is..."
- "Use `<Component>` when..."
- "This [feature] allows users to..."
- "[Component] are particularly useful in..."

### To Introduce Guidelines

- "Keep [element] short and to the point."
- "Ensure [action] to maintain [benefit]."
- "Use [element] when [condition]."
- "Avoid [anti-pattern] as [reason]."

### To Reference Other Docs

- "For more information, see the [Component](/path) component."
- "Refer to the [Pattern](/path) for guidance."
- "See our [documentation](/path) for details."

### For Accessibility

- "Ensure you set an `aria-label` attribute to provide context."
- "For screen reader support, [action]."
- "To maintain accessibility, [action]."
- "This ensures the component is accessible to all users."

## What to Avoid

### Overly Technical Language

❌ "The component leverages React's compositional model to provide..."
✅ "The component uses React composition to..."

### Vague Statements

❌ "This might be useful in some cases."
✅ "Use this when you need to show loading states."

### Unnecessary Words

❌ "In order to create a button, you need to..."
✅ "To create a button, use..."

❌ "It is important to note that..."
✅ "Note that..." or just state the fact

### Conversational Filler

❌ "So, basically, what this does is..."
✅ "This component..."

❌ "You'll want to make sure you..."
✅ "Ensure you..."

### Marketing Language

❌ "Our amazing Button component offers incredible flexibility..."
✅ "The Button component supports multiple variants..."

### Apologetic Language

❌ "Unfortunately, this isn't supported..."
✅ "This feature is not currently supported."

❌ "You might want to consider..."
✅ "Use..." or "Consider..."

## Consistency Patterns

### Component Features

When documenting standard features across components:

**Loading state:**
```mdx
The `<Component>` includes a `loading` property that visually indicates the progress of system operations. While in the loading state, the component becomes disabled, preventing further interaction until the operation completes.
```

**Disabled state:**
```mdx
Keep [components] active and use validation and error messages to guide users on what needs to be done to proceed. Disabled [components] are problematic as they offer no feedback on why an action is unavailable.
```

**Variants:**
```mdx
Different [variants], such as [variant1] and [variant2], help guide users by [benefit]. [Variant1] are typically used for [use case], while [variant2] provide [alternative use case].
```

### Cross-References

**To alternative components:**
```mdx
## Alternative components

- [Component](/path): Brief description of when to use instead
```

**Inline references:**
```mdx
For [use case], use the [`<Alternative>`](/path) component instead.
```

**To patterns:**
```mdx
For larger sets of options, refer to the [Pattern Name](/patterns/pattern-name) for guidance.
```
