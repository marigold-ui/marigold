# Recommendations for Marigold

Synthesizing the research findings with Marigold's current state.

## Priority 1: Establish a Shared Token Contract

**Problem**: theme-rui and theme-docs use completely different naming, making component styles non-portable.

**Recommendation**: Define a canonical set of semantic token names that ALL themes must implement. This becomes the "token API" that component styles program against.

```css
/* Shared contract - all themes must define these */

/* Text */
--color-text-primary
--color-text-secondary
--color-text-disabled
--color-text-inverse

/* Backgrounds */
--color-bg-body
--color-bg-surface
--color-bg-surface-raised
--color-bg-muted
--color-bg-disabled
--color-bg-overlay

/* Interactive */
--color-bg-brand
--color-bg-brand-hover
--color-text-on-brand
--color-bg-hover
--color-bg-selected

/* Borders */
--color-border-default
--color-border-muted
--color-border-focus
--color-border-error

/* Status */
--color-status-success
--color-status-warning
--color-status-error
--color-status-info
/* + muted variants for each */

/* Shadows */
--shadow-sm
--shadow-md
--shadow-lg

/* Radius */
--radius-sm
--radius-md
--radius-lg
--radius-full
```

This doesn't require changing the current implementation - it's a naming convention that both themes adopt. Component style files can then be written once and work across themes.

## Priority 2: Clean Up Naming Conventions

**Problem**: Inconsistent naming within theme-rui itself (e.g., `--color-foreground` vs `--color-muted-foreground`, `--color-brand` vs `--color-destructive`).

**Recommendation**: Adopt a consistent pattern:

```
--color-{context}-{variant}
```

Where context is one of: `text`, `bg`, `border`, `status`, `brand`
And variant is semantic: `primary`, `secondary`, `muted`, `disabled`, `hover`, `focus`

For foreground/background pairs, use the context to disambiguate:

```css
/* Instead of */
--color-brand
--color-brand-foreground

/* Use */
--color-bg-brand
--color-text-on-brand
```

This eliminates the `bg-background` double-prefix problem and makes the Tailwind utility class names more natural: `bg-bg-brand` becomes `bg-brand`, `text-text-primary` becomes `text-primary`.

## Priority 3: Add a Primitive Token Layer

**Problem**: Semantic tokens reference Tailwind's built-in scales directly (e.g., `var(--color-stone-950)`). This couples the system to Tailwind's palette.

**Recommendation**: Define a small set of primitive tokens between Tailwind's palette and the semantic layer:

```css
/* Primitives - the "palette" of the theme */
--primitive-neutral-50: var(--color-stone-50);
--primitive-neutral-100: var(--color-stone-100);
/* ... */
--primitive-neutral-950: var(--color-stone-950);
--primitive-accent-500: var(--color-orange-500);
--primitive-red-600: var(--color-red-600);
/* etc. */

/* Semantic tokens reference primitives */
--color-text-primary: var(--primitive-neutral-950);
--color-bg-body: var(--primitive-neutral-50);
```

This creates a 2-tier architecture (industry standard) where a new theme can provide a completely different palette by swapping primitives.

**Note**: Don't add a 3rd tier (component tokens). Marigold's `cva()` style functions already serve as the component-level token layer.

## Priority 4: Add TypeScript Token Types

**Problem**: No type safety on token names. Typos in Tailwind classes are silent failures.

**Recommendation**: Generate TypeScript types from the token CSS file. At minimum:

```typescript
// Auto-generated from theme.css
export type ColorToken =
  | 'text-primary'
  | 'text-secondary'
  | 'bg-body'
  | 'bg-surface';
// ...

export type SpacingToken = 'joined' | 'tight' | 'related';
// ...

export type ShadowToken = 'sm' | 'md' | 'lg';
```

This could be a build script that parses `theme.css` and generates type definitions.

## Priority 5: Remove Legacy Tokens

**Problem**: `--surface-sunken/body/raised/overlay` tokens marked "OLD (to be removed)" still exist.

**Recommendation**: Remove them and their `util-surface-*` utilities. They're superseded by `--shadow-elevation-*`. Search for any remaining usage first.

## Priority 6: Add Radius Tokens

**Problem**: Only `--radius-surface` exists. Everything else uses raw Tailwind `rounded-*` classes.

**Recommendation**: Define 4-5 semantic radius tokens:

```css
--radius-sm: var(--radius-sm); /* small elements: badges, chips */
--radius-md: var(--radius-md); /* default: inputs, buttons */
--radius-lg: var(--radius-lg); /* large: cards, dialogs */
--radius-full: 9999px; /* pills, avatars */
```

This makes radius consistent across themes and avoids hardcoded Tailwind classes in component styles.

## Priority 7: Document Token Architecture

**Problem**: The token architecture is implicit - there's no documentation explaining the system, the tiers, or how to extend it.

**Recommendation**: Create a tokens documentation page that covers:

- The 2-tier model (primitive -> semantic)
- Complete token inventory with descriptions
- How to create a new theme (which tokens must be defined)
- How tokens flow from CSS to components
- The z-index scale and stacking order

## Lower Priority Recommendations

### Consider Motion Token Consolidation

The current 12 easing functions are thorough. Consider whether components actually use all of them, or if a smaller set (3-4 easings, 3-4 durations) would suffice for consistency.

### Evaluate Z-Index Approach

Current approach (z-index in component source, not theme) is well-documented and intentional. However, it means the stacking order is only visible by searching all component files. Consider:

- Keeping the current approach but adding a single reference comment in `theme.css`
- Or defining z-index tokens in `theme.css` for documentation purposes even if components use the Tailwind utilities directly

### Consider `@theme` vs `@theme static` Strategy

Using `@theme static` requires manual `@source inline(...)` safeguarding. Consider:

- Moving to `@theme` (auto-generates utilities) for most tokens
- Only using `@theme static` for tokens that truly shouldn't generate utilities
- This eliminates the maintenance burden of keeping `@source inline` in sync

### Evaluate Design Tool Integration

If Figma-code sync becomes a priority:

1. Define tokens in DTCG JSON format as source of truth
2. Use Style Dictionary to generate CSS custom properties
3. This makes future Figma Variables / Tokens Studio integration possible

This is a significant investment and may not be warranted unless the team grows or the number of themes increases.

## What NOT To Do

Based on the anti-patterns research:

1. **Don't add component-specific tokens** - The `cva()` system already handles component-level styling. Adding `--button-bg-primary` tokens on top of semantic tokens adds unnecessary indirection.

2. **Don't over-tokenize** - Not every value needs a token. Spacing within a component that won't change per theme can remain as hardcoded Tailwind classes.

3. **Don't add z-index tokens as a numeric scale** - The current named-layer approach (z-1, z-30, z-50, z-80) is better than a numeric scale. Modern CSS (`dialog`, `popover`) may reduce the need further.

4. **Don't create a 3-tier system** - 2 tiers (primitive + semantic) is sufficient for Marigold's scale. The 3rd tier (component tokens) is only justified for design systems consumed by many external teams.

5. **Don't introduce Style Dictionary or build pipeline complexity** unless there's a concrete multi-platform or Figma-sync need.

## Implementation Order

1. **Define the shared token contract** (naming convention) - design decision, no code change
2. **Migrate theme-rui token names** to match the contract
3. **Migrate theme-docs token names** to match the contract
4. **Update component style files** to use the new token names
5. **Remove legacy surface tokens**
6. **Add radius tokens**
7. **Add TypeScript token types** (build script)
8. **Write documentation**

Steps 1-4 can be done incrementally. Each step is independently shippable.
