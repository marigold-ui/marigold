import React, { useRef } from 'react';
import { useListBox } from '@react-aria/listbox';
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import { useStyles } from '@marigold/system';

import { Box } from '../Box';
import { Option } from './Option';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

export const ListBox = (props: ListBoxProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const { state } = props;
  const { listBoxProps } = useListBox(props, state, ref);
  const listBoxClassName = useStyles({
    element: 'ul',
  });

  return (
    <Box
      as="ul"
      {...listBoxProps}
      variant="select.listbox"
      className={listBoxClassName}
      ref={ref}
    >
      {[...state.collection].map(item => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </Box>
  );
};
