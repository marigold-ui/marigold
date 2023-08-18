import React, { ReactNode } from 'react';

import { HtmlProps } from '@marigold/types';

import { useListContext } from './Context';

export interface ListItemProps extends HtmlProps<'li'> {
  children?: ReactNode;
}

export const ListItem = ({ children, ...props }: ListItemProps) => {
  const { classNames } = useListContext();

  return (
    <li {...props} className={classNames}>
      {children}
    </li>
  );
};
