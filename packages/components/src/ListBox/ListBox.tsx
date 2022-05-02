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
    ['container', 'list', 'option', 'section', 'sectionTitle']
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
      { parts: ['container', 'list', 'option', 'section', 'sectionTitle'] }
    );

    return (
      <ListBoxContext.Provider value={{ styles }}>
        <Box css={styles.container}>
          <Box
            as="ul"
            ref={innerRef}
            __baseCSS={{ listStyle: 'none', p: 0 }}
            css={styles.list}
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
        </Box>
      </ListBoxContext.Provider>
    );
  }
);
