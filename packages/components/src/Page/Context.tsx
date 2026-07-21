import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface PageContextValue {
  classNames: {
    [Key in keyof ThemeComponent<'Page'>]: string;
  };
  titleId: string;
  headingLevel: number;
  hasTitle: boolean;
  titleSlotRef: RefCallback<Element>;
}

export const PageContext = createContext<PageContextValue | null>(null);

export const usePageContext = () => {
  const ctx = use(PageContext);

  if (ctx === null) {
    throw new Error(
      'Page sub-components must be used within a <Page> component.'
    );
  }

  return ctx;
};
