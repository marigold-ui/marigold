# Token Naming Conventions

## The CTI Pattern (Category-Type-Item)

The most widely adopted naming convention, popularized by **Style Dictionary**.

```
{category}.{type}.{item}.{sub-item}.{state}
```

Examples:

```
color.text.primary
color.bg.surface
color.border.error
spacing.inline.md
font.size.lg
shadow.elevation.md
```

## Common Naming Structures Across Systems

### Structure A: Property-first (most common)

```
color.text.primary
color.bg.surface
color.border.default
font.size.sm
font.weight.bold
spacing.4
radius.md
shadow.sm
```

Used by: Primer, Polaris, Carbon, USWDS

### Structure B: Semantic-first

```
text.color.primary
surface.color.default
action.color.primary
heading.font.size
body.font.size
```

Used by: Some Material Design implementations

### Structure C: Flat with compound names

```
--color-text-primary
--color-bg-surface
--font-size-sm
--space-4
```

Used by: Open Props, Radix

## Case Conventions

| Convention          | Example              | Used By                                          |
| ------------------- | -------------------- | ------------------------------------------------ |
| **kebab-case**      | `color-text-primary` | CSS custom properties, Primer, Radix, Open Props |
| **dot.notation**    | `color.text.primary` | DTCG spec, Style Dictionary, Figma               |
| **camelCase**       | `colorTextPrimary`   | JS/TS objects, Chakra UI                         |
| **SCREAMING_SNAKE** | `COLOR_TEXT_PRIMARY` | Rarely (Android XML)                             |

**Industry preference**: **kebab-case** for CSS output, **dot.notation** for source/JSON. The DTCG spec uses dot notation in JSON, and tooling (Style Dictionary) converts to platform-appropriate casing.

## Naming Rules (Consensus)

### 1. Name by purpose, not value

```
// Good
color.text.primary
color.bg.danger
spacing.component.md

// Bad
color.gray-900        (what if the gray changes?)
color.red-500         (value-dependent name)
spacing.16px          (hardcoded value in name)
```

### 2. Be consistent with hierarchy depth

Pick a depth and stick with it. Don't mix:

```
// Inconsistent
color.primary              (2 levels)
color.text.primary.hover   (4 levels)
spacing.sm                 (2 levels)
font.heading.size.large    (4 levels)
```

Most systems use **2-3 levels** for semantic tokens.

### 3. Use a predictable scale

For ordered values, use a consistent scale system:

**Numeric scales** (t-shirt sizes mapped to numbers):

```
spacing.1, spacing.2, spacing.3, ... spacing.16
font.size.1, font.size.2, ... font.size.9
```

**T-shirt sizes**:

```
spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl
```

**Semantic size names**:

```
font.size.caption, font.size.body, font.size.heading
```

### 4. Prefix states and variants consistently

```
// States as suffixes
color.text.primary
color.text.primary-hover
color.text.primary-disabled

// Or as a nested level
color.text.primary.default
color.text.primary.hover
color.text.primary.disabled
```

### 5. Group by function, not by property

```
// Good: grouped by what it does
color.text.*       (all text colors)
color.bg.*         (all backgrounds)
color.border.*     (all borders)

// Less useful: grouped by raw property
color.blue.*       (where does blue go?)
color.gray.*       (which gray for what?)
```

## How Major Systems Name Their Tokens

### GitHub Primer

```css
--fgColor-default
--fgColor-muted
--fgColor-accent
--bgColor-default
--bgColor-muted
--borderColor-default
--borderColor-muted
```

Pattern: `--{property}{Category}-{variant}`

### Salesforce Lightning

```css
--slds-g-color-neutral-base-1
--slds-g-color-brand-base-1
--slds-g-spacing-1
--slds-g-font-size-1
```

Pattern: `--slds-g-{category}-{type}-{scale}`

### Adobe Spectrum

```css
--spectrum-global-color-gray-100
--spectrum-alias-text-color
--spectrum-button-primary-background-color
```

Pattern: `--spectrum-{tier}-{category}-{detail}`
(3-tier naming: global, alias, component)

### Material Design 3

```
md.sys.color.primary
md.sys.color.on-primary
md.sys.color.surface
md.sys.typescale.body-medium
```

Pattern: `md.{layer}.{category}.{role}`
(layers: ref, sys, comp)

### IBM Carbon

```css
--cds-text-primary
--cds-background
--cds-border-subtle
--cds-spacing-05
```

Pattern: `--cds-{semantic-name}` (flat, no deep nesting)

### Radix Themes

```css
--accent-1 through --accent-12
--gray-1 through --gray-12
--color-background
--color-surface
--space-1 through --space-9
--radius-1 through --radius-6
```

Pattern: 12-step numeric color scale + semantic aliases

## Recommendations for Naming

1. **Use kebab-case** for CSS custom properties
2. **Use dot notation** in source/JSON files
3. **Name semantically** at the consumer-facing layer
4. **Keep depth to 2-3 levels** for semantic tokens
5. **Prefix with system name** for distribution (`--mg-*` for Marigold)
6. **Use numeric scales** for ordered values (spacing, sizing)
7. **Use descriptive names** for qualitative values (colors, roles)
8. **Document the naming structure** explicitly so contributors can follow it

## Sources

- [Wicar Akhtar: Guide to Tokens and Naming Conventions](https://medium.com/@wicar/streamlining-your-design-system-a-guide-to-tokens-and-naming-conventions-3e4553aa8821)
- [Mozilla Protocol Design Tokens](https://protocol.mozilla.org/docs/fundamentals/design-tokens)
- [Design Good Practices: Design Tokens](https://goodpractices.design/articles/design-tokens)
- [Primer Design Tokens](https://primer.style)
- [Radix Themes Documentation](https://www.radix-ui.com/themes/docs/theme/overview)
