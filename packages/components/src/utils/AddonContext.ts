import { createContext } from 'react';

export interface AddonContextValue {
  size?: string;
}

// Inline size for a `Badge` in a label addon. `ContextualHelp` resets it in its popover.
export const AddonContext = createContext<AddonContextValue>({});
