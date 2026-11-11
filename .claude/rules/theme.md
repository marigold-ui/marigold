---
paths:
  - 'themes/**'
---

# Theme rules

`themes/theme-rui` is the only theme. It is published, so a renamed token or removed variant is
a breaking change for consumers.

| File                              | Holds                                                              |
| --------------------------------- | ------------------------------------------------------------------ |
| `src/tokens.css`                  | Every design token, as one Tailwind v4 `@theme static` block       |
| `src/components/<Name>.styles.ts` | Per-component styles, one `cva` per slot                           |
| `src/components/index.ts`         | Re-exports every style file. Add new ones here                     |
| `src/ui.css`                      | `ui-*` utilities shared across components (focus, surface, hitbox) |
| `src/variants.css`                | Custom Tailwind variants                                           |
| `src/theme.css`, `src/styles.css` | Consumer entry points. Rarely edited                               |
| `src/appearances.ts`              | **Generated** by the build and gitignored. Never edit              |

## Style files

```ts
import { type ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva({
  base: ['inline-flex items-center rounded-full text-xs font-medium'],
  variants: {
    variant: { default: 'bg-muted text-foreground', primary: 'bg-primary text-primary-foreground' },
    size: { default: '', inline: 'h-4 px-1.5' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
```

- Use semantic tokens (`bg-primary`, `text-foreground`, `border-border`). Do not hard-code a
  palette colour or an arbitrary value where a token exists. If the token is missing, add it to
  `tokens.css` and say so in the changeset.
- **No z-index here.** Stacking order belongs to the component (`pnpm check:theme-zindex`).
- Slot names must match the component's entry in `packages/system/src/types/theme.ts`.
- A variant exists in two places, released separately: the style file here and the prop union
  in the component. Change both, or the value renders unstyled or cannot be reached, with no
  error either way. A component without its own style file shares one: see the alias map at
  the top of `scripts/build-appearances.mjs`.

## Seeing a change

- Storybook reads theme source directly.
- The docs site reads the built theme: `pnpm build:themes`, which also regenerates
  `appearances.ts` for the docs' variant pickers.
- Visual changes are guarded by Chromatic. Running it costs snapshot quota, so ask first.
