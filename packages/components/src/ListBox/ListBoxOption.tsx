import React, { useRef } from 'react';
import { useOption } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { Box, CSSObject, useStateProps } from '@marigold/system';

// Props
// ---------------
export interface ListBoxOptionProps {
  css?: CSSObject;
  item: Node<unknown>;
  state: ListState<unknown>;
}

// Component
// ---------------
export const ListBoxOption = ({ css, item, state }: ListBoxOptionProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isDisabled, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  const stateProps = useStateProps({
    selected: isSelected,
    disabled: isDisabled,
    focusVisible: isFocused,
  });

  return (
    <Box as="li" ref={ref} css={css} {...optionProps} {...stateProps}>
      {item.rendered}
      {isSelected && 'THIS IS SELECTED!'}
    </Box>
  );
};
