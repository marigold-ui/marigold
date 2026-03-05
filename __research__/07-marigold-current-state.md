# Marigold Current State: Token Architecture Analysis

## Architecture Overview

Marigold uses **Tailwind v4's CSS-first token system**. Tokens are CSS custom properties declared inside `@theme` or `@theme static` blocks in each theme's CSS file. There is no JSON/JS token source, no Style Dictionary, no Figma pipeline.

### The Two-Layer Stack

```
Layer 1: CSS Custom Properties (tokens)
  └── themes/theme-rui/src/theme.css       @theme static { ... }
  └── themes/theme-docs/src/theme.css      @theme { ... }

Layer 2: Component Style Functions (consumers)
  └── themes/theme-rui/src/components/*.styles.ts    cva({ ... })
  └── themes/theme-docs/src/components/*.styles.ts   cva({ ... })
```

### Token Flow

```
theme.css (--color-brand: var(--color-stone-950))
  → Tailwind generates utility classes (bg-brand, text-brand, etc.)
    → Button.styles.ts: cva({ variants: { variant: { primary: '...' } } })
      → Theme object: { components: { Button: <cva fn> } }
        → ThemeProvider: React context
          → useClassNames({ component: 'Button', variant: 'primary' }) → class string
            → <button className={classNames}> in Button.tsx
```

## Token Inventory (theme-rui)

### Colors (~45 semantic tokens)

**Pattern**: Status colors follow a consistent 4-part structure:

- `--color-{status}` - solid, for icons/badges
- `--color-{status}-muted` - light background
- `--color-{status}-muted-accent` - dark border/icon inside muted contexts
- `--color-{status}-muted-foreground` - text on muted background

Statuses: `destructive`, `success`, `warning`, `info`

**Other semantic colors**: `background`, `foreground`, `brand`, `brand-foreground`, `hover`, `secondary`, `muted`, `disabled`, `placeholder`, `ring`, `link`, `input`, `border`, `focus`, `selected`, `surface`, `surface-border`, `scrollbar`, `access-master`, `access-admin`

Primitive colors: One custom palette (orange for accent). Otherwise uses Tailwind's built-in scales (stone, red, green, yellow, blue, purple).

### Spacing (~20 tokens)

**Relational spacing** (gap between elements, expressing semantic relationship):

```
joined, tight, related, peer, group, section, context
```

**Inset spacing** (padding, three axis variants):

```
square-tight|snug|regular|relaxed|loose
squish-tight|snug|regular|relaxed|loose
stretch-tight|snug|regular|relaxed|loose
```

**Component sizing**: `input`, `button`, `button-small`, `button-large`, `container`

### Shadows (3 semantic tokens)

```
elevation-border   (subtle: inputs, cards)
elevation-raised   (moderate: containers)
elevation-overlay  (prominent: modals, popovers)
```

Plus legacy tokens marked "OLD (to be removed)": `surface-sunken`, `surface-body`, `surface-raised`, `surface-overlay`.

### Radius (1 semantic token)

```
radius-surface = var(--radius-lg)
```

Everything else uses Tailwind's built-in `rounded-*` scale directly.

### Animation (extensive)

- 12 easing functions (ease-out/in/in-out variants of quad, cubic, quart, quint, expo, circ)
- Named animations: fade-in/out, slide-in/out (with directional variants), rotate-spinner, progress-cycle
- Duration constants: fade-in (0.3s), fade-out (0.2s), slide-in (0.3s), slide-out (0.15s)

### Z-Index (not in theme.css, applied in components)

Applied as Tailwind utility classes directly in component source:

| Value | Usage                                                |
| ----- | ---------------------------------------------------- |
| z-1   | Sticky table headers, accordion headers              |
| z-10  | Calendar focus states                                |
| z-20  | Multiselect dropdown (inline style for react-select) |
| z-30  | Popovers, Menus, Tooltips, ActionBar                 |
| z-50  | Modal/Drawer/Tray overlays, Underlay                 |
| z-80  | Toast region, Drawer close button                    |
| z-100 | Touch hitbox pseudo-element                          |

## Custom Utilities Layer

Theme-rui defines `@utility` blocks that compose multiple token-derived properties:

| Utility               | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| `ui-surface`          | Gradient border + background for interactive surfaces |
| `ui-surface-contrast` | Brand-colored surface with highlight glow             |
| `ui-state-focus`      | Ring + border color for focus states                  |
| `ui-state-error`      | Border + shadow for invalid state                     |
| `ui-state-disabled`   | Muted background + cursor for disabled                |
| `ui-interactive`      | Combines focus, disabled, cursor                      |
| `ui-button-base`      | Shared button element styles                          |
| `ui-press`            | Scale feedback on press/tap                           |
| `ui-touch-hitbox`     | WCAG minimum touch target (24x24px)                   |
| `ui-scrollbar`        | Cross-browser scrollbar styling                       |

## Identified Pain Points

### 1. No Shared Token Layer Between Themes

Theme-rui and theme-docs have **completely different naming conventions**:

| Concept         | theme-rui                  | theme-docs                                |
| --------------- | -------------------------- | ----------------------------------------- |
| Page background | `--color-background`       | `--color-bg-body`                         |
| Default text    | `--color-foreground`       | `--color-text-primary`                    |
| Muted text      | `--color-muted-foreground` | `--color-text-primary-muted`              |
| Error           | `--color-destructive`      | `--color-bg-error` / `--color-text-error` |

Component style files cannot be shared across themes. Adding a new theme requires writing all component styles from scratch.

### 2. Legacy Token Debt

The `--surface-*` tokens (sunken, body, raised, overlay) with shadow and border sub-tokens are still in theme.css marked "OLD (to be removed)". They coexist with the newer `--shadow-elevation-*` system.

### 3. No Type Safety on Token Names

There are no TypeScript types for color tokens, elevation names, or animation names. A typo like `bg-brand-foregound` (missing `r`) produces no error at build time and silently applies no style in production.

### 4. `@theme static` Manual Safeguarding

Using `@theme static` means Tailwind does not auto-generate utilities. Token-derived classes must appear in source files or be declared in `@source inline(...)` blocks. These are maintained manually and have known inconsistencies (e.g., spacing names in `@source inline` don't match token names in `theme.css`).

### 5. Unused Theme Type Fields

The TypeScript `Theme` type has `screens`, `colors`, `shadow`, `height` fields that neither theme populates. They're holdovers from when tokens were managed in JavaScript.

### 6. Dynamic CSS Variable Overrides Are Unreadable

Pattern used in Button hover: `hover:[--ui-background-color:oklch(from_var(--color-brand)_calc(l-0.05)_c_h)]`. Powerful but impossible to statically analyze, document, or maintain.

### 7. No Design Tool Integration

No pipeline from Figma or any design tool. Tokens are authored and maintained manually by developers in CSS files. This creates a gap between design intent and implementation.

### 8. Color Contrast Issues

`--color-warning-foreground: white` against `--color-yellow-400` fails WCAG AA contrast (work is in progress per DST-1125).
