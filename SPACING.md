# Spacing Guidelines

Based on Practical UI by Adham Dannaway.

## Predefined Spacing Scale

Use a limited set of t-shirt-sized spacing options based on **8pt increments**. The scale grows faster at larger sizes to keep spacing proportional.

| Size | Value |
| ---- | ----- |
| XS   | 8pt   |
| S    | 16pt  |
| M    | 24pt  |
| L    | 32pt  |
| XL   | 48pt  |
| XXL  | 80pt  |

Why 8? Many popular screen sizes are divisible by 8 and it provides more flexibility than 10pt. For more detailed interfaces, 4pt increments can be used for additional control.

## Core Principles

### Space based on relatedness

The amount of spacing between elements should depend on how closely related they are. More closely related elements should be closer together. Unrelated elements get more space between them.

Think of interfaces as "rectangles within rectangles": start with the smallest spacing for innermost groups and gradually increase as you move outward.

### Be generous with white space

More white space is generally better than less. Tight spacing makes it harder for people to see groupings and visual hierarchy. More white space also makes designs look simpler, cleaner, and more sophisticated.

When in doubt, use the next spacing option up. Use the "Squint Test": blur the interface and if you can't easily distinguish between elements, increase spacing.

### Use spacing to group

According to the principle of proximity, elements near each other are perceived as a group and assumed to be related. Spacing inside a group should be less than spacing between groups.

Spacing can often replace containers (borders/backgrounds), resulting in a simpler, decluttered interface.

### Create spacing rules

Use spacing options consistently throughout an interface. Define rules to improve consistency and speed up decisions, e.g.:

- Medium (24pt) internal padding for components like cards
- Large (32pt) gaps between columns
- XXL (80pt) vertical padding for page sections

## Box Model

Every element has margin (space to neighbors), border, and padding (space to content). Spacing between innermost rectangles starts small and gradually increases as you move outward.

## Alignment and Layout

### 12-column grid

Use a 12-column grid with flexible-width columns, fixed gutters, and outer margins. Decrease columns for smaller screens (e.g. 4 columns on mobile).

| Property | Desktop | Mobile |
| -------- | ------- | ------ |
| Columns  | 12      | 4      |
| Gutters  | 32pt    | 16pt   |
| Margins  | 80pt    | 16pt   |

Gutters should remain empty and be narrower than columns. Smaller elements inside main layout containers don't need to align to the 12 columns — use predefined spacing options for those.

### Text alignment

- Left-align text for readability (consistent left edge as anchor)
- Avoid mixing multiple alignments — stick to one or as few as possible
- Centre alignment can work for short blocks of text
- Align different-sized horizontal text to the **baseline**, not vertical center

## Fitts's Law

The closer and larger a target, the faster it is for someone to select it. Keep related actions close to the element they relate to. Ensure a sufficient target area of at least **48pt x 48pt**.
