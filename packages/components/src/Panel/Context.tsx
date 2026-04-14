import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface PanelContext {
  classNames: {
    [Key in keyof ThemeComponent<'Panel'>]: string;
  };
  variant?: string;
  titleId: string;
  titleLevel: number;
  hasTitle: boolean;
}

const Context = createContext<PanelContext | null>(null);

export const PanelProvider = Context.Provider;

export const usePanelContext = () => {
  const ctx = use(Context);

  if (ctx === null) {
    throw Error(
      'Panel sub-components must be used within a <Panel> component.'
    );
  }

  return ctx;
};
