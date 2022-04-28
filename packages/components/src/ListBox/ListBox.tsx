import React, { forwardRef, ReactNode } from 'react';
import { useObjectRef } from '@react-aria/utils';
import { Box } from '@marigold/system';
import { useListBox } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';

import { ListBoxSection } from './ListBoxSection';
import { ListBoxOption } from './ListBoxOption';

// Props
// ---------------
export interface ListBoxProps {
  label?: ReactNode;
  state: ListState<unknown>;
}

// Components
// ---------------
export const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(
  ({ state, ...props }, ref) => {
    const innerRef = useObjectRef<HTMLUListElement>(ref);
    const { listBoxProps } = useListBox(props, state, innerRef);

    // TODO: Add useComponentStyles
    return (
      <Box as="ul" ref={innerRef} {...listBoxProps}>
        {[...state.collection].map(item =>
          item.type === 'section' ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <ListBoxOption key={item.key} item={item} state={state} />
          )
        )}
      </Box>
    );
  }
);
