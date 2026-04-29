import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface CardContext {
  classNames: {
    [Key in keyof ThemeComponent<'Card'>]: string;
  };
}

const Context = createContext<CardContext | null>(null);

export const CardProvider = Context.Provider;

export const useCardContext = () => {
  const ctx = use(Context);

  if (ctx === null) {
    throw Error(
      'You can only use Card sub-components (Card.Header, Card.Body, Card.Footer, Card.Preview) within a <Card> component.'
    );
  }

  return ctx;
};
