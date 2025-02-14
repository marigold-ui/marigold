import { createContext, useContext } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface AccordionContext {
  classNames: {
    [Key in keyof ThemeComponent<'Accordion'>]: string;
  };
}

const Context = createContext<AccordionContext | null>(null);

export const AccordionProvider = Context.Provider;

export const useAccordionContext = () => {
  const ctx = useContext(Context);

  if (ctx === null) {
    throw Error(
      'You can only use "useAccordionContext" within the <Accordion> component.'
    );
  }

  return ctx;
};
