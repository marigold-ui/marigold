import type { RefObject } from 'react';
import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface TitleInfo {
  hasTitle: boolean;
  level: number;
}

export interface PanelContext {
  classNames: {
    [Key in keyof ThemeComponent<'Panel'>]: string;
  };
  variant?: string;
  titleId: string;
  titleInfo: RefObject<TitleInfo>;
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
