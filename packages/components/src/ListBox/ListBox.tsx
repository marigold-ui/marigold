import { ReactNode, forwardRef } from 'react';

import { useListBox } from '@react-aria/listbox';
import { useObjectRef } from '@react-aria/utils';

import type { ListState } from '@react-stately/list';

import { cn, useClassNames } from '@marigold/system';

import { ListBoxContext } from './Context';
import { ListBoxOption } from './ListBoxOption';
import { ListBoxSection } from './ListBoxSection';

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
        <div
          className={cn(
            'overflow-y-auto overflow-x-hidden',
            classNames.container
          )}
        >
          <ul className={classNames.list} ref={innerRef} {...listBoxProps}>
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
