import React, { useEffect, useRef, useState } from 'react';
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
  const [disabled, setDisabled] = useState(false);
  const { optionProps, isSelected } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  useEffect(() => {
    for (const key of state.disabledKeys.values()) {
      if (key === item.key) {
        setDisabled(true);
      }
    }
  }, [state.disabledKeys, item.key]);

  return (
    <Box
      as="li"
      {...optionProps}
      ref={ref}
      variant={
        isSelected
          ? 'select.option.selected'
          : disabled
          ? 'select.option.disabled'
          : 'select.option'
      }
    >
      {item.rendered}
    </Box>
  );
};
