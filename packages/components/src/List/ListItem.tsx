import { ReactNode } from 'react';

import { HtmlProps } from '@marigold/types';

import { useListContext } from './Context';

export interface ListItemProps extends Omit<HtmlProps<'li'>, 'className'> {
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
