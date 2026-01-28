---
description: Create a new Marigold component with all required files (component, tests, stories, theme styles)
allowed-tools: Read, WebFetch, Task
---

# Create Marigold Component: $ARGUMENTS

Create a new component for the Marigold Design System with all required files.

## Arguments

Parse `$ARGUMENTS` as follows:
- **componentName**: First word (required) - PascalCase component name (e.g., `Chip`, `TagGroup`)
- **documentationLink**: Any URL following the component name (optional) - react-aria documentation link

Example usages:
- `/project:create-component Chip`
- `/project:create-component TagGroup https://react-spectrum.adobe.com/react-aria/TagGroup.html`

## Workflow

### Step 1: Parse Arguments

Extract the component name and optional documentation URL from: `$ARGUMENTS`

If no component name is provided, ask the user to provide one.

### Step 2: Fetch Documentation (if URL provided)

If a documentation URL was provided, use WebFetch to fetch it and understand:
- The react-aria component API
- Available props and their types
- Common usage patterns
- Accessibility considerations

Store any relevant API insights to pass to the scaffolding agent.

### Step 3: Spawn Component Scaffold Agent

Use the **Task tool** with `subagent_type="component-scaffold"` to create all component files.

Provide the agent with a prompt that includes:
- The component name (PascalCase)
- Any API insights gathered from documentation (props, patterns, accessibility notes)
- Instruction to create all required files following Marigold patterns

Example prompt for the Task tool:
```
Create a new {ComponentName} component for the Marigold Design System.

{If documentation was fetched, include:}
Based on the react-aria documentation, the component should support:
- [List relevant props]
- [List any special behaviors]
- [List accessibility considerations]

Create all required files:
1. Component file: packages/components/src/{ComponentName}/{ComponentName}.tsx
2. Test file: packages/components/src/{ComponentName}/{ComponentName}.test.tsx
3. Stories file: packages/components/src/{ComponentName}/{ComponentName}.stories.tsx
4. Theme styles: themes/theme-rui/src/components/{ComponentName}.styles.ts
```

## Notes

- Component names should be PascalCase (e.g., `Chip`, `TagGroup`, `DatePicker`)
- The component will use react-aria-components as the foundation
- All styling uses Tailwind CSS via the theming system
- The component-scaffold agent handles all file creation and pattern consistency