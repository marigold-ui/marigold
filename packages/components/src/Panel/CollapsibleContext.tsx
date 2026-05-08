import type { RefCallback } from 'react';
import { createContext, use } from 'react';

export interface CollapsibleHeaderContext {
  titleId: string;
  descriptionId: string;
  descriptionSlotRef: RefCallback<Element>;
}

const Context = createContext<CollapsibleHeaderContext | null>(null);

export const CollapsibleHeaderProvider = Context.Provider;

export const useCollapsibleHeaderContext = () => {
  const ctx = use(Context);

  if (ctx === null) {
    throw new Error(
      'Panel.CollapsibleTitle and Panel.CollapsibleDescription must be used within a <Panel.CollapsibleHeader> component.'
    );
  }

  return ctx;
};
