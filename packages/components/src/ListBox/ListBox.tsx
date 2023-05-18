import React, { forwardRef, ReactNode } from 'react';
import { useObjectRef } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { useListBox } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';

import { ListBoxContext } from './Context';
import { ListBoxSection } from './ListBoxSection';
import { ListBoxOption } from './ListBoxOption';

// Props
// ---------------
export interface ListBoxProps {
  variant?: string;
  size?: string;
  label?: ReactNode;
  state: ListState<unknown>;
}

// Components
// ---------------
export const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  ({ state, variant, size, ...props }, ref) => {
    const innerRef = useObjectRef<HTMLUListElement>(ref);
    const { listBoxProps } = useListBox(props, state, innerRef);

    const classNames = useClassNames({ component: 'ListBox', variant, size });

    return (
      <ListBoxContext.Provider value={{ classNames }}>
        <div className={classNames.container}>
          <ul
            className={cn(
              'overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
              classNames.list
            )}
            ref={innerRef}
            {...listBoxProps}
          >
            {[...state.collection].map(item =>
              item.type === 'section' ? (
                <ListBoxSection key={item.key} section={item} state={state} />
              ) : (
                <ListBoxOption key={item.key} item={item} state={state} />
              )
            )}
          </ul>
        </div>
      </ListBoxContext.Provider>
    );
  }
);
