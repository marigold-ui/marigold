import React, { useRef } from 'react';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';
import { useOption } from '@react-aria/listbox';

import { Box } from '../Box';

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export const Option = ({ item, state }: OptionProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  return (
    <Box
      as="li"
      {...optionProps}
      ref={ref}
      variant={isSelected ? 'select.option.selected' : 'select.option'}
    >
      {item.rendered}
    </Box>
  );
};
