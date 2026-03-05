# Tailwind CSS and Design Tokens

## The Tension

Tailwind CSS and traditional design token systems approach the same problem from different angles:

| Aspect            | Design Tokens                           | Tailwind CSS                            |
| ----------------- | --------------------------------------- | --------------------------------------- |
| **Philosophy**    | Named decisions, semantic meaning       | Utility classes, visual mapping         |
| **Abstraction**   | Purpose-first (`color-text-primary`)    | Property-first (`text-gray-900`)        |
| **Theming**       | Swap token values per theme             | Swap entire class sets or CSS variables |
| **Customization** | Change token source, regenerate         | Configure `tailwind.config` or CSS      |
| **Naming**        | Semantic (`bg-surface`, `text-primary`) | Visual (`bg-white`, `text-gray-900`)    |

This tension is real: Radix UI's docs explicitly say Tailwind "may not mix well with the idea of a closed component system where customization is achieved through props, tokens, and creating new components."

## How Tailwind v4 Changes Things

Tailwind v4 (CSS-first configuration) shifts significantly toward CSS custom properties:

```css
@theme {
  --color-primary: oklch(0.7 0.15 200);
  --color-surface: #ffffff;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}
```

This makes Tailwind v4 **much more compatible with a design token approach** because:

1. Tokens can be defined as CSS custom properties
2. Tailwind generates utility classes from those properties
3. Theming works by overriding the properties (no rebuild needed)

## Integration Strategies

### Strategy 1: Tokens as Tailwind Theme Config (Recommended for Marigold)

Define tokens as CSS custom properties, let Tailwind consume them:

```css
/* tokens.css - the single source of truth */
:root {
  /* Primitives */
  --palette-blue-500: oklch(0.5 0.15 250);
  --palette-gray-900: oklch(0.15 0 0);

  /* Semantic tokens */
  --color-text-primary: var(--palette-gray-900);
  --color-bg-surface: #ffffff;
  --color-action-primary: var(--palette-blue-500);
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}

[data-theme='dark'] {
  --color-text-primary: var(--palette-gray-100);
  --color-bg-surface: var(--palette-gray-900);
}
```

```css
/* Tailwind v4 - consume the tokens */
@theme {
  --color-text-primary: var(--color-text-primary);
  --color-bg-surface: var(--color-bg-surface);
  --color-action-primary: var(--color-action-primary);
}
```

Usage in components:

```jsx
<button className="bg-action-primary px-md rounded-md text-white">
  Click me
</button>
```

**Pros**: Single source of truth, Tailwind utilities work naturally, theming via CSS
**Cons**: Duplicate variable declarations (token + Tailwind theme)

### Strategy 2: Tailwind Config IS the Token Source

Define everything in Tailwind's theme:

```css
@theme {
  --color-text-primary: #1a1a1a;
  --color-bg-surface: #ffffff;
  --spacing-md: 1rem;
}
```

**Pros**: Simple, no extra token layer
**Cons**: Tied to Tailwind, harder to share with non-Tailwind consumers

### Strategy 3: External Token Source, Transform to Tailwind

Use Style Dictionary or similar to transform DTCG tokens into Tailwind config:

```json
// tokens.json (DTCG format)
{
  "color": {
    "text": {
      "primary": { "$type": "color", "$value": "#1a1a1a" }
    }
  }
}
```

Build pipeline generates Tailwind-compatible CSS. This is the most robust for multi-platform but adds build complexity.

## What Marigold Currently Does

Marigold uses Tailwind v4 with CSS custom properties defined in `theme.css` files. Components use `cva()` (class variance authority) to define variants as Tailwind utility classes. The `useClassNames` hook resolves the right classes based on component name, variant, and size from the theme context.

This is essentially **Strategy 1** - tokens as CSS custom properties consumed by Tailwind utilities. But the current implementation mixes concerns:

- Some values are hardcoded Tailwind classes in component styles
- Some values come from CSS custom properties
- The line between "token" and "hardcoded style" is blurry

## Best Practices for Tailwind + Tokens

1. **Use CSS custom properties for anything that needs to change per theme** (colors, shadows)
2. **Use Tailwind's built-in scale for things that don't change** (spacing, sizing) - unless you need cross-platform tokens
3. **Don't create tokens for Tailwind utilities that are already well-named** (`rounded-md` is already semantic enough)
4. **Do create tokens for values used in multiple components** that need consistency
5. **Keep the primitive palette in CSS custom properties** and reference them in Tailwind's theme
6. **Semantic color tokens are the highest-value tokens** in a Tailwind system

## The "Token-Free" Argument

Some Tailwind practitioners argue that Tailwind's utility classes ARE the tokens. If you use `bg-blue-500` everywhere, `blue-500` is effectively a primitive token, and Tailwind's config is your token source.

This works for small teams but breaks down when:

- You need dark mode (semantic tokens are necessary)
- You share tokens with non-web platforms
- You want Figma-code sync
- Different themes need different values for the same semantic concept

## Sources

- [Radix Themes: Styling Overview](https://www.radix-ui.com/themes/docs/overview/styling)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Penpot: Developer's Guide to Design Tokens](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/)
