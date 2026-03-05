# Design Token Anti-Patterns: What Not To Do

## 1. Naming Tokens After Their Value

**The #1 most cited mistake.**

```
// BAD: value-dependent names
--blue-500: #0066cc;
--gray-900: #1a1a1a;
--16px: 16px;

// GOOD: purpose-dependent names
--color-text-primary: #1a1a1a;
--color-action-default: #0066cc;
--spacing-md: 16px;
```

Why it's bad:

- What happens when "blue-500" becomes green in a rebrand?
- Semantic tokens should describe **intent**, not appearance
- Primitive tokens can use value names, but they should never be used directly by consumers

## 2. Skipping the Semantic Layer

Using primitive tokens directly in components.

```css
/* BAD: components reference primitives */
.button {
  background: var(--blue-500);
}
.card {
  border: 1px solid var(--gray-200);
}

/* GOOD: components reference semantic tokens */
.button {
  background: var(--color-action-primary);
}
.card {
  border: 1px solid var(--color-border-default);
}
```

Why it's bad:

- Theming becomes impossible (dark mode requires 1:1 token remapping)
- No single place to change "what blue-500 means in this context"
- Developers have to guess which primitive to use

## 3. Over-Tokenizing (Token Bloat)

Creating a token for every possible value.

```
// BAD: tokens for everything
--button-padding-top: 8px;
--button-padding-right: 16px;
--button-padding-bottom: 8px;
--button-padding-left: 16px;
--button-icon-margin-right: 4px;
--button-border-width: 1px;
--button-border-style: solid;
--button-small-padding-top: 4px;
... (hundreds more)
```

Signs of over-tokenizing:

- More than ~200 semantic tokens
- Component-specific tokens that are just aliases of semantic tokens
- Tokens used in only one place
- Theming feels like "an encyclopedic research for corresponding variables"

**Rule of thumb**: Only tokenize values that are (a) reused across components, (b) need to change per theme, or (c) need to be shared cross-platform.

## 4. Under-Tokenizing

Hardcoding values that should be tokens.

```css
/* BAD: magic values scattered across components */
.card {
  border-radius: 8px;
}
.dialog {
  border-radius: 12px;
}
.chip {
  border-radius: 999px;
}

/* GOOD: tokens enforce consistency */
.card {
  border-radius: var(--radius-md);
}
.dialog {
  border-radius: var(--radius-lg);
}
.chip {
  border-radius: var(--radius-full);
}
```

Common things teams forget to tokenize:

- Border radius
- Shadow values
- Animation durations and easings
- Focus ring styles
- Disabled state opacity

## 5. Too Many Layers of Abstraction

Adding indirection without purpose.

```
// BAD: 4+ levels of aliasing
--palette-blue-500: #0066cc;
--color-brand-primary: var(--palette-blue-500);
--color-action-primary: var(--color-brand-primary);
--button-primary-bg: var(--color-action-primary);
--button-primary-bg-default: var(--button-primary-bg);
```

3 tiers (primitive -> semantic -> component) is the maximum most experts recommend. Each layer should serve a distinct purpose:

- Primitive: defines the available values
- Semantic: assigns purpose/intent
- Component (optional): provides customization hooks

If a layer doesn't enable something the previous layer can't, remove it.

## 6. Inconsistent Naming Across Categories

```
// BAD: different patterns for different categories
--color-text-primary     (kebab, semantic)
--fontSize-sm            (camelCase, size-based)
--SPACING_MEDIUM         (SCREAMING_SNAKE)
--border_radius_4        (snake_case, value-based)
```

Pick one convention and apply it everywhere. Document it.

## 7. Not Planning for Dark Mode From the Start

Retrofitting dark mode onto a system built with only light mode tokens is painful.

```
// BAD: single-value tokens
--text-color: #1a1a1a;

// GOOD: tokens designed for theme switching
// light.css
--color-text-primary: var(--gray-900);
// dark.css
--color-text-primary: var(--gray-100);
```

Even if you only need light mode today, **structure tokens so that the semantic layer can be remapped**. This means:

- Never reference primitives directly in components
- Ensure semantic names are context-agnostic ("primary" not "dark")

## 8. Platform-Specific Names in Cross-Platform Tokens

```
// BAD: CSS-specific naming in source tokens
--hover-bg-color        (no "hover" concept on mobile)
--backdrop-filter-blur   (CSS-specific property name)
--box-shadow-md          (CSS-specific)

// GOOD: platform-agnostic source tokens
color.bg.interactive     (translates to hover on web, press on mobile)
blur.overlay             (platform translates to appropriate API)
elevation.md             (shadow on web, elevation on Android)
```

Source tokens should be platform-agnostic. Let tooling (Style Dictionary) transform to platform-specific output.

## 9. Treating Tokens as a Substitute for a Design System

Tokens alone don't make a design system. Common symptoms:

- Team has 500 tokens but no component library
- Tokens defined but no documentation on when to use which
- No governance process for adding/changing tokens
- Designers use Figma styles, developers use different token values

Tokens are **one piece** of a design system, not the whole thing.

## 10. Not Versioning or Deprecating Tokens

Changing or removing tokens without a migration path.

```
// BAD: just rename/remove
v1: --color-primary
v2: --color-brand (breaks everything using color-primary)

// GOOD: deprecate gradually
v1: --color-primary (active)
v2: --color-primary (deprecated, aliased to --color-brand)
    --color-brand (new preferred name)
v3: --color-primary (removed with migration guide)
```

Treat tokens like API endpoints. Version them. Provide migration paths.

## 11. Z-Index Token Pitfalls

Specific anti-patterns for z-index:

```
// BAD: arbitrary numeric tokens
--z-index-1: 1;
--z-index-100: 100;
--z-index-9999: 9999;

// Better: semantic layer names
--z-content: 1;
--z-sticky: 10;
--z-dropdown: 20;
--z-overlay: 50;
--z-toast: 80;
```

But even better: consider if you need z-index tokens at all. Modern CSS `<dialog>`, `popover` attribute, and `top-layer` handle most stacking needs.

## 12. One-Size-Fits-All Spacing Scale

```
// BAD: linear scale
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
... (every 4px increment)

// GOOD: intentional gaps
--space-1: 4px;    (tight)
--space-2: 8px;    (compact)
--space-3: 12px;   (default inner)
--space-4: 16px;   (default)
--space-6: 24px;   (comfortable)
--space-8: 32px;   (section)
--space-12: 48px;  (layout)
--space-16: 64px;  (page)
```

Not every pixel value needs a token. The scale should have intentional "jumps" that create visual hierarchy.

## 13. Token Sprawl via "Just This Once" Exceptions

The most insidious anti-pattern. Each team adds "just one more" token:

```
--card-header-padding-special: 14px;      // "just for this card"
--modal-title-color-legacy: #333;         // "needed for the old modal"
--button-border-radius-rounded-v2: 20px;  // "new design, not rolled out yet"
```

Before long: 130+ components, duplicated tokens, Figma out of sync with code.

**Prevention**: Require PR review for new tokens. Schedule periodic token audits. Merge or delete unused tokens.

## Summary: The Five Commandments

1. **Name by purpose, not value** - Semantic tokens describe intent
2. **Maintain exactly 2-3 tiers** - Don't skip semantic, don't add unnecessary layers
3. **Tokenize for reuse and theming** - Not for every single value
4. **Be consistent** - Same naming convention, same scale approach, everywhere
5. **Govern and deprecate** - Treat tokens as API. Version them. Audit regularly.

## Sources

- [Supernova 2024 Webinar: State of Design Tokens](https://www.supernova.io/blog/navigating-the-future-of-design-tokens-insights-from-supernovas-2024-webinar)
- [Building a Design System That Doesn't Collapse](https://dev.to/tawe/building-a-design-system-that-doesnt-collapse-under-its-own-weight-1nla)
- [Design Tokens Governance](https://designtokens.substack.com/p/design-tokens-governance)
- [DOOR3: Establishing Effective Design Token Governance](https://www.door3.com/blog/design-token-governance)
- [Nucleus: Be Aware of Using CSS Custom Properties](https://blog.nucleus.design/be-aware-of-css-custom-properties/)
- [Wicar Akhtar: Tokens and Naming Conventions](https://medium.com/@wicar/streamlining-your-design-system-a-guide-to-tokens-and-naming-conventions-3e4553aa8821)
