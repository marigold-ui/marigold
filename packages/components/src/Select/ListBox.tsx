import React, { useRef } from 'react';
import { useListBox } from 'react-aria';
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { ListState } from 'react-stately';

import { Box } from '../Box';
import { Option } from './Option';
import { useStyles } from '@marigold/system';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

export const ListBox = (props: ListBoxProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  const selectBoxClassName = useStyles({
    css: {
      position: 'absolute',
      width: '100%',
      margin: '4px 0 0 0',
      padding: 0,
      listStyle: 'none',
      background: 'white',
      border: '1px solid #cccccc',
      borderRadius: '2px',
    },
  });

  return (
    <Box
      as="ul"
      {...listBoxProps}
      className={selectBoxClassName}
      ref={listBoxRef}
    >
      {[...state.collection].map((item: any) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </Box>
  );
};
