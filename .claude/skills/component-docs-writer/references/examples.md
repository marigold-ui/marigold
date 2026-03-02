# Exemplary Documentation Examples

Real examples from the Marigold documentation showing best practices.

## Use-Case Driven vs API-Driven

### ❌ API-Driven Approach (Avoid)

Walking through props without context:

```mdx
### Multiple prop

The `multiple` prop allows selecting multiple files. Set it to `true` to enable.

<ComponentDemo file="./filefield-multiple.demo.tsx" />

### Accept prop

The `accept` prop restricts file types. Pass an array of MIME types.

<ComponentDemo file="./filefield-accept.demo.tsx" />
```

**Problems:**
- Focused on technical details, not user needs
- No explanation of WHEN or WHY
- Poor ordering (alphabetical by prop name)
- Heading names are prop names, not scenarios

### ✅ Use-Case Driven Approach (Correct)

Focusing on user scenarios and needs:

```mdx
### Uploading multiple files

When users need to attach multiple documents at once—such as supporting materials for an application or multiple photos for a gallery—set the `multiple` prop to `true`.

<ComponentDemo file="./filefield-multiple.demo.tsx" />

### Restricting file types

For specific use cases like document submission or image galleries, restrict which file types users can upload using the `accept` prop. This helps ensure users upload the correct format for your application's needs.

<ComponentDemo file="./filefield-accept.demo.tsx" />
```

**Why this works:**
- Explains the scenario and user need first
- Mentions the technical solution (prop) naturally in context
- Headings describe what the user is trying to accomplish
- Ordered by frequency (multiple uploads more common than type restrictions)

## Simple Component: Button (Excerpt)

### Introduction
```mdx
The `<Button>` component is a crucial component of any user interface, allowing users to initiate actions such as submitting forms, adding items to a cart, or opening dialogs. The label on a button indicates the action that will be taken when the user presses it.

Different types of buttons, such as primary and secondary, help guide users by visually prioritizing actions. Primary buttons are typically used for the most important actions, while secondary buttons provide less critical options.
```

**Why this works:**
- First paragraph defines what it is and main use cases
- Second paragraph explains variants and their purposes
- Clear, direct language
- Focuses on user perspective

### Usage Subsection with Guidelines
```mdx
### Visual hierarchy

This primary button should represent the most crucial action within that section. Having multiple primary buttons in one section can create confusion and visual clutter, as they compete for the user's attention and detract from the clarity of the intended action.

<GuidelineTiles>
  <Do>
    <Do.Figure>
      <Image
        width={700}
        height={700}
        unoptimized
        src="/button/button-hierachy-do.jpg"
        alt="Use one primary button per page or section to highlight the most important action"
      />
    </Do.Figure>
    <Do.Description>
      Use one primary button per page or section to highlight the most important
      action
    </Do.Description>
  </Do>
  <Dont>
    <Dont.Figure>
      <Image
        width={700}
        height={700}
        unoptimized
        src="/button/button-hierachy-dont.jpg"
        alt="Don't include multiple primary buttons in the same section to prevent confusion and visual clutter."
      />
    </Dont.Figure>
    <Dont.Description>
      Don't include multiple primary buttons in the same section to prevent
      confusion and visual clutter.
    </Dont.Description>
  </Dont>
</GuidelineTiles>
```

**Why this works:**
- Clear topic explanation before guidelines
- Visual Do/Dont comparison
- Descriptive alt text for images
- Actionable guidance in descriptions

### Accessibility Note
```mdx
<SectionMessage variant="info">
  <SectionMessage.Title>Keep it accessible</SectionMessage.Title>
  <SectionMessage.Content>
    For icon-only buttons, ensure you set an `aria-label` or `aria-labelledby`
    attribute to provide context and maintain accessibility.
  </SectionMessage.Content>
</SectionMessage>
```

**Why this works:**
- Positioned right after icon button demo
- Clear, specific guidance
- Explains "what" and "why"
- Uses info variant for helpful tip

## Complex Component: Checkbox (Excerpt)

### Number of Options Guideline
```mdx
### Number of options

Use checkboxes when there are no more than 10 to 15 options, as too many of them can overwhelm users and clutter the interface. For larger sets of options, refer to the [Multiple Selection Pattern](/patterns/multiple-selection) for a better user experience.

If a user can select only one option from a list, [radio buttons](/components/form/radio) should be used instead, as checkboxes suggest that multiple options can be chosen.

<GuidelineTiles>
  <Do>
    <Do.Figure>
      <Image
        width={700}
        height={700}
        unoptimized
        src="/checkbox/checkbox-number-of-options.jpg"
        alt="Use checkboxes when you have up to 15 options, and multiple options can be chosen."
      />
    </Do.Figure>
    <Do.Description>
      Use checkboxes when you have up to 15 options, and multiple options can be
      chosen.
    </Do.Description>
  </Do>
  <Dont>
    <Dont.Figure>
      <Image
        width={700}
        height={700}
        unoptimized
        src="/checkbox/checkbox-radio-button.jpg"
        alt="Don't use checkboxes when only one option can be selected; use radio buttons instead."
      />
    </Dont.Figure>
    <Dont.Description>
      Don't use checkboxes when only one option can be selected; use radio buttons
      instead.
    </Dont.Description>
  </Dont>
</GuidelineTiles>
```

**Why this works:**
- Provides specific guidance (10-15 options)
- Links to alternative pattern for edge cases
- Explains when to use different component (radio)
- Visual examples reinforce the guidance

## Pattern Documentation: Async Data Loading (Excerpt)

### Introduction
```mdx
Async data loading patterns provide clear guidelines for implementing components that fetch data from remote sources. These patterns ensure consistent user experience across `<ComboBox>`, `<Autocomplete>`, and other interactive components that work with dynamic data.
```

**Why this works:**
- Defines what the pattern provides
- Lists applicable components
- Focuses on the benefit (consistent UX)

### Approach Section
```mdx
## Usage

There are two main approaches for async data loading:

**useAsyncList**: Built-in filtering and loading states, perfect for search-as-you-type functionality.

**React Query**: Advanced caching with automatic request deduplication, ideal for complex data needs.

### useAsyncList (Recommended)

For most async data loading scenarios, we recommend using `useAsyncList` from `@react-stately/data`.

This hook is specifically designed for handling async data in lists and provides built-in loading states, error handling, and filtering capabilities.

You can also prefetch initial options on component mount to ensure data is immediately available when users interact with the component.

Handle empty states when no data is available or search returns no results.

<ComponentDemo file="./use-async-list.demo.tsx" />

`useAsyncList` handles the complexity of async data management automatically and integrates seamlessly with Marigold components. For more detailed examples and advanced usage, see our [useAsyncList documentation](/components/hooks-and-utils/useAsyncListData).
```

**Why this works:**
- Lists approaches upfront
- Marks recommended approach clearly
- Explains when to use each
- Provides demo and links to detailed docs

## Foundation Documentation: Style Props (Excerpt)

```mdx
---
title: Style Props
caption: Style props are a set of properties that can be used to apply custom styling to a component.
---

Style props are a concept used in component to enable easy and consistent styling of components in React applications. They provide a convenient way to apply CSS styling directly to components using JSX syntax. Instead of writing traditional CSS classes or inline styles, you can use these "style props" to define the appearance and layout of your components.

This approach simplifies the styling process, promotes consistency, and makes it easier to manage the appearance of your components, especially when working with design systems or complex UIs.

For example `space` style prop which is used for `gap`. `space='4'` is equivalent to `gap: 16px`, [you can check the values for `space` property](/foundations/design-tokens#spacing).

Here's an example using style props for `Stack` component:

```tsx
const Demo = () => (
  <Stack space={4} stretch alignY="bottom">
    <Text>Lirum</Text>
    <Text>Larum</Text>
    <Text>Löffelstiel!</Text>
  </Stack>
);
```
```

**Why this works:**
- Defines the concept clearly
- Explains benefits
- Provides concrete example with values
- Shows code example
- Links to detailed reference

## Demo File Examples

### Appearance Demo
```tsx
import { Save } from 'lucide-react';
import type { ButtonProps } from '@marigold/components';
import { Button } from '@marigold/components';

export default (props: ButtonProps) => (
  <Button {...props}>{props.size === 'icon' ? <Save /> : 'Press me'}</Button>
);
```

**Why this works:**
- Accepts props for variant switching
- Handles icon size variant specially
- Minimal and focused
- Proper TypeScript typing

### Feature Demo
```tsx
import { Button, Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';

export default () => (
  <Inline space={5} alignY="center" alignX="center">
    <Button variant="primary">Edit</Button>
    <Button variant="primary">
      <Edit size={16} /> Edit
    </Button>
    <Button variant="icon" aria-label="Edit">
      <Edit />
    </Button>
  </Inline>
);
```

**Why this works:**
- Shows three related examples
- Uses layout component (Inline) for spacing
- Includes aria-label for icon-only button
- Self-contained, no props needed

### Interactive Demo
```tsx
import { useState } from 'react';
import { Button } from '@marigold/components';

export default () => {
  const [count, setCount] = useState(0);

  return (
    <Button onPress={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  );
};
```

**Why this works:**
- Uses hooks for state management
- Shows realistic interaction
- Simple and focused
- Self-contained

## Writing Tips from Examples

### Introductions
- Start with "The `<Component>` is..."
- Mention primary use cases in first paragraph
- Keep to 2-3 paragraphs maximum
- Focus on user perspective, not technical implementation

### Usage Sections
- One concept per subsection
- Brief explanation before demo
- Demo immediately after explanation
- Guidelines when showing right/wrong usage

### Accessibility
- Mention a11y considerations immediately after relevant feature
- Use SectionMessage for important notes
- Be specific about ARIA attributes or keyboard requirements
- Explain "why" not just "what"

### Guidelines
- Use Do/Dont for clear right/wrong examples
- Include visuals for complex concepts
- Text-only for simple rules
- Keep descriptions actionable

### Tone
- Active voice ("Use checkboxes when..." not "Checkboxes should be used when...")
- Direct and clear
- Instructional but not condescending
- Focus on helping users succeed
