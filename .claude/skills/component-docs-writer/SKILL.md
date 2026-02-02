---
name: component-docs-writer
description: Write component documentation for the Marigold Design System in MDX format with interactive demo files and anatomy diagrams. Use when the user asks to: (1) Document a new component, (2) Write or update component docs, (3) Create demo files, (4) Create anatomy diagrams, (5) Add usage examples or guidelines for components.
---

# Marigold Component Documentation Writer

Write comprehensive, accessible component documentation for the Marigold Design System following established patterns and conventions.

## Overview

Marigold documentation consists of:
- **MDX files** - Main documentation content with frontmatter and structured sections
- **Demo files** - TypeScript/React examples (`.demo.tsx` files)
- **Anatomy diagrams** - SVG illustrations showing component structure with labeled parts
- **Images** - Do/Dont visuals and screenshots

## Quick Start

### Component Documentation

1. Create directory: `docs/content/components/{category}/{component}/`
2. Create main MDX file: `{component}.mdx`
3. Create demo files: `{component}-{feature}.demo.tsx`
4. Follow structure: Frontmatter → Anatomy → Appearance → Usage → Props → Related

### Pattern Documentation

1. Create directory: `docs/content/patterns/{pattern-name}/`
2. Create main MDX file: `{pattern-name}.mdx`
3. Follow structure: Problem → Solutions → Usage → Related

### Foundation Documentation

1. Create file: `docs/content/foundations/{topic}.mdx`
2. Follow structure: Concept → Examples → Reference

## MDX File Structure

### Frontmatter (Required)

```yaml
---
title: Component Name
caption: Brief description of what the component does.
badge: updated  # optional: "new", "updated", etc.
---
```

### Standard Sections for Components

**CRITICAL**: The Anatomy section MUST always be the first section after the Introduction.

```markdown
## Introduction (2-3 paragraphs)
Explain what the component is, its purpose, and common use cases.

## Anatomy
**REQUIRED**: Create an SVG anatomy diagram for every component.

<Image
  src="/component/component-anatomy.svg"
  alt="Anatomy of Component component"
  width={800}
  height={550}
  className="mx-auto block"
/>

<ul>
  <li><b>Part name:</b> Description of part function.</li>
  <li><b>Another part:</b> Description of part function.</li>
</ul>

## Appearance
<AppearanceDemo component={title} />
<AppearanceTable component={title} />

## Usage

Start with 1-2 paragraphs describing general use cases and possibilities.

### Feature Name
<ComponentDemo file="./component-feature.demo.tsx" />

### Guidelines
<GuidelineTiles>
  <Do>
    <Do.Description>Clear guidance on correct usage.</Do.Description>
  </Do>
  <Dont>
    <Dont.Description>Clear guidance on what to avoid.</Dont.Description>
  </Dont>
</GuidelineTiles>

## Props
<StorybookHintMessage component={title} />
<PropsTable component={title} />

## Alternative components
- [RelatedComponent](/path): Description
```

## Core Writing Principles

**Use-case driven, not API-driven**: Focus on HOW and WHEN to use components, not just walking through the API.

**Lead with the problem, not the prop**: Always start usage subsections by describing the problem or user need, THEN show how the component solves it.

**Order by frequency**: Start with most common use cases, progress to less common ones.

**Show, don't just tell**: Every usage subsection should include a demo.

**Informed by UX best practices**: Consult [references/ux-principles.md](references/ux-principles.md) for component guidance and accessibility patterns.

**Never use dashes in prose**: Do not use em dashes (—) or en dashes (–) in documentation. Use commas, periods, or rephrase sentences instead.

Examples:
- ❌ Bad: "When users need to upload files—such as documents or images—use FileField"
- ✅ Good: "When users need to upload files such as documents or images, use FileField"
- ❌ Bad: "The component provides two methods—drag and drop or browse"
- ✅ Good: "The component provides two methods: drag and drop or browse"

See [references/writing-guidelines.md](references/writing-guidelines.md) for complete style guide.

## Usage Section Guidelines

**CRITICAL: Only create usage sections that solve real user problems**

Usage sections must ALWAYS follow this pattern:
1. Start with a user problem or scenario
2. Show how the component solves it
3. Include a demo

If a section doesn't describe a problem that the component solves, DO NOT create it.

### Never Create Sections For These Topics

**FORBIDDEN usage section topics** (these belong in the Props table only):
- ❌ `width` or "Width customization" or "Adjusting width"
- ❌ `disabled` or "Disabled state" or "Disabling the component"
- ❌ `required` or "Required fields" or "Making it required"
- ❌ `error` or "Error state" or "Showing errors"
- ❌ `description` or "Help text" or "Adding descriptions"
- ❌ `placeholder` or "Placeholder text"
- ❌ `size` or "Sizing" (unless sizes have specific UX implications beyond visual size)
- ❌ `variant` or "Variants" (unless variants represent different use cases, not just styling)
- ❌ Any other common form field property shared across all similar components

**These are documented in the Props table. Only create a usage section if you have specific UX guidance beyond "set the prop to X".**

### When to Create a Usage Section

Create a usage section ONLY when:
- ✅ It describes a specific user problem or scenario
- ✅ It explains WHEN and WHY to use this feature (not just HOW)
- ✅ It provides UX guidance beyond the prop documentation
- ✅ It includes Do/Dont guidelines or accessibility considerations
- ✅ It demonstrates a meaningful use case

**Valid usage section examples:**
- "Uploading multiple files" (describes when users need to upload several files at once)
- "Restricting file types" (explains why and when to limit accepted formats)
- "Labeling" (provides UX guidance on writing effective labels)
- "Accessibility" (explains a11y considerations)

**Invalid usage section examples:**
- ❌ "Width customization" (just explains how to set a common prop)
- ❌ "Disabled state" (common prop with no specific UX guidance)
- ❌ "Required fields" (common prop documented in Props table)

### Usage Section Structure (MANDATORY)

Each usage subsection MUST follow this structure:
1. **Describe the problem/scenario** from user's perspective (1-2 sentences, NO dashes)
2. **Show the solution** with a demo
3. **Explain how it works** (mention relevant props)
4. **Provide guidance** (optional Do/Dont when needed)

Examples:
- ❌ Bad: "Set the `multiple` prop to allow selecting several files..."
- ✅ Good: "When users need to upload several files at once, such as photos for a gallery, enable multiple file selection. Set the `multiple` prop..."
- ❌ Bad: "You can customize the width of the field using the `width` prop..."
- ✅ Good: DO NOT CREATE THIS SECTION (width is a common prop)

See [references/content-patterns.md](references/content-patterns.md) for detailed section templates.

## Demo Files

**Naming**: `{component}-{feature}.demo.tsx`

**Patterns**: See [references/demo-patterns.md](references/demo-patterns.md) for:
- Basic demo pattern
- Appearance demo pattern
- Feature demo pattern
- Complex examples

**Guidelines**:
- Keep demos minimal and focused
- Show one concept per demo
- Use real-world examples

## Anatomy Diagrams

**REQUIRED for all component documentation**. See [references/anatomy-diagrams.md](references/anatomy-diagrams.md) for:
- How to create SVG diagrams
- Styling and labeling guidelines
- Example diagrams to reference

**Quick reference**:
1. Create SVG: `docs/public/{component}/{component}-anatomy.svg`
2. Reference in MDX using the `.svg` file directly
3. Reference examples: [fileupload-anatomy.svg](references/fileupload-anatomy.svg), [textfield-anatomy.svg](references/textfield-anatomy.svg)

## UX Knowledge Base

Consult [references/ux-principles.md](references/ux-principles.md) for:
- Component selection guidance (buttons vs links, checkboxes vs radio, etc.)
- Form design best practices
- Accessibility patterns
- Common UX anti-patterns
- Mobile and responsive considerations

Use this knowledge to:
- Write informed usage guidance explaining WHEN and WHY
- Create relevant Do/Dont examples
- Include accessibility considerations
- Identify common mistakes to warn against

## Special MDX Components

See [references/mdx-components.md](references/mdx-components.md) for complete reference.

Most commonly used:
- `<ComponentDemo file="./demo.tsx" />` - Embed interactive demo
- `<AppearanceDemo component={title} />` - Auto-render all variants
- `<AppearanceTable component={title} />` - Variant descriptions table
- `<GuidelineTiles>` with `<Do>` and `<Dont>` - Usage guidelines
- `<SectionMessage variant="info|warning|error">` - Callout boxes
- `<PropsTable component={title} />` - Auto-generated props table

## Workflow

1. **Understand the component**
   - Read component implementation in `packages/components/src/{Component}/`
   - Check Storybook stories: `packages/components/src/{Component}/{Component}.stories.tsx`
   - Stories reveal use cases, edge cases, and important features to document
   - Analyze component parts for anatomy diagram labels

2. **Plan sections**
   - Decide which usage sections are needed
   - Consult [references/ux-principles.md](references/ux-principles.md) for component type
   - Identify common use cases, best practices, anti-patterns
   - Plan Do/Dont guidelines based on UX knowledge

3. **Create anatomy diagram** (REQUIRED)
   - **Never skip this step** - mandatory for all component documentation
   - Follow [references/anatomy-diagrams.md](references/anatomy-diagrams.md)
   - Save as `docs/public/{component}/{component}-anatomy.svg`
   - Reference the SVG directly in the documentation (no conversion needed)

4. **Create demo files**
   - Write demos to understand component usage
   - Often based on Storybook story examples
   - Follow [references/demo-patterns.md](references/demo-patterns.md)

5. **Write MDX**
   - Use demos, story insights, anatomy diagram, and UX principles
   - Follow [references/content-patterns.md](references/content-patterns.md) templates
   - Reference [references/examples.md](references/examples.md) for inspiration

6. **Add guidelines**
   - Include Do/Dont examples based on UX best practices
   - Warn against common mistakes

7. **Review accessibility**
   - Ensure a11y considerations are covered
   - Reference [references/ux-principles.md](references/ux-principles.md)

8. **Cross-reference**
   - Link to related components and patterns

## Validation

Run validation script before completing:

```bash
python scripts/validate_docs.py docs/content/components/{category}/{component}/
```

The script checks for:
- Required frontmatter fields
- Anatomy section presence and ordering
- Demo file naming conventions
- Cross-reference validity
- Image file existence

Manual checklist for items not covered by script:
- [ ] Introduction explains what, why, and when (2-3 paragraphs)
- [ ] Usage section starts with 1-2 paragraphs of context
- [ ] Demos are minimal and focused
- [ ] Accessibility considerations mentioned
- [ ] UX best practices applied

## Resources

### Reference Guides (Load as Needed)

- [references/anatomy-diagrams.md](references/anatomy-diagrams.md) - Anatomy diagram creation guide
- [references/ux-principles.md](references/ux-principles.md) - UX knowledge for components
- [references/writing-guidelines.md](references/writing-guidelines.md) - Style and conventions
- [references/mdx-components.md](references/mdx-components.md) - Special components reference
- [references/content-patterns.md](references/content-patterns.md) - Section templates
- [references/demo-patterns.md](references/demo-patterns.md) - Demo file patterns
- [references/examples.md](references/examples.md) - Exemplary excerpts

### Example Anatomy Diagrams

- [references/fileupload-anatomy.svg](references/fileupload-anatomy.svg) - Multi-part component
- [references/textfield-anatomy.svg](references/textfield-anatomy.svg) - Simple input field

### Scripts

- `scripts/create_doc_structure.py` - Scaffold new component docs
- `scripts/validate_docs.py` - Validate documentation completeness
- `scripts/validate_demo.py` - Check demo file conventions

### Templates

Use templates in `assets/templates/` as starting points:
- `component-doc.mdx` - Full component documentation template
- `pattern-doc.mdx` - Pattern documentation template
- `demo-basic.tsx` - Basic demo template
- `demo-appearance.tsx` - Appearance demo template
