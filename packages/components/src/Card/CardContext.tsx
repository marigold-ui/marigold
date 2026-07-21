import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface CardContextValue {
  classNames: {
    [Key in keyof ThemeComponent<'Card'>]: string;
  };
  titleId: string;
  headingLevel: number;
  hasTitle: boolean;
  titleSlotRef: RefCallback<Element>;
}

export const CardContext = createContext<CardContextValue | null>(null);

export const useCardContext = () => {
  const ctx = use(CardContext);

  if (ctx === null) {
    throw Error(
      'You can only use Card sub-components (Card.Header, Card.Content, Card.Footer, Card.Media) within a <Card> component.'
    );
  }

  return ctx;
};
