import { createContext } from 'react';

// Lets a wrapper (e.g. `LabelAdornment`) cascade a look onto a bare child
// `<Badge>` without the child needing to know it's inside one. Mirrors
// `ToggleButtonContext`/`Drawer`'s `size ?? context.size` precedent: a plain
// context with a default empty object, read via `use()`. An explicit `size`
// on `<Badge>` itself always wins.
export interface BadgeContext {
  size?: string;
}

export const BadgeContext = createContext<BadgeContext>({});
