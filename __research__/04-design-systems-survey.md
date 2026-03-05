# Design Systems Survey: How Major Systems Handle Tokens

## GitHub Primer

**Architecture**: 3-tier system (base, functional, component)

**Token categories**: Color, typography, spacing, shadows, border, breakpoints

**Naming**: `--fgColor-default`, `--bgColor-muted`, `--borderColor-accent`

- Uses compound property+category naming
- Functional tokens (semantic layer) are the primary API
- Base tokens are raw palette values

**Theming/Dark mode**: Functional tokens remap to different base tokens per theme. Supports light, dark, dark dimmed, and high contrast themes.

**Unique approach**: Strongly discourages direct use of base/primitive tokens. All consumption goes through the functional layer.

**Source**: [Primer Design](https://primer.style)

---

## Adobe Spectrum

**Architecture**: 3-tier (global, alias, component)

**Token categories**: Color, typography, spacing, corner radius, border, shadow, animation, layout

**Naming**: `--spectrum-global-color-gray-100`, `--spectrum-alias-text-color`, `--spectrum-button-primary-background-color`

- System prefix (`spectrum`) + tier prefix + category + detail

**Theming/Dark mode**: Global tokens define raw palette. Alias tokens remap per theme (lightest, light, dark, darkest).

**Unique approach**: Explicit 3 tiers in the naming convention itself. Heavy investment in multi-platform token distribution (web, iOS, Android).

**Source**: [Spectrum Design Tokens](https://spectrum.adobe.com/page/design-tokens/)

---

## Material Design 3 (Google)

**Architecture**: 3-tier (reference, system, component)

**Token categories**: Color, typography, shape (radius), elevation, motion, state (opacity layers)

**Naming**: `md.ref.palette.primary40`, `md.sys.color.primary`, `md.comp.button.filled.container.color`

**Theming/Dark mode**: Uses a "color roles" system. `md.sys.color.primary` maps to `md.ref.palette.primary40` in light and `md.ref.palette.primary80` in dark. Dynamic Color generates palettes from user wallpaper.

**Unique approach**:

- **State layers**: Uses opacity overlays for hover/pressed/focus instead of separate colors. This dramatically reduces the number of color tokens needed.
- **Dynamic Color**: Generates an entire theme from a single source color.
- **Shape tokens**: Radius values organized by component role (not just size).

**Source**: [Material Design 3 Tokens](https://m3.material.io/foundations/design-tokens)

---

## Salesforce Lightning (SLDS)

**Architecture**: 2-tier (global, component aliases)

**Token categories**: Color, font, spacing, radius, shadow, sizing, line-height, border, media queries, z-index, time (animation)

**Naming**: `--slds-g-color-neutral-base-1`, `--slds-g-spacing-1`

- Prefix: `slds-g` (global)
- Numeric scales for ordered values

**Theming/Dark mode**: Global tokens redefined per theme.

**Unique approach**: One of the oldest and most mature token systems. Heavy enterprise focus with strict governance. Includes time (animation duration) tokens.

**Source**: [Lightning Design System](https://www.lightningdesignsystem.com/design-tokens/)

---

## Shopify Polaris

**Architecture**: 2-tier (primitive + semantic)

**Token categories**: Color, typography, spacing, shape (radius), shadow, z-index, motion, breakpoints

**Naming**: `--p-color-text`, `--p-color-bg-surface`, `--p-space-400`, `--p-border-radius-200`

- Prefix: `p` (Polaris)
- Numeric scale for spacing/sizing (100, 200, 300...)

**Theming/Dark mode**: Semantic tokens switch values between light/dark.

**Unique approach**: Uses a 100-based numeric scale (like font-weight convention). Clean, predictable naming.

**Source**: [Polaris Design Tokens](https://polaris.shopify.com/tokens)

---

## IBM Carbon

**Architecture**: 2-tier (theme tokens + component tokens)

**Token categories**: Color, typography, spacing, layout, motion, type scale

**Naming**: `--cds-text-primary`, `--cds-background`, `--cds-border-subtle`, `--cds-spacing-05`

- Prefix: `cds` (Carbon Design System)
- Flat naming (no deep nesting)

**Theming/Dark mode**: 4 built-in themes (White, Gray 10, Gray 90, Gray 100). Tokens remap per theme.

**Unique approach**:

- **Motion tokens** are well-developed with productive/expressive motion styles
- Uses a **type scale** system rather than individual font-size tokens
- Flat namespace keeps things simple

**Source**: [Carbon Design System](https://carbondesignsystem.com/)

---

## Radix Themes

**Architecture**: Single-tier with semantic overlays

**Token categories**: Color (12-step scale), spacing (1-9), radius (1-6), typography

**Naming**: `--accent-1` through `--accent-12`, `--gray-1` through `--gray-12`, `--space-1` through `--space-9`

- No system prefix
- 12-step color scale (each step has defined semantic meaning)

**Theming/Dark mode**: The `<Theme>` component wraps React tree. Colors auto-adapt. Custom themes via CSS variable override.

**Unique approach**:

- **12-step color scale with semantic meaning**: step 1 = app background, step 2 = subtle background, step 9 = solid backgrounds, step 11 = low-contrast text, step 12 = high-contrast text
- **No CSS-in-JS** - pure CSS custom properties
- **Split CSS architecture**: `tokens.css`, `components.css`, `utilities.css`
- Approximately 20% of CSS size is color definitions

**Source**: [Radix Themes](https://www.radix-ui.com/themes/docs/theme/overview)

---

## Chakra UI (v3)

**Architecture**: 2-tier (core tokens + semantic tokens), built on Panda CSS

**Token categories**: Color, typography, spacing, radii, borders, shadows, sizes, z-index, transitions

**Naming**: `colors.blue.500`, `spacing.4`, `radii.md`

- camelCase in JS config
- CSS output: `--chakra-colors-blue-500`

**Theming/Dark mode**: Semantic tokens can be conditional:

```js
semanticTokens: {
  colors: {
    text: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.100}" } }
  }
}
```

**Unique approach**:

- Built on **Panda CSS** (token config is reusable in non-React projects)
- `strictTokens` config enforces TypeScript errors for non-token values
- Token reference syntax `{path.to.token}` in JS config

**Source**: [Chakra UI v3](https://www.chakra-ui.com/)

---

## Open Props

**Architecture**: Flat (no tiers - just CSS custom properties)

**Token categories**: Colors (oklch palette), gradients, shadows, aspect ratios, typography, easings, animations, sizes, borders, z-indexes

**Naming**: `--blue-5`, `--font-size-1`, `--shadow-2`, `--ease-in-out-1`, `--gradient-1`, `--size-1`

- No system prefix
- Numeric scale per category

**Theming/Dark mode**: Built-in light/dark support via `prefers-color-scheme`.

**Unique approach**:

- **Pure CSS** - no build step required (though PostCSS JIT available)
- **oklch color space** - 16 base hue variables generate unlimited palettes
- Framework-agnostic (works with anything)
- Available in CSS, PostCSS, JSON, JS, and DTCG formats
- Hundreds of variables across 11+ categories

**Source**: [Open Props](https://open-props.style/)

---

## Comparative Matrix

| System     | Tiers | Prefix     | Color Scale   | Naming Style    | Dark Mode Strategy             |
| ---------- | ----- | ---------- | ------------- | --------------- | ------------------------------ |
| Primer     | 3     | none       | custom        | compound-kebab  | Functional token remapping     |
| Spectrum   | 3     | `spectrum` | custom        | tier-kebab      | Alias tier remapping           |
| Material 3 | 3     | `md`       | tonal palette | dot-notation    | Role remapping + dynamic color |
| Lightning  | 2     | `slds`     | numeric       | prefix-kebab    | Global token redefinition      |
| Polaris    | 2     | `p`        | 100-scale     | prefix-kebab    | Semantic token switch          |
| Carbon     | 2     | `cds`      | named         | flat-kebab      | Theme token sets               |
| Radix      | 1+    | none       | 12-step       | numeric-kebab   | CSS variable override          |
| Chakra     | 2     | `chakra`   | numeric       | camelCase/kebab | Conditional semantic tokens    |
| Open Props | 1     | none       | oklch         | numeric-kebab   | prefers-color-scheme           |

## Key Takeaways

1. **Everyone uses at least 2 tiers** (primitive + semantic). The 3rd tier (component) is optional and debated.
2. **CSS custom properties are the standard delivery mechanism** for web.
3. **Color is the most complex category** - every system invests heavily here.
4. **Numeric scales** are preferred for ordered values (spacing, sizing).
5. **Semantic/functional naming** is the consumer-facing API.
6. **System prefixes** prevent collisions in distributed systems.
7. **Dark mode** is universally handled at the semantic token layer.
