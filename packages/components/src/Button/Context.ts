import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components/slots';
import type { ButtonProps } from './Button';

// Marigold-owned Button context. This is deliberately a SEPARATE context object
// from RAC's `ButtonContext` (`react-aria-components/Button`):
//
//  - RAC overloads its own `ButtonContext` for *functional* slots (`Dialog`'s
//    `close`, `NumberField`'s `increment`/`decrement`) and THROWS when a bare
//    `<Button>` can't find a matching/default slot. Reusing it for styling would
//    collide with those payloads and inherit the throw.
//  - A plain Marigold context sidesteps both: `<Button>` consumes it greedily
//    for `variant`/`size`/`disabled` (+ a positional `className`), while still
//    forwarding `slot` to RAC's `<Button>` so `slot="close"`/`"increment"`/
//    `"decrement"` keep working.
//
// This asymmetry is intentional and diverges from `Title`/`Description`/
// `TextValue`, which REUSE RAC's `Heading`/`Text` contexts under a named slot
// (safe there because RAC doesn't contend those contexts).
//
// LEAK NOTE: because this is a plain object (no `slots`), RAC's
// `useSlottedContext` ignores the `slot` arg — only `slot={null}` opts out;
// `slot="close"` does NOT. Overlays guard against the cascade leaking through
// their portal via `<ResetButtonContext>` (see that component).
//
// Widen with `className?` so a parent container can inject a positional class
// (e.g. Panel's `[grid-area:actions]`) without a cast.
export type ButtonContextValue = ButtonProps & {
  className?: string;
};

export const ButtonContext =
  createContext<ContextValue<ButtonContextValue, HTMLButtonElement>>(null);

// Stable, empty value used by `<ResetButtonContext>` to clear the cascade.
export const RESET_BUTTON_CONTEXT: ButtonContextValue = {};
