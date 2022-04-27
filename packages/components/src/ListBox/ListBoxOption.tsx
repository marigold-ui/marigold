import React, { useRef } from 'react';
import { useOption } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { Box, useStateProps } from '@marigold/system';

export interface ListBoxOptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export const ListBoxOption = ({ item, state }: ListBoxOptionProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  const { stateProps } = useStateProps({
    disabled: isDisabled,
    active:
  })

  return (
    <Box as="li" {...optionProps} ref={ref}>
      {item.rendered}
      {isSelected && 'THIS IS SELECTED!'}
    </Box>
  );
};
