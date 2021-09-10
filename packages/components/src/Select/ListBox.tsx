import React, { useRef } from 'react';
import { useListBox } from '@react-aria/listbox';
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import { useStyles } from '@marigold/system';

import { Box } from '../Box';
import { Option } from './Option';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  state: ListState<unknown>;
  error?: string;
}

export const ListBox = (props: ListBoxProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const { state, error } = props;
  const { listBoxProps } = useListBox(props, state, ref);
  const listBoxClassName = useStyles({
    element: 'ul',
  });

  return (
    <Box
      as="ul"
      {...listBoxProps}
      variant={error ? 'select.listbox.error' : 'select.listbox'}
      className={listBoxClassName}
      ref={ref}
    >
      {[...state.collection].map(item => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </Box>
  );
};
