import { forwardRef } from 'react';
import { ListBox } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { ListBoxContext } from './Context';

export interface ListBoxProps
  extends Omit<RAC.ListBoxProps<object>, 'className'> {
  variant?: string;
  size?: string;
}

const _ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  ({ variant, size, ...props }, ref) => {
    const classNames = useClassNames({ component: 'ListBox', variant, size });
    return (
      <ListBoxContext.Provider value={{ classNames }}>
        <div className={classNames.container}>
          <ListBox
            {...props}
            className={cn(
              'overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
              classNames.list
            )}
          >
            {props.children}
          </ListBox>
        </div>
      </ListBoxContext.Provider>
    );
  }
);

export { _ListBox as ListBox };
