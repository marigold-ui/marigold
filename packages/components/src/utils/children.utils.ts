import type { ReactNode } from 'react';
import { Children } from 'react';

export const splitChildren = (children: ReactNode, at?: number) => {
  const c = Children.toArray(children);

  if (at === undefined) {
    return [c, []];
  }

  return [c.slice(0, at), c.slice(at)];
};
