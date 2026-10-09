import { createContext } from 'react';

export interface AddonContextValue {
  size?: string;
  /** Inside the part referenced as the field's description. */
  described?: boolean;
}

// Inline size for a `Badge` in a label addon. `ContextualHelp` resets it in its popover.
export const AddonContext = createContext<AddonContextValue>({});

export const ADDON_CONTENT: AddonContextValue = {
  size: 'inline',
  described: true,
};
export const ADDON_HELP: AddonContextValue = { size: 'inline' };

const helpTypes = new WeakSet<object>();

// Lets a label addon spot `ContextualHelp` without importing it.
export const markAddonHelp = <T extends object>(type: T) => {
  helpTypes.add(type);
  return type;
};

export const isAddonHelp = (type: unknown) =>
  (typeof type === 'function' || typeof type === 'object') &&
  type !== null &&
  helpTypes.has(type);
