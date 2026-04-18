import type { RefCallback } from 'react';
import { createContext, use } from 'react';

export interface CollapsibleHeaderContext {
  titleId: string;
  descriptionId: string;
  descriptionSlotRef: RefCallback<Element>;
}

const Context = createContext<CollapsibleHeaderContext | null>(null);

export const CollapsibleHeaderProvider = Context.Provider;

export const useCollapsibleHeaderContext = () => use(Context);
