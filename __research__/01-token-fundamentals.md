# Design Token Fundamentals

## What Are Design Tokens?

Design tokens are the smallest, repeatable design decisions stored as platform-agnostic key-value pairs. They represent visual properties like colors, typography, spacing, and shadows. Rather than hardcoding values (e.g., `#0066cc`) into components, tokens provide a centralized, named abstraction.

The term was coined by Jina Anne. As she put it, design tokens are **a methodology** - limiting them to variables is "like saying responsive design is just media queries."

## The DTCG Specification (W3C Design Tokens Community Group)

In October 2025, the DTCG released the **first stable specification (2025.10)** - a vendor-neutral JSON format for sharing design decisions across tools and platforms.

### File Format

Design token files are JSON with `.tokens` or `.tokens.json` extension.

### Token Structure

```json
{
  "tokenName": {
    "$type": "color",
    "$value": "#000000",
    "$description": "Optional human-readable description"
  }
}
```

Key properties:

- `$value` (required) - the actual design decision value
- `$type` (required) - declares the kind of value
- `$description` (optional) - human-readable explanation
- `$extensions` (optional) - vendor/tool-specific metadata

### Alias References

Tokens can reference other tokens using `{dot.path}` notation:

```json
{
  "color": {
    "palette": {
      "black": { "$type": "color", "$value": "#000000" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "{color.palette.black}" }
    }
  }
}
```

Aliases may reference other aliases (resolved recursively). Circular references are not allowed.

### Supported Token Types (13 total)

| Type          | Example                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| `color`       | `#ff0000`, `oklch(...)`                                                    |
| `dimension`   | `16px`, `1rem`                                                             |
| `fontFamily`  | `["Inter", "sans-serif"]`                                                  |
| `fontWeight`  | `400`, `"bold"`                                                            |
| `duration`    | `200ms`                                                                    |
| `cubicBezier` | `[0.4, 0, 0.2, 1]`                                                         |
| `number`      | `1.5`                                                                      |
| `strokeStyle` | `"solid"`, `"dashed"`                                                      |
| `border`      | composite: width + style + color                                           |
| `transition`  | composite: duration + delay + easing                                       |
| `shadow`      | composite: color + offsetX + offsetY + blur + spread                       |
| `gradient`    | array of color stops                                                       |
| `typography`  | composite: fontFamily + fontSize + fontWeight + lineHeight + letterSpacing |

### Composite Tokens

Composite tokens group related values that are always applied together:

```json
{
  "heading-1": {
    "$type": "typography",
    "$value": {
      "fontFamily": "{font.family.heading}",
      "fontSize": "2rem",
      "fontWeight": 700,
      "lineHeight": 1.2,
      "letterSpacing": "-0.02em"
    }
  }
}
```

## The 3-Tier Token Architecture

The industry has converged on a **3-tier model**:

### Tier 1: Primitive / Global / Reference Tokens

Raw values with descriptive names. These are the "palette" of your design system.

```
color.blue.500 = #0066cc
spacing.4 = 16px
font.size.lg = 1.125rem
```

- Named objectively (describe the value, not the usage)
- Rarely used directly by consumers
- Form the complete set of available values

### Tier 2: Semantic / Alias / Decision Tokens

Purpose-driven tokens that reference primitives. These encode **intent**.

```
color.text.primary = {color.neutral.900}
color.bg.surface = {color.white}
color.border.error = {color.red.500}
spacing.inline.md = {spacing.4}
```

- Named by **purpose/role**, not appearance
- This is the layer that enables theming (dark mode swaps happen here)
- The primary API for consumers

### Tier 3: Component-Specific Tokens (controversial)

Tokens scoped to specific components.

```
button.background.primary = {color.bg.action}
button.padding.horizontal = {spacing.inline.md}
card.border.radius = {radius.md}
```

- Enables granular component customization
- **High risk of token bloat** - use sparingly
- Many experts caution against overuse (Jacob Miller, Supernova 2024 webinar)
- Best reserved for truly unique component needs

### How the tiers connect

```
Primitive           Semantic              Component (optional)
-----------         ------------------    --------------------
blue.500 = #0066cc  color.action = blue.500  button.bg = color.action
```

Changing `blue.500` updates everything. Changing `color.action` to reference `green.600` re-themes without touching components. Component tokens add a third indirection level.

## CSS Custom Properties vs Build-Time Tokens

| Aspect              | CSS Custom Properties     | Build-Time (Sass/Style Dictionary) |
| ------------------- | ------------------------- | ---------------------------------- |
| Resolved at         | Runtime (browser)         | Compile time                       |
| Dynamic theming     | Yes                       | No                                 |
| Performance         | Browser overhead at scale | Offloaded to build                 |
| Multi-platform      | Web only                  | iOS, Android, Web                  |
| Dark mode (runtime) | Ideal                     | Requires rebuild                   |
| Brand control       | Risky if exposed          | Enforced at build                  |

**Industry consensus**: use a **hybrid approach**. Primitive tokens can be build-time constants. Semantic tokens that need to change (dark mode, theming) should be CSS custom properties.

## Tooling Landscape

- **Style Dictionary** - the de facto standard for transforming tokens to platform outputs
- **Tokens Studio** (Figma plugin) - bridge between Figma and code
- **Cobalt UI** - newer alternative to Style Dictionary, DTCG-native
- **Panda CSS** - CSS-in-JS engine with built-in token support (powers Chakra v3)

Key friction points in 2025:

- Bi-directional sync (Figma <-> code) still doesn't exist
- Token type discrepancies between Tokens Studio and DTCG spec
- End-to-end automation pipelines remain fragile

## Sources

- [DTCG Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/drafts/format/)
- [W3C DTCG Stable Version Announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [Style Dictionary Documentation](https://styledictionary.com/info/tokens/)
- [Penpot: The Developer's Guide to Design Tokens](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/)
- [Cristiano Rastelli: Design Tokens Beyond Colors, Typography, and Spacing](https://medium.com/bumble-tech/design-tokens-beyond-colors-typography-and-spacing-ad7c98f4f228)
