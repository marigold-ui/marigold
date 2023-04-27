import React, { forwardRef, ReactNode } from 'react';
import { useObjectRef } from '@react-aria/utils';
import { Box, useComponentStylesFromTV } from '@marigold/system';
import { useListBox } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';

import { ListBoxContext } from './Context';
import { ListBoxSection } from './ListBoxSection';
import { ListBoxOption } from './ListBoxOption';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

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

    const classNames = useComponentStylesFromTV('ListBox', {
      variant,
      size,
      slots: ['container', 'list', 'option', 'section', 'sectionTitle'],
    });

    const styledListBox = tv({
      slots: {
        container: [],
        list: ['p-0 list-none'],
        option: [],
        section: [],
        sectionTitle: [],
      },
    });
    return (
      <ListBoxContext.Provider value={{ classNames }}>
        <div className={classNames.container()}>
          <Box
            as="ul"
            ref={innerRef}
            className={twMerge(styledListBox().list(), classNames.list())}
            {...listBoxProps}
          >
            {[...state.collection].map(item =>
              item.type === 'section' ? (
                <ListBoxSection key={item.key} section={item} state={state} />
              ) : (
                <ListBoxOption key={item.key} item={item} state={state} />
              )
            )}
          </Box>
        </div>
      </ListBoxContext.Provider>
    );
  }
);
