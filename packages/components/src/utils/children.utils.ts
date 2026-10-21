import type { ReactNode } from 'react';
import { Children } from 'react';

export const splitChildren = (children: ReactNode, at?: number) => {
  const childArray = Children.toArray(children);

  if (at === undefined) {
    return [childArray, []];
  }

  return [childArray.slice(0, at), childArray.slice(at)];
};
