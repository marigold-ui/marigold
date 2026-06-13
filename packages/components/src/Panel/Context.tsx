import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface PanelContextValue {
  classNames: {
    [Key in keyof ThemeComponent<'Panel'>]: string;
  };
  variant?: string;
  titleId: string;
  headingLevel: number;
  hasTitle: boolean;
  titleSlotRef: RefCallback<Element>;
}

export const PanelContext = createContext<PanelContextValue | null>(null);

export const usePanelContext = () => {
  const ctx = use(PanelContext);

  if (ctx === null) {
    throw new Error(
      'Panel sub-components must be used within a <Panel> component.'
    );
  }

  return ctx;
};
