import React, { ReactNode } from 'react';

import { useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { ListContext } from './Context';
import { ListItem } from './ListItem';

export interface ListProps extends HtmlProps<'ul'> {
  variant?: string;
  size?: string;
  as?: 'ul' | 'ol';
  children?: ReactNode;
}

export const List = ({
  as = 'ul',
  children,
  variant,
  size,
  ...props
}: ListProps) => {
  const Component = as;
  const classNames = useClassNames({ component: 'List', variant, size });

  return (
    <Component {...props} className={classNames[as]}>
      <ListContext.Provider value={{ classNames: classNames.item }}>
        {children}
      </ListContext.Provider>
    </Component>
  );
};

List.Item = ListItem;
