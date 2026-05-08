import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface PanelContext {
  classNames: {
    [Key in keyof ThemeComponent<'Panel'>]: string;
  };
  variant?: string;
  titleId: string;
  headingLevel: number;
  hasTitle: boolean;
  titleSlotRef: RefCallback<Element>;
}

const Context = createContext<PanelContext | null>(null);

export const PanelProvider = Context.Provider;

export const usePanelContext = () => {
  const ctx = use(Context);

  if (ctx === null) {
    throw new Error(
      'Panel sub-components must be used within a <Panel> component.'
    );
  }

  return ctx;
};
