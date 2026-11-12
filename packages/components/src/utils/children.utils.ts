import type { ReactNode } from 'react';
import { Children } from 'react';

export const splitChildren = (children: ReactNode, at?: number) => {
  // eslint-disable-next-line @eslint-react/no-children-to-array -- the helper's purpose is to split a flattened child list at an index
  const childArray = Children.toArray(children);

  if (at === undefined) {
    return [childArray, []];
  }

  return [childArray.slice(0, at), childArray.slice(at)];
};
