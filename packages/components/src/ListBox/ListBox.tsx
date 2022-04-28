import React, { forwardRef, ReactNode } from 'react';
import { useObjectRef } from '@react-aria/utils';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { useListBox } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';

import { ListBoxContext } from './Context';
import { ListBoxSection } from './ListBoxSection';
import { ListBoxOption } from './ListBoxOption';

// Theme Extension
// ---------------
export interface ListBoxThemeExtension
  extends ThemeExtensionsWithParts<
    'ListBox',
    ['container', 'section', 'sectionTitle', 'option']
  > {}

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

    const styles = useComponentStyles(
      'ListBox',
      { variant, size },
      { parts: ['container', 'section', 'sectionTitle', 'option'] }
    );

    return (
      <ListBoxContext.Provider value={{ styles }}>
        <Box as="ul" ref={innerRef} css={styles.container} {...listBoxProps}>
          {[...state.collection].map(item =>
            item.type === 'section' ? (
              <ListBoxSection key={item.key} section={item} state={state} />
            ) : (
              <ListBoxOption key={item.key} item={item} state={state} />
            )
          )}
        </Box>
      </ListBoxContext.Provider>
    );
  }
);
