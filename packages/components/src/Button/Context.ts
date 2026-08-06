import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components/slots';
import type { ButtonProps } from './Button';

// Marigold-owned Button context, deliberately SEPARATE from RAC's own
// `ButtonContext`: RAC overloads that one for functional slots (`Dialog`'s
// `close`, `NumberField`'s `increment`/`decrement`) and throws when a bare
// `<Button>` finds no matching slot. A plain context lets `<Button>` consume
// `variant`/`size`/`disabled` (+ a positional `className`) greedily while still
// forwarding `slot` to RAC's `<Button>` for those functional slots.
//
// Being a plain object (no `slots`), `useSlottedContext` ignores the `slot`
// arg, so only `slot={null}` opts out, not `slot="close"`. Overlays stop the
// cascade leaking through their portal via `<ResetButtonContext>`.
// `className?` lets a container inject a positional class (e.g. Panel's
// `[grid-area:actions]`) without a cast.
export type ButtonContextValue = ButtonProps & {
  className?: string;
};

export const ButtonContext =
  createContext<ContextValue<ButtonContextValue, HTMLButtonElement>>(null);

// Stable, empty value used by `<ResetButtonContext>` to clear the cascade.
export const RESET_BUTTON_CONTEXT: ButtonContextValue = {};
