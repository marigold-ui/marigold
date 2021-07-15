import React, { useRef } from 'react';
import type { ListState } from 'react-stately';
import type { Node } from '@react-types/shared';
import { mergeProps, useOption } from 'react-aria';

import { Box } from '../Box';
import { useStyles } from '@marigold/system';

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export const Option = ({ item, state }: OptionProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );
  const selectedClassName = useStyles({
    css: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 400,
      lineHeight: '32px',
      padding: '2px 5px',
      outline: 'none',
      cursor: 'pointer',
      color: isSelected ? '#ffffff' : '#4b4b4b',
      bg: isSelected ? '#3ab3d5' : isFocused ? '#c1f0fc' : 'white',
    },
  });

  return (
    <Box
      as="li"
      {...mergeProps(optionProps)}
      ref={ref}
      className={selectedClassName}
    >
      {item.rendered}
    </Box>
  );
};
