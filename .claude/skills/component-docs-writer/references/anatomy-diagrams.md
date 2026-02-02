# Creating Anatomy Diagrams

Anatomy diagrams are SVG illustrations that visually break down a component's structure, labeling each part with clear annotations. They help users quickly understand what makes up a component.

## When to Create Anatomy Diagrams

Create an anatomy diagram for:
- New component documentation
- Components with multiple visual parts (labels, inputs, containers, etc.)
- Components with nested or composite structure
- When updating anatomy sections that are missing diagrams

## SVG Anatomy Diagram Pattern

See reference examples:
- [fileupload-anatomy.svg](fileupload-anatomy.svg) - Multi-part file upload component
- [textfield-anatomy.svg](textfield-anatomy.svg) - Simple text input field

### Structure

Anatomy SVGs follow this consistent pattern:

1. **Viewbox**: 600×300 to 600×400 (adjust based on component complexity)
2. **Main Group**: Contains the component rendering and annotations
3. **Component UI**: Recreate the component's visual appearance
4. **Connector Lines**: Dashed lines from parts to labels
5. **Labels**: Uppercase text in monospace font
6. **Dots**: Small circles at connection points

### Visual Style

**Colors:**
- Text: `#374151` (dark gray)
- Secondary text: `#6b7280` (medium gray)
- Borders/strokes: `#d1d5db` (light gray)
- Backgrounds: `#ffffff` (white), `#f9fafb` (light gray)
- Active elements: `#3b82f6` (blue)
- Annotations: `#9ca3af` (gray)

**Typography:**
- Component UI: `sans-serif`
- Anatomy labels: `monospace`, `11px`, uppercase, `letter-spacing: 0.05em`

**Connectors:**
- Stroke: `#9ca3af`
- Width: `1`
- Style: `stroke-dasharray="2, 2"` (dashed)
- Dots: Circle with `r="2.5"`, filled with `#9ca3af`

## Step-by-Step Process

### 1. Analyze the Component

Before creating the diagram:

1. **Examine the component code** to identify all visual parts
2. **Check Storybook stories** to see the component in action
3. **Review existing documentation** (if any) for part names
4. **List all parts** that should be labeled

Example for FileField:
- Label
- Drop zone
- Zone label
- Upload button
- File list
- File item

### 2. Plan the Layout

- Position the component centrally
- Plan label positions (above and below component)
- Ensure connectors don't overlap
- Leave space for all labels

### 3. Create the SVG

#### Basic Template

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="600"
   height="400"
   viewBox="0 0 600 400"
   fill="none"
   version="1.1"
   xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(150,100)">
    <!-- Component UI -->

    <!-- Connector lines -->
    <g stroke="#9ca3af" stroke-width="1" stroke-dasharray="2, 2">
      <path d="M x1,y1 V y2" />
      <!-- More paths... -->
    </g>

    <!-- Labels -->
    <g font-family="monospace" font-size="11px" fill="#6b7280" letter-spacing="0.05em">
      <text x="x" y="y" text-anchor="middle">LABEL NAME</text>
      <!-- More labels... -->
    </g>

    <!-- Dots -->
    <g fill="#9ca3af">
      <circle cx="x" cy="y" r="2.5" />
      <!-- More dots... -->
    </g>
  </g>
</svg>
```

#### Component UI Elements

Recreate the component's visual appearance using basic SVG shapes:

**Text labels:**
```xml
<text x="0" y="0" font-family="sans-serif" font-size="14px" font-weight="600" fill="#374151">
  Label text
</text>
```

**Input containers:**
```xml
<rect x="0" y="12" width="240" height="42" rx="6"
      fill="#ffffff" stroke="#d1d5db" stroke-width="1.5" />
```

**Dashed borders (drop zones):**
```xml
<rect x="0" y="15" width="300" height="120" rx="8"
      stroke-dasharray="6, 6" fill="#f9fafb" stroke="#d1d5db" stroke-width="1.5" />
```

**Buttons:**
```xml
<rect x="-40" y="13" width="80" height="24" rx="4"
      fill="#ffffff" stroke="#d1d5db" />
<text y="29" font-size="11px" font-weight="500" fill="#374151">
  Button text
</text>
```

#### Connector Lines and Labels

For each part to annotate:

1. **Draw connector line** from component part to label position
2. **Add dot** at the connection point on the component
3. **Add label** above or below the component

Example:
```xml
<!-- Connector line -->
<path d="M 25,-10 V -30" />

<!-- Label -->
<text x="25" y="-38" text-anchor="middle">LABEL</text>

<!-- Dot at connection point -->
<circle cx="25" cy="-5" r="2.5" />
```

**Vertical connector patterns:**
- From component to label above: `d="M x,y1 V y2"` where y2 < y1
- From component to label below: `d="M x,y1 V y2"` where y2 > y1

### 4. Save and Reference

1. **Save as SVG**: `{component}-anatomy.svg` in `docs/public/{component}/`
2. **Reference in MDX**: Use the `.svg` file directly in documentation

## Naming Conventions

**Part names should be:**
- Descriptive and specific
- Written in title case in the MDX description list
- Written in UPPERCASE in the SVG labels
- Consistent with react-aria terminology when applicable

**Examples:**
- MDX: "Label", "Input container", "Help text"
- SVG: "LABEL", "INPUT CONTAINER", "HELP TEXT"

## Common Component Parts

### Form Fields
- Label
- Input container / Input field
- Help text / Description
- Error message
- Required indicator

### File Upload
- Label
- Drop zone
- Zone label
- Upload button
- File list
- File item

### Buttons
- Button container
- Icon (if present)
- Label / Text
- Loading indicator (if present)

### Complex Components
- Container
- Header
- Content area
- Footer
- Actions

## Tips

1. **Keep it simple**: Only label the essential, user-visible parts
2. **Avoid clutter**: Don't annotate every pixel; focus on functional parts
3. **Use consistent spacing**: Align labels and maintain even spacing
4. **Test visibility**: Ensure all text is readable and connectors are clear
5. **Match the design**: Use the actual component's styling (colors, borders, fonts)
6. **Group related elements**: Use `<g>` tags to group related parts

## Workflow Integration

When creating component documentation:

1. **After understanding the component**, identify all parts that should be labeled
2. **Create the anatomy SVG** following the patterns above
3. **Add to documentation** in the Anatomy section:
   ```mdx
   <Image
     src="/{component}/{component}-anatomy.svg"
     alt="Anatomy of {Component} component"
     width={800}
     height={550}
     className="mx-auto block"
   />
   ```
4. **Write the anatomy description** listing all parts with their functions

## Troubleshooting

**Problem**: Labels overlap
- **Solution**: Adjust label positions or use staggered vertical positions

**Problem**: Connectors cross each other
- **Solution**: Route connectors around obstacles or adjust component layout

**Problem**: SVG looks different in different viewers
- **Solution**: Use standard SVG features; avoid editor-specific attributes (remove Inkscape/Sodipodi namespaces for production)

## Quality Checklist

Before finalizing an anatomy diagram:

- [ ] All visible component parts are labeled
- [ ] Labels use consistent naming (uppercase in SVG)
- [ ] Connectors are clearly visible and don't overlap
- [ ] Dots are positioned at the correct connection points
- [ ] Colors match the Marigold style guide
- [ ] Typography uses correct fonts (sans-serif for UI, monospace for labels)
- [ ] SVG is clean (no unnecessary editor metadata)
- [ ] SVG is referenced correctly in MDX
- [ ] Anatomy description matches the diagram
